import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/Logo 1.png";

function NavBar() {
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
        </div>
      </div>
    </div>
  );
}

export default NavBar;
