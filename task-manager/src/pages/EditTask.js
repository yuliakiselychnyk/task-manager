import React, { useState } from "react";
import "../styles/createTask.css";

function EditTask() {
  const [title, setTitle] = useState("Поточна назва завдання");
  const [description, setDescription] = useState("Поточний опис завдання...");
  const [status, setStatus] = useState("new");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Збережено!", { title, description, status });
    alert("Завдання оновлено ✅");
  };

  return (
    <div className="task-wrapper">
      <h1 className="task-title">
        Редагувати завдання <span className="plus-icon">✎</span>
      </h1>

      <form className="task-form" onSubmit={handleSubmit}>
        <label>Назва завдання</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введіть назву..."
        />

        <label>Опис</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Деталі завдання..."
        ></textarea>

        <label>Статус</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="new">Нове</option>
          <option value="in-progress">В роботі</option>
          <option value="done">Готово</option>
        </select>

        <button className="create-btn" type="submit">
          Зберегти зміни
        </button>
      </form>
    </div>
  );
}

export default EditTask;
