import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = "",
  variant = 'default', // default, glass, gradient, elevated
  hover = false,
  onClick = null,
  header = null,
  footer = null
}) => {
  const baseClasses = "rounded-xl border";
  
  const variants = {
    default: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm",
    glass: "bg-white/10 backdrop-blur-md border-white/20 shadow-lg",
    gradient: "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border-white/20 shadow-xl",
    elevated: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl"
  };

  const hoverClasses = hover ? "hover:shadow-lg hover:-translate-y-1 cursor-pointer" : "";
  const clickableClasses = onClick ? "cursor-pointer" : "";

  const cardClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${hoverClasses}
    ${clickableClasses}
    ${className}
  `;

  const CardContent = () => (
    <div className={cardClasses} onClick={onClick}>
      {header && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 border-opacity-50">
          {header}
        </div>
      )}
      
      <div className="p-6">
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 border-opacity-50">
          {footer}
        </div>
      )}
    </div>
  );

  if (hover || onClick) {
    return (
      <motion.div
        whileHover={{ y: hover ? -4 : 0, scale: hover ? 1.02 : 1 }}
        whileTap={onClick ? { scale: 0.98 } : {}}
        transition={{ duration: 0.2 }}
      >
        <CardContent />
      </motion.div>
    );
  }

  return <CardContent />;
};

// Card sub-components for better composition
Card.Header = ({ children, className = "" }) => (
  <div className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 border-opacity-50 ${className}`}>
    {children}
  </div>
);

Card.Body = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

Card.Footer = ({ children, className = "" }) => (
  <div className={`px-6 py-4 border-t border-gray-200 dark:border-gray-700 border-opacity-50 ${className}`}>
    {children}
  </div>
);

export default Card;