
import { ThemeProvider } from '@/components/ThemeProvider';
import { AdminRoute } from '@/components/AdminRoute';
import { SEO } from '@/components/SEO';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AdminPostsList } from '@/components/admin/AdminPostsList';
import { AdminPostEditor } from '@/components/admin/AdminPostEditor';
import { LogoutButton } from '@/components/LogoutButton';
import { LayoutDashboard, FileText, Plus, Home } from 'lucide-react';

export default function Admin() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <ThemeProvider>
      <AdminRoute>
        <SEO
          title="Admin Panel - Text2SQL.my"
          description="Manage blog posts and content"
          robots="noindex, nofollow"
        />
        
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-slate-800/50 min-h-screen border-r border-slate-700">
              <div className="p-6">
                <h1 className="text-xl font-bold text-white mb-8">Admin Panel</h1>
                
                <nav className="space-y-2">
                  <Link
                    to="/admin"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive('/admin')
                        ? 'bg-blue-500 text-white'
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    Dashboard
                  </Link>
                  
                  <Link
                    to="/admin/posts"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive('/admin/posts')
                        ? 'bg-blue-500 text-white'
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <FileText className="h-5 w-5" />
                    Blog Posts
                  </Link>
                  
                  <Link
                    to="/admin/posts/new"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive('/admin/posts/new')
                        ? 'bg-blue-500 text-white'
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <Plus className="h-5 w-5" />
                    New Post
                  </Link>
                </nav>

                <div className="mt-12 pt-6 border-t border-slate-700">
                  <Link
                    to="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors mb-4"
                  >
                    <Home className="h-5 w-5" />
                    Back to Site
                  </Link>
                  
                  <LogoutButton />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/posts" element={<AdminPostsList />} />
                <Route path="/posts/new" element={<AdminPostEditor />} />
                <Route path="/posts/edit/:id" element={<AdminPostEditor />} />
              </Routes>
            </div>
          </div>
        </div>
      </AdminRoute>
    </ThemeProvider>
  );
}
