const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

/**
 * Helper to handle API errors and parse backend error messages, if any.
 * Throws on failed responses with an error containing details.
 */
async function handleResponse(res) {
  let data;
  try {
    data = await res.json();
  } catch {
    data = undefined;
  }
  if (!res.ok) {
    const apiError = (data && data.detail) || res.statusText || "API Error";
    const error = new Error(apiError);
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data;
}

// PUBLIC_INTERFACE
export async function getTasks() {
  /**
   * Fetches all tasks from API.
   * Returns: Array of tasks.
   */
  const res = await fetch(`${API_URL}/tasks`);
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export async function createTask(task) {
  /**
   * Creates a new task via POST /tasks, expects {title, description?, completed?}.
   * Returns: Created task object from API.
   */
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export async function updateTask(task) {
  /**
   * Updates an existing task by ID.
   * Returns: Updated task object.
   */
  const res = await fetch(`${API_URL}/tasks/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export async function deleteTask(taskId) {
  /**
   * Deletes a task by ID.
   */
  const res = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export async function getTaskById(taskId) {
  /**
   * Fetches a single task by ID.
   */
  const res = await fetch(`${API_URL}/tasks/${taskId}`);
  return handleResponse(res);
}
