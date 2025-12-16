import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import "../styles/createTask.css";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask } = useTasks();

  const task = tasks.find((t) => t.id === Number(id));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");
  const [priority, setPriority] = useState("medium");
  const [deadline, setDeadline] = useState("");
  const [user, setUser] = useState("");

  const team = [
    "Кіселичник Юлія",
    "Іваневич Аліна",
    "Ганець Микола",
    "Прохніч Юлія",
    "Погорляк Аліса",
  ];

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setStatus(task.status || "new");
      setPriority(task.priority || "medium");
      setDeadline(task.deadline || "");
      setUser(task.user || "");
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();

    updateTask(task.id, {
      title,
      description,
      status,
      priority,
      deadline,
      user,
    });

    navigate("/tasks");
  };

  if (!task) {
    return <p style={{ padding: 30 }}>Завдання не знайдено ❌</p>;
  }

  return (
    <div className="task-form-wrapper">
      <h2 className="task-form-title">
        Редагувати завдання <span className="icon">✏️</span>
      </h2>

      <form onSubmit={handleSubmit}>
        <label className="task-label">Назва завдання</label>
        <input
          className="task-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* 📝 Опис — ТІЛЬКИ В EDIT */}
        <label className="task-label">Опис</label>
        <textarea
          className="task-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Деталі завдання..."
        />

        <label className="task-label">Статус</label>
        <select
          className="task-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="new">Нове</option>
          <option value="in-progress">В роботі</option>
          <option value="completed">Виконано</option>
          <option value="overdue">Прострочено</option>
        </select>

        <label className="task-label">Пріоритет</label>
        <select
          className="task-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Низький</option>
          <option value="medium">Середній</option>
          <option value="high">Високий</option>
        </select>

        <label className="task-label">Дедлайн</label>
        <input
          type="date"
          className="task-input"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <label className="task-label">Виконавець</label>
        <select
          className="task-select"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        >
          <option value="">Оберіть виконавця</option>
          {team.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </select>

        <button type="submit" className="task-submit-btn">
          Зберегти зміни
        </button>
      </form>
    </div>
  );
}

export default EditTask;
