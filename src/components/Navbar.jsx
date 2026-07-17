import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi'
import logo from '../assets/logo.png'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Courses', to: '/#courses' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="XYZ Academy seal" className="h-11 w-11" />
          <div className="leading-tight">
            <span className="block font-display text-lg font-semibold tracking-tight text-ink">
              XYZ Academy
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-slate">
              Corporate Training
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={({ isActive }) =>
                `font-body text-sm font-medium transition-colors hover:text-forest ${
                  isActive ? 'text-forest' : 'text-ink/75'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setLoginOpen(true)}
            onMouseLeave={() => setLoginOpen(false)}
          >
            <button className="flex items-center gap-1 rounded-full bg-forest px-4 py-2 font-body text-sm font-semibold text-paper shadow-card transition-transform hover:-translate-y-0.5">
              Employee Login <FiChevronDown size={14} />
            </button>
            {loginOpen && (
              <div className="absolute right-0 top-full w-52 overflow-hidden rounded-xl border border-ink/10 bg-white shadow-card">
                <Link
                  to="/login"
                  className="block px-4 py-3 font-body text-sm text-ink hover:bg-paperDark"
                >
                  Employee Portal
                </Link>
                <Link
                  to="/login"
                  className="block border-t border-ink/10 px-4 py-3 font-body text-sm text-ink hover:bg-paperDark"
                >
                  Start Learning
                </Link>
              </div>
            )}
          </div>
        </div>

        <button
          className="text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink/10 bg-paper px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="font-body text-sm font-medium text-ink/80"
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-forest px-4 py-2 text-center font-body text-sm font-semibold text-paper"
            >
              Employee Login
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
