import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Wrap routes that need a signed-in employee. Pass `roles` to restrict further,
// e.g. <ProtectedRoute roles={['super_admin', 'admin']} />.
export default function ProtectedRoute({ roles }) {
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />
  }
  return <Outlet />
}
