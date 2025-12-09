// src/components/TaskForm.jsx
import { useState, useEffect } from "react";
import { useTeam } from "../context/TeamContext";

export default function TaskForm({ initialTask, onSubmit, submitLabel }) {
  const { team } = useTeam();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [assignedTo, setAssignedTo] = useState(null);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || "");
      setDescription(initialTask.description || "");
      setPriority(initialTask.priority || "low");
      setAssignedTo(initialTask.assignedTo || null);
    }
  }, [initialTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      assignedTo,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Назва:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div>
        <label>Опис:</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label>Пріоритет:</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
      </div>

      <div>
        <label>Виконавець:</label>
        <select
          value={assignedTo || ""}
          onChange={(e) =>
            setAssignedTo(e.target.value === "" ? null : Number(e.target.value))
          }
        >
          <option value="">Не призначено</option>

          {team.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name} — {member.role}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">{submitLabel}</button>
    </form>
  );
}
