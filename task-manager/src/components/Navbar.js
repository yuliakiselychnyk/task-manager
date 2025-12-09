import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={styles.nav}>
      <Link style={styles.link} to="/dashboard">Dashboard</Link>
      <Link style={styles.link} to="/tasks">Tasks</Link>
      <Link style={styles.link} to="/create">Create Task</Link>
      <Link style={styles.link} to="/team">Team</Link>
      <Link style={styles.link} to="/reports">Reports</Link>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    gap: "20px",
    padding: "15px 30px",
    background: "#eee",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  link: {
    textDecoration: "none",
    color: "#444",
    fontSize: "18px",
    fontWeight: "500",
  },
};
