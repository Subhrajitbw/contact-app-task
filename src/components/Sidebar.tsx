import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaChevronRight, FaTimes } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const closeSidebar = () => {
    setCollapsed(true);
  };

  return (
    <div
      className={`text-center bg-blue-500 ${
        collapsed ? 'w-0 bg-white' : 'w-40'
      } fixed top-0 left-0 h-full p-2 transition-all duration-300 z-20`}
    >
      <button
        onClick={toggleSidebar}
        className={`${
          collapsed ? 'text-black' : 'text-white'
        } lg:hidden absolute top-2 left-1 right-2 z-30`}
      >
        {collapsed ? <FaBars /> : <FaTimes />}
      </button>
      {!collapsed && (
        <ul className={`flex flex-col items-center mt-8 space-y-4`}>
          <li>
            <Link
              to="/"
              onClick={closeSidebar}
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
              onClick={closeSidebar}
              className={`text-white hover:text-gray-300 ${
                location.pathname === '/charts-and-maps' ? 'font-bold' : ''
              }`}
            >
              Charts And Maps
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
