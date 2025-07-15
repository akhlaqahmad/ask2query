import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type ActivityType = 
  | 'login' 
  | 'logout' 
  | 'database_upload' 
  | 'query_execution' 
  | 'schema_browse'
  | 'profile_update'
  | 'password_change';

export interface ActivityMetadata {
  query?: string;
  database_name?: string;
  execution_time?: number;
  row_count?: number;
  error_message?: string;
  [key: string]: any;
}

export function useActivityLogger() {
  const { toast } = useToast();

  const logActivity = useCallback(async (
    type: ActivityType,
    description: string,
    metadata?: ActivityMetadata
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // For now, just log to console until database migration is confirmed
      console.log('Activity logged:', {
        user_id: user.id,
        activity_type: type,
        description,
        metadata: metadata || {}
      });

      // TODO: Uncomment after migration is applied
      // const { error } = await supabase.rpc('log_user_activity', {
      //   p_user_id: user.id,
      //   p_activity_type: type,
      //   p_description: description,
      //   p_metadata: metadata || {}
      // });
      // 
      // if (error) throw error;
    } catch (error) {
      console.error('Failed to log activity:', error);
      // Don't show error to user for logging failures
    }
  }, []);

  const saveQuery = useCallback(async (
    query: string,
    description?: string
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // For now, just log to console until database migration is confirmed
      console.log('Query saved:', {
        user_id: user.id,
        query_text: query,
        description: description || null
      });

      // TODO: Uncomment after migration is applied
      // const { error } = await supabase.rpc('save_query_history', {
      //   p_user_id: user.id,
      //   p_query_text: query,
      //   p_description: description || null
      // });
      // 
      // if (error) throw error;
    } catch (error) {
      console.error('Failed to save query:', error);
      toast({
        title: "Error",
        description: "Failed to save query to history",
        variant: "destructive"
      });
    }
  }, [toast]);

  return {
    logActivity,
    saveQuery
  };
}