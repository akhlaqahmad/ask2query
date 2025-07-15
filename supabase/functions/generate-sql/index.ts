
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const defaultDatabaseSchema = `
-- Database Schema for Text2SQL
-- customers table
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    signup_date DATE,
    country TEXT
);

-- products table  
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    price DECIMAL(10,2)
);

-- orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER,
    amount DECIMAL(10,2),
    order_date DATE
);
`;

const createSystemPrompt = (schema: string) => `You are an expert SQL query generator. Your task is to convert natural language queries into valid SQL queries based on the provided database schema.

Database Schema:
${schema}

Instructions:
1. Generate clean, efficient SQL queries (PostgreSQL/SQLite compatible)
2. Use proper JOIN syntax when querying multiple tables
3. Include appropriate WHERE clauses, ORDER BY, and LIMIT when needed
4. Return only the SQL query without any explanation or markdown formatting
5. Use proper SQL formatting with line breaks for readability
6. Handle common business queries like top customers, revenue analysis, product performance, etc.
7. If the query is ambiguous, make reasonable assumptions based on common business needs
8. Always use table aliases for better readability when joining tables
9. Use aggregate functions (COUNT, SUM, AVG, etc.) when appropriate
10. Return valid SQL that can be executed directly

Examples:
- "Show top 3 customers by revenue" → SELECT with JOIN, SUM, ORDER BY, LIMIT
- "List all products in electronics category" → SELECT with WHERE
- "Find customers who haven't ordered anything" → LEFT JOIN with NULL check

Generate only the SQL query, no additional text.`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const { query, schema } = await req.json();
    
    if (!query || query.trim().length === 0) {
      throw new Error('Query is required');
    }

    console.log('Generating SQL for query:', query);
    
    // Use provided schema or fall back to default
    const databaseSchema = schema || defaultDatabaseSchema;
    console.log('Using schema:', databaseSchema ? 'Custom schema provided' : 'Default schema');

    const systemPrompt = createSystemPrompt(databaseSchema);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
        temperature: 0.1,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API Error:', errorData);
      throw new Error(`OpenAI API Error: ${response.status}`);
    }

    const data = await response.json();
    const generatedSQL = data.choices[0]?.message?.content?.trim();

    if (!generatedSQL) {
      throw new Error('No SQL generated from OpenAI');
    }

    console.log('Generated SQL:', generatedSQL);

    return new Response(JSON.stringify({ 
      sql: generatedSQL,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-sql function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
