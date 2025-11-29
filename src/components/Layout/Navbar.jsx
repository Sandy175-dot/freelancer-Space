import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, User, LogOut, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
      className="glass-premium fixed top-0 left-0 right-0 z-50 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6 xl:space-x-8 flex-shrink-0">
            <motion.div 
              whileHover={{ y: -3, scale: 1.05 }} 
              transition={{ duration: 0.3 }}
            >
              <Link to="/browse-jobs" className="relative text-lg font-semibold text-white/90 hover:text-white whitespace-nowrap group">
                <span className="relative z-10">Jobs</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl -z-10 opacity-0 group-hover:opacity-100"
                  initial={false}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
            <motion.div 
              whileHover={{ y: -3, scale: 1.05 }} 
              transition={{ duration: 0.3 }}
            >
              <Link to="/browse-freelancers" className="relative text-lg font-semibold text-white/90 hover:text-white whitespace-nowrap group">
                <span className="relative z-10">Talent</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl -z-10 opacity-0 group-hover:opacity-100"
                  initial={false}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>

            {/* Post Job Button for Clients */}
            {user && user.role === 'client' && (
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }} 
                whileTap={{ scale: 0.95 }}
                className="ml-4"
              >
                <Link
                  to="/client/post-job"
                  className="btn-premium text-white font-bold whitespace-nowrap flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Post a Job
                </Link>
              </motion.div>
            )}

            {user ? (
              <div className="flex items-center space-x-3 ml-4">
                <motion.div 
                  whileHover={{ scale: 1.05, y: -2 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={
                      user.role === 'admin'
                        ? '/admin'
                        : user.role === 'freelancer'
                        ? '/freelancer/dashboard'
                        : '/client/dashboard'
                    }
                    className="flex items-center space-x-2 px-4 py-2 glass-light hover:glass-medium rounded-2xl text-white/90 hover:text-white transition-all duration-300"
                    title="Dashboard"
                  >
                    <User className="h-5 w-5" />
                    <span className="hidden xl:inline font-semibold">Dashboard</span>
                  </Link>
                </motion.div>
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 glass-light hover:glass-medium rounded-2xl text-white/90 hover:text-white transition-all duration-300"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden xl:inline font-semibold">Logout</span>
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 flex-shrink-0 ml-4">
                <motion.div 
                  className="hidden xl:block" 
                  whileHover={{ y: -2, scale: 1.05 }} 
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to="/login"
                    className="px-4 py-2 text-white/90 hover:text-white transition-colors font-semibold"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/signup"
                    className="btn-premium text-white font-bold whitespace-nowrap flex items-center gap-2"
                  >
                    <span>Sign Up</span>
                    <Sparkles className="w-5 h-5" />
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-2xl glass-light hover:glass-medium text-white/80 hover:text-white transition-all duration-300"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass-premium border-t border-white/10"
          >
            <div className="px-6 pt-4 pb-6 space-y-3">
              <motion.div
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to="/browse-jobs"
                  className="block px-4 py-3 rounded-2xl glass-light hover:glass-medium text-white/90 hover:text-white font-semibold transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Browse Jobs
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to="/browse-freelancers"
                  className="block px-4 py-3 rounded-2xl glass-light hover:glass-medium text-white/90 hover:text-white font-semibold transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Browse Freelancers
                </Link>
              </motion.div>
              {user ? (
                <>
                  {user.role === 'client' && (
                    <motion.div
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        to="/client/post-job"
                        className="block px-4 py-3 rounded-2xl btn-premium text-white font-bold"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Post a Job
                      </Link>
                    </motion.div>
                  )}
                  <motion.div
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={
                        user.role === 'admin'
                          ? '/admin'
                          : user.role === 'freelancer'
                          ? '/freelancer/dashboard'
                          : '/client/dashboard'
                      }
                      className="block px-4 py-3 rounded-2xl glass-light hover:glass-medium text-white/90 hover:text-white font-semibold transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </motion.div>
                  <motion.button
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-2xl glass-light hover:glass-medium text-white/90 hover:text-white font-semibold transition-all duration-300"
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.div
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to="/login"
                      className="block px-4 py-3 rounded-2xl glass-light hover:glass-medium text-white/90 hover:text-white font-semibold transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to="/signup"
                      className="block px-4 py-3 rounded-2xl btn-premium text-white font-bold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
