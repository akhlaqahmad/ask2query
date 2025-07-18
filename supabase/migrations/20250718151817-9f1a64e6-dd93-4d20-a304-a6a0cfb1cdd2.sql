
-- First, let's insert some sample blog posts that are published
INSERT INTO public.blog_posts (
  title,
  slug,
  excerpt,
  content,
  category,
  tags,
  author_name,
  is_published,
  published_at,
  read_time_minutes
) VALUES 
(
  'Getting Started with Text2SQL',
  'getting-started-with-text2sql',
  'Learn how to transform natural language into SQL queries using our AI-powered platform.',
  '<h2>Welcome to Text2SQL</h2><p>Text2SQL is revolutionizing how we interact with databases. Instead of writing complex SQL queries, you can simply describe what you want in plain English.</p><h3>Key Features</h3><ul><li>Natural language to SQL conversion</li><li>Support for multiple database types</li><li>Real-time query validation</li><li>Interactive schema browser</li></ul><p>Get started today and experience the future of database querying!</p>',
  'introductory',
  ARRAY['tutorial', 'getting-started', 'ai'],
  'Text2SQL Team',
  true,
  NOW(),
  5
),
(
  'Advanced SQL Generation Techniques',
  'advanced-sql-generation-techniques',
  'Discover advanced techniques for generating complex SQL queries from natural language.',
  '<h2>Advanced SQL Generation</h2><p>As you become more comfortable with Text2SQL, you can leverage advanced techniques to generate more sophisticated queries.</p><h3>Complex Joins</h3><p>Our AI can handle complex multi-table joins by understanding relationships in your schema.</p><h3>Aggregations and Window Functions</h3><p>Generate advanced analytics queries with window functions, CTEs, and complex aggregations.</p>',
  'technical',
  ARRAY['advanced', 'sql', 'techniques'],
  'Text2SQL Team',
  true,
  NOW(),
  8
),
(
  'Database Security Best Practices',
  'database-security-best-practices',
  'Essential security practices when working with AI-generated SQL queries.',
  '<h2>Security First</h2><p>When using AI to generate SQL queries, security should always be a top priority.</p><h3>Query Validation</h3><p>Always review generated queries before execution, especially in production environments.</p><h3>Access Controls</h3><p>Implement proper role-based access controls to limit what queries can be executed.</p>',
  'security',
  ARRAY['security', 'best-practices', 'database'],
  'Text2SQL Team',
  true,
  NOW(),
  6
),
(
  'Understanding Database Schemas',
  'understanding-database-schemas',
  'A comprehensive guide to database schemas and how Text2SQL interprets them.',
  '<h2>Schema Understanding</h2><p>The quality of your SQL generation depends heavily on how well our AI understands your database schema.</p><h3>Table Relationships</h3><p>Foreign keys and relationships help our AI generate better joins and queries.</p><h3>Column Naming</h3><p>Descriptive column names improve the accuracy of natural language interpretation.</p>',
  'data-literacy',
  ARRAY['schema', 'database-design', 'education'],
  'Text2SQL Team',
  true,
  NOW(),
  7
),
(
  'The Future of Natural Language Databases',
  'future-of-natural-language-databases',
  'Exploring the future possibilities of natural language database interfaces.',
  '<h2>Looking Ahead</h2><p>The intersection of AI and databases is rapidly evolving, opening up new possibilities for data interaction.</p><h3>Conversational Analytics</h3><p>Imagine having full conversations with your data, asking follow-up questions and diving deeper into insights.</p><h3>Automated Insights</h3><p>AI that not only answers your questions but suggests new questions you should be asking.</p>',
  'thought-leadership',
  ARRAY['future', 'ai', 'innovation'],
  'Text2SQL Team',
  true,
  NOW(),
  10
);
