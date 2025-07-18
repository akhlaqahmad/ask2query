import { useEffect, useState } from 'react';
import { generateFullSitemap } from '@/utils/sitemapGenerator';

export default function Sitemap() {
  const [sitemapXML, setSitemapXML] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateSitemap = async () => {
      try {
        setIsLoading(true);
        const xml = await generateFullSitemap();
        setSitemapXML(xml);
      } catch (err) {
        setError('Failed to generate sitemap');
        console.error('Error generating sitemap:', err);
      } finally {
        setIsLoading(false);
      }
    };

    generateSitemap();
  }, []);

  // Set content type to XML
  useEffect(() => {
    if (!isLoading && !error && sitemapXML) {
      // Create a download link for the sitemap
      const blob = new Blob([sitemapXML], { type: 'application/xml' });
      const url = window.URL.createObjectURL(blob);
      
      // Update the page title to indicate it's a sitemap
      document.title = 'Sitemap - Text2SQL.my';
      
      // Clean up the URL when component unmounts
      return () => window.URL.revokeObjectURL(url);
    }
  }, [isLoading, error, sitemapXML]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Generating Sitemap...</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Sitemap</h1>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Dynamic sitemap generated from database content. This includes all published blog posts.
          </p>
        </div>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
          {sitemapXML}
        </pre>
      </div>
    </div>
  );
} 