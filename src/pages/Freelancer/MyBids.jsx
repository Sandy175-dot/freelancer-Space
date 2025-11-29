import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, DollarSign, Calendar, TrendingUp, CheckCircle, XCircle, Clock } from 'lucide-react';
import { bidService } from '../../services/bidService';
import { useAuth } from '../../contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';

const MyBids = () => {
  const { user } = useAuth();
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, accepted, rejected

  useEffect(() => {
    loadBids();
  }, [user]);

  const loadBids = async () => {
    setLoading(true);
    const result = await bidService.getFreelancerBids(user.id);
    setLoading(false);

    if (result.success) {
      setBids(result.data);
    }
  };

  const filteredBids = bids.filter(bid => {
    if (filter === 'all') return true;
    return bid.status === filter;
  });

  const stats = {
    total: bids.length,
    pending: bids.filter(b => b.status === 'pending').length,
    accepted: bids.filter(b => b.status === 'accepted').length,
    rejected: bids.filter(b => b.status === 'rejected').length,
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      accepted: 'bg-green-100 text-green-700 border-green-200',
      rejected: 'bg-red-100 text-red-700 border-red-200'
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
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-pastel-purple" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pastel-purple to-pastel-pink bg-clip-text text-transparent">
              My Bids
            </h1>
          </div>
          <p className="text-gray-600">Track your bid submissions and their status</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-pastel-purple/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Bids</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-pastel-purple" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-yellow-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="w-10 h-10 text-yellow-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-green-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Accepted</p>
                <p className="text-3xl font-bold text-green-600">{stats.accepted}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-red-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Rejected</p>
                <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 mb-6"
        >
          {['all', 'pending', 'accepted', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                filter === status
                  ? 'bg-gradient-to-r from-pastel-purple to-pastel-pink text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Bids List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pastel-purple"></div>
          </div>
        ) : filteredBids.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white/80 backdrop-blur-md rounded-2xl"
          >
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No bids found</h3>
            <p className="text-gray-500">Start bidding on jobs to see them here</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredBids.map((bid, index) => (
              <motion.div
                key={bid.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-pastel-purple/20 hover:shadow-xl transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{bid.job?.title}</h3>
                      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(bid.status)}`}>
                        {getStatusIcon(bid.status)}
                        {bid.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{bid.job?.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-pastel-purple" />
                        <span>
                          <span className="font-semibold text-pastel-purple">${parseFloat(bid.bid_amount).toLocaleString()}</span>
                          {bid.job?.budget_max && (
                            <span className="text-gray-500"> / ${parseFloat(bid.job.budget_max).toLocaleString()} budget</span>
                          )}
                        </span>
                      </div>
                      {bid.job?.duration && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">
                            Duration: {bid.job.duration}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">
                          Bid {formatDistanceToNow(new Date(bid.created_at), { addSuffix: true })}
                        </span>
                      </div>
                    </div>

                    {/* Proposal Preview */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-700 mb-2 text-sm">Your Proposal:</h4>
                      <p className="text-gray-600 text-sm line-clamp-2">{bid.proposal}</p>
                    </div>
                  </div>
                </div>

                {/* Client Info */}
                {bid.job?.client && (
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                    <div className="w-8 h-8 bg-gradient-to-br from-pastel-purple to-pastel-pink rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {bid.job.client.name?.[0] || 'C'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">{bid.job.client.name}</p>
                      <p className="text-xs text-gray-500">Client</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBids;
