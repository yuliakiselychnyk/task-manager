// src/api/tasksApi.js

// GET all tasks
export const getTasks = () => {
  return Promise.resolve([]);
};

// GET task by ID
export const getTaskById = (id) => {
  return Promise.resolve(null);
};

// POST create task
export const createTask = (task) => {
  return Promise.resolve({ ...task, id: Date.now() });
};

// PUT update task
export const updateTaskApi = (id, updates) => {
  return Promise.resolve({ id, ...updates });
};

// DELETE task
export const deleteTaskApi = (id) => {
  return Promise.resolve(true);
};
