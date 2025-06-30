import React, { useState, useEffect } from "react";
import "./App.css";
import "./components/TaskList.css";
import "./components/TaskForm.css";
import "./components/TaskEditModal.css";
import { useTasks } from "./hooks/useTasks";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskEditModal from "./components/TaskEditModal";

// PUBLIC_INTERFACE
function App() {
  /**
   * Main application entrypoint - shows the complete task manager UI.
   * Uses global tasks state and coordinates all UI interactions.
   */
  const [theme, setTheme] = useState("light");
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
    refreshing,
  } = useTasks();
  const [editingTask, setEditingTask] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addSubmitting, setAddSubmitting] = useState(false);
  const [editSubmitting, setEditSubmitting] = useState(false);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Handle create
  const handleAddTask = async (task) => {
    setAddSubmitting(true);
    try {
      await createTask({ ...task, completed: false });
    } catch {/* errors surfaced by hook */}
    setAddSubmitting(false);
  };

  // Handle edit
  const handleEditModalOpen = (task) => {
    setEditingTask(task);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async (task) => {
    setEditSubmitting(true);
    try {
      await updateTask(task);
      setEditModalOpen(false);
      setEditingTask(null);
    } catch {/* errors surfaced by hook */}
    setEditSubmitting(false);
  };

  const handleDelete = async (task) => {
    if (window.confirm("Delete this task?")) {
      await deleteTask(task);
    }
  };

  return (
    <div className="App">
      <header className="task-header" style={{ borderBottom: "1px solid var(--border-color)", background: "var(--bg-secondary)" }}>
        <h1
          className="task-title"
          style={{
            color: "#1976d2",
            margin: "0.7em 0 0.1em 0",
            fontWeight: 700,
            fontSize: "2.0rem",
            textAlign: "center",
            letterSpacing: "0.05em",
            lineHeight: 1.2,
            textShadow: "0 1px 0 #fff3"
          }}
        >Task Manager</h1>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </header>
      <main className="main-content">
        {/* Add Task */}
        <section>
          <TaskForm onSubmit={handleAddTask} submitting={addSubmitting} />
        </section>
        {/* Error */}
        {error && <div className="task-error">{error}</div>}
        {/* Task List */}
        <section style={{ margin: "2.2em 0", width: "100%" }}>
          {loading ? (
            <div className="loading-indicator">Loading tasks…</div>
          ) : (
            <TaskList
              tasks={tasks}
              onEdit={handleEditModalOpen}
              onDelete={handleDelete}
              onToggleComplete={toggleComplete}
            />
          )}
        </section>
        {/* Edit Modal */}
        <TaskEditModal
          show={editModalOpen}
          task={editingTask}
          onSave={handleSaveEdit}
          onClose={() => { setEditModalOpen(false); setEditingTask(null); }}
          saving={editSubmitting}
        />
      </main>
      <footer className="footer" style={{
        marginTop: "3em",
        background: "var(--bg-secondary)",
        color: "#424242",
        fontSize: "1em",
        opacity: 0.95,
        padding: "1.2em 0 0.5em 0",
        textAlign: "center",
        letterSpacing: "0.02em",
        borderTop: "1px solid var(--border-color)"
      }}>
        <span style={{ color: "#ff9800" }}>TaskFlow</span>, modern minimalistic task manager &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
