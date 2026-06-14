import { useDashboardMetrics } from "./useDashboardMetrics";
import { MetricCard } from "./components/MetricCard";
import { WeeklyTable } from "./components/WeeklyTable";
import "./style.css";
import { GoAlert } from "react-icons/go";

export function DashboardPage() {
  const {
    sprints,
    selectedSprintId,
    setSelectedSprintId,
    metrics,
    loading,
    error,
  } = useDashboardMetrics();

  return (
    <div className="dashboard-page-container">
      <header className="dashboard-page-header">
        <div className="dashboard-header-text">
          <h2>Métricas Gerais da Semana</h2>
          <p className="dashboard-header-subtitle">
            Indicadores ágeis de performance e eficiência do time
          </p>
        </div>

        <div className="dashboard-sprint-filter">
          <label htmlFor="dashboard-sprint-select">Filtrar por Sprint:</label>
          <select
            id="dashboard-sprint-select"
            value={selectedSprintId}
            onChange={(e) => setSelectedSprintId(e.target.value)}
            disabled={sprints.length === 0}
          >
            {sprints.length === 0 ? (
              <option value="">Nenhuma sprint encontrada</option>
            ) : (
              sprints.map((sprint) => (
                <option key={sprint.id} value={sprint.id}>
                  {sprint.description}
                </option>
              ))
            )}
          </select>
        </div>
      </header>

      {error && (
        <div className="dashboard-error-zone">
          <GoAlert size={14} /> {error}
        </div>
      )}

      {loading && (
        <div className="dashboard-loading-zone">
          <div className="dashboard-spinner"></div>
          <p>Compilando dados analíticos...</p>
        </div>
      )}

      {!loading && metrics && (
        <div className="dashboard-content-layout">
          <section className="metrics-cards-grid">
            <MetricCard
              title="Taxa de Conclusão"
              value={metrics.completionRate}
              subtitle={`${metrics.completedTasksCount} de ${metrics.totalSprintTasksCount} tarefas entregues`}
              type="success"
            />
            <MetricCard
              title="Taxa de Escopo Adicionado"
              value={metrics.scopeAddedRate}
              subtitle={`${metrics.scopeAddedCount} tarefas criadas após o início`}
              type="warning"
            />
            <MetricCard
              title="Índice de Impedimentos"
              value={metrics.blockedIndex}
              subtitle={`${metrics.blockedCount} tarefas travadas em Blocked`}
              type="danger"
            />
          </section>

          <section className="metrics-table-section">
            <WeeklyTable data={metrics.workloadDistribution} />
          </section>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
