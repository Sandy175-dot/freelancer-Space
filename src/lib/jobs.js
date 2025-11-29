import { mockAPI } from './mockData';
import { mockAuth } from './mockAuth';

/**
 * Create a new job posting
 */
export const createJob = async (jobData) => {
  try {
    const user = mockAuth.getCurrentUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const data = mockAPI.createJob({
      client_id: user.id,
      title: jobData.title,
      description: jobData.description,
      category: jobData.category,
      budget_min: parseFloat(jobData.budget) * 0.8,
      budget_max: parseFloat(jobData.budget),
      budget_type: jobData.budgetType,
      duration: jobData.duration,
      experience_level: jobData.experienceLevel,
      project_type: jobData.projectType,
      skills: jobData.skills,
      status: 'open'
    });

    return { success: true, data };
  } catch (error) {
    console.error('Error creating job:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get all open jobs (for freelancers)
 */
export const getOpenJobs = async (filters = {}) => {
  try {
    let jobs = mockAPI.getAllJobs();

    // Apply filters
    if (filters.category && filters.category !== 'all') {
      jobs = jobs.filter(job => job.category === filters.category);
    }

    if (filters.experienceLevel && filters.experienceLevel !== 'all') {
      jobs = jobs.filter(job => job.experience_level === filters.experienceLevel);
    }

    if (filters.budgetType && filters.budgetType !== 'all') {
      jobs = jobs.filter(job => job.budget_type === filters.budgetType);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      jobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower)
      );
    }

    return { success: true, data: jobs };
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return { success: false, error: error.message, data: [] };
  }
};

/**
 * Get jobs posted by the current user (for clients)
 */
export const getMyJobs = async () => {
  try {
    const user = mockAuth.getCurrentUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const allJobs = mockAPI.getAllJobs();
    const data = allJobs.filter(job => job.client_id === user.id);

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching my jobs:', error);
    return { success: false, error: error.message, data: [] };
  }
};

/**
 * Get a single job by ID
 */
export const getJobById = async (jobId) => {
  try {
    const data = mockAPI.getJobById(jobId);

    if (!data) {
      throw new Error('Job not found');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching job:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update a job
 */
export const updateJob = async (jobId, updates) => {
  try {
    const user = mockAuth.getCurrentUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const data = mockAPI.updateJob(jobId, updates);

    if (!data) {
      throw new Error('Job not found or unauthorized');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error updating job:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Delete a job
 */
export const deleteJob = async (jobId) => {
  try {
    const user = mockAuth.getCurrentUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    mockAPI.deleteJob(jobId);

    return { success: true };
  } catch (error) {
    console.error('Error deleting job:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Close a job (mark as completed/closed)
 */
export const closeJob = async (jobId) => {
  return updateJob(jobId, { status: 'closed' });
};

/**
 * ==============================
 * Bids API
 * ==============================
 */

export const createBid = async ({ jobId, bidAmount, proposal }) => {
  try {
    const user = mockAuth.getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const data = mockAPI.createBid({ 
      job_id: jobId, 
      freelancer_id: user.id, 
      bid_amount: bidAmount, 
      proposal 
    });

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getBidsForJob = async (jobId) => {
  try {
    const data = mockAPI.getBidsForJob(jobId);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message, data: [] };
  }
};

export const getMyBids = async () => {
  try {
    const user = mockAuth.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    const data = mockAPI.getMyBids(user.id);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message, data: [] };
  }
};

export const subscribeToBidsForJob = (jobId, callback) => {
  // Mock subscription - no realtime updates
  return () => {
    // Unsubscribe function (does nothing in mock mode)
  };
};
