import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-gray-700">
        
        <div>
          <div className="flex items-center mb-4">
            <span className="text-blue-600 text-xl sm:text-2xl">🖨️</span>
            <span className="ml-2 text-lg sm:text-xl font-semibold text-gray-900">
              MakerPort
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Custom 3D printing services for mechanical parts, artistic models,
            and prototypes.
          </p>
        </div>

        
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-blue-600 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/portfolio" className="hover:text-blue-600 transition">
                Portfolio
              </a>
            </li>
            <li>
              <a href="/client-form" className="hover:text-blue-600 transition">
                Submit a Brief
              </a>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Connect with the creator
          </h3>
          <div className="flex space-x-4 mb-2">
            <a
              href="https://github.com/Sussybakabeep30"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-blue-600 transition text-lg"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/vanshika-vishal-108285265/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-blue-600 transition text-lg"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:vanshikavishal354@gmail.com"
              aria-label="Email"
              className="hover:text-blue-600 transition text-lg"
            >
              <FaEnvelope />
            </a>
          </div>
          <p className="text-sm text-gray-500 break-words">
            Email: vanshikavishal354@gmail.com
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200 text-center py-4 sm:py-6 text-xs sm:text-sm text-gray-400">
        &copy; {new Date().getFullYear()} MakerPort. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
