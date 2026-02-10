import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  timeSpent: number;
  createdAt: string;
  updatedAt: string;
}

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (title: string, description?: string) => Promise<Task>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
  updateTaskTime: (id: string, seconds: number) => Promise<Task>;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simple function to get headers with validation
  const getHeaders = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found! User might not be logged in.');
      throw new Error('Please login first');
    }
    
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  const fetchTasks = async () => {
    console.log('TaskContext - fetchTasks called');
    setLoading(true);
    setError(null);
    
    try {
      const headers = getHeaders();
      console.log('TaskContext - Fetching tasks with token...');
      
      const response = await axios.get('http://localhost:3000/tasks', { headers });
      
      // DEBUG: Log the raw response
      console.log('TaskContext - Raw tasks response:', response.data);
      
      // Ensure all timeSpent values are numbers
      const tasksWithNumbers = response.data.map((task: any) => ({
        ...task,
        timeSpent: Number(task.timeSpent) || 0,
      }));
      
      console.log('TaskContext - Tasks with converted numbers:', tasksWithNumbers);
      
      setTasks(tasksWithNumbers);
    } catch (error: any) {
      console.error('TaskContext - Failed to fetch tasks:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      
      setError(error.response?.data?.message || 'Failed to fetch tasks');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (title: string, description?: string) => {
    setError(null);
    try {
      const headers = getHeaders();
      console.log('TaskContext - Creating task:', title);
      
      const response = await axios.post('http://localhost:3000/tasks', 
        { title, description },
        { headers }
      );
      const newTask = response.data;
      console.log('TaskContext - Task created:', newTask);
      setTasks(prev => [newTask, ...prev]);
      return newTask;
    } catch (error: any) {
      console.error('TaskContext - Failed to create task:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Failed to create task');
      throw error;
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    setError(null);
    try {
      const headers = getHeaders();
      const response = await axios.put(`http://localhost:3000/tasks/${id}`, 
        updates,
        { headers }
      );
      const updatedTask = response.data;
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ));
      return updatedTask;
    } catch (error: any) {
      console.error('TaskContext - Failed to update task:', error);
      setError(error.response?.data?.message || 'Failed to update task');
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    setError(null);
    try {
      const headers = getHeaders();
      await axios.delete(`http://localhost:3000/tasks/${id}`, { headers });
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (error: any) {
      console.error('TaskContext - Failed to delete task:', error);
      setError(error.response?.data?.message || 'Failed to delete task');
      throw error;
    }
  };

  const updateTaskTime = async (id: string, seconds: number) => {
    setError(null);
    try {
      const headers = getHeaders();
      
      // Get the task before updating to show in toast
      const taskToUpdate = tasks.find(task => task.id === id);
      const previousTime = taskToUpdate?.timeSpent || 0;
      
      console.log('TaskContext - Updating task time:', {
        taskId: id,
        secondsToAdd: seconds,
        previousTime,
        newTotal: previousTime + seconds
      });
      
      const response = await axios.post(`http://localhost:3000/tasks/${id}/timer`, 
        { seconds },
        { headers }
      );
      
      const updatedTask = response.data;
      
      // Log the response to debug
      console.log('TaskContext - Backend response:', updatedTask);
      
      // Ensure timeSpent is a number in the updated task
      const updatedTaskWithNumber = {
        ...updatedTask,
        timeSpent: Number(updatedTask.timeSpent) || 0,
      };
      
      // Update local state with the converted number
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTaskWithNumber : task
      ));
      
      return updatedTaskWithNumber;
    } catch (error: any) {
      console.error('TaskContext - Failed to update task time:', {
        error: error.message,
        response: error.response?.data
      });
      
      const errorMessage = error.response?.data?.message || 'Failed to update task time';
      setError(errorMessage);
      throw error;
    }
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      loading,
      error,
      fetchTasks,
      createTask,
      updateTask,
      deleteTask,
      updateTaskTime,
    }}>
      {children}
    </TaskContext.Provider>
  );
};