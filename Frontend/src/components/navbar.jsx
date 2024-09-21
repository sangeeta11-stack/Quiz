import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; 
import '../assets/Navbar.css'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); 

  // Retrieve user data from localStorage
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('userId'); 
    localStorage.removeItem('userName'); 
    localStorage.removeItem('userEmail'); 
    navigate('/login');
  };

  const handleUserClick = () => {
       if (userId) {
      alert(`User ID: ${userId}`);
    } else {
      alert('User data is missing.');
    }
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-2xl font-bold">
          <Link to="/home">QUIZZEZ</Link>
        </div>

        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <svg
            className={`w-6 h-6 ${isOpen ? 'open' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        {/* Navbar Links */}
        <ul className={`flex space-x-4 ${isOpen ? 'block' : 'hidden'} lg:flex`}>
          {token ? (
            <>
              <li>
                <Link to="/dashboard" className="hover:text-gray-400">Dashboard</Link>
              </li>
              <li>
                <button 
                  onClick={handleUserClick} 
                  className="flex items-center space-x-2 hover:text-gray-400"
                >
                  <FaUserCircle className="w-6 h-6" />
                  <span>{userName || 'User'}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={handleLogout} 
                  className="hover:text-gray-400"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/home" className="hover:text-gray-400">Home</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-400">Contact</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-gray-400">Login</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-gray-400">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
