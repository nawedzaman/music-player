// Sidebar.js

import React from 'react';
import './SideBar.css'
const Sidebar = () => {
  const handleLogout = () => {
    // Add your logout logic here
    console.log('User logged out');
  };

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="logo">
        {/* Replace the content with your logo */}
        <img src="logo.png" alt="Logo" />
      </div>

      {/* Menu Item */}
      <div className="menu-item">
        <span>Home</span>
      </div>

      {/* Logout Button */}
      <div className="logout-button">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
