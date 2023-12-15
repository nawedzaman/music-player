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
      <div className="logo">
        Logo
      </div>

      <div className="menu-item">
        <span className='menu-item-logo'></span>
        <span className='menu-item-text'>Songs</span>
      </div>

      <div className="logout-button-container">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
