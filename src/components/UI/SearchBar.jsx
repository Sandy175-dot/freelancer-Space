import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter, TrendingUp, Clock } from 'lucide-react';
import { useDebouncedSearch } from '../../hooks/usePerformanceOptimization';

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search jobs...", 
  showFilters = true,
  showSuggestions = true,
  recentSearches = [],
  trendingSearches = [],
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const searchRef = useRef(null);
  const debouncedQuery = useDebouncedSearch(query, 300);

  useEffect(() => {
    if (debouncedQuery && onSearch) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length > 0 || showSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setIsOpen(false);
    if (onSearch) {
      onSearch(suggestion);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
    if (onSearch) {
      onSearch('');
    }
  };

  const suggestions = [
    ...recentSearches.map(search => ({ text: search, type: 'recent' })),
    ...trendingSearches.map(search => ({ text: search, type: 'trending' }))
  ].slice(0, 8);

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(showSuggestions || query.length > 0)}
          placeholder={placeholder}
          className="
            w-full pl-10 pr-20 py-3 
            bg-white dark:bg-gray-800 
            border border-gray-300 dark:border-gray-600 
            rounded-lg 
            focus:ring-2 focus:ring-primary focus:border-transparent
            transition-all duration-200
            text-gray-900 dark:text-white
            placeholder-gray-500 dark:placeholder-gray-400
          "
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2">
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={clearSearch}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="h-4 w-4" />
              </motion.button>
            )}
          </AnimatePresence>
          
          {showFilters && (
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`
                p-1 transition-colors
                ${showAdvanced 
                  ? 'text-primary' 
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                }
              `}
            >
              <Filter className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Search Suggestions Dropdown */}
      <AnimatePresence>
        {isOpen && showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="
              absolute top-full left-0 right-0 mt-2 
              bg-white dark:bg-gray-800 
              border border-gray-200 dark:border-gray-700 
              rounded-lg shadow-lg z-50
              max-h-80 overflow-y-auto
            "
          >
            <div className="p-2">
              {recentSearches.length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    <Clock className="h-3 w-3" />
                    Recent Searches
                  </div>
                  {recentSearches.slice(0, 4).map((search, index) => (
                    <button
                      key={`recent-${index}`}
                      onClick={() => handleSuggestionClick(search)}
                      className="
                        w-full text-left px-3 py-2 
                        text-gray-700 dark:text-gray-300 
                        hover:bg-gray-100 dark:hover:bg-gray-700 
                        rounded transition-colors
                      "
                    >
                      {search}
                    </button>
                  ))}
                </div>
              )}
              
              {trendingSearches.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    <TrendingUp className="h-3 w-3" />
                    Trending
                  </div>
                  {trendingSearches.slice(0, 4).map((search, index) => (
                    <button
                      key={`trending-${index}`}
                      onClick={() => handleSuggestionClick(search)}
                      className="
                        w-full text-left px-3 py-2 
                        text-gray-700 dark:text-gray-300 
                        hover:bg-gray-100 dark:hover:bg-gray-700 
                        rounded transition-colors
                      "
                    >
                      {search}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="
              absolute top-full left-0 right-0 mt-2 
              bg-white dark:bg-gray-800 
              border border-gray-200 dark:border-gray-700 
              rounded-lg shadow-lg z-40
              overflow-hidden
            "
          >
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Advanced Filters
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <select className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="">All Categories</option>
                    <option value="web development">Web Development</option>
                    <option value="design">Design</option>
                    <option value="writing">Writing</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Budget Range
                  </label>
                  <select className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="">Any Budget</option>
                    <option value="0-500">$0 - $500</option>
                    <option value="500-1000">$500 - $1,000</option>
                    <option value="1000-3000">$1,000 - $3,000</option>
                    <option value="3000+">$3,000+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Experience Level
                  </label>
                  <select className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="">Any Level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowAdvanced(false)}
                  className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAdvanced(false)}
                  className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary/90 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;