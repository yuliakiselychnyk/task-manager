import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/taskDetails.css";

// Тимчасові дані (макети, поки немає бекенду)
const mockTasks = {
  1: {
    title: "Оновлення API",
    description: "Оновити API до нової версії. Перевірити документацію.",
    status: "new",
    due: "30.04.2024",
    assignee: "Кисельничик Юлія",
  },
  2: {
    title: "Підготувати звіт",
    description: "Підготувати фінальний звіт за проектом.",
    status: "in-progress",
    due: "23.04.2024",
    assignee: "Ганець Микола",
  },
  3: {
    title: "Тестування застосунку",
    description: "Перевірити роботу всіх основних модулів.",
    status: "new",
    due: "22.04.2024",
    assignee: "Іванченко Аліна",
  },
  4: {
    title: "Дизайн інтерфейсу",
    description: "Оновити UI відповідно до нового брендбуку.",
    status: "done",
    due: "20.04.2024",
    assignee: "Погорілка Аліса",
  },
};

function TaskDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const task = mockTasks[id];

  const getStatus = (status) => {
    switch (status) {
      case "new":
        return "Нове";
      case "in-progress":
        return "В роботі";
      case "done":
        return "Виконано";
      default:
        return status;
    }
  };

  if (!task) {
    return <h2 style={{ textAlign: "center" }}>Завдання не знайдено 😔</h2>;
  }

  return (
    <div className="task-details-page">
      <div className="task-card">
        <h1 className="task-title">{task.title}</h1>

        <div className="task-section">
          <p className="label">Опис:</p>
          <p className="value">{task.description}</p>
        </div>

        <div className="task-grid">
          <div>
            <p className="label">Статус</p>
            <p className="value">{getStatus(task.status)}</p>
          </div>

          <div>
            <p className="label">Дедлайн</p>
            <p className="value">{task.due}</p>
          </div>

          <div>
            <p className="label">Виконавець</p>
            <p className="value">{task.assignee}</p>
          </div>
        </div>

        <div className="task-actions">
          <button
            className="task-btn-primary"
            onClick={() => navigate(`/edit/${id}`)}
          >
            Редагувати
          </button>

          <button
            className="task-btn-secondary"
            onClick={() => navigate("/tasks")}
          >
            Назад
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
