// src/pages/TaskDetailsPage.jsx
import { useParams, Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { useTeam } from "../context/TeamContext";

export default function TaskDetailsPage() {
  const { id } = useParams();
  const { tasks, toggleComplete } = useTasks();
  const { team } = useTeam();

  const task = tasks.find((t) => t.id === Number(id));
  if (!task) return <h2>Задачу не знайдено</h2>;

  const assigned = team.find((m) => m.id === task.assignedTo);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Деталі завдання #{task.id}</h1>

      <p>
        <b>Назва:</b> {task.title}
      </p>
      <p>
        <b>Опис:</b> {task.description}
      </p>
      <p>
        <b>Пріоритет:</b> {task.priority}
      </p>

      <p>
        <b>Виконавець:</b>{" "}
        {assigned ? (
          <>
            {assigned.name} — {assigned.role}
          </>
        ) : (
          "Не призначено"
        )}
      </p>

      <p>
        <b>Статус:</b>{" "}
        <span style={{ color: task.completed ? "green" : "orange" }}>
          {task.completed ? "Виконано" : "Активне"}
        </span>
      </p>

      <button onClick={() => toggleComplete(task.id)}>
        {task.completed ? "Повернути в активні" : "Позначити виконаною"}
      </button>

      <br />
      <Link to="/tasks">← Назад до списку</Link>
    </div>
  );
}
