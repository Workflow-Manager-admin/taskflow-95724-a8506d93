import React, { useEffect, useState } from "react";

// PUBLIC_INTERFACE
function TaskEditModal({ show, task, onSave, onClose, saving }) {
  /**
   * TaskEditModal pops up for editing an existing task.
   * 
   * @param {Boolean} show - Controls modal display
   * @param {Object|null} task - Task object to edit
   * @param {Function} onSave - Callback with updated task data
   * @param {Function} onClose - Callback on modal close
   * @param {Boolean} saving - UI loading state
   */
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [error, setError] = useState("");

  useEffect(() => {
    // Reset when task or show state changes
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
    }
  }, [task, show]);

  if (!show) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    setError("");
    onSave({ ...task, title: title.trim(), description: description.trim() });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <h3>Edit Task</h3>
        <form onSubmit={handleSave} className="edit-form">
          <input
            className="task-input"
            type="text"
            placeholder="Task title"
            value={title}
            maxLength={100}
            onChange={e => setTitle(e.target.value)}
            required
            aria-label="Edit Task Title"
          />
          <input
            className="task-input"
            type="text"
            placeholder="Description (optional)"
            value={description}
            maxLength={300}
            onChange={e => setDescription(e.target.value)}
            aria-label="Edit Task Description"
          />
          {error && <div className="task-form-error">{error}</div>}
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskEditModal;
