import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ role, setRole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setRole('');
  };

  const userRole = localStorage.getItem('role');

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo or Home link */}
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/" className="hover:text-blue-300 transition-colors duration-300">
            InvestMate
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`md:flex md:flex-row md:items-center md:space-x-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-4 items-center">
            {!userRole ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-gray-900 text-sm font-semibold"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-gray-700 hover:text-gray-900 text-sm font-semibold"
                  >
                    Create Account
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-gray-900 text-sm font-semibold"
                  >
                    Dashboard
                  </Link>
                </li>
                {userRole === 'maker' && (
                  <>
                    <li>
                      <Link
                        to="/add-project"
                        className="text-gray-700 hover:text-gray-900 text-sm font-semibold"
                      >
                        Create Project
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/view-projects"
                        className="text-gray-700 hover:text-gray-900 text-sm font-semibold"
                      >
                        My Projects
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/collaborations"
                        className="text-gray-700 hover:text-gray-900 text-sm font-semibold"
                      >
                        Collaboration Requests
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/domainDropdown"
                        className="text-gray-700 hover:text-gray-900 text-sm font-semibold"
                      >
                        Send Collaboration Requests
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/viewMyRequests"
                        className="text-gray-700 hover:text-gray-900 text-sm font-semibold"
                      >
                        My Requests
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/sendReq"
                        className="text-gray-700 hover:text-gray-900 text-sm font-semibold"
                      >
                        Request Lab Collaboration
                      </Link>
                    </li>
                  </>
                )}
                {userRole === 'investor' && (
                  <li>
                    <Link
                      to="/view-projects"
                      className="text-gray-700 hover:text-gray-900 text-sm font-semibold"
                    >
                      Explore Projects
                    </Link>
                  </li>
                )}
                {userRole === 'lab' && (
                  <>
                    <li>
                      <Link
                        to="/viewMyRequests"
                        className="text-gray-700 hover:text-gray-900 text-sm font-semibold"
                      >
                        My Lab Requests
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/requests/details/:id"
                        className="text-gray-700 hover:text-gray-900 text-sm font-semibold"
                      >
                        Request Details
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700 text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-semibold"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
