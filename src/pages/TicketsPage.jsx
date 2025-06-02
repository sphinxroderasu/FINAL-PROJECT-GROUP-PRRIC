import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const departmentNames = {
  1: 'IT',
  2: 'HR',
  3: 'Finance',
};

const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.warn('No token found. User may not be logged in.');
        setError('Authentication token missing. Please log in.');
        return;
      }

      try {
        const response = await axios.get('https://localhost:62423/api/Tickets/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTickets(response.data);
      } catch (err) {
        console.error('Failed to fetch tickets:', err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          setError('Unauthorized. Please log in again.');
        } else if (err.response?.status === 400) {
          setError('Bad request. Please check API access.');
        } else {
          setError('Failed to load tickets. Please try again later.');
        }
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Tickets</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <div className="grid gap-4">
        {tickets.map((ticket) => (
          <Link
            key={ticket.id}
            to={`/tickets/${ticket.id}`}
            className="block p-4 bg-white shadow rounded hover:bg-gray-100"
          >
            <h2 className="font-semibold text-lg">{ticket.title}</h2>
            <p className="text-sm">
              Status: {ticket.status} | Severity: {ticket.severity}
            </p>
            <p className="text-sm text-gray-600">
              Department: {departmentNames[ticket.departmentId] || 'Unknown'}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
