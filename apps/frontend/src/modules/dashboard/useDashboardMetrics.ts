import { useState, useEffect, useCallback } from "react";
import { sprintsRoutes } from "../../routes/sprintsRoutes";
import { tasksRoutes } from "../../routes/tasksRoutes";
import type { Sprint, TaskWithDetails } from "@activity_manager/types";

export interface DashboardMetrics {
  completionRate: number;
  completedTasksCount: number;
  totalSprintTasksCount: number;

  scopeAddedRate: number;
  scopeAddedCount: number;

  blockedIndex: number;
  blockedCount: number;

  workloadDistribution: {
    userName: string;
    totalTasks: number;
    completedTasks: number;
  }[];
}

export function useDashboardMetrics() {
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [selectedSprintId, setSelectedSprintId] = useState<string>("");

  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSprints() {
      try {
        setLoading(true);
        const data = await sprintsRoutes.getAll();
        setSprints(data);
        if (data.length > 0) {
          setSelectedSprintId(data[0].id);
        }
      } catch (err) {
        setError("Não foi possível carregar as Sprints no Dashboard.");
      } finally {
        setLoading(false);
      }
    }
    loadSprints();
  }, []);

  const calculateMetrics = useCallback(
    (tasks: TaskWithDetails[], currentSprint: Sprint) => {
      const totalTasks = tasks.length;

      if (totalTasks === 0) {
        return {
          completionRate: 0,
          completedTasksCount: 0,
          totalSprintTasksCount: 0,
          scopeAddedRate: 0,
          scopeAddedCount: 0,
          blockedIndex: 0,
          blockedCount: 0,
          workloadDistribution: [],
        };
      }

      const completedTasks = tasks.filter((t) => t.status === "DONE");
      const completionRate = Math.round(
        (completedTasks.length / totalTasks) * 100,
      );

      const sprintStart = new Date(currentSprint.startDate);
      const scopeAdded = tasks.filter(
        (t) => new Date(t.createdAt) > sprintStart,
      );
      const scopeAddedRate = Math.round((scopeAdded.length / totalTasks) * 100);

      const blockedTasks = tasks.filter((t) => t.status === "BLOCKED");
      const blockedIndex = Math.round((blockedTasks.length / totalTasks) * 100);

      const userMap: Record<string, { total: number; completed: number }> = {};

      tasks.forEach((task) => {
        const name = task.user ? task.user.name : "Sem Responsável";
        if (!userMap[name]) {
          userMap[name] = { total: 0, completed: 0 };
        }
        userMap[name].total += 1;
        if (task.status === "DONE") {
          userMap[name].completed += 1;
        }
      });

      const workloadDistribution = Object.keys(userMap).map((userName) => ({
        userName,
        totalTasks: userMap[userName].total,
        completedTasks: userMap[userName].completed,
      }));

      return {
        completionRate,
        completedTasksCount: completedTasks.length,
        totalSprintTasksCount: totalTasks,
        scopeAddedRate,
        scopeAddedCount: scopeAdded.length,
        blockedIndex,
        blockedCount: blockedTasks.length,
        workloadDistribution,
      };
    },
    [],
  );

  useEffect(() => {
    async function fetchDashboardData() {
      if (!selectedSprintId) return;

      try {
        setLoading(true);
        setError(null);

        const [currentSprint, tasks] = await Promise.all([
          sprintsRoutes.getById(selectedSprintId),
          tasksRoutes.getMany(selectedSprintId),
        ]);

        const computedMetrics = calculateMetrics(tasks, currentSprint);
        setMetrics(computedMetrics);
      } catch (err) {
        setError("Erro ao processar as métricas do Dashboard.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [selectedSprintId, calculateMetrics]);

  return {
    sprints,
    selectedSprintId,
    setSelectedSprintId,
    metrics,
    loading,
    error,
  };
}
