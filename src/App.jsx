import { Routes, Route } from 'react-router-dom'

import PublicLayout from './components/PublicLayout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'

import DashboardLayout from './components/DashboardLayout'
import Dashboard from './pages/dashboard/Dashboard'
import MyCourses from './pages/dashboard/MyCourses'
import CourseDetails from './pages/dashboard/CoursesDetails'
import Lesson from './pages/dashboard/Lesson'
import MyTasks from './pages/dashboard/MyTasks'
import TaskDetails from './pages/dashboard/TaskDetails'
import Progress from './pages/dashboard/Progress'
import Certificates from './pages/dashboard/Certificates'
import Profile from './pages/dashboard/Profile'
import Settings from './pages/dashboard/Settings'
import Support from './pages/dashboard/Support'

import { CoursesProvider } from './context/CoursesContext'
import { TasksProvider } from './context/TasksContext'

export default function App() {
  return (
    <CoursesProvider>
      <TasksProvider>
        <Routes>
          {/* Public site — keeps your Navbar + Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Dashboard — uses Sidebar + Topbar instead */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="course/:courseId" element={<CourseDetails />} />
            <Route path="course/:courseId/module/:moduleId" element={<Lesson />} />
            <Route path="my-tasks" element={<MyTasks />} />
            <Route path="my-tasks/:taskId" element={<TaskDetails />} />
            <Route path="progress" element={<Progress />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="support" element={<Support />} />
          </Route>
        </Routes>
      </TasksProvider>
    </CoursesProvider>
  )
}