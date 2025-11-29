import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Briefcase, Edit, Trash2, Eye, DollarSign, Users, Clock } from 'lucide-react';
import PostJobForm from '../../components/Jobs/PostJobForm';
import { jobService } from '../../services/jobService';
import { bidService } from '../../services/bidService';
import { useAuth } from '../../contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';

const MyJobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPostForm, setShowPostForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showBidsModal, setShowBidsModal] = useState(false);

  useEffect(() => {
    loadJobs();
  }, [user]);

  const loadJobs = async () => {
    setLoading(true);
    const result = await jobService.getClientJobs(user.id);
    setLoading(false);

    if (result.success) {
      setJobs(result.data);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    const result = await jobService.deleteJob(jobId);
    if (result.success) {
      loadJobs();
      alert('Job deleted successfully');
    } else {
      alert('Failed to delete job');
    }
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setShowPostForm(true);
  };

  const handleViewBids = (job) => {
    setSelectedJob(job);
    setShowBidsModal(true);
  };

  const handleAcceptBid = async (bidId) => {
    if (!confirm('Accept this bid? This will notify the freelancer.')) return;

    const result = await bidService.updateBidStatus(bidId, 'accepted');
    if (result.success) {
      loadJobs();
      alert('Bid accepted successfully!');
    } else {
      alert('Failed to accept bid');
    }
  };

  const handleRejectBid = async (bidId) => {
    if (!confirm('Reject this bid?')) return;

    const result = await bidService.updateBidStatus(bidId, 'rejected');
    if (result.success) {
      loadJobs();
      alert('Bid rejected');
    } else {
      alert('Failed to reject bid');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      open: 'bg-green-100 text-green-700 border-green-200',
      closed: 'bg-gray-100 text-gray-700 border-gray-200',
      in_progress: 'bg-blue-100 text-blue-700 border-blue-200',
      completed: 'bg-purple-100 text-purple-700 border-purple-200'
    };
    return colors[status] || colors.open;
  };

  const getBidStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      accepted: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700'
    };
    return colors[status] || colors.pending;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-purple/10 via-white to-pastel-pink/10 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="w-8 h-8 text-pastel-purple" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pastel-purple to-pastel-pink bg-clip-text text-transparent">
                My Jobs
              </h1>
            </div>
            <p className="text-gray-600">Manage your job postings and review bids</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setEditingJob(null);
              setShowPostForm(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pastel-purple to-pastel-pink text-white rounded-lg shadow-lg hover:shadow-xl transition"
          >
            <Plus className="w-5 h-5" />
            Post New Job
          </motion.button>
        </motion.div>

        {/* Jobs List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pastel-purple"></div>
          </div>
        ) : jobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white/80 backdrop-blur-md rounded-2xl"
          >
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No jobs posted yet</h3>
            <p className="text-gray-500 mb-6">Start by posting your first job</p>
            <button
              onClick={() => setShowPostForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-pastel-purple to-pastel-pink text-white rounded-lg hover:shadow-lg transition"
            >
              Post Your First Job
            </button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-pastel-purple/20 hover:shadow-xl transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-pastel-purple" />
                        <span className="font-semibold">${parseFloat(job.budget).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-pastel-pink" />
                        <span>{job.bids?.length || 0} bids</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewBids(job)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="View Bids"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleEditJob(job)}
                      className="p-2 text-pastel-purple hover:bg-pastel-purple/10 rounded-lg transition"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Tags */}
                {job.tags && job.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Post Job Form Modal */}
      <PostJobForm
        isOpen={showPostForm}
        onClose={() => {
          setShowPostForm(false);
          setEditingJob(null);
        }}
        onSuccess={loadJobs}
        editJob={editingJob}
      />

      {/* Bids Modal */}
      <AnimatePresence>
        {showBidsModal && selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowBidsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-gradient-to-r from-pastel-purple to-pastel-pink p-6 text-white">
                <h2 className="text-2xl font-bold">Bids for: {selectedJob.title}</h2>
                <p className="text-white/90">{selectedJob.bids?.length || 0} total bids</p>
              </div>

              <div className="p-6">
                {selectedJob.bids && selectedJob.bids.length > 0 ? (
                  <div className="space-y-4">
                    {selectedJob.bids.map((bid) => (
                      <div key={bid.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-pastel-purple to-pastel-pink rounded-full flex items-center justify-center text-white font-bold">
                              {bid.freelancer?.name?.[0] || 'F'}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{bid.freelancer?.name || 'Freelancer'}</h4>
                              <p className="text-sm text-gray-500">{bid.freelancer?.email}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-pastel-purple">${parseFloat(bid.bid_amount).toLocaleString()}</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${getBidStatusColor(bid.status)}`}>
                              {bid.status}
                            </span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <h5 className="font-medium text-gray-700 mb-1">Proposal:</h5>
                          <p className="text-gray-600 text-sm">{bid.proposal}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">
                            Submitted {formatDistanceToNow(new Date(bid.created_at), { addSuffix: true })}
                          </p>
                          {bid.status === 'pending' && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleAcceptBid(bid.id)}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleRejectBid(bid.id)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No bids yet</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyJobs;
