import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import "../styles/taskDetails.css";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks } = useTasks();

  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return <p style={{ padding: 40 }}>Завдання не знайдено 😔</p>;
  }

  return (
    <div className="taskdetails-page">
      <div className="taskdetails-header">
        <h1>{task.title}</h1>

        <div className="td-actions">
          <button className="td-btn">✎ Редагувати</button>
          <button className="td-btn delete" onClick={() => navigate("/tasks")}>
            ← Назад
          </button>
        </div>
      </div>

      <div className="taskdetails-block">
        <h3>Опис</h3>
        <p className="td-desc">
          {task.description || "Опис відсутній."}
        </p>
      </div>

      <div className="taskdetails-info">
        <div>
          <h4>Статус</h4>
          <p className={`status-badge badge-${task.status}`}>
            {task.status}
          </p>
        </div>

        <div>
          <h4>Пріоритет</h4>
          <p className={`priority-badge priority-${task.priority}`}>
            {task.priority}
          </p>
        </div>

        <div>
          <h4>Дедлайн</h4>
          <p>{task.due || "—"}</p>
        </div>

        <div>
          <h4>Виконавець</h4>
          <p>{task.assignee || "—"}</p>
        </div>
      </div>

      {/* Checklist */}
      <div className="taskdetails-block">
        <h3>Підзавдання</h3>
        <ul className="checklist">
          <li><input type="checkbox" /> Підготувати матеріали</li>
          <li><input type="checkbox" /> Узгодити з командою</li>
          <li><input type="checkbox" /> Провести перевірку</li>
        </ul>
      </div>

      {/* Comments */}
      <div className="taskdetails-block">
        <h3>Коментарі</h3>
        <div className="comments">
          <div className="comment">
            <strong>Аліса:</strong>
            <p>Перевірю сьогодні ввечері 🌙</p>
          </div>

          <div className="comment">
            <strong>Микола:</strong>
            <p>Готово на 70% ✔</p>
          </div>
        </div>

        <textarea
          placeholder="Напишіть коментар..."
          className="comment-input"
        ></textarea>
        <button className="comment-btn">Надіслати</button>
      </div>
    </div>
  );
}
