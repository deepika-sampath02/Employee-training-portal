import { Outlet } from 'react-router-dom'
import { useCourses } from '../context/CoursesContext'
import { useTasks } from '../context/TasksContext'

// Waits until the signed-in employee's courses and tasks have loaded before showing the
// dashboard pages, so pages never flash "course not found" while data is still on its way.
export default function DataGate() {
  const { coursesLoaded, coursesError, reloadCourses } = useCourses()
  const { tasksLoaded, tasksError, reloadTasks } = useTasks()

  if (!coursesLoaded || !tasksLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper font-body text-sm text-slate">
        Loading your training...
      </div>
    )
  }

  if (coursesError || tasksError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-paper px-6 text-center font-body">
        <p className="text-sm text-slate">
          We couldn't load your training data. Please check that the server is running and try again.
        </p>
        <button
          type="button"
          onClick={() => {
            reloadCourses()
            reloadTasks()
          }}
          className="rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-paper"
        >
          Try again
        </button>
      </div>
    )
  }

  return <Outlet />
}
