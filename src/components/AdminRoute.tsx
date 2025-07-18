
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, isLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [debugInfo, setDebugInfo] = useState<string>('');

  useEffect(() => {
    const checkAdminStatus = async () => {
      console.log('[AdminRoute] Checking admin status for user:', user?.id);
      
      if (!user) {
        console.log('[AdminRoute] No user found');
        setIsAdmin(false);
        setCheckingAdmin(false);
        setDebugInfo('No user logged in');
        return;
      }

      try {
        console.log('[AdminRoute] Fetching profile for user:', user.id);
        const { data, error } = await supabase
          .from('profiles')
          .select('role, email')
          .eq('id', user.id)
          .single();

        console.log('[AdminRoute] Profile query result:', { data, error });

        if (error) {
          console.error('[AdminRoute] Error checking admin status:', error);
          setIsAdmin(false);
          setDebugInfo(`Profile error: ${error.message}`);
        } else if (data) {
          const isUserAdmin = data.role === 'admin';
          console.log('[AdminRoute] User role check:', { role: data.role, isAdmin: isUserAdmin, email: data.email });
          setIsAdmin(isUserAdmin);
          setDebugInfo(`Role: ${data.role}, Email: ${data.email}`);
        } else {
          console.log('[AdminRoute] No profile found for user');
          setIsAdmin(false);
          setDebugInfo('No profile found');
        }
      } catch (error) {
        console.error('[AdminRoute] Exception while checking admin status:', error);
        setIsAdmin(false);
        setDebugInfo(`Exception: ${error}`);
      } finally {
        setCheckingAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  useEffect(() => {
    if (!isLoading && !checkingAdmin && (!user || !isAdmin)) {
      console.log('[AdminRoute] Redirecting to login - user:', !!user, 'isAdmin:', isAdmin, 'path:', window.location.pathname);
      window.location.href = '/login';
    }
  }, [user, isAdmin, isLoading, checkingAdmin]);

  if (isLoading || checkingAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Checking admin access...</p>
          {debugInfo && (
            <p className="text-slate-500 text-sm mt-2">Debug: {debugInfo}</p>
          )}
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-slate-400 mb-2">You don't have admin privileges.</p>
          {debugInfo && (
            <p className="text-slate-500 text-sm">Debug: {debugInfo}</p>
          )}
          <div className="mt-4">
            <p className="text-xs text-slate-600">User ID: {user?.id || 'None'}</p>
            <p className="text-xs text-slate-600">Email: {user?.email || 'None'}</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
