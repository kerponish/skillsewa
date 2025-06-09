import React from "react";
import { workers } from "./data";

export default function WorkerRecommendations() {
  return (
    <div className="worker-section">
      <h2>🔧 Recommended Workers</h2>
      <ul>
        {workers.map((worker, index) => (
          <li key={index} className="worker-card">
            <h3>{worker.name}</h3>
            <p>Skill: {worker.skill}</p>
            <p>Location: {worker.location}</p>
            <p>Rating: ⭐ {worker.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
