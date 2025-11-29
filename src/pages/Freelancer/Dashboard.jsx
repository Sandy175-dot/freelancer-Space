import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { 
  Briefcase, 
  DollarSign, 
  Star, 
  User,
  Target,
  MessageSquare,
  BarChart3,
  Zap,
  Eye,
  ArrowRight,
  Activity
} from 'lucide-react';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import EarningsChart from '../../components/Charts/EarningsChart';
import RadialProgress from '../../components/Charts/RadialProgress';
import ProjectCard from '../../components/Dashboard/ProjectCard';
import StatsCard from '../../components/Dashboard/StatsCard';
import AnimatedCounter from '../../components/UI/AnimatedCounter';

const FreelancerDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [stats, setStats] = useState([]);
  const [projects, setProjects] = useState([]);
  const [earningsData, setEarningsData] = useState([]);
  const [recentBids, setRecentBids] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const tabContentRef = useRef(null);
  const tabIndicatorRef = useRef(null);

  const tabs = [
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'reviews', label: 'Reviews', icon: Star }
  ];

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API calls
        // const statsData = await api.getFreelancerStats();
        // const projectsData = await api.getFreelancerProjects();
        // const earningsData = await api.getEarningsData();
        // const bidsData = await api.getRecentBids();
        
        // setStats(statsData);
        // setProjects(projectsData);
        // setEarningsData(earningsData);
        // setRecentBids(bidsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // GSAP tab transition
  useEffect(() => {
    if (tabContentRef.current) {
      gsap.fromTo(tabContentRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  const handleTabChange = (tabId, index) => {
    if (tabIndicatorRef.current) {
      gsap.to(tabIndicatorRef.current, {
        x: index * 120,
        duration: 0.3,
        ease: "power2.out"
      });
    }

    if (tabContentRef.current) {
      gsap.to(tabContentRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setActiveTab(tabId);
        }
      });
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'projects':
        return (
          <div className="space-y-6">
            {projects.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <p className="text-white/60">No projects yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            )}
          </div>
        );
      
      case 'earnings':
        return (
          <div className="space-y-6">
            {earningsData.length === 0 ? (
              <div className="text-center py-12">
                <DollarSign className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <p className="text-white/60">No earnings data yet</p>
              </div>
            ) : (
              <>
                <div className="glass-premium rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-6">Earnings Overview</h3>
                  <EarningsChart data={earningsData} type="area" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-premium rounded-2xl p-6 text-center">
                    <h4 className="text-white/80 text-sm mb-2">This Month</h4>
                    <AnimatedCounter
                      end={0}
                      prefix="₹"
                      className="text-3xl font-bold text-gradient-primary"
                    />
                  </div>
                  <div className="glass-premium rounded-2xl p-6 text-center">
                    <h4 className="text-white/80 text-sm mb-2">Last Month</h4>
                    <AnimatedCounter
                      end={0}
                      prefix="₹"
                      className="text-3xl font-bold text-gradient-primary"
                    />
                  </div>
                  <div className="glass-premium rounded-2xl p-6 text-center">
                    <h4 className="text-white/80 text-sm mb-2">Average/Month</h4>
                    <AnimatedCounter
                      end={0}
                      prefix="₹"
                      className="text-3xl font-bold text-gradient-primary"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        );
      
      case 'reviews':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <RadialProgress
                percentage={0}
                title="Success Rate"
                subtitle="0 projects"
                color="#10b981"
              />
              <RadialProgress
                percentage={0}
                title="On-Time Delivery"
                subtitle="Last 6 months"
                color="#3b82f6"
              />
              <RadialProgress
                percentage={0}
                title="Client Satisfaction"
                subtitle="0 reviews"
                color="#8b5cf6"
              />
              <RadialProgress
                percentage={0}
                title="Repeat Clients"
                subtitle="Return rate"
                color="#f59e0b"
              />
            </div>
            
            <div className="glass-premium rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6">Recent Reviews</h3>
              <div className="text-center py-12">
                <Star className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <p className="text-white/60">No reviews yet</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900">
      <DashboardLayout>
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gradient-secondary mb-2">
                  Freelancer Dashboard
                </h1>
                <p className="text-white/70 text-lg">
                  Welcome back! Here's your performance overview
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button 
                  onClick={() => window.location.href = '/freelancer/browse-jobs'}
                  className="btn-premium text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Find New Jobs
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.length === 0 ? (
              <div className="col-span-4 text-center py-12 glass-premium rounded-2xl">
                <p className="text-white/60">No statistics available yet</p>
              </div>
            ) : (
              stats.map((stat, index) => (
                <StatsCard key={stat.title} {...stat} index={index} />
              ))
            )}
          </div>

          {/* Profile Completion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-premium rounded-2xl p-6 mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Profile Completion</h3>
                <p className="text-white/70">Complete your profile to get more job opportunities</p>
              </div>
              <div className="flex items-center gap-6">
                <RadialProgress
                  percentage={0}
                  title=""
                  subtitle=""
                  color="#6366f1"
                  size={80}
                  strokeWidth={6}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-light hover:glass-medium px-6 py-3 rounded-xl text-white font-semibold border border-white/20 hover:border-white/40 transition-all"
                >
                  Complete Profile
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="glass-premium rounded-2xl p-6 mb-8">
            <div className="relative mb-8">
              <div className="flex space-x-1 bg-white/5 rounded-2xl p-1 relative">
                <motion.div
                  ref={tabIndicatorRef}
                  className="absolute top-1 left-1 w-28 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl"
                  initial={{ x: 0 }}
                />
                {tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id, index)}
                    className={`relative z-10 flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === tab.id 
                        ? 'text-white' 
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div ref={tabContentRef}>
              {renderTabContent()}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Bids */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass-premium rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Activity className="w-6 h-6" />
                  Recent Bids
                </h3>
                <button className="text-indigo-300 hover:text-white transition-colors flex items-center gap-1">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              {recentBids.length === 0 ? (
                <div className="text-center py-12">
                  <Activity className="w-16 h-16 text-white/40 mx-auto mb-4" />
                  <p className="text-white/60">No recent bids</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentBids.map((bid, index) => (
                    <motion.div
                      key={bid.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="glass-light rounded-xl p-4 hover:glass-medium transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold">{bid.title}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          bid.status === 'accepted' 
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                        }`}>
                          {bid.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">{bid.client}</span>
                        <span className="text-indigo-300 font-semibold">{bid.budget}</span>
                      </div>
                      <p className="text-white/60 text-xs mt-2">{bid.submittedAt}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="glass-premium rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6" />
                Quick Actions
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Eye, label: 'Browse Jobs', color: 'from-blue-500 to-indigo-500', path: '/freelancer/browse-jobs' },
                  { icon: MessageSquare, label: 'Messages', color: 'from-green-500 to-emerald-500', path: '/freelancer/messages' },
                  { icon: User, label: 'Edit Profile', color: 'from-purple-500 to-violet-500', path: '/freelancer/profile' },
                  { icon: BarChart3, label: 'Analytics', color: 'from-orange-500 to-red-500', path: '/freelancer/analytics' }
                ].map((action, index) => (
                  <motion.button
                    key={action.label}
                    onClick={() => window.location.href = action.path}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="glass-light hover:glass-medium rounded-xl p-6 text-center transition-all group"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white/80 group-hover:text-white font-medium">
                      {action.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default FreelancerDashboard;
