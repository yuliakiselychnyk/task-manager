// src/pages/DashboardPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

export default function DashboardPage() {
  const { tasks } = useTasks();

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const active = total - completed;

  const progress =
    total > 0 && !isNaN(completed / total)
      ? Math.round((completed / total) * 100)
      : 0;

  const latestTasks = [...tasks].slice(-3).reverse();
  const highPriority = tasks.filter((t) => t.priority === "high");

  return (
    <div style={{ padding: "40px" }}>
      <h1>Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <Metric title="Всього задач" value={total} />
        <Metric title="Виконано" value={completed} />
        <Metric title="Активні" value={active} />
        <Metric title="Прогрес" value={progress + "%"} />
      </div>

      {/* Останні задачі */}
      <section style={{ marginTop: "40px" }}>
        <h2>Останні задачі</h2>
        {latestTasks.length === 0 ? (
          <p>Немає задач</p>
        ) : (
          <ul>
            {latestTasks.map((task) => (
              <li key={task.id}>
                <b>{task.title}</b> — {task.priority}
                <Link to={`/tasks/${task.id}`} style={{ marginLeft: "10px" }}>
                  Переглянути
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* High priority */}
      <section style={{ marginTop: "40px" }}>
        <h2>Найважливіші задачі (High)</h2>
        {highPriority.length === 0 ? (
          <p>Немає важливих задач</p>
        ) : (
          <ul>
            {highPriority.map((task) => (
              <li key={task.id}>
                <b>{task.title}</b> — {task.description}
                <Link to={`/tasks/${task.id}`} style={{ marginLeft: "10px" }}>
                  Переглянути
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div style={{ marginTop: "50px", display: "flex", gap: "20px" }}>
        <Link to="/tasks">
          <button>Перейти до задач</button>
        </Link>
        <Link to="/team">
          <button>Команда</button>
        </Link>
        <Link to="/report">
          <button>Звіт</button>
        </Link>
      </div>
    </div>
  );
}

function Metric({ title, value }) {
  return (
    <div
      style={{
        width: "180px",
        padding: "20px",
        background: "#f1f1f1",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <h3>{title}</h3>
      <p style={{ fontSize: "32px", margin: 0 }}>{value}</p>
    </div>
  );
}
