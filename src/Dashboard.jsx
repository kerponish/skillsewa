import React, { useState } from "react";

export default function TaskForm() {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [submittedTasks, setSubmittedTasks] = useState([]);

  // 🧑‍🔧 Hardcoded worker database
  const workers = {
    Electrician: ["Ram Sharma", "Sita Electric Works", "Bikash Power Pro"],
    Plumber: ["Kiran Pipes & Co.", "Laxmi Plumbing", "Nabin FixIt"],
    Carpenter: ["WoodMaster Nepal", "Raju Furniture", "Kamal Interiors"]
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { task, category };
    setSubmittedTasks([...submittedTasks, newTask]);
    setTask("");
    setCategory("");
  };

  return (
    <div>
      <form className="task-form" onSubmit={handleSubmit}>
        <label htmlFor="task">Task Description</label>
        <input
          type="text"
          id="task"
          value={task}
          placeholder="e.g., Fix wiring in kitchen"
          onChange={(e) => setTask(e.target.value)}
          required
        />

        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">--Choose--</option>
          <option value="Electrician">Electrician</option>
          <option value="Plumber">Plumber</option>
          <option value="Carpenter">Carpenter</option>
        </select>

        <button type="submit">Request</button>
      </form>

      <h3>Submitted Tasks:</h3>
      <ul>
        {submittedTasks.map((t, index) => (
          <li key={index}>
            <strong>{t.task}</strong> ({t.category})
            <br />
            <em>Recommended Workers:</em>
            <ul>
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
