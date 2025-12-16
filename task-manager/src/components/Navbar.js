// src/components/Navbar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  // ❗ ховаємо Navbar на login / register
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const isActive = (path) =>
    location.pathname.startsWith(path) ? "active" : "";

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* LEFT */}
        <div className="nav-left">
          <div className="nav-logo">TaskManager</div>

          <div className="nav-links">
            <Link className={isActive("/dashboard")} to="/dashboard">
              Огляд
            </Link>
            <Link className={isActive("/tasks")} to="/tasks">
              Завдання
            </Link>
            <Link className={isActive("/team")} to="/team">
              Команда
            </Link>
            <Link className={isActive("/reports")} to="/reports">
              Звіти
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="nav-right">
          {user && (
            <Link to="/tasks/create">
              <button className="create-btn">+ Створити</button>
            </Link>
          )}

          {user && (
            <button className="logout-btn" onClick={logout}>
              Вийти
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
