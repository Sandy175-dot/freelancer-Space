import { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

// Toast Context
const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast Provider
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      type: 'info',
      duration: 5000,
      ...toast
    };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove toast
    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
    
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const removeAllToasts = () => {
    setToasts([]);
  };

  // Convenience methods
  const toast = {
    success: (message, options = {}) => addToast({ ...options, type: 'success', message }),
    error: (message, options = {}) => addToast({ ...options, type: 'error', message }),
    warning: (message, options = {}) => addToast({ ...options, type: 'warning', message }),
    info: (message, options = {}) => addToast({ ...options, type: 'info', message }),
    custom: (component, options = {}) => addToast({ ...options, type: 'custom', component })
  };

  return (
    <ToastContext.Provider value={{ toast, removeToast, removeAllToasts }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

// Toast Container
const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      <AnimatePresence>
        {toasts.map(toast => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onRemove={() => onRemove(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Individual Toast Item
const ToastItem = ({ toast, onRemove }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (toast.duration > 0) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev - (100 / (toast.duration / 100));
          return newProgress <= 0 ? 0 : newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [toast.duration]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
      className={`
        relative overflow-hidden
        ${getBackgroundColor()}
        border rounded-lg shadow-lg
        backdrop-blur-sm
      `}
    >
      {/* Progress bar */}
      {toast.duration > 0 && (
        <div className="absolute top-0 left-0 h-1 bg-gray-200 dark:bg-gray-700 w-full">
          <motion.div
            className="h-full bg-primary"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          
          <div className="ml-3 w-0 flex-1">
            {toast.title && (
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {toast.title}
              </p>
            )}
            
            {toast.message && (
              <p className={`text-sm text-gray-700 dark:text-gray-300 ${toast.title ? 'mt-1' : ''}`}>
                {toast.message}
              </p>
            )}
            
            {toast.component && toast.component}
            
            {toast.action && (
              <div className="mt-3">
                <button
                  onClick={toast.action.onClick}
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  {toast.action.label}
                </button>
              </div>
            )}
          </div>
          
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={onRemove}
              className="
                inline-flex text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
                focus:outline-none focus:ring-2 focus:ring-primary
                transition-colors
              "
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Hook for easy toast usage
export const useToastNotifications = () => {
  const { toast } = useToast();

  const showSuccess = (message, options) => {
    return toast.success(message, options);
  };

  const showError = (message, options) => {
    return toast.error(message, options);
  };

  const showWarning = (message, options) => {
    return toast.warning(message, options);
  };

  const showInfo = (message, options) => {
    return toast.info(message, options);
  };

  const showJobApplicationSuccess = (jobTitle) => {
    return toast.success(`Successfully applied to "${jobTitle}"`, {
      title: 'Application Submitted',
      duration: 6000,
      action: {
        label: 'View Application',
        onClick: () => console.log('Navigate to applications')
      }
    });
  };

  const showJobSaved = (jobTitle) => {
    return toast.info(`"${jobTitle}" saved to your favorites`, {
      title: 'Job Saved',
      duration: 4000
    });
  };

  const showNetworkError = () => {
    return toast.error('Please check your internet connection and try again', {
      title: 'Connection Error',
      duration: 8000,
      action: {
        label: 'Retry',
        onClick: () => window.location.reload()
      }
    });
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showJobApplicationSuccess,
    showJobSaved,
    showNetworkError
  };
};

export default ToastItem;