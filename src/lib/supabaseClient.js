// Mock database functions - no Supabase needed
import { mockAPI } from './mockData';

// Job-related database functions
export const jobsAPI = {
  // Fetch all open jobs
  async getAllJobs() {
    return mockAPI.getAllJobs();
  },

  // Fetch jobs by category
  async getJobsByCategory(category) {
    const allJobs = mockAPI.getAllJobs();
    return allJobs.filter(job => 
      job.category.toLowerCase() === category.toLowerCase()
    );
  },

  // Search jobs
  async searchJobs(searchTerm) {
    const allJobs = mockAPI.getAllJobs();
    const searchLower = searchTerm.toLowerCase();
    return allJobs.filter(job => 
      job.title.toLowerCase().includes(searchLower) ||
      job.description.toLowerCase().includes(searchLower)
    );
  },

  // Get single job by ID
  async getJobById(id) {
    return mockAPI.getJobById(id);
  },

  // Create new job
  async createJob(jobData) {
    return mockAPI.createJob(jobData);
  },

  // Update job
  async updateJob(id, jobData) {
    return mockAPI.updateJob(id, jobData);
  },

  // Delete job
  async deleteJob(id) {
    mockAPI.deleteJob(id);
  },

  // Increment proposals count
  async incrementProposals(jobId) {
    const job = mockAPI.getJobById(jobId);
    if (job) {
      const proposalsCount = (job.proposals_count || 0) + 1;
      mockAPI.updateJob(jobId, { proposals_count: proposalsCount });
    }
  }
};
