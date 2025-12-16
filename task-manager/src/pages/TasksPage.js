import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import "../styles/dashboard.css";

export default function TasksPage() {
  const { tasks, updateTask, deleteTask } = useTasks();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) =>
    filter === "all" ? true : task.status === filter
  );

  const handleDeleteTask = (id, title) => {
    const ok = window.confirm(`Видалити задачу "${title}"?`);
    if (!ok) return;

    deleteTask(id);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "new":
        return "Нове";
      case "in-progress":
        return "В роботі";
      case "completed":
        return "Виконано";
      case "overdue":
        return "Прострочено";
      default:
        return "—";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "new":
        return "label-new";
      case "in-progress":
        return "label-progress";
      case "completed":
        return "label-done";
      case "overdue":
        return "label-overdue";
      default:
        return "";
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "high":
        return "Високий";
      case "medium":
        return "Середній";
      case "low":
        return "Низький";
      default:
        return "—";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "high":
        return "priority-high";
      case "medium":
        return "priority-medium";
      case "low":
        return "priority-low";
      default:
        return "";
    }
  };

  return (
    <div className="dashboard-layout">
      <div className="dashboard-left">
        {/* HEADER */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Завдання</h1>

          <div className="dashboard-filters">
            {[
              { key: "all", label: "Усі" },
              { key: "new", label: "Нове" },
              { key: "in-progress", label: "В роботі" },
              { key: "completed", label: "Виконано" },
              { key: "overdue", label: "Прострочено" },
            ].map((f) => (
              <button
                key={f.key}
                className={`filter-pill ${filter === f.key ? "active" : ""}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* CARDS */}
        <div className="dashboard-grid">
          {filteredTasks.map((task) => (
            <div key={task.id} className="dashboard-card">
              <div className="card-header">
                <span className={`label ${getStatusClass(task.status)}`}>
                  {getStatusLabel(task.status)}
                </span>

                <span className={`label ${getPriorityClass(task.priority)}`}>
                  {getPriorityLabel(task.priority)}
                </span>

                <div className="card-actions">
                  <button
                    className="action-btn done"
                    onClick={() => updateTask(task.id, { status: "completed" })}
                    title="Позначити виконаною"
                  >
                    ✓
                  </button>

                  <button
                    className="action-btn edit"
                    onClick={() => navigate(`/tasks/${task.id}/edit`)}
                    title="Редагувати"
                  >
                    ✎
                  </button>

                  <button
                    className="action-btn delete"
                    onClick={() => handleDeleteTask(task.id, task.title)}
                    title="Видалити"
                  >
                    🗑
                  </button>
                </div>
              </div>

              <h2 className="dashboard-card__title">{task.title}</h2>

              <p className="dashboard-card__meta">
                Дедлайн: <strong>{task.deadline || "—"}</strong>
              </p>

              <p className="dashboard-card__meta">
                Виконавець: <strong>{task.user}</strong>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
