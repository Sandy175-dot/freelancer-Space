import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, DollarSign, Clock, MapPin, User, Star,
  Briefcase, Tag, FileText, Download, MessageCircle,
  Heart, Share2, Flag, Award, TrendingUp, Users,
  Zap, Shield, CheckCircle, ArrowRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToastNotifications } from '../components/UI/Toast';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import RatingStars from '../components/UI/RatingStars';
import Avatar from '../components/UI/Avatar';
import Badge from '../components/UI/Badge';
import Modal from '../components/UI/Modal';

// Mock project data
const mockProject = {
  id: '1',
  title: 'Build a Modern E-commerce Website with React & Node.js',
  description: `I'm looking for an experienced full-stack developer to build a modern e-commerce website for my fashion brand. The website should have a clean, responsive design and include features like product catalog, shopping cart, payment integration, and admin dashboard.

Key Requirements:
• Responsive design that works on all devices
• Product catalog with search and filtering
• Shopping cart and checkout process
• Payment gateway integration (Stripe/PayPal)
• User authentication and profiles
• Admin dashboard for inventory management
• SEO optimization
• Fast loading times

The design should be modern, clean, and user-friendly. I have some reference websites that I'll share with the selected freelancer.

Timeline: I need this completed within 6-8 weeks.
Budget: ₹25,000 - ₹40,000 (negotiable based on experience)

Please include examples of similar projects you've completed in your proposal.`,
  category: 'Web Development',
  tags: ['React', 'Node.js', 'MongoDB', 'Express', 'E-commerce', 'Payment Integration'],
  budgetMin: 25000,
  budgetMax: 40000,
  budgetType: 'fixed',
  duration: '6-8 weeks',
  postedDate: '2024-01-15T10:30:00Z',
  deadline: '2024-03-01T23:59:59Z',
  status: 'open',
  client: {
    id: 'client_1',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    rating: 4.8,
    reviewsCount: 23,
    location: 'Mumbai, India',
    memberSince: '2022-03-15',
    verified: true,
    totalProjects: 12,
    completionRate: 95
  },
  attachments: [
    { name: 'Project_Requirements.pdf', size: '2.4 MB', type: 'pdf' },
    { name: 'Reference_Design.jpg', size: '1.8 MB', type: 'image' }
  ],
  stats: {
    views: 156,
    proposals: 12,
    avgBid: 32500,
    timeLeft: '5 days'
  }
};

