import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedCard } from '@/components/AnimatedCard';
import { BlogPost, BLOG_CATEGORIES, BlogCategory } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  // Safe category access with fallback
  const category = BLOG_CATEGORIES[post.category as BlogCategory] || BLOG_CATEGORIES['introductory'];
  const isComingSoon = !post.is_published;

  return (
    <AnimatedCard 
      delay={index * 100}
      direction={index % 2 === 0 ? 'left' : 'right'}
      className="h-full bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 group relative overflow-hidden"
    >
      {isComingSoon && (
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-xs font-semibold rounded-full border border-yellow-500/30">
            Coming Soon
          </span>
        </div>
      )}
      
      <div className="p-6 h-full flex flex-col">
        <div className="mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${category.color}`}>
            {category.label}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-slate-400 mb-4 flex-grow line-clamp-3 group-hover:text-slate-300 transition-colors duration-300">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.read_time_minutes || 5} min read</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          {isComingSoon ? (
            <div className="flex items-center gap-2 text-slate-500 cursor-not-allowed">
              <span>Available Soon</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          ) : (
            <Link 
              to={`/blog/${post.slug}`}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 group/link"
            >
              <span>Read More</span>
              <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-300" />
            </Link>
          )}
        </div>
      </div>
    </AnimatedCard>
  );
}
