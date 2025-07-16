
import { useState, ChangeEvent, FormEvent, ReactNode, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Database, Zap, Code, Brain, Cpu, Globe } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import {
  Ripple,
  AuthTabs,
  TechOrbitDisplay,
  FieldType,
} from '@/components/ui/modern-animated-sign-in';

type FormData = {
  email: string;
  password: string;
};

type FormMode = 'signin' | 'signup' | 'forgot-password';

interface OrbitIcon {
  component: () => ReactNode;
  className: string;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  reverse?: boolean;
}

const iconsArray: OrbitIcon[] = [
  {
    component: () => <Database className="w-6 h-6 text-blue-400" />,
    className: 'size-[40px] border-none bg-transparent',
    duration: 20,
    delay: 20,
    radius: 100,
    path: false,
    reverse: false,
  },
  {
    component: () => <Code className="w-6 h-6 text-green-400" />,
    className: 'size-[40px] border-none bg-transparent',
    duration: 20,
    delay: 10,
    radius: 100,
    path: false,
    reverse: false,
  },
  {
    component: () => <Brain className="w-8 h-8 text-purple-400" />,
    className: 'size-[50px] border-none bg-transparent',
    radius: 210,
    duration: 20,
    path: false,
    reverse: false,
  },
  {
    component: () => <Zap className="w-8 h-8 text-yellow-400" />,
    className: 'size-[50px] border-none bg-transparent',
    radius: 210,
    duration: 20,
    delay: 20,
    path: false,
    reverse: false,
  },
  {
    component: () => <Cpu className="w-6 h-6 text-cyan-400" />,
    className: 'size-[40px] border-none bg-transparent',
    duration: 20,
    delay: 20,
    radius: 150,
    path: false,
    reverse: true,
  },
  {
    component: () => <Globe className="w-6 h-6 text-indigo-400" />,
    className: 'size-[40px] border-none bg-transparent',
    duration: 20,
    delay: 10,
    radius: 150,
    path: false,
    reverse: true,
  },
];

export default function AnimatedLogin() {
  const [mode, setMode] = useState<FormMode>('signin');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { signIn, signUp, user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to /app
  useEffect(() => {
    if (!isLoading && user) {
      navigate('/app');
    }
  }, [user, isLoading, navigate]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    name: keyof FormData
  ) => {
    const value = event.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (mode === 'forgot-password') {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
          redirectTo: `${window.location.origin}/app`
        });

        if (error) {
          setError(error.message);
        } else {
          setSuccessMessage('Password reset email sent! Check your inbox.');
        }
      } catch (err) {
        setError('An unexpected error occurred');
      }
      return;
    }

    try {
      const { error } = mode === 'signup' 
        ? await signUp(formData.email, formData.password)
        : await signIn(formData.email, formData.password);

      if (error) {
        setError(error.message);
      } else {
        if (mode === 'signup') {
          setSuccessMessage('Check your email for the confirmation link!');
        } else {
          navigate('/app');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }
  };

  const handleModeChange = (newMode: FormMode) => {
    setMode(newMode);
    setError(null);
    setSuccessMessage(null);
    setFormData({ email: '', password: '' });
  };

  const getFormFields = () => {
    const baseFields = [
      {
        label: 'Email',
        required: true,
        type: 'email' as FieldType,
        placeholder: 'Enter your email address',
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event, 'email'),
      }
    ];

    if (mode !== 'forgot-password') {
      baseFields.push({
        label: 'Password',
        required: true,
        type: 'password' as FieldType,
        placeholder: 'Enter your password',
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event, 'password'),
      });
    }

    return baseFields;
  };

  const formFields = {
    header: mode === 'signin' ? 'Welcome back' : mode === 'signup' ? 'Create Account' : 'Reset Password',
    subHeader: mode === 'signin' 
      ? 'Sign in to your account to continue' 
      : mode === 'signup'
      ? 'Sign up to start querying your databases'
      : 'Enter your email to receive a password reset link',
    fields: getFormFields(),
    submitButton: mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Sign Up' : 'Send Reset Email',
    textVariantButton: mode === 'signin' 
      ? "Don't have an account? Sign up" 
      : mode === 'signup'
      ? 'Already have an account? Sign in'
      : 'Back to sign in',
    forgotPasswordButton: mode === 'signin' ? 'Forgot your password?' : undefined,
  };

  const toggleMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (mode === 'signin') {
      handleModeChange('signup');
    } else if (mode === 'signup') {
      handleModeChange('signin');
    } else {
      handleModeChange('signin');
    }
  };

  const handleForgotPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleModeChange('forgot-password');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <section className='flex max-lg:justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* Left Side */}
      <span className='flex flex-col justify-center w-1/2 max-lg:hidden'>
        <Ripple mainCircleSize={100} />
        <TechOrbitDisplay iconsArray={iconsArray} text="Text2SQL" />
      </span>

      {/* Right Side */}
      <span className='w-1/2 h-[100dvh] flex flex-col justify-center items-center max-lg:w-full max-lg:px-[10%]'>
        <AuthTabs
          formFields={formFields}
          goTo={toggleMode}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          errorField={error}
          successField={successMessage}
          onForgotPassword={mode === 'signin' ? handleForgotPassword : undefined}
        />
      </span>
    </section>
  );
}
