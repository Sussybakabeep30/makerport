import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom"; 
import { useUser } from "../context/UserContext"; 

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn } = useUser();

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <svg
            className="w-8 h-8 text-blue-600"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            {/* logo */}
            <path d="M19 7h-1V2H6v5H5c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM8 4h8v3H8V4zm11 14H5V9h14v9z" />
            <path d="M8 14h8v2H8z" />
          </svg>
          <span className="text-blue-600 text-xl md:text-2xl font-bold">
            MakerPort
          </span>
        </div>

        <button
          className="md:hidden flex items-center p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              // logo svg
              <path d="M6 18L18 6M6 6l12 12" /> 
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg font-medium ${
              location.pathname === "/"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Home
          </Link>
          <Link
            to="/portfolio"
            className={`px-4 py-2 rounded-lg font-medium ${
              location.pathname === "/portfolio"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Portfolio
          </Link>
          <Link
            to="/client-form"
            className={`px-4 py-2 rounded-lg font-medium ${
              location.pathname === "/client-form"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Submit a Brief
          </Link>
          {isLoggedIn && (
            <Link
              to="/MyRequests"
              className={`px-4 py-2 rounded-lg font-medium ${
                location.pathname === "/myrequests"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              My Requests
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile navigation menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-2 space-y-2">
            <Link
              to="/"
              className={`block py-3 px-4 rounded-lg font-medium ${
                location.pathname === "/"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/portfolio"
              className={`block py-3 px-4 rounded-lg font-medium ${
                location.pathname === "/portfolio"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link
              to="/client-form"
              className={`block py-3 px-4 rounded-lg font-medium ${
                location.pathname === "/client-form"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Submit a Brief
            </Link>
            {isLoggedIn && (
              <Link
                to="/MyRequests"
                className={`px-4 py-2 rounded-lg font-medium ${
                  location.pathname === "/MyRequests"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                My Requests
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
