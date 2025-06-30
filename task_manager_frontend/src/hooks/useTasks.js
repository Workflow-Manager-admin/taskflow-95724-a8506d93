import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001"; // edit if needed

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
  }, []);

  async function fetchTasks() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/tasks`);
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
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
      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error("Failed to create task");
      const newTask = await res.json();
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
      const res = await fetch(`${API_URL}/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error("Failed to update task");
      const updatedTask = await res.json();
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
      const res = await fetch(`${API_URL}/tasks/${task.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete task");
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
