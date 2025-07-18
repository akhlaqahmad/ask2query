import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost, BlogFilters, BLOG_CATEGORIES } from '@/types/blog';
import { useDebounce } from './useDebounce';

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<BlogFilters>({
    search: '',
    category: '',
    sortBy: 'newest'
  });

  const debouncedSearch = useDebounce(filters.search, 300);

  // Fetch all blog posts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Apply filters when posts or filters change
  useEffect(() => {
    applyFilters();
  }, [posts, debouncedSearch, filters.category, filters.sortBy]);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Fetching blog posts...');
      
      // Simplified query using created_at for ordering and explicit column selection
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, category, tags, featured_image, author_name, author_email, read_time_minutes, is_published, published_at, created_at, updated_at')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }
      
      if (!data) {
        console.log('No data returned from Supabase');
        setPosts([]);
        return;
      }
      
      console.log('Blog posts fetched successfully:', data.length, 'posts');
      
      // Convert Supabase data to BlogPost type
      const blogPosts: BlogPost[] = data.map(post => ({
        ...post,
        category: post.category as string,
        tags: post.tags || []
      }));
      
      setPosts(blogPosts);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch blog posts';
      setError(errorMessage);
      setPosts([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...posts];

    // Search filter
    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.category.toLowerCase().includes(searchLower) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchLower)))
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(post => post.category === filters.category);
    }

    // Sort - using created_at consistently
    switch (filters.sortBy) {
      case 'newest':
        filtered.sort((a, b) => {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          return dateB - dateA; // newest first
        });
        break;
      case 'oldest':
        filtered.sort((a, b) => {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          return dateA - dateB; // oldest first
        });
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredPosts(filtered);
  };

  const updateFilters = (newFilters: Partial<BlogFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({ search: '', category: '', sortBy: 'newest' });
  };

  return {
    posts: filteredPosts,
    allPosts: posts,
    isLoading,
    error,
    filters,
    updateFilters,
    clearFilters,
    refetch: fetchPosts
  };
}
