// API Base Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: async (email, password) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (email, password, name, role) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, role }),
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// Jobs API
export const jobsAPI = {
  getAllJobs: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiCall(`/jobs?${params}`);
  },

  getJobById: async (id) => {
    return apiCall(`/jobs/${id}`);
  },

  createJob: async (jobData) => {
    return apiCall('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  },

  updateJob: async (id, jobData) => {
    return apiCall(`/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(jobData),
    });
  },

  deleteJob: async (id) => {
    return apiCall(`/jobs/${id}`, {
      method: 'DELETE',
    });
  },
};

// Bids API
export const bidsAPI = {
  getJobBids: async (jobId) => {
    return apiCall(`/bids/job/${jobId}`);
  },

  getMyBids: async () => {
    return apiCall('/bids/my-bids');
  },

  createBid: async (bidData) => {
    return apiCall('/bids', {
      method: 'POST',
      body: JSON.stringify(bidData),
    });
  },

  acceptBid: async (bidId) => {
    return apiCall(`/bids/${bidId}/accept`, {
      method: 'PUT',
    });
  },
};

// Users API (for freelancer profiles)
export const usersAPI = {
  getFreelancers: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiCall(`/users/freelancers?${params}`);
  },

  getUserProfile: async (userId) => {
    return apiCall(`/users/${userId}`);
  },

  updateProfile: async (profileData) => {
    return apiCall('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
};

export default {
  auth: authAPI,
  jobs: jobsAPI,
  bids: bidsAPI,
  users: usersAPI,
};
