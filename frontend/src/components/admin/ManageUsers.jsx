import React from 'react';
import './ManageUsers.css';

const ManageUsers = ({ users }) => {
  return (
    <div className="admin-main-content">
      <div className="admin-header">
        <h1 className="admin-main-title">Manage Users</h1>
      </div>
      <div className="users-container">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.firstname} {user.secondname}</h3>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers; 