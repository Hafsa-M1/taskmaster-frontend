import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { TaskContext } from '../../context/TaskContext';
import TaskList from '../Task/TaskList';
import CreateTaskModal from '../Task/CreateTaskModal';
import Timer from '../Task/Timer';

const Dashboard = () => {
  const { user, token, logout } = useContext(AuthContext)!;
  const { tasks, loading, fetchTasks } = useContext(TaskContext)!;
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    console.log('Dashboard - Auth state:', { 
      user: user?.email, 
      hasToken: !!token,
      loading 
    });
    
    // Only fetch tasks if we have a valid user and token
    if (user && token && initialLoad) {
      console.log('Dashboard - Fetching tasks for user:', user.email);
      fetchTasks().finally(() => {
        setInitialLoad(false);
      });
    } else if (!user && !loading) {
      // If no user and not loading, redirect to login
      console.log('Dashboard - No user, redirecting to login');
      navigate('/login');
    }
  }, [user, token, loading, initialLoad]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Calculate stats
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTimeSpent = tasks.reduce((total, task) => total + task.timeSpent, 0);
  
  // Format time to hours:minutes:seconds
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  // Show loading state
  if (loading || initialLoad) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Show message if no user (should redirect but as fallback)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please login to access the dashboard</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Welcome back, {user?.name || user?.email?.split('@')[0] || 'User'}! 👋
            </h1>
            <p className="text-gray-600 mt-2">
              Track your productivity and manage your tasks efficiently
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span>+</span>
              <span>New Task</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-blue-600 text-2xl">📋</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Tasks</h3>
                <p className="text-3xl font-bold text-gray-900">{tasks.length}</p>
                <p className="text-gray-500 text-sm mt-2">All your tasks</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-green-600 text-2xl">✅</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Completed</h3>
                <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
                <p className="text-gray-500 text-sm mt-2">{tasks.length > 0 ? `${Math.round((completedTasks / tasks.length) * 100)}% done` : 'Tasks done'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <span className="text-purple-600 text-2xl">⏱️</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Time Tracked</h3>
                <p className="text-3xl font-bold text-blue-600">{formatTime(totalTimeSpent)}</p>
                <p className="text-gray-500 text-sm mt-2">Total time spent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timer Component */}
        <div className="mb-8">
          <Timer />
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Your Tasks</h2>
              <p className="text-gray-600 mt-1">
                {tasks.length} task{tasks.length !== 1 ? 's' : ''} in total
              </p>
            </div>
            <div className="flex items-center gap-3">
              {loading && (
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="h-4 w-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </div>
              )}
            </div>
          </div>

          <TaskList />
        </div>
      </div>

      {/* Create Task Modal */}
      {isCreateModalOpen && (
        <CreateTaskModal onClose={() => setIsCreateModalOpen(false)} />
      )}
    </div>
  );
};

export default Dashboard;