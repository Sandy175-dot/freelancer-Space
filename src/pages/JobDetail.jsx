import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Briefcase, Star, ArrowLeft, Calendar, User, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { jobsAPI } from '../lib/supabaseClient';
import { createBid, getBidsForJob, subscribeToBidsForJob } from '../lib/jobs';
import DashboardSkeleton from '../components/Skeletons/DashboardSkeleton';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bids, setBids] = useState([]);

  // Fetch job from mock data
  useEffect(() => {
    fetchJob();
    fetchBids();
    const unsubscribe = subscribeToBidsForJob(id, () => fetchBids());
    return () => unsubscribe();
  }, [id]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await jobsAPI.getJobById(id);
      
      if (!data) {
        // Try fallback data
        const fallbackJob = fallbackJobs.find(j => j.id === parseInt(id));
        if (fallbackJob) {
          setJob(fallbackJob);
        } else {
          setError('Job not found.');
        }
      } else {
        setJob(data);
      }
    } catch (err) {
      console.error('Error fetching job:', err);
      // Try fallback data
      const fallbackJob = fallbackJobs.find(j => j.id === parseInt(id));
      if (fallbackJob) {
        setJob(fallbackJob);
      } else {
        setError('Job not found or failed to load.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchBids = async () => {
    try {
      const result = await getBidsForJob(id);
      if (result.success) {
        setBids(result.data || []);
      }
    } catch (err) {
      console.error('Error fetching bids:', err);
    }
  };

  // Helper functions
  const formatBudget = (job) => {
    if (job.budget_min && job.budget_max) {
      return `₹${job.budget_min} - ₹${job.budget_max}`;
    }
    return 'Budget not specified';
  };

  const formatPostedTime = (createdAt) => {
    const now = new Date();
    const posted = new Date(createdAt);
    const diffMs = now - posted;
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    return `${Math.floor(diffDays / 7)} ${Math.floor(diffDays / 7) === 1 ? 'week' : 'weeks'} ago`;
  };

  // Fallback sample job data
  const fallbackJobs = [
    {
      id: 1,
      title: 'Full Stack Developer Needed',
      company: 'Tech Solutions Inc.',
      location: 'Remote',
      budget: '₹3000 - ₹5000',
      duration: '2-3 months',
      posted: '2 days ago',
      category: 'web development',
      description: 'Looking for an experienced full stack developer to build a modern web application using React and Node.js. The ideal candidate should have strong experience with REST APIs, database design, and cloud deployment.',
      requirements: [
        '5+ years of experience in full stack development',
        'Expert knowledge of React, Node.js, and MongoDB',
        'Experience with AWS or similar cloud platforms',
        'Strong understanding of RESTful API design',
        'Excellent problem-solving skills',
      ],
      responsibilities: [
        'Design and develop scalable web applications',
        'Write clean, maintainable code',
        'Collaborate with the design team',
        'Implement security and data protection',
        'Participate in code reviews',
      ],
      skills: ['React', 'Node.js', 'MongoDB', 'REST API'],
      clientInfo: {
        name: 'Tech Solutions Inc.',
        rating: 4.8,
        reviews: 45,
        jobsPosted: 23,
        hireRate: '85%',
        totalSpent: '₹125,000',
      },
      projectType: 'Fixed Price',
      experienceLevel: 'Expert',
      proposals: 12,
    },
    {
      id: 2,
      title: 'UI/UX Designer for Mobile App',
      company: 'StartupXYZ',
      location: 'Remote',
      budget: '₹2000 - ₹3000',
      duration: '1 month',
      posted: '1 day ago',
      category: 'design',
      description: 'Need a creative UI/UX designer to design a user-friendly mobile app interface. Looking for someone who can create beautiful, intuitive designs.',
      requirements: [
        '3+ years of UI/UX design experience',
        'Proficiency in Figma and Adobe XD',
        'Strong portfolio of mobile app designs',
        'Understanding of iOS and Android design guidelines',
      ],
      responsibilities: [
        'Create wireframes and prototypes',
        'Design intuitive user interfaces',
        'Conduct user research',
        'Collaborate with developers',
      ],
      skills: ['Figma', 'Adobe XD', 'Mobile Design', 'Prototyping'],
      clientInfo: {
        name: 'StartupXYZ',
        rating: 4.5,
        reviews: 12,
        jobsPosted: 8,
        hireRate: '75%',
        totalSpent: '₹32,000',
      },
      projectType: 'Fixed Price',
      experienceLevel: 'Intermediate',
      proposals: 8,
    },
    {
      id: 3,
      title: 'Content Writer for Blog',
      company: 'Digital Marketing Co.',
      location: 'Remote',
      budget: '₹500 - ₹1000',
      duration: '1 week',
      posted: '3 hours ago',
      category: 'writing',
      description: 'Seeking an experienced content writer to create engaging blog posts about technology.',
      requirements: [
        '2+ years of content writing experience',
        'Strong SEO knowledge',
        'Excellent research skills',
        'Portfolio of published articles',
      ],
      responsibilities: [
        'Write 5-7 blog posts per week',
        'Conduct keyword research',
        'Optimize content for SEO',
        'Edit and proofread content',
      ],
      skills: ['SEO Writing', 'Blog Writing', 'Research', 'Copywriting'],
      clientInfo: {
        name: 'Digital Marketing Co.',
        rating: 4.7,
        reviews: 28,
        jobsPosted: 15,
        hireRate: '80%',
        totalSpent: '₹45,000',
      },
      projectType: 'Fixed Price',
      experienceLevel: 'Intermediate',
      proposals: 15,
    },
    {
      id: 4,
      title: 'Mobile App Developer (iOS)',
      company: 'AppMakers LLC',
      location: 'Remote',
      budget: '₹4000 - ₹6000',
      duration: '3 months',
      posted: '5 days ago',
      category: 'mobile apps',
      description: 'Looking for an iOS developer to build a native mobile application with modern Swift.',
      requirements: [
        '4+ years of iOS development experience',
        'Expert knowledge of Swift and SwiftUI',
        'Experience with Core Data and networking',
        'Published apps on the App Store',
      ],
      responsibilities: [
        'Develop native iOS application',
        'Implement REST API integration',
        'Write unit and UI tests',
        'Submit app to App Store',
      ],
      skills: ['Swift', 'iOS Development', 'UI Kit', 'Core Data'],
      clientInfo: {
        name: 'AppMakers LLC',
        rating: 4.9,
        reviews: 67,
        jobsPosted: 34,
        hireRate: '90%',
        totalSpent: '₹215,000',
      },
      projectType: 'Fixed Price',
      experienceLevel: 'Expert',
      proposals: 9,
    },
    {
      id: 5,
      title: 'Social Media Marketing Manager',
      company: 'Brand Boost',
      location: 'Remote',
      budget: '₹1500 - ₹2500',
      duration: '1 month',
      posted: '1 week ago',
      category: 'marketing',
      description: 'Need a social media expert to manage and grow our social media presence.',
      requirements: [
        '3+ years of social media marketing experience',
        'Proven track record of growing social accounts',
        'Experience with Instagram, Facebook, Twitter, LinkedIn',
        'Strong analytics skills',
      ],
      responsibilities: [
        'Create content calendar',
        'Post daily content',
        'Engage with followers',
        'Analyze performance metrics',
      ],
      skills: ['Social Media', 'Content Strategy', 'Analytics', 'Engagement'],
      clientInfo: {
        name: 'Brand Boost',
        rating: 4.6,
        reviews: 22,
        jobsPosted: 11,
        hireRate: '78%',
        totalSpent: '₹38,000',
      },
      projectType: 'Fixed Price',
      experienceLevel: 'Intermediate',
      proposals: 18,
    },
    {
      id: 6,
      title: 'Data Entry Specialist',
      company: 'Global Corp',
      location: 'Remote',
      budget: '₹300 - ₹500',
      duration: '2 weeks',
      posted: '2 days ago',
      category: 'data entry',
      description: 'Looking for detail-oriented individual for data entry and organization tasks.',
      requirements: [
        '1+ years of data entry experience',
        'Excellent attention to detail',
        'Fast typing speed (60+ WPM)',
        'Proficiency in Excel',
      ],
      responsibilities: [
        'Enter data into spreadsheets',
        'Verify data accuracy',
        'Organize digital files',
        'Generate reports',
      ],
      skills: ['Excel', 'Data Entry', 'Attention to Detail', 'Fast Typing'],
      clientInfo: {
        name: 'Global Corp',
        rating: 4.4,
        reviews: 15,
        jobsPosted: 19,
        hireRate: '70%',
        totalSpent: '₹22,000',
      },
      projectType: 'Fixed Price',
      experienceLevel: 'Entry Level',
      proposals: 25,
    },
  ];

  const displayJob = job || fallbackJobs.find(j => j.id === parseInt(id)) || fallbackJobs[0];

  const handleApply = async () => {
    setShowApplyModal(true);
    // Increment proposals count in database
    if (job && job.id) {
      try {
        await jobsAPI.incrementProposals(job.id);
        // Update local state
        setJob({ ...job, proposals_count: (job.proposals_count || 0) + 1 });
      } catch (err) {
        console.error('Error updating proposals:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto">
          <DashboardSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Job Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => navigate('/browse-jobs')}
            className="px-6 py-3 bg-gradient-to-r from-pastel-purple to-pastel-pink text-white rounded-lg hover:shadow-lg transition"
          >
            Browse All Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-pastel-purple mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Jobs</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {displayJob.title}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{displayJob.company}</p>
                </div>
              </div>

              {/* Job Meta */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="h-5 w-5 text-pastel-purple" />
                  <span className="text-sm">{displayJob.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <DollarSign className="h-5 w-5 text-pastel-mint" />
                  <span className="text-sm">{displayJob.budget || formatBudget(displayJob)}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Clock className="h-5 w-5 text-pastel-blue" />
                  <span className="text-sm">{displayJob.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="h-5 w-5 text-pastel-coral" />
                  <span className="text-sm">Posted {displayJob.posted || formatPostedTime(displayJob.created_at)}</span>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {(displayJob.skills || []).map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-pastel-mint/30 dark:bg-pastel-mint/20 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Job Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Project Description
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {displayJob.description}
              </p>
            </motion.div>

            {/* Requirements */}
            {displayJob.requirements && displayJob.requirements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft"
              >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-pastel-purple" />
                  Requirements
                </h2>
                <ul className="space-y-2">
                  {displayJob.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <span className="w-2 h-2 rounded-full bg-pastel-purple mt-2 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Responsibilities */}
            {displayJob.responsibilities && displayJob.responsibilities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft"
              >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-pastel-blue" />
                  Responsibilities
                </h2>
                <ul className="space-y-2">
                  {displayJob.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <span className="w-2 h-2 rounded-full bg-pastel-blue mt-2 flex-shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft sticky top-4"
            >
              <button
                onClick={handleApply}
                className="w-full px-6 py-3 bg-gradient-to-r from-pastel-purple to-pastel-pink text-white rounded-lg hover:shadow-lg transition font-semibold mb-4"
              >
                Apply Now
              </button>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Project Type</span>
                  <span className="font-semibold text-gray-800 dark:text-white capitalize">
                    {displayJob.projectType || displayJob.project_type || 'Fixed Price'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Experience Level</span>
                  <span className="font-semibold text-gray-800 dark:text-white capitalize">
                    {displayJob.experienceLevel || displayJob.experience_level || 'Intermediate'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Proposals</span>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {displayJob.proposals || displayJob.proposals_count || 0}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Client Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-pastel-purple" />
                About the Client
              </h3>

              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {displayJob.clientInfo?.name || displayJob.company}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-pastel-yellow fill-pastel-yellow" />
                      <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                        {displayJob.clientInfo?.rating || displayJob.client_rating || 4.5}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({displayJob.clientInfo?.reviews || displayJob.client_reviews || 0} reviews)
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Jobs Posted</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {displayJob.clientInfo?.jobsPosted || displayJob.client_jobs_posted || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Hire Rate</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {displayJob.clientInfo?.hireRate || displayJob.client_hire_rate || '0%'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Spent</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {displayJob.clientInfo?.totalSpent || displayJob.client_total_spent || '₹0'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <ApplyModal
          job={displayJob}
          onClose={() => setShowApplyModal(false)}
        />
      )}
    </div>
  );
};

// Apply Modal Component
const ApplyModal = ({ job, onClose }) => {
  const [formData, setFormData] = useState({
    coverLetter: '',
    proposedRate: '',
    estimatedDuration: '',
    portfolio: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await createBid({ jobId: job.id, bidAmount: formData.proposedRate, proposal: formData.coverLetter });
      if (!result.success) throw new Error(result.error);
      setSubmitted(true);
      setTimeout(() => { onClose(); }, 2000);
    } catch (err) {
      alert(err.message || 'Failed to submit bid');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Apply for {job.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 bg-pastel-mint rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Application Submitted!
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your proposal has been sent to the client. They will review it and get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cover Letter *
              </label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Explain why you're the best fit for this project..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Proposed Rate *
                </label>
                <input
                  type="text"
                  name="proposedRate"
                  value={formData.proposedRate}
                  onChange={handleChange}
                  required
                  placeholder="e.g., ₹3500"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Estimated Duration *
                </label>
                <input
                  type="text"
                  name="estimatedDuration"
                  value={formData.estimatedDuration}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 2 months"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Portfolio Link (Optional)
              </label>
              <input
                type="url"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-pastel-purple to-pastel-pink text-white rounded-lg hover:shadow-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default JobDetail;
