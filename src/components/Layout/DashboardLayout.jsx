import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  MessageSquare, 
  Settings, 
  Search,
  Bell,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Avatar from '../UI/Avatar';
import Button from '../UI/Button';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const sidebarItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      href: user?.role === 'client' ? '/client/dashboard' : '/freelancer/dashboard' 
    },
    { 
      icon: Briefcase, 
      label: user?.role === 'client' ? 'My Projects' : 'Browse Jobs', 
      href: user?.role === 'client' ? '/client/my-jobs' : '/browse-jobs' 
    },
    { 
      icon: Users, 
      label: user?.role === 'client' ? 'Freelancers' : 'My Bids', 
      href: user?.role === 'client' ? '/browse-freelancers' : '/freelancer/my-bids' 
    },
    { 
      icon: MessageSquare, 
      label: 'Messages', 
      href: '/messages' 
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      href: '/settings' 
    }
  ];

  return (
    <div className="min-h-screen bg-[#0d0f17] flex">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed lg:static inset-y-0 left-0 z-50 w-70 bg-[#151820] border-r border-white/10 lg:translate-x-0"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#ff007f] to-[#00c6ff] rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">FreelanceHub</span>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={index}
                  to={item.href}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-[#ff007f]/20 to-[#ff4da6]/20 text-white border border-[#ff007f]/30' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar 
                name={user?.name || 'User'} 
                size="lg" 
                verified={user?.verified}
                online={true}
              />
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{user?.name || 'User'}</p>
                <p className="text-white/60 text-sm capitalize">{user?.role || 'User'}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start text-white/70 hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-[#151820] border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2"
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              {/* Search Bar */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="input-field pl-10 pr-4 py-2 w-80"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative p-2">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#ff007f] rounded-full"></span>
              </Button>

              {/* Profile */}
              <Avatar 
                name={user?.name || 'User'} 
                size="md" 
                verified={user?.verified}
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;