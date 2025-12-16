import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import { useTasks } from "../context/TasksContext";

export default function Dashboard() {
  const { tasks, updateTask, deleteTask } = useTasks();
  const navigate = useNavigate();

  // ===== LABELS =====
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
      case "low":
        return "Низький";
      case "medium":
        return "Середній";
      case "high":
        return "Високий";
      default:
        return "—";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "low":
        return "priority-low";
      case "medium":
        return "priority-medium";
      case "high":
        return "priority-high";
      default:
        return "";
    }
  };

  const getDeadlineDiff = (deadline) => {
    if (!deadline) return "—";
    const now = new Date();
    const date = new Date(deadline);
    const diff = Math.ceil((date - now) / (1000 * 60 * 60 * 24));

    if (diff < 0) return `Прострочено на ${Math.abs(diff)} дн.`;
    if (diff === 0) return "Сьогодні!";
    return `Через ${diff} дн.`;
  };

  // ===== STATS =====
  const completed = tasks.filter((t) => t.status === "completed").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const newTasks = tasks.filter((t) => t.status === "new").length;
  const overdue = tasks.filter((t) => t.status === "overdue").length;

  return (
    <div className="dashboard-layout">
      {/* LEFT */}
      <div className="dashboard-left">
        <h1 className="dashboard-title">Огляд</h1>

        <div className="dashboard-grid">
          {tasks.map((task) => (
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
                    title="Виконано"
                    onClick={() => updateTask(task.id, { status: "completed" })}
                  >
                    ✔
                  </button>

                  <button
                    className="action-btn edit"
                    title="Редагувати"
                    onClick={() => navigate(`/tasks/${task.id}/edit`)}
                  >
                    ✎
                  </button>

                  <button
                    className="action-btn delete"
                    title="Видалити"
                    onClick={() => deleteTask(task.id)}
                  >
                    🗑
                  </button>
                </div>
              </div>

              <h2 className="dashboard-card__title">{task.title}</h2>

              <p className="dashboard-card__meta">
                Дедлайн: <span>{task.deadline || "—"}</span> —{" "}
                <strong>{getDeadlineDiff(task.deadline)}</strong>
              </p>

              <p className="dashboard-card__meta">
                Виконавець: <span>{task.user || "—"}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <aside className="dashboard-sidebar">
        <div className="stats-card">
          <h2>Статистика</h2>
          <p>
            Виконано: <strong>{completed}</strong>
          </p>
          <p>
            В роботі: <strong>{inProgress}</strong>
          </p>
          <p>
            Нові задачі: <strong>{newTasks}</strong>
          </p>
          <p>
            Прострочено: <strong>{overdue}</strong>
          </p>
        </div>

        <div className="stats-card">
          <h2>Прогрес тижня</h2>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: tasks.length
                  ? `${Math.round((completed / tasks.length) * 100)}%`
                  : "0%",
              }}
            />
          </div>
          <p>
            {tasks.length ? Math.round((completed / tasks.length) * 100) : 0}%
            виконано
          </p>
        </div>

        <div className="stats-card">
          <h2>Найближчі дедлайни</h2>
          <ul>
            {tasks
              .filter((t) => t.deadline)
              .slice(0, 3)
              .map((t) => (
                <li key={t.id}>
                  {t.title} — {t.deadline}
                </li>
              ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
