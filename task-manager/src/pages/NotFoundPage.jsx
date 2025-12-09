// src/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <h2 style={styles.text}>Сторінку не знайдено</h2>

      <p style={{ color: "#666", marginBottom: "20px" }}>
        Можливо, ця задача була видалена або ви ввели неправильний шлях.
      </p>

      <Link to="/">
        <button style={styles.button}>Повернутися на головну</button>
      </Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    paddingTop: "100px",
  },
  code: {
    fontSize: "96px",
    margin: 0,
  },
  text: {
    fontSize: "28px",
    marginBottom: "10px",
  },
  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    background: "#1976d2",
    color: "white",
    cursor: "pointer",
  },
};
