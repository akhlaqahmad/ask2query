
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { BlogFilters as BlogFiltersType, BLOG_CATEGORIES } from '@/types/blog';

interface BlogFiltersProps {
  filters: BlogFiltersType;
  onFiltersChange: (filters: Partial<BlogFiltersType>) => void;
  onClearFilters: () => void;
  totalPosts: number;
  filteredCount: number;
}

export function BlogFilters({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  totalPosts, 
  filteredCount 
}: BlogFiltersProps) {
  const hasActiveFilters = filters.search || filters.category || filters.sortBy !== 'newest';

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-2xl">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search articles..."
              value={filters.search}
              onChange={(e) => onFiltersChange({ search: e.target.value })}
              className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400"
            />
          </div>

          {/* Category Filter */}
          <Select 
            value={filters.category} 
            onValueChange={(value) => onFiltersChange({ category: value === 'all' ? '' : value })}
          >
            <SelectTrigger className="w-full sm:w-48 bg-slate-700/50 border-slate-600 text-white">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all" className="text-white hover:bg-slate-700">All Categories</SelectItem>
              {Object.entries(BLOG_CATEGORIES).map(([key, category]) => (
                <SelectItem key={key} value={key} className="text-white hover:bg-slate-700">
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select 
            value={filters.sortBy} 
            onValueChange={(value) => onFiltersChange({ sortBy: value as BlogFiltersType['sortBy'] })}
          >
            <SelectTrigger className="w-full sm:w-40 bg-slate-700/50 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="newest" className="text-white hover:bg-slate-700">Newest</SelectItem>
              <SelectItem value="oldest" className="text-white hover:bg-slate-700">Oldest</SelectItem>
              <SelectItem value="alphabetical" className="text-white hover:bg-slate-700">A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results and Clear */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400">
            {filteredCount} of {totalPosts} articles
          </span>
          
          {hasActiveFilters && (
            <Button
              onClick={onClearFilters}
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
