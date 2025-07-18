
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/types/blog';
import { FileText, Eye, Clock, TrendingUp, RefreshCw, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useSitemap } from '@/hooks/useSitemap';
import { useToast } from '@/hooks/use-toast';

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  recentPosts: BlogPost[];
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    recentPosts: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const { regenerateSitemap, isGenerating, lastGenerated, error } = useSitemap();
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Get all posts
      const { data: allPosts, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, category, is_published, created_at, updated_at')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const totalPosts = allPosts?.length || 0;
      const publishedPosts = allPosts?.filter(post => post.is_published).length || 0;
      const draftPosts = totalPosts - publishedPosts;
      
      // Convert to BlogPost type
      const recentPosts: BlogPost[] = allPosts?.slice(0, 5).map(post => ({
        ...post,
        category: post.category as string,
        tags: []
      })) || [];

      setStats({
        totalPosts,
        publishedPosts,
        draftPosts,
        recentPosts
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerateSitemap = async () => {
    const result = await regenerateSitemap();
    if (result) {
      toast({
        title: "Success",
        description: "Sitemap generated and downloaded successfully"
      });
    } else {
      toast({
        title: "Error",
        description: error || "Failed to generate sitemap",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-700 rounded w-48 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-slate-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Total Posts</p>
              <p className="text-2xl font-bold text-white">{stats.totalPosts}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Eye className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Published</p>
              <p className="text-2xl font-bold text-white">{stats.publishedPosts}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Drafts</p>
              <p className="text-2xl font-bold text-white">{stats.draftPosts}</p>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Tools */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">SEO Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
            <div>
              <h3 className="font-semibold text-white">Sitemap</h3>
              <p className="text-sm text-slate-400">
                Generate updated sitemap with all published blog posts
              </p>
              {lastGenerated && (
                <p className="text-xs text-slate-500 mt-1">
                  Last generated: {lastGenerated.toLocaleDateString()}
                </p>
              )}
            </div>
            <Button
              onClick={handleRegenerateSitemap}
              disabled={isGenerating}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-600"
            >
              {isGenerating ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Generate
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
            <div>
              <h3 className="font-semibold text-white">Dynamic Sitemap</h3>
              <p className="text-sm text-slate-400">
                View dynamically generated sitemap
              </p>
            </div>
            <Link to="/sitemap" target="_blank">
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-600"
              >
                <ExternalLink className="h-4 w-4" />
                View
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Recent Posts</h2>
        {stats.recentPosts.length > 0 ? (
          <div className="space-y-4">
            {stats.recentPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between py-3 border-b border-slate-700 last:border-b-0">
                <div>
                  <h3 className="font-medium text-white">{post.title}</h3>
                  <p className="text-sm text-slate-400">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  post.is_published 
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-yellow-500/20 text-yellow-300'
                }`}>
                  {post.is_published ? 'Published' : 'Draft'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400">No posts yet. Create your first post!</p>
        )}
      </div>
    </div>
  );
}
