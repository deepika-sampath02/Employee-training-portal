import { useState } from "react";
import { useParams, useNavigate, Link, Navigate } from "react-router-dom";
import { useCourses } from "../../context/CoursesContext";
import "./Lesson.css";

export default function Lesson() {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  const { getCourse, getModule, markModuleComplete } = useCourses();

  const [questionText, setQuestionText] = useState("");
  const [questions, setQuestions] = useState([
    { id: 1, user: "Deepika", text: "Is this module prerequisite for Advanced Python?", date: "Just now" },
    { id: 2, user: "Trainer (Mr. Aravind)", text: "Yes. Complete this module before Functions and OOP.", date: "1 hour ago" }
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const course = getCourse(courseId);
  const module = getModule(courseId, moduleId);

  if (!course || !module) {
    return <Navigate to="/dashboard/my-courses" replace />;
  }

  const moduleIndex = course.modules.findIndex((m) => m.id === moduleId);
  const nextModule = course.modules[moduleIndex + 1];
  const prevModule = course.modules[moduleIndex - 1];
  const isCompleted = module.status === "completed";

  // Calculate course completion progress metrics
  const completedCount = course.modules.filter((m) => m.status === "completed").length;
  const totalCount = course.modules.length;
  const coursePercent = Math.round((completedCount / totalCount) * 100);

  function handleMarkComplete() {
    markModuleComplete(courseId, moduleId);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4500);
  }

  function handleNext() {
    if (nextModule) {
      navigate(`/dashboard/course/${courseId}/module/${nextModule.id}`);
    } else {
      navigate(`/dashboard/course/${courseId}`);
    }
  }

  function handlePrev() {
    if (prevModule) {
      navigate(`/dashboard/course/${courseId}/module/${prevModule.id}`);
    }
  }

  function handlePostQuestion() {
    if (!questionText.trim()) return;
    setQuestions((prev) => [
      {
        id: Date.now(),
        user: "Deepika",
        text: questionText.trim(),
        date: "Just now"
      },
      ...prev
    ]);
    setQuestionText("");
  }

  function handleSubmitAssignment() {
    setIsSubmitted(true);
  }

  return (
    <div className="page-content">
      <Link to={`/dashboard/course/${courseId}`} className="lesson-back">
        ← Back to {course.title}
      </Link>

      {/* Lesson Header Area */}
      <div className="lesson-header-card">
        <div>
          <span className="lesson-eyebrow">Module {moduleIndex + 1} of {totalCount}</span>
          <h2 className="lesson-title">{module.title}</h2>
          <div className="lesson-meta-row">
            <span>⏱ Estimated: {module.estimatedTime || "25 mins"}</span>
            <span>🏅 Difficulty: {module.difficulty || "Beginner"}</span>
            <span>👤 Trainer: {course.trainer}</span>
          </div>
          <p className="lesson-header-description mt-3 text-slate text-sm font-body leading-relaxed">
            {module.description || "Learn core programming skills through practical examples and detailed guides."}
          </p>
        </div>
      </div>

      {/* 2-Column Workspace Grid */}
      <div className="lesson-workspace-grid">
        {/* Left Side: Video, Notes & Assignments */}
        <div className="lesson-main-content">
          <div className="lesson-video-wrap">
            <iframe
              width="100%"
              height="100%"
              src={module.videoUrl}
              title={module.title}
              allowFullScreen
            />
          </div>

          {/* Notes section with Anchor ID */}
          <div className="lesson-panel" id="notes-section">
            <h3 className="lesson-panel-title">📄 Module Notes</h3>
            <div className="notes-download-card-premium">
              <span className="notes-icon-premium">📄</span>
              <div className="notes-info-premium">
                <span className="notes-filename-premium">{course.id}_module{moduleIndex + 1}_notes.pdf</span>
                <span className="notes-filesize-premium">Official Lecture Slides • PDF • {module.notesSize || "2.4 MB"}</span>
              </div>
              <div className="notes-card-actions">
                <button type="button" className="notes-preview-btn">👁 Preview</button>
                <button type="button" className="notes-download-btn-premium">⬇ Download</button>
              </div>
            </div>
          </div>

          {/* Assignment section with Anchor ID */}
          <div className="lesson-panel" id="assignment-section">
            <h3 className="lesson-panel-title">📝 Assignment</h3>
            {module.assignment && typeof module.assignment === "object" ? (
              <div className="assignment-premium-card">
                <div className="assignment-card-header">
                  <h4 className="assignment-card-title">{module.assignment.title}</h4>
                  <span className="assignment-badge">Task</span>
                </div>
                <p className="assignment-card-description">{module.assignment.description}</p>
                
                {module.assignment.tasks && (
                  <ul className="assignment-tasks-checklist">
                    {module.assignment.tasks.map((t, idx) => (
                      <li key={idx}>
                        <span className="checklist-bullet">✔</span> {t}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="assignment-card-footer">
                  <span>⏱ {module.assignment.estimatedTime}</span>
                  <span>📅 Due: {module.assignment.dueDate}</span>
                  <span>🏅 Difficulty: {module.assignment.difficulty}</span>
                </div>
              </div>
            ) : (
              <p className="lesson-panel-text">{module.assignment}</p>
            )}

            {isSubmitted ? (
              <div className="assignment-success">
                🟢 Assignment Submitted Successfully!
              </div>
            ) : (
              <button type="button" className="lesson-primary-btn" onClick={handleSubmitAssignment}>
                Submit Assignment
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Progress, Objectives & Action Sidebar */}
        <div className="lesson-sidebar-content">
          {/* Lesson Completion Progress Card */}
          <div className="lesson-panel">
            <h4 className="lesson-sidebar-title">Lesson Progress</h4>
            <div className="lesson-progress-row">
              <div className="lesson-progress-track">
                <div className="lesson-progress-fill" style={{ width: `${coursePercent}%` }} />
              </div>
              <span className="lesson-progress-percent">{coursePercent}%</span>
            </div>
            <p className="lesson-progress-subtitle">
              {completedCount} of {totalCount} Modules Completed
            </p>
          </div>

          {/* Learning Objectives Card */}
          <div className="lesson-panel">
            <h4 className="lesson-sidebar-title">Learning Objectives</h4>
            <ul className="lesson-objectives-list">
              {module.objectives ? (
                module.objectives.map((obj, i) => (
                  <li key={i}>
                    <span className="objective-bullet-check">✓</span>
                    <span className="objective-text">{obj}</span>
                  </li>
                ))
              ) : (
                <>
                  <li><span className="objective-bullet-check">✓</span> <span className="objective-text">Understand concepts</span></li>
                  <li><span className="objective-bullet-check">✓</span> <span className="objective-text">Apply syntax filters</span></li>
                  <li><span className="objective-bullet-check">✓</span> <span className="objective-text">Complete review questions</span></li>
                </>
              )}
            </ul>
          </div>

          {/* Resources card (Third card in sidebar) */}
          <div className="lesson-panel">
            <h4 className="lesson-sidebar-title">Resources</h4>
            <div className="lesson-resources-quicklinks">
              <a href="#notes-section" className="resource-jump-link">
                <span className="link-icon">📄</span> Module Notes
              </a>
              <a href="#assignment-section" className="resource-jump-link">
                <span className="link-icon">📝</span> Assignment
              </a>
              <a href="#discussion-section" className="resource-jump-link">
                <span className="link-icon">💬</span> Discussion Board
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Discussion Forum Panel with Anchor ID */}
      <div className="lesson-panel" id="discussion-section">
        <h3 className="lesson-panel-title">💬 Discussion</h3>
        <div className="discussion-section">
          <div className="discussion-input-group">
            <textarea
              className="discussion-textarea"
              placeholder="Ask a question about this module..."
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
            <button type="button" className="discussion-post-btn" onClick={handlePostQuestion}>
              Post Question
            </button>
          </div>

          <div className="discussion-list">
            {questions.map((q) => {
              const isTrainer = q.user.toLowerCase().includes("trainer");
              return (
                <div key={q.id} className={`discussion-bubble-row ${isTrainer ? "bubble-row-trainer" : ""}`}>
                  <div className="discussion-avatar">
                    {isTrainer ? "👨‍🏫" : "👤"}
                  </div>
                  <div className={`discussion-chat-bubble ${isTrainer ? "bubble-trainer" : "bubble-user"}`}>
                    <div className="discussion-meta">
                      <span className="discussion-user">{q.user}</span>
                      <span className="discussion-date">{q.date}</span>
                    </div>
                    <p className="discussion-text">{q.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Actions / Navigation with titles */}
      <div className="lesson-actions">
        <button
          type="button"
          className="lesson-prev-btn"
          onClick={handlePrev}
          disabled={!prevModule}
        >
          {prevModule ? `← ${prevModule.title}` : "← Previous"}
        </button>

        <button
          type="button"
          className={"lesson-complete-btn" + (isCompleted ? " lesson-complete-btn-done" : "")}
          onClick={handleMarkComplete}
          disabled={isCompleted}
        >
          {isCompleted ? "✓ Completed" : "✓ Mark Complete"}
        </button>

        <button type="button" className="lesson-next-btn" onClick={handleNext}>
          {nextModule ? `${nextModule.title} →` : "Back to Course →"}
        </button>
      </div>

      {/* Floating Success Toast notification */}
      {showToast && (
        <div className="completion-toast animate-slide-in">
          <span className="toast-icon">🎉</span>
          <div className="toast-content">
            <strong className="toast-title">Lesson Completed!</strong>
            <p className="toast-subtitle">Progress updated and next module unlocked.</p>
          </div>
        </div>
      )}
    </div>
  );
}


