import "./weeklyTable.css";

interface WorkloadData {
  userName: string;
  totalTasks: number;
  completedTasks: number;
}

interface WeeklyTableProps {
  data: WorkloadData[];
}

export function WeeklyTable({ data }: WeeklyTableProps) {
  return (
    <div className="weekly-table-container">
      <div className="table-header-title">
        <h3>Distribuição de Carga e Capacidade</h3>
        <p>Acompanhamento de alocação por integrante do time nesta Sprint</p>
      </div>

      <div className="table-responsive">
        <table className="weekly-table">
          <thead>
            <tr>
              <th>Responsável</th>
              <th>Total de Tarefas</th>
              <th>Concluídas</th>
              <th>Progresso Individual</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={4} className="table-empty">
                  Nenhum integrante alocado em tarefas nesta Sprint.
                </td>
              </tr>
            ) : (
              data.map((row, index) => {
                const progressPercentage =
                  row.totalTasks > 0
                    ? Math.round((row.completedTasks / row.totalTasks) * 100)
                    : 0;

                return (
                  <tr key={index}>
                    <td className="user-cell">
                      <div className="table-avatar">
                        {row.userName.charAt(0).toUpperCase()}
                      </div>
                      <span className="table-user-name">{row.userName}</span>
                    </td>
                    <td>
                      <span className="badge-total">{row.totalTasks}</span>
                    </td>
                    <td>
                      <span className="badge-done">{row.completedTasks}</span>
                    </td>
                    <td className="progress-cell">
                      <div className="cell-progress-container">
                        <span className="progress-text">
                          {progressPercentage}%
                        </span>
                        <div className="cell-progress-bar">
                          <div
                            className="cell-progress-fill"
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
