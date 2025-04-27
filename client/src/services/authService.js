import axios from "axios";

const API_URL = "http://localhost:3001";

// Helper to store user in localStorage
const setUserToStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Helper to get user from localStorage
const getUserFromStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Helper to remove user from localStorage
const removeUserFromStorage = () => {
  localStorage.removeItem("user");
};

// Register a new user
const register = async (username, email, password) => {
  try {
    // Check if email already exists
    const emailCheck = await axios.get(`${API_URL}/users?email=${email}`);
    if (emailCheck.data.length > 0) {
      return { success: false, message: "Email already in use" };
    }

    // Check if username already exists
    const usernameCheck = await axios.get(
      `${API_URL}/users?username=${username}`
    );
    if (usernameCheck.data.length > 0) {
      return { success: false, message: "Username already taken" };
    }

    // Create new user
    const response = await axios.post(`${API_URL}/users`, {
      username,
      email,
      password,
      // In a real app, you would hash the password
    });

    // Store user in localStorage (excluding password)
    const userData = { ...response.data };
    delete userData.password;
    setUserToStorage(userData);

    return { success: true, user: userData };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Login user
const login = async (email, password) => {
  try {
    // Find user with matching email and password
    const response = await axios.get(`${API_URL}/users?email=${email}`);

    if (response.data.length === 0) {
      return { success: false, message: "User not found" };
    }

    const user = response.data[0];

    if (user.password !== password) {
      return { success: false, message: "Invalid password" };
    }

    // Store user in localStorage (excluding password)
    const userData = { ...user };
    delete userData.password;
    setUserToStorage(userData);

    return { success: true, user: userData };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Logout user
const logout = () => {
  removeUserFromStorage();
};

// Update user profile
const updateProfile = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, userData);

    // Update user in localStorage
    const updatedUserData = { ...response.data };
    delete updatedUserData.password;
    setUserToStorage(updatedUserData);

    return { success: true, user: updatedUserData };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Delete user account
const deleteAccount = async (userId) => {
  try {
    await axios.delete(`${API_URL}/users/${userId}`);
    removeUserFromStorage();
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Check if user is authenticated
const isAuthenticated = () => {
  return getUserFromStorage() !== null;
};

// Get current user
const getCurrentUser = () => {
  return getUserFromStorage();
};

const authService = {
  register,
  login,
  logout,
  updateProfile,
  deleteAccount,
  isAuthenticated,
  getCurrentUser,
};

export default authService;
