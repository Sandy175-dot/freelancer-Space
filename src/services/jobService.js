import { mockAPI } from '../lib/mockData';
import { cachedQuery, cache } from '../utils/cache';
import { globalCache } from '../hooks/usePerformanceOptimization';

export const jobService = {
  // Create a new job
  async createJob(jobData) {
    try {
      const data = mockAPI.createJob(jobData);

      // Clear cache so new job appears
      this.clearCache();

      return { success: true, data };
    } catch (error) {
      console.error('Error creating job:', error);
      return { success: false, error: error.message };
    }
  },

  // Get all jobs with filters
  async getJobs(filters = {}) {
    try {
      console.log('[JobService] Fetching jobs with filters:', filters);

      // Create cache key based on filters
      const cacheKey = `jobs_${JSON.stringify(filters)}`;

      // Try to get from cache first
      return await cachedQuery(cacheKey, async () => {
        let allJobs = mockAPI.getAllJobs();

        // Apply filters
        let filteredJobs = allJobs;

        if (filters.category && filters.category !== 'All') {
          filteredJobs = filteredJobs.filter(job =>
            job.category.toLowerCase() === filters.category.toLowerCase()
          );
        }

        if (filters.minBudget) {
          filteredJobs = filteredJobs.filter(job =>
            job.budget_min >= filters.minBudget
          );
        }

        if (filters.maxBudget) {
          filteredJobs = filteredJobs.filter(job =>
            job.budget_max <= filters.maxBudget
          );
        }

        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filteredJobs = filteredJobs.filter(job =>
            job.title.toLowerCase().includes(searchLower) ||
            job.description.toLowerCase().includes(searchLower)
          );
        }

        if (filters.tags && filters.tags.length > 0) {
          filteredJobs = filteredJobs.filter(job =>
            filters.tags.some(tag => job.skills.includes(tag))
          );
        }

        // Sort by created_at descending
        filteredJobs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        // Limit to 100
        filteredJobs = filteredJobs.slice(0, 100);

        console.log('[JobService] Successfully fetched jobs:', filteredJobs.length);

        // Transform data to match expected format
        const transformedData = filteredJobs.map(job => ({
          ...job,
          budget: job.budget_max || job.budget_min || 0,
          tags: job.skills || [],
          deadline: job.created_at
        }));

        return { success: true, data: transformedData };
      });
    } catch (error) {
      console.error('[JobService] Exception fetching jobs:', error);
      return { success: false, error: error.message, data: [] };
    }
  },

  // Clear cache when creating/updating/deleting jobs
  clearCache() {
    cache.clear();
    console.log('[JobService] Cache cleared');
  },

  // Get jobs by client
  async getClientJobs(clientId) {
    try {
      const allJobs = mockAPI.getAllJobs();
      const jobs = allJobs.filter(job => job.client_id === clientId);

      // Get bids for each job
      const jobsWithBids = jobs.map(job => ({
        ...job,
        bids: mockAPI.getBidsForJob(job.id)
      }));

      return { success: true, data: jobsWithBids };
    } catch (error) {
      console.error('Error fetching client jobs:', error);
      return { success: false, error: error.message };
    }
  },

  // Get single job with details
  async getJobById(jobId) {
    try {
      const job = mockAPI.getJobById(jobId);

      if (!job) {
        throw new Error('Job not found');
      }

      // Get bids for this job
      const bids = mockAPI.getBidsForJob(jobId);

      return {
        success: true,
        data: {
          ...job,
          bids: bids || []
        }
      };
    } catch (error) {
      console.error('Error fetching job:', error);
      return { success: false, error: error.message };
    }
  },

  // Update job
  async updateJob(jobId, updates) {
    try {
      const data = mockAPI.updateJob(jobId, updates);
      if (!data) {
        throw new Error('Job not found');
      }
      this.clearCache();
      return { success: true, data };
    } catch (error) {
      console.error('Error updating job:', error);
      return { success: false, error: error.message };
    }
  },

  // Delete job
  async deleteJob(jobId) {
    try {
      mockAPI.deleteJob(jobId);
      this.clearCache();
      return { success: true };
    } catch (error) {
      console.error('Error deleting job:', error);
      return { success: false, error: error.message };
    }
  },

  // Subscribe to job updates (mock - no realtime)
  subscribeToJobs(callback) {
    // Mock subscription - return unsubscribe function
    return {
      unsubscribe: () => { }
    };
  },

  // Enhanced job search with advanced filtering and analytics
  async searchJobsAdvanced(filters = {}, options = {}) {
    const { 
      useCache = true,
      fuzzySearch = true,
      includeAnalytics = false,
      sortBy = 'created_at',
      sortOrder = 'desc',
      limit = null,
      offset = 0
    } = options;
    
    const cacheKey = `searchJobsAdvanced_${JSON.stringify({ filters, options })}`;
    
    if (useCache) {
      const cached = globalCache.get(cacheKey);
      if (cached) {
        return { success: true, data: cached, fromCache: true };
      }
    }

    try {
      let jobs = mockAPI.getAllJobs();
      let analytics = {
        total_jobs: jobs.length,
        filtered_jobs: 0,
        avg_budget: 0,
        categories: {},
        experience_levels: {}
      };
      
      // Apply advanced filters
      jobs = this.applyAdvancedFilters(jobs, filters, fuzzySearch);
      
      // Calculate analytics if requested
      if (includeAnalytics) {
        analytics = this.calculateJobAnalytics(jobs);
      }
      
      // Enhanced sorting with multiple criteria
      jobs = this.sortJobs(jobs, sortBy, sortOrder);
      
      // Apply pagination
      if (limit) {
        jobs = jobs.slice(offset, offset + limit);
      }
      
      // Add computed fields
      jobs = jobs.map(job => ({
        ...job,
        relevance_score: this.calculateRelevanceScore(job, filters),
        budget_range: `$${job.budget_min?.toLocaleString() || 0} - $${job.budget_max?.toLocaleString() || 0}`,
        time_ago: this.getTimeAgo(job.created_at),
        skill_match_count: this.countSkillMatches(job.skills || [], filters.skills || []),
        estimated_hours: this.estimateHours(job.budget_min || 0, job.budget_max || 0),
        difficulty_level: this.assessDifficulty(job),
        urgency_score: this.calculateUrgencyScore(job),
        tags: job.skills || [], // Ensure tags field exists
        budget: job.budget_max || job.budget_min || 0, // Ensure budget field exists
        deadline: job.created_at // Ensure deadline field exists
      }));
      
      const result = {
        jobs,
        analytics: includeAnalytics ? analytics : null,
        total_count: jobs.length,
        filters_applied: Object.keys(filters).length
      };
      
      if (useCache) {
        globalCache.set(cacheKey, result, 2 * 60 * 1000); // 2 minutes cache
      }
      
      return { success: true, data: result, fromCache: false };
    } catch (error) {
      console.error('Error in advanced job search:', error);
      return { success: false, error: error.message };
    }
  },

  // Get job recommendations based on user profile
  async getRecommendedJobs(userProfile, limit = 10) {
    try {
      const { data: allJobsResult } = await this.getJobs();
      let jobs = allJobsResult || [];
      
      // Calculate recommendation scores
      jobs = jobs.map(job => ({
        ...job,
        recommendation_score: this.calculateRecommendationScore(job, userProfile),
        match_reasons: this.getMatchReasons(job, userProfile)
      }));
      
      // Sort by recommendation score and limit
      jobs = jobs
        .sort((a, b) => b.recommendation_score - a.recommendation_score)
        .slice(0, limit);
      
      return { success: true, data: jobs };
    } catch (error) {
      console.error('Error getting recommended jobs:', error);
      return { success: false, error: error.message };
    }
  },

  // Get job statistics and insights
  async getJobInsights() {
    const cacheKey = 'job_insights';
    const cached = globalCache.get(cacheKey);
    
    if (cached) {
      return { success: true, data: cached };
    }

    try {
      const jobs = mockAPI.getAllJobs();
      
      const insights = {
        total_jobs: jobs.length,
        categories: this.getCategoryStats(jobs),
        budget_ranges: this.getBudgetStats(jobs),
        experience_levels: this.getExperienceStats(jobs),
        trending_skills: this.getTrendingSkills(jobs),
        avg_budget: this.calculateAverageBudget(jobs),
        job_growth: this.calculateJobGrowth(jobs),
        top_companies: this.getTopCompanies(jobs),
        duration_analysis: this.analyzeDurations(jobs)
      };
      
      globalCache.set(cacheKey, insights, 10 * 60 * 1000); // 10 minutes cache
      
      return { success: true, data: insights };
    } catch (error) {
      console.error('Error getting job insights:', error);
      return { success: false, error: error.message };
    }
  },

  // Utility methods for enhanced functionality
  applyAdvancedFilters(jobs, filters, fuzzySearch = true) {
    let filtered = [...jobs];
    
    // Category filter
    if (filters.category && filters.category !== 'all' && filters.category !== 'All') {
      filtered = filtered.filter(job => 
        job.category?.toLowerCase().includes(filters.category.toLowerCase())
      );
    }
    
    // Budget range filter
    if (filters.minBudget !== undefined) {
      filtered = filtered.filter(job => (job.budget_max || job.budget_min || 0) >= filters.minBudget);
    }
    if (filters.maxBudget !== undefined) {
      filtered = filtered.filter(job => (job.budget_min || job.budget_max || 0) <= filters.maxBudget);
    }
    
    // Experience level filter
    if (filters.experienceLevel && filters.experienceLevel !== 'all') {
      filtered = filtered.filter(job => job.experience_level === filters.experienceLevel);
    }
    
    // Skills filter
    if (filters.skills && filters.skills.length > 0) {
      filtered = filtered.filter(job => 
        filters.skills.some(skill => 
          (job.skills || []).some(jobSkill => 
            jobSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }
    
    // Tags filter (alias for skills)
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(job =>
        filters.tags.some(tag => (job.skills || []).includes(tag))
      );
    }
    
    // Keywords filter with fuzzy search
    if (filters.keywords || filters.search) {
      const keywords = (filters.keywords || filters.search || '').toLowerCase();
      filtered = filtered.filter(job => {
        const searchText = `${job.title || ''} ${job.description || ''} ${(job.skills || []).join(' ')} ${job.company || ''}`.toLowerCase();
        
        if (fuzzySearch) {
          return this.fuzzyMatch(searchText, keywords);
        } else {
          return searchText.includes(keywords);
        }
      });
    }
    
    // Duration filter
    if (filters.duration) {
      filtered = filtered.filter(job => 
        (job.duration || '').toLowerCase().includes(filters.duration.toLowerCase())
      );
    }
    
    // Location filter
    if (filters.location && filters.location !== 'all') {
      filtered = filtered.filter(job => 
        (job.location || '').toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    return filtered;
  },

  sortJobs(jobs, sortBy, sortOrder = 'desc') {
    return [...jobs].sort((a, b) => {
      let aVal, bVal;
      
      switch (sortBy) {
        case 'budget':
          aVal = a.budget_max || a.budget_min || 0;
          bVal = b.budget_max || b.budget_min || 0;
          break;
        case 'created_at':
          aVal = new Date(a.created_at);
          bVal = new Date(b.created_at);
          break;
        case 'title':
          aVal = (a.title || '').toLowerCase();
          bVal = (b.title || '').toLowerCase();
          break;
        case 'relevance':
          aVal = a.relevance_score || 0;
          bVal = b.relevance_score || 0;
          break;
        default:
          aVal = a[sortBy] || 0;
          bVal = b[sortBy] || 0;
      }
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  },

  calculateRelevanceScore(job, filters) {
    let score = 0;
    
    // Keyword relevance
    if (filters.keywords || filters.search) {
      const keywords = (filters.keywords || filters.search || '').toLowerCase();
      if ((job.title || '').toLowerCase().includes(keywords)) score += 30;
      if ((job.description || '').toLowerCase().includes(keywords)) score += 20;
      if ((job.skills || []).some(skill => skill.toLowerCase().includes(keywords))) score += 25;
    }
    
    // Budget match
    if (filters.minBudget && filters.maxBudget) {
      const jobAvgBudget = ((job.budget_min || 0) + (job.budget_max || 0)) / 2;
      const filterAvgBudget = (filters.minBudget + filters.maxBudget) / 2;
      if (filterAvgBudget > 0) {
        const budgetDiff = Math.abs(jobAvgBudget - filterAvgBudget) / filterAvgBudget;
        score += Math.max(0, 20 - budgetDiff * 20);
      }
    }
    
    // Recency bonus
    const daysSincePosted = (Date.now() - new Date(job.created_at)) / (1000 * 60 * 60 * 24);
    score += Math.max(0, 15 - daysSincePosted);
    
    return Math.round(score);
  },

  calculateRecommendationScore(job, userProfile) {
    let score = 0;
    
    // Skill matching
    if (userProfile.skills) {
      const matchingSkills = (job.skills || []).filter(skill => 
        userProfile.skills.some(userSkill => 
          userSkill.toLowerCase() === skill.toLowerCase()
        )
      );
      score += matchingSkills.length * 15;
    }
    
    // Experience level match
    if (userProfile.experience_level === job.experience_level) {
      score += 20;
    }
    
    // Budget preference
    if (userProfile.preferred_budget_range) {
      const [minPref, maxPref] = userProfile.preferred_budget_range;
      if ((job.budget_min || 0) >= minPref && (job.budget_max || 0) <= maxPref) {
        score += 25;
      }
    }
    
    // Category preference
    if (userProfile.preferred_categories?.includes(job.category)) {
      score += 20;
    }
    
    return Math.round(score);
  },

  getMatchReasons(job, userProfile) {
    const reasons = [];
    
    if (userProfile.skills) {
      const matchingSkills = (job.skills || []).filter(skill => 
        userProfile.skills.some(userSkill => 
          userSkill.toLowerCase() === skill.toLowerCase()
        )
      );
      if (matchingSkills.length > 0) {
        reasons.push(`${matchingSkills.length} matching skills: ${matchingSkills.join(', ')}`);
      }
    }
    
    if (userProfile.experience_level === job.experience_level) {
      reasons.push(`Perfect experience level match (${job.experience_level})`);
    }
    
    if (userProfile.preferred_categories?.includes(job.category)) {
      reasons.push(`Matches your preferred category: ${job.category}`);
    }
    
    return reasons;
  },

  fuzzyMatch(text, pattern) {
    const patternChars = pattern.split('');
    let textIndex = 0;
    let patternIndex = 0;
    let matches = 0;
    
    while (textIndex < text.length && patternIndex < patternChars.length) {
      if (text[textIndex] === patternChars[patternIndex]) {
        matches++;
        patternIndex++;
      }
      textIndex++;
    }
    
    return matches / patternChars.length >= 0.7; // 70% match threshold
  },

  getTimeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  },

  parseDuration(duration) {
    const match = (duration || '').match(/(\d+)/);
    return match ? parseInt(match[1]) : 30; // Default to 30 days
  },

  calculateUrgencyScore(job) {
    const daysSincePosted = (Date.now() - new Date(job.created_at)) / (1000 * 60 * 60 * 24);
    const durationDays = this.parseDuration(job.duration);
    const budgetFactor = (job.budget_max || 0) / 1000;
    
    return Math.round((10 - daysSincePosted) + (durationDays / 10) + budgetFactor);
  },

  countSkillMatches(jobSkills, userSkills) {
    return jobSkills.filter(skill => 
      userSkills.some(userSkill => 
        userSkill.toLowerCase() === skill.toLowerCase()
      )
    ).length;
  },

  estimateHours(minBudget, maxBudget) {
    const avgBudget = (minBudget + maxBudget) / 2;
    const hourlyRate = 50; // Assumed average hourly rate
    return Math.round(avgBudget / hourlyRate);
  },

  assessDifficulty(job) {
    const skillCount = (job.skills || []).length;
    const budgetLevel = job.budget_max || 0;
    
    if (skillCount <= 2 && budgetLevel < 1000) return 'Easy';
    if (skillCount <= 4 && budgetLevel < 3000) return 'Medium';
    return 'Hard';
  },

  // Analytics methods
  getCategoryStats(jobs) {
    const stats = {};
    jobs.forEach(job => {
      const category = job.category || 'Unknown';
      stats[category] = (stats[category] || 0) + 1;
    });
    return stats;
  },

  getBudgetStats(jobs) {
    const ranges = {
      'Under $500': 0,
      '$500 - $1,000': 0,
      '$1,000 - $3,000': 0,
      '$3,000 - $5,000': 0,
      'Over $5,000': 0
    };
    
    jobs.forEach(job => {
      const max = job.budget_max || 0;
      if (max < 500) ranges['Under $500']++;
      else if (max < 1000) ranges['$500 - $1,000']++;
      else if (max < 3000) ranges['$1,000 - $3,000']++;
      else if (max < 5000) ranges['$3,000 - $5,000']++;
      else ranges['Over $5,000']++;
    });
    
    return ranges;
  },

  getExperienceStats(jobs) {
    const stats = {};
    jobs.forEach(job => {
      const level = job.experience_level || 'Unknown';
      stats[level] = (stats[level] || 0) + 1;
    });
    return stats;
  },

  getTrendingSkills(jobs) {
    const skillCount = {};
    jobs.forEach(job => {
      (job.skills || []).forEach(skill => {
        skillCount[skill] = (skillCount[skill] || 0) + 1;
      });
    });
    
    return Object.entries(skillCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([skill, count]) => ({ skill, count }));
  },

  calculateAverageBudget(jobs) {
    if (jobs.length === 0) return 0;
    const total = jobs.reduce((sum, job) => sum + ((job.budget_min || 0) + (job.budget_max || 0)) / 2, 0);
    return Math.round(total / jobs.length);
  },

  calculateJobGrowth(jobs) {
    // Mock growth calculation
    return {
      weekly: Math.floor(Math.random() * 20) + 5,
      monthly: Math.floor(Math.random() * 50) + 20,
      trend: Math.random() > 0.5 ? 'up' : 'down'
    };
  },

  getTopCompanies(jobs) {
    const companyCount = {};
    jobs.forEach(job => {
      const company = job.company || 'Unknown';
      companyCount[company] = (companyCount[company] || 0) + 1;
    });
    
    return Object.entries(companyCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([company, count]) => ({ company, jobs: count }));
  },

  analyzeDurations(jobs) {
    const durations = {};
    jobs.forEach(job => {
      const duration = job.duration || 'Unknown';
      durations[duration] = (durations[duration] || 0) + 1;
    });
    return durations;
  },

  calculateJobAnalytics(jobs) {
    return {
      total_jobs: jobs.length,
      avg_budget: this.calculateAverageBudget(jobs),
      categories: this.getCategoryStats(jobs),
      experience_levels: this.getExperienceStats(jobs),
      budget_ranges: this.getBudgetStats(jobs),
      trending_skills: this.getTrendingSkills(jobs)
    };
  },

  // Enhanced cache management
  clearAdvancedCache() {
    globalCache.clear();
    cache.clear();
    console.log('[JobService] All caches cleared');
  },

  getCacheStats() {
    return {
      globalCache: globalCache.getStats(),
      localCache: {
        size: cache.size || 0,
        keys: Array.from(cache.keys ? cache.keys() : [])
      }
    };
  }
};