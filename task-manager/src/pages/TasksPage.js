// pages/TasksPage.js
import React, { useState } from "react";
import { useTasks } from "../context/TasksContext";
import "../styles/tasks.css";

export default function TasksPage() {
  const { tasks } = useTasks();
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((t) => {
    if (filter === "all") return true;
    return t.status === filter;
  });

  const getStatusLabel = (status) => {
    switch (status) {
      case "new":
        return "Нове";
      case "in-progress":
        return "В роботі";
      case "done":
        return "Виконано";
      case "overdue":
        return "Прострочено";
      default:
        return "—";
    }
  };

  return (
    <div className="taskspage">
      <div className="taskspage-header">
        <h1 className="taskspage-title">Завдання</h1>

        <div className="taskspage-filters">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            Усі
          </button>
          <button
            className={`filter-btn ${filter === "new" ? "active" : ""}`}
            onClick={() => setFilter("new")}
          >
            Нове
          </button>
          <button
            className={`filter-btn ${filter === "in-progress" ? "active" : ""}`}
            onClick={() => setFilter("in-progress")}
          >
            В роботі
          </button>
          <button
            className={`filter-btn ${filter === "done" ? "active" : ""}`}
            onClick={() => setFilter("done")}
          >
            Виконано
          </button>
          <button
            className={`filter-btn ${filter === "overdue" ? "active" : ""}`}
            onClick={() => setFilter("overdue")}
          >
            Прострочено
          </button>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="taskspage-empty">Немає задач</p>
      ) : (
        <div className="taskspage-grid">
          {filteredTasks.map((task) => (
            <div key={task.id} className="taskspage-card">
              <div className="taskspage-top">
                <span className={`task-status badge-${task.status}`}>
                  {getStatusLabel(task.status)}
                </span>

                {task.priority && (
                  <span className={`task-priority priority-${task.priority}`}>
                    {task.priority === "high"
                      ? "Високий"
                      : task.priority === "medium"
                      ? "Середній"
                      : "Низький"}
                  </span>
                )}
              </div>

              <h2 className="task-title">{task.title}</h2>

              {task.due && (
                <p className="task-meta">
                  Завершити до: <span>{task.due}</span>
                </p>
              )}

              {task.assignee && (
                <p className="task-meta">
                  Виконавець: <span>{task.assignee}</span>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
