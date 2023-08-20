// Sidebar.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`bg-blue-500 h-screen w-20 fixed top-0 left-0 p-2 transition-transform duration-300 ${isSidebarOpen ? 'transform translate-x-0' : '-translate-x-full'}`}>
      <div className="flex justify-between items-center">
        <button
          className="text-white text-xl focus:outline-none"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? '←' : '☰'}
        </button>
        <Link to="/" className="text-white text-xl font-bold">
          My App
        </Link>
      </div>
      <ul className="flex flex-col items-center mt-8 space-y-4">
        <li>
          <Link
            to="/"
            className={`text-white hover:text-gray-300 ${
              location.pathname === '/' ? 'font-bold' : ''
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <hr className="w-10 mx-auto border-gray-300" />
        </li>
        <li>
          <Link
            to="/charts-and-maps"
            className={`text-white hover:text-gray-300 ${
              location.pathname === '/charts-and-maps' ? 'font-bold' : ''
            }`}
          >
            Charts and Maps
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
