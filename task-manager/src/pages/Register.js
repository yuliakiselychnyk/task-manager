import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // Тимчасово просто виводимо дані
    console.log("REGISTER DATA:", { name, email, password });

    // Після реєстрації перенаправлення на логін
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Реєстрація</h2>

      <form onSubmit={handleRegister} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="Ваше імʼя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          Зареєструватись
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Вже маєте акаунт?{" "}
        <a href="/" style={{ color: "#6a5acd" }}>
          Увійти
        </a>
      </p>
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
