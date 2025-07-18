import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/types/blog';

export interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export async function generateBlogSitemap(): Promise<SitemapEntry[]> {
  try {
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, created_at, is_published')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts for sitemap:', error);
      return [];
    }

    const sitemapEntries: SitemapEntry[] = [];

    // Add blog main page
    sitemapEntries.push({
      loc: 'https://text2sql.my/blog',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: 0.8
    });

    // Add individual blog posts
    posts?.forEach(post => {
      if (post.slug && post.is_published) {
        sitemapEntries.push({
          loc: `https://text2sql.my/blog/${post.slug}`,
          lastmod: (post.updated_at || post.created_at || new Date().toISOString()).split('T')[0],
          changefreq: 'monthly',
          priority: 0.7
        });
      }
    });

    return sitemapEntries;
  } catch (error) {
    console.error('Error generating blog sitemap:', error);
    return [];
  }
}

export function generateSitemapXML(entries: SitemapEntry[]): string {
  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

  const xmlFooter = '</urlset>';

  const urlEntries = entries.map(entry => `
    <url>
        <loc>${entry.loc}</loc>
        <lastmod>${entry.lastmod}</lastmod>
        <changefreq>${entry.changefreq}</changefreq>
        <priority>${entry.priority}</priority>
    </url>`).join('');

  return xmlHeader + urlEntries + '\n' + xmlFooter;
}

export async function generateFullSitemap(): Promise<string> {
  const staticEntries: SitemapEntry[] = [
    {
      loc: 'https://text2sql.my/',
      lastmod: '2024-12-19',
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      loc: 'https://text2sql.my/app',
      lastmod: '2024-12-19',
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: 'https://text2sql.my/login',
      lastmod: '2024-12-19',
      changefreq: 'monthly',
      priority: 0.6
    },
    {
      loc: 'https://text2sql.my/upload',
      lastmod: '2024-12-19',
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      loc: 'https://text2sql.my/privacy',
      lastmod: '2024-12-19',
      changefreq: 'monthly',
      priority: 0.5
    },
    {
      loc: 'https://text2sql.my/terms',
      lastmod: '2024-12-19',
      changefreq: 'monthly',
      priority: 0.5
    }
  ];

  const blogEntries = await generateBlogSitemap();
  const allEntries = [...staticEntries, ...blogEntries];

  return generateSitemapXML(allEntries);
} 