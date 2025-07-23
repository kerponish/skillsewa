import React, { useState, useEffect } from 'react';
import './Profile.css';
import {
  FaPencilAlt, FaLock, FaCalendarAlt, FaEdit, FaSave, FaTimes, FaUser
} from 'react-icons/fa';

const Profile = ({ userId, onProfileUpdate }) => {
  const [userProfileData, setUserProfileData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '', // Re-added email
    dateOfBirth: ''
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/auth/profile/${userId}`);
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
      setEditFormData({
        username: data.username || '',
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email, // Populate email for edit form
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
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const handleEditClick = () => {
    setIsEditingProfile(true);
    setEditFormData({
      username: userProfileData.username,
      firstName: userProfileData.firstName,
      lastName: userProfileData.lastName,
      email: userProfileData.email, // Add email to edit form state
      dateOfBirth: userProfileData.dateOfBirth
    });
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    setEditFormData({
      username: userProfileData.username,
      firstName: userProfileData.firstName,
      lastName: userProfileData.lastName,
      email: userProfileData.email, // Revert email on cancel
      dateOfBirth: userProfileData.dateOfBirth
    });
  };

  const handleProfileFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/auth/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: editFormData.firstName,
          last_name: editFormData.lastName,
          email: editFormData.email, // Send email to backend
          username: editFormData.username,
          date_of_birth: editFormData.dateOfBirth
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setUserProfileData({
        username: result.user.username || '',
        firstName: result.user.first_name,
        lastName: result.user.last_name,
        email: result.user.email, // Update email from backend response
        dateOfBirth: result.user.date_of_birth
      });

      // Notify parent (Dashboard) about the updated user info for the header
      if (onProfileUpdate) {
        onProfileUpdate({
          first_name: result.user.first_name,
          last_name: result.user.last_name,
          email: result.user.email,
        });
      }

      setIsEditingProfile(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error("Failed to save profile:", err);
      setError(`Error saving profile: ${err.message || 'Please try again.'}`);
      alert(`Error saving profile: ${err.message || 'Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePasswordClick = () => {
    console.log("Change password clicked!");
    alert("Change password functionality will be implemented here!");
  };

  return (
    <div className="profile-container">
      <h1 className="profile-main-title">Profile</h1>
      {loading && <p className="loading-message">Loading profile...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <div className="profile-content">
          {!isEditingProfile ? (
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
          ) : (
            <form className="profile-edit-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="username">Username :</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={editFormData.username}
                  onChange={handleProfileFormChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">First Name :</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={editFormData.firstName}
                  onChange={handleProfileFormChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Second Name :</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={editFormData.lastName}
                  onChange={handleProfileFormChange}
                />
              </div>
              <div className="form-group"> {/* New Email Edit Form Group */}
                <label htmlFor="email">Email :</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleProfileFormChange}
                />
              </div>
              <div className="form-group dob-group">
                <label htmlFor="dateOfBirth">DOB:</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={editFormData.dateOfBirth ? editFormData.dateOfBirth.slice(0, 10) : ''}
                  onChange={handleProfileFormChange}
                />
              </div>
              <div className="form-action-buttons">
                <button type="button" className="save-btn" onClick={handleSaveProfile} disabled={loading}>
                  <FaSave /> {loading ? 'Saving...' : 'Save'}
                </button>
                <button type="button" className="cancel-btn" onClick={handleCancelEdit} disabled={loading}>
                  <FaTimes /> Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;