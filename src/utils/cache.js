// Simple cache utility for Supabase data
// Reduces API calls and improves performance

const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes - faster refresh for better UX

class SimpleCache {
  constructor() {
    this.cache = new Map();
  }

  set(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get(key) {
    const cached = this.cache.get(key);
    
    if (!cached) return null;
    
    // Check if cache is still valid
    const age = Date.now() - cached.timestamp;
    if (age > CACHE_DURATION) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  clear(key) {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  has(key) {
    const cached = this.cache.get(key);
    if (!cached) return false;
    
    const age = Date.now() - cached.timestamp;
    return age <= CACHE_DURATION;
  }
}

export const cache = new SimpleCache();

// Helper function to wrap Supabase calls with caching
export async function cachedQuery(key, queryFn) {
  // Check cache first
  const cached = cache.get(key);
  if (cached) {
    console.log(`[Cache] Hit for key: ${key}`);
    return cached;
  }

  // Cache miss - fetch from Supabase
  console.log(`[Cache] Miss for key: ${key} - fetching...`);
  const data = await queryFn();
  
  // Store in cache
  cache.set(key, data);
  
  return data;
}
