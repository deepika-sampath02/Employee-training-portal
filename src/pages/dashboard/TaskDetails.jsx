import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../../context/TasksContext";
import "./TaskDetails.css";

const badgeLabel = {
  pending: "Pending",
  completed: "Completed",
  overdue: "Overdue",
};

export default function TaskDetails() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { getTask, markTaskComplete, getCourseTitle } = useTasks();

  const task = getTask(taskId);
  const [submissionText, setSubmissionText] = useState("");
  const [error, setError] = useState("");

  if (!task) {
    return (
      <div className="page-content">
        <div className="mytasks-empty">
          Task not found.{" "}
          <button className="task-back-link" onClick={() => navigate("/dashboard/my-tasks")}>
            ← Back to My Tasks
          </button>
        </div>
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!submissionText.trim()) {
      setError("Please write or paste your submission before submitting.");
      return;
    }
    setError("");
    markTaskComplete(task.id, submissionText.trim());
  }

  const isCompleted = task.status === "completed";

  return (
    <div className="page-content">
      <button className="task-back-link" onClick={() => navigate("/dashboard/my-tasks")}>
        ← Back to My Tasks
      </button>

      <div className="task-details-card">
        <div className="task-details-header">
          <div className="task-details-icon">{task.icon}</div>
          <div className="task-details-headtext">
            <h2 className="task-details-title">{task.title}</h2>
            <p className="task-details-meta">
              {getCourseTitle(task.courseId)} · {task.type}
            </p>
          </div>
          <span className={`task-badge task-badge-${task.status}`}>
            {badgeLabel[task.status]}
          </span>
        </div>

        <div className="task-details-info-grid">
          <div>
            <span className="task-details-label">Assigned</span>
            <span className="task-details-value">{task.assignedDate}</span>
          </div>
          <div>
            <span className="task-details-label">Due</span>
            <span className="task-details-value">{task.dueDate}</span>
          </div>
        </div>

        <div className="task-details-section">
          <h3>Instructions</h3>
          <p>{task.description}</p>
        </div>

        <div className="task-details-section">
          <h3>{isCompleted ? "Your Submission" : "Submit Your Work"}</h3>

          {isCompleted ? (
            <div className="task-submission-readonly">{task.submission}</div>
          ) : (
            <form onSubmit={handleSubmit} className="task-submission-form">
              <textarea
                className="task-submission-textarea"
                rows={6}
                placeholder="Paste your code, notes, or a summary of your work here..."
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
              />
              {error && <p className="task-submission-error">{error}</p>}
              <button type="submit" className="task-submit-btn">
                Mark Complete
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
