// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// Контексти
import { TasksProvider } from "./context/TasksContext";
import { ThemeProvider } from "./context/ThemeContext";

// Сторінки
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import TasksPage from "./pages/TasksPage";
import TaskDetails from "./pages/TaskDetails";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";

import Team from "./pages/Team";
import Reports from "./pages/Reports";

function App() {
  return (
    <ThemeProvider>
      <TasksProvider>
        <Navbar />

        <Routes>
          {/* Авторизація */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Основні сторінки */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Завдання */}
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/edit/:id" element={<EditTask />} />

          {/* Команда */}
          <Route path="/team" element={<Team />} />

          {/* Звіти */}
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </TasksProvider>
    </ThemeProvider>
  );
}

export default App;
