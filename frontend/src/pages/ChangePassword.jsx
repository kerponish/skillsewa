import React, { useState } from 'react';
import './ChangePassword.css';
import {
  FaLock, FaEye, FaEyeSlash, FaTimes, FaSave
} from 'react-icons/fa';

const ChangePassword = ({ userId, onClose, onPasswordChanged }) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('All fields are required.');
      return false;
    }
    if (formData.newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New password and confirm password do not match.');
      return false;
    }
    if (formData.oldPassword === formData.newPassword) {
      setError('New password must be different from old password.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/auth/change-password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to change password.');
      }
      
      setSuccess(true);
      setTimeout(() => {
        onClose();
        if (onPasswordChanged) onPasswordChanged();
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password-modal-overlay">
      <div className="change-password-modal-content">
        <h2>Change Password</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Password changed successfully!</p>}
        
        <div className="change-password-form-group">
          <label htmlFor="oldPassword">Old Password:</label>
          <div className="password-input-container">
            <input
              type={showPasswords.oldPassword ? "text" : "password"}
              id="oldPassword"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="Enter your current password"
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => togglePasswordVisibility('oldPassword')}
            >
              {showPasswords.oldPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="change-password-form-group">
          <label htmlFor="newPassword">New Password:</label>
          <div className="password-input-container">
            <input
              type={showPasswords.newPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter your new password"
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => togglePasswordVisibility('newPassword')}
            >
              {showPasswords.newPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="change-password-form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <div className="password-input-container">
            <input
              type={showPasswords.confirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your new password"
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => togglePasswordVisibility('confirmPassword')}
            >
              {showPasswords.confirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="change-password-actions">
          <button className="change-password-btn" onClick={handleSubmit} disabled={loading || success}>
            <FaLock /> {loading ? 'Changing...' : 'Change Password'}
          </button>
          <button className="cancel-btn" onClick={onClose} disabled={loading}>
            <FaTimes /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword; 