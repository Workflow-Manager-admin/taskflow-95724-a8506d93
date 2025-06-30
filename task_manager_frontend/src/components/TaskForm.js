import React, { useState } from "react";

// PUBLIC_INTERFACE
function TaskForm({ onSubmit, submitting }) {
  /**
   * TaskForm provides the form for creating a new task.
   * 
   * @param {Function} onSubmit - Callback with task {title,description}
   * @param {Boolean} submitting - UI loading state
   */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    setError("");
    onSubmit({ title: title.trim(), description: description.trim() });
    setTitle("");
    setDescription("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} autoComplete="off">
      <input
        className="task-input"
        type="text"
        placeholder="Task title"
        value={title}
        maxLength={100}
        onChange={e => setTitle(e.target.value)}
        required
        aria-label="Task Title"
      />
      <input
        className="task-input"
        type="text"
        placeholder="Description (optional)"
        value={description}
        maxLength={300}
        onChange={e => setDescription(e.target.value)}
        aria-label="Task Description"
      />
      {error && <div className="task-form-error">{error}</div>}
      <button
        className="add-btn"
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
      >
        {submitting ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;
