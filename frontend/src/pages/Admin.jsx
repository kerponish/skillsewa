import React, { useState, useEffect } from 'react';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [tasksRes, workersRes, statsRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/tasks'),
        fetch('http://localhost:5000/api/admin/workers'),
        fetch('http://localhost:5000/api/admin/stats')
      ]);

      const tasksData = await tasksRes.json();
      const workersData = await workersRes.json();
      const statsData = await statsRes.json();

      setTasks(tasksData);
      setWorkers(workersData);
      setStats(statsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleAssignWorker = async () => {
    if (!selectedTask || !selectedWorker) return;

    try {
      const response = await fetch('http://localhost:5000/api/admin/assign-worker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskId: selectedTask.id,
          workerId: selectedWorker
        })
      });

      if (response.ok) {
        alert('Worker assigned successfully!');
        setShowAssignModal(false);
        setSelectedTask(null);
        setSelectedWorker('');
        fetchData(); // Refresh data
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to assign worker');
      }
    } catch (error) {
      console.error('Error assigning worker:', error);
      alert('Failed to assign worker');
    }
  };

  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/tasks/${taskId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        alert('Task status updated successfully!');
        fetchData(); // Refresh data
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'assigned': return 'status-assigned';
      case 'doing': return 'status-doing';
      case 'completed': return 'status-completed';
      default: return 'status-pending';
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading...</div>;
  }

  return (
    <div className="admin-container">
      {/* Bento Grid Background Elements */}
      <div className="bento-element-1"></div>
      <div className="bento-element-2"></div>
      <div className="bento-element-3"></div>
      <div className="bento-element-4"></div>

      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-subtitle">Manage Tasks & Workers</p>
      </div>

      {/* Stats Cards */}
      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p>{stats.totalTasks || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p>{stats.pendingTasks || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Assigned</h3>
          <p>{stats.assignedTasks || 0}</p>
        </div>
        <div className="stat-card">
          <h3>In Progress</h3>
          <p>{stats.doingTasks || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p>{stats.completedTasks || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Workers</h3>
          <p>{stats.totalWorkers || 0}</p>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="admin-section">
        <h2 className="section-title">All Tasks</h2>
        <div className="tasks-grid">
          {tasks.map((task) => (
            <div key={task.id} className="task-card">
              <div className="task-header">
                <h3>{task.title}</h3>
                <span className={`status-badge ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
              </div>
              <p className="task-description">{task.description}</p>
              <div className="task-details">
                <p><strong>Price:</strong> ${task.price}</p>
                <p><strong>Skills:</strong> {task.skillsRequired}</p>
                <p><strong>Location:</strong> {task.location}</p>
                <p><strong>Requested by:</strong> {task.requester?.firstname} {task.requester?.secondname}</p>
                {task.assignedWorker && (
                  <p><strong>Assigned to:</strong> {task.assignedWorker.firstname} {task.assignedWorker.secondname}</p>
                )}
              </div>
              <div className="task-actions">
                <button 
                  className="assign-btn"
                  onClick={() => {
                    setSelectedTask(task);
                    setShowAssignModal(true);
                  }}
                >
                  Assign Worker
                </button>
                <div className="status-actions">
                  <button 
                    className="status-btn"
                    onClick={() => handleUpdateStatus(task.id, 'pending')}
                    disabled={task.status === 'pending'}
                  >
                    Pending
                  </button>
                  <button 
                    className="status-btn"
                    onClick={() => handleUpdateStatus(task.id, 'assigned')}
                    disabled={task.status === 'assigned'}
                  >
                    Assigned
                  </button>
                  <button 
                    className="status-btn"
                    onClick={() => handleUpdateStatus(task.id, 'doing')}
                    disabled={task.status === 'doing'}
                  >
                    Doing
                  </button>
                  <button 
                    className="status-btn"
                    onClick={() => handleUpdateStatus(task.id, 'completed')}
                    disabled={task.status === 'completed'}
                  >
                    Completed
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assign Worker Modal */}
      {showAssignModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Assign Worker to Task</h3>
            <p><strong>Task:</strong> {selectedTask?.title}</p>
            <select 
              value={selectedWorker} 
              onChange={(e) => setSelectedWorker(e.target.value)}
              className="worker-select"
            >
              <option value="">Select a worker</option>
              {workers.map((worker) => (
                <option key={worker.id} value={worker.id}>
                  {worker.User?.firstname} {worker.User?.secondname} - {worker.skills}
                </option>
              ))}
            </select>
            <div className="modal-actions">
              <button onClick={handleAssignWorker} className="confirm-btn">
                Assign Worker
              </button>
              <button onClick={() => setShowAssignModal(false)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin; 