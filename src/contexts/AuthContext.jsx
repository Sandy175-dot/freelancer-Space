import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user in localStorage
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const result = await authAPI.login(email, password);
      if (result.success && result.user) {
        setUser(result.user);
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        return { success: true, role: result.user.role };
      }
      return { success: false, error: result.error || 'Login failed' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (email, password, fullName, role = 'freelancer') => {
    try {
      const result = await authAPI.register(email, password, fullName, role);
      if (result.success && result.user) {
        setUser(result.user);
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        return { success: true, data: { user: result.user } };
      }
      return { success: false, error: result.error || 'Registration failed' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signInWithProvider = async (provider) => {
    alert(`OAuth with ${provider} is not implemented yet. Use email/password instead.`);
    return { success: false, error: 'OAuth not available' };
  };

  const logout = async () => {
    authAPI.logout();
    setUser(null);
  };

  const resetPassword = async (email) => {
    // Not implemented yet
    return { success: false, error: 'Password reset not implemented yet' };
  };

  const resendVerification = async (email) => {
    // Not implemented yet
    return { success: false, error: 'Email verification not implemented yet' };
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      signup, 
      resetPassword, 
      resendVerification, 
      signInWithProvider, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
