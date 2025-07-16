
import { useState, ChangeEvent, FormEvent, ReactNode, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Database, Zap, Code, Brain, Cpu, Globe } from 'lucide-react';
import {
  Ripple,
  AuthTabs,
  TechOrbitDisplay,
} from '@/components/ui/modern-animated-sign-in';

type FormData = {
  email: string;
  password: string;
};

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
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
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

    try {
      const { error } = isSignUp 
        ? await signUp(formData.email, formData.password)
        : await signIn(formData.email, formData.password);

      if (error) {
        setError(error.message);
      } else {
        if (isSignUp) {
          setError('Check your email for the confirmation link!');
        } else {
          navigate('/app');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }
  };

  const toggleMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsSignUp(!isSignUp);
    setError(null);
    setFormData({ email: '', password: '' });
  };

  const formFields = {
    header: isSignUp ? 'Create Account' : 'Welcome back',
    subHeader: isSignUp 
      ? 'Sign up to start querying your databases' 
      : 'Sign in to your account to continue',
    fields: [
      {
        label: 'Email',
        required: true,
        type: 'email',
        placeholder: 'Enter your email address',
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event, 'email'),
      },
      {
        label: 'Password',
        required: true,
        type: 'password',
        placeholder: 'Enter your password',
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event, 'password'),
      },
    ],
    submitButton: isSignUp ? 'Sign Up' : 'Sign In',
    textVariantButton: isSignUp 
      ? 'Already have an account? Sign in' 
      : "Don't have an account? Sign up",
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
        />
      </span>
    </section>
  );
}
