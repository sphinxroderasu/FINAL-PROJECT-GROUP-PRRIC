import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const username = localStorage.getItem('username');
  const canCreateTicket = ['supervisor1', 'officer1', 'junior1o'].includes(username);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login';
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white shadow">
      <div className="space-x-4">
        <Link to="/tickets" className="hover:text-blue-300 transition">
          Tickets
        </Link>

        {canCreateTicket && (
          <Link
            to="/create-ticket"
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded transition"
          >
            Create Ticket
          </Link>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {username && (
          <span className="text-sm">
            Logged in as <strong className="text-blue-300">{username}</strong>
          </span>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
