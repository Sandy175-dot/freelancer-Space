import { motion } from 'framer-motion';

const JobCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-premium rounded-2xl p-6 animate-pulse"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/10 rounded-xl"></div>
          <div>
            <div className="h-5 bg-white/10 rounded w-32 mb-2"></div>
            <div className="h-4 bg-white/10 rounded w-24"></div>
          </div>
        </div>
        <div className="w-10 h-10 bg-white/10 rounded-xl"></div>
      </div>

      {/* Description */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-white/10 rounded w-full"></div>
        <div className="h-4 bg-white/10 rounded w-3/4"></div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded-lg"></div>
            <div>
              <div className="h-3 bg-white/10 rounded w-12 mb-1"></div>
              <div className="h-4 bg-white/10 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="flex gap-2 mb-4">
        {Array(3).fill(0).map((_, i) => (
          <div key={i} className="h-6 bg-white/10 rounded-lg w-16"></div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <div className="flex-1 h-10 bg-white/10 rounded-xl"></div>
        <div className="flex-1 h-10 bg-white/10 rounded-xl"></div>
      </div>
    </motion.div>
  );
};

export default JobCardSkeleton;