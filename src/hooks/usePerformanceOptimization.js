import { useState, useEffect, useCallback, useMemo } from 'react';

// Advanced caching system with TTL and memory management
class AdvancedCache {
  constructor(maxSize = 100, defaultTTL = 5 * 60 * 1000) { // 5 minutes default
    this.cache = new Map();
    this.timers = new Map();
    this.maxSize = maxSize;
    this.defaultTTL = defaultTTL;
    this.accessTimes = new Map();
  }

  set(key, value, ttl = this.defaultTTL) {
    // Implement LRU eviction if cache is full
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      this.evictLRU();
    }

    // Clear existing timer
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
    }

    // Set value and timer
    this.cache.set(key, value);
    this.accessTimes.set(key, Date.now());
    
    const timer = setTimeout(() => {
      this.delete(key);
    }, ttl);
    
    this.timers.set(key, timer);
  }

  get(key) {
    if (this.cache.has(key)) {
      this.accessTimes.set(key, Date.now());
      return this.cache.get(key);
    }
    return null;
  }

  delete(key) {
    this.cache.delete(key);
    this.accessTimes.delete(key);
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
      this.timers.delete(key);
    }
  }

  evictLRU() {
    let oldestKey = null;
    let oldestTime = Date.now();
    
    for (const [key, time] of this.accessTimes) {
      if (time < oldestTime) {
        oldestTime = time;
        oldestKey = key;
      }
    }
    
    if (oldestKey) {
      this.delete(oldestKey);
    }
  }

  clear() {
    for (const timer of this.timers.values()) {
      clearTimeout(timer);
    }
    this.cache.clear();
    this.timers.clear();
    this.accessTimes.clear();
  }

  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Global cache instance
const globalCache = new AdvancedCache();

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    cacheHitRate: 0,
    memoryUsage: 0
  });

  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      setMetrics(prev => ({
        ...prev,
        renderTime: endTime - startTime
      }));
    };
  }, []);

  return metrics;
};

// Optimized data fetching hook
export const useOptimizedFetch = (key, fetchFn, dependencies = [], options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cacheStats, setCacheStats] = useState({ hits: 0, misses: 0 });

  const { 
    ttl = 5 * 60 * 1000, // 5 minutes
    enableCache = true,
    retryCount = 3,
    retryDelay = 1000 
  } = options;

  const fetchData = useCallback(async (retries = retryCount) => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      if (enableCache) {
        const cached = globalCache.get(key);
        if (cached) {
          setData(cached);
          setLoading(false);
          setCacheStats(prev => ({ ...prev, hits: prev.hits + 1 }));
          return cached;
        }
        setCacheStats(prev => ({ ...prev, misses: prev.misses + 1 }));
      }

      // Fetch fresh data
      const result = await fetchFn();
      
      // Cache the result
      if (enableCache && result) {
        globalCache.set(key, result, ttl);
      }

      setData(result);
      setLoading(false);
      return result;

    } catch (err) {
      if (retries > 0) {
        setTimeout(() => fetchData(retries - 1), retryDelay);
        return;
      }
      
      setError(err);
      setLoading(false);
      console.error(`Fetch error for ${key}:`, err);
    }
  }, [key, fetchFn, ttl, enableCache, retryCount, retryDelay]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  const refetch = useCallback(() => {
    if (enableCache) {
      globalCache.delete(key);
    }
    return fetchData();
  }, [fetchData, key, enableCache]);

  const clearCache = useCallback(() => {
    globalCache.delete(key);
  }, [key]);

  return {
    data,
    loading,
    error,
    refetch,
    clearCache,
    cacheStats,
    cacheInfo: globalCache.getStats()
  };
};

// Debounced search hook
export const useDebouncedSearch = (searchTerm, delay = 300) => {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchTerm, delay]);

  return debouncedTerm;
};

// Virtual scrolling hook for large lists
export const useVirtualScrolling = (items, itemHeight = 100, containerHeight = 400) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );
    
    return {
      startIndex,
      endIndex,
      items: items.slice(startIndex, endIndex),
      totalHeight: items.length * itemHeight,
      offsetY: startIndex * itemHeight
    };
  }, [items, itemHeight, containerHeight, scrollTop]);

  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  return {
    visibleItems,
    handleScroll,
    totalHeight: visibleItems.totalHeight
  };
};

// Memory usage monitoring
export const useMemoryMonitor = () => {
  const [memoryInfo, setMemoryInfo] = useState(null);

  useEffect(() => {
    const updateMemoryInfo = () => {
      if (performance.memory) {
        setMemoryInfo({
          used: Math.round(performance.memory.usedJSHeapSize / 1048576), // MB
          total: Math.round(performance.memory.totalJSHeapSize / 1048576), // MB
          limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) // MB
        });
      }
    };

    updateMemoryInfo();
    const interval = setInterval(updateMemoryInfo, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return memoryInfo;
};

export { globalCache };