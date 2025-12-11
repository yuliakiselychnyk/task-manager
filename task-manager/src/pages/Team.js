// src/pages/Team.js
import React from "react";
import "../styles/team.css";

export default function Team() {
  const team = [
    {
      id: 1,
      name: "Погориляк Аліса",
      role: "UI/UX дизайнер",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Alisa&backgroundColor=b6e3f4",
      active: true,
    },
    {
      id: 2,
      name: "Іваневич Аліна",
      role: "Фронтенд розробник",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Alina&backgroundColor=c0aede",
      active: true,
    },
    {
      id: 3,
      name: "Ганець Микола",
      role: "Бекенд розробник",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Mykola&backgroundColor=ffdfbf",
      active: true,
    },
    {
      id: 4,
      name: "Прохніч Юлія",
      role: "Менеджер проєкту",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=YuliaP&backgroundColor=ffd5dc",
      active: true,
    },
    {
      id: 5,
      name: "Кіселичник Юлія",
      role: "Тестувальник",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=YuliaK&backgroundColor=e2f0cb",
      active: false,
    },
  ];

  return (
    <div className="team-page">
      <div className="team-header">
        <h1 className="team-title">Наша команда 👥</h1>
        <button className="add-member-btn">+ Додати учасника</button>
      </div>

      <div className="team-grid">
        {team.map((member) => (
          <div key={member.id} className="team-card">
            <div className="avatar-wrapper">
              <img
                src={member.avatar}
                alt={member.name}
                className="team-avatar"
              />
            </div>

            <h2 className="team-name">{member.name}</h2>
            <p className="team-role">{member.role}</p>

            <span
              className={`team-status ${
                member.active ? "active" : "inactive"
              }`}
            >
              {member.active ? "Активний" : "Неактивний"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
