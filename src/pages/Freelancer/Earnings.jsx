import { useState } from 'react';
import { DollarSign, TrendingUp, Download, Calendar, CreditCard, ArrowUpRight, Clock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Earnings = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const earningsData = [
    { month: 'Jan', earnings: 2400 },
    { month: 'Feb', earnings: 1398 },
    { month: 'Mar', earnings: 4800 },
    { month: 'Apr', earnings: 3908 },
    { month: 'May', earnings: 4800 },
    { month: 'Jun', earnings: 3800 }
  ];

  const transactions = [
    {
      id: 1,
      project: 'E-commerce Website',
      client: 'TechCorp Inc.',
      amount: '₹3000',
      date: '2025-01-15',
      status: 'Completed'
    },
    {
      id: 2,
      project: 'Mobile App Design',
      client: 'StartupXYZ',
      amount: '₹2000',
      date: '2025-01-10',
      status: 'Completed'
    },
    {
      id: 3,
      project: 'Blog Content Writing',
      client: 'Marketing Pro',
      amount: '₹500',
      date: '2025-01-05',
      status: 'Pending'
    },
    {
      id: 4,
      project: 'WordPress Setup',
      client: 'Small Business LLC',
      amount: '₹800',
      date: '2024-12-28',
      status: 'Completed'
    }
  ];

  const stats = [
    { 
      label: 'Available Balance',
      value: '₹4,250',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'pastel-mint',
      change: '+12.5%'
    },
    {
      label: 'Pending Clearance',
      value: '₹1,800',
      icon: <Clock className="h-6 w-6" />,
      color: 'pastel-yellow',
      change: '+5.2%'
    },
    {
      label: 'This Month',
      value: '₹12,450',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'pastel-purple',
      change: '+23.1%'
    },
    {
      label: 'Total Earned',
      value: '₹68,920',
      icon: <ArrowUpRight className="h-6 w-6" />,
      color: 'pastel-coral',
      change: '+8.4%'
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pastel-purple to-pastel-pink bg-clip-text text-transparent">
              Earnings & Withdrawals
            </h1>
            <p className="text-gray-600 mt-2">Track your income and manage withdrawals</p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-pastel-purple to-pastel-pink text-white rounded-lg hover:shadow-lg transition flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Withdraw Funds</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-12 h-12 rounded-lg bg-${stat.color}/20 flex items-center justify-center text-${stat.color}`}>
                  {stat.icon}
                </div>
                <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Earnings Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Earnings Overview</h2>
            <div className="flex gap-2">
              {['week', 'month', 'year'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg text-sm transition ${
                    selectedPeriod === period
                      ? 'bg-pastel-purple text-white'
                      : 'bg-pastel-blue/20 text-gray-700 hover:bg-pastel-blue/30'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={earningsData}>
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
                dataKey="earnings"
                stroke="#E0BBE4"
                strokeWidth={3}
                dot={{ fill: '#E0BBE4', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Withdrawal Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition cursor-pointer">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-pastel-blue/20 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-pastel-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Bank Transfer</h3>
                <p className="text-sm text-gray-600">2-3 business days</p>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-pastel-blue/20 text-gray-700 rounded-lg hover:bg-pastel-blue/30 transition">
              Setup
            </button>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition cursor-pointer">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-pastel-mint/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💳</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">PayPal</h3>
                <p className="text-sm text-gray-600">Instant transfer</p>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-pastel-mint/20 text-gray-700 rounded-lg hover:bg-pastel-mint/30 transition">
              Connected
            </button>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition cursor-pointer">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-pastel-purple/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🪙</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Crypto</h3>
                <p className="text-sm text-gray-600">Fast & secure</p>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-pastel-purple/20 text-gray-700 rounded-lg hover:bg-pastel-purple/30 transition">
              Setup
            </button>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Transaction History</h2>
            <button className="text-pastel-purple hover:text-pastel-pink flex items-center space-x-1">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Project</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Client</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Amount</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-pastel-blue/5">
                    <td className="py-4 px-4 font-medium text-gray-800">{transaction.project}</td>
                    <td className="py-4 px-4 text-gray-600">{transaction.client}</td>
                    <td className="py-4 px-4 font-semibold text-pastel-mint">{transaction.amount}</td>
                    <td className="py-4 px-4 text-gray-600">{transaction.date}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        transaction.status === 'Completed'
                          ? 'bg-pastel-mint/30 text-green-700'
                          : 'bg-pastel-yellow/30 text-yellow-700'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
