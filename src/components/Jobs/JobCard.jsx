import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  DollarSign, 
  Clock, 
  MapPin, 
  Calendar, 
  Heart, 
  ArrowRight, 
  Zap,
  Star,
  Eye
} from 'lucide-react';

const JobCard = ({ job, index, onApply }) => {
  const timeAgo = (dateString) => {
    if (!dateString) return 'Recently';
    const now = new Date();
    const posted = new Date(dateString);
    const diffMs = now - posted;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return `${Math.floor(diffDays / 7)}w ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      className="glass-premium rounded-2xl p-6 hover-glow group cursor-pointer relative overflow-hidden"
    >
      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <Briefcase className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-gradient-primary transition-all duration-300 line-clamp-1">
                {job.title}
              </h3>
              <p className="text-white/70 font-medium">{job.company}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center text-white hover:shadow-lg transition-all duration-300"
            >
              <Heart className="h-5 w-5" />
            </motion.button>
            <span className="text-white/60 text-sm">{timeAgo(job.created_at)}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/80 mb-4 text-sm leading-relaxed line-clamp-2">
          {job.description}
        </p>

        {/* Job Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-xs">Budget</p>
              <p className="text-white font-semibold text-sm">{job.budget}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-xs">Duration</p>
              <p className="text-white font-semibold text-sm">{job.duration}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-xs">Location</p>
              <p className="text-white font-semibold text-sm">{job.location}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-xs">Rating</p>
              <p className="text-white font-semibold text-sm">4.8/5</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        {job.skills && job.skills.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {job.skills.slice(0, 3).map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="px-3 py-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white/90 rounded-lg text-xs font-medium border border-white/20"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 3 && (
                <span className="px-3 py-1 bg-white/10 text-white/70 rounded-lg text-xs font-medium border border-white/20">
                  +{job.skills.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            to={`/job/${job.id}`}
            className="group flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 font-semibold text-center text-sm"
          >
            <span className="flex items-center justify-center gap-2">
              <Eye className="w-4 h-4" />
              View Details
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          
          <motion.button 
            onClick={() => onApply(job)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 px-4 py-3 glass-light border border-white/30 text-white hover:glass-medium hover:border-white/50 rounded-xl transition-all duration-300 font-semibold text-sm"
          >
            <span className="flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" />
              Bid Now
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;