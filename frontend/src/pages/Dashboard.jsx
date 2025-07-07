
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Dashboard.css'; 
import pk from "../assets/logoskils.png";


import Profile from './Profile';

import {
  FaTachometerAlt, FaEnvelope, FaBriefcase, FaHistory, FaBell,
  FaUserCircle, FaCog, FaQuestionCircle, FaHeadset, FaSignOutAlt,
  FaSearch, FaPlusCircle
} from 'react-icons/fa';


const workers = [
  { name: 'Pradip Kc', skill: 'Plumber', rating: '4.3 Stars' },
  { name: 'Ramesh Thapa', skill: 'Electrician', rating: '4.1 Stars' },
  { name: 'Anthony Gonzales', skill: 'Plumber', rating: '3.9 Stars' },
  { name: 'Cahaya Dewi', skill: 'Plumber', rating: '3.9 Stars' },
  { name: 'Yael Amari', skill: 'Carpenter', rating: '3.9 Stars' },
  { name: 'Lokesh Bam', skill: 'Cleaner', rating: '3.9 Stars' },
  { name: 'Sita Devi', skill: 'Maid Service', rating: '4.5 Stars' },
  { name: 'Gopal Sharma', skill: 'Painter', rating: '4.2 Stars' },
  { name: 'Nabin Rai', skill: 'AC Repair', rating: '4.0 Stars' },
  { name: 'Priya Gurung', skill: 'Tutor', rating: '4.7 Stars' },
  { name: 'Karma Sherpa', skill: 'Trekking Guide', rating: '4.8 Stars' },
  { name: 'Sunita Limbu', skill: 'Beautician', rating: '4.6 Stars' },
  { name: 'Bikram Thapa', skill: 'Driver', rating: '4.1 Stars' },
  { name: 'Anil Gupta', skill: 'Web Developer', rating: '4.9 Stars' },
  { name: 'Deepa Karki', skill: 'Nurse', rating: '4.4 Stars' },
  { name: 'Rajesh Shah', skill: 'Mechanic', rating: '3.8 Stars' }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const CURRENT_USER_ID = 2; 

  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [userInfo, setUserInfo] = useState({
    name: 'Loading...', // Initial state for header
    email: ''
   
  });
    const handleLogout = () => {
    navigate("/"); }

  // Callback function to update userInfo in Dashboard when Profile fetches/updates data
  const handleProfileDataUpdateForHeader = (profileData) => {
    setUserInfo(profileData);
  };

  // Optional: Fetch initial user info for the header when Dashboard mounts
  // This avoids "Loading..." in the header if Profile isn't clicked first
  useEffect(() => {
    const fetchInitialUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/profile/${CURRENT_USER_ID}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserInfo({
            name: `${data.first_name} ${data.last_name || ''}`,
            email: data.email,
          
        });
      } catch (err) {
        console.error("Failed to fetch initial user info for header:", err);
        setUserInfo({ name: 'User', email: 'N/A'}); // Fallback
      }
    };
    fetchInitialUserInfo();
  }, [CURRENT_USER_ID]); // Fetch once on component mount or if CURRENT_USER_ID changes

  const handleMenuItemClick = (item) => {
    setActiveMenuItem(item);
  };

  const renderContent = () => {
    if (activeMenuItem === 'dashboard') {
      return (
        <>
          <div className="service-request-section">
            <h3 className="section-title">Post a new Service Request</h3>
            <div className="add-service-card">
              <FaPlusCircle className="add-icon" />
              <span>ADD</span>
            </div>
            {/* The user-details-card can now be removed if the Profile page is the primary source of user info */}
            <div className="user-details-card">
              <p className="card-title">User Info</p>
              <p><strong>{userInfo.name}</strong></p>
              <p>Email: {userInfo.email}</p>
        
            </div>
          </div>

          <div className="recommended-workers-section">
            <h3 className="section-title">Recommend Workers</h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Skilled at</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {workers.map((worker, index) => (
                    <tr key={index}>
                      <td>{worker.name}</td>
                      <td>{worker.skill}</td>
                      <td className="rating">{worker.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      );
    } else if (activeMenuItem === 'myProfile') {
      // Render the Profile component when 'My Profile' is active
      return <Profile userId={CURRENT_USER_ID} onProfileUpdate={handleProfileDataUpdateForHeader} />;
    }
    // Add other menu items here if needed
    return null;
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo">
          <img src={pk} alt="Skills Sewa Logo"/>
          <span>Skills Sewa</span>
        </div>
        <ul className="sidebar-menu">
          <li className={activeMenuItem === 'dashboard' ? 'active' : ''} onClick={() => handleMenuItemClick('dashboard')}>
            <FaTachometerAlt className="icon" /> Dashboard
          </li>
          <li><FaEnvelope className="icon" /> Message</li>
          <li><FaBriefcase className="icon" /> Active Jobs</li>
          <li><FaHistory className="icon" /> History</li>
          <li><FaBell className="icon" /> Notifications</li>
          <div className="sidebar-divider"></div>
          {/* Note: 'Account' could be a parent for 'My Profile' and 'Settings' */}
          <li className={activeMenuItem === 'account' ? 'active' : ''} onClick={() => handleMenuItemClick('account')}>
            <FaUserCircle className="icon" /> Account
          </li>
          <li className={activeMenuItem === 'myProfile' ? 'active' : ''} onClick={() => handleMenuItemClick('myProfile')}>
            <FaUserCircle className="icon" /> My Profile
          </li>
          <li className={activeMenuItem === 'settings' ? 'active' : ''} onClick={() => handleMenuItemClick('settings')}>
            <FaCog className="icon" /> Settings
          </li>
          <div className="sidebar-divider"></div>
          <li><FaHeadset className="icon" /> Contact Support</li>
          <li><FaQuestionCircle className="icon" /> Help</li>
          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
            <FaSignOutAlt className="icon" /> Log Out
          </li>
        </ul>
      </aside>

      <div className="content">
        <header className="header">
          <div className="header-text">
            <h2>Welcome, <span>{userInfo.name}</span></h2>
            <p>Find the right expert in minutes!</p>
          </div>
          <div className="search-user-section">
            <div className="search-bar">
              <input type="text" placeholder="Search here" />
              <button><FaSearch /></button>
            </div>
            <div className="user-profile">
              <div className="user-info">
                <span>{userInfo.name}</span>
                <small>Client</small>
              </div>
              <div className="avatar"></div>
            </div>
          </div>
        </header>

        <div className="main-body">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;