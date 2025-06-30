import { useEffect, useState } from "react";
import {
  getTasks as apiGetTasks,
  createTask as apiCreateTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask
} from "../api";

// PUBLIC_INTERFACE
export function useTasks() {
  /**
   * Custom React hook for global task state + CRUD via REST API.
   * - Fetches tasks on mount.
   * - Provides create, update, delete, toggleComplete actions.
   * Returns { tasks, loading, error, createTask, updateTask, deleteTask, toggleComplete, refreshing }
   */
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all tasks
  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  // PUBLIC_INTERFACE
  async function fetchTasks() {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGetTasks();
      setTasks(data);
    } catch (e) {
      setError(e.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }

  // PUBLIC_INTERFACE
  async function createTask(task) {
    setRefreshing(true);
    setError(null);
    try {
      const newTask = await apiCreateTask(task);
      setTasks(prev => [...prev, newTask]);
    } catch (e) {
      setError(e.message || "Failed to create task");
      throw e;
    } finally {
      setRefreshing(false);
    }
  }

  // PUBLIC_INTERFACE
  async function updateTask(task) {
    setRefreshing(true);
    setError(null);
    try {
      const updatedTask = await apiUpdateTask(task);
      setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    } catch (e) {
      setError(e.message || "Failed to update task");
      throw e;
    } finally {
      setRefreshing(false);
    }
  }

  // PUBLIC_INTERFACE
  async function deleteTask(task) {
    setRefreshing(true);
    setError(null);
    try {
      await apiDeleteTask(task.id);
      setTasks(prev => prev.filter(t => t.id !== task.id));
    } catch (e) {
      setError(e.message || "Failed to delete task");
      throw e;
    } finally {
      setRefreshing(false);
    }
  }

  // PUBLIC_INTERFACE
  async function toggleComplete(task) {
    await updateTask({ ...task, completed: !task.completed });
  }

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
    refreshing,
    refetch: fetchTasks
  };
}
