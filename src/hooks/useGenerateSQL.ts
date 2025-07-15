import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useDatabase } from "@/contexts/DatabaseContext";

export function useGenerateSQL() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedSQL, setGeneratedSQL] = useState("");
  const { toast } = useToast();
  const { schema, isCustomDatabase } = useDatabase();

  const formatSchemaForAI = (schema: any) => {
    if (!schema || !schema.tables) return null;
    
    return schema.tables.map((table: any) => {
      const columns = table.columns.map((col: any) => `${col.name} ${col.type}`).join(',\n    ');
      return `CREATE TABLE ${table.name} (\n    ${columns}\n);`;
    }).join('\n\n');
  };

  const generateSQL = async (query: string): Promise<string | null> => {
    if (!query.trim()) {
      toast({
        title: "Error",
        description: "Please enter a query to generate SQL",
        variant: "destructive",
      });
      return null;
    }

    setIsLoading(true);
    
    try {
      console.log("Calling generate-sql function with query:", query);
      
      const requestBody: any = { query: query.trim() };
      
      // Include the actual schema if we have a custom database
      if (isCustomDatabase && schema) {
        const formattedSchema = formatSchemaForAI(schema);
        if (formattedSchema) {
          requestBody.schema = formattedSchema;
          console.log("Including custom schema:", formattedSchema);
        }
      }
      
      const { data, error } = await supabase.functions.invoke('generate-sql', {
        body: requestBody
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
      
      return data.sql;
      
    } catch (error) {
      console.error("Error generating SQL:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate SQL. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const autoGenerateFromExample = async (exampleQuery: string): Promise<string | null> => {
    return await generateSQL(exampleQuery);
  };

  const updateSQL = (newSQL: string) => {
    setGeneratedSQL(newSQL);
  };

  const clearSQL = () => {
    setGeneratedSQL("");
  };

  return {
    generateSQL,
    autoGenerateFromExample,
    updateSQL,
    clearSQL,
    isLoading,
    generatedSQL,
    setGeneratedSQL
  };
}
