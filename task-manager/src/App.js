import React from "react";
import { Routes, Route } from "react-router-dom";

// Компоненти
import Navbar from "./components/Navbar";

// Сторінки
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/TaskDetails";
import CreateTask from "./pages/CreateTask";
import Team from "./pages/Team";
import Reports from "./pages/Reports";
import EditTask from "./pages/EditTask";

export default function App() {
  return (
    <>
      {/* Навігація */}
      <Navbar />

      {/* Маршрути */}
      <Routes>
        {/* Авторизація */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Основні сторінки */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
        <Route path="/create" element={<CreateTask />} />
        <Route path="/team" element={<Team />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
    </>
  );
}
