import { Link } from 'react-router-dom'
import { FiBell, FiChevronDown } from 'react-icons/fi'
import deepikaProfile from '../assets/deepika_profile.png'

export default function Topbar() {
  return (
    <header className="h-16 bg-transparent flex items-center justify-between px-8 sticky top-0 z-20">
      {/* Left side: Empty to match the screenshot */}
      <div></div>

      {/* Right side: Notifications and Profile */}
      <div className="flex items-center gap-6">
        {/* Notification Bell with red badge '2' */}
        <button className="relative p-1 text-[#16241F] hover:text-brass transition-colors" aria-label="Notifications">
          <FiBell size={22} />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white leading-none">
            2
          </span>
        </button>

        {/* User Account / Avatar with dropdown */}
        <Link to="/dashboard/profile" className="flex items-center gap-2 group">
          <div className="h-9 w-9 rounded-full overflow-hidden border border-gray-200 transition-transform group-hover:scale-105">
            <img src={deepikaProfile} alt="Deepika S." className="h-full w-full object-cover" />
          </div>
          <span className="font-body text-sm font-semibold text-ink group-hover:text-brass transition-colors">
            Deepika S.
          </span>
          <FiChevronDown size={16} className="text-slate group-hover:text-ink transition-colors" />
        </Link>
      </div>
    </header>
  )
}
