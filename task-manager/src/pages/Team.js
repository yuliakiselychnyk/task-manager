import React, { useState } from "react";
import "../styles/team.css";
import "../styles/createTask.css";

export default function Team() {
  const [team, setTeam] = useState([
    {
      id: 1,
      name: "Погорляк Аліса",
      role: "Frontend розробник",
      avatar:
        "https://api.dicebear.com/9.x/avataaars/svg?seed=Alisa&backgroundColor=b6e3f4",
      active: true,
    },
    {
      id: 2,
      name: "Іваневич Аліна",
      role: "Backend розробник",
      avatar:
        "https://api.dicebear.com/9.x/avataaars/svg?seed=Alina&backgroundColor=c0aede",
      active: true,
    },
    {
      id: 3,
      name: "Ганець Микола",
      role: "UI дизайнер",
      avatar:
        "https://api.dicebear.com/9.x/avataaars/svg?seed=Mykola&backgroundColor=ffdfbf",
      active: true,
    },
    {
      id: 4,
      name: "Прохніч Юлія",
      role: "Backend / Full-stack розробник",
      avatar:
        "https://api.dicebear.com/9.x/avataaars/svg?seed=YuliaP&backgroundColor=ffd5dc",
      active: true,
    },
    {
      id: 5,
      name: "Кіселичник Юлія",
      role: "UI/UX дизайнер",
      avatar:
        "https://api.dicebear.com/9.x/avataaars/svg?seed=YuliaK&backgroundColor=e2f0cb",
      active: false,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [active, setActive] = useState(true);

  // ===== ADD MEMBER =====
  const handleAddMember = (e) => {
    e.preventDefault();

    setTeam((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
        role,
        active,
        avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${name}`,
      },
    ]);

    setName("");
    setRole("");
    setActive(true);
    setShowModal(false);
  };

  // ===== TOGGLE STATUS =====
  const toggleStatus = (id) => {
    setTeam((prev) =>
      prev.map((m) => (m.id === id ? { ...m, active: !m.active } : m))
    );
  };

  // ===== DELETE MEMBER =====
  const deleteMember = (id, name) => {
    if (!window.confirm(`Видалити учасника "${name}"?`)) return;
    setTeam((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="team-page">
      <div className="team-header">
        <h1 className="team-title">Наша команда 👥</h1>
        <button className="add-member-btn" onClick={() => setShowModal(true)}>
          + Додати учасника
        </button>
      </div>

      <div className="team-grid">
        {team.map((member) => (
          <div key={member.id} className="team-card">
            {/* 🗑 DELETE — тільки при hover */}
            <button
              className="delete-member-btn"
              onClick={() => deleteMember(member.id, member.name)}
              title="Видалити"
            >
              🗑
            </button>

            <div className="avatar-wrapper">
              <img
                src={member.avatar}
                alt={member.name}
                className="team-avatar"
              />
            </div>

            <h2 className="team-name">{member.name}</h2>
            <p className="team-role">{member.role}</p>

            <button
              className={`team-status ${member.active ? "active" : "inactive"}`}
              onClick={() => toggleStatus(member.id)}
            >
              {member.active ? "Активний" : "Неактивний"}
            </button>
          </div>
        ))}
      </div>

      {/* ===== MODAL ===== */}
      {showModal && (
        <div className="modal-overlay">
          <div className="task-form-wrapper">
            <h2 className="task-form-title">
              Додати учасника <span className="icon">👤</span>
            </h2>

            <form onSubmit={handleAddMember}>
              <label className="task-label">Імʼя</label>
              <input
                className="task-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label className="task-label">Спеціальність</label>
              <input
                className="task-input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />

              <label className="task-label">Статус</label>
              <select
                className="task-select"
                value={active ? "active" : "inactive"}
                onChange={(e) => setActive(e.target.value === "active")}
              >
                <option value="active">Активний</option>
                <option value="inactive">Неактивний</option>
              </select>

              <div style={{ display: "flex", gap: 12 }}>
                <button type="submit" className="task-submit-btn">
                  Додати
                </button>
                <button
                  type="button"
                  className="task-submit-btn"
                  style={{ background: "#b4bccf" }}
                  onClick={() => setShowModal(false)}
                >
                  Скасувати
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
