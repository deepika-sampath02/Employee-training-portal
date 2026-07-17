import { createContext, useContext, useState } from "react";
import tasksData from "../data/tasksdata";

const TasksContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(tasksData);

  function getPendingCount() {
    return tasks.filter((t) => t.status === "pending" || t.status === "overdue").length;
  }

  function getTasksForCourse(courseId) {
    return tasks.filter((t) => t.courseId === courseId);
  }

  function submitTask(taskId, submission) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: "completed", submission } : t
      )
    );
  }

  function submitTaskByModule(courseId, moduleId, submission) {
    setTasks((prev) =>
      prev.map((t) =>
        t.courseId === courseId && t.moduleId === moduleId
          ? { ...t, status: "completed", submission: submission || "Submitted" }
          : t
      )
    );
  }

  const value = {
    tasks,
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
