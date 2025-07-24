import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pk from "../assets/logoskils.png"; // Assuming this is the correct path to your logo
import './dashboard.css';
import Profile from './Profile';
import AddPost from './AddPost';
import Task from './Task';
import Workers from './Workers';
import {
  FaTachometerAlt, FaUserCircle, FaHistory, FaUsers, FaTasks,
  FaHeadset, FaSignOutAlt, FaSearch, FaPlusCircle
} from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();

  const [workers, setWorkers] = useState([]);
  const [workersLoading, setWorkersLoading] = useState(true);
  const [workersError, setWorkersError] = useState(null);

  const CURRENT_USER_ID = localStorage.getItem("userId");

  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [userInfo, setUserInfo] = useState({
    name: 'Loading...',
    email: '',
    avatarChar: 'U'
  });
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);

  const handleLogout = () => {
    // Implement actual logout logic here (e.g., clear tokens, call API)
    navigate("/");
  };

  const handleProfileDataUpdateForHeader = (profileData) => {
    setUserInfo({
      name: `${profileData.first_name} ${profileData.last_name || ''}`,
      email: profileData.email,
      avatarChar: profileData.first_name ? profileData.first_name.charAt(0).toUpperCase() : 'U'
    });
  };

  useEffect(() => {
    const fetchInitialUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/profile/${CURRENT_USER_ID}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserInfo({
          name: `${data.first_name} ${data.last_name || ''}`,
          email: data.email,
          avatarChar: data.first_name ? data.first_name.charAt(0).toUpperCase() : 'U'
        });
      } catch (err) {
        console.error("Failed to fetch initial user info for header:", err);
        setUserInfo({ name: 'User', email: 'N/A', avatarChar: 'U' }); // Fallback
      }
    };
    fetchInitialUserInfo();
  }, []);

  useEffect(() => {
    const fetchWorkers = async () => {
      setWorkersLoading(true);
      setWorkersError(null);
      try {
        const response = await fetch('http://localhost:5000/api/workers/');
        if (!response.ok) throw new Error('Failed to fetch workers');
        const data = await response.json();
        setWorkers(data);
      } catch (err) {
        setWorkersError('Could not load workers.');
      } finally {
        setWorkersLoading(false);
      }
    };
    fetchWorkers();
  }, []);

  const handleMenuItemClick = (item) => {
    setActiveMenuItem(item);
  };

  const handleAddPostClick = () => {
    setIsAddPostOpen(true);
  };
  const handleAddPostClose = () => {
    setIsAddPostOpen(false);
  };
  const handleAddPostSubmit = (formData) => {
    // You can implement actual submit logic here
    console.log('AddPost submitted:', formData);
    alert('Request added!');
  };

  const renderContent = () => {
    if (activeMenuItem === 'dashboard') {
      return (
        <>
          <h2 className="dashboard-overview-title">Dashboard Overview</h2>
          <div className="dashboard-stats-grid">
            <div className="dashboard-stat-card">
              <span className="stat-icon-label">◼ Workers</span>
              <p className="stat-number">{workersLoading ? '...' : workers.length}</p>
            </div>
            <div className="dashboard-stat-card clickable-card">
              <span className="stat-icon-label">◼ Pending task</span>
              <p className="stat-action-text">Click here to check your pending task</p>
            </div>
            <div className="dashboard-stat-card clickable-card">
              <span className="stat-icon-label">◼ History</span>
              <p className="stat-action-text">Click here to check your history</p>
            </div>
          </div>

          <div className="dashboard-middle-section">
            <div className="dashboard-card add-request-card" onClick={handleAddPostClick} style={{ cursor: 'pointer' }}>
              <div className="add-request-content">
                <FaPlusCircle className="add-request-icon" />
                <div className="add-request-text">Add or Post a Request</div>
              </div>
            </div>
            <div className="dashboard-card quick-profile-card" onClick={() => setActiveMenuItem('profile')} style={{ cursor: 'pointer' }}>
              <span className="stat-icon-label">◼ Quick Profile</span>
              {/* Content for Quick Profile will go here later if needed */}
            </div>
          </div>

          <div className="dashboard-card workers-list-card">
            <h3>Workers</h3>
            <div className="dashboard-table-container">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Skilled at</th>
                    <th>Number</th>
                  </tr>
                </thead>
                <tbody>
                  {workersLoading ? (
                    <tr><td colSpan="3">Loading...</td></tr>
                  ) : workersError ? (
                    <tr><td colSpan="3">{workersError}</td></tr>
                  ) : workers.length === 0 ? (
                    <tr><td colSpan="3">No workers found.</td></tr>
                  ) : (
                    workers.map((worker, index) => (
                      <tr key={worker.id || index}>
                        <td>{worker.name || worker.fullName || worker.username || '-'}</td>
                        <td>{worker.skill || worker.skills || '-'}</td>
                        <td>{worker.number || worker.phone || '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      );
    } else if (activeMenuItem === 'profile') { // Renamed from 'myProfile' to 'profile' to match sidebar more closely
      return <Profile userId={CURRENT_USER_ID} onProfileUpdate={handleProfileDataUpdateForHeader} />;
    } else if (activeMenuItem === 'myTask') {
      return <Task userId={CURRENT_USER_ID} />;
    } else if (activeMenuItem === 'worker') {
      return <Workers />;
    }
    // You can add more conditions here for other menu items if needed
    return null;
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo-section">
          <img src={pk} alt="Skills Sewa Logo" />
          <span>Skills Sewa</span>
        </div>
        <ul className="sidebar-nav-list">
          <li
            className={activeMenuItem === 'dashboard' ? 'active-menu-item' : ''}
            onClick={() => handleMenuItemClick('dashboard')}
          >
            <FaTachometerAlt /> Dashboard
          </li>
          <li
            className={activeMenuItem === 'profile' ? 'active-menu-item' : ''}
            onClick={() => handleMenuItemClick('profile')}
          >
            <FaUserCircle /> Profile
          </li>
          <li
            className={activeMenuItem === 'history' ? 'active-menu-item' : ''}
            onClick={() => handleMenuItemClick('history')}
          >
            <FaHistory /> History
          </li>
          <li
            className={activeMenuItem === 'worker' ? 'active-menu-item' : ''}
            onClick={() => handleMenuItemClick('worker')}
          >
            <FaUsers /> Worker
          </li>
          <li
            className={activeMenuItem === 'myTask' ? 'active-menu-item' : ''}
            onClick={() => handleMenuItemClick('myTask')}
          >
            <FaTasks /> My task
          </li>
          <li
            className={activeMenuItem === 'contactUs' ? 'active-menu-item' : ''}
            onClick={() => handleMenuItemClick('contactUs')}
          >
            <FaHeadset /> contact us
          </li>
        </ul>
        <div className="sidebar-logout" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </div>
      </aside>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-user-info">
            <div className="user-avatar-header">
              {userInfo.avatarChar}
            </div>
            <div className="user-name-role">
              <span className="user-name-text">{userInfo.name}</span>
              <small className="user-role-text">Client</small> {/* Assuming fixed as Client */}
            </div>
          </div>
          <div className="header-search-bar">
            <input
              type="text"
              placeholder="Search"
              className="search-input"
            />
            <FaSearch className="search-icon" />
          </div>
        </header>

        {/* Main Body */}
        <main>
          {renderContent()}
          <AddPost isOpen={isAddPostOpen} onClose={handleAddPostClose} onSubmit={handleAddPostSubmit} />
        </main>

        {/* Footer */}
        <footer className="dashboard-footer">
          {/* Content for the footer will go here later */}
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;