import React, { useState, useEffect, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';

const Timer: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const { tasks, updateTaskTime } = useContext(TaskContext)!;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && selectedTaskId) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, selectedTaskId]);

  const handleStart = () => {
    if (!selectedTaskId) {
      alert('Please select a task first');
      return;
    }
    setIsRunning(true);
  };

  const handleStop = async () => {
    setIsRunning(false);
    
    if (selectedTaskId && seconds > 0) {
      try {
        await updateTaskTime(selectedTaskId, seconds);
        setSeconds(0);
      } catch (error) {
        console.error('Failed to update task time:', error);
      }
    }
  };

  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Time Tracker</h2>
      
      <div className="space-y-6">
        {/* Task Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Task to Track
          </label>
          <select
            value={selectedTaskId || ''}
            onChange={(e) => setSelectedTaskId(e.target.value || null)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isRunning}
          >
            <option value="">-- Select a task --</option>
            {tasks.map(task => (
              <option key={task.id} value={task.id}>
                {task.title} {task.completed ? '(Completed)' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Timer Display */}
        <div className="text-center">
          <div className="text-5xl md:text-6xl font-mono font-bold text-gray-900 mb-4">
            {formatTime(seconds)}
          </div>
          <p className="text-gray-500 mb-6">
            {isRunning ? 'Timer is running...' : 'Timer is stopped'}
          </p>
        </div>

        {/* Timer Controls */}
        <div className="flex justify-center gap-4">
          {!isRunning ? (
            <button
              onClick={handleStart}
              disabled={!selectedTaskId}
              className={`px-8 py-3 rounded-lg font-medium transition-all ${
                selectedTaskId 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Start Timer
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all"
            >
              Stop & Save
            </button>
          )}
          
          <button
            onClick={handleReset}
            className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-all"
          >
            Reset
          </button>
        </div>

        {/* Selected Task Info */}
        {selectedTaskId && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-1">Currently Tracking:</h3>
            <p className="text-blue-600">
              {tasks.find(t => t.id === selectedTaskId)?.title}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;