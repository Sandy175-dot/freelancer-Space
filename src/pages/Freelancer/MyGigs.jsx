import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, DollarSign, Clock, Star } from 'lucide-react';

const MyGigs = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [gigForm, setGigForm] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    deliveryTime: '',
    skills: []
  });

  const gigs = [
    {
      id: 1,
      title: 'Professional React Web Development',
      category: 'Web Development',
      price: '₹500',
      deliveryTime: '7 days',
      rating: 4.9,
      reviews: 45,
      orders: 68,
      status: 'Active',
      description: 'I will create a professional React website for your business'
    },
    {
      id: 2,
      title: 'Modern UI/UX Design',
      category: 'Design',
      price: '₹300',
      deliveryTime: '5 days',
      rating: 5.0,
      reviews: 32,
      orders: 89,
      status: 'Active',
      description: 'I will design a modern and user-friendly interface for your app'
    },
    {
      id: 3,
      title: 'SEO Content Writing',
      category: 'Writing',
      price: '₹150',
      deliveryTime: '3 days',
      rating: 4.8,
      reviews: 56,
      orders: 123,
      status: 'Paused',
      description: 'I will write SEO-optimized content for your website or blog'
    }
  ];

  const handleCreateGig = () => {
    // Handle gig creation
    alert('Gig created successfully!');
    setShowCreateModal(false);
    setGigForm({
      title: '',
      category: '',
      description: '',
      price: '',
      deliveryTime: '',
      skills: []
    });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pastel-purple to-pastel-pink bg-clip-text text-transparent">
              My Gigs
            </h1>
            <p className="text-gray-600 mt-2">Manage your service offerings</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-pastel-purple to-pastel-pink text-white rounded-lg hover:shadow-lg transition flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Create New Gig</span>
          </button>
        </div>

        {/* Gig Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-pastel-purple mb-1">{gigs.length}</div>
            <div className="text-gray-600 text-sm">Active Gigs</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-pastel-mint mb-1">280</div>
            <div className="text-gray-600 text-sm">Total Orders</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-pastel-yellow mb-1">4.9</div>
            <div className="text-gray-600 text-sm">Average Rating</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-pastel-coral mb-1">₹42K</div>
            <div className="text-gray-600 text-sm">Total Earned</div>
          </div>
        </div>

        {/* Gigs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map((gig) => (
            <div
              key={gig.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <div className="h-40 bg-gradient-to-br from-pastel-purple/30 to-pastel-pink/30 flex items-center justify-center">
                <span className="text-6xl">📦</span>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 bg-pastel-blue/20 text-gray-700 rounded-full text-xs">
                    {gig.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    gig.status === 'Active' 
                      ? 'bg-pastel-mint/30 text-green-700'
                      : 'bg-pastel-coral/30 text-orange-700'
                  }`}>
                    {gig.status}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {gig.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {gig.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center space-x-1 text-gray-600">
                      <DollarSign className="h-4 w-4" />
                      <span>Starting at {gig.price}</span>
                    </span>
                    <span className="flex items-center space-x-1 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{gig.deliveryTime}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center space-x-1 text-gray-600">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{gig.rating} ({gig.reviews})</span>
                    </span>
                    <span className="text-gray-600">{gig.orders} orders</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-pastel-blue/20 text-gray-700 rounded-lg hover:bg-pastel-blue/30 transition flex items-center justify-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">View</span>
                  </button>
                  <button className="flex-1 px-4 py-2 bg-pastel-mint/20 text-gray-700 rounded-lg hover:bg-pastel-mint/30 transition flex items-center justify-center space-x-1">
                    <Edit className="h-4 w-4" />
                    <span className="text-sm">Edit</span>
                  </button>
                  <button className="px-4 py-2 bg-pastel-coral/20 text-red-700 rounded-lg hover:bg-pastel-coral/30 transition">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Gig Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Gig</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gig Title
                  </label>
                  <input
                    type="text"
                    value={gigForm.title}
                    onChange={(e) => setGigForm({ ...gigForm, title: e.target.value })}
                    placeholder="I will..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={gigForm.category}
                    onChange={(e) => setGigForm({ ...gigForm, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Development">Mobile Development</option>
                    <option value="Design">Design</option>
                    <option value="Writing">Writing</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={gigForm.description}
                    onChange={(e) => setGigForm({ ...gigForm, description: e.target.value })}
                    placeholder="Describe your service..."
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      value={gigForm.price}
                      onChange={(e) => setGigForm({ ...gigForm, price: e.target.value })}
                      placeholder="100"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Time (days)
                    </label>
                    <input
                      type="number"
                      value={gigForm.deliveryTime}
                      onChange={(e) => setGigForm({ ...gigForm, deliveryTime: e.target.value })}
                      placeholder="7"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleCreateGig}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-pastel-purple to-pastel-pink text-white rounded-lg hover:shadow-lg transition"
                  >
                    Create Gig
                  </button>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGigs;
