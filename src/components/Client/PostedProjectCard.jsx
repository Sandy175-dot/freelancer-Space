import { motion } from 'framer-motion';
import { 
  Calendar, 
  DollarSign, 
  Users, 
  Eye, 
  MessageSquare,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

const PostedProjectCard = ({ project, index }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'from-green-500 to-emerald-500';
      case 'in-review':
        return 'from-blue-500 to-indigo-500';
      case 'completed':
        return 'from-purple-500 to-violet-500';
      case 'paused':
        return 'from-gray-500 to-slate-500';
      default:
        return 'from-indigo-500 to-purple-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'in-review':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'paused':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(99, 102, 241, 0.15)"
      }}
      className="glass-premium rounded-2xl p-6 hover-glow group cursor-pointer relative overflow-hidden"
    >
      {/* Gentle Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white group-hover:text-gradient-primary transition-all duration-300 mb-1">
              {project.title}
            </h3>
            <p className="text-white/70 text-sm">{project.category}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1 bg-gradient-to-r ${getStatusColor(project.status)} rounded-full flex items-center gap-2`}>
              {getStatusIcon(project.status)}
              <span className="text-white text-xs font-medium capitalize">
                {project.status.replace('-', ' ')}
              </span>
            </div>
            <button className="w-8 h-8 glass-light hover:glass-medium rounded-lg flex items-center justify-center transition-all">
              <MoreHorizontal className="w-4 h-4 text-white/70" />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/80 text-sm mb-4 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-xs">Budget</p>
              <p className="text-white font-semibold text-sm">{project.budget}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-xs">Bids</p>
              <p className="text-white font-semibold text-sm">{project.bidsCount}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-xs">Posted</p>
              <p className="text-white font-semibold text-sm">{project.postedDate}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-xs">Views</p>
              <p className="text-white font-semibold text-sm">{project.views}</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.skills.slice(0, 3).map((skill, skillIndex) => (
            <span
              key={skillIndex}
              className="px-3 py-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white/90 rounded-lg text-xs font-medium border border-white/20"
            >
              {skill}
            </span>
          ))}
          {project.skills.length > 3 && (
            <span className="px-3 py-1 bg-white/10 text-white/70 rounded-lg text-xs font-medium border border-white/20">
              +{project.skills.length - 3}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 font-semibold text-sm flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View Bids
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 px-4 py-3 glass-light border border-white/30 text-white hover:glass-medium hover:border-white/50 rounded-xl transition-all duration-300 font-semibold text-sm flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Messages
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PostedProjectCard;