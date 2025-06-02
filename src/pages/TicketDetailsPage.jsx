import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const TicketDetailsPage = () => {
  const { id } = useParams();
  const ticketId = id?.split(':')[0]; // Fix malformed `1:1` ID
  const username = localStorage.getItem('username') || 'unknown';
  const privilegedUsers = ['supervisor1', 'officer1', 'junior1', 'admin'];
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [remarks, setRemarks] = useState([]);
  const [newRemark, setNewRemark] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!ticketId) return;

    const fetchData = async () => {
      try {
        const ticketRes = await axiosInstance.get(`/Tickets/${ticketId}`);
        setTicket(ticketRes.data);

        if (privilegedUsers.includes(username)) {
          const remarksRes = await axiosInstance.get(`/Remarks/${ticketId}`);
          setRemarks(remarksRes.data);
        }
      } catch (err) {
        console.error('Failed to fetch ticket or remarks:', err);
        setError('Could not load ticket details.');
      }
    };

    fetchData();
  }, [ticketId, username]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicket(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setError('');

    if (!['Low', 'Medium', 'High', 'Critical'].includes(ticket.severity)) {
      setError('Severity must be one of: Low, Medium, High, Critical.');
      return;
    }

    if (!['IT', 'HR', 'Finance'].includes(ticket.department)) {
      setError('Please select a valid department.');
      return;
    }

    try {
      const updatePayload = {
        id: ticket.id,
        title: ticket.title,
        description: ticket.description,
        severity: ticket.severity,
        status: ticket.status,
        department: ticket.department,
      };

      await axiosInstance.put(`/Tickets/${ticketId}`, updatePayload);
      alert('Ticket updated successfully');
      navigate('/tickets');
    } catch (err) {
      console.error('Error updating ticket:', err);
      setError('Failed to update ticket. Please try again.');
    }
  };

  const addRemark = async () => {
    if (!newRemark.trim()) return;

    try {
      await axiosInstance.post(`/Remarks`, {
        ticketId: parseInt(ticketId),
        content: newRemark,
        username,
        createdAt: new Date().toISOString()
      });

      setNewRemark('');
      const updated = await axiosInstance.get(`/Remarks/${ticketId}`);
      setRemarks(updated.data);
    } catch (error) {
      console.error('Failed to add remark:', error);
    }
  };

  if (!ticket) return <p className="p-6">Loading...</p>;

  const isValid = ticket.title &&
    ticket.description &&
    ['Low', 'Medium', 'High', 'Critical'].includes(ticket.severity) &&
    ['Open', 'In Progress', 'Resolved', 'Closed'].includes(ticket.status) &&
    ['IT', 'HR', 'Finance'].includes(ticket.department);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ticket Details</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="mb-3">
        <label className="font-semibold">Title:</label>
        <input
          type="text"
          name="title"
          value={ticket.title}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-3">
        <label className="font-semibold">Description:</label>
        <textarea
          name="description"
          value={ticket.description}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          rows="3"
        />
      </div>

      <div className="mb-3">
        <label className="font-semibold">Severity:</label>
        <select
          name="severity"
          value={ticket.severity}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Severity</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="font-semibold">Status:</label>
        <select
          name="status"
          value={ticket.status}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="font-semibold">Department:</label>
        <select
          name="department"
          value={ticket.department}
          onChange={handleInputChange}
          className="w-full p-2 border rounded overflow-y-auto"
        >
          <option value="">Select Department</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </select>
      </div>

      <button
        onClick={handleSave}
        disabled={!isValid}
        className={`${
          isValid
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-gray-400 cursor-not-allowed'
        } text-white px-4 py-2 rounded mb-6`}
      >
        Save Changes
      </button>

      {privilegedUsers.includes(username) && (
        <>
          <h2 className="text-lg font-semibold mb-2">Remarks</h2>
          <ul className="mb-4">
            {remarks.map(r => (
              <li key={r.id} className="border-b py-2">
                <p>{r.content}</p>
                <p className="text-xs text-gray-500">
                  — {r.username} at {new Date(r.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>

          <textarea
            value={newRemark}
            onChange={(e) => setNewRemark(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            rows="3"
            placeholder="Add a remark..."
          />
          <button
            onClick={addRemark}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Remark
          </button>
        </>
      )}
    </div>
  );
};

export default TicketDetailsPage;
