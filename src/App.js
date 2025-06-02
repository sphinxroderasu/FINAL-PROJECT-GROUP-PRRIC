import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import TicketsPage from './pages/TicketsPage';
import TicketDetailsPage from './pages/TicketDetailsPage';
import CreateTicketPage from './pages/CreateTicketPage';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';

const MainLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/tickets"
        element={
          <PrivateRoute>
            <MainLayout>
              <TicketsPage />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/tickets/:id"
        element={
          <PrivateRoute>
            <MainLayout>
              <TicketDetailsPage />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/create-ticket"
        element={
          <PrivateRoute>
            <MainLayout>
              <CreateTicketPage />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
