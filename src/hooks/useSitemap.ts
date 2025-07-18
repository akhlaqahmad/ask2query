import { useState } from 'react';
import { generateFullSitemap } from '@/utils/sitemapGenerator';

export function useSitemap() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const regenerateSitemap = async (): Promise<string | null> => {
    try {
      setIsGenerating(true);
      setError(null);
      
      const sitemapXML = await generateFullSitemap();
      setLastGenerated(new Date());
      
      // Download the sitemap for manual upload to public folder
      const blob = new Blob([sitemapXML], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sitemap.xml';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      return sitemapXML;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate sitemap');
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    regenerateSitemap,
    isGenerating,
    lastGenerated,
    error
  };
} 