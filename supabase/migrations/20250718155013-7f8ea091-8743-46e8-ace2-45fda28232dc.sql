
-- Drop the problematic policy that references auth.users table
DROP POLICY "Admins can manage blog posts" ON public.blog_posts;

-- Create profiles table for proper admin management
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text,
  role text DEFAULT 'user',
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
FOR SELECT USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = id);

-- Create new admin policy using profiles table instead of auth.users
CREATE POLICY "Admins can manage blog posts" ON public.blog_posts
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = auth.uid() AND role = 'admin'
));

-- Insert an admin profile for the admin email
INSERT INTO public.profiles (id, email, role) 
SELECT id, email, 'admin' 
FROM auth.users 
WHERE email = 'admin@text2sql.my'
ON CONFLICT (id) DO UPDATE SET role = 'admin';
