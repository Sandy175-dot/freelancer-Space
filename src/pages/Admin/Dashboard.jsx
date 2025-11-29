import { Users, Briefcase, DollarSign, TrendingUp, UserCheck, AlertTriangle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import DashboardLayout from '../../components/Layout/DashboardLayout';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Users', value: '15,420', icon: <Users className="h-6 w-6" />, color: 'pastel-purple', change: '+12.5%' },
    { label: 'Active Jobs', value: '1,234', icon: <Briefcase className="h-6 w-6" />, color: 'pastel-blue', change: '+8.2%' },
    { label: 'Revenue', value: '₹234,500', icon: <DollarSign className="h-6 w-6" />, color: 'pastel-mint', change: '+23.1%' },
    { label: 'Growth Rate', value: '18.5%', icon: <TrendingUp className="h-6 w-6" />, color: 'pastel-coral', change: '+5.4%' }
  ];

  const getColorClasses = (colorKey) => {
    switch (colorKey) {
      case 'pastel-purple':
        return 'bg-pastel-purple/20 text-pastel-purple';
      case 'pastel-blue':
        return 'bg-pastel-blue/20 text-pastel-blue';
      case 'pastel-mint':
        return 'bg-pastel-mint/20 text-pastel-mint';
      case 'pastel-coral':
        return 'bg-pastel-coral/20 text-pastel-coral';
      default:
        return 'bg-pastel-purple/20 text-pastel-purple';
    }
  };

  const revenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 68000 }
  ];

  const userGrowthData = [
    { month: 'Jan', freelancers: 120, clients: 80 },
    { month: 'Feb', freelancers: 150, clients: 95 },
    { month: 'Mar', freelancers: 180, clients: 110 },
    { month: 'Apr', freelancers: 220, clients: 140 },
    { month: 'May', freelancers: 260, clients: 170 },
    { month: 'Jun', freelancers: 310, clients: 200 }
  ];

  const categoryData = [
    { name: 'Web Dev', value: 35 },
    { name: 'Design', value: 25 },
    { name: 'Writing', value: 20 },
    { name: 'Marketing', value: 15 },
    { name: 'Other', value: 5 }
  ];

  const COLORS = ['#E0BBE4', '#AEC6CF', '#B4E7CE', '#FFB6C1', '#FFFACD'];

  const recentActivity = [
    { id: 1, type: 'New User', user: 'John Doe', action: 'Registered as Freelancer', time: '5 min ago', icon: '👤' },
    { id: 2, type: 'Job Posted', user: 'TechCorp Inc.', action: 'Posted "Full Stack Developer"', time: '15 min ago', icon: '💼' },
    { id: 3, type: 'Payment', user: 'Sarah Smith', action: 'Received payment ₹3000', time: '1 hour ago', icon: '💰' },
    { id: 4, type: 'Review', user: 'Mike Johnson', action: 'Received 5-star rating', time: '2 hours ago', icon: '⭐' }
  ];

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-pastel-purple to-pastel-pink bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(stat.color)}`}>
                  {stat.icon}
                </div>
                <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Revenue Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#B4E7CE"
                  strokeWidth={3}
                  dot={{ fill: '#B4E7CE', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* User Growth Chart */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">User Growth</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar dataKey="freelancers" fill="#E0BBE4" />
                <Bar dataKey="clients" fill="#AEC6CF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Category Distribution */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Job Categories</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Stats */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-3">
                <UserCheck className="h-8 w-8 text-pastel-mint" />
                <div>
                  <div className="text-2xl font-bold text-gray-800">8,450</div>
                  <div className="text-sm text-gray-600">Active Freelancers</div>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Users className="h-8 w-8 text-pastel-blue" />
                <div>
                  <div className="text-2xl font-bold text-gray-800">6,970</div>
                  <div className="text-sm text-gray-600">Active Clients</div>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Briefcase className="h-8 w-8 text-pastel-purple" />
                <div>
                  <div className="text-2xl font-bold text-gray-800">5,234</div>
                  <div className="text-sm text-gray-600">Completed Jobs</div>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-3">
                <AlertTriangle className="h-8 w-8 text-pastel-coral" />
                <div>
                  <div className="text-2xl font-bold text-gray-800">12</div>
                  <div className="text-sm text-gray-600">Open Disputes</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-4 bg-pastel-blue/5 rounded-lg hover:bg-pastel-blue/10 transition">
                <div className="text-3xl">{activity.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-gray-800">{activity.user}</span>
                    <span className="px-2 py-1 bg-pastel-purple/20 text-pastel-purple rounded text-xs">
                      {activity.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
                <div className="text-sm text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
