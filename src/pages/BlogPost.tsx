
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SEO } from '@/components/SEO';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Footer } from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost as BlogPostType, BLOG_CATEGORIES } from '@/types/blog';
import { Loader2, ArrowLeft, Clock, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchPost(slug);
    }
  }, [slug]);

  const fetchPost = async (slug: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle();

      if (error) throw error;
      
      if (!data) {
        setError('Blog post not found');
        return;
      }

      setPost(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch blog post');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="flex items-center gap-3 text-white">
            <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
            <span className="text-lg">Loading article...</span>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (error || !post) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="text-center text-white max-w-md">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="text-slate-400 mb-6">{error || 'This article may have been moved or deleted.'}</p>
            <Link to="/blog">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  const category = BLOG_CATEGORIES[post.category];
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}`, current: true }
  ];

  return (
    <ThemeProvider>
      <SEO
        title={`${post.title} - Text2SQL.my Blog`}
        description={post.excerpt}
        keywords={`${post.title}, text2sql, ${category.label.toLowerCase()}, sql ai`}
      />
      <Breadcrumb items={breadcrumbs} />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Header */}
        <header className="pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link to="/blog" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {/* Category Badge */}
            <div className="mb-6">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r ${category.color}`}>
                {category.label}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 border-t border-slate-700 pt-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author_name || 'Text2SQL Team'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.read_time_minutes || 5} min read</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <article className="prose prose-lg prose-invert max-w-none">
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-8 md:p-12">
                {post.content ? (
                  <div 
                    className="text-slate-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-8 mb-8">
                      <h3 className="text-xl font-semibold text-yellow-300 mb-4">Coming Soon</h3>
                      <p className="text-slate-300 leading-relaxed mb-6">
                        This article is currently being written by our team. We're working hard to bring you 
                        high-quality content about {category.label.toLowerCase()} topics.
                      </p>
                      <p className="text-slate-400">
                        Check back soon or follow us for updates when this article is published!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </article>

            {/* Call to Action */}
            <div className="mt-12 text-center bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Try Text2SQL?</h3>
              <p className="text-slate-300 mb-6">
                Transform your natural language questions into powerful SQL queries instantly.
              </p>
              <Link to="/app">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3">
                  Start Generating SQL
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
