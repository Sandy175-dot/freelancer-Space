import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const [searchParams] = useSearchParams();
  const intent = searchParams.get('intent'); // 'hire' or 'work'
  
  // Set default role based on intent
  const defaultRole = intent === 'hire' ? 'client' : 'freelancer';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: defaultRole
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const { signup, resendVerification } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [throttleSeconds, setThrottleSeconds] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return; // guard double-click
    setError('');

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setSubmitting(true);
      // Sign up with Supabase
      console.log('Attempting signup with:', { email: formData.email, role: formData.role });
      const result = await signup(formData.email, formData.password, formData.name, formData.role);
      console.log('Signup result:', result);
      
      if (!result.success) {
        // Handle Supabase throttle message
        if (typeof result.error === 'string' && result.error.includes('after 48 seconds')) {
          setThrottleSeconds(48);
          setError('Please wait a few seconds before trying again.');
        } else if (typeof result.error === 'string' && result.error.toLowerCase().includes('user already registered')) {
          setError('This email is already registered. You can resend the verification email below.');
        } else {
          setError(result.error || 'Failed to create account. Please try again.');
        }
        setSubmitting(false);
        return;
      }

      // Show success message
      if (result.data?.user?.identities?.length === 0) {
        // User already exists but email not confirmed
        alert('This email is already registered. Please check your email to confirm your account, or try logging in.');
      } else {
        alert('Account created! Please check your email to verify your account.');
      }
      
      // Redirect to login
      navigate('/login');
    } catch (err) {
      console.error('Signup exception:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (throttleSeconds <= 0) return;
    const timer = setInterval(() => setThrottleSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [throttleSeconds]);

  return (
    <div className="flex h-screen">
      {/* LEFT SIDE - Form Section */}
      <div className="w-full md:w-[70%] flex items-center justify-center bg-white px-8 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <h1 className="text-center text-2xl font-semibold text-gray-800 mb-2">
            Create your account
          </h1>
          {intent && (
            <p className="text-center text-sm text-gray-600 mb-6">
              {intent === 'hire' ? 'Sign up to hire freelancers' : 'Sign up to find work'}
            </p>
          )}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              I want to:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'freelancer' })}
                className={`p-4 rounded-md border-2 transition ${
                  formData.role === 'freelancer'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                <img src="/user.png" alt="Freelancer" className="w-12 h-12 mx-auto mb-2" />
                <div className="text-sm font-semibold text-gray-800">Work as Freelancer</div>
                <div className="text-xs text-gray-500 mt-1">Find jobs & earn money</div>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'client' })}
                className={`p-4 rounded-md border-2 transition ${
                  formData.role === 'client'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                <img src="/client.png" alt="Client" className="w-12 h-12 mx-auto mb-2" />
                <div className="text-sm font-semibold text-gray-800">Hire Freelancers</div>
                <div className="text-xs text-gray-500 mt-1">Post jobs & find talent</div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <label className="text-gray-600 text-sm block mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-3 px-4 mb-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />

            {/* Email */}
            <label className="text-gray-600 text-sm block mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-3 px-4 mb-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />

            {/* Password */}
            <label className="text-gray-600 text-sm block mb-1">Password</label>
            <div className="relative mb-4">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
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

            {/* Confirm Password */}
            <label className="text-gray-600 text-sm block mb-1">Confirm Password</label>
            <div className="relative mb-4">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-3 px-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <div className="flex items-start mb-5">
              <input
                type="checkbox"
                className="mt-1 rounded border-gray-300 text-blue-500 focus:ring-blue-500 accent-blue-500"
                required
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </span>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={submitting || throttleSeconds > 0}
              className={`w-full py-3 rounded-md text-white font-medium text-lg transition ${
                submitting || throttleSeconds > 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {submitting ? 'Creating...' : throttleSeconds > 0 ? `Please wait ${throttleSeconds}s` : 'Create Account'}
            </button>

            {error && error.includes('resend') && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={async () => {
                    const res = await resendVerification(formData.email);
                    if (res.success) alert('Verification email resent. Please check your inbox.');
                    else alert(res.error || 'Failed to resend verification email.');
                  }}
                  className="mt-3 text-sm text-pastel-purple hover:text-pastel-pink"
                >
                  Resend verification email
                </button>
              </div>
            )}
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-8">
            Already have an account?{' '}
            <Link 
              to={intent ? `/login?intent=${intent}` : '/login'} 
              className="text-blue-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Image Section */}
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
    </div>
  );
};

export default Signup;
