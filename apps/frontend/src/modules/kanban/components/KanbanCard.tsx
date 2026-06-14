import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { FcCalendar } from "react-icons/fc";
import "./kanbanCard.css";
import type { TaskStatus, TaskWithDetails } from "@activity_manager/types";

interface KanbanCardProps {
  task: TaskWithDetails;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
}

export function KanbanCard({ task, onStatusChange }: KanbanCardProps) {
  const statusOrder: TaskStatus[] = [
    "BACKLOG",
    "IN_PROGRESS",
    "BLOCKED",
    "DONE",
  ];
  const currentIndex = statusOrder.indexOf(task.status);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  const isPastDue =
    task.dueDate &&
    task.status !== "DONE" &&
    new Date(task.dueDate) < new Date();

  return (
    <div className={`kanban-card ${isPastDue ? "atrasado" : ""}`}>
      <p className="card-description">{task.description}</p>

      <div className="card-footer">
        <div className="card-user" title={task.user?.name}>
          <span className="user-avatar">
            {task.user ? task.user.name.charAt(0).toUpperCase() : "?"}
          </span>
          <span className="user-name">
            {task.user ? task.user.name : "Sem responsável"}
          </span>
        </div>

        {task.dueDate && (
          <span className={`card-date ${isPastDue ? "date-alert" : ""}`}>
            <FcCalendar size={14} /> {formatDate(task.dueDate)}
          </span>
        )}
      </div>

      <div className="card-actions">
        <button
          disabled={currentIndex === 0}
          onClick={() => onStatusChange(task.id, statusOrder[currentIndex - 1])}
          title="Mover para coluna anterior"
        >
          <HiArrowLeft size={14} />
        </button>
        <button
          disabled={currentIndex === statusOrder.length - 1}
          onClick={() => onStatusChange(task.id, statusOrder[currentIndex + 1])}
          title="Mover para próxima coluna"
        >
          <HiArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
