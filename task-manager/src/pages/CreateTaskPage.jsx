// src/pages/CreateTaskPage.jsx
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";

export default function CreateTaskPage() {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const handleCreateTask = (data) => {
    addTask(data);
    navigate("/tasks");
  };

  return (
    <div>
      <h1>Створення задачі</h1>
      <TaskForm
        initialTask={null}
        onSubmit={handleCreateTask}
        submitLabel="Створити"
      />
    </div>
  );
}
