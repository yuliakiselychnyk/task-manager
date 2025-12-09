import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            {/* Заголовок + кнопка */}
            <div className="dashboard-header">
                <h1 className="dashboard-title">Завдання</h1>
                <button className="create-btn" onClick={() => navigate("/create")}>
                    + Створити завдання
                </button>
            </div>

            {/* Вкладки */}
            <div className="tabs">
                <div className="tab active">Нове</div>
                <div className="tab">В роботі</div>
            </div>

            {/* Сітка завдань */}
            <div className="tasks-grid">
                <div className="task-card">
                    <div className="task-title">Оновлення API</div>
                    <div className="task-meta">Завершити до 30.04.2024</div>
                    <div className="task-meta">Виконавець: Кисельничик</div>
                </div>

                <div className="task-card">
                    <div className="task-title">Тестування застосунку</div>
                    <div className="task-meta">Завершити до 22.04.2024</div>
                    <div className="task-meta">Виконавець: Іванченко Аліна</div>
                </div>

                <div className="task-card">
                    <div className="task-title">Підготувати звіт</div>
                    <div className="task-meta">Завершити до 23.04.2024</div>
                    <div className="task-meta">Виконавець: Ганець Микола</div>
                </div>

                <div className="task-card">
                    <div className="task-title">Дизайн інтерфейсу</div>
                    <div className="task-meta">Завершено 20.04.2024</div>
                    <div className="task-meta">Виконавець: Погорілка Аліса</div>
                </div>
            </div>

            {/* Статистика справа */}
            <div className="stats-box">
                <h3>Статистика</h3>

                <div className="stats-number">4</div>
                <div className="stats-label">Активні завдання</div>

                <div className="stats-number">12%</div>
                <div className="stats-label">Прострочено</div>

                <div className="stats-number">23</div>
                <div className="stats-label">Виконано</div>
            </div>
        </div>
    );
}

export default Dashboard;
