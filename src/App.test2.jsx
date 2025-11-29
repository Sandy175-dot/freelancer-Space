import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './components/UI/Toast';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// Public Pages
import Home from './pages/Home';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import PublicBrowseJobs from './pages/BrowseJobs';
import JobDetail from './pages/JobDetail';
import BrowseFreelancers from './pages/BrowseFreelancers';
import About from './pages/About';
import Help from './pages/Help';

// Auth Pages
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ForgotPassword from './pages/Auth/ForgotPassword';

// Freelancer Pages
import FreelancerDashboard from './pages/Freelancer/Dashboard';
import JobSearch from './pages/Freelancer/JobSearch';
import MyGigs from './pages/Freelancer/MyGigs';
import FreelancerProfile from './pages/Freelancer/Profile';
import Earnings from './pages/Freelancer/Earnings';
import FreelancerMessages from './pages/Freelancer/Messages';
import BrowseJobs from './pages/Freelancer/BrowseJobs';
import MyBids from './pages/Freelancer/MyBids';

// Client Pages
import ClientDashboard from './pages/Client/Dashboard';
import PostJob from './pages/Client/PostJob';
import PostProject from './pages/Client/PostProject';
import Payment from './pages/Client/Payment';
import MyJobs from './pages/Client/MyJobs';

// Project Pages
import ProjectDetail from './pages/ProjectDetail';
import HireConfirmation from './pages/HireConfirmation';
import ProjectWorkspace from './pages/ProjectWorkspace';

// Admin Pages
import AdminDashboard from './pages/Admin/Dashboard';
import UserManagement from './pages/Admin/UserManagement';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pastel-purple"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Landing />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/browse-jobs" element={<PublicBrowseJobs />} />
                  <Route path="/job/:id" element={<JobDetail />} />
                  <Route path="/browse-freelancers" element={<BrowseFreelancers />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/help" element={<Help />} />
                  
                  {/* Auth Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  
                  {/* Dashboard Route */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  
                  {/* Freelancer Routes */}
                  <Route path="/freelancer/dashboard" element={<ProtectedRoute allowedRoles={['freelancer']}><FreelancerDashboard /></ProtectedRoute>} />
                  <Route path="/freelancer/job-search" element={<ProtectedRoute allowedRoles={['freelancer']}><JobSearch /></ProtectedRoute>} />
                  <Route path="/freelancer/my-gigs" element={<ProtectedRoute allowedRoles={['freelancer']}><MyGigs /></ProtectedRoute>} />
                  <Route path="/freelancer/profile" element={<ProtectedRoute allowedRoles={['freelancer']}><FreelancerProfile /></ProtectedRoute>} />
                  <Route path="/freelancer/earnings" element={<ProtectedRoute allowedRoles={['freelancer']}><Earnings /></ProtectedRoute>} />
                  <Route path="/freelancer/messages" element={<ProtectedRoute allowedRoles={['freelancer']}><FreelancerMessages /></ProtectedRoute>} />
                  <Route path="/freelancer/browse-jobs" element={<ProtectedRoute allowedRoles={['freelancer']}><BrowseJobs /></ProtectedRoute>} />
                  <Route path="/freelancer/my-bids" element={<ProtectedRoute allowedRoles={['freelancer']}><MyBids /></ProtectedRoute>} />
                  
                  {/* Client Routes */}
                  <Route path="/client/dashboard" element={<ProtectedRoute allowedRoles={['client']}><ClientDashboard /></ProtectedRoute>} />
                  <Route path="/client/post-job" element={<ProtectedRoute allowedRoles={['client']}><PostJob /></ProtectedRoute>} />
                  <Route path="/client/post-project" element={<ProtectedRoute allowedRoles={['client']}><PostProject /></ProtectedRoute>} />
                  <Route path="/client/payment" element={<ProtectedRoute allowedRoles={['client']}><Payment /></ProtectedRoute>} />
                  <Route path="/client/my-jobs" element={<ProtectedRoute allowedRoles={['client']}><MyJobs /></ProtectedRoute>} />
                  
                  {/* Project Routes */}
                  <Route path="/project/:id" element={<ProjectDetail />} />
                  <Route path="/project/:id/hire" element={<ProtectedRoute allowedRoles={['client']}><HireConfirmation /></ProtectedRoute>} />
                  <Route path="/payment/:id" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
                  <Route path="/project/:id/workspace" element={<ProtectedRoute><ProjectWorkspace /></ProtectedRoute>} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard />
                </Routes>
              </main>
              <Footer />
            </div>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
