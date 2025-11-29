import { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Clock, 
  Bookmark, 
  TrendingUp, 
  CheckCircle, 
  RefreshCw, 
  Briefcase, 
  Heart, 
  ArrowRight, 
  Zap, 
  Filter,
  Star,
  Users,
  Eye,
  Calendar,
  Tag,
  ChevronDown,
  SlidersHorizontal,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { jobsAPI, bidsAPI } from '../services/api';
import JobCard from '../components/Jobs/JobCard';
import JobCardSkeleton from '../components/Jobs/JobCardSkeleton';

const BrowseJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'All', 'Web Development', 'Mobile Apps', 'Design', 'Writing', 
    'Marketing', 'Data Entry', 'AI/ML', 'DevOps', 'Blockchain'
  ];

  const budgetRanges = [
    { value: 'all', label: 'All Budgets' },
    { value: 'under-500', label: 'Under ₹500' },
    { value: '500-2000', label: '₹500 - ₹2,000' },
    { value: '2000-5000', label: '₹2,000 - ₹5,000' },
    { value: '5000-10000', label: '₹5,000 - ₹10,000' },
    { value: 'above-10000', label: 'Above ₹10,000' }
  ];

  const durations = [
    { value: 'all', label: 'All Durations' },
    { value: 'less-than-week', label: 'Less than a week' },
    { value: '1-4-weeks', label: '1-4 weeks' },
    { value: '1-3-months', label: '1-3 months' },
    { value: '3-6-months', label: '3-6 months' },
    { value: 'more-than-6-months', label: 'More than 6 months' }
  ];

  // Fetch jobs from Supabase with caching
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await jobsAPI.getAllJobs({ status: 'open' });
      const jobsData = result.data || [];
      
      const normalized = jobsData.map((job) => ({
        ...job,
        skills: Array.isArray(job.skills) ? job.skills : [],
        company: job.client_name || 'Company',
        location: job.location || 'Remote',
        duration: job.duration || 'Not specified',
        budget: job.budget_min && job.budget_max 
          ? `₹${job.budget_min} - ₹${job.budget_max}`
          : 'Not specified',
        category: job.category || 'general'
      }));

      setJobs(normalized);
      
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load jobs. Please try again.');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    const title = (job?.title || '').toLowerCase();
    const desc = (job?.description || '').toLowerCase();
    const matchesSearch = title.includes(searchTerm.toLowerCase()) || desc.includes(searchTerm.toLowerCase());
    const category = (job?.category || '').toLowerCase();
    const matchesCategory = selectedCategory === 'all' || category === selectedCategory.toLowerCase();
    
    // Budget filtering
    let matchesBudget = true;
    if (selectedBudget !== 'all') {
      const budgetStr = (job?.budget || '').toLowerCase();
      const budgetNumbers = budgetStr.match(/\d+/g);
      if (budgetNumbers && budgetNumbers.length > 0) {
        const minBudget = parseInt(budgetNumbers[0]);
        switch (selectedBudget) {
          case 'under-500':
            matchesBudget = minBudget < 500;
            break;
          case '500-2000':
            matchesBudget = minBudget >= 500 && minBudget <= 2000;
            break;
          case '2000-5000':
            matchesBudget = minBudget >= 2000 && minBudget <= 5000;
            break;
          case '5000-10000':
            matchesBudget = minBudget >= 5000 && minBudget <= 10000;
            break;
          case 'above-10000':
            matchesBudget = minBudget > 10000;
            break;
        }
      }
    }
    
    return matchesSearch && matchesCategory && matchesBudget;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gradient-secondary mb-2">
            Browse Jobs
          </h1>
          <p className="text-white/70 text-lg">
            Discover your next opportunity from thousands of available projects
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-premium rounded-2xl p-6 mb-8"
        >
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-white/60" />
              <input
                type="text"
                placeholder="Search jobs, skills, or companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 glass-light border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/50 transition-all"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-4 glass-light border border-white/20 rounded-xl text-white hover:glass-medium transition-all flex items-center gap-2"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </motion.button>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10"
              >
                {/* Category Filter */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 glass-light border border-white/20 rounded-xl text-white bg-transparent focus:ring-2 focus:ring-indigo-500/50"
                  >
                    {categories.map(category => (
                      <option key={category} value={category.toLowerCase()} className="bg-slate-800">
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget Filter */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Budget Range</label>
                  <select
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    className="w-full px-4 py-3 glass-light border border-white/20 rounded-xl text-white bg-transparent focus:ring-2 focus:ring-indigo-500/50"
                  >
                    {budgetRanges.map(range => (
                      <option key={range.value} value={range.value} className="bg-slate-800">
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Duration Filter */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Project Duration</label>
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="w-full px-4 py-3 glass-light border border-white/20 rounded-xl text-white bg-transparent focus:ring-2 focus:ring-indigo-500/50"
                  >
                    {durations.map(duration => (
                      <option key={duration.value} value={duration.value} className="bg-slate-800">
                        {duration.label}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            {/* Job Statistics */}
            <div className="glass-premium rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Job Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Total Jobs</span>
                  <span className="text-white font-semibold">{jobs.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">New Today</span>
                  <span className="text-green-400 font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Avg Budget</span>
                  <span className="text-white font-semibold">₹3,500</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Success Rate</span>
                  <span className="text-blue-400 font-semibold">94%</span>
                </div>
              </div>
            </div>

            {/* Trending Categories */}
            <div className="glass-premium rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Trending Categories
              </h3>
              <div className="space-y-3">
                {['Web Development', 'Mobile Apps', 'AI/ML', 'Design', 'Writing'].map((category, index) => (
                  <motion.button
                    key={category}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    onClick={() => setSelectedCategory(category.toLowerCase())}
                    className="w-full text-left px-4 py-3 glass-light hover:glass-medium rounded-xl transition-all flex items-center justify-between group"
                  >
                    <span className="text-white/80 group-hover:text-white">{category}</span>
                    <span className="text-white/60 text-sm">{Math.floor(Math.random() * 50) + 10}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Job Cards */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            {!loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center justify-between mb-6"
              >
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold text-white">
                    {filteredJobs.length} Jobs Found
                  </h2>
                  {selectedCategory !== 'all' && (
                    <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-medium border border-indigo-500/30">
                      {selectedCategory}
                    </span>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={fetchJobs}
                  className="px-4 py-2 glass-light hover:glass-medium rounded-xl text-white/80 hover:text-white transition-all flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </motion.button>
              </motion.div>
            )}

            {/* Job Cards Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {loading ? (
                Array(6).fill(0).map((_, i) => (
                  <JobCardSkeleton key={i} />
                ))
              ) : (
                filteredJobs.map((job, index) => (
                  <JobCard key={job.id} job={job} index={index} onApply={(job) => {
                    setSelectedJob(job);
                    setShowApplyModal(true);
                  }} />
                ))
              )}
            </div>

            {!loading && filteredJobs.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-white/40" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No Jobs Found</h3>
                <p className="text-white/60 mb-6">Try adjusting your search criteria or filters</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedBudget('all');
                    setSelectedDuration('all');
                  }}
                  className="px-6 py-3 btn-premium text-white font-semibold rounded-xl"
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && selectedJob && (
        <ApplyModal
          job={selectedJob}
          onClose={() => {
            setShowApplyModal(false);
            setSelectedJob(null);
          }}
        />
      )}
    </div>
  );
};

// Apply Modal Component
const ApplyModal = ({ job, onClose }) => {
  const [formData, setFormData] = useState({
    coverLetter: '',
    proposedRate: '',
    estimatedDuration: '',
    portfolio: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await bidsAPI.createBid({
        job_id: job.id,
        bid_amount: formData.proposedRate,
        proposal: formData.coverLetter,
        estimated_duration: formData.estimatedDuration,
        portfolio_link: formData.portfolio
      });
      if (result.success) {
        setSubmitted(true);
        setTimeout(() => { onClose(); }, 2000);
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      console.error('Error submitting bid:', err);
      alert('Failed to submit bid: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-premium rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {submitted ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Application Submitted!</h3>
            <p className="text-white/70">Your bid has been sent to the client.</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Apply for Job</h3>
                <p className="text-white/70">{job.title}</p>
              </div>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Cover Letter
                </label>
                <textarea
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 glass-light border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-indigo-500/50"
                  placeholder="Tell the client why you're the perfect fit for this job..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Proposed Rate (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.proposedRate}
                    onChange={(e) => setFormData({ ...formData, proposedRate: e.target.value })}
                    className="w-full px-4 py-3 glass-light border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="Your bid amount"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Estimated Duration
                  </label>
                  <input
                    type="text"
                    value={formData.estimatedDuration}
                    onChange={(e) => setFormData({ ...formData, estimatedDuration: e.target.value })}
                    className="w-full px-4 py-3 glass-light border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="e.g., 2 weeks"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Portfolio Link (Optional)
                </label>
                <input
                  type="url"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  className="w-full px-4 py-3 glass-light border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-indigo-500/50"
                  placeholder="https://your-portfolio.com"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 glass-light border border-white/20 text-white hover:glass-medium rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 btn-premium text-white font-semibold rounded-xl disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default BrowseJobs;