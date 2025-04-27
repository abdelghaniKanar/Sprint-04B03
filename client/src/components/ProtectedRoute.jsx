import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

// This component checks if the user is authenticated
// If authenticated, it renders the child component
// If not, it redirects to the login page
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child component
  return <Outlet />;
};

export default ProtectedRoute;
