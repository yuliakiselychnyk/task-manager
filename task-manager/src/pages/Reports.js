import React from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { useTasks } from "../context/TasksContext";
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
  Legend,
} from "chart.js";

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

// ---------- helpers ----------
const isValidDate = (d) => d instanceof Date && !Number.isNaN(d.getTime());

const toDate = (value) => {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
};

const getISOWeekKey = (date) => {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  const year = d.getUTCFullYear();
  return `${year}-W${String(weekNo).padStart(2, "0")}`;
};

const getISOWeekLabel = (weekKey) => {
  const parts = weekKey.split("-W");
  return `Тиждень ${parseInt(parts[1], 10)}`;
};

const pickTaskDate = (task) => {
  const raw =
    task.completedAt ||
    task.updatedAt ||
    task.createdAt ||
    task.deadline ||
    null;

  if (!raw) return null;
  const d = new Date(raw);
  return isValidDate(d) ? d : null;
};

const getLastNWeeksKeys = (n = 4) => {
  const keys = [];
  const now = new Date();

  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i * 7);
    keys.push(getISOWeekKey(d));
  }

  return Array.from(new Set(keys));
};

export default function Reports() {
  const { tasks } = useTasks();

  // ================= VELOCITY =================
  const weekKeys = getLastNWeeksKeys(4);
  const velocityCounts = Object.fromEntries(weekKeys.map((k) => [k, 0]));

  tasks
    .filter((t) => t.status === "completed")
    .forEach((t) => {
      const d = pickTaskDate(t);
      if (!d) return;
      const key = getISOWeekKey(d);
      if (velocityCounts[key] !== undefined) {
        velocityCounts[key] += 1;
      }
    });

  const velocityData = {
    labels: weekKeys.map(getISOWeekLabel),
    datasets: [
      {
        label: "Виконано задач",
        data: weekKeys.map((k) => velocityCounts[k]),
        backgroundColor: "#2d69e0",
      },
    ],
  };

  // ================= BURN-DOWN =================
  const completedTasks = tasks
    .filter((t) => t.completedAt)
    .map((t) => ({
      ...t,
      completedDate: toDate(t.completedAt),
    }))
    .filter((t) => t.completedDate)
    .sort((a, b) => a.completedDate - b.completedDate);

  let remaining = tasks.length;
  const burnLabels = [];
  const burnValues = [];

  completedTasks.forEach((_, index) => {
    burnLabels.push(`Крок ${index + 1}`);
    remaining -= 1;
    burnValues.push(remaining);
  });

  const burnData = {
    labels: burnLabels,
    datasets: [
      {
        label: "Залишилось задач",
        data: burnValues,
        borderColor: "#e23e57",
        borderWidth: 3,
        tension: 0.3,
        fill: false,
      },
    ],
  };

  // ================= DISTRIBUTION =================
  const userMap = {};
  tasks.forEach((task) => {
    const user = task.user?.trim() ? task.user : "Без виконавця";
    userMap[user] = (userMap[user] || 0) + 1;
  });

  const labels = Object.keys(userMap);
  const values = Object.values(userMap);

  const palette = [
    "#2d69e0",
    "#1a4fb5",
    "#4dabf7",
    "#87b9ff",
    "#a5c9ff",
    "#c7dcff",
  ];

  const distributionData = {
    labels,
    datasets: [
      {
        label: "Кількість задач",
        data: values,
        backgroundColor: labels.map((_, i) => palette[i % palette.length]),
      },
    ],
  };

  return (
    <div className="reports-page reports-container">
      <h1 className="reports-title">Звіти та Аналітика</h1>

      {/* 🔒 FILTERS (disabled) */}
      <div className="reports-filters">
        <select disabled>
          <option>За місяць</option>
        </select>
        <select disabled>
          <option>Усі проєкти</option>
        </select>
        <select disabled>
          <option>Усі користувачі</option>
        </select>
      </div>

      <p style={{ marginTop: 8, color: "#6b6e70", fontSize: 14 }}>
        Фільтри будуть доступні після підключення бекенду
      </p>

      <div className="report-card">
        <h2>Velocity (Швидкість виконання)</h2>
        <Bar data={velocityData} />
      </div>

      <div className="report-card">
        <h2>Burn-down Chart (Роботи залишилось)</h2>
        <Line data={burnData} />
      </div>

      <div className="report-card">
        <h2>Розподіл задач між учасниками</h2>
        <Doughnut data={distributionData} />
      </div>
    </div>
  );
}
