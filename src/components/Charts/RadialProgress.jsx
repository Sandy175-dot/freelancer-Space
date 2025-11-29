import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const RadialProgress = ({ 
  percentage, 
  title, 
  subtitle, 
  color = '#6366f1',
  size = 120,
  strokeWidth = 8 
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 300);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center"
    >
      <div style={{ width: size, height: size }} className="mb-4">
        <CircularProgressbar
          value={animatedPercentage}
          text={`${Math.round(animatedPercentage)}%`}
          styles={buildStyles({
            textSize: '16px',
            pathColor: color,
            textColor: '#ffffff',
            trailColor: 'rgba(255, 255, 255, 0.1)',
            backgroundColor: 'transparent',
            strokeLinecap: 'round',
            pathTransitionDuration: 1.5,
          })}
          strokeWidth={strokeWidth}
        />
      </div>
      <div className="text-center">
        <h4 className="text-white font-semibold text-lg">{title}</h4>
        {subtitle && (
          <p className="text-white/70 text-sm mt-1">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
};

export default RadialProgress;