import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import img from "../assets/Logo 1.png";

function NavBar() {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  // Determine which buttons to show based on path and authentication status
  const renderAuthButtons = () => {
    // If user is on mini-dashboard
    if (location.pathname.startsWith("/dashboard")) {
      return (
        <Link
          className="inline-flex items-center justify-center rounded-xl bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-600"
          to="/"
        >
          Home
        </Link>
      );
    }

    // If user is on article details page
    if (location.pathname.startsWith("/article/")) {
      return (
        <div className="flex gap-3">
          <Link
            className="inline-flex items-center justify-center rounded-xl bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-600"
            to="/"
          >
            Home
          </Link>
          {isAuthenticated && (
            <Link
              className="inline-flex items-center justify-center rounded-xl bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm transition-all duration-150 hover:bg-gray-300"
              to="/dashboard"
            >
              {currentUser?.username}
            </Link>
          )}
        </div>
      );
    }

    // If user is authenticated (on home page)
    if (isAuthenticated) {
      return (
        <div className="flex gap-3">
          <Link
            className="inline-flex items-center justify-center rounded-xl bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm transition-all duration-150 hover:bg-gray-300"
            to="/dashboard"
          >
            {currentUser?.username}
          </Link>
          <button
            className="inline-flex items-center justify-center rounded-xl bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-red-500"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      );
    }

    // If user is not authenticated (landing page)
    return (
      <div className="flex items-center justify-end gap-3">
        <Link
          className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
          to="/register"
        >
          Register
        </Link>
        <Link
          className="inline-flex items-center justify-center rounded-xl bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          to="/login"
        >
          Login
        </Link>
      </div>
    );
  };

  return (
    <div className="fixed inset-x-0 top-0 z-30 mx-auto w-full border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg">
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <Link to="/" className="flex items-center">
              <img className="h-7 w-auto" src={img} alt="Logo" />
            </Link>
          </div>

          {/* Auth Buttons */}
          {renderAuthButtons()}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
