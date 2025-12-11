import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-btn">
      {theme === "light" ? "🌙 Темна" : "☀️ Світла"}
    </button>
  );
}
