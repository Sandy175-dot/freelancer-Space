import { motion } from 'framer-motion';
import { 
  User, 
  Star, 
  DollarSign, 
  Clock, 
  MessageSquare,
  CheckCircle,
  Shield,
  Award,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

const BidCard = ({ bid, index }) => {
  const generateAvatar = (name) => {
    const colors = [
      'from-blue-500 to-indigo-500',
      'from-purple-500 to-violet-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-pink-500 to-rose-500',
      'from-cyan-500 to-blue-500'
    ];
    const colorIndex = name.charCodeAt(0) % colors.length;
    return colors[colorIndex];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -5, 
        scale: 1.01,
        boxShadow: "0 15px 30px rgba(99, 102, 241, 0.1)"
      }}
      className="glass-premium rounded-2xl p-6 hover-glow group cursor-pointer"
    >
      {/* Header with Avatar and Info */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <div className={`w-12 h-12 bg-gradient-to-r ${generateAvatar(bid.freelancer.name)} rounded-full flex items-center justify-center shadow-lg`}>
            <span className="text-white font-bold text-lg">
              {bid.freelancer.name.charAt(0)}
            </span>
          </div>
          {bid.freelancer.verified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-white font-bold">{bid.freelancer.name}</h4>
            {bid.freelancer.verified && (
              <Shield className="w-4 h-4 text-green-400" />
            )}
            {bid.freelancer.topRated && (
              <Award className="w-4 h-4 text-yellow-400" />
            )}
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-white/80">{bid.freelancer.rating}</span>
              <span className="text-white/60">({bid.freelancer.reviews} reviews)</span>
            </div>
            <span className="text-white/60">{bid.freelancer.completedJobs} jobs completed</span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-gradient-primary mb-1">
            {bid.amount}
          </div>
          <div className="text-white/60 text-sm">{bid.timeline}</div>
        </div>
      </div>

      {/* Proposal */}
      <div className="mb-4">
        <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
          {bid.proposal}
        </p>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {bid.freelancer.skills.slice(0, 4).map((skill, skillIndex) => (
          <span
            key={skillIndex}
            className="px-3 py-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white/90 rounded-lg text-xs font-medium border border-white/20"
          >
            {skill}
          </span>
        ))}
        {bid.freelancer.skills.length > 4 && (
          <span className="px-3 py-1 bg-white/10 text-white/70 rounded-lg text-xs font-medium border border-white/20">
            +{bid.freelancer.skills.length - 4}
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 py-3 border-t border-white/10">
        <div className="text-center">
          <div className="text-white font-semibold">{bid.freelancer.responseTime}</div>
          <div className="text-white/60 text-xs">Response Time</div>
        </div>
        <div className="text-center">
          <div className="text-white font-semibold">{bid.freelancer.successRate}%</div>
          <div className="text-white/60 text-xs">Success Rate</div>
        </div>
        <div className="text-center">
          <div className="text-white font-semibold">{bid.submittedAt}</div>
          <div className="text-white/60 text-xs">Submitted</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 font-semibold text-sm flex items-center justify-center gap-2"
        >
          <ThumbsUp className="w-4 h-4" />
          Accept
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-3 glass-light border border-white/30 text-white hover:glass-medium hover:border-white/50 rounded-xl transition-all duration-300 font-semibold text-sm flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          Message
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-3 glass-light border border-red-500/30 text-red-300 hover:bg-red-500/10 hover:border-red-500/50 rounded-xl transition-all duration-300 font-semibold text-sm flex items-center justify-center gap-2"
        >
          <ThumbsDown className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BidCard;