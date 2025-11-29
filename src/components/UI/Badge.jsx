import { motion } from 'framer-motion';

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '',
  ...props 
}) => {
  const variants = {
    default: 'bg-white/10 text-white border-white/20',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    primary: 'bg-[#ff007f]/20 text-[#ff007f] border-[#ff007f]/30',
    secondary: 'bg-[#00c6ff]/20 text-[#00c6ff] border-[#00c6ff]/30'
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`
        badge 
        ${variants[variant]} 
        ${sizes[size]} 
        ${className}
        inline-flex items-center font-medium border
      `}
      {...props}
    >
      {children}
    </motion.span>
  );
};

export default Badge;