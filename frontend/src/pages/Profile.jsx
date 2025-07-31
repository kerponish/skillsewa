import React, { useState, useEffect } from 'react';
import './Profile.css';
import {
  FaPencilAlt, FaLock, FaCalendarAlt, FaEdit, FaSave, FaTimes, FaUser
} from 'react-icons/fa';
import { useUser } from '../UserContext';
import ChangePassword from './ChangePassword';

const EditProfile = ({ userId, firstName, lastName, dateOfBirth, onClose, onProfileUpdated }) => {
  const [formData, setFormData] = useState({
    firstName: firstName || '',
    lastName: lastName || '',
    dateOfBirth: dateOfBirth ? dateOfBirth.slice(0, 10) : ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/auth/profile/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          dateOfBirth: formData.dateOfBirth
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      onProfileUpdated({
        firstName: result.user.first_name,
        lastName: result.user.last_name,
        dateOfBirth: result.user.date_of_birth
      });
    } catch (err) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-modal-overlay">
      <div className="edit-profile-modal-content">
        <h2>Edit Profile</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="edit-profile-form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="edit-profile-form-group">
          <label htmlFor="lastName">Second Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="edit-profile-form-group">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        <div className="edit-profile-actions">
          <button className="save-btn" onClick={handleSave} disabled={loading}>
            <FaSave /> {loading ? 'Saving...' : 'Save'}
          </button>
          <button className="cancel-btn" onClick={onClose} disabled={loading}>
            <FaTimes /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const Profile = ({ userId: propUserId, onProfileUpdate }) => {
  const { user } = useUser();
  // Use prop if provided, otherwise get from context
  const userId = propUserId || (user && user.userId);
  const username = user && user.username;
  
  const [userProfileData, setUserProfileData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '', // Re-added email
    dateOfBirth: ''
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      // First try to fetch by username if available, otherwise by userId
      let response;
      if (username) {
        response = await fetch(`http://localhost:5000/api/auth/profile/username/${username}`);
      } else if (userId) {
        response = await fetch(`http://localhost:5000/api/auth/profile/${userId}`);
      } else {
        throw new Error('No user ID or username available');
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUserProfileData({
        username: data.username || '',
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email, // Populate email from API
        dateOfBirth: data.date_of_birth
      });

      // Update header info (Dashboard component)
      if (onProfileUpdate) {
        onProfileUpdate({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
        });
      }

    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      setError("Failed to load profile data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId || username) {
      fetchUserProfile();
    }
  }, [userId, username]);

  const handleEditClick = () => {
    setIsEditingProfile(true);
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
  };

  const handleChangePasswordClick = () => {
    setIsChangingPassword(true);
  };

  const handleCancelChangePassword = () => {
    setIsChangingPassword(false);
  };

  const handlePasswordChanged = () => {
    setIsChangingPassword(false);
    // You can add any additional logic here, like showing a success message
  };

  return (
    <div className="profile-container">
      <h1 className="profile-main-title">Profile</h1>
      {loading && <p className="loading-message">Loading profile...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <div className="profile-content">
          {!isEditingProfile && !isChangingPassword ? (
            <>
              <div className="profile-data-display">
                <div className="data-row">
                  <label>Username :</label>
                  <span>{userProfileData.username || 'N/A'}</span>
                </div>
                <div className="data-row">
                  <label>First Name :</label>
                  <span>{userProfileData.firstName || 'N/A'}</span>
                </div>
                <div className="data-row">
                  <label>Second Name :</label>
                  <span>{userProfileData.lastName || 'N/A'}</span>
                </div>
                 <div className="data-row"> {/* New Email Display Row */}
                  <label>Email :</label>
                  <span>{userProfileData.email || 'N/A'}</span>
                </div>
                <div className="data-row dob-row">
                  <label>DOB:</label>
                  <span>{userProfileData.dateOfBirth ? userProfileData.dateOfBirth.slice(0, 10) : 'N/A'}</span>
                </div>
              </div>
              <div className="profile-actions">
                <button className="edit-profile-btn" onClick={handleEditClick}>
                  <FaPencilAlt className="edit-icon" /> EDIT
                </button>
                <button className="change-password-btn" onClick={handleChangePasswordClick}>
                  <FaLock className="lock-icon" /> change password
                </button>
              </div>
            </>
          ) : null}
        </div>
      )}
      {isEditingProfile && (
        <EditProfile
          userId={userId}
          firstName={userProfileData.firstName}
          lastName={userProfileData.lastName}
          dateOfBirth={userProfileData.dateOfBirth}
          onClose={handleCancelEdit}
          onProfileUpdated={(updated) => {
            setUserProfileData(prev => ({
              ...prev,
              firstName: updated.firstName,
              lastName: updated.lastName,
              dateOfBirth: updated.dateOfBirth
            }));
            if (onProfileUpdate) {
              onProfileUpdate({
                first_name: updated.firstName,
                last_name: updated.lastName,
                email: userProfileData.email,
              });
            }
            setIsEditingProfile(false);
          }}
        />
      )}
      {isChangingPassword && (
        <ChangePassword
          userId={userId}
          onClose={handleCancelChangePassword}
          onPasswordChanged={handlePasswordChanged}
        />
      )}
    </div>
  );
};

export default Profile;