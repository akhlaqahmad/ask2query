import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  url: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {/* Home link */}
        <li>
          <Link 
            to="/" 
            className="text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1"
            aria-label="Home"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={item.url} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-slate-500 mx-2" />
            {item.current ? (
              <span 
                className="text-slate-200 font-medium"
                aria-current="page"
              >
                {item.name}
              </span>
            ) : (
              <Link 
                to={item.url}
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
} 