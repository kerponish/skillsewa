import React from 'react';
import './AdminSidebar.css';

const AdminSidebar = ({ activeMenu, setActiveMenu, handleLogout }) => {
  return (
    <div className="admin-sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">🤝</div>
        <h2 className="logo-text">SKILLS SEWA</h2>
      </div>
      
      <div className="admin-title">Admin</div>
      
      <nav className="sidebar-nav">
        <div 
          className={`nav-item ${activeMenu === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveMenu('dashboard')}
        >
          <span className="nav-icon">🏠</span>
          <span className="nav-text">Dashboard</span>
        </div>
        
        <div 
          className={`nav-item ${activeMenu === 'manage-tasks' ? 'active' : ''}`}
          onClick={() => setActiveMenu('manage-tasks')}
        >
          <span className="nav-icon">📋</span>
          <span className="nav-text">Manage Posts</span>
        </div>
        
        <div 
          className={`nav-item ${activeMenu === 'workers' ? 'active' : ''}`}
          onClick={() => setActiveMenu('workers')}
        >
          <span className="nav-icon">👥</span>
          <span className="nav-text">Workers</span>
        </div>
        
        <div 
          className={`nav-item ${activeMenu === 'users' ? 'active' : ''}`}
          onClick={() => setActiveMenu('users')}
        >
          <span className="nav-icon">👤</span>
          <span className="nav-text">Users</span>
        </div>
      </nav>
      
      <div className="sidebar-logout" onClick={handleLogout}>
        <span className="nav-icon">🚪</span>
        <span className="nav-text">Logout</span>
      </div>
    </div>
  );
};

export default AdminSidebar; 