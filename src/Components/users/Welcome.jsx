import React, { useState } from 'react';
import { FaShoppingCart, FaUserCircle, FaBell, FaSignOutAlt } from 'react-icons/fa'; // Import icons

import HandleLogout from './handleLogout';


 // Import Appwrite SDK

const Welcome = ({ username }) => {
  const [isOpen, setIsOpen] = useState(true); // State to control the toggle menu

  // Toggle function
  const toggleMenu = () => {
    
  };

  return (
    <a >
      <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600">
      <div className="text-center px-8 py-6 rounded-lg shadow-lg bg-opacity-80 backdrop-blur-md">
        <h1 className="text-4xl capitalize font-extrabold text-white mb-4">
          Welcome, {username}!
        </h1>
        <p className="text-xl text-white">
          We’re thrilled to have you here. Explore and enjoy your time.
        </p>
        <a href="www.webdial.in">
        <button className="mt-6 px-6 py-2 rounded-full bg-white text-blue-600 font-semibold hover:bg-blue-100 transition duration-300 ease-in-out">
        Explore Now
        </button>
        </a>
      </div>

      {/* Toggle Button in the center */}
      {/* <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white rounded-full shadow-lg cursor-pointer"
        
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div> */}

      {/* Radial Menu with Surrounding Icons */}
      {isOpen && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 h-72 flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Icon at top-left */}
            <div className="absolute top-0 left-0 transform -translate-x-10 -translate-y-10">
              <button className="text-xl text-blue-100">
                <FaShoppingCart />
                <span className="text-sm">Orders</span>
              </button>
            </div>

            {/* Icon at top-right */}
            <div className="absolute top-0 right-0  transform translate-x-10 -translate-y-10">
              <button className="text-xl text-blue-100">
                <FaUserCircle />
                <span className="text-sm">Profile</span>
              </button>
            </div>

            {/* Icon at bottom-left */}
            <div className="absolute bottom-0 left-0 transform -translate-x-10 translate-y-10">
              <button className="text-xl text-blue-100">
                <FaBell />
                <span className="text-sm">Notifications</span>
              </button>
            </div>

            {/* Icon at bottom-right */}
            <div className="absolute bottom-0 right-0 transform translate-x-10 translate-y-10">
              {/* <button  className="text-xl text-blue-100">
                <FaSignOutAlt />
                <span className="text-sm">Logout</span>
              </button> */}
              {/* <LogoutPage/> */}
              <HandleLogout/>
            </div>
          </div>
        </div>
      )}
    </div>
    </a>
  );
};

export default Welcome;
