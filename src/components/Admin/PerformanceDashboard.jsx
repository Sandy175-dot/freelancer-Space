import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, Cpu, Database, Clock, Users, 
  TrendingUp, AlertTriangle, CheckCircle,
  RefreshCw, Download, Settings
} from 'lucide-react';
import { globalCache, useMemoryMonitor } from '../../hooks/usePerformanceOptimization';
import { jobService } from '../../services/jobService';

const PerformanceDashboard = () => {
  const [metrics, setMetrics] = useState({
    cacheStats: { size: 0, hits: 0, misses: 0 },
    apiCalls: 0,
    avgResponseTime: 0,
    errorRate: 0,
    activeUsers: 0
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const memoryInfo = useMemoryMonitor();

  useEffect(() => {
    loadMetrics();
    const interval = setInterval(loadMetrics, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadMetrics = async () => {
    try {
      // Get cache statistics
      const cacheStats = globalCache.getStats();
      const jobCacheStats = jobService.getCacheStats();
      
      // Mock additional metrics (in real app, these would come from your backend)
      const mockMetrics = {
        apiCalls: Math.floor(Math.random() * 1000) + 500,
        avgResponseTime: Math.floor(Math.random() * 200) + 50,
        errorRate: Math.random() * 5,
        activeUsers: Math.floor(Math.random() * 100) + 20
      };

      setMetrics({
        cacheStats: {
          size: cacheStats.size + (jobCacheStats.localCache?.size || 0),
          hits: Math.floor(Math.random() * 100) + 50,
          misses: Math.floor(Math.random() * 20) + 5
        },
        ...mockMetrics
      });
    } catch (error) {
      console.error('Error loading performance metrics:', error);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadMetrics();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleClearCache = () => {
    globalCache.clear();
    jobService.clearAdvancedCache();
    loadMetrics();
  };

  const getHealthStatus = () => {
    const { avgResponseTime, errorRate } = metrics;
    
    if (avgResponseTime > 500 || errorRate > 5) {
      return { status: 'critical', color: 'red', icon: AlertTriangle };
    } else if (avgResponseTime > 200 || errorRate > 2) {
      return { status: 'warning', color: 'yellow', icon: AlertTriangle };
    } else {
      return { status: 'healthy', color: 'green', icon: CheckCircle };
    }
  };

  const health = getHealthStatus();
  const HealthIcon = health.icon;

  const MetricCard = ({ title, value, unit, icon: Icon, trend, color = 'blue' }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}-100 dark:bg-${color}-900/20`}>
          <Icon className={`h-6 w-6 text-${color}-600 dark:text-${color}-400`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${
            trend > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            <TrendingUp className={`h-4 w-4 ${trend < 0 ? 'rotate-180' : ''}`} />
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </span>
          {unit && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {unit}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );

  const cacheHitRate = metrics.cacheStats.hits + metrics.cacheStats.misses > 0 
    ? ((metrics.cacheStats.hits / (metrics.cacheStats.hits + metrics.cacheStats.misses)) * 100).toFixed(1)
    : 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Performance Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor system performance and optimize user experience
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-${health.color}-100 dark:bg-${health.color}-900/20`}>
            <HealthIcon className={`h-4 w-4 text-${health.color}-600 dark:text-${health.color}-400`} />
            <span className={`text-sm font-medium text-${health.color}-700 dark:text-${health.color}-300 capitalize`}>
              {health.status}
            </span>
          </div>
          
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Cache Hit Rate"
          value={cacheHitRate}
          unit="%"
          icon={Database}
          trend={5.2}
          color="green"
        />
        
        <MetricCard
          title="Avg Response Time"
          value={metrics.avgResponseTime}
          unit="ms"
          icon={Clock}
          trend={-2.1}
          color="blue"
        />
        
        <MetricCard
          title="Active Users"
          value={metrics.activeUsers}
          icon={Users}
          trend={8.5}
          color="purple"
        />
        
        <MetricCard
          title="Error Rate"
          value={metrics.errorRate.toFixed(2)}
          unit="%"
          icon={AlertTriangle}
          trend={-1.3}
          color={metrics.errorRate > 2 ? 'red' : 'green'}
        />
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cache Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Cache Performance
            </h2>
            <button
              onClick={handleClearCache}
              className="px-3 py-1 text-sm bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
            >
              Clear Cache
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Cache Size</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {metrics.cacheStats.size} items
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Cache Hits</span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                {metrics.cacheStats.hits}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Cache Misses</span>
              <span className="font-semibold text-red-600 dark:text-red-400">
                {metrics.cacheStats.misses}
              </span>
            </div>
            
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Hit Rate</span>
                <span className="font-bold text-lg text-gray-900 dark:text-white">
                  {cacheHitRate}%
                </span>
              </div>
              
              <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${cacheHitRate}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Memory Usage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Memory Usage
          </h2>
          
          {memoryInfo ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Used Memory</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {memoryInfo.used} MB
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Total Memory</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {memoryInfo.total} MB
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Memory Limit</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {memoryInfo.limit} MB
                </span>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Usage</span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">
                    {((memoryInfo.used / memoryInfo.total) * 100).toFixed(1)}%
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      (memoryInfo.used / memoryInfo.total) > 0.8 
                        ? 'bg-red-500' 
                        : (memoryInfo.used / memoryInfo.total) > 0.6 
                          ? 'bg-yellow-500' 
                          : 'bg-green-500'
                    }`}
                    style={{ width: `${(memoryInfo.used / memoryInfo.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              Memory information not available
            </div>
          )}
        </motion.div>
      </div>

      {/* Performance Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Performance Recommendations
        </h2>
        
        <div className="space-y-3">
          {cacheHitRate < 70 && (
            <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Low Cache Hit Rate
                </p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Consider increasing cache TTL or optimizing cache keys to improve performance.
                </p>
              </div>
            </div>
          )}
          
          {metrics.avgResponseTime > 300 && (
            <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  High Response Time
                </p>
                <p className="text-sm text-red-700 dark:text-red-300">
                  API responses are slower than optimal. Consider optimizing queries or adding more caching.
                </p>
              </div>
            </div>
          )}
          
          {memoryInfo && (memoryInfo.used / memoryInfo.total) > 0.8 && (
            <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  High Memory Usage
                </p>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Memory usage is high. Consider clearing caches or optimizing memory-intensive operations.
                </p>
              </div>
            </div>
          )}
          
          {cacheHitRate >= 70 && metrics.avgResponseTime <= 300 && (!memoryInfo || (memoryInfo.used / memoryInfo.total) <= 0.8) && (
            <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  Performance is Optimal
                </p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  All performance metrics are within acceptable ranges. Great job!
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PerformanceDashboard;