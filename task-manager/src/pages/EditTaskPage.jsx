// src/pages/EditTaskPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";

export default function EditTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask } = useTasks();

  const task = tasks.find((t) => t.id === Number(id));

  if (!task) return <h2>Задачу не знайдено</h2>;

  const handleSave = (data) => {
    updateTask(task.id, data);
    navigate(`/tasks/${id}`);
  };

  return (
    <div>
      <h1>Редагування задачі</h1>

      <TaskForm
        initialTask={task}
        onSubmit={handleSave}
        submitLabel="Зберегти"
      />
    </div>
  );
}
