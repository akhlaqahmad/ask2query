
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useGenerateSQL() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedSQL, setGeneratedSQL] = useState("");
  const { toast } = useToast();

  const generateSQL = async (query: string) => {
    if (!query.trim()) {
      toast({
        title: "Error",
        description: "Please enter a query to generate SQL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      console.log("Calling generate-sql function with query:", query);
      
      const { data, error } = await supabase.functions.invoke('generate-sql', {
        body: { query: query.trim() }
      });

      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(error.message || "Failed to generate SQL");
      }

      if (!data?.success) {
        throw new Error(data?.error || "Failed to generate SQL");
      }

      console.log("Generated SQL:", data.sql);
      setGeneratedSQL(data.sql);
      
      toast({
        title: "Success!",
        description: "SQL query generated successfully",
      });
      
    } catch (error) {
      console.error("Error generating SQL:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate SQL. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateSQL,
    isLoading,
    generatedSQL,
    setGeneratedSQL
  };
}
