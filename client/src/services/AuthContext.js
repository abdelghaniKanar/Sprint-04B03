import React, { createContext, useState, useEffect, useContext } from "react";
import authService from "./authService";

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  // Log in a user
  const login = async (email, password) => {
    const result = await authService.login(email, password);
    if (result.success) {
      setCurrentUser(result.user);
    }
    return result;
  };

  // Register a new user
  const register = async (username, email, password) => {
    const result = await authService.register(username, email, password);
    if (result.success) {
      setCurrentUser(result.user);
    }
    return result;
  };

  // Log out the current user
  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  // Update user profile
  const updateProfile = async (userId, userData) => {
    const result = await authService.updateProfile(userId, userData);
    if (result.success) {
      setCurrentUser(result.user);
    }
    return result;
  };

  // Delete user account
  const deleteAccount = async (userId) => {
    const result = await authService.deleteAccount(userId);
    if (result.success) {
      setCurrentUser(null);
    }
    return result;
  };

  // Value to be provided to consumers
  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    register,
    logout,
    updateProfile,
    deleteAccount,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
