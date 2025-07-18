
import { useState } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SEO } from '@/components/SEO';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Footer } from '@/components/Footer';
import { BlogCard } from '@/components/BlogCard';
import { BlogFilters } from '@/components/BlogFilters';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { Loader2, BookOpen, Sparkles } from 'lucide-react';

export default function Blog() {
  const { posts, allPosts, isLoading, error, filters, updateFilters, clearFilters } = useBlogPosts();
  const [postsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = posts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog", current: true }
  ];

  if (error) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-4">Error Loading Blog</h1>
            <p className="text-slate-400">{error}</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <SEO
        title="Blog - Text2SQL.my"
        description="Discover insights, tutorials, and thought leadership about AI-powered SQL generation, data analysis, and the future of natural language database querying."
        keywords="text2sql blog, sql ai articles, natural language database, data analysis tutorials, sql generation insights"
      />
      <Breadcrumb items={breadcrumbs} />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Hero Section */}
        <section className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Blog
                </h1>
              </div>
              
              <p className="text-xl md:text-2xl text-slate-300 font-light mb-4">
                Insights, Tutorials & Thought Leadership
              </p>
              
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Discover the latest in AI-powered SQL generation, data analysis best practices, 
                and the future of natural language database querying.
              </p>
              
              <div className="flex items-center justify-center gap-2 mt-6 text-sm text-slate-500">
                <Sparkles className="h-4 w-4" />
                <span>New articles published regularly</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="pb-20">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* Filters */}
            <BlogFilters
              filters={filters}
              onFiltersChange={updateFilters}
              onClearFilters={clearFilters}
              totalPosts={allPosts.length}
              filteredCount={posts.length}
            />

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
                <span className="ml-3 text-slate-400">Loading articles...</span>
              </div>
            )}

            {/* No Results */}
            {!isLoading && posts.length === 0 && (
              <div className="text-center py-20">
                <BookOpen className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-300 mb-2">No articles found</h3>
                <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}

            {/* Blog Posts Grid */}
            {!isLoading && paginatedPosts.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {paginatedPosts.map((post, index) => (
                    <BlogCard key={post.id} post={post} index={index} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          page === currentPage
                            ? 'bg-blue-500 text-white'
                            : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
