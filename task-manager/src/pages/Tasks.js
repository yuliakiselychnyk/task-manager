import React from "react";
import { Link } from "react-router-dom";

function Tasks() {
  // Тимчасові фейкові дані
  const tasks = [
    { id: 1, title: "Зробити макет", status: "Нове", date: "2025-01-10" },
    { id: 2, title: "Підключити API", status: "В процесі", date: "2025-01-11" },
    { id: 3, title: "Написати презентацію", status: "Виконано", date: "2025-01-12" },
  ];

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Список задач 📋</h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          maxWidth: "900px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}
      >
        <thead>
          <tr style={{ background: "#f4f4f4" }}>
            <th style={th}>Назва</th>
            <th style={th}>Статус</th>
            <th style={th}>Дата</th>
            <th style={th}>Дії</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td style={td}>{task.title}</td>
              <td style={td}>{task.status}</td>
              <td style={td}>{task.date}</td>
              <td style={td}>
                <Link to={`/tasks/${task.id}`} style={action}>Переглянути</Link> |{" "}
                <Link to={`/edit/${task.id}`} style={action}>Редагувати</Link> |{" "}
                <span style={{ ...action, color: "red", cursor: "pointer" }}>
                  Видалити
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
  textAlign: "left",
  fontWeight: "600"
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #eee"
};

const action = {
  color: "#6a5acd",
  textDecoration: "none",
  fontWeight: "500"
};

export default Tasks;
