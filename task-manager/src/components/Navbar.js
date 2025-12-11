import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* ЛОГО ТА МЕНЮ */}
        <div className="nav-left">
          <div className="nav-logo">TaskManager</div>

          <div className="nav-links">
            <Link className={isActive("/dashboard")} to="/dashboard">Огляд</Link>
            <Link className={isActive("/tasks")} to="/tasks">Завдання</Link>
            <Link className={isActive("/team")} to="/team">Команда</Link>
            <Link className={isActive("/reports")} to="/reports">Звіти</Link>
          </div>
        </div>

        {/* КНОПКА СПРАВА */}
        <div className="nav-right">
          <Link to="/create">
            <button className="create-btn">+ Створити</button>
          </Link>
        </div>

      </div>
    </nav>
  );
}
