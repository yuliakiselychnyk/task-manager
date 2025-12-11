import { createContext, useContext, useEffect, useState } from "react";

const TasksContext = createContext();
export const useTasks = () => useContext(TasksContext);

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Оновлення API",
      due: "2026-04-30",
      user: "Кисельничик Юлія",
      status: "in-progress",
      priority: "high"
    },
    {
      id: 2,
      title: "Тестування застосунку",
      due: "2026-04-22",
      user: "Іваневич Аліна",
      status: "new",
      priority: "medium"
    }
  ]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prev) => [...prev, { id: Date.now(), ...task }]);
  };

  const updateTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
}
