// src/context/TeamContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const TeamContext = createContext();
export const useTeam = () => useContext(TeamContext);

export function TeamProvider({ children }) {
  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem("team");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "Юлічка",
            role: "Designer",
            active: true,
            updatedAt: new Date().toISOString(),
          },
          {
            id: 2,
            name: "Аліса",
            role: "Developer",
            active: true,
            updatedAt: new Date().toISOString(),
          },
          {
            id: 3,
            name: "Микола",
            role: "Owner",
            active: true,
            updatedAt: new Date().toISOString(),
          },
        ];
  });

  // 🔥 Синхронізація з localStorage
  useEffect(() => {
    localStorage.setItem("team", JSON.stringify(team));
  }, [team]);

  // 👉 Додавання учасника
  const addMember = (name, role) => {
    setTeam((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
        role,
        active: true,
        updatedAt: new Date().toISOString(),
      },
    ]);
  };

  // 👉 Видалення
  const removeMember = (id) => {
    setTeam((prev) => prev.filter((m) => m.id !== id));
  };

  // 👉 Перемикання активності
  const toggleActive = (id) => {
    setTeam((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, active: !m.active, updatedAt: new Date().toISOString() }
          : m
      )
    );
  };

  // 👉 Зміна ролі
  const updateRole = (id, newRole) => {
    setTeam((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, role: newRole, updatedAt: new Date().toISOString() }
          : m
      )
    );
  };

  return (
    <TeamContext.Provider
      value={{
        team,
        addMember,
        removeMember,
        toggleActive,
        updateRole,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}
