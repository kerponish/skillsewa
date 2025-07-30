import React, { useEffect, useState } from 'react';
import './Task.css';
import { useUser } from '../UserContext';

const Task = ({ userId: propUserId }) => {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, completed

  // Use prop if provided, otherwise get from context
  const userId = propUserId || (user && user.userId);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/posts`);
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const data = await response.json();
        // Filter tasks for this user
        const userTasks = data.filter(task => String(task.requestedBy) === String(userId));
        setTasks(userTasks);
      } catch (err) {
        setError('Could not load tasks.');
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchTasks();
  }, [userId]);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'pending') return task.status === 'pending';
    if (filter === 'completed') return task.status === 'completed';
    return true;
  });

  return (
    <div className="task-container">
      <h1 className="task-main-title">My Tasks</h1>
      <div className="task-filter-buttons">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
        <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>Pending</button>
        <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
      </div>
      {loading && <p className="loading-message">Loading tasks...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <p className="no-tasks-message">No tasks found.</p>
          ) : (
            filteredTasks.map(task => (
              <div className={`task-card status-${task.status}`} key={task.id}>
                <div className="task-title-row">
                  <span className="task-title">{task.title}</span>
                  <span className={`task-status ${task.status}`}>{task.status}</span>
                </div>
                <div className="task-details-row">
                  <span className="task-label">Description:</span>
                  <span>{task.description}</span>
                </div>
                <div className="task-details-row">
                  <span className="task-label">Skills Required:</span>
                  <span>{task.skillsRequired}</span>
                </div>
                <div className="task-details-row">
                  <span className="task-label">Location:</span>
                  <span>{task.location}</span>
                </div>
                <div className="task-details-row">
                  <span className="task-label">Price:</span>
                  <span>{task.price}</span>
                </div>
                {task.assignedTo && (
                  <div className="task-details-row">
                    <span className="task-label">Assigned To:</span>
                    <span>{task.assignedTo}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Task; 