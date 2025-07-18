
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost, BLOG_CATEGORIES, BlogCategory } from '@/types/blog';
import { Edit, Trash2, Plus, Eye, EyeOff, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export function AdminPostsList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [posts, searchTerm]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const blogPosts: BlogPost[] = data.map(post => ({
        ...post,
        category: post.category as string,
        tags: post.tags || []
      }));

      setPosts(blogPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch blog posts",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePublishStatus = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ 
          is_published: !post.is_published,
          published_at: !post.is_published ? new Date().toISOString() : null
        })
        .eq('id', post.id);

      if (error) throw error;

      await fetchPosts();
      toast({
        title: "Success",
        description: `Post ${!post.is_published ? 'published' : 'unpublished'} successfully`
      });
    } catch (error) {
      console.error('Error updating post:', error);
      toast({
        title: "Error",
        description: "Failed to update post status",
        variant: "destructive"
      });
    }
  };

  const deletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      await fetchPosts();
      toast({
        title: "Success",
        description: "Post deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-700 rounded w-48"></div>
          <div className="h-12 bg-slate-700 rounded"></div>
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-slate-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
        <Link to="/admin/posts/new">
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-700 text-white"
          />
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="text-left p-4 text-slate-300 font-medium">Title</th>
                <th className="text-left p-4 text-slate-300 font-medium">Category</th>
                <th className="text-left p-4 text-slate-300 font-medium">Status</th>
                <th className="text-left p-4 text-slate-300 font-medium">Created</th>
                <th className="text-right p-4 text-slate-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => {
                const category = BLOG_CATEGORIES[post.category as BlogCategory] || BLOG_CATEGORIES['introductory'];
                return (
                  <tr key={post.id} className="border-t border-slate-700 hover:bg-slate-700/30">
                    <td className="p-4">
                      <div>
                        <h3 className="font-medium text-white">{post.title}</h3>
                        <p className="text-sm text-slate-400 truncate max-w-md">{post.excerpt}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium text-white bg-gradient-to-r ${category.color}`}>
                        {category.label}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        post.is_published 
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {post.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => togglePublishStatus(post)}
                          className="text-slate-400 hover:text-white"
                        >
                          {post.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Link to={`/admin/posts/edit/${post.id}`}>
                          <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deletePost(post.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredPosts.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-slate-400">
              {searchTerm ? 'No posts found matching your search.' : 'No blog posts yet. Create your first post!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
