import React from "react";

// PUBLIC_INTERFACE
function TaskList({ tasks, onEdit, onDelete, onToggleComplete }) {
  /**
   * TaskList component displays the list of tasks.
   * 
   * @param {Array} tasks - Array of task objects.
   * @param {Function} onEdit - Callback for editing a task.
   * @param {Function} onDelete - Callback for deleting a task.
   * @param {Function} onToggleComplete - Callback to toggle completion state of a task.
   * 
   * Returns a minimalistic, responsive list.
   */
  if (!tasks || tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>No tasks added yet.</p>
      </div>
    );
  }
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={`task-list-item ${task.completed ? "completed" : ""}`}>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task)}
              aria-label="Toggle complete"
            />
            <span className={`task-title ${task.completed ? "completed" : ""}`}>
              {task.title}
            </span>
          </label>
          {task.description &&
            <span className="task-desc">{task.description}</span>
          }
          <div className="task-actions">
            <button
              className="edit-btn"
              aria-label="Edit task"
              onClick={() => onEdit(task)}
            >
              ✏️
            </button>
            <button
              className="delete-btn"
              aria-label="Delete task"
              onClick={() => onDelete(task)}
            >
              🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
