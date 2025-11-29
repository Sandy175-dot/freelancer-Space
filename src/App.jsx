import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './components/UI/Toast';
import Footer from './components/Layout/Footer';

// Public Pages - Eager load
import Landing from './pages/Landing';
import PublicBrowseJobs from './pages/BrowseJobs';
import JobDetail from './pages/JobDetail';
import BrowseFreelancers from './pages/BrowseFreelancers';
import Solutions from './pages/Solutions';

// Auth Pages - Eager load
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

// Lazy load dashboard pages to avoid import issues
const FreelancerDashboard = lazy(() => import('./pages/Freelancer/Dashboard'));
const ClientDashboard = lazy(() => import('./pages/Client/Dashboard'));
const FreelancerBrowseJobs = lazy(() => import('./pages/Freelancer/BrowseJobs'));
const PostProject = lazy(() => import('./pages/Client/PostProject'));
const PostProjectDetails = lazy(() => import('./pages/Client/PostProjectDetails'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const ProjectWorkspace = lazy(() => import('./pages/ProjectWorkspace'));
const HireConfirmation = lazy(() => import('./pages/HireConfirmation'));
const Payment = lazy(() => import('./pages/Payment'));

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  // Show loading spinner while checking auth state
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
            <Routes>
              {/* Landing page with its own navigation */}
              <Route path="/" element={<Landing />} />
              
              {/* Other routes without navbar */}
              <Route path="*" element={
                <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                  <main className="flex-1">
                    <Routes>
              {/* Public Routes */}
              <Route path="/browse-jobs" element={<PublicBrowseJobs />} />
              <Route path="/job/:id" element={<JobDetail />} />
              <Route path="/browse-freelancers" element={<BrowseFreelancers />} />
              <Route path="/solutions" element={<Solutions />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Freelancer Routes */}
              <Route
                path="/freelancer/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['freelancer']}>
                    <Suspense fallback={<LoadingFallback />}>
                      <FreelancerDashboard />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/freelancer/browse-jobs"
                element={
                  <ProtectedRoute allowedRoles={['freelancer']}>
                    <Suspense fallback={<LoadingFallback />}>
                      <FreelancerBrowseJobs />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              
              {/* Client Routes */}
              <Route
                path="/client/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['client']}>
                    <Suspense fallback={<LoadingFallback />}>
                      <ClientDashboard />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/client/post-project"
                element={
                  <ProtectedRoute allowedRoles={['client']}>
                    <Suspense fallback={<LoadingFallback />}>
                      <PostProject />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/client/post-project/details"
                element={
                  <ProtectedRoute allowedRoles={['client']}>
                    <Suspense fallback={<LoadingFallback />}>
                      <PostProjectDetails />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              
              {/* Project Routes */}
              <Route 
                path="/project/:id" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <ProjectDetail />
                  </Suspense>
                } 
              />
              <Route
                path="/project/:id/hire"
                element={
                  <ProtectedRoute allowedRoles={['client']}>
                    <Suspense fallback={<LoadingFallback />}>
                      <HireConfirmation />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/project/:id/workspace"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <ProjectWorkspace />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment/:id"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <Payment />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              
              {/* 404 Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              } />
            </Routes>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
