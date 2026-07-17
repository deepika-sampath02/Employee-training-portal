import { Link } from "react-router-dom";
import DashboardCard from "../../components/DashboardCard";
import CourseCard from "../../components/CourseCard";
import { useCourses } from "../../context/CoursesContext";
import { useTasks } from "../../context/TasksContext";
import { 
  FiClock, 
  FiAward, 
  FiBookOpen, 
  FiCalendar, 
  FiTrendingUp, 
  FiAlertCircle 
} from "react-icons/fi";
import "./Dashboard.css";

const upcoming = [
  { title: "Python Q&A & Debugging", date: "14 July 2026", time: "03:00 PM - 04:30 PM", mode: "Live Q&A Class", highlight: true },
  { title: "React Live Workshop", date: "18 July 2026", time: "10:00 AM - 01:00 PM", mode: "Interactive Live Session" },
  { title: "SQL Webinar: Joins", date: "22 July 2026", time: "02:00 PM - 04:00 PM", mode: "Live Session" },
  { title: "Time Management Seminar", date: "25 July 2026", time: "11:00 AM - 01:00 PM", mode: "Online Session" },
];

const deadlinesData = [
  { title: "Leadership Quiz", course: "Leadership Essentials", dueDate: "Due: 15 July" },
  { title: "Python Loops Assignment", course: "Python Fundamentals", dueDate: "Due: 18 July" },
  { title: "React Card Project", course: "React Development", dueDate: "Due: 20 July" },
  { title: "Communication Explanatory Video", course: "Communication Skills", dueDate: "Due: 22 July" },
];

