import { useCourses } from "../../context/CoursesContext";
import { useTasks } from "../../context/TasksContext";
import { Link } from "react-router-dom";
import { 
  FiBookOpen, 
  FiCheckCircle, 
  FiClock, 
  FiAward, 
  FiTrendingUp, 
  FiActivity, 
  FiArrowRight, 
  FiCalendar,
  FiDownload,
  FiExternalLink
} from "react-icons/fi";
import "./Progress.css";

export default function Progress() {
  const { courses, getPercent, getStatus } = useCourses();
  const { tasks } = useTasks();

  const totalCoursesCount = courses.length;
  const completedCourses = courses.filter((c) => getPercent(c.id) === 100);
  const completedCoursesCount = completedCourses.length;

  // Modules completed metrics
  const totalModulesCompleted = courses.reduce(
    (acc, c) => acc + c.modules.filter((m) => m.status === "completed").length,
    0
  );
  const totalModulesCount = courses.reduce((acc, c) => acc + c.modules.length, 0);

  // Overall average completion percent
  const totalPercentSum = courses.reduce((acc, c) => acc + getPercent(c.id), 0);
  const overallProgress = totalCoursesCount ? Math.round(totalPercentSum / totalCoursesCount) : 0;

  // Last accessed course mapping
  const lastAccessedMap = {
    "python-fundamentals": "Yesterday",
    "react-development": "Today",
    "sql-fundamentals": "12 Jul 2026",
    "communication-skills": "8 Jul 2026",
    "excel-analysis": "10 Jul 2026",
    "time-management": "9 Jul 2026",
    "leadership-essentials": "Not Accessed Yet",
    "presentation-skills": "2 Jul 2026",
  };

  // Dynamic next milestone course
  const nextMilestoneCourse = courses.find((c) => getPercent(c.id) < 100);

  // Status badge style selectors
  function getStatusBadgeClass(status) {
    switch (status) {
      case "Completed":
        return "badge-completed";
      case "In Progress":
        return "badge-in-progress";
      default:
        return "badge-not-started";
    }
  }

  function getStatusDot(status) {
    switch (status) {
      case "Completed":
        return "🟢";
      case "In Progress":
        return "🟡";
      default:
        return "⚪";
    }
  }

  // Week checklist activity representation
  const weekActivity = [
    { day: "Mon", active: true },
    { day: "Tue", active: true },
    { day: "Wed", active: true },
    { day: "Thu", active: true },
    { day: "Fri", active: true },
    { day: "Sat", active: false },
    { day: "Sun", active: true },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h2 className="progress-page-title">Progress</h2>
          <p className="progress-page-subtitle">Track your learning journey across all enrolled courses</p>
        </div>
        <span className="last-updated-badge font-mono text-[10px] text-slate bg-paperDark/20 px-3 py-1 rounded-full self-start md:self-auto">
          Last Updated: 12 Jul 2026 • 1:30 PM
        </span>
      </div>

      {/* KPI Cards */}
      <div className="progress-summary-grid">
        <div className="summary-stat-box-consistent border-l-4 border-indigo-500">
          <div className="stat-box-icon-circle bg-indigo-500/10 text-indigo-500">
            <FiTrendingUp size={20} />
          </div>
          <div className="stat-box-info">
            <span className="stat-box-value">{overallProgress}%</span>
            <span className="stat-box-label">Overall Progress</span>
            <span className="stat-box-subtitle font-mono text-[9px] text-slate mt-0.5">
              {totalModulesCompleted} / {totalModulesCount} Modules Completed
            </span>
          </div>
        </div>

        <div className="summary-stat-box-consistent border-l-4 border-forest">
          <div className="stat-box-icon-circle bg-forest/10 text-forest">
            <FiBookOpen size={20} />
          </div>
          <div className="stat-box-info">
            <span className="stat-box-value">{completedCoursesCount} / {totalCoursesCount}</span>
            <span className="stat-box-label">Courses Completed</span>
            <span className="stat-box-subtitle font-mono text-[9px] text-slate mt-0.5">
              Syllabus completed
            </span>
          </div>
        </div>

        <div className="summary-stat-box-consistent border-l-4 border-brass">
          <div className="stat-box-icon-circle bg-brass/10 text-brass">
            <FiClock size={20} />
          </div>
          <div className="stat-box-info">
            <span className="stat-box-value">24 hrs</span>
            <span className="stat-box-label">Learning Hours</span>
            <span className="stat-box-subtitle font-mono text-[9px] text-slate mt-0.5">
              Logged study time
            </span>
          </div>
        </div>

        <div className="summary-stat-box-consistent border-l-4 border-brick">
          <div className="stat-box-icon-circle bg-brick/10 text-brick">
            <FiAward size={20} />
          </div>
          <div className="stat-box-info">
            <span className="stat-box-value">{completedCoursesCount}</span>
            <span className="stat-box-label">Certificates Earned</span>
            <span className="stat-box-subtitle font-mono text-[9px] text-slate mt-0.5">
              Latest: SQL Fundamentals
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Weekly activity tracking checklist & Insights 2x2 grid */}
      <div className="progress-top-cards-grid">
        
        {/* Compact Last 7 Days Activity Checklist Card */}
        <div className="progress-panel">
          <h3 className="progress-panel-title flex items-center gap-2">
            <FiActivity className="text-forest" /> Weekly Activity
          </h3>
          <p className="font-body text-xs text-slate mb-4">Study streak activity logs over the last 7 calendar days.</p>
          <div className="weekly-checklist-row">
            {weekActivity.map((day) => (
              <div key={day.day} className="weekly-checklist-node">
                <span className="checklist-day-name font-mono text-[10px] text-slate">{day.day}</span>
                <div className={`checklist-day-circle ${day.active ? "day-completed" : "day-missed"}`}>
                  {day.active ? "✓" : "—"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Learning Goal & Insights Wrapper */}
        <div className="insights-goal-container space-y-4">
          {/* Current Goal Card */}
          <div className="progress-panel progress-goal-card">
            <h4 className="progress-panel-title text-sm font-bold uppercase tracking-wider mb-2">🎯 Current Goal</h4>
            <div className="flex justify-between items-center">
              <span className="goal-course-name font-body text-sm font-bold text-ink">Python Fundamentals</span>
              <span className="goal-course-percent font-mono text-xs font-bold text-brass">40% Complete</span>
            </div>
            <div className="flex justify-between items-center mt-2 font-mono text-[10px] text-slate">
              <span>Target Completion: 20 Jul 2026</span>
              <Link to="/dashboard/course/python-fundamentals/module/m3" className="goal-link-continue text-forest font-bold hover:underline">
                Resume Goal →
              </Link>
            </div>
          </div>

          {/* Learning Insights 2x2 grid */}
          <div className="progress-panel">
            <h3 className="progress-panel-title">Learning Insights</h3>
            <div className="insights-2x2-grid">
              <div className="insight-grid-box border border-paperDark/30 bg-paper/5 p-2 rounded-xl">
                <span className="insight-grid-icon block text-sm mb-1">🔥</span>
                <span className="insight-grid-val block font-display text-sm font-bold text-ink">7 Days</span>
                <span className="insight-grid-lbl block font-body text-[9px] text-slate">Current Streak</span>
              </div>
              <div className="insight-grid-box border border-paperDark/30 bg-paper/5 p-2 rounded-xl">
                <span className="insight-grid-icon block text-sm mb-1">⏱</span>
                <span className="insight-grid-val block font-display text-sm font-bold text-ink">45 mins/day</span>
                <span className="insight-grid-lbl block font-body text-[9px] text-slate">Avg Study Time</span>
              </div>
              <div className="insight-grid-box border border-paperDark/30 bg-paper/5 p-2 rounded-xl">
                <span className="insight-grid-icon block text-sm mb-1">🏆</span>
                <span className="insight-grid-val block font-body text-[10px] font-bold text-ink truncate">Python Cert</span>
                <span className="insight-grid-lbl block font-body text-[9px] text-slate">Next Milestone</span>
              </div>
              <div className="insight-grid-box border border-paperDark/30 bg-paper/5 p-2 rounded-xl">
                <span className="insight-grid-icon block text-sm mb-1">📈</span>
                <span className="insight-grid-val block font-display text-sm font-bold text-ink">{overallProgress}%</span>
                <span className="insight-grid-lbl block font-body text-[9px] text-slate">Completion Rate</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Row: Course Progress and Recent Activity */}
      <div className="progress-details-grid">
        
        {/* Left Side: Course Progress cards */}
        <div className="space-y-3">
          <h3 className="progress-panel-title">Course Progress</h3>
          <div className="course-progress-list">
            {courses.map((course) => {
              const percent = getPercent(course.id);
              const status = getStatus(course.id);
              const totalModules = course.modules.length;
              const completedModules = course.modules.filter((m) => m.status === "completed").length;
              const lastAccessed = lastAccessedMap[course.id] || "Yesterday";

              const activeModule =
                course.modules.find((m) => m.status === "current") ||
                course.modules.find((m) => m.status === "completed") ||
                course.modules[0];

              const radius = 18;
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset = circumference - (percent / 100) * circumference;

              return (
                <div key={course.id} className="course-progress-compact-card hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between gap-4">
                    {/* Icon & Details */}
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="course-progress-icon-circle shrink-0">{course.bannerIcon}</span>
                      <div className="min-w-0">
                        <h4 className="font-body text-sm font-bold text-ink truncate">{course.title}</h4>
                        <span className="block text-[11px] text-slate mt-0.5">
                          Trainer: {course.trainer} · {completedModules} / {totalModules} Modules
                        </span>
                      </div>
                    </div>

                    {/* Progress Ring & Button */}
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="relative flex items-center justify-center h-10 w-10">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="20"
                            cy="20"
                            r={radius}
                            className="text-paperDark stroke-current"
                            strokeWidth="3.5"
                            fill="transparent"
                          />
                          <circle
                            cx="20"
                            cy="20"
                            r={radius}
                            className="text-forest stroke-current"
                            strokeWidth="3.5"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="absolute font-mono text-[9px] font-bold text-ink">{percent}%</span>
                      </div>

                      <div className="course-progress-action">
                        {status === "Completed" ? (
                          <Link to="/dashboard/certificates" className="progress-btn-consistent text-xs font-bold text-center bg-forest text-paper border-0 py-2 rounded-lg">
                            Certificate
                          </Link>
                        ) : status === "In Progress" ? (
                          <Link
                            to={`/dashboard/course/${course.id}/module/${activeModule.id}`}
                            className="progress-btn-consistent text-xs font-bold text-center bg-forest text-paper border-0 py-2 rounded-lg"
                          >
                            Resume
                          </Link>
                        ) : (
                          <Link
                            to={`/dashboard/course/${course.id}`}
                            className="progress-btn-consistent text-xs font-bold text-center bg-paper text-slate border border-ink/20 py-2 rounded-lg"
                          >
                            Start
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side Timeline & Quick Resources (To replace whitespace!) */}
        <div className="space-y-4 self-start">
          {/* Recent Activity */}
          <div className="progress-panel">
            <h3 className="progress-panel-title flex items-center gap-2">
              <FiCalendar className="text-forest" /> Recent Activity
            </h3>
            <div className="timeline-container-premium">
              <div className="timeline-item flex gap-3">
                <div className="timeline-badge bg-forest text-paper">✓</div>
                <div className="timeline-content">
                  <strong className="block font-body text-[13px] font-bold text-ink">Completed SQL Fundamentals</strong>
                  <span className="block font-mono text-[9px] text-slate mt-0.5">12 Jul 2026</span>
                </div>
              </div>

              <div className="timeline-item flex gap-3">
                <div className="timeline-badge bg-forest text-paper">✓</div>
                <div className="timeline-content">
                  <strong className="block font-body text-[13px] font-bold text-ink">Downloaded Certificate</strong>
                  <span className="block font-mono text-[9px] text-slate mt-0.5">12 Jul 2026</span>
                </div>
              </div>

              <div className="timeline-item flex gap-3">
                <div className="timeline-badge bg-forest text-paper">✓</div>
                <div className="timeline-content">
                  <strong className="block font-body text-[13px] font-bold text-ink">Submitted Assignment</strong>
                  <span className="block font-mono text-[9px] text-slate mt-0.5">10 Jul 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Platform Resources card (Specifically fills the remaining bottom whitespace) */}
          <div className="progress-panel bg-brass/5 border border-brass/25">
            <h3 className="progress-panel-title text-sm font-bold uppercase tracking-wider text-brass mb-3 flex items-center gap-2">
              📂 Quick Help & Files
            </h3>
            <div className="space-y-2.5 font-body text-xs text-slate">
              <a href="#help" onClick={(e) => { e.preventDefault(); alert("Downloading Employee Learning Handbook..."); }} className="flex justify-between items-center p-2 bg-white rounded-lg border border-ink/5 hover:border-brass/35 transition-all">
                <span>📄 LMS Learning Guide.pdf</span>
                <FiDownload className="text-brass shrink-0" />
              </a>
              <a href="#help" onClick={(e) => { e.preventDefault(); alert("Opening Corporate Knowledge Base..."); }} className="flex justify-between items-center p-2 bg-white rounded-lg border border-ink/5 hover:border-brass/35 transition-all">
                <span>🌐 Corporate KB Portal</span>
                <FiExternalLink className="text-brass shrink-0" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
