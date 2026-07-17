import { NavLink, Link } from 'react-router-dom'
import { 
  FiHome, 
  FiBookOpen, 
  FiCheckSquare, 
  FiTrendingUp, 
  FiAward, 
  FiUser, 
  FiLogOut, 
  FiSettings, 
  FiHelpCircle,
  FiHeadphones,
  FiBook,
  FiMessageSquare,
  FiMail 
} from 'react-icons/fi'
import logo from '../assets/logo.png'

export default function Sidebar() {
  const menuItems = [
    { to: '/dashboard', label: 'Overview', icon: <FiHome size={18} />, end: true },
    { to: '/dashboard/my-courses', label: 'My Courses', icon: <FiBookOpen size={18} /> },
    { to: '/dashboard/my-tasks', label: 'My Tasks', icon: <FiCheckSquare size={18} /> },
    { to: '/dashboard/progress', label: 'Progress', icon: <FiTrendingUp size={18} /> },
    { to: '/dashboard/certificates', label: 'Certificates', icon: <FiAward size={18} /> },
    { to: '/dashboard/profile', label: 'Profile', icon: <FiUser size={18} /> },
  ]

  const bottomItems = [
    { to: '/dashboard/settings', label: 'Settings', icon: <FiSettings size={18} /> },
    { to: '/dashboard/support', label: 'Support', icon: <FiHelpCircle size={18} /> },
  ]

  return (
    <aside className="w-64 bg-forest text-paper flex flex-col h-screen sticky top-0 border-r border-forestDeep/50">
      {/* Logo / Header */}
      <div className="p-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="XYZ Academy seal" className="h-9 w-9 object-contain" />
          <div>
            <span className="block font-display text-base font-semibold tracking-tight text-paper">
              XYZ Academy
            </span>
            <span className="block font-mono text-[9px] uppercase tracking-wider text-brassLight">
              PORTAL
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-3 space-y-1.5 overflow-y-auto">
        <div className="space-y-1.5">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-brass text-white shadow-md' 
                    : 'text-paper/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Separator / Spacer */}
        <div className="my-6 border-t border-paper/10"></div>

        <div className="space-y-1.5">
          {bottomItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-brass text-white shadow-md' 
                    : 'text-paper/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
          
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm font-medium text-paper/70 hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            <FiLogOut size={18} />
            <span>Logout</span>
          </Link>
        </div>
      </nav>

      {/* Quick Links Section */}
      <div className="p-4 mt-auto">
        <div className="bg-forestDeep/40 rounded-2xl p-4 border border-paper/5">
          <span className="block font-mono text-[9px] uppercase tracking-wider text-brassLight/70 mb-3">
            Quick Links
          </span>
          <div className="space-y-3 font-body text-xs text-paper/70">
            <a href="#help" onClick={(e) => { e.preventDefault(); alert("Opening Help Center..."); }} className="flex items-center gap-2.5 hover:text-paper transition-colors">
              <FiHeadphones size={14} className="opacity-80" />
              <span>Help Center</span>
            </a>
            <a href="#guidelines" onClick={(e) => { e.preventDefault(); alert("Opening Academy Guidelines..."); }} className="flex items-center gap-2.5 hover:text-paper transition-colors">
              <FiBook size={14} className="opacity-80" />
              <span>Academy Guidelines</span>
            </a>
            <a href="#feedback" onClick={(e) => { e.preventDefault(); alert("Opening Feedback Form..."); }} className="flex items-center gap-2.5 hover:text-paper transition-colors">
              <FiMessageSquare size={14} className="opacity-80" />
              <span>Feedback</span>
            </a>
            <a href="#support" onClick={(e) => { e.preventDefault(); alert("Contacting support desk..."); }} className="flex items-center gap-2.5 hover:text-paper transition-colors">
              <FiMail size={14} className="opacity-80" />
              <span>Contact Support</span>
            </a>
          </div>
        </div>
      </div>
    </aside>
  )
}
