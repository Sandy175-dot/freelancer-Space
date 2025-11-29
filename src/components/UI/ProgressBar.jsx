import { motion } from 'framer-motion';

const ProgressBar = ({ 
  steps, 
  currentStep, 
  className = "",
  showLabels = true,
  variant = 'default' // default, minimal, dots
}) => {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  if (variant === 'minimal') {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex justify-between text-sm text-white/60 mb-2">
          <span>Step {currentStep} of {steps.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={`flex items-center justify-center space-x-4 ${className}`}>
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <div key={index} className="flex items-center">
              <motion.div
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${isCompleted 
                    ? 'bg-green-500' 
                    : isActive 
                      ? 'bg-primary' 
                      : 'bg-white/20'
                  }
                `}
                animate={{
                  scale: isActive ? 1.2 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
              {index < steps.length - 1 && (
                <div className={`
                  w-8 h-0.5 mx-2 transition-colors duration-300
                  ${stepNumber < currentStep ? 'bg-green-500' : 'bg-white/20'}
                `} />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Default variant
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <motion.div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                    transition-all duration-300 border-2
                    ${isCompleted 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : isActive 
                        ? 'bg-primary border-primary text-white' 
                        : 'bg-white/10 border-white/20 text-white/60'
                    }
                  `}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {isCompleted ? '✓' : stepNumber}
                </motion.div>
                
                {showLabels && (
                  <span className={`
                    mt-2 text-xs font-medium text-center
                    ${isActive ? 'text-white' : 'text-white/60'}
                  `}>
                    {step.label}
                  </span>
                )}
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className="h-0.5 bg-white/20 relative overflow-hidden rounded">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: 0 }}
                      animate={{ 
                        width: stepNumber < currentStep ? '100%' : '0%' 
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;