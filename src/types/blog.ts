
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  category: 'introductory' | 'product-specific' | 'technical' | 'thought-leadership' | 'data-literacy' | 'security';
  tags?: string[];
  featured_image?: string;
  author_name?: string;
  author_email?: string;
  read_time_minutes?: number;
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface BlogFilters {
  search: string;
  category: string;
  sortBy: 'newest' | 'oldest' | 'alphabetical';
}

export const BLOG_CATEGORIES = {
  'introductory': { label: 'Introductory', color: 'from-blue-500 to-cyan-500' },
  'product-specific': { label: 'Product Features', color: 'from-purple-500 to-pink-500' },
  'technical': { label: 'Technical', color: 'from-green-500 to-emerald-500' },
  'thought-leadership': { label: 'Thought Leadership', color: 'from-yellow-500 to-orange-500' },
  'data-literacy': { label: 'Data Education', color: 'from-indigo-500 to-purple-500' },
  'security': { label: 'Security & Ethics', color: 'from-red-500 to-rose-500' }
} as const;
