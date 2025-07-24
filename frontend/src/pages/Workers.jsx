import React, { useEffect, useState } from 'react';
import './Workers.css';

const Workers = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/api/workers/');
        if (!response.ok) throw new Error('Failed to fetch workers');
        const data = await response.json();
        setWorkers(data);
      } catch (err) {
        setError('Could not load workers.');
      } finally {
        setLoading(false);
      }
    };
    fetchWorkers();
  }, []);

  return (
    <div className="workers-container">
      <h1 className="workers-main-title">All Workers</h1>
      {loading && <p className="loading-message">Loading workers...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <div className="workers-list">
          {workers.length === 0 ? (
            <p className="no-workers-message">No workers found.</p>
          ) : (
            workers.map(worker => (
              <div className="worker-card" key={worker.id}>
                <div className="worker-info-row">
                  <span className="worker-label">Name:</span>
                  <span>{worker.name || worker.fullName || worker.username || '-'}</span>
                </div>
                <div className="worker-info-row">
                  <span className="worker-label">Skill:</span>
                  <span>{worker.skill || worker.skills || '-'}</span>
                </div>
                <div className="worker-info-row">
                  <span className="worker-label">Number:</span>
                  <span>{worker.number || worker.phone || '-'}</span>
                </div>
                {worker.location && (
                  <div className="worker-info-row">
                    <span className="worker-label">Location:</span>
                    <span>{worker.location}</span>
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

export default Workers; 