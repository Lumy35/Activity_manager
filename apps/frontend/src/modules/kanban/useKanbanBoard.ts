import { useState, useEffect, useCallback } from "react";
import { sprintsRoutes } from "../../routes/sprintsRoutes";
import { tasksRoutes } from "../../routes/tasksRoutes";
import type { TaskStatus, TaskWithDetails } from "@activity_manager/types";

export interface KanbanColumns {
  BACKLOG: TaskWithDetails[];
  IN_PROGRESS: TaskWithDetails[];
  BLOCKED: TaskWithDetails[];
  DONE: TaskWithDetails[];
}

export function useKanbanBoard() {
  const [sprints, setSprints] = useState<{ id: string; description: string }[]>(
    [],
  );
  const [selectedSprintId, setSelectedSprintId] = useState<string>("");

  const [columns, setColumns] = useState<KanbanColumns>({
    BACKLOG: [],
    IN_PROGRESS: [],
    BLOCKED: [],
    DONE: [],
  });

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
        setError("Não foi possível carregar as Sprints.");
      } finally {
        setLoading(false);
      }
    }
    loadSprints();
  }, []);

  const fetchTasks = useCallback(async () => {
    if (!selectedSprintId) return;

    try {
      setLoading(true);
      setError(null);
      const allTasks: TaskWithDetails[] =
        await tasksRoutes.getMany(selectedSprintId);

      const organizedColumns: KanbanColumns = {
        BACKLOG: allTasks.filter((t) => t.status === "BACKLOG"),
        IN_PROGRESS: allTasks.filter((t) => t.status === "IN_PROGRESS"),
        BLOCKED: allTasks.filter((t) => t.status === "BLOCKED"),
        DONE: allTasks.filter((t) => t.status === "DONE"),
      };

      setColumns(organizedColumns);
    } catch (err) {
      setError("Erro ao carregar as tarefas desta Sprint.");
    } finally {
      setLoading(false);
    }
  }, [selectedSprintId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const updateTaskStatus = async (taskId: string, newStatus: TaskStatus) => {
    try {
      setColumns((prev) => {
        let movedTask: TaskWithDetails | undefined;
        const updatedColumns = { ...prev };

        (Object.keys(updatedColumns) as TaskStatus[]).forEach((statusKey) => {
          const foundIndex = updatedColumns[statusKey].findIndex(
            (t) => t.id === taskId,
          );
          if (foundIndex !== -1) {
            movedTask = {
              ...updatedColumns[statusKey][foundIndex],
              status: newStatus,
            };
            updatedColumns[statusKey].splice(foundIndex, 1);
          }
        });

        if (movedTask) {
          updatedColumns[newStatus].push(movedTask);
        }

        return updatedColumns;
      });

      await tasksRoutes.update(taskId, { status: newStatus });
    } catch (err) {
      console.error("Erro ao atualizar status da tarefa:", err);

      fetchTasks();
    }
  };

  return {
    sprints,
    selectedSprintId,
    setSelectedSprintId,
    columns,
    loading,
    error,
    refreshTasks: fetchTasks,
    updateTaskStatus,
  };
}
