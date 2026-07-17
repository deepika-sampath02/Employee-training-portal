import { Link } from "react-router-dom";
import "./CourseTile.css";

const statusStyles = {
  "In Progress": "tile-badge-progress",
  Completed: "tile-badge-completed",
  "Not Started": "tile-badge-notstarted",
};

const actionLabel = {
  "In Progress": "▶ Continue Learning",
  Completed: "✓ View Certificate",
  "Not Started": "▶ Start Course",
};

export default function CourseTile({ id, title, duration, meta, status, percent, banner, bannerIcon }) {
  // Map friendly status emoji
  const statusEmoji = {
    "Completed": "🟢",
    "In Progress": "🟡",
    "Not Started": "⚪"
  };

  const isGradient = typeof banner === "string" && banner.startsWith("linear-gradient");

  return (
    <Link to={`/dashboard/course/${id}`} className="course-tile">
      {isGradient ? (
        <div className="course-tile-banner" style={{ background: banner }}>
          <div className="course-tile-banner-overlay" />
          <div className="course-tile-icon-container">
            <span className="course-tile-banner-icon">{bannerIcon}</span>
          </div>
          <div className={`course-tile-badge ${statusStyles[status] || ""}`}>
            <span className="badge-bullet">{statusEmoji[status]}</span>
            <span className="badge-text">{status}</span>
          </div>
        </div>
      ) : (
        <div className="course-tile-banner">
          <img src={banner} alt={title} className="course-tile-banner-img" />
          <div className={`course-tile-badge ${statusStyles[status] || ""}`}>
            <span className="badge-bullet">{statusEmoji[status]}</span>
            <span className="badge-text">{status}</span>
          </div>
        </div>
      )}

      <div className="course-tile-body">
        <h4 className="course-tile-title">{title}</h4>
        <div className="course-tile-meta">{meta || `5 Modules · ${duration || "Duration N/A"}`}</div>

        <div className="course-tile-progress-row">
          <div className="course-tile-progress-track">
            <div
              className="course-tile-progress-fill"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="course-tile-percent">{percent}%</span>
        </div>

        <div className="course-tile-action-row">
          <span className="course-tile-action">
            {actionLabel[status]}
          </span>
          <span className="course-tile-arrow">→</span>
        </div>
      </div>
    </Link>
  );
}

