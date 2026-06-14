import type { Sprint } from "@activity_manager/types";
import api from "../api/apiConfig";

export const sprintsRoutes = {
  getAll: async () => {
    const response = await api.get<Sprint[]>("/sprints");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Sprint>(`/sprints/${id}`);
    return response.data;
  },

  create: async (data: {
    description: string;
    startDate: string;
    endDate: string;
  }) => {
    const response = await api.post<Sprint>("/sprints", data);
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<{ description: string; startDate: string; endDate: string }>,
  ) => {
    const response = await api.patch<Sprint>(`/sprints/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/sprints/${id}`);
  },
};
