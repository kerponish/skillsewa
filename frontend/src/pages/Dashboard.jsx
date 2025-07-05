import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [submittedTasks, setSubmittedTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) navigate("/login");
  }, [navigate]);

  const workers = {
    Electrician: ["Ram Sharma", "Sita Electric Works", "Bikash Power Pro"],
    Plumber: ["Kiran Pipes & Co.", "Laxmi Plumbing", "Nabin FixIt"],
    Carpenter: ["WoodMaster Nepal", "Raju Furniture", "Kamal Interiors"]
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedTasks([...submittedTasks, { task, category }]);
    setTask("");
    setCategory("");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <button className="logout-button" onClick={handleLogout}>Logout</button>

      <form onSubmit={handleSubmit} className="task-form">
        <label htmlFor="task">Task Description</label>
        <input
          id="task"
          type="text"
          placeholder="e.g., Fix wiring in kitchen"
          value={task}
          onChange={e => setTask(e.target.value)}
          required
        />

        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        >
          <option value="">-- Choose --</option>
          <option value="Electrician">Electrician</option>
          <option value="Plumber">Plumber</option>
          <option value="Carpenter">Carpenter</option>
        </select>

        <button type="submit" className="submit-button">Request</button>
      </form>

      <h3>Submitted Tasks:</h3>
      <ul className="tasks-list">
        {submittedTasks.map((t, idx) => (
          <li key={idx} className="task-item">
            <strong>{t.task}</strong> ({t.category})
            <div><em>Recommended Workers:</em></div>
            <ul className="worker-list">
              {workers[t.category]?.map((worker, i) => (
                <li key={i}>{worker}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
