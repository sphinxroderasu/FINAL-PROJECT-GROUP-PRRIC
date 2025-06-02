import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateTicketPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('Low');
  const [status, setStatus] = useState('Open');
  const [departmentId, setDepartmentId] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const username = localStorage.getItem('username')?.toLowerCase();

  useEffect(() => {
    // Set departmentId based on supervisor
    if (username === 'supervisor1') setDepartmentId(1); // IT
    if (username === 'supervisor2') setDepartmentId(2); // HR
    if (username === 'supervisor3') setDepartmentId(3); // Finance
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to submit a ticket.');
      return;
    }

    try {
      await axios.post(
        'https://localhost:62423/api/Tickets',
        {
          title,
          description,
          severity,
          status,
          departmentId: Number(departmentId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      navigate('/tickets');
    } catch (err) {
      console.error('Failed to create ticket:', err);
      if (err.response && err.response.status === 401) {
        setError('Unauthorized. Please log in again.');
      } else {
        setError('Error creating ticket. Please try again.');
      }
    }
  };

  if (error) {
    return <div className="p-6 text-red-600 font-semibold">{error}</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Create Ticket</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Back to Dashboard
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          rows="4"
          required
        />
        <div className="flex space-x-4">
          <div>
            <label className="block font-semibold">Severity</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="p-2 border rounded"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="p-2 border rounded"
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block font-semibold">Department</label>
          <select
            value={departmentId}
            onChange={(e) => setDepartmentId(Number(e.target.value))}
            className="p-2 border rounded w-full"
          >
            <option value={1}>IT</option>
            <option value={2}>HR</option>
            <option value={3}>Finance</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateTicketPage;
