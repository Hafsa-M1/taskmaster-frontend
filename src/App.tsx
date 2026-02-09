import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext'; // Add AuthProvider import
import { TaskProvider } from './context/TaskContext';

import Landing from './components/Landing/Landing';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useContext(AuthContext);

  // Handle loading state
  if (auth?.loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
  }

  // If no token → redirect to login
  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated → render children
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <AuthProvider>
          <TaskProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected route */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all (404) → redirect to landing or login */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </TaskProvider>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;