// Sidebar.js

import React from 'react';
import './SideBar.css'
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
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
        <span className='logout-button-logo'></span>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
