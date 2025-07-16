import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  robots?: string;
  structuredData?: object;
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

const DEFAULT_TITLE = "Text2SQL.my | AI SQL Generator for Malaysia";
const DEFAULT_DESCRIPTION = "Convert English or Bahasa Malaysia text to SQL instantly. AI-powered SQL generator with 100% privacy-first approach.";
const DEFAULT_KEYWORDS = "text2sql, sql generator, ai sql, malaysia, bahasa malaysia, natural language to sql, privacy-first, database query";
const DEFAULT_OG_IMAGE = "https://text2sql.my/images/hero.png";
const SITE_URL = "https://text2sql.my";

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  canonical,
  robots = "index, follow",
  structuredData,
  breadcrumbs
}: SEOProps) {
  const fullTitle = title ? `${title} | Text2SQL.my` : DEFAULT_TITLE;
  const canonicalUrl = canonical || (typeof window !== 'undefined' ? window.location.href : SITE_URL);
  
  // Ensure description is within optimal length
  const optimizedDescription = description.length > 160 
    ? description.substring(0, 157) + '...' 
    : description;

  // Default structured data for WebApplication
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Text2SQL.my",
    "url": SITE_URL,
    "description": "AI-powered SQL generator for Malaysia supporting English and Bahasa Malaysia",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "MYR",
      "availability": "https://schema.org/InStock"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Text2SQL.my",
      "url": SITE_URL
    },
    "inLanguage": ["en-MY", "ms-MY"],
    "audience": {
      "@type": "Audience",
      "audienceType": "Developers, Data Analysts, Database Administrators",
      "geographicArea": {
        "@type": "Country",
        "name": "Malaysia"
      }
    }
  };

  // Breadcrumb structured data
  const breadcrumbStructuredData = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": breadcrumb.name,
      "item": `${SITE_URL}${breadcrumb.url}`
    }))
  } : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={optimizedDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      <meta name="author" content="Text2SQL.my" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="Text2SQL.my - AI SQL Generator for Malaysia" />
      <meta property="og:site_name" content="Text2SQL.my" />
      <meta property="og:locale" content="en_MY" />
      <meta property="og:locale:alternate" content="ms_MY" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@text2sql_my" />
      <meta name="twitter:creator" content="@text2sql_my" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={optimizedDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="Text2SQL.my - AI SQL Generator for Malaysia" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#6366f1" />
      <meta name="msapplication-TileColor" content="#6366f1" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {!structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(defaultStructuredData)}
        </script>
      )}
      
      {breadcrumbStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      )}
    </Helmet>
  );
} 