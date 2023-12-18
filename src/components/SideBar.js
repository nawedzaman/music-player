// Sidebar.js

import React, { useState, useEffect } from "react";
import "./SideBar.css";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 900) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="sidebar">
      {windowWidth <= 900 && (
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isSidebarOpen ? "✕" : "☰"}
        </button>
      )}
      <nav
        className={`sidebar ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <div className="logo">Logo</div>

        <div className="menu-item">
          <span className="menu-item-logo"></span>
          <span className="menu-item-text">Songs</span>
        </div>

        <div className="logout-button-container">
          <span className="logout-button-logo"></span>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
