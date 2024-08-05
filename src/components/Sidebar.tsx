import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('toggleButton');
    if (sidebar && !sidebar.contains(event.target as Node) && !toggleButton?.contains(event.target as Node)) {
      closeSidebar();
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <button
        id="toggleButton"
        className="md:hidden p-10 text-white bg-gray-800"
        onClick={toggleSidebar}
        role='button'
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"></div>
      )}
      <div
        id="sidebar"
        className={`fixed inset-y-0 left-0 bg-gray-800 text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:flex-col w-64 h-screen z-50`}
      >
        <nav className="flex flex-col p-4 space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? 'bg-gray-700' : ''}`
            }
            onClick={closeSidebar}
          >
            Contact
          </NavLink>
          <NavLink
            to="/chart"
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? 'bg-gray-700' : ''}`
            }
            onClick={closeSidebar}
          >
            Chart
          </NavLink>
          <NavLink
            to="/map"
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? 'bg-gray-700' : ''}`
            }
            onClick={closeSidebar}
          >
            Map
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;