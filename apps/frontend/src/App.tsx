import { useState } from "react";
import KanbanPage from "./modules/kanban/kanbanPage";
import DashboardPage from "./modules/dashboard/dashboardPage";
import { HiTemplate } from "react-icons/hi";
import { FaChartPie } from "react-icons/fa";
import "./App.css";

export function App() {
  const [currentView, setCurrentView] = useState<"kanban" | "dashboard">(
    "kanban",
  );

  return (
    <div className="app-container">
      <nav className="nav-bar">
        <span
          className={`nav-link ${currentView === "kanban" ? "active" : ""}`}
          onClick={() => setCurrentView("kanban")}
        >
          <HiTemplate
            size={20}
            style={{ marginRight: "8px", verticalAlign: "middle" }}
          />{" "}
          Quadro Kanban
        </span>
        <span
          className={`nav-link ${currentView === "dashboard" ? "active" : ""}`}
          onClick={() => setCurrentView("dashboard")}
        >
          <FaChartPie
            size={18}
            style={{ marginRight: "8px", verticalAlign: "middle" }}
          />{" "}
          Dashboard Semanal
        </span>
      </nav>

      <main className="main-content">
        {currentView === "kanban" ? <KanbanPage /> : <DashboardPage />}
      </main>
    </div>
  );
}

export default App;
