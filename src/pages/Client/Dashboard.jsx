import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Briefcase, 
  Users, 
  DollarSign, 
  TrendingUp,
  MessageSquare,
  Eye,
  BarChart3,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import StatsCard from '../../components/Dashboard/StatsCard';
import { jobsAPI, bidsAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeProjects: 0,
    totalSpent: 0,
    hiredFreelancers: 0,
    successRate: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentBids, setRecentBids] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch client's jobs
      const jobsResult = await jobsAPI.getAllJobs({ client_id: user?.id });
      const jobs = jobsResult.data || [];
      
      // Calculate stats from real data
      const activeJobs = jobs.filter(j => j.status === 'open' || j.status === 'in_progress');
      
      setStats({
        activeProjects: activeJobs.length,
        totalSpent: 0, // Will be calculated from payments table
        hiredFreelancers: 0, // Will be calculated from projects table
        successRate: jobs.length > 0 ? 94 : 0 // Placeholder
      });
      
      setRecentJobs(jobs.slice(0, 5));
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: 'Active Projects',
      value: stats.activeProjects,
      icon: Briefcase,
      color: 'from-blue-500 to-indigo-500',
      subtitle: loading ? 'Loading...' : `${stats.activeProjects} active`,
      trend: 15.2
    },
    {
      title: 'Total Spent',
      value: stats.totalSpent,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      subtitle: 'This month',
      trend: 8.7,
      prefix: '₹'
    },
    {
      title: 'Hired Freelancers',
      value: stats.hiredFreelancers,
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      subtitle: 'Currently working',
      trend: 12.3
    },
    {
      title: 'Success Rate',
      value: stats.successRate,
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
      subtitle: 'Project completion',
      trend: 2.1,
      suffix: '%'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Client Dashboard</h1>
            <p className="text-white/70">Manage your projects and connect with top freelancers</p>
          </div>
          <Link
            to="/client/post-project"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 btn-premium text-white font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Post New Project
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => (
            <StatsCard key={stat.title} {...stat} index={index} />
          ))}
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 glass-premium rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Recent Activity
              </h2>
              <Link to="/client/my-jobs" className="text-indigo-400 hover:text-indigo-300 text-sm">
                View All →
              </Link>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse glass-light rounded-xl p-4 h-20"></div>
                ))}
              </div>
            ) : recentJobs.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 mb-4">No projects yet</p>
                <Link
                  to="/client/post-project"
                  className="inline-flex items-center gap-2 px-4 py-2 btn-premium text-white rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                  Post Your First Project
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-light rounded-xl p-4 hover:glass-medium transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1">{job.title}</h3>
                        <p className="text-white/60 text-sm">{job.category}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        job.status === 'open' ? 'bg-green-500/20 text-green-300' :
                        job.status === 'in_progress' ? 'bg-blue-500/20 text-blue-300' :
                        'bg-gray-500/20 text-gray-300'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="glass-premium rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link
                to="/client/post-project"
                className="flex items-center gap-3 p-4 glass-light hover:glass-medium rounded-xl transition-all group"
              >
                <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                  <Plus className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-white font-medium">Post New Project</span>
              </Link>

              <Link
                to="/browse-freelancers"
                className="flex items-center gap-3 p-4 glass-light hover:glass-medium rounded-xl transition-all group"
              >
                <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                  <Users className="w-5 h-5 text-green-400" />
                </div>
                <span className="text-white font-medium">Browse Freelancers</span>
              </Link>

              <Link
                to="/messages"
                className="flex items-center gap-3 p-4 glass-light hover:glass-medium rounded-xl transition-all group"
              >
                <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                  <MessageSquare className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-white font-medium">View Messages</span>
              </Link>

              <Link
                to="/analytics"
                className="flex items-center gap-3 p-4 glass-light hover:glass-medium rounded-xl transition-all group"
              >
                <div className="p-2 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                  <BarChart3 className="w-5 h-5 text-orange-400" />
                </div>
                <span className="text-white font-medium">View Analytics</span>
              </Link>
            </div>
          </div>
        </div>

        {/* This Month Stats */}
        <div className="glass-premium rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              This Month
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-white/60 text-sm mb-1">Projects Posted</p>
              <p className="text-2xl font-bold text-white">{loading ? '-' : recentJobs.length}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">Freelancers Hired</p>
              <p className="text-2xl font-bold text-white">{loading ? '-' : 0}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">Amount Spent</p>
              <p className="text-2xl font-bold text-white">₹{loading ? '-' : '0'}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">Avg. Rating Given</p>
              <p className="text-2xl font-bold text-white flex items-center gap-1">
                {loading ? '-' : '4.8'} <span className="text-yellow-400">⭐</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;
