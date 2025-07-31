import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = ({ stats, tasks, getStatusColor }) => {
  return (
    <div className="admin-main-content">
      <div className="admin-header">
        <h1 className="admin-main-title">SKILLS SEWA</h1>
        <p className="admin-subtitle">तपाईंको सीप आवश्यक हातमा</p>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-number">{stats.totalUsers}</div>
          <div className="stat-label">Numbers Of Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.totalWorkers}</div>
          <div className="stat-label">Numbers Of Workers</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.totalTasks}</div>
          <div className="stat-label">Numbers of Posts</div>
        </div>
      </div>

      <div className="tasks-section">
        <h2 className="section-title">Recent Posts (Client Requests)</h2>
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
                <p><strong>Skills:</strong> {task.skillsRequired}</p>
                <p><strong>Location:</strong> {task.location}</p>
                <p><strong>Requested by:</strong> {task.requester?.firstname} {task.requester?.secondname}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 