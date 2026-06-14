import { KanbanCard } from "./KanbanCard";
import {
  HiClipboardList,
  HiRefresh,
  HiExclamation,
  HiCheckCircle,
} from "react-icons/hi";
import "./kanbanCollum.css";
import type { TaskStatus, TaskWithDetails } from "@activity_manager/types";

interface KanbanCollumProps {
  title: string;
  status: TaskStatus;
  tasks: TaskWithDetails[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
}

export function KanbanCollum({
  title,
  status,
  tasks,
  onStatusChange,
}: KanbanCollumProps) {
  const renderIcon = () => {
    switch (status) {
      case "BACKLOG":
        return <HiClipboardList size={18} className="icon-backlog" />;
      case "IN_PROGRESS":
        return <HiRefresh size={18} className="icon-progress" />;
      case "BLOCKED":
        return <HiExclamation size={18} className="icon-blocked" />;
      case "DONE":
        return <HiCheckCircle size={18} className="icon-done" />;
    }
  };

  return (
    <div className="kanban-column">
      <div className={`column-header header-${status.toLowerCase()}`}>
        <div className="header-title-group">
          {renderIcon()}
          <h3>{title}</h3>
        </div>
        <span className="column-count">{tasks.length}</span>
      </div>

      <div className="column-body">
        {tasks.length === 0 ? (
          <div className="column-empty">Nenhuma tarefa</div>
        ) : (
          tasks.map((task) => (
            <KanbanCard
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
}
