import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState(location.pathname);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth <= 1200);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call on initial render

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const closeSidebar = () => {
    if (window.innerWidth <= 1200) {
      setCollapsed(true);
    }
  };

  return (
    <div
      className={`text-center bg-blue-500 ${
        collapsed ? 'w-0 bg-white' : 'w-20'
      } fixed top-0 left-0 h-full p-2 transition-all duration-300 z-10`}
    >
      <button
        onClick={toggleSidebar}
        className="lg:hidden absolute top-2 left-1 right-2 z-30"
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
                currentLocation === '/' ? 'font-bold' : ''
              }`}
            >
              Contact
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
                currentLocation === '/charts-and-maps' ? 'font-bold' : ''
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
