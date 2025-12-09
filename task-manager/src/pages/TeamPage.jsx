// src/pages/TeamPage.jsx
import React, { useState } from "react";
import { useTeam } from "../context/TeamContext";

export default function TeamPage() {
  const { team, addMember, removeMember, toggleActive, updateRole } = useTeam();

  const [name, setName] = useState("");
  const [role, setRole] = useState("Developer");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addMember(name, role);
    setName("");
    setRole("Developer");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Команда проєкту</h1>

      {/* Форма додавання учасника */}
      <section style={{ marginBottom: "24px" }}>
        <h3>Додати учасника</h3>

        <form onSubmit={handleAdd} style={{ marginBottom: "20px" }}>
          <input
            placeholder="Ім’я..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: "6px 10px", marginRight: "10px" }}
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ padding: "6px 10px", marginRight: "10px" }}
          >
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="QA">QA</option>
            <option value="Owner">Owner</option>
          </select>

          <button type="submit">Додати</button>
        </form>
      </section>

      {/* Список команди */}
      <section>
        <h3>Список команди</h3>

        {team.length === 0 ? (
          <p>Команда порожня</p>
        ) : (
          <ul>
            {team.map((person) => (
              <li key={person.id} style={{ marginBottom: "12px" }}>
                <b>{person.name}</b> —{" "}
                <select
                  value={person.role}
                  onChange={(e) => updateRole(person.id, e.target.value)}
                  style={{ marginRight: "10px" }}
                >
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="QA">QA</option>
                  <option value="Owner">Owner</option>
                </select>
                <span
                  style={{
                    color: person.active ? "green" : "gray",
                    marginRight: "10px",
                  }}
                >
                  {person.active ? "(активний)" : "(неактивний)"}
                </span>
                <button
                  onClick={() => toggleActive(person.id)}
                  style={{ marginRight: "10px" }}
                >
                  Перемкнути
                </button>
                <button
                  onClick={() => removeMember(person.id)}
                  style={{ background: "red", color: "white" }}
                >
                  Видалити
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
