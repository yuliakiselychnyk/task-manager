import React from "react";
import "../styles/dashboard.css";

export default function Dashboard() {
  const tasks = [
    { 
      title: "Оновлення API",
      due: "2026-04-30",
      user: "Киселичник Юлія",
      status: "in-progress",
      priority: "high"
    },
    { 
      title: "Тестування застосунку",
      due: "2026-04-22",
      user: "Іваневич Аліна",
      status: "new",
      priority: "medium"
    },
    { 
      title: "Підготувати звіт",
      due: "2026-04-23",
      user: "Ганець Микола",
      status: "overdue",
      priority: "high"
    },
    { 
      title: "Дизайн інтерфейсу",
      due: "2026-04-20",
      user: "Погориляк Аліса",
      status: "done",
      priority: "low"
    },
  ];

  // === LABELS ===
  const getStatusLabel = (status) => {
    switch (status) {
      case "new": return "Нове";
      case "in-progress": return "В роботі";
      case "done": return "Виконано";
      case "overdue": return "Прострочено";
      default: return "—";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "new": return "label-new";
      case "in-progress": return "label-progress";
      case "done": return "label-done";
      case "overdue": return "label-overdue";
      default: return "";
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "low": return "Низький";
      case "medium": return "Середній";
      case "high": return "Високий";
      default: return "—";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "low": return "priority-low";
      case "medium": return "priority-medium";
      case "high": return "priority-high";
      default: return "";
    }
  };

  const getDeadlineDiff = (due) => {
    const now = new Date();
    const date = new Date(due);
    const diff = Math.ceil((date - now) / (1000 * 60 * 60 * 24));

    if (diff < 0) return `Прострочено на ${Math.abs(diff)} дн.`;
    if (diff === 0) return "Сьогодні!";
    return `Через ${diff} дн.`;
  };

  return (
    <div className="dashboard-layout">

      {/* LEFT */}
      <div className="dashboard-left">
        <h1 className="dashboard-title">Огляд</h1>

        <div className="dashboard-grid">
          {tasks.map((task, i) => (
            <div key={i} className="dashboard-card">

              <div className="card-header">
                <span className={`label ${getStatusClass(task.status)}`}>
                  {getStatusLabel(task.status)}
                </span>

                <span className={`label ${getPriorityClass(task.priority)}`}>
                  {getPriorityLabel(task.priority)}
                </span>

                <div className="card-actions">
                  <button className="action-btn done">✔</button>
                  <button className="action-btn edit">✎</button>
                  <button className="action-btn delete">🗑</button>
                </div>
              </div>

              <h2 className="dashboard-card__title">{task.title}</h2>

              <p className="dashboard-card__meta">
                Дедлайн: <span>{task.due}</span> —
                <strong> {getDeadlineDiff(task.due)}</strong>
              </p>

              <p className="dashboard-card__meta">
                Виконавець: <span>{task.user}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <aside className="dashboard-sidebar">

        <div className="stats-card">
          <h2>Статистика</h2>
          <p>Виконано: <strong>12</strong></p>
          <p>В роботі: <strong>4</strong></p>
          <p>Нові задачі: <strong>3</strong></p>
          <p>Прострочено: <strong>1</strong></p>
        </div>

        <div className="stats-card">
          <h2>Прогрес тижня</h2>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "70%" }}></div>
          </div>
          <p>70% виконано</p>
        </div>

        <div className="stats-card">
          <h2>Найближчі дедлайни</h2>
          <ul>
            <li>Тестування — 22.04</li>
            <li>Звіт — 23.04</li>
            <li>API — 30.04</li>
          </ul>
        </div>

      </aside>
    </div>
  );
}
