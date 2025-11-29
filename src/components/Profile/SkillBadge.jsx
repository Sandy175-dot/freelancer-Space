import { motion } from 'framer-motion';
import { CheckCircle, Star } from 'lucide-react';

const SkillBadge = ({ skill, level = 'intermediate', verified = false, index = 0 }) => {
  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner':
        return 'from-blue-500 to-cyan-500';
      case 'intermediate':
        return 'from-green-500 to-emerald-500';
      case 'advanced':
        return 'from-purple-500 to-violet-500';
      case 'expert':
        return 'from-orange-500 to-red-500';
      default:
        return 'from-gray-500 to-slate-500';
    }
  };

  const getLevelStars = (level) => {
    switch (level) {
      case 'beginner': return 1;
      case 'intermediate': return 2;
      case 'advanced': return 3;
      case 'expert': return 4;
      default: return 1;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05, 
        y: -5,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
      }}
      className="relative group"
    >
      {/* Neumorphism Container */}
      <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl p-4 shadow-neumorphism hover:shadow-neumorphism-hover transition-all duration-300">
        {/* Skill Name */}
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-gray-800 text-lg">{skill}</h4>
          {verified && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
            >
              <CheckCircle className="w-4 h-4 text-white" />
            </motion.div>
          )}
        </div>

        {/* Level Indicator */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-gray-600 text-sm font-medium capitalize">{level}</span>
          <div className="flex gap-1">
            {[...Array(4)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < getLevelStars(level)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(getLevelStars(level) / 4) * 100}%` }}
            transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
            className={`h-full bg-gradient-to-r ${getLevelColor(level)} rounded-full`}
          />
        </div>

        {/* Verified Badge */}
        {verified && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 + index * 0.1 }}
            className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg"
          >
            Verified
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SkillBadge;