// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    register(name, email); // 🔑
    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Реєстрація</h2>

      <form onSubmit={handleRegister} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Ваше імʼя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button style={styles.button}>Зареєструватись</button>
      </form>

      <p style={styles.footerText}>
        Вже маєте акаунт?{" "}
        <Link to="/login" style={styles.link}>
          Увійти
        </Link>
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "100px auto",
    padding: "28px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  },
  title: { textAlign: "center", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "12px", borderRadius: "8px", border: "1px solid #ccc" },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#2d69e0",
    color: "white",
    cursor: "pointer",
  },
  footerText: { marginTop: "16px", textAlign: "center" },
  link: { color: "#2d69e0", fontWeight: 600 },
};
