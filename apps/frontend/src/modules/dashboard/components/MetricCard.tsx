import { HiTrendingUp, HiDocumentAdd, HiExclamation } from "react-icons/hi";
import "./metricCard.css";

interface MetricCardProps {
  title: string;
  value: number;
  subtitle: string;
  type: "success" | "warning" | "danger";
}

export function MetricCard({ title, value, subtitle, type }: MetricCardProps) {
  const renderIcon = () => {
    switch (type) {
      case "success":
        return <HiTrendingUp size={22} />;
      case "warning":
        return <HiDocumentAdd size={22} />;
      case "danger":
        return <HiExclamation size={22} />;
    }
  };

  return (
    <div className={`metric-card card-${type}`}>
      <div className="metric-card-header">
        <h4>{title}</h4>
        <div className="metric-icon-wrapper">{renderIcon()}</div>
      </div>

      <div className="metric-card-body">
        <span className="metric-value">{value}%</span>
        <span className="metric-subtitle">{subtitle}</span>
      </div>

      <div className="metric-progress-bg">
        <div
          className="metric-progress-fill"
          style={{ width: `${Math.min(value, 100)}%` }}
        ></div>
      </div>
    </div>
  );
}
