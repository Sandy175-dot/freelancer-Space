import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [searchParams] = useSearchParams();
  const intent = searchParams.get('intent'); // 'hire' or 'work'
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = await login(email, password);
    
    if (!result.success) {
      setError(result.error || 'Failed to login. Please check your credentials.');
      return;
    }

    const role = result.role || 'freelancer';
    
    // Redirect based on intent or role
    if (intent === 'hire') {
      // User wants to hire, redirect to client dashboard or post project
      if (role === 'client') {
        navigate('/client/post-project');
      } else {
        navigate('/client/dashboard');
      }
    } else if (intent === 'work') {
      // User wants to work, redirect to freelancer dashboard or browse jobs
      if (role === 'freelancer') {
        navigate('/freelancer/browse-jobs');
      } else {
        navigate('/freelancer/dashboard');
      }
    } else {
      // Default redirect based on role
      if (role === 'client') {
        navigate('/client/dashboard');
      } else if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/freelancer/dashboard');
      }
    }
  };

  const handleDemoLogin = async (role) => {
    setError('');
    let demoEmail, demoPassword;
    
    if (role === 'freelancer') {
      demoEmail = 'freelancer@demo.com';
      demoPassword = 'demo123';
    } else {
      demoEmail = 'client@demo.com';
      demoPassword = 'demo123';
    }

    setEmail(demoEmail);
    setPassword(demoPassword);

    const result = await login(demoEmail, demoPassword);
    
    if (!result.success) {
      setError(result.error || 'Demo login failed. Please try manual signup.');
      return;
    }

    const userRole = result.role || role;
    
    // Redirect based on intent or role
    if (intent === 'hire') {
      if (userRole === 'client') {
        navigate('/client/post-project');
      } else {
        navigate('/client/dashboard');
      }
    } else if (intent === 'work') {
      if (userRole === 'freelancer') {
        navigate('/freelancer/browse-jobs');
      } else {
        navigate('/freelancer/dashboard');
      }
    } else {
      if (userRole === 'client') {
        navigate('/client/dashboard');
      } else {
        navigate('/freelancer/dashboard');
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* LEFT SIDE - Image Section */}
      <div className="hidden md:block md:w-[30%] relative">
        <img
          src="/pexels-akwice-3094799.jpg"
          alt="Freelancer workspace"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40"></div>
        
        {/* Make it real text */}
        <div className="absolute bottom-8 left-8 right-8">
          <h2 className="text-white text-4xl font-bold opacity-90">
            Make it real
          </h2>
        </div>
      </div>

      {/* RIGHT SIDE - Form Section */}
      <div className="w-full md:w-[70%] flex items-center justify-center bg-white px-8">
        <div className="w-full max-w-md">
          <h1 className="text-center text-2xl font-semibold text-gray-800 mb-2">
            Welcome back
          </h1>
          {intent && (
            <p className="text-center text-sm text-gray-600 mb-6">
              {intent === 'hire' ? 'Sign in to hire freelancers' : 'Sign in to find work'}
            </p>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <label className="text-gray-600 text-sm block mb-1">Email or Username</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-3 px-4 mb-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />

            {/* Password */}
            <label className="text-gray-600 text-sm block mb-1">Password</label>
            <div className="relative mb-2">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-3 px-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <div className="flex justify-between items-center mb-5">
              <label className="flex items-center gap-2 text-gray-600 text-sm">
                <input type="checkbox" className="accent-blue-500" /> Remember me
              </label>
              <Link to="/forgot-password" className="text-blue-600 text-sm hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md text-lg transition"
            >
              Log in
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-8">
            Don't have an account?{' '}
            <Link 
              to={intent ? `/signup?intent=${intent}` : '/signup'} 
              className="text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;