export default function Dashboard() {
  const { courses, getPercent, getStatus } = useCourses();
  const { getPendingCount } = useTasks();

  const activeCount = courses.filter(c => getStatus(c.id) === "In Progress" || getStatus(c.id) === "Not Started").length;
  const completedCount = courses.filter(c => getStatus(c.id) === "Completed").length;

  // Average progress calculation
  const totalPercent = courses.reduce((acc, c) => acc + getPercent(c.id), 0);
  const overallProgress = courses.length ? Math.round(totalPercent / courses.length) : 0;

  // Map courses for displaying in the panel
  const displayCourses = courses.map(c => {
    let iconBg = "#1E2A44";
    if (c.banner.includes(",")) {
      iconBg = c.banner.split(",")[0].replace("linear-gradient(135deg,", "").trim();
    }
    return {
      id: c.id,
      icon: c.bannerIcon,
      iconBg,
      title: c.title,
      trainer: c.trainer,
      duration: c.duration,
      modulesCount: c.modules.length,
      status: getStatus(c.id),
      percent: getPercent(c.id)
    };
  });

  const userName = "Deepika";
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Circular progress SVG configurations
  const progressRadius = 18;
  const progressCircumference = 2 * Math.PI * progressRadius;
  const progressDashoffset = progressCircumference - (overallProgress / 100) * progressCircumference;

  const pythonProgress = 40;
  const pythonDashoffset = progressCircumference - (pythonProgress / 100) * progressCircumference;

  return (
    <div className="page-content space-y-4">
      {/* Welcome banner row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h2 className="dash-welcome-title">Welcome back, {userName}! 👋</h2>
          <p className="dash-welcome-sub">Continue your learning journey and complete today's goals.</p>
        </div>
        <div className="dash-date">📅 {today}</div>
      </div>

      {/* Consistent Summary Statistics Cards */}
      <div className="dash-stats-grid">
        <div className="summary-stat-box-consistent border-l-4 border-indigo-500">
          <div className="stat-box-icon-circle bg-indigo-500/10 text-indigo-500">
            <FiBookOpen size={20} />
          </div>
          <div className="stat-box-info">
            <span className="stat-box-value">{activeCount}</span>
            <span className="stat-box-label">My Courses</span>
            <span className="stat-box-subtitle font-mono text-[9px] text-slate mt-0.5">
              Active syllabus
            </span>
          </div>
        </div>

        <div className="summary-stat-box-consistent border-l-4 border-brass">
          <div className="stat-box-icon-circle bg-brass/10 text-brass">
            <FiAlertCircle size={20} />
          </div>
          <div className="stat-box-info">
            <span className="stat-box-value">{getPendingCount()}</span>
            <span className="stat-box-label">My Tasks</span>
            <span className="stat-box-subtitle font-mono text-[9px] text-slate mt-0.5">
              Pending assignments
            </span>
          </div>
        </div>

        <div className="summary-stat-box-consistent border-l-4 border-forest">
          <div className="stat-box-icon-circle bg-forest/10 text-forest">
            <FiAward size={20} />
          </div>
          <div className="stat-box-info">
            <span className="stat-box-value">{completedCount}</span>
            <span className="stat-box-label">Completed</span>
            <span className="stat-box-subtitle font-mono text-[9px] text-slate mt-0.5">
              Certificates earned
            </span>
          </div>
        </div>

        {/* Circular progress card in the KPI grid */}
        <div className="summary-stat-box-consistent border-l-4 border-indigo-500 flex items-center justify-between">
          <div className="stat-box-info">
            <span className="stat-box-value">{overallProgress}%</span>
            <span className="stat-box-label">Average Progress</span>
            <span className="stat-box-subtitle font-mono text-[9px] text-slate mt-0.5">
              Across all courses
            </span>
          </div>
          {/* Circular SVG Progress Ring */}
          <div className="relative flex items-center justify-center h-10 w-10 shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="20"
                cy="20"
                r={progressRadius}
                className="text-paperDark stroke-current"
                strokeWidth="3.5"
                fill="transparent"
              />
              <circle
                cx="20"
                cy="20"
                r={progressRadius}
                className="text-forest stroke-current"
                strokeWidth="3.5"
                fill="transparent"
                strokeDasharray={progressCircumference}
                strokeDashoffset={progressDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute font-mono text-[9px] font-bold text-ink">{overallProgress}%</span>
          </div>
        </div>
      </div>

      {/* Balanced 2-Column Layout Container */}
      <div className="dash-two-column-layout">
        
        {/* Left Column (65% width): Main Course list, goal cards and featured banner */}
        <div className="dash-main-column space-y-4">
          {/* Motivating Featured banner */}
          <div className="dash-banner">
            <div className="dash-banner-icon">⭐</div>
            <div>
              <div className="dash-banner-title">Keep Going!</div>
              <div className="dash-banner-sub">You are doing great. Continue learning to achieve your goals.</div>
            </div>
          </div>

          <section className="dash-panel">
            <div className="dash-panel-header">
              <h3>My Courses</h3>
              <Link to="/dashboard/my-courses">View all →</Link>
            </div>
            <div className="space-y-3">
              {displayCourses.map((c) => (
                <CourseCard key={c.title} {...c} />
              ))}
            </div>
          </section>

          {/* Staggered Insights & Goals grouped under Main Column to avoid bottom gaps */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="dashboard-card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <div>
                  <span className="eyebrow block mb-1 text-[10px] uppercase font-bold text-slate">Learning Streak</span>
                  <div className="font-display text-2xl font-extrabold text-ink mt-2 flex items-center gap-2">
                    🔥 7 Days
                  </div>
                  <p className="font-body text-[11px] text-slate mt-2">
                    You've completed training every day this week. Keep up the momentum!
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-brass/10 flex items-center justify-center text-sm shrink-0">
                  🎯
                </div>
              </div>
            </div>

            <div className="dashboard-card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <span className="eyebrow block mb-1 text-[10px] uppercase font-bold text-slate">Upcoming Certificate</span>
                <div className="font-display text-sm font-bold text-ink mt-2 truncate">
                  Python Fundamentals
                </div>
                <p className="font-body text-[11px] text-slate mt-1.5">
                  Complete modules to unlock.
                </p>
              </div>

              {/* Circular SVG progress ring for Python */}
              <div className="relative flex items-center justify-center h-10 w-10 shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="20"
                    cy="20"
                    r={progressRadius}
                    className="text-paperDark stroke-current"
                    strokeWidth="3.5"
                    fill="transparent"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r={progressRadius}
                    className="text-forest stroke-current"
                    strokeWidth="3.5"
                    fill="transparent"
                    strokeDasharray={progressCircumference}
                    strokeDashoffset={pythonDashoffset}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute font-mono text-[9px] font-bold text-ink">{pythonProgress}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (35% width): Sidebar (Sessions, Deadlines, Announcements) */}
        <div className="dash-sidebar-column space-y-4">
          {/* Upcoming Sessions Panel */}
          <section className="dash-panel">
            <div className="dash-panel-header">
              <h3>Upcoming Sessions</h3>
              <Link to="/dashboard/calendar">View Calendar →</Link>
            </div>
            <div className="dash-training-list">
              {upcoming.map((item) => (
                <div
                  key={item.title}
                  className={"dash-training-item" + (item.highlight ? " dash-training-item-highlight" : "")}
                >
                  <span className="dash-training-icon">📅</span>
                  <div className="flex-1">
                    <div className="dash-training-title">{item.title}</div>
                    <div className="dash-training-meta">{item.date} · {item.time}</div>
                    <div className="dash-training-meta text-forest font-semibold mt-0.5">{item.mode}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Assignments Due Panel */}
          <section className="dash-panel">
            <div className="dash-panel-header">
              <h3>Assignments Due</h3>
            </div>
            <div className="dash-deadlines-list space-y-3">
              {deadlinesData.map((d) => (
                <div key={d.title} className="dash-deadline-item flex justify-between items-center p-3 bg-paper/20 border border-ink/5 rounded-xl">
                  <div>
                    <div className="dash-deadline-title font-body text-xs font-bold text-ink">{d.title}</div>
                    <span className="dash-deadline-course block font-body text-[10px] text-brass mt-0.5">📚 {d.course}</span>
                  </div>
                  <span className="dash-deadline-date font-mono text-[10px] text-brick font-semibold bg-brick/10 px-2 py-0.5 rounded-full">{d.dueDate}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Announcements Panel */}
          <section className="dash-panel">
            <div className="dash-panel-header">
              <h3>Announcements</h3>
            </div>
            <div className="dash-announcements-list space-y-3 font-body text-xs text-slate">
              <div className="p-3 bg-forest/5 border border-forest/10 rounded-xl">
                <strong className="block text-forest font-semibold">📢 Quarterly Evaluation</strong>
                <p className="m-0 mt-1">Please complete all pending assignments by 20 July for the quarterly performance review.</p>
              </div>
              <div className="p-3 bg-brass/5 border border-brass/10 rounded-xl">
                <strong className="block text-brass font-semibold">🔧 Scheduled Maintenance</strong>
                <p className="m-0 mt-1">LMS system will be offline for database updates this Sunday, 10 PM - 12 AM.</p>
              </div>
            </div>
          </section>
        </div>

      </div>

      <footer className="mt-8 border-t border-ink/10 pt-4 pb-2 text-[11px] font-mono text-slate flex justify-between">
        <span>© 2026 XYZ Academy</span>
        <span>Version 1.0</span>
      </footer>
    </div>
  );
}
