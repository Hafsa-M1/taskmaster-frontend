import React, { useContext, useEffect, useState, useMemo } from 'react';
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
    
    if (user && token && initialLoad) {
      console.log('Dashboard - Fetching tasks for user:', user.email);
      fetchTasks().finally(() => {
        setInitialLoad(false);
      });
    } else if (!user && !loading) {
      console.log('Dashboard - No user, redirecting to login');
      navigate('/login');
    }
  }, [user, token, loading, initialLoad]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Helper function to check if date is today
  const isToday = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  // Helper function to check if date is this week (last 7 days)
  const isThisWeek = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    return date >= oneWeekAgo && date <= today;
  };

  // Calculate productivity stats using useMemo for performance
  const productivityStats = useMemo(() => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - 6); // Last 7 days including today

    let todayCompleted = 0;
    let weekCompleted = 0;
    let todayTime = 0;
    let weekTime = 0;

    tasks.forEach(task => {
      const taskUpdatedAt = new Date(task.updatedAt);
      
      // Check if task was completed today
      if (task.completed && taskUpdatedAt >= todayStart) {
        todayCompleted++;
      }
      
      // Check if task was completed this week
      if (task.completed && taskUpdatedAt >= weekStart) {
        weekCompleted++;
      }
      
      
      // Assume time was tracked today if task was updated today
      if (taskUpdatedAt >= todayStart) {
        todayTime += task.timeSpent;
      }
      
      if (taskUpdatedAt >= weekStart) {
        weekTime += task.timeSpent;
      }
    });

    // Calculate completion rate (tasks completed vs total)
    const completionRate = tasks.length > 0 
      ? Math.round((todayCompleted / tasks.length) * 100) 
      : 0;

    // Calculate average time per task
    const avgTimePerTask = tasks.length > 0 
      ? Math.round(todayTime / tasks.length) 
      : 0;

    return {
      todayCompleted,
      weekCompleted,
      todayTime,
      weekTime,
      completionRate,
      avgTimePerTask
    };
  }, [tasks]);

  // Calculate basic stats
  const completedTasks = tasks.filter(task => task.completed).length;
  
  const totalTimeSpent = tasks.reduce((total, task) => {
    const time = Number(task.timeSpent) || 0;
    return total + time;
  }, 0);
  
  // Format time to a more readable format
  const formatTime = (seconds: number) => {
    const totalSeconds = Math.floor(seconds);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  // Format time with hours only (for large numbers)
  const formatHours = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  // Calculate productivity percentage
  const productivityPercentage = tasks.length > 0 
    ? Math.round((completedTasks / tasks.length) * 100) 
    : 0;

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

        {/* Stats Cards - Now 6 cards in 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Row 1 */}
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
                <p className="text-gray-500 text-sm mt-2">
                  {tasks.length > 0 ? `${productivityPercentage}% done` : 'Tasks done'}
                </p>
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

          {/* Row 2 - Productivity Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <span className="text-amber-600 text-2xl">📅</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Today's Progress</h3>
                <p className="text-3xl font-bold text-amber-600">{productivityStats.todayCompleted}</p>
                <p className="text-gray-500 text-sm mt-2">
                  {formatTime(productivityStats.todayTime)} tracked today
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-cyan-100 rounded-lg">
                <span className="text-cyan-600 text-2xl">📊</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">This Week</h3>
                <p className="text-3xl font-bold text-cyan-600">{productivityStats.weekCompleted}</p>
                <p className="text-gray-500 text-sm mt-2">
                  {formatHours(productivityStats.weekTime)} tracked this week
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-pink-100 rounded-lg">
                <span className="text-pink-600 text-2xl">📈</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Completion Rate</h3>
                <p className="text-3xl font-bold text-pink-600">{productivityStats.completionRate}%</p>
                <p className="text-gray-500 text-sm mt-2">
                  {tasks.length > 0 ? `${productivityStats.todayCompleted}/${tasks.length} tasks today` : 'No tasks'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Productivity Insights Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Productivity Insights</h2>
              <p className="text-gray-600 mt-1">
                Your performance overview for today and this week
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-green-600">✅</span>
                </div>
                <h3 className="font-medium text-gray-700">Daily Completion</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">{productivityStats.todayCompleted} tasks</p>
              <p className="text-sm text-gray-500">Completed today</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <span className="text-blue-600">⏱️</span>
                </div>
                <h3 className="font-medium text-gray-700">Daily Focus Time</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatTime(productivityStats.todayTime)}</p>
              <p className="text-sm text-gray-500">Tracked today</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <span className="text-purple-600">📊</span>
                </div>
                <h3 className="font-medium text-gray-700">Weekly Progress</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">{productivityStats.weekCompleted} tasks</p>
              <p className="text-sm text-gray-500">Completed this week</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <span className="text-amber-600">⚡</span>
                </div>
                <h3 className="font-medium text-gray-700">Weekly Focus</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatHours(productivityStats.weekTime)}</p>
              <p className="text-sm text-gray-500">Tracked this week</p>
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
                {tasks.length} task{tasks.length !== 1 ? 's' : ''} in total • {formatTime(totalTimeSpent)} tracked
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