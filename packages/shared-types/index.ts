export interface TaskDTO {
  id: string;
  title: string;
  status: 'BACKLOG' | 'IN_PROGRESS' | 'BLOCKED' | 'DONE';
  dueDate: string;
}