import { createContext, useContext, useState } from "react";
import coursesData from "../data/coursesData";

const CoursesContext = createContext(null);

function calcPercent(modules) {
  if (!modules.length) return 0;
  const completed = modules.filter((m) => m.status === "completed").length;
  return Math.round((completed / modules.length) * 100);
}

export function CoursesProvider({ children }) {
  const [courses, setCourses] = useState(coursesData);

  function getCourse(courseId) {
    return courses.find((c) => c.id === courseId);
  }

  function getModule(courseId, moduleId) {
    const course = getCourse(courseId);
    return course?.modules.find((m) => m.id === moduleId);
  }

  function getPercent(courseId) {
    const course = getCourse(courseId);
    return course ? calcPercent(course.modules) : 0;
  }

  function getStatus(courseId) {
    const percent = getPercent(courseId);
    if (percent === 100) return "Completed";
    if (percent === 0) return "Not Started";
    return "In Progress";
  }

  // Marks a module as completed, and unlocks the next module in that course.
  function markModuleComplete(courseId, moduleId) {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id !== courseId) return course;

        const modules = course.modules.map((m) =>
          m.id === moduleId ? { ...m, status: "completed" } : m
        );

        const index = modules.findIndex((m) => m.id === moduleId);
        if (index !== -1 && index + 1 < modules.length) {
          if (modules[index + 1].status === "locked") {
            modules[index + 1] = { ...modules[index + 1], status: "current" };
          }
        }

        return { ...course, modules };
      })
    );
  }

  const value = {
    courses,
    getCourse,
    getModule,
    getPercent,
    getStatus,
    markModuleComplete,
  };

  return (
    <CoursesContext.Provider value={value}>
      {children}
    </CoursesContext.Provider>
  );
}

export function useCourses() {
  const ctx = useContext(CoursesContext);
  if (!ctx) {
    throw new Error("useCourses must be used inside a CoursesProvider");
  }
  return ctx;
}
