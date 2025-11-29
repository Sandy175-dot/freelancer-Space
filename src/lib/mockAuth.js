// Mock Authentication System
import { mockAPI } from './mockData';

class MockAuth {
  constructor() {
    this.listeners = [];
  }

  // Sign up
  async signUp(email, password, userData = {}) {
    try {
      // Check if user already exists
      const existingUser = mockAPI.getUserByEmail(email);
      if (existingUser) {
        return {
          success: false,
          error: 'User already exists with this email'
        };
      }

      // Create new user
      const user = mockAPI.createUser({
        email,
        password, // In real app, this would be hashed
        ...userData,
        role: userData.role || 'freelancer'
      });

      // Set as current user
      mockAPI.setCurrentUser(user);
      this.notifyListeners(user);

      return {
        success: true,
        user
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Sign in
  async signIn(email, password) {
    try {
      let user = mockAPI.getUserByEmail(email);
      
      // Auto-create demo accounts if they don't exist
      if (!user && (email === 'freelancer@demo.com' || email === 'client@demo.com')) {
        const role = email.includes('freelancer') ? 'freelancer' : 'client';
        const name = role === 'freelancer' ? 'Demo Freelancer' : 'Demo Client';
        
        user = mockAPI.createUser({
          email,
          password,
          role,
          full_name: name,
          name: name
        });
      }
      
      if (!user) {
        return {
          success: false,
          error: 'User not found. Please sign up first.'
        };
      }

      if (user.password !== password) {
        return {
          success: false,
          error: 'Invalid password'
        };
      }

      // Set as current user
      mockAPI.setCurrentUser(user);
      this.notifyListeners(user);

      return {
        success: true,
        user
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Sign out
  async signOut() {
    try {
      mockAPI.logout();
      this.notifyListeners(null);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get current user
  getCurrentUser() {
    return mockAPI.getCurrentUser();
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getCurrentUser();
  }

  // Subscribe to auth changes
  onAuthStateChange(callback) {
    this.listeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  // Notify all listeners
  notifyListeners(user) {
    this.listeners.forEach(callback => {
      callback(user);
    });
  }

  // Update user profile
  async updateProfile(updates) {
    try {
      const currentUser = this.getCurrentUser();
      if (!currentUser) {
        return {
          success: false,
          error: 'No user logged in'
        };
      }

      const updatedUser = {
        ...currentUser,
        ...updates
      };

      mockAPI.setCurrentUser(updatedUser);
      this.notifyListeners(updatedUser);

      return {
        success: true,
        user: updatedUser
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Reset password (mock)
  async resetPassword(email) {
    try {
      const user = mockAPI.getUserByEmail(email);
      if (!user) {
        return {
          success: false,
          error: 'User not found'
        };
      }

      // In a real app, this would send an email
      console.log(`Password reset email sent to ${email}`);
      
      return {
        success: true,
        message: 'Password reset email sent'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export const mockAuth = new MockAuth();
