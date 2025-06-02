import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://localhost:62423/api/Auth/login', {
        email,        // ✅ Match the expected DTO field
        password      // ✅ Match the expected DTO field
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', email.split('@')[0]); // Store username for display
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid login credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">Helpdesk Ticketing System</h1>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
