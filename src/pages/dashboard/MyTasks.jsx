import { useState } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../../context/TasksContext";
import { useCourses } from "../../context/CoursesContext";
import "./MyTasks.css";

export default function MyTasks() {
  const { tasks } = useTasks();
  const { courses } = useCourses();
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  // Compute overall task statistics
  const totalCount = tasks.length;
  const pendingCount = tasks.filter((t) => t.status === "pending").length;
  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const overdueCount = tasks.filter((t) => t.status === "overdue").length;
  const completionPercent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

  // Filter tasks dynamically
  const filteredTasks = tasks.filter((t) => {
    const matchesFilter = activeFilter === "All" || t.status === activeFilter.toLowerCase();
    const course = courses.find((c) => c.id === t.courseId);
    const courseTitle = course ? course.title : "";
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      courseTitle.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Helper styles mapping
  const priorityIcons = {
    High: "🔥",
    Medium: "🟡",
    Low: "🟢",
  };

  const typeIcons = {
    Assignment: "📝",
    Quiz: "🧠",
    Project: "💻",
    Reading: "📄",
  };

  function getActionLabel(task) {
    if (task.status === "completed") {
      return "View Submission";
    }
    switch (task.type) {
      case "Quiz":
        return "Start Quiz →";
      case "Project":
        return "Open Project →";
      case "Reading":
        return "Open Reading →";
      default:
        return "Start Assignment →";
    }
  }

  function handleActionClick(task) {
    if (task.status === "completed") {
      setExpandedTaskId(expandedTaskId === task.id ? null : task.id);
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink">My Tasks</h2>
          <p className="font-body text-sm text-slate mt-1">Manage and submit your training assignments and quizzes</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-ink/10 rounded-full px-4 py-2 w-64 shadow-sm">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search tasks or courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-none outline-none text-xs w-full bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Summary Statistics Dashboard Cards */}
      <div className="tasks-stats-grid">
        <div className="tasks-stat-card border-l-4 border-brass">
          <div className="tasks-stat-icon-wrapper bg-brass/10 text-brass">📋</div>
          <div className="tasks-stat-info">
            <span className="tasks-stat-value">{pendingCount}</span>
            <span className="tasks-stat-label">Pending</span>
          </div>
        </div>
        <div className="tasks-stat-card border-l-4 border-forest">
          <div className="tasks-stat-icon-wrapper bg-forest/10 text-forest">✓</div>
          <div className="tasks-stat-info">
            <span className="tasks-stat-value">{completedCount}</span>
            <span className="tasks-stat-label">Completed</span>
          </div>
        </div>
        <div className="tasks-stat-card border-l-4 border-brick">
          <div className="tasks-stat-icon-wrapper bg-brick/10 text-brick">⚠️</div>
          <div className="tasks-stat-info">
            <span className="tasks-stat-value">{overdueCount}</span>
            <span className="tasks-stat-label">Overdue</span>
          </div>
        </div>
        <div className="tasks-stat-card border-l-4 border-indigo-500">
          <div className="tasks-stat-icon-wrapper bg-indigo-500/10 text-indigo-500">📈</div>
          <div className="tasks-stat-info">
            <span className="tasks-stat-value">{completionPercent}%</span>
            <span className="tasks-stat-label">Completion</span>
          </div>
        </div>
      </div>

      {/* Filters Chips with counts */}
      <div className="flex gap-2 flex-wrap">
        {[
          { label: "All", count: totalCount },
          { label: "Pending", count: pendingCount + overdueCount }, // Pending counts includes overdue
          { label: "Completed", count: completedCount },
          { label: "Overdue", count: overdueCount },
        ].map((filter) => (
          <button
            key={filter.label}
            onClick={() => setActiveFilter(filter.label)}
            className={`px-4 py-1.5 rounded-full font-body text-xs font-semibold border transition-all duration-300 ${
              activeFilter === filter.label
                ? "bg-forest text-paper border-forest"
                : "bg-white text-slate border-ink/10 hover:border-forest/30"
            }`}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="task-empty-state">
            <span className="task-empty-icon">🎉</span>
            <h4 className="task-empty-title">You're all caught up!</h4>
            <p className="task-empty-subtitle">No pending assignments remain for this filter.</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const course = courses.find((c) => c.id === task.courseId);
            const isOverdue = task.status === "overdue";
            const isCompleted = task.status === "completed";

            return (
              <div
                key={task.id}
                className={`task-card-container ${isOverdue ? "task-card-overdue" : ""}`}
              >
                <div className="task-card-row-top">
                  <div className="task-card-body-section">
                    <div className="task-card-icon-frame">
                      {typeIcons[task.type] || "📝"}
                    </div>
                    <div className="task-card-content-block">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
                          {priorityIcons[task.priority]} {task.priority} Priority
                        </span>
                        {course && (
                          <span className="task-card-course-info">
                            📚 {course.title}
                          </span>
                        )}
                      </div>
                      <h3 className="task-card-title-text">{task.title}</h3>
                      <p className="task-card-desc-text">{task.description}</p>
                    </div>
                  </div>

                  <span className={`task-status-badge task-status-${task.status}`}>
                    {task.status}
                  </span>
                </div>

                {/* Footer and Actions */}
                <div className="task-card-row-bottom">
                  <div className="task-card-meta-indicators">
                    <span>📅 Due: {task.dueDate}</span>
                    <span>⏱ {task.estimatedTime}</span>
                  </div>

                  {isCompleted ? (
                    <button
                      type="button"
                      className="task-card-action-btn task-card-completed-btn"
                      onClick={() => handleActionClick(task)}
                    >
                      {expandedTaskId === task.id ? "Hide Submission" : "View Submission"}
                    </button>
                  ) : (
                    task.moduleId && (
                      <Link
                        to={`/dashboard/course/${task.courseId}/module/${task.moduleId}`}
                        className="task-card-action-btn"
                      >
                        {getActionLabel(task)}
                      </Link>
                    )
                  )}
                </div>

                {/* Expanded Submission Log Drawer */}
                {expandedTaskId === task.id && task.submission && (
                  <div className="mt-3 p-4 bg-forest/5 border border-forest/10 rounded-xl font-body text-xs text-ink transition-all duration-300">
                    <strong className="block text-forest mb-1">Your Submission Notes:</strong>
                    <p className="m-0 leading-relaxed italic">"{task.submission}"</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