// Mock bids data
const mockBids = [
  {
    id: 'bid_1',
    freelancer: {
      id: 'freelancer_1',
      name: 'Rajesh Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      rating: 4.9,
      reviewsCount: 87,
      location: 'Bangalore, India',
      verified: true,
      skills: ['React', 'Node.js', 'MongoDB', 'E-commerce'],
      completedProjects: 45,
      successRate: 98
    },
    amount: 28000,
    deliveryDays: 42,
    coverLetter: `Hi Sarah! I'm excited about your e-commerce project. With 5+ years of experience in React and Node.js, I've built 15+ similar e-commerce platforms. 

I can deliver:
✅ Fully responsive design
✅ Advanced product filtering & search
✅ Secure payment integration
✅ Admin dashboard with analytics
✅ SEO optimization
✅ 30 days post-launch support

I'll use React.js for frontend, Node.js/Express for backend, and MongoDB for database. The site will be fast, secure, and scalable.

Timeline: 6 weeks
Budget: ₹28,000 (includes hosting setup)

Check my portfolio: [portfolio link]
Let's discuss your vision!`,
    submittedAt: '2024-01-16T14:20:00Z',
    featured: true
  },
  {
    id: 'bid_2',
    freelancer: {
      id: 'freelancer_2',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      rating: 4.7,
      reviewsCount: 52,
      location: 'Delhi, India',
      verified: true,
      skills: ['React', 'Node.js', 'E-commerce', 'UI/UX'],
      completedProjects: 28,
      successRate: 96
    },
    amount: 35000,
    deliveryDays: 45,
    coverLetter: `Hello! I specialize in creating beautiful, high-converting e-commerce websites. Your project aligns perfectly with my expertise.

What I offer:
• Custom React components for optimal performance
• Intuitive admin dashboard
• Mobile-first responsive design
• Advanced SEO implementation
• Payment gateway integration
• Post-launch maintenance

I focus on user experience and conversion optimization. My recent e-commerce project increased client sales by 40%.

Let's create something amazing together!`,
    submittedAt: '2024-01-16T16:45:00Z',
    featured: false
  },
  {
    id: 'bid_3',
    freelancer: {
      id: 'freelancer_3',
      name: 'Ahmed Ali',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      rating: 4.6,
      reviewsCount: 34,
      location: 'Hyderabad, India',
      verified: false,
      skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
      completedProjects: 19,
      successRate: 94
    },
    amount: 30000,
    deliveryDays: 50,
    coverLetter: `Hi Sarah, I'm a full-stack developer with expertise in MERN stack. I can build your e-commerce website with all the features you mentioned.

My approach:
1. Detailed planning & wireframing
2. Modern, responsive UI development
3. Robust backend with security features
4. Thorough testing & optimization
5. Deployment & documentation

I'll ensure your website is fast, secure, and user-friendly. Available to start immediately!`,
    submittedAt: '2024-01-17T09:15:00Z',
    featured: false
  }
];

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError, showInfo } = useToastNotifications();
  
  const [project] = useState(mockProject);
  const [bids] = useState(mockBids);
  const [activeTab, setActiveTab] = useState('description');
  const [showBidModal, setShowBidModal] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const isClient = user?.role === 'client';
  const isFreelancer = user?.role === 'freelancer';
  const isProjectOwner = isClient && user?.id === project.client.id;

  const handleBidNow = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!isFreelancer) {
      showError('Only freelancers can bid on projects');
      return;
    }
    setShowBidModal(true);
  };

  const handleAcceptBid = (bid) => {
    setSelectedBid(bid);
    navigate(`/project/${id}/hire`, { state: { bid, project } });
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    showSuccess(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showSuccess('Project link copied to clipboard');
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just posted';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  const BidCard = ({ bid, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card 
        variant="glass" 
        className={`p-6 ${bid.featured ? 'ring-2 ring-primary/50' : ''}`}
        hover={true}
      >
        {bid.featured && (
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-yellow-400 text-sm font-medium">Featured Proposal</span>
          </div>
        )}
        
        <div className="flex items-start gap-4 mb-4">
          <Avatar 
            src={bid.freelancer.avatar} 
            alt={bid.freelancer.name}
            size="lg"
            className="ring-2 ring-white/20"
          />
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-white">
                {bid.freelancer.name}
              </h3>
              {bid.freelancer.verified && (
                <CheckCircle className="w-4 h-4 text-green-400" />
              )}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-white/70 mb-2">
              <div className="flex items-center gap-1">
                <RatingStars rating={bid.freelancer.rating} size="sm" readonly />
                <span>({bid.freelancer.reviewsCount})</span>
              </div>
              <span>{bid.freelancer.location}</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {bid.freelancer.skills.slice(0, 4).map((skill, idx) => (
                <Badge key={idx} variant="secondary" size="sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-white/5 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">₹{bid.amount.toLocaleString()}</div>
            <div className="text-xs text-white/60">Bid Amount</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{bid.deliveryDays}</div>
            <div className="text-xs text-white/60">Days</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{bid.freelancer.successRate}%</div>
            <div className="text-xs text-white/60">Success Rate</div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-white/80 text-sm leading-relaxed line-clamp-4">
            {bid.coverLetter}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-white/60">
            Submitted {getTimeAgo(bid.submittedAt)}
          </span>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => showInfo('Message feature coming soon')}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Message
            </Button>
            
            {isProjectOwner && (
              <Button
                size="sm"
                onClick={() => handleAcceptBid(bid)}
                className="bg-gradient-to-r from-primary to-secondary"
              >
                Accept Bid
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card variant="glass" className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-white mb-2">
                      {project.title}
                    </h1>
                    
                    <div className="flex items-center gap-4 text-sm text-white/70 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Posted {getTimeAgo(project.postedDate)}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        ₹{project.budgetMin.toLocaleString()} - ₹{project.budgetMax.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {project.duration}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, index) => (
                        <Badge key={index} variant="primary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleBookmark}
                      className={isBookmarked ? 'text-yellow-400 border-yellow-400' : ''}
                    >
                      <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShare}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                    
                    {isFreelancer && (
                      <Button
                        onClick={handleBidNow}
                        className="bg-gradient-to-r from-primary to-secondary"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Bid Now
                      </Button>
                    )}
                  </div>
                </div>

                {/* Client Info */}
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                  <Avatar 
                    src={project.client.avatar} 
                    alt={project.client.name}
                    size="md"
                    className="ring-2 ring-white/20"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white">{project.client.name}</h3>
                      {project.client.verified && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-white/70">
                      <div className="flex items-center gap-1">
                        <RatingStars rating={project.client.rating} size="sm" readonly />
                        <span>({project.client.reviewsCount})</span>
                      </div>
                      <span>{project.client.location}</span>
                      <span>{project.client.totalProjects} projects posted</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card variant="glass">
                <div className="border-b border-white/20">
                  <nav className="flex space-x-8 px-6">
                    {[
                      { id: 'description', label: 'Description', icon: FileText },
                      { id: 'proposals', label: `Proposals (${bids.length})`, icon: Users },
                      { id: 'attachments', label: 'Attachments', icon: Download }
                    ].map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`
                            flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors
                            ${activeTab === tab.id
                              ? 'border-primary text-primary'
                              : 'border-transparent text-white/70 hover:text-white'
                            }
                          `}
                        >
                          <Icon className="w-4 h-4" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {activeTab === 'description' && (
                      <motion.div
                        key="description"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="prose prose-invert max-w-none"
                      >
                        <div className="text-white/80 leading-relaxed whitespace-pre-line">
                          {project.description}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'proposals' && (
                      <motion.div
                        key="proposals"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                      >
                        {bids.length > 0 ? (
                          bids.map((bid, index) => (
                            <BidCard key={bid.id} bid={bid} index={index} />
                          ))
                        ) : (
                          <div className="text-center py-12">
                            <Users className="w-12 h-12 text-white/30 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-white mb-2">
                              No proposals yet
                            </h3>
                            <p className="text-white/60">
                              Be the first to submit a proposal for this project
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {activeTab === 'attachments' && (
                      <motion.div
                        key="attachments"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                      >
                        {project.attachments.length > 0 ? (
                          project.attachments.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <FileText className="w-8 h-8 text-white/60" />
                                <div>
                                  <div className="text-white font-medium">{file.name}</div>
                                  <div className="text-white/60 text-sm">{file.size}</div>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-12">
                            <FileText className="w-12 h-12 text-white/30 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-white mb-2">
                              No attachments
                            </h3>
                            <p className="text-white/60">
                              This project doesn't have any attached files
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card variant="glass" className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Project Statistics
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Views</span>
                    <span className="text-white font-medium">{project.stats.views}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Proposals</span>
                    <span className="text-white font-medium">{project.stats.proposals}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Average Bid</span>
                    <span className="text-white font-medium">₹{project.stats.avgBid.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Time Left</span>
                    <span className="text-white font-medium">{project.stats.timeLeft}</span>
                  </div>
                </div>

                {/* Bid Distribution Chart Placeholder */}
                <div className="mt-6 p-4 bg-white/5 rounded-lg">
                  <h4 className="text-sm font-medium text-white mb-3">Bid Distribution</h4>
                  <div className="h-24 bg-gradient-to-r from-primary/20 to-secondary/20 rounded flex items-end justify-center">
                    <TrendingUp className="w-8 h-8 text-white/40" />
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card variant="glass" className="p-6 text-center">
                <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  FreelanceHub Protection
                </h3>
                <p className="text-white/70 text-sm">
                  Payments are securely held in escrow until project completion. 
                  Get refund if work isn't delivered as described.
                </p>
              </Card>
            </motion.div>

            {/* Similar Projects */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card variant="glass" className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Similar Projects
                </h3>
                
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                      <h4 className="text-white font-medium text-sm mb-1">
                        React Dashboard Development
                      </h4>
                      <div className="text-white/60 text-xs">
                        ₹15,000 - ₹25,000 • 3 weeks
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bid Modal */}
      <Modal
        isOpen={showBidModal}
        onClose={() => setShowBidModal(false)}
        title="Submit Your Proposal"
        size="lg"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Your Bid Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">₹</span>
              <input
                type="number"
                placeholder="25000"
                className="w-full pl-8 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Delivery Time
            </label>
            <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none">
              <option value="">Select delivery time</option>
              <option value="7">1 week</option>
              <option value="14">2 weeks</option>
              <option value="30">1 month</option>
              <option value="45">6 weeks</option>
              <option value="60">2 months</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Cover Letter
            </label>
            <textarea
              rows={6}
              placeholder="Describe your approach, relevant experience, and why you're the best fit for this project..."
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none"
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowBidModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowBidModal(false);
                showSuccess('Proposal submitted successfully!');
              }}
              className="flex-1 bg-gradient-to-r from-primary to-secondary"
            >
              Submit Proposal
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectDetail;