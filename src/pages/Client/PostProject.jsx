import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { jobsAPI } from '../../services/api';

const PostProject = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [description, setDescription] = useState('');

  const handleNext = () => {
    if (description.trim()) {
      // Navigate to detailed form or next step
      navigate('/client/post-project/details', { state: { description } });
    }
  };

  const handleKeyPress = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleNext();
    }
  };

  return (
    <section className="min-h-screen bg-white flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="max-w-xl w-full">
          {/* Logo */}
          <div className="mb-12">
            <img src="/icons8-space-60.png" alt="Freelancer Space" className="h-10" />
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            Tell us what you need <span className="text-pink-500">done.</span>
          </h1>
          
          <p className="text-gray-600 mb-8">
            We'll guide you to create the perfect brief. The more detail the better.
          </p>

          {/* Textarea */}
          <div className="mb-6">
            <textarea
              className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none resize-none"
              placeholder="Enter a few bullet points or a full description."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>

          {/* Next Button */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleNext}
              disabled={!description.trim() || isSubmitting}
              className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
            <span className="text-sm text-gray-500">Press CTRL + ENTER</span>
          </div>

          {/* Info Text */}
          <div className="space-y-2 text-sm text-gray-600">
            <p className="flex items-start gap-2">
              <span className="text-pink-500 mt-1">✓</span>
              <span>Freelancer connects over 85 million professionals globally</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-pink-500 mt-1">✓</span>
              <span>From ₹100 tasks to ₹100 million projects, we've got you covered</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 flex items-center justify-center p-16">
          <div className="relative">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 blur-3xl opacity-30 animate-pulse"></div>
            
            {/* Main Image Placeholder */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-64 h-64 mx-auto mb-8 rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 opacity-20 animate-pulse"></div>
                <h2 className="text-5xl font-bold text-white italic" style={{ fontFamily: 'cursive' }}>
                  make it real.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostProject;
