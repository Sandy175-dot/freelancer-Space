import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  Briefcase, 
  DollarSign, 
  Clock, 
  MapPin, 
  Heart, 
  ArrowRight, 
  Zap,
  Star,
  Eye,
  Bookmark,
  Target,
  TrendingUp,
  Award,
  CheckCircle,
  AlertCircle,
  Users,
  Calendar
} from 'lucide-react';
import { useToastNotifications } from '../UI/Toast';

const EnhancedJobCard = ({ 
  job, 
  index, 
  onApply, 
  onSave,
  onView,
  variant = 'default', // default, compact, featured, premium
  showAnalytics = false,
  showMatchScore = false,
  className = ""
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [viewCount, setViewCount] = useState(job.views || Math.floor(Math.random() * 100) + 10);
  const { showJobSaved, showJobApplicationSuccess } = useToastNotifications();

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

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    if (onSave) {
      onSave(job);
    }
    if (!isBookmarked) {
      showJobSaved(job.title);
    }
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleApply = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onApply) {
      onApply(job);
    }
    showJobApplicationSuccess(job.title);
  };

  const handleView = () => {
    setViewCount(prev => prev + 1);
    if (onView) {
      onView(job);
    }
  };

  const getUrgencyLevel = () => {
    const urgencyScore = job.urgency_score || 0;
    if (urgencyScore > 8) return { level: 'high', color: 'red', text: 'Urgent', icon: AlertCircle };
    if (urgencyScore > 5) return { level: 'medium', color: 'yellow', text: 'Moderate', icon: Clock };
    return { level: 'low', color: 'green', text: 'Standard', icon: CheckCircle };
  };

  const getDifficultyColor = () => {
    switch (job.difficulty_level) {
      case 'Easy': return 'from-green-500 to-emerald-500';
      case 'Medium': return 'from-yellow-500 to-orange-500';
      case 'Hard': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const urgency = getUrgencyLevel();
  const UrgencyIcon = urgency.icon;

  // Compact variant for list views
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{ x: 4, scale: 1.01 }}
        onClick={handleView}
        className={`
          glass-light rounded-xl p-4 hover:glass-medium
          transition-all duration-200 cursor-pointer
          border border-white/20 hover:border-white/30
          ${className}
        `}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold truncate">{job.title}</h3>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <span>{job.budget_range || `$${job.budget?.toLocaleString() || 'TBD'}`}</span>
                <span>•</span>
                <span>{timeAgo(job.created_at || job.deadline)}</span>
                {job.company && (
                  <>
                    <span>•</span>
                    <span className="truncate">{job.company}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 ml-4">
            {showMatchScore && job.match_score && (
              <div className="flex items-center gap-1 text-sm text-green-400">
                <Target className="h-3 w-3" />
                {job.match_score}%
              </div>
            )}
            
            <button
              onClick={handleBookmark}
              className={`
                p-1 rounded transition-colors
                ${isBookmarked 
                  ? 'text-yellow-400' 
                  : 'text-white/60 hover:text-white'
                }
              `}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Premium variant with advanced features
  if (variant === 'premium') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ 
          y: -12, 
          scale: 1.03,
          rotateY: 5,
          boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.4)"
        }}
        className={`
          glass-premium rounded-3xl p-8 hover-glow group cursor-pointer 
          relative overflow-hidden border border-white/30
          ${className}
        `}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          backdropFilter: 'blur(20px)'
        }}
      >
        {/* Premium badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs px-3 py-1 rounded-full font-bold">
          PREMIUM
        </div>

        {/* Urgency indicator */}
        {urgency.level !== 'low' && (
          <div className={`
            absolute top-4 left-4 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
            ${urgency.color === 'red' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : ''}
            ${urgency.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' : ''}
          `}>
            <UrgencyIcon className="h-3 w-3" />
            {urgency.text}
          </div>
        )}

        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
        
        <div className="relative z-10 mt-8">
          {/* Enhanced Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <motion.div 
                className={`w-16 h-16 bg-gradient-to-br ${getDifficultyColor()} rounded-2xl flex items-center justify-center shadow-2xl`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.8 }}
              >
                <Briefcase className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-gradient-primary transition-all duration-300 line-clamp-2">
                  {job.title}
                </h3>
                <p className="text-white/80 font-semibold text-lg">{job.company}</p>
                {job.experience_level && (
                  <span className="inline-block mt-1 px-3 py-1 bg-white/10 text-white/90 rounded-full text-xs font-medium border border-white/20">
                    {job.experience_level}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button 
                onClick={handleLike}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                className={`
                  w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300
                  ${isLiked 
                    ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }
                `}
              >
                <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
              </motion.button>
              
              <motion.button 
                onClick={handleBookmark}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`
                  w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300
                  ${isBookmarked 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }
                `}
              >
                <Bookmark className={`h-6 w-6 ${isBookmarked ? 'fill-current' : ''}`} />
              </motion.button>
              
              <span className="text-white/60 text-sm font-medium">{timeAgo(job.created_at)}</span>
            </div>
          </div>

          {/* Enhanced Description */}
          <p className="text-white/90 mb-6 text-base leading-relaxed line-clamp-3">
            {job.description}
          </p>

          {/* Advanced Analytics */}
          {showAnalytics && (
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <p className="text-white/60 text-xs">Views</p>
                <p className="text-white font-bold">{viewCount}</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <p className="text-white/60 text-xs">Applicants</p>
                <p className="text-white font-bold">{Math.floor(Math.random() * 20) + 5}</p>
              </div>
              
              {showMatchScore && job.match_score && (
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white/60 text-xs">Match</p>
                  <p className="text-white font-bold">{job.match_score}%</p>
                </div>
              )}
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <p className="text-white/60 text-xs">Trending</p>
                <p className="text-white font-bold">#{Math.floor(Math.random() * 10) + 1}</p>
              </div>
            </div>
          )}

          {/* Enhanced Job Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white/60 text-xs">Budget</p>
                <p className="text-white font-bold">{job.budget_range || `$${job.budget?.toLocaleString() || 'TBD'}`}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white/60 text-xs">Duration</p>
                <p className="text-white font-bold">{job.duration || job.estimated_hours ? `${job.estimated_hours}h` : 'TBD'}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white/60 text-xs">Location</p>
                <p className="text-white font-bold">{job.location || 'Remote'}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white/60 text-xs">Difficulty</p>
                <p className="text-white font-bold">{job.difficulty_level || 'Medium'}</p>
              </div>
            </div>
          </div>

          {/* Enhanced Skills */}
          {(job.skills || job.tags) && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {(job.skills || job.tags || []).slice(0, 5).map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-white/95 rounded-xl text-sm font-medium border border-white/30 backdrop-blur-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
                {(job.skills || job.tags || []).length > 5 && (
                  <span className="px-4 py-2 bg-white/10 text-white/70 rounded-xl text-sm font-medium border border-white/20">
                    +{(job.skills || job.tags).length - 5} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Enhanced Action Buttons */}
          <div className="flex gap-4">
            <Link
              to={`/job/${job.id}`}
              onClick={handleView}
              className="group flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 font-bold text-center"
            >
              <span className="flex items-center justify-center gap-3">
                <Eye className="w-5 h-5" />
                View Details
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
            
            <motion.button 
              onClick={handleApply}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 px-6 py-4 glass-light border-2 border-white/40 text-white hover:glass-medium hover:border-white/60 rounded-2xl transition-all duration-300 font-bold backdrop-blur-sm"
            >
              <span className="flex items-center justify-center gap-3">
                <Zap className="w-5 h-5" />
                Apply Now
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default enhanced variant
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
      className={`glass-premium rounded-2xl p-6 hover-glow group cursor-pointer relative overflow-hidden ${className}`}
    >
      {/* Urgency indicator */}
      {urgency.level !== 'low' && (
        <div className={`
          absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
          ${urgency.color === 'red' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : ''}
          ${urgency.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' : ''}
        `}>
          <UrgencyIcon className="h-3 w-3" />
          {urgency.text}
        </div>
      )}

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
              onClick={handleLike}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              className={`
                w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all duration-300
                ${isLiked 
                  ? 'bg-gradient-to-r from-pink-500 to-red-500 shadow-lg' 
                  : 'bg-white/10 hover:bg-white/20'
                }
              `}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
            </motion.button>
            
            <motion.button 
              onClick={handleBookmark}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`
                w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                ${isBookmarked 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }
              `}
            >
              <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </motion.button>
            
            <span className="text-white/60 text-sm">{timeAgo(job.created_at)}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/80 mb-4 text-sm leading-relaxed line-clamp-2">
          {job.description}
        </p>

        {/* Analytics row */}
        {showAnalytics && (
          <div className="flex items-center gap-4 mb-4 text-xs text-white/60">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {viewCount} views
            </div>
            {job.estimated_hours && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                ~{job.estimated_hours}h
              </div>
            )}
            {showMatchScore && job.match_score && (
              <div className="flex items-center gap-1 text-green-400">
                <Target className="h-3 w-3" />
                {job.match_score}% match
              </div>
            )}
          </div>
        )}

        {/* Job Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-xs">Budget</p>
              <p className="text-white font-semibold text-sm">{job.budget_range || `$${job.budget?.toLocaleString() || 'TBD'}`}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-xs">Duration</p>
              <p className="text-white font-semibold text-sm">{job.duration || (job.estimated_hours ? `${job.estimated_hours}h` : 'TBD')}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-xs">Location</p>
              <p className="text-white font-semibold text-sm">{job.location || 'Remote'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-xs">Level</p>
              <p className="text-white font-semibold text-sm">{job.experience_level || 'Any'}</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        {(job.skills || job.tags) && (job.skills || job.tags).length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {(job.skills || job.tags || []).slice(0, 3).map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="px-3 py-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white/90 rounded-lg text-xs font-medium border border-white/20"
                >
                  {skill}
                </span>
              ))}
              {(job.skills || job.tags || []).length > 3 && (
                <span className="px-3 py-1 bg-white/10 text-white/70 rounded-lg text-xs font-medium border border-white/20">
                  +{(job.skills || job.tags).length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            to={`/job/${job.id}`}
            onClick={handleView}
            className="group flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 font-semibold text-center text-sm"
          >
            <span className="flex items-center justify-center gap-2">
              <Eye className="w-4 h-4" />
              View Details
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          
          <motion.button 
            onClick={handleApply}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 px-4 py-3 glass-light border border-white/30 text-white hover:glass-medium hover:border-white/50 rounded-xl transition-all duration-300 font-semibold text-sm"
          >
            <span className="flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" />
              Apply Now
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedJobCard;