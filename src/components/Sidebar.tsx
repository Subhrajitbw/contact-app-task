// Sidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="text-center bg-blue-500 h-screen w-20 fixed top-0 left-0 p-2">
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
