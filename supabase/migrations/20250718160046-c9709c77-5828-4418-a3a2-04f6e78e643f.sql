
-- Update the admin profile email from admin@text2sql.my to to@text2sql.my
UPDATE public.profiles 
SET email = 'to@text2sql.my' 
WHERE email = 'admin@text2sql.my' AND role = 'admin';

-- Update the feedback policy to use the new admin email
DROP POLICY IF EXISTS "Admins can view all feedback" ON public.feedback;

CREATE POLICY "Admins can view all feedback" ON public.feedback
FOR SELECT TO authenticated
USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE users.id = auth.uid() AND users.email = 'to@text2sql.my'
));
