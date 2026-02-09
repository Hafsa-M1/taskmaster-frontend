import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';

interface TaskItemProps {
  task: {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    timeSpent: number;
    createdAt: string;
    updatedAt: string;
  };
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { updateTask, deleteTask } = useContext(TaskContext)!;

  const handleToggleComplete = async () => {
    try {
      await updateTask(task.id, { completed: !task.completed });
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task.id);
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  return (
    <div className={`border rounded-xl p-5 hover:shadow-lg transition-all duration-200 ${
      task.completed 
        ? 'bg-green-50 border-green-200' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-start gap-4">
            <button
              onClick={handleToggleComplete}
              className={`mt-1 flex-shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${
                task.completed
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300 hover:border-green-400'
              }`}
            >
              {task.completed && (
                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <div className="flex-1">
              <h3 className={`text-lg font-semibold ${
                task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className="text-gray-600 mt-2">{task.description}</p>
              )}
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                <span className="flex items-center gap-1 text-gray-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {formatTime(task.timeSpent)}
                </span>
                <span className="flex items-center gap-1 text-gray-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(task.createdAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric' 
                  })}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  task.completed
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {task.completed ? 'Completed' : 'In Progress'}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={handleDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete task"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;