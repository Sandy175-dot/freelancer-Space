import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, FileText, Send } from 'lucide-react';
import { bidService } from '../../services/bidService';
import { useAuth } from '../../contexts/AuthContext';

const BidModal = ({ isOpen, onClose, job, onSuccess }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    bid_amount: '',
    proposal: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.bid_amount || !formData.proposal) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (parseFloat(formData.bid_amount) <= 0) {
      setError('Bid amount must be greater than 0');
      setLoading(false);
      return;
    }

    if (formData.proposal.length < 50) {
      setError('Proposal must be at least 50 characters');
      setLoading(false);
      return;
    }

    // Check if already bid
    const checkResult = await bidService.checkExistingBid(job.id, user.id);
    if (checkResult.exists) {
      setError('You have already placed a bid on this job');
      setLoading(false);
      return;
    }

    const bidData = {
      job_id: job.id,
      freelancer_id: user.id,
      bid_amount: parseFloat(formData.bid_amount),
      proposal: formData.proposal
    };

    const result = await bidService.createBid(bidData);
    setLoading(false);

    if (result.success) {
      onSuccess(result.data);
      onClose();
    } else {
      setError(result.error || 'Failed to submit bid');
    }
  };

  if (!isOpen || !job) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
        <motion.div
          initial={{ scale: 0.9, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 50, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-pastel-purple via-pastel-pink to-pastel-coral p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">Submit Your Bid</h2>
                <p className="text-white/90 text-sm">{job.title}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Job Info */}
          <div className="p-6 bg-gradient-to-br from-pastel-purple/5 to-pastel-pink/5 border-b">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Client Budget</p>
                <p className="text-2xl font-bold text-pastel-purple">
                  {job.budget_min && job.budget_max && job.budget_min !== job.budget_max
                    ? `$${job.budget_min.toLocaleString()} - $${job.budget_max.toLocaleString()}`
                    : `$${(job.budget_max || job.budget_min || 0).toLocaleString()}`
                  }
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{job.duration ? 'Duration' : 'Experience'}</p>
                <p className="text-lg font-semibold text-gray-900">
                  {job.duration || job.experience_level || 'Not specified'}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            {/* Bid Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Bid Amount (USD) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  name="bid_amount"
                  value={formData.bid_amount}
                  onChange={handleChange}
                  placeholder="Enter your bid amount"
                  min="0"
                  step="0.01"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent text-lg font-semibold"
                  required
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Tip: Competitive bids are typically within 80-120% of the client's budget
              </p>
            </div>

            {/* Proposal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Proposal * (minimum 50 characters)
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <textarea
                  name="proposal"
                  value={formData.proposal}
                  onChange={handleChange}
                  placeholder="Explain why you're the best fit for this job. Include your relevant experience, approach, and timeline..."
                  rows={8}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent resize-none"
                  required
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {formData.proposal.length} / 50 characters minimum
              </p>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Tips for a winning bid:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Highlight your relevant experience and skills</li>
                <li>• Explain your approach to the project</li>
                <li>• Mention similar projects you've completed</li>
                <li>• Be clear about your timeline and availability</li>
                <li>• Ask clarifying questions if needed</li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-pastel-purple to-pastel-pink text-white rounded-lg hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Bid
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BidModal;
