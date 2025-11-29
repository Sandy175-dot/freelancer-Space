import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, DollarSign, Clock, FileText, Tag, Sparkles, X } from 'lucide-react';
import { createJob } from '../../lib/jobs';
import { motion } from 'framer-motion';

const PostJob = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: '',
    category: '',
    description: '',
    skills: [],
    budget: '',
    budgetType: 'fixed',
    duration: '',
    experienceLevel: 'intermediate',
    projectType: 'one-time'
  });

  const [skillInput, setSkillInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'Web Development',
    'Mobile Development',
    'Design',
    'Writing',
    'Marketing',
    'Data Entry',
    'Video Editing',
    'Translation'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!jobData.title || !jobData.category || !jobData.description || !jobData.budget) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (jobData.skills.length === 0) {
      setError('Please add at least one skill');
      setLoading(false);
      return;
    }

    // Create job in Supabase
    const result = await createJob(jobData);
    
    setLoading(false);

    if (!result.success) {
      setError(result.error || 'Failed to post job. Please try again.');
      return;
    }

    // Success - redirect to dashboard
    alert('Job posted successfully!');
    navigate('/client/dashboard');
  };

  const addSkill = () => {
    if (skillInput.trim() && !jobData.skills.includes(skillInput.trim())) {
      setJobData({
        ...jobData,
        skills: [...jobData.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skill) => {
    setJobData({
      ...jobData,
      skills: jobData.skills.filter(s => s !== skill)
    });
  };

  return (
    <div className="min-h-screen py-8 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-pastel-blue/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-pastel-pink/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-8 h-8 text-pastel-purple" />
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pastel-purple via-pastel-pink to-pastel-coral bg-clip-text text-transparent">
              Post a Job
            </h1>
          </div>
          <p className="text-gray-600">Fill in the details to find the perfect freelancer</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          {/* Job Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-pastel-purple/10"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Briefcase className="h-5 w-5 text-pastel-purple" />
              <h2 className="text-xl font-semibold text-gray-800">Job Details</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={jobData.title}
                  onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                  placeholder="e.g., Build a responsive e-commerce website"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={jobData.category}
                  onChange={(e) => setJobData({ ...jobData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={jobData.description}
                  onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                  placeholder="Describe your project in detail..."
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
                  required
                ></textarea>
              </div>
            </div>
          </motion.div>

          {/* Skills Required */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-pastel-purple/10"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Tag className="h-5 w-5 text-pastel-purple" />
              <h2 className="text-xl font-semibold text-gray-800">Skills Required</h2>
            </div>
            
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                placeholder="Add a skill (e.g., React, Design, SEO)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-6 py-2 bg-pastel-purple/20 text-pastel-purple rounded-lg hover:bg-pastel-purple/30 transition"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {jobData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-pastel-mint/30 text-gray-700 rounded-full flex items-center space-x-2"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </motion.div>

          {/* Budget & Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-pastel-purple/10"
          >
            <div className="flex items-center space-x-2 mb-4">
              <DollarSign className="h-5 w-5 text-pastel-purple" />
              <h2 className="text-xl font-semibold text-gray-800">Budget & Timeline</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Type
                </label>
                <select
                  value={jobData.budgetType}
                  onChange={(e) => setJobData({ ...jobData, budgetType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
                >
                  <option value="fixed">Fixed Price</option>
                  <option value="hourly">Hourly Rate</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Amount (₹) *
                </label>
                <input
                  type="number"
                  value={jobData.budget}
                  onChange={(e) => setJobData({ ...jobData, budget: e.target.value })}
                  placeholder="e.g., 5000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Duration
                </label>
                <select
                  value={jobData.duration}
                  onChange={(e) => setJobData({ ...jobData, duration: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
                >
                  <option value="">Select duration</option>
                  <option value="1-week">Less than 1 week</option>
                  <option value="1-month">1 to 4 weeks</option>
                  <option value="1-3-months">1 to 3 months</option>
                  <option value="3-6-months">3 to 6 months</option>
                  <option value="6-months-plus">More than 6 months</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <select
                  value={jobData.experienceLevel}
                  onChange={(e) => setJobData({ ...jobData, experienceLevel: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
                >
                  <option value="entry">Entry Level</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Project Type */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-pastel-purple/10"
          >
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-5 w-5 text-pastel-purple" />
              <h2 className="text-xl font-semibold text-gray-800">Project Type</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setJobData({ ...jobData, projectType: 'one-time' })}
                className={`p-4 rounded-lg border-2 transition ${
                  jobData.projectType === 'one-time'
                    ? 'border-pastel-purple bg-pastel-purple/10'
                    : 'border-gray-300 hover:border-pastel-purple/50'
                }`}
              >
                <h3 className="font-semibold text-gray-800 mb-1">One-time Project</h3>
                <p className="text-sm text-gray-600">Find someone for a single project</p>
              </button>
              <button
                type="button"
                onClick={() => setJobData({ ...jobData, projectType: 'ongoing' })}
                className={`p-4 rounded-lg border-2 transition ${
                  jobData.projectType === 'ongoing'
                    ? 'border-pastel-purple bg-pastel-purple/10'
                    : 'border-gray-300 hover:border-pastel-purple/50'
                }`}
              >
                <h3 className="font-semibold text-gray-800 mb-1">Ongoing Work</h3>
                <p className="text-sm text-gray-600">Looking for long-term collaboration</p>
              </button>
            </div>
          </motion.div>

          {/* Submit Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex gap-4"
          >
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 bg-gradient-to-r from-pastel-purple to-pastel-pink text-white rounded-lg font-semibold hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Posting...' : 'Post Job'}
            </motion.button>
            <motion.button
              type="button"
              onClick={() => navigate('/client/dashboard')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Cancel
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
};

export default PostJob;
