// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import './Profile.css'; // New CSS file for Profile component

import {
  FaEdit, FaSave, FaTimes
} from 'react-icons/fa';

const Profile = ({ userId, onProfileUpdate }) => {
  const [userProfileData, setUserProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
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
      const response = await fetch(`http://localhost:5000/api/profile/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUserProfileData({
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        dateOfBirth: data.date_of_birth
      });
      setEditFormData({ // Initialize edit form data
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        dateOfBirth: data.date_of_birth
      });

      // Notify parent (Dashboard) about the updated user info for the header
      if (onProfileUpdate) {
        onProfileUpdate({
          name: `${data.first_name} ${data.last_name || ''}`,
          email: data.email,
          phone: data.phone_number
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
      firstName: userProfileData.firstName,
      lastName: userProfileData.lastName,
      email: userProfileData.email,
    
      dateOfBirth: userProfileData.dateOfBirth
    });
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    // Reset edit form data to the last saved state
    setEditFormData({
      firstName: userProfileData.firstName,
      lastName: userProfileData.lastName,
      email: userProfileData.email,
    
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
      const response = await fetch(`http://localhost:5000/api/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // Update main profile data with the saved data returned from the backend
      setUserProfileData({
        firstName: result.user.first_name,
        lastName: result.user.last_name,
        email: result.user.email,
        dateOfBirth: result.user.date_of_birth
      });

      // Notify parent (Dashboard) about the updated user info for the header
      if (onProfileUpdate) {
        onProfileUpdate({
          name: `${result.user.first_name} ${result.user.last_name || ''}`,
          email: result.user.email,
    
        });
      }

      setIsEditingProfile(false);
      alert('Profile updated successfully!'); // Simple feedback
    } catch (err) {
      console.error("Failed to save profile:", err);
      setError(`Error saving profile: ${err.message || 'Please try again.'}`);
      alert(`Error saving profile: ${err.message || 'Please try again.'}`); // Simple error feedback
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-profile-section">
      <h3 className="section-title">My Profile</h3>
      {loading && <p>Loading profile...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <div className="profile-card">
          {!isEditingProfile ? (
            <>
              <p><strong>First Name:</strong> {userProfileData.firstName}</p>
              <p><strong>Last Name:</strong> {userProfileData.lastName}</p>
              <p><strong>Email:</strong> {userProfileData.email}</p>
              <p><strong>Date of Birth:</strong> {userProfileData.dateOfBirth}</p>
              <button className="edit-button" onClick={handleEditClick}>
                <FaEdit /> Edit Profile
              </button>
            </>
          ) : (
            <form className="profile-edit-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={editFormData.firstName}
                  onChange={handleProfileFormChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={editFormData.lastName}
                  onChange={handleProfileFormChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleProfileFormChange}
                />
              </div>
             
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={editFormData.dateOfBirth}
                  onChange={handleProfileFormChange}
                />
              </div>
              <div className="form-actions">
                <button type="button" className="save-button" onClick={handleSaveProfile} disabled={loading}>
                  <FaSave /> {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button type="button" className="cancel-button" onClick={handleCancelEdit} disabled={loading}>
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