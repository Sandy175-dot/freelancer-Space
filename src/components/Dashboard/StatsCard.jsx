import { motion } from 'framer-motion';
import AnimatedCounter from '../UI/AnimatedCounter';

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  subtitle, 
  trend, 
  index = 0,
  prefix = '',
  suffix = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass-premium rounded-2xl p-6 hover-glow group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            trend > 0 
              ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
              : 'bg-red-500/20 text-red-300 border border-red-500/30'
          }`}>
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      
      <div className="mb-2">
        <AnimatedCounter
          end={value}
          prefix={prefix}
          suffix={suffix}
          className="text-3xl font-bold text-gradient-primary"
        />
      </div>
      
      <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
      {subtitle && (
        <p className="text-white/60 text-sm">{subtitle}</p>
      )}
    </motion.div>
  );
};

export default StatsCard;