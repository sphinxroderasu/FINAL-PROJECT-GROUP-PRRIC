import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, ClipboardList, LogOut } from 'lucide-react';

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login';
  };

  const username = localStorage.getItem('username') || 'Guest';

  return (
    <div className="min-h-screen bg-black text-white p-8 relative">
      {/* Username in top-right corner */}
      <div className="absolute top-4 right-6 text-sm text-gray-300">
        Logged in as: <span className="text-green-400 font-semibold">{username}</span>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-white">
          Welcome to the Helpdesk Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <Link
            to="/create-ticket"
            className="bg-gray-900 border border-green-500 hover:bg-green-600 transition-all p-6 rounded-xl flex flex-col items-center text-center hover:shadow-xl"
          >
            <PlusCircle className="text-green-400 mb-3" size={36} />
            <span className="text-green-200 font-semibold text-lg">Create Ticket</span>
          </Link>

          <Link
            to="/tickets"
            className="bg-gray-900 border border-blue-500 hover:bg-blue-600 transition-all p-6 rounded-xl flex flex-col items-center text-center hover:shadow-xl"
          >
            <ClipboardList className="text-blue-400 mb-3" size={36} />
            <span className="text-blue-200 font-semibold text-lg">View Tickets</span>
          </Link>

          <button
            onClick={handleLogout}
            className="bg-gray-900 border border-red-500 hover:bg-red-600 transition-all p-6 rounded-xl flex flex-col items-center text-center w-full hover:shadow-xl"
          >
            <LogOut className="text-red-400 mb-3" size={36} />
            <span className="text-red-200 font-semibold text-lg">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
