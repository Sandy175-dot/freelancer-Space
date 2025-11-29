import { useState, useEffect } from 'react';
import { Search, Star, MapPin, DollarSign, Briefcase, TrendingUp, Users, ChevronDown, SlidersHorizontal, BarChart3, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { usersAPI } from '../services/api';

const BrowseFreelancers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRate, setSelectedRate] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const skills = ['All', 'Web Development', 'Mobile Development', 'Design', 'Writing', 'Marketing', 'Video Editing'];
  
  const rateRanges = [
    { value: 'all', label: 'All Rates' },
    { value: 'under-30', label: 'Under ₹30/hr' },
    { value: '30-50', label: '₹30 - ₹50/hr' },
    { value: '50-75', label: '₹50 - ₹75/hr' },
    { value: 'above-75', label: 'Above ₹75/hr' }
  ];
  
  const availabilityOptions = [
    { value: 'all', label: 'All' },
    { value: 'available', label: 'Available' },
    { value: 'busy', label: 'Busy' }
  ];

  // Fetch freelancers from API
  useEffect(() => {
    fetchFreelancers();
  }, []);

  const fetchFreelancers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await usersAPI.getFreelancers();
      const freelancersData = result.data || [];
      
      const normalized = freelancersData.map((freelancer) => ({
        ...freelancer,
        title: freelancer.bio?.split('.')[0] || 'Freelancer',
        avatar: freelancer.avatar || '👤',
        hourlyRate: freelancer.hourly_rate ? `₹${freelancer.hourly_rate}/hr` : 'Negotiable',
        skills: Array.isArray(freelancer.skills) ? freelancer.skills : [],
        description: freelancer.bio || 'Professional freelancer',
      }));

      setFreelancers(normalized);
    } catch (err) {
      console.error('Error fetching freelancers:', err);
      setError('Failed to load freelancers. Please try again.');
      setFreelancers([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredFreelancers = freelancers.filter(freelancer => {
    const matchesSearch = freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         freelancer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         freelancer.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = selectedSkill === 'all' || 
                        freelancer.skills.some(skill => 
                          skill.toLowerCase().includes(selectedSkill.toLowerCase())
                        );
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gradient-secondary mb-2">
            Browse Talent
          </h1>
          <p className="text-white/70 text-lg">
            Discover skilled freelancers ready to bring your projects to life
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-premium rounded-2xl p-6 mb-8"
        >
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-white/60" />
              <input
                type="text"
                placeholder="Search freelancers by name, skills, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 glass-light border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/50 transition-all"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-4 glass-light border border-white/20 rounded-xl text-white hover:glass-medium transition-all flex items-center gap-2"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </motion.button>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10"
              >
                {/* Skills Filter */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Skills</label>
                  <select
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    className="w-full px-4 py-3 glass-light border border-white/20 rounded-xl text-white bg-transparent focus:ring-2 focus:ring-indigo-500/50"
                  >
                    {skills.map(skill => (
                      <option key={skill} value={skill.toLowerCase()} className="bg-slate-800">
                        {skill}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rate Filter */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Hourly Rate</label>
                  <select
                    value={selectedRate}
                    onChange={(e) => setSelectedRate(e.target.value)}
                    className="w-full px-4 py-3 glass-light border border-white/20 rounded-xl text-white bg-transparent focus:ring-2 focus:ring-indigo-500/50"
                  >
                    {rateRanges.map(range => (
                      <option key={range.value} value={range.value} className="bg-slate-800">
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Availability Filter */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Availability</label>
                  <select
                    value={selectedAvailability}
                    onChange={(e) => setSelectedAvailability(e.target.value)}
                    className="w-full px-4 py-3 glass-light border border-white/20 rounded-xl text-white bg-transparent focus:ring-2 focus:ring-indigo-500/50"
                  >
                    {availabilityOptions.map(option => (
                      <option key={option.value} value={option.value} className="bg-slate-800">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            {/* Talent Statistics */}
            <div className="glass-premium rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Talent Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Total Freelancers</span>
                  <span className="text-white font-semibold">{freelancers.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Available Now</span>
                  <span className="text-green-400 font-semibold">
                    {freelancers.filter(f => f.availability === 'Available').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Avg Rating</span>
                  <span className="text-white font-semibold">4.8 ⭐</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Success Rate</span>
                  <span className="text-blue-400 font-semibold">96%</span>
                </div>
              </div>
            </div>

            {/* Top Skills */}
            <div className="glass-premium rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Top Skills
              </h3>
              <div className="space-y-3">
                {['Web Development', 'Mobile Development', 'Design', 'Writing', 'Marketing'].map((skill, index) => (
                  <motion.button
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    onClick={() => setSelectedSkill(skill.toLowerCase())}
                    className="w-full text-left px-4 py-3 glass-light hover:glass-medium rounded-xl transition-all flex items-center justify-between group"
                  >
                    <span className="text-white/80 group-hover:text-white">{skill}</span>
                    <span className="text-white/60 text-sm">{Math.floor(Math.random() * 30) + 10}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Freelancer Cards */}
          <div className="lg:col-span-3">

            {/* Results Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-between mb-6"
            >
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-white">
                  {filteredFreelancers.length} Freelancers Found
                </h2>
                {selectedSkill !== 'all' && (
                  <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-medium border border-indigo-500/30">
                    {selectedSkill}
                  </span>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 glass-light hover:glass-medium rounded-xl text-white/80 hover:text-white transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </motion.button>
            </motion.div>

            {/* Freelancer Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {loading ? (
                Array(6).fill(0).map((_, i) => (
                  <div key={i} className="glass-premium rounded-2xl p-6 animate-pulse">
                    <div className="h-48 bg-white/10 rounded-lg"></div>
                  </div>
                ))
              ) : filteredFreelancers.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-2 text-center py-16"
                >
                  <div className="w-24 h-24 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-12 h-12 text-white/40" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">No Freelancers Found</h3>
                  <p className="text-white/60 mb-6">
                    {error || 'Try adjusting your search criteria or filters'}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedSkill('all');
                      setSelectedRate('all');
                      setSelectedAvailability('all');
                      fetchFreelancers();
                    }}
                    className="px-6 py-3 btn-premium text-white font-semibold rounded-xl"
                  >
                    Clear Filters
                  </motion.button>
                </motion.div>
              ) : (
                filteredFreelancers.map((freelancer, index) => (
                <motion.div
                  key={freelancer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass-premium rounded-2xl p-6 hover:shadow-2xl transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-5xl">{freelancer.avatar}</div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{freelancer.name}</h3>
                        <p className="text-white/70 text-sm">{freelancer.title}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      freelancer.availability === 'Available' 
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                    }`}>
                      {freelancer.availability}
                    </span>
                  </div>

                  <p className="text-white/70 text-sm mb-4 line-clamp-2">{freelancer.description}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center space-x-2 text-white/70 text-sm">
                      <MapPin className="h-4 w-4 text-blue-400" />
                      <span>{freelancer.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/70 text-sm">
                      <DollarSign className="h-4 w-4 text-green-400" />
                      <span>{freelancer.hourlyRate}/hr</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/70 text-sm">
                      <Briefcase className="h-4 w-4 text-purple-400" />
                      <span>{freelancer.completedJobs} jobs</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/70 text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{freelancer.rating} ({freelancer.reviews})</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {freelancer.skills.slice(0, 4).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 glass-light text-white/80 rounded-lg text-xs font-medium border border-white/10"
                      >
                        {skill}
                      </span>
                    ))}
                    {freelancer.skills.length > 4 && (
                      <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-lg text-xs font-medium border border-indigo-500/30">
                        +{freelancer.skills.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/freelancer/${freelancer.id}`}
                      className="flex-1 text-center px-4 py-3 btn-premium text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                    >
                      View Profile
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-3 glass-light border border-white/20 text-white hover:glass-medium rounded-xl transition-all"
                    >
                      Message
                    </motion.button>
                  </div>
                </motion.div>
                ))
              )}
            </div>

            {/* Removed duplicate empty state - now handled above */}
            {false && filteredFreelancers.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-12 h-12 text-white/40" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No Freelancers Found</h3>
                <p className="text-white/60 mb-6">Try adjusting your search criteria or filters</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSkill('all');
                    setSelectedRate('all');
                    setSelectedAvailability('all');
                  }}
                  className="px-6 py-3 btn-premium text-white font-semibold rounded-xl"
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseFreelancers;

