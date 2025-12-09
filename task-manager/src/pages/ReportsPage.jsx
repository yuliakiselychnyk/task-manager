// src/pages/ReportsPage.jsx
import React from "react";
import { useTasks } from "../context/TaskContext";

export default function ReportsPage() {
  const { tasks } = useTasks();

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const active = tasks.filter((t) => !t.completed).length;

  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Підрахунок за пріоритетами
  const high = tasks.filter((t) => t.priority === "high").length;
  const medium = tasks.filter((t) => t.priority === "medium").length;
  const low = tasks.filter((t) => t.priority === "low").length;

  // Невелика функція для ASCII-графіку
  const bar = (value, max = total) => {
    const count = Math.round((value / (max || 1)) * 20); // 20 символів
    return "█".repeat(count) + "░".repeat(20 - count);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Звіт по задачах</h1>

      {/* Картки */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={cardStyle}>
          <h3>Всього задач</h3>
          <p style={bigNumber}>{total}</p>
        </div>

        <div style={cardStyle}>
          <h3>Виконано</h3>
          <p style={bigNumber}>{completed}</p>
        </div>

        <div style={cardStyle}>
          <h3>Активні</h3>
          <p style={bigNumber}>{active}</p>
        </div>

        <div style={cardStyle}>
          <h3>Прогрес</h3>
          <p style={bigNumber}>{percent}%</p>
        </div>
      </div>

      {/* Бар-графи */}
      <h2 style={{ marginTop: "40px" }}>Розподіл за пріоритетами</h2>

      <div style={barRow}>
        <strong>High:</strong> <span style={barStyle}>{bar(high)}</span> {high}
      </div>

      <div style={barRow}>
        <strong>Medium:</strong> <span style={barStyle}>{bar(medium)}</span>{" "}
        {medium}
      </div>

      <div style={barRow}>
        <strong>Low:</strong> <span style={barStyle}>{bar(low)}</span> {low}
      </div>
    </div>
  );
}

// ---------- СТИЛІ ----------

const cardStyle = {
  padding: "15px 25px",
  borderRadius: "10px",
  background: "#f5f5f5",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  minWidth: "150px",
  textAlign: "center",
};

const bigNumber = {
  fontSize: "28px",
  fontWeight: "bold",
  margin: 0,
};

const barRow = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "18px",
  marginTop: "10px",
};

const barStyle = {
  fontFamily: "monospace",
  fontSize: "18px",
};
