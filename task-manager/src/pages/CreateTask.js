import React, { useState } from "react";
import "../styles/createTask.css";

function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      title,
      description,
      status,
    };

    console.log("Створене завдання:", newTask);

    setTitle("");
    setDescription("");
    setStatus("new");
  };

  return (
    <div className="task-form-wrapper">
      <h2 className="task-form-title">
        Створити нове завдання <span className="icon">➕</span>
      </h2>

      <form onSubmit={handleSubmit}>
        <label className="task-label">Назва завдання</label>
        <input
          type="text"
          className="task-input"
          placeholder="Введіть назву..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="task-label">Опис</label>
        <textarea
          className="task-textarea"
          placeholder="Деталі завдання..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

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

        <button type="submit" className="task-submit-btn">
          Створити
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
