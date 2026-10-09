import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiBell, FiChevronDown, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'

function initialsOf(user) {
  const a = user?.first_name?.[0] || ''
  const b = user?.last_name?.[0] || ''
  return (a + b).toUpperCase() || '?'
}

export default function Topbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [unread, setUnread] = useState(0)

  // Unread notification count for the bell badge
  useEffect(() => {
    let alive = true
    api('/notifications/')
      .then((data) => {
        const list = data?.results ?? data ?? []
        if (alive) setUnread(list.filter((n) => !n.is_read).length)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  const displayName = user?.first_name
    ? `${user.first_name}${user.last_name ? ' ' + user.last_name : ''}`
    : 'Account'

  return (
    <header className="h-16 bg-transparent flex items-center justify-between px-8 sticky top-0 z-20">
      {/* Left side: Empty to match the screenshot */}
      <div></div>

      {/* Right side: Notifications, Profile, Sign out */}
      <div className="flex items-center gap-6">
        {/* Notification Bell with unread badge */}
        <button className="relative p-1 text-[#16241F] hover:text-brass transition-colors" aria-label="Notifications">
          <FiBell size={22} />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white leading-none">
              {unread > 9 ? '9+' : unread}
            </span>
          )}
        </button>

        {/* User Account / Avatar */}
        <Link to="/dashboard/profile" className="flex items-center gap-2 group">
          <div className="h-9 w-9 rounded-full overflow-hidden border border-gray-200 transition-transform group-hover:scale-105 flex items-center justify-center bg-forest text-paper text-xs font-semibold">
            {user?.photo_url ? (
              <img src={user.photo_url} alt={displayName} className="h-full w-full object-cover" />
            ) : (
              initialsOf(user)
            )}
          </div>
          <span className="font-body text-sm font-semibold text-ink group-hover:text-brass transition-colors">
            {displayName}
          </span>
          <FiChevronDown size={16} className="text-slate group-hover:text-ink transition-colors" />
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-1.5 font-body text-xs font-semibold text-slate hover:text-ink transition-colors"
          aria-label="Sign out"
        >
          <FiLogOut size={16} />
          <span>Sign out</span>
        </button>
      </div>
    </header>
  )
}
