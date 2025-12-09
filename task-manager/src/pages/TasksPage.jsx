// src/pages/TasksPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { useTeam } from "../context/TeamContext";

export default function TasksPage() {
  const { tasks, deleteTask, toggleComplete } = useTasks();
  const { team } = useTeam();

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("none");

  // ---- ФІЛЬТРАЦІЯ ----
  const filteredTasks = tasks
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter((t) =>
      priorityFilter === "all" ? true : t.priority === priorityFilter
    )
    .filter((t) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "active") return !t.completed;
      if (statusFilter === "done") return t.completed;
      return true;
    });

  // ---- СОРТУВАННЯ ----
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "priority") {
      const order = { high: 1, medium: 2, low: 3 };
      return order[a.priority] - order[b.priority];
    }
    if (sortBy === "az") return a.title.localeCompare(b.title);
    if (sortBy === "za") return b.title.localeCompare(a.title);
    if (sortBy === "id") return a.id - b.id;
    return 0;
  });

  return (
    <div style={{ padding: "40px" }}>
      <h1>Усі задачі</h1>

      <p>Всього: {tasks.length}</p>

      {/* ------------------ ФІЛЬТРИ ------------------ */}
      <div style={{ marginBottom: "20px" }}>
        <div>
          <label>Пошук: </label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Введіть текст..."
          />
        </div>

        <div>
          <label>Фільтр пріоритету: </label>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">Всі</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div>
          <label>Фільтр статусу: </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Всі</option>
            <option value="active">Активні</option>
            <option value="done">Виконані</option>
          </select>
        </div>

        <div>
          <label>Сортування: </label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="none">Без сортування</option>
            <option value="priority">За пріоритетом</option>
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
            <option value="id">За ID</option>
          </select>
        </div>
      </div>

      {/* ------------------ СПИСОК ЗАДАЧ ------------------ */}
      {sortedTasks.length === 0 ? (
        <p>Немає задач</p>
      ) : (
        <ul>
          {sortedTasks.map((task) => {
            const assigned = team.find((m) => m.id === task.assignedTo);

            return (
              <li key={task.id} style={{ marginBottom: "20px" }}>
                <b>{task.title}</b> — {task.priority}
                {assigned && (
                  <span style={{ marginLeft: "10px", color: "gray" }}>
                    (виконавець: {assigned.name})
                  </span>
                )}
                {task.completed && (
                  <span style={{ marginLeft: "10px", color: "green" }}>
                    ✔ виконано
                  </span>
                )}
                <br />
                <Link to={`/tasks/${task.id}`}>Переглянути деталі</Link> |{" "}
                <Link to={`/tasks/${task.id}/edit`}>Редагувати</Link> |{" "}
                <button
                  style={{ background: "red", color: "white" }}
                  onClick={() => deleteTask(task.id)}
                >
                  Видалити
                </button>{" "}
                <button
                  style={{ background: "lime" }}
                  onClick={() => toggleComplete(task.id)}
                >
                  {task.completed ? "Скасувати" : "Виконано"}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <Link to="/tasks/create">
        <button style={{ marginTop: "20px" }}>+ Створити задачу</button>
      </Link>
    </div>
  );
}
