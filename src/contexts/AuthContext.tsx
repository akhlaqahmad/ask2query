
import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { User, Session, PostgrestError, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface FeedbackData {
  type: 'bug' | 'feature' | 'general' | 'praise';
  rating?: number;
  email?: string;
  message: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signInWithGoogle: () => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  submitFeedback: (feedbackData: FeedbackData) => Promise<{ error: PostgrestError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasRedirected, setHasRedirected] = useState(false);
  const hasRedirectedRef = useRef(false);
  const prevUserRef = useRef<User | null>(null);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Only redirect after initial login (user changed from null to a value)
    if (
      user &&
      !isLoading &&
      !hasRedirectedRef.current &&
      prevUserRef.current === null // just logged in
    ) {
      console.log('[AuthProvider] User just logged in:', user.id, 'Current path:', window.location.pathname);
      (async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        console.log('[AuthProvider] Profile query result:', { data, error });
        if (!error && data) {
          const currentPath = window.location.pathname;
          // Only redirect non-admins to /app, never redirect to /admin automatically
          if (data.role !== 'admin' && currentPath !== '/app') {
            console.log('[AuthProvider] Redirecting to /app');
            window.location.href = '/app';
            hasRedirectedRef.current = true;
          } else {
            console.log('[AuthProvider] No redirect needed.');
          }
        } else {
          console.error('[AuthProvider] Error fetching profile for redirect:', error);
        }
      })();
    }
    prevUserRef.current = user;
  }, [user, isLoading]);

  const signIn = async (email: string, password: string): Promise<{ error: AuthError | null }> => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setIsLoading(false);
    return { error };
  };

  const signUp = async (email: string, password: string): Promise<{ error: AuthError | null }> => {
    setIsLoading(true);
    const redirectUrl = `${window.location.origin}/app`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });
    setIsLoading(false);
    return { error };
  };

  const signInWithGoogle = async (): Promise<{ error: AuthError | null }> => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/app`
      }
    });
    setIsLoading(false);
    return { error };
  };

  const signOut = async () => {
    setIsLoading(true);
    console.log('[AuthProvider] Signing out...');
    await supabase.auth.signOut();
    localStorage.clear(); // <-- Add this line
    setIsLoading(false);
    console.log('[AuthProvider] Signed out, redirecting to /login');
    window.location.href = '/login';
  };

  const submitFeedback = async (feedbackData: FeedbackData): Promise<{ error: PostgrestError | null }> => {
    try {
      const { error } = await supabase
        .from('feedback')
        .insert({
          user_id: user?.id || null,
          type: feedbackData.type,
          rating: feedbackData.rating || null,
          email: feedbackData.email || null,
          message: feedbackData.message,
        });

      return { error };
    } catch (error) {
      return { error: error as PostgrestError };
    }
  };

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    submitFeedback,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
