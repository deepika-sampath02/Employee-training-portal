import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "./AuthContext";

// Tasks now come from the backend (only the signed-in employee's tasks). The functions keep
// the same names and behaviour as before, so the other pages don't need to change.

const TasksContext = createContext(null);

export function TasksProvider({ children }) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    setError("");
    try {
      setTasks(await api("/my-tasks/"));
    } catch (err) {
      setError(err.message || "Could not load your tasks.");
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      reload();
    } else {
      setTasks([]);
      setLoaded(false);
      setError("");
    }
  }, [user?.id, reload]);

  function getPendingCount() {
    return tasks.filter((t) => t.status === "pending" || t.status === "overdue").length;
  }

  function getTasksForCourse(courseId) {
    return tasks.filter((t) => t.courseId === courseId);
  }

  function submitTask(taskId, submission) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: "completed", submission: submission || "Submitted" } : t
      )
    );
    api(`/my-tasks/${taskId}/submit/`, { method: "POST", body: { submission: submission || "" } }).catch(() => reload());
  }

  function submitTaskByModule(courseId, moduleId, submission) {
    setTasks((prev) =>
      prev.map((t) =>
        t.courseId === courseId && t.moduleId === moduleId
          ? { ...t, status: "completed", submission: submission || "Submitted" }
          : t
      )
    );
    api("/my-tasks/submit-by-module/", {
      method: "POST",
      body: { courseId, moduleId, submission: submission || "" },
    }).catch(() => reload());
  }

  const value = {
    tasks,
    tasksLoaded: loaded,
    tasksError: error,
    reloadTasks: reload,
    getPendingCount,
    getTasksForCourse,
    submitTask,
    submitTaskByModule,
  };

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) {
    throw new Error("useTasks must be used inside a TasksProvider");
  }
  return ctx;
}
