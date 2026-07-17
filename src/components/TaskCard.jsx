import { useNavigate } from "react-router-dom";

const badgeLabel = {
  pending: "Pending",
  completed: "Completed",
  overdue: "Overdue",
};

export default function TaskCard({ task, courseTitle }) {
  const navigate = useNavigate();

  return (
    <div
      className="task-card"
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/dashboard/my-tasks/${task.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") navigate(`/dashboard/my-tasks/${task.id}`);
      }}
    >
      <div className="task-card-icon">{task.icon}</div>

      <div className="task-card-body">
        <div className="task-card-title">{task.title}</div>
        <div className="task-card-meta">
          {courseTitle} · {task.type}
        </div>
      </div>

      <div className="task-card-side">
        <span className={`task-badge task-badge-${task.status}`}>
          {badgeLabel[task.status]}
        </span>
        <span className="task-card-due">
          {task.status === "completed" ? "Submitted" : `Due ${task.dueDate}`}
        </span>
      </div>
    </div>
  );
}
