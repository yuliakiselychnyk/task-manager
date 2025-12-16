import { createContext, useContext, useEffect, useState } from "react";

const TasksContext = createContext();
export const useTasks = () => useContext(TasksContext);

const DEFAULT_TASKS = [
  {
    id: 1,
    title: "Оновлення API",
    description: "Оновити backend API",
    deadline: "2026-04-30",
    user: "Кіселичник Юлія",
    status: "completed",
    priority: "high",
    createdAt: "2026-04-01",
    completedAt: "2026-04-03",
  },
  {
    id: 2,
    title: "Тестування застосунку",
    description: "Перевірити основні сценарії",
    deadline: "2026-04-22",
    user: "Іваневич Аліна",
    status: "completed",
    priority: "medium",
    createdAt: "2026-04-02",
    completedAt: "2026-04-05",
  },
];

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : DEFAULT_TASKS;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        status: "new",
        priority: "medium",
        createdAt: new Date().toISOString(),
        completedAt: null,
        ...task,
      },
    ]);
  };

  const updateTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;

        // якщо задачу завершили — фіксуємо дату
        if (updates.status === "completed" && !t.completedAt) {
          return {
            ...t,
            ...updates,
            completedAt: new Date().toISOString(),
          };
        }

        return { ...t, ...updates };
      })
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
