import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "./AuthContext";
import bannerMap from "../data/banners";

// Courses now come from the backend: only the courses assigned to the signed-in employee,
// with that employee's own progress. The functions below keep the same names and behaviour
// as before, so the other pages don't need to change.

const CoursesContext = createContext(null);

function calcPercent(modules) {
  if (!modules.length) return 0;
  const completed = modules.filter((m) => m.status === "completed").length;
  return Math.round((completed / modules.length) * 100);
}

// The backend sends a banner key; the image itself lives in the frontend (src/data/banners.js).
function withBanner(course) {
  return { ...course, banner: bannerMap[course.bannerKey] || "" };
}

export function CoursesProvider({ children }) {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    setError("");
    try {
      const data = await api("/my-courses/");
      setCourses(data.map(withBanner));
    } catch (err) {
      setError(err.message || "Could not load your courses.");
    } finally {
      setLoaded(true);
    }
  }, []);

  // Load when someone signs in; clear everything when they sign out.
  useEffect(() => {
    if (user?.id) {
      reload();
    } else {
      setCourses([]);
      setLoaded(false);
      setError("");
    }
  }, [user?.id, reload]);

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
  // The screen updates straight away, then the backend saves it (and re-syncs if that fails).
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

    api(`/my-courses/${courseId}/modules/${moduleId}/complete/`, { method: "POST" }).catch(() => reload());
  }

  const value = {
    courses,
    coursesLoaded: loaded,
    coursesError: error,
    reloadCourses: reload,
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
