import { useState } from 'react';
import { Search, Filter, MoreVertical, Ban, CheckCircle, Mail, Eye } from 'lucide-react';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'freelancer',
      status: 'active',
      avatar: '👨‍💻',
      joinDate: '2024-01-15',
      projects: 45,
      earnings: '₹12,450',
      rating: 4.9
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah.smith@example.com',
      role: 'client',
      status: 'active',
      avatar: '👩‍💼',
      joinDate: '2024-02-20',
      projects: 12,
      spent: '₹18,200',
      rating: 4.8
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.j@example.com',
      role: 'freelancer',
      status: 'suspended',
      avatar: '👨‍🎨',
      joinDate: '2023-11-10',
      projects: 28,
      earnings: '₹8,900',
      rating: 4.6
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      role: 'freelancer',
      status: 'active',
      avatar: '👩‍💻',
      joinDate: '2024-03-05',
      projects: 67,
      earnings: '₹24,100',
      rating: 5.0
    },
    {
      id: 5,
      name: 'Alex Rodriguez',
      email: 'alex.r@example.com',
      role: 'client',
      status: 'active',
      avatar: '👨‍💼',
      joinDate: '2024-01-28',
      projects: 8,
      spent: '₹9,500',
      rating: 4.7
    },
    {
      id: 6,
      name: 'Lisa Wang',
      email: 'lisa.wang@example.com',
      role: 'freelancer',
      status: 'inactive',
      avatar: '👩‍🎨',
      joinDate: '2023-08-15',
      projects: 12,
      earnings: '₹5,200',
      rating: 4.5
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAction = (userId, action) => {
    alert(`${action} action performed for user ${userId}`);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-pastel-purple to-pastel-pink bg-clip-text text-transparent">
          User Management
        </h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-pastel-purple mb-1">15,420</div>
            <div className="text-gray-600 text-sm">Total Users</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-pastel-blue mb-1">8,450</div>
            <div className="text-gray-600 text-sm">Freelancers</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-pastel-mint mb-1">6,970</div>
            <div className="text-gray-600 text-sm">Clients</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-pastel-coral mb-1">45</div>
            <div className="text-gray-600 text-sm">Suspended</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
              />
            </div>
            
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="freelancer">Freelancers</option>
              <option value="client">Clients</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-pastel-purple/10">
                <tr>
                  <th className="text-left py-4 px-6 text-gray-700 font-semibold">User</th>
                  <th className="text-left py-4 px-6 text-gray-700 font-semibold">Role</th>
                  <th className="text-left py-4 px-6 text-gray-700 font-semibold">Status</th>
                  <th className="text-left py-4 px-6 text-gray-700 font-semibold">Projects</th>
                  <th className="text-left py-4 px-6 text-gray-700 font-semibold">Revenue</th>
                  <th className="text-left py-4 px-6 text-gray-700 font-semibold">Rating</th>
                  <th className="text-left py-4 px-6 text-gray-700 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-pastel-blue/5">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{user.avatar}</div>
                        <div>
                          <div className="font-semibold text-gray-800">{user.name}</div>
                          <div className="text-sm text-gray-600">{user.email}</div>
                          <div className="text-xs text-gray-500">Joined {user.joinDate}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'freelancer'
                          ? 'bg-pastel-purple/20 text-purple-700'
                          : 'bg-pastel-blue/20 text-blue-700'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === 'active'
                          ? 'bg-pastel-mint/30 text-green-700'
                          : user.status === 'suspended'
                          ? 'bg-pastel-coral/30 text-red-700'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-700">{user.projects}</td>
                    <td className="py-4 px-6 font-semibold text-pastel-mint">
                      {user.role === 'freelancer' ? user.earnings : user.spent}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-semibold text-gray-700">{user.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleAction(user.id, 'View')}
                          className="p-2 hover:bg-pastel-blue/20 rounded-lg transition"
                          title="View Profile"
                        >
                          <Eye className="h-4 w-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleAction(user.id, 'Message')}
                          className="p-2 hover:bg-pastel-blue/20 rounded-lg transition"
                          title="Send Message"
                        >
                          <Mail className="h-4 w-4 text-gray-600" />
                        </button>
                        {user.status === 'active' ? (
                          <button
                            onClick={() => handleAction(user.id, 'Suspend')}
                            className="p-2 hover:bg-pastel-coral/20 rounded-lg transition"
                            title="Suspend User"
                          >
                            <Ban className="h-4 w-4 text-red-600" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAction(user.id, 'Activate')}
                            className="p-2 hover:bg-pastel-mint/20 rounded-lg transition"
                            title="Activate User"
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </button>
                        )}
                        <button className="p-2 hover:bg-pastel-blue/20 rounded-lg transition">
                          <MoreVertical className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No users found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
