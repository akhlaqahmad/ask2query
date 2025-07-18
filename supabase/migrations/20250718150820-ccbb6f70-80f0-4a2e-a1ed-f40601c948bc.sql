
-- Create blog_posts table to store blog content
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT,
  category TEXT NOT NULL CHECK (category IN ('introductory', 'product-specific', 'technical', 'thought-leadership', 'data-literacy', 'security')),
  tags TEXT[],
  featured_image TEXT,
  author_name TEXT DEFAULT 'Text2SQL Team',
  author_email TEXT,
  read_time_minutes INTEGER DEFAULT 5,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on blog_posts table
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read published blog posts
CREATE POLICY "Anyone can read published blog posts" ON public.blog_posts
  FOR SELECT USING (is_published = true);

-- Allow admins to manage all blog posts (you can customize this later)
CREATE POLICY "Admins can manage blog posts" ON public.blog_posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'admin@text2sql.my'
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX idx_blog_posts_published ON public.blog_posts(is_published, published_at DESC);
CREATE INDEX idx_blog_posts_search ON public.blog_posts USING gin(to_tsvector('english', title || ' ' || excerpt));

-- Insert the 30 blog post titles with excerpts and categorization
INSERT INTO public.blog_posts (title, slug, excerpt, category, is_published, published_at) VALUES
-- Introductory Topics
('What Is Natural Language to SQL?', 'what-is-natural-language-to-sql', 'Discover how natural language processing transforms everyday questions into powerful SQL queries.', 'introductory', false, NULL),
('Why You Don''t Need to Learn SQL Anymore', 'why-you-dont-need-to-learn-sql', 'AI-powered tools are making database querying accessible to everyone, no coding required.', 'introductory', false, NULL),
('How AI is Making Data Analysis Accessible to Everyone', 'ai-making-data-analysis-accessible', 'Breaking down barriers: how artificial intelligence democratizes data insights for all users.', 'introductory', false, NULL),
('The Evolution of SQL Tools: From Manual Queries to AI Assistants', 'evolution-of-sql-tools', 'A journey through decades of database technology evolution and the rise of intelligent assistants.', 'introductory', false, NULL),
('Top Use Cases for Text2SQL in Business Intelligence', 'top-use-cases-text2sql-bi', 'Real-world applications where natural language querying transforms business decision-making.', 'introductory', false, NULL),

-- Product-Specific Topics
('How Text2SQL.my Works Behind the Scenes', 'how-text2sql-works-behind-scenes', 'An inside look at the AI architecture powering Text2SQL.my''s natural language processing.', 'product-specific', false, NULL),
('Text2SQL vs Traditional BI Tools: What''s the Difference?', 'text2sql-vs-traditional-bi-tools', 'Comparing modern AI-powered querying with traditional business intelligence platforms.', 'product-specific', false, NULL),
('Getting Started with Text2SQL.my: A Beginner''s Guide', 'getting-started-beginner-guide', 'Your complete walkthrough to start generating SQL queries from natural language today.', 'product-specific', false, NULL),
('Using Text2SQL.my to Query Your CRM or ERP Data', 'query-crm-erp-data', 'Unlock insights from your business systems with simple, conversational data queries.', 'product-specific', false, NULL),
('Real-World Examples of Text2SQL.my in Action', 'real-world-examples-in-action', 'Case studies showcasing how businesses transform their data analysis workflows.', 'product-specific', false, NULL),

-- Technical Deep Dives
('From Prompt to Query: How NLP Generates SQL', 'prompt-to-query-nlp-sql', 'The technical journey from natural language understanding to executable SQL generation.', 'technical', false, NULL),
('Improving SQL Accuracy with Prompt Engineering', 'improving-sql-accuracy-prompt-engineering', 'Advanced techniques for crafting better prompts that generate more accurate queries.', 'technical', false, NULL),
('Understanding Query Optimization for AI-Generated SQL', 'query-optimization-ai-generated-sql', 'How to ensure your AI-generated queries perform efficiently at scale.', 'technical', false, NULL),
('How We Use OpenAI/HuggingFace APIs to Power Text2SQL', 'openai-huggingface-apis-power-text2sql', 'Technical deep-dive into the AI models and APIs that make natural language querying possible.', 'technical', false, NULL),
('Why Context Matters in AI-to-SQL Translation', 'context-matters-ai-sql-translation', 'Understanding how database schema context improves AI query generation accuracy.', 'technical', false, NULL),

-- AI & Data Analysis Thought Leadership
('Can AI Replace Data Analysts?', 'can-ai-replace-data-analysts', 'Exploring the evolving role of data professionals in an AI-augmented analytics landscape.', 'thought-leadership', false, NULL),
('Challenges in Natural Language Interfaces for Databases', 'challenges-natural-language-database-interfaces', 'Technical and practical hurdles in making databases truly conversational.', 'thought-leadership', false, NULL),
('How AI Is Reshaping the Future of Data Access', 'ai-reshaping-future-data-access', 'The transformative impact of artificial intelligence on how we interact with data.', 'thought-leadership', false, NULL),
('The Importance of Explainability in AI-Generated SQL', 'importance-explainability-ai-generated-sql', 'Why transparency in AI decision-making is crucial for trusted data analysis.', 'thought-leadership', false, NULL),
('What''s Next for AI in Data Engineering?', 'whats-next-ai-data-engineering', 'Future trends and innovations in AI-powered data infrastructure and tooling.', 'thought-leadership', false, NULL),

-- Data Literacy & Education
('Understanding SQL: The Basics for Non-Technical Teams', 'understanding-sql-basics-non-technical', 'A gentle introduction to database concepts for business users and beginners.', 'data-literacy', false, NULL),
('Top 10 SQL Queries Every Business User Should Know', 'top-10-sql-queries-business-users', 'Essential query patterns that unlock valuable insights from your business data.', 'data-literacy', false, NULL),
('How to Write Better Prompts for Text2SQL Tools', 'write-better-prompts-text2sql', 'Master the art of crafting effective natural language queries for better results.', 'data-literacy', false, NULL),
('Data Democratization: Making Data Accessible with AI', 'data-democratization-accessible-ai', 'How AI tools break down technical barriers and empower everyone to analyze data.', 'data-literacy', false, NULL),
('Teaching Data to Non-Tech Teams Using Natural Language', 'teaching-data-non-tech-teams', 'Strategies for introducing data concepts through conversational interfaces.', 'data-literacy', false, NULL),

-- Security, Ethics, and Accuracy
('How Safe Is Your Data with AI Tools Like Text2SQL?', 'data-safety-ai-tools-text2sql', 'Security considerations and best practices for AI-powered database querying.', 'security', false, NULL),
('Can AI-Generated Queries Be Wrong? How We Mitigate It', 'ai-generated-queries-wrong-mitigation', 'Understanding limitations and our approach to ensuring query accuracy and reliability.', 'security', false, NULL),
('Data Privacy Considerations with AI-Driven BI Tools', 'data-privacy-ai-driven-bi-tools', 'Protecting sensitive information while leveraging AI for business intelligence.', 'security', false, NULL),
('Fake Data, Real Risk: Ensuring Query Integrity in AI Tools', 'fake-data-real-risk-query-integrity', 'Validation techniques and safeguards against AI-generated misinformation in data analysis.', 'security', false, NULL),
('Compliance and Ethics in Automated Data Querying', 'compliance-ethics-automated-data-querying', 'Navigating regulatory requirements and ethical considerations in AI-powered analytics.', 'security', false, NULL);
