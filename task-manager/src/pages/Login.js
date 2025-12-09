import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


const handleLogin = (e) => {
  e.preventDefault();

  // тимчасово вважаємо будь-які дані "успішним логіном"
  navigate("/dashboard");
};


  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Вхід</h2>

      <form onSubmit={handleLogin} style={styles.form}>
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} type="submit">
          Увійти
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "80px auto",
    padding: "20px",
    borderRadius: "12px",
    background: "#f4f4f4",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#6a5acd",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
  },
};
<p style={{ textAlign: "center" }}>
  Немає акаунту?{" "}
  <a href="/register" style={{ color: "#6a5acd" }}>
    Зареєструватись
  </a>
</p>
