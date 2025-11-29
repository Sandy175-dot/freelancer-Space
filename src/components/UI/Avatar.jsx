import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const Avatar = ({ 
  src, 
  alt, 
  size = 'md', 
  name,
  verified = false,
  online = false,
  className = '',
  ...props 
}) => {
  const sizes = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20'
  };

  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const generateGradient = (name) => {
    if (!name) return 'from-gray-500 to-gray-600';
    const colors = [
      'from-blue-500 to-indigo-600',
      'from-purple-500 to-pink-600',
      'from-green-500 to-emerald-600',
      'from-orange-500 to-red-600',
      'from-cyan-500 to-blue-600',
      'from-pink-500 to-rose-600'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`relative ${sizes[size]} ${className}`}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt || name}
          className={`${sizes[size]} rounded-full object-cover`}
        />
      ) : (
        <div className={`
          ${sizes[size]} 
          rounded-full 
          bg-gradient-to-r ${generateGradient(name)}
          flex items-center justify-center
          text-white font-semibold
          ${size === 'xs' || size === 'sm' ? 'text-xs' : 
            size === 'md' ? 'text-sm' : 
            size === 'lg' ? 'text-base' : 'text-lg'}
        `}>
          {name ? getInitials(name) : <User className="w-1/2 h-1/2" />}
        </div>
      )}

      {/* Online Indicator */}
      {online && (
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#1dd1a1] border-2 border-[#0d0f17] rounded-full"></div>
      )}

      {/* Verified Badge */}
      {verified && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#00c6ff] rounded-full flex items-center justify-center">
          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </motion.div>
  );
};

export default Avatar;