import { useKanbanBoard } from "./useKanbanBoard";
import { KanbanCollum } from "./components/KanbanCollum";
import "./style.css";
import { GoAlert } from "react-icons/go";

export function KanbanPage() {
  const {
    sprints,
    selectedSprintId,
    setSelectedSprintId,
    columns,
    loading,
    error,
    updateTaskStatus,
  } = useKanbanBoard();

  return (
    <div className="kanban-page-container">
      <header className="kanban-page-header">
        <div className="header-text">
          <h2>Quadro de Tarefas</h2>
          <p className="header-subtitle">
            Gerencie o fluxo operacional da sua sprint em tempo real
          </p>
        </div>

        <div className="sprint-selector-container">
          <label htmlFor="sprint-select">Sprint Ativa:</label>
          <select
            id="sprint-select"
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
        <div className="kanban-error-message">
          <GoAlert size={14} /> {error}
        </div>
      )}

      {loading && (
        <div className="kanban-loading">
          <div className="spinner"></div>
          <p>Sincronizando com o banco de dados...</p>
        </div>
      )}

      {!loading && (
        <div className="kanban-board-grid">
          <KanbanCollum
            title="Backlog"
            status="BACKLOG"
            tasks={columns.BACKLOG}
            onStatusChange={updateTaskStatus}
          />
          <KanbanCollum
            title="Em Progresso"
            status="IN_PROGRESS"
            tasks={columns.IN_PROGRESS}
            onStatusChange={updateTaskStatus}
          />
          <KanbanCollum
            title="Impedido"
            status="BLOCKED"
            tasks={columns.BLOCKED}
            onStatusChange={updateTaskStatus}
          />
          <KanbanCollum
            title="Concluído"
            status="DONE"
            tasks={columns.DONE}
            onStatusChange={updateTaskStatus}
          />
        </div>
      )}
    </div>
  );
}

export default KanbanPage;
