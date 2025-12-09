// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import { TaskProvider } from "./context/TaskContext";
import { TeamProvider } from "./context/TeamContext";

import TasksPage from "./pages/TasksPage";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import EditTaskPage from "./pages/EditTaskPage";
import ReportsPage from "./pages/ReportsPage";
import TeamPage from "./pages/TeamPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <TaskProvider>
      <TeamProvider>
        <Router>
          <div style={{ padding: "16px" }}>
            {/* Проста навігація */}
            <nav style={{ marginBottom: "16px" }}>
              <Link to="/dashboard" style={{ marginRight: 12 }}>
                Dashboard
              </Link>
              <Link to="/tasks" style={{ marginRight: 12 }}>
                Задачі
              </Link>
              <Link to="/report" style={{ marginRight: 12 }}>
                Звіт
              </Link>
              <Link to="/team">Команда</Link>
            </nav>

            <Routes>
              {/* редірект з кореня на dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/tasks/create" element={<CreateTaskPage />} />
              <Route path="/tasks/:id" element={<TaskDetailsPage />} />
              <Route path="/tasks/:id/edit" element={<EditTaskPage />} />

              <Route path="/report" element={<ReportsPage />} />
              <Route path="/team" element={<TeamPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </Router>
      </TeamProvider>
    </TaskProvider>
  );
}

export default App;
