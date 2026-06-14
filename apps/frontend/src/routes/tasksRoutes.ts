import type { TaskStatus } from "@activity_manager/types";
import api from "../api/apiConfig";

export interface CreateTaskInput {
  description: string;
  status?: TaskStatus;
  dueDate?: string;
  userId?: string;
  sprintId?: string;
}

export const tasksRoutes = {
  getMany: async (sprintId?: string) => {
    const url = sprintId ? `/tasks?sprintId=${sprintId}` : "/tasks";
    const response = await api.get(url);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  create: async (data: CreateTaskInput) => {
    const response = await api.post("/tasks", data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateTaskInput>) => {
    const response = await api.patch(`/tasks/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/tasks/${id}`);
  },
};
