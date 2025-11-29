import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Briefcase, DollarSign, MessageSquare, Star, TrendingUp, Clock, Sparkles, ArrowRight, Target, Award, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import DashboardSkeleton from '../../components/Skeletons/DashboardSkeleton';

const FreelancerDashboard = () => {
  const [loading, setLoading] = useState(false);

  // Sample data for charts
  const earningsData = [
    { month: 'Jan', earnings: 2400 },
    { month: 'Feb', earnings: 1398 },
    { month: 'Mar', earnings: 3800 },
    { month: 'Apr', earnings: 3908 },
    { month: 'May', earnings: 4800 },
    { month: 'Jun', earnings: 3490 },
  ];

  const projectsData = [
    { name: 'Completed', value: 45, color: '#10B981' },
    { name: 'In Progress', value: 5, color: '#0EA5E9' },
    { name: 'Pending', value: 3, color: '#F59E0B' },
  ];

  const weeklyActivity = [
    { day: 'Mon', hours: 8 },
    { day: 'Tue', hours: 6 },
    { day: 'Wed', hours: 9 },
    { day: 'Thu', hours: 7 },
    { day: 'Fri', hours: 8 },
    { day: 'Sat', hours: 4 },
    { day: 'Sun', hours: 2 },
  ];

  const stats = [
    { 
      icon: <Briefcase className="h-6 w-6" />, 
      label: 'Active Projects', 
      value: '5', 
      change: '+2 this month',
      color: 'purple',
      progress: 85
    },
    { 
      icon: <DollarSign className="h-6 w-6" />, 
      label: 'Total Earnings', 
      value: '₹12,450', 
      change: '+₹1,200 this month',
      color: 'mint',
      progress: 70
    },
    { 
      icon: <Star className="h-6 w-6" />, 
      label: 'Average Rating', 
      value: '4.9', 
      change: '124 reviews',
      color: 'yellow',
      progress: 98
    },
    { 
      icon: <MessageSquare className="h-6 w-6" />, 
      label: 'Unread Messages', 
      value: '8', 
      change: '3 new today',
      color: 'coral',
      progress: 60
    },
  ];

  const recentJobs = [
    {
      id: 1,
      title: 'E-commerce Website Development',
      client: 'TechCorp Inc.',
      budget: '₹3000',
      deadline: '2 days',
      status: 'In Progress',
      progress: 75
    },
    {
      id: 2,
      title: 'Mobile App UI Design',
      client: 'StartupXYZ',
      budget: '₹2000',
      deadline: '5 days',
      status: 'In Progress',
      progress: 45
    },
    {
      id: 3,
      title: 'Content Writing - Blog Posts',
      client: 'Marketing Pro',
      budget: '₹500',
      deadline: '1 week',
      status: 'Pending Review',
      progress: 90
    }
  ];

  const recentBids = [
    { id: 1, title: 'React Developer Needed', budget: '₹4000', status: 'Pending', time: '2 hours ago' },
    { id: 2, title: 'Logo Design Project', budget: '₹800', status: 'Pending', time: '1 day ago' },
    { id: 3, title: 'WordPress Website Fix', budget: '₹300', status: 'Rejected', time: '3 days ago' }
  ];

  const getColorClasses = (color) => {
    const colors = {
      purple: 'from-purple-500 to-purple-600',
      mint: 'from-emerald-500 to-emerald-600',
      yellow: 'from-amber-500 to-amber-600',
      coral: 'from-rose-500 to-rose-600',
    };
    return colors[color] || colors.purple;
  };

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background Decoration */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-pastel-purple/5 dark:bg-pastel-purple/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-pastel-pink/5 dark:bg-pastel-pink/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Sparkles className="w-8 h-8 text-pastel-purple" />
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pastel-purple via-pastel-pink to-pastel-coral bg-clip-text text-transparent">
                  Freelancer Dashboard
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your work.</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/freelancer/job-search"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-pastel-purple to-pastel-pink text-white font-semibold hover:shadow-lg transition-shadow flex items-center gap-2"
              >
                Find New Jobs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getColorClasses(stat.color)} flex items-center justify-center mb-4 text-white shadow-md`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-3">{stat.label}</div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">{stat.change}</span>
                <span className="text-xs font-semibold text-pastel-purple">{stat.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className={`h-full bg-gradient-to-r ${getColorClasses(stat.color)} rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Earnings Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">Earnings Overview</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Monthly earnings for last 6 months</p>
              </div>
              <TrendingUp className="w-8 h-8 text-pastel-mint" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={earningsData}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A855F7" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: 'none', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }} 
                />
                <Area type="monotone" dataKey="earnings" stroke="#A855F7" fillOpacity={1} fill="url(#colorEarnings)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Project Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">Projects</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Distribution by status</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={projectsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {projectsData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-800 dark:text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Weekly Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">Weekly Activity</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Hours worked this week</p>
            </div>
            <Calendar className="w-8 h-8 text-pastel-blue" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }} 
              />
              <Bar dataKey="hours" fill="#0EA5E9" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/freelancer/job-search"
              className="group flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 hover:shadow-lg transition-all duration-300"
            >
              <Briefcase className="h-10 w-10 text-pastel-purple mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Find Jobs</span>
            </Link>
            <Link
              to="/freelancer/my-gigs"
              className="group flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 hover:shadow-lg transition-all duration-300"
            >
              <TrendingUp className="h-10 w-10 text-pastel-blue mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">My Gigs</span>
            </Link>
            <Link
              to="/freelancer/profile"
              className="group flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 hover:shadow-lg transition-all duration-300"
            >
              <Star className="h-10 w-10 text-pastel-mint mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Edit Profile</span>
            </Link>
            <Link
              to="/freelancer/messages"
              className="group flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/30 dark:to-rose-800/30 hover:shadow-lg transition-all duration-300"
            >
              <MessageSquare className="h-10 w-10 text-pastel-coral mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Messages</span>
            </Link>
          </div>
        </motion.div>

        {/* Active Projects & Recent Bids */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Projects */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <Target className="w-6 h-6 text-pastel-purple" />
                Active Projects
              </h2>
              <Link to="/freelancer/my-gigs" className="text-pastel-purple hover:text-pastel-pink text-sm font-medium flex items-center gap-1">
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <motion.div
                  key={job.id}
                  whileHover={{ x: 5 }}
                  className="border-l-4 border-pastel-purple pl-4 py-3 rounded-r-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{job.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{job.client}</p>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-pastel-mint font-semibold">{job.budget}</span>
                    <span className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>{job.deadline}</span>
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      job.status === 'In Progress' 
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${job.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-pastel-purple to-pastel-pink rounded-full"
                    />
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{job.progress}% complete</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Bids */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <Award className="w-6 h-6 text-pastel-pink" />
                Recent Bids
              </h2>
              <Link to="/freelancer/job-search" className="text-pastel-purple hover:text-pastel-pink text-sm font-medium flex items-center gap-1">
                Browse Jobs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {recentBids.map((bid) => (
                <motion.div
                  key={bid.id}
                  whileHover={{ x: 5 }}
                  className="border-l-4 border-pastel-pink pl-4 py-3 rounded-r-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{bid.title}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-pastel-mint font-semibold">{bid.budget}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">{bid.time}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      bid.status === 'Pending' 
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    }`}>
                      {bid.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
