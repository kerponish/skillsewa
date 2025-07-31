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
        console.log('Workers data:', data); // Debug log
        setWorkers(data);
      } catch (err) {
        setError('Could not load workers.');
        console.error('Error fetching workers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkers();
  }, []);

  return (
    <div className="workers-container">
      <div className="workers-content">
        {loading && <p className="loading-message">Loading workers...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && (
          <div className="workers-list">
            {workers.length === 0 ? (
              <p className="no-workers-message">No workers found.</p>
            ) : (
              workers.map(worker => (
                <div className="worker-card" key={worker.id}>
                  <div className="worker-title-row">
                    <span className="worker-name">{worker.firstname} {worker.secondname}</span>
                    <span className={`availability-badge ${worker.availability === 'available' ? 'available' : 'unavailable'}`}>
                      {worker.availability || 'N/A'}
                    </span>
                  </div>
                  <div className="worker-details-row">
                    <span className="worker-label">Skills:</span>
                    <span>{worker.skills || 'N/A'}</span>
                  </div>
                  <div className="worker-details-row">
                    <span className="worker-label">Experience:</span>
                    <span>{worker.experience || 'N/A'}</span>
                  </div>
                  <div className="worker-details-row">
                    <span className="worker-label">Hourly Rate:</span>
                    <span>${worker.hourlyRate || 'N/A'}</span>
                  </div>
                  <div className="worker-details-row">
                    <span className="worker-label">Location:</span>
                    <span>{worker.location || 'N/A'}</span>
                  </div>
                  <div className="worker-details-row">
                    <span className="worker-label">Email:</span>
                    <span>{worker.email || 'N/A'}</span>
                  </div>
                  {worker.phone && (
                    <div className="worker-details-row">
                      <span className="worker-label">Phone:</span>
                      <span>{worker.phone}</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Workers; 