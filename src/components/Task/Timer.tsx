import React, { useState, useEffect, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import toast from 'react-hot-toast';

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
      toast.error('Please select a task first');
      return;
    }
    setIsRunning(true);
    toast.success('Timer started!', {
      icon: '⏱️',
    });
  };

  const handleStop = async () => {
    setIsRunning(false);
    
    if (selectedTaskId && seconds > 0) {
      try {
        const selectedTask = tasks.find(t => t.id === selectedTaskId);
        if (selectedTask) {
          await updateTaskTime(selectedTaskId, seconds);
          toast.success(`Added ${formatTimeForToast(seconds)} to "${selectedTask.title}"`, {
            icon: '✅',
            duration: 4000,
          });
          setSeconds(0);
        }
      } catch (error) {
        console.error('Failed to update task time:', error);
        toast.error('Failed to save time');
      }
    } else if (seconds === 0) {
      toast('Timer was not running', {
        icon: '⏸️',
      });
    }
  };

  const handleReset = () => {
    if (seconds > 0) {
      if (window.confirm('Are you sure you want to reset the timer? This will lose all unsaved time.')) {
        setSeconds(0);
        setIsRunning(false);
        toast('Timer reset', {
          icon: '↺',
        });
      }
    } else {
      setSeconds(0);
      setIsRunning(false);
    }
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTimeForToast = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  // Get selected task for display
  const selectedTask = selectedTaskId ? tasks.find(t => t.id === selectedTaskId) : null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Time Tracker ⏱️</h2>
      
      <div className="space-y-6">
        {/* Task Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Task to Track
          </label>
          <select
            value={selectedTaskId || ''}
            onChange={(e) => {
              if (isRunning) {
                toast.error('Please stop the timer before changing tasks');
                return;
              }
              setSelectedTaskId(e.target.value || null);
              setSeconds(0);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isRunning}
          >
            <option value="">-- Select a task --</option>
            {tasks.filter(task => !task.completed).map(task => (
              <option key={task.id} value={task.id}>
                {task.title}
              </option>
            ))}
            {tasks.filter(task => task.completed).length > 0 && (
              <optgroup label="Completed Tasks">
                {tasks.filter(task => task.completed).map(task => (
                  <option key={task.id} value={task.id}>
                    {task.title} ✓
                  </option>
                ))}
              </optgroup>
            )}
          </select>
          {selectedTaskId && tasks.find(t => t.id === selectedTaskId)?.completed && (
            <p className="text-amber-600 text-sm mt-1">
              Note: This task is marked as completed
            </p>
          )}
        </div>

        {/* Timer Display */}
        <div className="text-center">
          <div className="text-5xl md:text-6xl font-mono font-bold text-gray-900 mb-4">
            {formatTime(seconds)}
          </div>
          <div className="flex justify-center gap-4 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              isRunning 
                ? 'bg-green-100 text-green-800 animate-pulse' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {isRunning ? '⏵ Timer Running' : '⏸ Timer Stopped'}
            </span>
            {selectedTask && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {selectedTask.timeSpent ? formatTimeForToast(selectedTask.timeSpent) : '0s'} tracked
              </span>
            )}
          </div>
        </div>

        {/* Timer Controls */}
        <div className="flex justify-center gap-4">
          {!isRunning ? (
            <button
              onClick={handleStart}
              disabled={!selectedTaskId}
              className={`px-8 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                selectedTaskId 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>▶</span>
              <span>Start Timer</span>
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all flex items-center gap-2"
            >
              <span>⏸</span>
              <span>Stop & Save</span>
            </button>
          )}
          
          <button
            onClick={handleReset}
            disabled={isRunning}
            className={`px-8 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
              isRunning
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            <span>↺</span>
            <span>Reset</span>
          </button>
        </div>

        {/* Instructions */}
        <div className="text-sm text-gray-500 mt-4">
          <p className="mb-1">💡 <strong>How to use:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Select a task from the dropdown</li>
            <li>Click "Start Timer" to begin tracking time</li>
            <li>Click "Stop & Save" to add tracked time to the task</li>
            <li>You can track time for multiple sessions - they will accumulate</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Timer;