import { Link } from 'react-router-dom';
import "./DashboardCard.css";

export default function DashboardCard({ icon, iconBg, title, value, subtitle, linkTo }) {
  return (
    <Link to={linkTo} className="dashboard-card transition-all duration-300 hover:-translate-y-1 hover:shadow-md block">
      <div className="dashboard-card-icon" style={{ background: iconBg }}>
        {icon}
      </div>
      <div className="dashboard-card-content">
        <div className="dashboard-card-title">{title}</div>
        <div className="dashboard-card-value">{value}</div>
        <div className="dashboard-card-subtitle">{subtitle}</div>
      </div>
    </Link>
  );
}
