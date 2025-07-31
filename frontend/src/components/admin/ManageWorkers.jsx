import React from 'react';
import './ManageWorkers.css';

const ManageWorkers = ({ 
  workers, 
  editingWorker, 
  showAddWorker, 
  editForm, 
  newWorkerForm,
  setShowAddWorker,
  setEditForm,
  setNewWorkerForm,
  handleEditWorker,
  handleUpdateWorker,
  handleCancelEdit,
  handleAddWorker,
  handleCancelAdd
}) => {
  return (
    <div className="admin-main-content">
      <div className="admin-header">
        <h1 className="admin-main-title">Manage Workers</h1>
        <p className="admin-subtitle">View, edit and update worker information</p>
        <button 
          className="add-worker-btn"
          onClick={() => setShowAddWorker(true)}
        >
          + Add New Worker
        </button>
      </div>
      
      {showAddWorker && (
        <div className="add-worker-modal">
          <div className="add-worker-form">
            <h3>Add New Worker</h3>
            <div className="form-row">
              <div className="edit-form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  value={newWorkerForm.firstname}
                  onChange={(e) => setNewWorkerForm({...newWorkerForm, firstname: e.target.value})}
                  placeholder="First Name"
                />
              </div>
              <div className="edit-form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  value={newWorkerForm.secondname}
                  onChange={(e) => setNewWorkerForm({...newWorkerForm, secondname: e.target.value})}
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="edit-form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={newWorkerForm.email}
                  onChange={(e) => setNewWorkerForm({...newWorkerForm, email: e.target.value})}
                  placeholder="Email"
                />
              </div>
              <div className="edit-form-group">
                <label>Phone:</label>
                <input
                  type="tel"
                  value={newWorkerForm.phone}
                  onChange={(e) => setNewWorkerForm({...newWorkerForm, phone: e.target.value})}
                  placeholder="Phone Number"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="edit-form-group">
                <label>Skills:</label>
                <input
                  type="text"
                  value={newWorkerForm.skills}
                  onChange={(e) => setNewWorkerForm({...newWorkerForm, skills: e.target.value})}
                  placeholder="Skills (e.g., Plumbing, Electrical)"
                />
              </div>
              <div className="edit-form-group">
                <label>Location:</label>
                <input
                  type="text"
                  value={newWorkerForm.location}
                  onChange={(e) => setNewWorkerForm({...newWorkerForm, location: e.target.value})}
                  placeholder="Location"
                />
              </div>
            </div>
            <div className="edit-form-group">
              <label>Hourly Rate ($):</label>
              <input
                type="number"
                value={newWorkerForm.hourlyRate}
                onChange={(e) => setNewWorkerForm({...newWorkerForm, hourlyRate: e.target.value})}
                placeholder="Hourly Rate"
              />
            </div>
            <div className="edit-actions">
              <button 
                className="action-btn save-btn"
                onClick={handleAddWorker}
              >
                Add Worker
              </button>
              <button 
                className="action-btn cancel-btn"
                onClick={handleCancelAdd}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="workers-container">
        {workers.map((worker) => (
          <div key={worker.id} className="worker-card">
            {editingWorker?.id === worker.id ? (
              // Edit Mode
              <div className="worker-edit-form">
                <h3>{worker.firstname} {worker.secondname}</h3>
                <div className="edit-form-group">
                  <label>Skills:</label>
                  <input
                    type="text"
                    value={editForm.skills}
                    onChange={(e) => setEditForm({...editForm, skills: e.target.value})}
                    placeholder="Skills"
                  />
                </div>
                <div className="edit-form-group">
                  <label>Experience:</label>
                  <input
                    type="text"
                    value={editForm.experience}
                    onChange={(e) => setEditForm({...editForm, experience: e.target.value})}
                    placeholder="Experience"
                  />
                </div>
                <div className="edit-form-group">
                  <label>Hourly Rate:</label>
                  <input
                    type="number"
                    value={editForm.hourlyRate}
                    onChange={(e) => setEditForm({...editForm, hourlyRate: e.target.value})}
                    placeholder="Hourly Rate"
                  />
                </div>
                <div className="edit-form-group">
                  <label>Availability:</label>
                  <select
                    value={editForm.availability}
                    onChange={(e) => setEditForm({...editForm, availability: e.target.value})}
                  >
                    <option value="">Select Availability</option>
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </div>
                <div className="edit-actions">
                  <button 
                    className="action-btn save-btn"
                    onClick={() => handleUpdateWorker(worker.id)}
                  >
                    Save Changes
                  </button>
                  <button 
                    className="action-btn cancel-btn"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="worker-info">
                <h3>{worker.firstname} {worker.secondname}</h3>
                <p><strong>Skills:</strong> {worker.skills || 'Not specified'}</p>
                <p><strong>Experience:</strong> {worker.experience || 'Not specified'}</p>
                <p><strong>Hourly Rate:</strong> ${worker.hourlyRate || 'Not specified'}</p>
                <p><strong>Availability:</strong> {worker.availability || 'Not specified'}</p>
                <p><strong>Email:</strong> {worker.email}</p>
                <p><strong>Phone:</strong> {worker.phone || 'Not specified'}</p>
                <div className="worker-actions">
                  <button 
                    className="action-btn edit-btn"
                    onClick={() => handleEditWorker(worker)}
                  >
                    Edit Worker
                  </button>
                  <button 
                    className="action-btn view-btn"
                    onClick={() => alert(`Viewing details for ${worker.firstname} ${worker.secondname}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageWorkers; 