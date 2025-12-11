import React from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import "../styles/reports.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

// Реєструємо всі компоненти один раз
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Reports() {
  // ---------------------- MOCK DATA -----------------------

  const velocityData = {
    labels: ["Тиждень 1", "Тиждень 2", "Тиждень 3", "Тиждень 4"],
    datasets: [
      {
        label: "Виконано задач",
        data: [5, 7, 9, 6],
        backgroundColor: "#2d69e0"
      }
    ]
  };

  const burnData = {
    labels: ["День 1", "День 2", "День 3", "День 4", "День 5"],
    datasets: [
      {
        label: "Залишилось задач",
        data: [12, 10, 8, 5, 2],
        borderColor: "#e23e57",
        borderWidth: 3,
        tension: 0.3
      }
    ]
  };

  const distributionData = {
    labels: [
      "Юлія Кіселичник",
      "Аліса Погорляк",
      "Аліна Іваневич",
      "Микола Ганець"
    ],
    datasets: [
      {
        label: "Кількість задач",
        data: [6, 4, 5, 3],
        backgroundColor: ["#2d69e0", "#1a4fb5", "#4dabf7", "#87b9ff"]
      }
    ]
  };

  return (
    <div className="reports-page reports-container">
      <h1 className="reports-title">Звіти та Аналітика</h1>

      {/* ФІЛЬТРИ */}
      <div className="reports-filters">
        <select>
          <option>За місяць</option>
          <option>За тиждень</option>
          <option>За рік</option>
        </select>

        <select>
          <option>Усі проєкти</option>
          <option>Проєкт А</option>
          <option>Проєкт Б</option>
        </select>

        <select>
          <option>Усі користувачі</option>
          <option>Юлія</option>
          <option>Аліса</option>
          <option>Аліна</option>
          <option>Микола</option>
        </select>
      </div>

      {/* Velocity */}
      <div className="report-card">
        <h2>Velocity (Швидкість виконання)</h2>
        <Bar data={velocityData} />
      </div>

      {/* Burn-down */}
      <div className="report-card">
        <h2>Burn-down Chart (Роботи залишилось)</h2>
        <Line data={burnData} />
      </div>

      {/* Distribution */}
      <div className="report-card">
        <h2>Розподіл задач між учасниками</h2>
        <Doughnut data={distributionData} />
      </div>
    </div>
  );
}
