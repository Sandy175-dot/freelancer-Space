import { useState, useEffect } from 'react';
import { Search, MapPin, DollarSign, Clock, Briefcase, Send, Filter, Sparkles } from 'lucide-react';
import { getOpenJobs } from '../../lib/jobs';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const JobSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showBidModal, setShowBidModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidProposal, setBidProposal] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const categories = ['All', 'Web Development', 'Mobile Development', 'Design', 'Writing', 'Marketing', 'Data Entry', 'Video Editing', 'Translation'];

  // Load jobs on component mount
  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setLoading(true);
    setError('');
    
    const result = await getOpenJobs();
    
    if (result.success) {
      setJobs(result.data || []);
    } else {
      setError(result.error || 'Failed to load jobs');
    }
    
    setLoading(false);
  };

  // Filter jobs based on search and category
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
      job.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  const formatTimeAgo = (date) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return 'Recently';
    }
  };

  const handleBid = (job) => {
    setSelectedJob(job);
    setShowBidModal(true);
  };

  const submitBid = () => {
    // Handle bid submission
    alert('Bid submitted successfully!');
    setShowBidModal(false);
    setBidAmount('');
    setBidProposal('');
  };

  return (
    <div className="min-h-screen py-8 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-pastel-purple/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
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
              Job Search & Bidding
            </h1>
          </div>
          <p className="text-gray-600">Find and bid on projects that match your skills</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl mb-8 border border-pastel-purple/10"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-pastel-purple to-pastel-pink text-white rounded-lg hover:shadow-lg transition-shadow flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Search
            </motion.button>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-600">Filter by category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.toLowerCase())}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedCategory === category.toLowerCase()
                    ? 'bg-gradient-to-r from-pastel-purple to-pastel-pink text-white shadow-lg'
                    : 'bg-pastel-blue/20 text-gray-700 hover:bg-pastel-blue/30'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Job Listings */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pastel-purple"></div>
            <p className="mt-4 text-gray-600">Loading jobs...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-xl">
            <Briefcase className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow border border-transparent hover:border-pastel-purple/20"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{job.title}</h2>
                    <span className="px-3 py-1 bg-pastel-blue/20 text-gray-700 rounded-full text-sm">
                      {job.category}
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-pastel-mint/30 text-green-700 rounded-full text-sm">
                    {job.proposals_count || 0} proposals
                  </span>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills && job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-pastel-purple/20 text-gray-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Briefcase className="h-4 w-4" />
                    <span className="text-sm capitalize">{job.project_type}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm">${job.budget} {job.budget_type === 'hourly' ? '/hr' : 'fixed'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{job.duration || 'Not specified'}</span>
                  </div>
                  <div className="text-gray-500 text-sm">
                    Posted {formatTimeAgo(job.created_at)}
                  </div>
                </div>

              <motion.button
                onClick={() => handleBid(job)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-pastel-purple to-pastel-pink text-white rounded-lg hover:shadow-lg transition-shadow flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>Submit Proposal</span>
              </motion.button>
            </motion.div>
          ))}
            </AnimatePresence>
          </div>
        )}

        {/* Bid Modal */}
        {showBidModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Submit Proposal</h2>
              <div className="mb-4 p-4 bg-pastel-purple/10 rounded-lg">
                <h3 className="font-semibold text-gray-800">{selectedJob?.title}</h3>
                <p className="text-gray-600 text-sm">{selectedJob?.company}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Bid Amount ($)
                  </label>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Enter your bid amount"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proposal / Cover Letter
                  </label>
                  <textarea
                    value={bidProposal}
                    onChange={(e) => setBidProposal(e.target.value)}
                    placeholder="Explain why you're the best fit for this project..."
                    rows="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
                  ></textarea>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={submitBid}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-pastel-purple to-pastel-pink text-white rounded-lg hover:shadow-lg transition"
                  >
                    Submit Proposal
                  </button>
                  <button
                    onClick={() => setShowBidModal(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSearch;
