export type TaskStatus = "BACKLOG" | "IN_PROGRESS" | "BLOCKED" | "DONE";

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  BACKLOG: "Backlog",
  IN_PROGRESS: "Em Progresso",
  BLOCKED: "Impedido",
  DONE: "Concluído",
};

export interface User {
  id: string;
  name: string;
  role: string;
}

export interface Sprint {
  id: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface Task {
  id: string;
  description: string;
  status: TaskStatus;
  dueDate: string | null;
  createdAt: string;
  completedAt: string | null;
  userId: string | null;
  sprintId: string | null;
}

export interface TaskWithDetails extends Task {
  user?: User | null;
  sprint?: Sprint | null;
}

export interface SprintWithCount extends Sprint {
  _count: {
    tasks: number;
  };
}

export interface UserWithCount extends User {
  _count: {
    tasks: number;
  };
}
