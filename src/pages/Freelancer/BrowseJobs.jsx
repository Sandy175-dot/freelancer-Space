import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Briefcase, TrendingUp, RefreshCw } from 'lucide-react';
import JobCard from '../../components/Jobs/JobCard';
import BidModal from '../../components/Jobs/BidModal';
import { jobService } from '../../services/jobService';
import { useAuth } from '../../contexts/AuthContext';

const CATEGORIES = [
  'All',
  'web development',
  'mobile apps',
  'design',
  'writing',
  'marketing',
  'data entry'
];

const BrowseJobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showBidModal, setShowBidModal] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    minBudget: '',
    maxBudget: ''
  });

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const filterParams = {
        ...(filters.category !== 'All' && { category: filters.category }),
        ...(filters.search && { search: filters.search }),
        ...(filters.minBudget && { minBudget: parseFloat(filters.minBudget) }),
        ...(filters.maxBudget && { maxBudget: parseFloat(filters.maxBudget) })
      };

      console.log('[BrowseJobs] Loading jobs with filters:', filterParams);
      const result = await jobService.getJobs(filterParams);
      
      setLoading(false);

      if (result.success) {
        console.log('[BrowseJobs] Loaded jobs:', result.data?.length || 0);
        setJobs(result.data || []);
      } else {
        console.error('[BrowseJobs] Failed to load jobs:', result.error);
        setError(result.error || 'Failed to load jobs');
        setJobs([]);
      }
    } catch (err) {
      console.error('[BrowseJobs] Exception loading jobs:', err);
      setError(err.message || 'An error occurred');
      setLoading(false);
      setJobs([]);
    }
  };

  const handleSearch = () => {
    jobService.clearCache(); // Clear cache to force fresh data
    loadJobs();
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setShowBidModal(true);
  };

  const handleBidSuccess = () => {
    setShowBidModal(false);
    setSelectedJob(null);
    alert('Bid submitted successfully!');
  };

  // Catch rendering errors
  try {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pastel-purple/10 via-white to-pastel-pink/10 py-8">
        <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="w-8 h-8 text-pastel-purple" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pastel-purple to-pastel-pink bg-clip-text text-transparent">
              Browse Jobs
            </h1>
          </div>
          <p className="text-gray-600">Find your next opportunity and submit your bid</p>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
            <button
              onClick={() => {
                setError(null);
                loadJobs();
              }}
              className="ml-4 underline hover:no-underline"
            >
              Retry
            </button>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-pastel-purple/20 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-pastel-purple" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Budget Range */}
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min $"
                value={filters.minBudget}
                onChange={(e) => setFilters({ ...filters, minBudget: e.target.value })}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Max $"
                value={filters.maxBudget}
                onChange={(e) => setFilters({ ...filters, maxBudget: e.target.value })}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-pastel-purple to-pastel-pink text-white rounded-lg hover:shadow-lg transition"
          >
            Apply Filters
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-pastel-purple" />
            <p className="text-gray-600">
              <span className="font-bold text-pastel-purple">{jobs.length}</span> jobs available
            </p>
          </div>
          <button
            onClick={() => {
              jobService.clearCache();
              loadJobs();
            }}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm text-pastel-purple hover:text-pastel-pink transition disabled:opacity-50"
            title="Refresh jobs"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </motion.div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pastel-purple"></div>
          </div>
        ) : jobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white/80 backdrop-blur-md rounded-2xl p-8"
          >
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No jobs found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters or check back later</p>
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-left max-w-2xl mx-auto">
              <h4 className="font-semibold text-blue-900 mb-2">📋 First time here?</h4>
              <p className="text-sm text-blue-800 mb-2">
                Make sure you've set up the database tables:
              </p>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Go to your Supabase dashboard</li>
                <li>Open SQL Editor</li>
                <li>Run the migration from <code className="bg-blue-100 px-1 rounded">supabase/migrations/create_jobs_and_bids.sql</code></li>
              </ol>
              <p className="text-xs text-blue-600 mt-3">
                See <code className="bg-blue-100 px-1 rounded">QUICK_START_CHECKLIST.md</code> for detailed instructions
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <JobCard job={job} onClick={() => handleJobClick(job)} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

        {/* Bid Modal */}
        <BidModal
          isOpen={showBidModal}
          onClose={() => setShowBidModal(false)}
          job={selectedJob}
          onSuccess={handleBidSuccess}
        />
      </div>
    );
  } catch (renderError) {
    console.error('[BrowseJobs] Render error:', renderError);
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Browse Jobs</h1>
          <p className="text-gray-700 mb-4">
            There was an error rendering the Browse Jobs page.
          </p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto mb-4">
            {renderError.message}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }
};

export default BrowseJobs;
