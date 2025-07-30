
import React, { useState, useEffect } from 'react';
import './AddPost.css';
import { FaPlus, FaTimes } from 'react-icons/fa'; 
import { useUser } from '../UserContext';

const AddPost = ({ isOpen, onClose, onSubmit }) => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    skillsRequired: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get the current userId from context
  const userId = user && user.userId;

  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: '',
        description: '',
        price: '',
        skillsRequired: '',
        location: ''
      });
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Check if userId is available
    if (!userId) {
      setError("User not authenticated. Please login again.");
      setLoading(false);
      return;
    }

    // Basic validation
    if (!formData.title || !formData.description || !formData.price || !formData.skillsRequired || !formData.location) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      // Prepare the post data
      const postData = {
        ...formData,
        requestedBy: userId,
        status: 'pending'
      };
      
      console.log('Submitting post data:', postData);
      
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add request');
      }
      
      const newPost = await response.json();
      console.log('Post created successfully:', newPost);
      
      if (onSubmit) onSubmit(newPost.data); // Pass the new post data up
      onClose();
    } catch (err) {
      console.error("Error submitting request:", err);
      setError(err.message || "Failed to add request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="add-post-modal-overlay">
      <div className="add-post-modal-content">
        <h2 className="add-post-title">Add a request</h2> {/* Main title */}
        {error && <p className="error-message">{error}</p>}
        <form className="add-post-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="title"
              placeholder="Title goes here"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <textarea
              name="description"
              placeholder="description..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="price-skills-group">
            <div className="form-group half-width">
              <input
                type="text"
                name="price"
                placeholder="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group half-width">
              <input
                type="text"
                name="skillsRequired"
                placeholder="skills required"
                value={formData.skillsRequired}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="add-button" disabled={loading}>
              <FaPlus />
            </button>
          </div>
        </form>
        <button className="close-modal-btn" onClick={onClose}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default AddPost;