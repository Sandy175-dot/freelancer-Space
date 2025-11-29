import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { jobsAPI } from '../../services/api';

const CATEGORIES = [
  { id: 'design', label: 'Design & Creative', icon: '🎨' },
  { id: 'development', label: 'Web Development', icon: '💻' },
  { id: 'mobile', label: 'Mobile Apps', icon: '📱' },
  { id: 'data', label: 'Data & Analytics', icon: '📊' },
  { id: 'video', label: 'Video & Animation', icon: '📷' },
  { id: 'writing', label: 'Writing & Content', icon: '✍️' },
  { id: 'marketing', label: 'Marketing', icon: '📢' },
  { id: 'other', label: 'Other', icon: '🔧' }
];

const PostProjectDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  const initialDescription = location.state?.description || '';
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: initialDescription,
    category: '',
    budgetMin: 500,
    budgetMax: 5000,
    duration: '1-3 months',
    skills: []
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const jobData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        budget_min: formData.budgetMin,
        budget_max: formData.budgetMax,
        duration: formData.duration,
        skills: formData.skills,
        location: 'Remote'
      };
      
      const result = await jobsAPI.createJob(jobData);
      
      if (result.success) {
        alert('Project posted successfully!');
        navigate('/client/dashboard');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error posting project:', error);
      alert('Failed to post project: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 py-16">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-white/80 hover:text-white mb-4 flex items-center gap-2"
        >
          ← Back
        </button>
        <h1 className="text-4xl font-bold text-white">Project Details</h1>
        <p className="text-white/70 mt-2">Complete your project information</p>
      </div>

      {/* Form Card */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 shadow-2xl">
          
          <div className="space-y-8">
            {/* Project Title */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Project Title *
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 focus:outline-none"
                placeholder="e.g., Build a responsive website"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                maxLength={100}
              />
              <p className="text-xs text-white/60 mt-1">{formData.title.length}/100</p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Project Description *
              </label>
              <textarea
                className="w-full h-40 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 focus:outline-none resize-none"
                placeholder="Describe your project requirements..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                maxLength={2000}
              />
              <p className="text-xs text-white/60 mt-1">{formData.description.length}/2000</p>
            </div>

            {/* Category */}
            <div>
              <label className="block text-white font-semibold mb-3">
                Category *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleInputChange('category', category.id)}
                    className={`p-4 rounded-xl border transition-all ${
                      formData.category === category.id
                        ? 'bg-pink-500 border-pink-500 text-white'
                        : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                    }`}
                  >
                    <div className="text-2xl mb-1">{category.icon}</div>
                    <div className="text-xs font-medium">{category.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-white font-semibold mb-3">
                Budget Range (₹)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Minimum</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 focus:outline-none"
                    value={formData.budgetMin}
                    onChange={(e) => handleInputChange('budgetMin', parseInt(e.target.value))}
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Maximum</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 focus:outline-none"
                    value={formData.budgetMax}
                    onChange={(e) => handleInputChange('budgetMax', parseInt(e.target.value))}
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-white font-semibold mb-3">
                Project Duration
              </label>
              <select
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 focus:outline-none"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
              >
                <option value="Less than 1 month">Less than 1 month</option>
                <option value="1-3 months">1-3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="More than 6 months">More than 6 months</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-white/20">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
              >
                Back
              </button>

              <button
                onClick={handleSubmit}
                disabled={!formData.title || !formData.description || !formData.category || isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isSubmitting ? 'Posting...' : 'Post Project'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostProjectDetails;
