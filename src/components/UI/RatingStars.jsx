import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const RatingStars = ({ 
  rating = 0, 
  onRatingChange = null, 
  size = 'md',
  readonly = false,
  showValue = false,
  className = ""
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  const handleMouseEnter = (index) => {
    if (readonly) return;
    setHoverRating(index + 1);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverRating(0);
    setIsHovering(false);
  };

  const handleClick = (index) => {
    if (readonly || !onRatingChange) return;
    onRatingChange(index + 1);
  };

  const displayRating = isHovering ? hoverRating : rating;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => {
          const isFilled = index < displayRating;
          const isPartial = !Number.isInteger(displayRating) && 
                           index === Math.floor(displayRating) && 
                           displayRating > index;
          
          return (
            <motion.button
              key={index}
              className={`
                ${sizes[size]} relative transition-colors duration-200
                ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
                ${!readonly ? 'focus:outline-none focus:ring-2 focus:ring-primary/50 rounded' : ''}
              `}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(index)}
              disabled={readonly}
              whileHover={!readonly ? { scale: 1.1 } : {}}
              whileTap={!readonly ? { scale: 0.95 } : {}}
            >
              <Star
                className={`
                  ${sizes[size]} transition-all duration-200
                  ${isFilled 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : isHovering && index < hoverRating
                      ? 'text-yellow-300 fill-yellow-300'
                      : 'text-gray-400 dark:text-gray-600'
                  }
                `}
              />
              
              {/* Partial fill for decimal ratings */}
              {isPartial && (
                <div 
                  className="absolute inset-0 overflow-hidden"
                  style={{ 
                    width: `${(displayRating - Math.floor(displayRating)) * 100}%` 
                  }}
                >
                  <Star
                    className={`${sizes[size]} text-yellow-400 fill-yellow-400`}
                  />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
      
      {showValue && (
        <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingStars;