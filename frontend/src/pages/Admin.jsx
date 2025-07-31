import React, { useState, useEffect } from 'react';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminDashboard from '../components/admin/AdminDashboard';
import ManageTasks from '../components/admin/ManageTasks';
import ManageWorkers from '../components/admin/ManageWorkers';
import ManageUsers from '../components/admin/ManageUsers';
import './Admin.css';

const Admin = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalWorkers: 0,
    totalTasks: 0
  });
  const [tasks, setTasks] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingWorker, setEditingWorker] = useState(null);
  const [showAddWorker, setShowAddWorker] = useState(false);
  const [editForm, setEditForm] = useState({
    skills: '',
    experience: '',
    hourlyRate: '',
    availability: ''
  });
  const [newWorkerForm, setNewWorkerForm] = useState({
    firstname: '',
    secondname: '',
    email: '',
    phone: '',
    skills: '',
    location: '',
    hourlyRate: '',
    username: '',
    password: ''
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchDashboardData();
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    try {
      const [tasksRes, workersRes, usersRes, statsRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/tasks'),
        fetch('http://localhost:5000/api/admin/workers'),
        fetch('http://localhost:5000/api/admin/users'),
        fetch('http://localhost:5000/api/admin/stats')
      ]);

      const tasksData = await tasksRes.json();
      const workersData = await workersRes.json();
      const usersData = await usersRes.json();
      const statsData = await statsRes.json();

      setTasks(tasksData);
      setWorkers(workersData);
      setUsers(usersData);
      setStats({
        totalUsers: statsData.totalUsers || usersData.length,
        totalWorkers: statsData.totalWorkers || workersData.length,
        totalTasks: statsData.totalTasks || tasksData.length
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleEditWorker = (worker) => {
    setEditingWorker(worker);
    setEditForm({
      skills: worker.skills || '',
      experience: worker.experience || '',
      hourlyRate: worker.hourlyRate || '',
      availability: worker.availability || ''
    });
  };

  const handleUpdateWorker = async (workerId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/workers/${workerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editForm)
      });

      if (response.ok) {
        // Update the worker in the local state
        setWorkers(workers.map(worker => 
          worker.id === workerId 
            ? { ...worker, ...editForm }
            : worker
        ));
        setEditingWorker(null);
        setEditForm({
          skills: '',
          experience: '',
          hourlyRate: '',
          availability: ''
        });
        alert('Worker updated successfully!');
      } else {
        alert('Failed to update worker');
      }
    } catch (error) {
      console.error('Error updating worker:', error);
      alert('Error updating worker');
    }
  };

  const handleCancelEdit = () => {
    setEditingWorker(null);
    setEditForm({
      skills: '',
      experience: '',
      hourlyRate: '',
      availability: ''
    });
  };

  const handleAddWorker = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/workers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newWorkerForm)
      });

      if (response.ok) {
        const result = await response.json();
        setWorkers([...workers, result.worker]);
        setShowAddWorker(false);
        setNewWorkerForm({
          firstname: '',
          secondname: '',
          email: '',
          phone: '',
          skills: '',
          location: '',
          hourlyRate: '',
          username: '',
          password: ''
        });
        alert('Worker added successfully!');
      } else {
        alert('Failed to add worker');
      }
    } catch (error) {
      console.error('Error adding worker:', error);
      alert('Error adding worker');
    }
  };

  const handleCancelAdd = () => {
    setShowAddWorker(false);
    setNewWorkerForm({
      firstname: '',
      secondname: '',
      email: '',
      phone: '',
      skills: '',
      location: '',
      hourlyRate: '',
      username: '',
      password: ''
    });
  };

  const handleAssignWorker = async (taskId, workerId) => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/assign-worker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ taskId, workerId })
      });

      if (response.ok) {
        const result = await response.json();
        // Update the task in the local state
        const assignedWorker = workers.find(w => w.id === workerId);
        setTasks(tasks.map(task => 
          task.id === taskId 
            ? { 
                ...task, 
                assignedTo: workerId, 
                assignedWorker: assignedWorker,
                status: 'assigned' 
              }
            : task
        ));
        alert('Worker assigned successfully!');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to assign worker');
      }
    } catch (error) {
      console.error('Error assigning worker:', error);
      alert('Error assigning worker');
    }
  };

  const handleUpdateTaskStatus = async (taskId, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/tasks/${taskId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        const result = await response.json();
        // Update the task in the local state
        setTasks(tasks.map(task => 
          task.id === taskId 
            ? { ...task, status }
            : task
        ));
        alert('Task status updated successfully!');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to update task status');
      }
    } catch (error) {
      console.error('Error updating task status:', error);
      alert('Error updating task status');
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

  const renderDashboard = () => (
    <AdminDashboard 
      stats={stats} 
      tasks={tasks} 
      getStatusColor={getStatusColor} 
    />
  );

  const renderManageTasks = () => (
    <ManageTasks 
      tasks={tasks} 
      workers={workers}
      getStatusColor={getStatusColor}
      onAssignWorker={handleAssignWorker}
      onUpdateStatus={handleUpdateTaskStatus}
    />
  );

  const renderWorkers = () => (
    <ManageWorkers 
      workers={workers}
      editingWorker={editingWorker}
      showAddWorker={showAddWorker}
      editForm={editForm}
      newWorkerForm={newWorkerForm}
      setShowAddWorker={setShowAddWorker}
      setEditForm={setEditForm}
      setNewWorkerForm={setNewWorkerForm}
      handleEditWorker={handleEditWorker}
      handleUpdateWorker={handleUpdateWorker}
      handleCancelEdit={handleCancelEdit}
      handleAddWorker={handleAddWorker}
      handleCancelAdd={handleCancelAdd}
    />
  );

  const renderUsers = () => (
    <ManageUsers users={users} />
  );

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return renderDashboard();
      case 'manage-tasks':
        return renderManageTasks();
      case 'workers':
        return renderWorkers();
      case 'users':
        return renderUsers();
      default:
        return renderDashboard();
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading...</div>;
  }

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <AdminSidebar 
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="admin-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Admin; 