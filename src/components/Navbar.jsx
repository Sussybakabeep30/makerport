import React from 'react'
import { useLocation } from 'react-router-dom';



function Navbar() {
  const location = useLocation();
  return (
    <header className="w-full bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg
              className="w-8 h-8 text-blue-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 7h-1V2H6v5H5c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM8 4h8v3H8V4zm11 14H5V9h14v9z" />
              <path d="M8 14h8v2H8z" />
            </svg>
            <span className="text-blue-600 text-2xl font-bold">MakerPort</span>
          </div>

          <nav className="flex items-center space-x-8">
            <a
              href="/"
              className={`px-4 py-2 rounded-lg font-medium ${
                location.pathname === '/' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </a>
            <a
              href="/portfolio"
              className={`px-4 py-2 rounded-lg font-medium ${
                location.pathname === '/portfolio' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Portfolio
            </a>
            <a
              href="/client-form"
              className={`px-4 py-2 rounded-lg font-medium ${
                location.pathname === '/client-form' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Submit a Brief
            </a>
          </nav>
        </div>
      </header>
  )
}

export default Navbar