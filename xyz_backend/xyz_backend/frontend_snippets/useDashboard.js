// Example: load the dashboard numbers, courses and sessions in one call.
import { useEffect, useState } from "react";
import { api } from "../services/api";

export function useDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    api("/dashboard/").then(setData).catch((e) => setError(e.message));
  }, []);
  return { data, error };
}
// data.user.first_name           -> "Welcome back, Deepika!"
// data.stats.my_courses / my_tasks / completed / average_progress
// data.courses[]                 -> course_title, trainer_name, modules_count, duration_weeks, progress, status
// data.upcoming_sessions[]       -> title, session_type, start, end
// data.unread_notifications      -> bell badge
