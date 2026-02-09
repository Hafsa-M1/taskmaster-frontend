import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import TaskItem from './TaskItem';

const TaskList: React.FC = () => {
  const { tasks, loading } = useContext(TaskContext)!;

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-500">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
          <span className="text-4xl">📝</span>
        </div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">No tasks yet</h3>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          Start by creating your first task. Track time, mark progress, and boost your productivity!
        </p>
        <div className="text-sm text-gray-500">
          Tip: Click "New Task" button above to get started
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;