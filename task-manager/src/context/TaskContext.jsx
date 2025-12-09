// src/context/TaskContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();
export const useTasks = () => useContext(TaskContext);

export function TaskProvider({ children }) {
  // === 1. Ініціалізація з localStorage + НОРМАЛІЗАЦІЯ ===
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    const data = saved ? JSON.parse(saved) : [];

    // Нормалізація структури задач
    return data.map((t) => ({
      id: t.id || Date.now(),
      title: t.title || "",
      description: t.description || "",
      priority: t.priority || "medium",
      completed: !!t.completed,

      createdAt: t.createdAt || new Date().toISOString(),
      updatedAt: t.updatedAt || new Date().toISOString(),

      assignedTo: t.assignedTo ?? null, // підтримка виконавця
    }));
  });

  // === 2. Авто-збереження в localStorage ===
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // === 3. ДОДАТИ ЗАДАЧУ ===
  const addTask = (data) => {
    const newTask = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      priority: data.priority || "medium",
      completed: false,

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),

      // Поки без логіки — прив'язка буде в КРОЦІ 9
      assignedTo: data.assignedTo ?? null,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  // === 4. ОНОВИТИ ЗАДАЧУ ===
  const updateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, ...updatedFields, updatedAt: new Date().toISOString() }
          : t
      )
    );
  };

  // === 5. ПЕРЕМИКАННЯ COMPLETED ===
  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              updatedAt: new Date().toISOString(),
            }
          : t
      )
    );
  };

  // === 6. ВИДАЛИТИ ЗАДАЧУ ===
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        toggleComplete,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
