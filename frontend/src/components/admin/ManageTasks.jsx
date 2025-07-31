import React, { useState } from 'react';
import './ManageTasks.css';

const ManageTasks = ({ tasks, getStatusColor, workers, onAssignWorker, onUpdateStatus }) => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleAssignWorker = (task) => {
    setSelectedTask(task);
    setSelectedWorker('');
    setShowAssignModal(true);
  };

  const handleUpdateStatus = (task) => {
    setSelectedTask(task);
    setSelectedStatus(task.status);
    setShowStatusModal(true);
  };

  const handleAssignSubmit = async () => {
    if (!selectedWorker) {
      alert('Please select a worker');
      return;
    }

    try {
      await onAssignWorker(selectedTask.id, selectedWorker);
      setShowAssignModal(false);
      setSelectedTask(null);
      setSelectedWorker('');
    } catch (error) {
      console.error('Error assigning worker:', error);
      alert('Failed to assign worker');
    }
  };

  const handleStatusSubmit = async () => {
    if (!selectedStatus) {
      alert('Please select a status');
      return;
    }

    try {
      await onUpdateStatus(selectedTask.id, selectedStatus);
      setShowStatusModal(false);
      setSelectedTask(null);
      setSelectedStatus('');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const getAvailableWorkers = () => {
    return workers.filter(worker => worker.availability === 'available');
  };

  const getAssignedWorkerName = (task) => {
    if (!task.assignedWorker) return 'Not assigned';
    return `${task.assignedWorker.User.firstname} ${task.assignedWorker.User.secondname}`;
  };

  return (
    <div className="admin-main-content">
      <div className="admin-header">
        <h1 className="admin-main-title">Manage Posts (Client Requests)</h1>
      </div>
      <div className="tasks-container">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <div className="task-header">
              <h3 className="task-title">{task.title}</h3>
              <span className={`status-badge ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
            </div>
            <p className="task-description">{task.description}</p>
            <div className="task-details">
              <p><strong>Price:</strong> ${task.price}</p>
              <p><strong>Skills Required:</strong> {task.skillsRequired}</p>
              <p><strong>Location:</strong> {task.location}</p>
              <p><strong>Requested by:</strong> {task.requester?.firstname} {task.requester?.secondname}</p>
              <p><strong>Assigned to:</strong> {getAssignedWorkerName(task)}</p>
            </div>
            <div className="task-actions">
              <button 
                className="action-btn assign-btn"
                onClick={() => handleAssignWorker(task)}
                disabled={task.status === 'completed'}
              >
                {task.assignedTo ? 'Reassign Worker' : 'Assign Worker'}
              </button>
              <button 
                className="action-btn status-btn"
                onClick={() => handleUpdateStatus(task)}
              >
                Update Status
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Assign Worker Modal */}
      {showAssignModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Assign Worker to Task</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAssignModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <h4>Task: {selectedTask?.title}</h4>
              <p><strong>Skills Required:</strong> {selectedTask?.skillsRequired}</p>
              <p><strong>Location:</strong> {selectedTask?.location}</p>
              
              <div className="form-group">
                <label>Select Worker:</label>
                <select 
                  value={selectedWorker} 
                  onChange={(e) => setSelectedWorker(e.target.value)}
                  className="form-select"
                >
                  <option value="">Choose a worker...</option>
                  {getAvailableWorkers().map(worker => (
                    <option key={worker.id} value={worker.id}>
                      {worker.User.firstname} {worker.User.secondname} - {worker.skills} (${worker.hourlyRate}/hr)
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowAssignModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleAssignSubmit}
              >
                Assign Worker
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Status Modal */}
      {showStatusModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Update Task Status</h3>
              <button 
                className="close-btn"
                onClick={() => setShowStatusModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <h4>Task: {selectedTask?.title}</h4>
              
              <div className="form-group">
                <label>Status:</label>
                <select 
                  value={selectedStatus} 
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="form-select"
                >
                  <option value="pending">Pending</option>
                  <option value="assigned">Assigned</option>
                  <option value="doing">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowStatusModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleStatusSubmit}
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTasks; 