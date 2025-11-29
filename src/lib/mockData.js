// Mock Data System for Freelancing Platform
// This replaces Supabase with local storage and mock data

// Initialize mock data in localStorage
const STORAGE_KEYS = {
  JOBS: 'freelance_jobs',
  BIDS: 'freelance_bids',
  USERS: 'freelance_users',
  CURRENT_USER: 'freelance_current_user',
  MESSAGES: 'freelance_messages',
  CONTRACTS: 'freelance_contracts',
  REVIEWS: 'freelance_reviews'
};

// Helper to get data from localStorage
const getFromStorage = (key, defaultValue = []) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return defaultValue;
  }
};

// Helper to save data to localStorage
const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
    return false;
  }
};

// Generate unique ID
const generateId = () => `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Initial mock jobs data
const INITIAL_JOBS = [
  {
    id: '1',
    title: 'Full Stack Developer Needed',
    description: 'Looking for an experienced full stack developer to build a modern web application using React and Node.js. The project involves creating a responsive UI, RESTful APIs, and database integration.',
    category: 'web development',
    budget_min: 3000,
    budget_max: 5000,
    duration: '2-3 months',
    experience_level: 'intermediate',
    skills: ['React', 'Node.js', 'MongoDB', 'REST API'],
    status: 'open',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    client_id: 'client_1',
    location: 'Remote',
    company: 'Tech Solutions Inc.'
  },
  {
    id: '2',
    title: 'UI/UX Designer for Mobile App',
    description: 'Need a creative UI/UX designer to design a user-friendly mobile app interface. Must have experience with Figma and mobile design patterns.',
    category: 'design',
    budget_min: 2000,
    budget_max: 3000,
    duration: '1 month',
    experience_level: 'intermediate',
    skills: ['Figma', 'Adobe XD', 'Mobile Design', 'Prototyping'],
    status: 'open',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    client_id: 'client_2',
    location: 'Remote',
    company: 'StartupXYZ'
  },
  {
    id: '3',
    title: 'Content Writer for Tech Blog',
    description: 'Seeking an experienced content writer to create engaging blog posts about technology, software development, and digital trends.',
    category: 'writing',
    budget_min: 500,
    budget_max: 1000,
    duration: '1 week',
    experience_level: 'beginner',
    skills: ['SEO Writing', 'Blog Writing', 'Research', 'Copywriting'],
    status: 'open',
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    client_id: 'client_3',
    location: 'Remote',
    company: 'Digital Marketing Co.'
  },
  {
    id: '4',
    title: 'Mobile App Developer (iOS)',
    description: 'Looking for an iOS developer to build a native mobile application with modern Swift and SwiftUI.',
    category: 'mobile apps',
    budget_min: 4000,
    budget_max: 6000,
    duration: '3 months',
    experience_level: 'expert',
    skills: ['Swift', 'iOS Development', 'SwiftUI', 'Core Data'],
    status: 'open',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    client_id: 'client_4',
    location: 'Remote',
    company: 'AppMakers LLC'
  },
  {
    id: '5',
    title: 'Social Media Marketing Manager',
    description: 'Need a social media expert to manage and grow our social media presence across multiple platforms.',
    category: 'marketing',
    budget_min: 1500,
    budget_max: 2500,
    duration: '1 month',
    experience_level: 'intermediate',
    skills: ['Social Media', 'Content Strategy', 'Analytics', 'Engagement'],
    status: 'open',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    client_id: 'client_5',
    location: 'Remote',
    company: 'Brand Boost'
  },
  {
    id: '6',
    title: 'Data Entry Specialist',
    description: 'Looking for detail-oriented individual for data entry and organization tasks. Must be accurate and efficient.',
    category: 'data entry',
    budget_min: 300,
    budget_max: 500,
    duration: '2 weeks',
    experience_level: 'beginner',
    skills: ['Excel', 'Data Entry', 'Attention to Detail', 'Fast Typing'],
    status: 'open',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    client_id: 'client_6',
    location: 'Remote',
    company: 'Global Corp'
  },
  {
    id: '7',
    title: 'WordPress Developer for E-commerce',
    description: 'Need a WordPress expert to build and customize an e-commerce website with WooCommerce.',
    category: 'web development',
    budget_min: 2000,
    budget_max: 3000,
    duration: '1 month',
    experience_level: 'intermediate',
    skills: ['WordPress', 'WooCommerce', 'PHP', 'CSS'],
    status: 'open',
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    client_id: 'client_7',
    location: 'Remote',
    company: 'ShopEasy'
  },
  {
    id: '8',
    title: 'React Native Developer',
    description: 'Build a cross-platform mobile app for iOS and Android using React Native.',
    category: 'mobile apps',
    budget_min: 3500,
    budget_max: 5000,
    duration: '2 months',
    experience_level: 'intermediate',
    skills: ['React Native', 'JavaScript', 'Redux', 'Firebase'],
    status: 'open',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    client_id: 'client_8',
    location: 'Remote',
    company: 'MobileFirst Inc.'
  },
  {
    id: '9',
    title: 'Logo & Brand Identity Designer',
    description: 'Create a complete brand identity including logo, color palette, and brand guidelines.',
    category: 'design',
    budget_min: 800,
    budget_max: 1500,
    duration: '2 weeks',
    experience_level: 'intermediate',
    skills: ['Illustrator', 'Photoshop', 'Logo Design', 'Branding'],
    status: 'open',
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    client_id: 'client_9',
    location: 'Remote',
    company: 'BrandWorks'
  },
  {
    id: '10',
    title: 'SEO Specialist',
    description: 'Optimize website for search engines and improve organic traffic.',
    category: 'marketing',
    budget_min: 1200,
    budget_max: 2000,
    duration: '1 month',
    experience_level: 'intermediate',
    skills: ['SEO', 'Google Analytics', 'Keyword Research', 'Link Building'],
    status: 'open',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    client_id: 'client_10',
    location: 'Remote',
    company: 'RankHigh'
  }
];

// Initialize data if not exists
export const initializeMockData = () => {
  if (!getFromStorage(STORAGE_KEYS.JOBS).length) {
    saveToStorage(STORAGE_KEYS.JOBS, INITIAL_JOBS);
  }
  if (!getFromStorage(STORAGE_KEYS.BIDS).length) {
    saveToStorage(STORAGE_KEYS.BIDS, []);
  }
  if (!getFromStorage(STORAGE_KEYS.USERS).length) {
    saveToStorage(STORAGE_KEYS.USERS, []);
  }
  if (!getFromStorage(STORAGE_KEYS.MESSAGES).length) {
    saveToStorage(STORAGE_KEYS.MESSAGES, []);
  }
  if (!getFromStorage(STORAGE_KEYS.CONTRACTS).length) {
    saveToStorage(STORAGE_KEYS.CONTRACTS, []);
  }
  if (!getFromStorage(STORAGE_KEYS.REVIEWS).length) {
    saveToStorage(STORAGE_KEYS.REVIEWS, []);
  }
};

// Mock API functions
export const mockAPI = {
  // Jobs
  getAllJobs: () => {
    const jobs = getFromStorage(STORAGE_KEYS.JOBS, INITIAL_JOBS);
    return jobs.filter(job => job.status === 'open');
  },

  getJobById: (id) => {
    const jobs = getFromStorage(STORAGE_KEYS.JOBS, INITIAL_JOBS);
    return jobs.find(job => job.id === id);
  },

  createJob: (jobData) => {
    const jobs = getFromStorage(STORAGE_KEYS.JOBS, INITIAL_JOBS);
    const newJob = {
      id: generateId(),
      ...jobData,
      status: 'open',
      created_at: new Date().toISOString()
    };
    jobs.unshift(newJob);
    saveToStorage(STORAGE_KEYS.JOBS, jobs);
    return newJob;
  },

  updateJob: (id, updates) => {
    const jobs = getFromStorage(STORAGE_KEYS.JOBS, INITIAL_JOBS);
    const index = jobs.findIndex(job => job.id === id);
    if (index !== -1) {
      jobs[index] = { ...jobs[index], ...updates };
      saveToStorage(STORAGE_KEYS.JOBS, jobs);
      return jobs[index];
    }
    return null;
  },

  deleteJob: (id) => {
    const jobs = getFromStorage(STORAGE_KEYS.JOBS, INITIAL_JOBS);
    const filtered = jobs.filter(job => job.id !== id);
    saveToStorage(STORAGE_KEYS.JOBS, filtered);
    return true;
  },

  // Bids
  createBid: (bidData) => {
    const bids = getFromStorage(STORAGE_KEYS.BIDS);
    const newBid = {
      id: generateId(),
      ...bidData,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    bids.unshift(newBid);
    saveToStorage(STORAGE_KEYS.BIDS, bids);
    return newBid;
  },

  getBidsForJob: (jobId) => {
    const bids = getFromStorage(STORAGE_KEYS.BIDS);
    return bids.filter(bid => bid.job_id === jobId);
  },

  getMyBids: (userId) => {
    const bids = getFromStorage(STORAGE_KEYS.BIDS);
    const jobs = getFromStorage(STORAGE_KEYS.JOBS, INITIAL_JOBS);
    return bids
      .filter(bid => bid.freelancer_id === userId)
      .map(bid => ({
        ...bid,
        job: jobs.find(job => job.id === bid.job_id)
      }));
  },

  updateBid: (id, updates) => {
    const bids = getFromStorage(STORAGE_KEYS.BIDS);
    const index = bids.findIndex(bid => bid.id === id);
    if (index !== -1) {
      bids[index] = { ...bids[index], ...updates };
      saveToStorage(STORAGE_KEYS.BIDS, bids);
      return bids[index];
    }
    return null;
  },

  // Users
  createUser: (userData) => {
    const users = getFromStorage(STORAGE_KEYS.USERS);
    const newUser = {
      id: generateId(),
      ...userData,
      created_at: new Date().toISOString()
    };
    users.push(newUser);
    saveToStorage(STORAGE_KEYS.USERS, users);
    return newUser;
  },

  getUserByEmail: (email) => {
    const users = getFromStorage(STORAGE_KEYS.USERS);
    return users.find(user => user.email === email);
  },

  getCurrentUser: () => {
    return getFromStorage(STORAGE_KEYS.CURRENT_USER, null);
  },

  setCurrentUser: (user) => {
    saveToStorage(STORAGE_KEYS.CURRENT_USER, user);
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  // Messages
  createMessage: (messageData) => {
    const messages = getFromStorage(STORAGE_KEYS.MESSAGES);
    const newMessage = {
      id: generateId(),
      ...messageData,
      created_at: new Date().toISOString(),
      read: false
    };
    messages.unshift(newMessage);
    saveToStorage(STORAGE_KEYS.MESSAGES, messages);
    return newMessage;
  },

  getMessages: (userId) => {
    const messages = getFromStorage(STORAGE_KEYS.MESSAGES);
    return messages.filter(
      msg => msg.sender_id === userId || msg.receiver_id === userId
    );
  },

  // Contracts
  createContract: (contractData) => {
    const contracts = getFromStorage(STORAGE_KEYS.CONTRACTS);
    const newContract = {
      id: generateId(),
      ...contractData,
      status: 'active',
      created_at: new Date().toISOString()
    };
    contracts.push(newContract);
    saveToStorage(STORAGE_KEYS.CONTRACTS, contracts);
    return newContract;
  },

  getContracts: (userId) => {
    const contracts = getFromStorage(STORAGE_KEYS.CONTRACTS);
    return contracts.filter(
      contract => contract.client_id === userId || contract.freelancer_id === userId
    );
  },

  // Reviews
  createReview: (reviewData) => {
    const reviews = getFromStorage(STORAGE_KEYS.REVIEWS);
    const newReview = {
      id: generateId(),
      ...reviewData,
      created_at: new Date().toISOString()
    };
    reviews.push(newReview);
    saveToStorage(STORAGE_KEYS.REVIEWS, reviews);
    return newReview;
  },

  getReviews: (userId) => {
    const reviews = getFromStorage(STORAGE_KEYS.REVIEWS);
    return reviews.filter(review => review.freelancer_id === userId);
  }
};

// Initialize on import
initializeMockData();
