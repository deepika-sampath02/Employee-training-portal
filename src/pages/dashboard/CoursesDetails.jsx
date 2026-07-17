import { useParams, Link, Navigate } from "react-router-dom";
import { useCourses } from "../../context/CoursesContext";
import "./CoursesDetails.css";

const moduleIcon = {
  completed: "✔",
  current: "▶",
  locked: "🔒",
};

export default function CourseDetails() {
  const { courseId } = useParams();
  const { getCourse, getPercent, getStatus } = useCourses();
  const course = getCourse(courseId);

  if (!course) {
    return <Navigate to="/dashboard/my-courses" replace />;
  }

  const percent = getPercent(course.id);
  const status = getStatus(course.id);

  // Compute completed modules count
  const completedCount = course.modules.filter((m) => m.status === "completed").length;
  const totalCount = course.modules.length;

  // Find the active module to navigate to on "Continue Learning"
  const activeModule = 
    course.modules.find((m) => m.status === "current") || 
    course.modules.find((m) => m.status === "completed") || 
    course.modules[0];

  const isGradient = typeof course.banner === "string" && course.banner.startsWith("linear-gradient");

  return (
    <div className="page-content">
      <Link to="/dashboard/my-courses" className="cd-back">← Back to My Courses</Link>

      {/* Hero Banner Section */}
      <div className="cd-hero-container">
        {isGradient ? (
          <div className="cd-hero" style={{ background: course.banner }} />
        ) : (
          <img src={course.banner} alt={course.title} className="cd-hero-img" />
        )}
      </div>

      {/* Header Info Block */}
      <div className="cd-header-card">
        <div className="cd-header-main">
          <div>
            <h2 className="cd-title">{course.title}</h2>
            <div className="cd-rating-row">
              <span className="cd-rating-stars">⭐⭐⭐⭐⭐</span>
              <span className="cd-rating-score">{course.rating || "4.8"}</span>
            </div>
            <p className="cd-hero-description">{course.description}</p>
          </div>
          
          <div className="cd-header-actions">
            <Link 
              to={`/dashboard/course/${course.id}/module/${activeModule.id}`} 
              className="cd-primary-btn"
            >
              ▶ Continue Learning
            </Link>
            <button type="button" className="cd-secondary-btn">
              Download Syllabus
            </button>
          </div>
        </div>
      </div>

      {/* Course Stats & Progress Row */}
      <div className="cd-stats-progress-row">
        {/* Statistics Grid */}
        <div className="cd-stats-grid">
          <div className="cd-stat-card">
            <span className="cd-stat-icon">📚</span>
            <div className="cd-stat-info">
              <span className="cd-stat-label">Modules</span>
              <span className="cd-stat-value">{totalCount} Modules</span>
            </div>
          </div>
          <div className="cd-stat-card">
            <span className="cd-stat-icon">⏳</span>
            <div className="cd-stat-info">
              <span className="cd-stat-label">Duration</span>
              <span className="cd-stat-value">{course.duration}</span>
            </div>
          </div>
          <div className="cd-stat-card">
            <span className="cd-stat-icon">🏅</span>
            <div className="cd-stat-info">
              <span className="cd-stat-label">Level</span>
              <span className="cd-stat-value">{course.level || "Beginner"}</span>
            </div>
          </div>
          <div className="cd-stat-card">
            <span className="cd-stat-icon">🏆</span>
            <div className="cd-stat-info">
              <span className="cd-stat-label">Certificate</span>
              <span className="cd-stat-value">{course.certificate || "Available"}</span>
            </div>
          </div>
          <div className="cd-stat-card cd-stat-card-trainer">
            <span className="cd-stat-icon">👤</span>
            <div className="cd-stat-info">
              <span className="cd-stat-label">Trainer</span>
              <span className="cd-stat-value">{course.trainer}</span>
            </div>
          </div>
        </div>

        {/* Progress Card */}
        <div className="cd-progress-card">
          <h4 className="cd-progress-card-title">Overall Progress</h4>
          <div className="cd-progress-row">
            <div className="cd-progress-track">
              <div className="cd-progress-fill" style={{ width: `${percent}%` }} />
            </div>
            <span className="cd-progress-percent">{percent}%</span>
          </div>
          <span className="cd-progress-subtitle">
            {completedCount} / {totalCount} Modules Completed
          </span>
        </div>
      </div>

      {/* Description Panel */}
      <div className="cd-panel">
        <h3 className="cd-panel-title">About this Course</h3>
        <p className="cd-panel-desc-text">
          Master the fundamentals of {course.title} alongside professional trainer {course.trainer}. 
          This syllabus is structured with hands-on practice, downloadable module notes, interactive assignments, 
          and a certificate of completion at the end of the modules.
        </p>
      </div>

      {/* Modules List Panel */}
      <div className="cd-panel">
        <h3 className="cd-panel-title">Modules</h3>
        <div className="cd-module-list">
          {course.modules.map((module, index) => {
            const isLocked = module.status === "locked";
            const isCompleted = module.status === "completed";
            const isCurrent = module.status === "current";

            const rowContent = (
              <>
                <div className="cd-module-left">
                  <span className={`cd-module-symbol cd-module-symbol-${module.status}`}>
                    {moduleIcon[module.status]}
                  </span>
                  <div className="cd-module-info">
                    <span className="cd-module-index">Module {index + 1}</span>
                    <span className="cd-module-name">{module.title}</span>
                  </div>
                </div>
                <div className="cd-module-right">
                  {isCompleted && <span className="cd-status-badge cd-badge-completed">Completed</span>}
                  {isCurrent && <span className="cd-status-badge cd-badge-current">Continue →</span>}
                  {isLocked && <span className="cd-status-badge cd-badge-locked">Locked</span>}
                </div>
              </>
            );

            return isLocked ? (
              <div key={module.id} className="cd-module-card cd-module-card-locked">
                {rowContent}
              </div>
            ) : (
              <Link
                key={module.id}
                to={`/dashboard/course/${course.id}/module/${module.id}`}
                className={`cd-module-card cd-module-card-clickable ${isCurrent ? "cd-module-card-active" : ""}`}
              >
                {rowContent}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

