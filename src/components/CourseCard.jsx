import { Link } from "react-router-dom";
import "./CourseCard.css";

const statusStyles = {
  "In Progress": "badge-progress",
  Completed: "badge-completed",
  "Not Started": "badge-notstarted",
};

export default function CourseCard({ id, icon, iconBg, title, trainer, duration, modulesCount, status, percent }) {
  return (
    <div className="course-card-premium hover:-translate-y-1 hover:shadow-md transition-all duration-300">
      <div className="course-card-header-row">
        <div className="course-card-info-side">
          <div className="course-card-icon-circle" style={{ background: iconBg }}>
            {icon}
          </div>
          <div className="course-card-details-block">
            <h4 className="course-card-title-text">{title}</h4>
            <span className="course-card-trainer-sub">
              {trainer} · {modulesCount} Modules · {duration}
            </span>
          </div>
        </div>

        <span className={`status-badge-consistent ${statusStyles[status] || ""}`}>
          {status === "Completed" ? "🟢" : status === "In Progress" ? "🟡" : "⚪"} {status}
        </span>
      </div>

      <div className="course-card-progress-row">
        <div className="course-card-bar-track">
          <div className="course-card-bar-fill" style={{ width: `${percent}%` }} />
        </div>
        <span className="course-card-bar-percentage">{percent}%</span>
      </div>

      <div className="course-card-actions-row">
        <span className="course-card-last-activity-tag">
          {status === "Completed" ? "🏆 Completed Course" : status === "In Progress" ? "⚡ Active Learning" : "⚪ Not Started"}
        </span>

        <Link
          to={`/dashboard/course/${id}`}
          className="course-card-action-btn font-body text-[11px] font-bold px-3.5 py-1.5 bg-forest text-paper rounded-lg transition-all duration-150"
        >
          {status === "Completed" ? "View Syllabus →" : status === "In Progress" ? "Continue Learning →" : "Start Course →"}
        </Link>
      </div>
    </div>
  );
}