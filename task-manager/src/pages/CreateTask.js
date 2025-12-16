import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import "../styles/createTask.css";

function CreateTask() {
  const { addTask } = useTasks();
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    addTask({
      title,
      description,
      status,
      priority,
      deadline,
      user,
    });

    navigate("/tasks");
  };

  return (
    <div className="task-form-wrapper">
      <h2 className="task-form-title">
        Створити нове завдання <span className="icon">➕</span>
      </h2>

      <form onSubmit={handleSubmit}>
        <label className="task-label">Назва завдання</label>
        <input
          className="task-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введіть назву..."
          required
        />

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
          required
        />

        <label className="task-label">Виконавець</label>
        <select
          className="task-select"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        >
          <option value="">Оберіть виконавця</option>
          {team.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </select>

        <button type="submit" className="task-submit-btn">
          Створити
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
