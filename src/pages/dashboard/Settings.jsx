import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import './Settings.css'

/* ---------- tiny inline icons (no external icon lib needed) ---------- */
const Icon = ({ path, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
)
const icons = {
  user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
  lock: <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
  bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></>,
  palette: <><circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.4-1-.2-.3-.4-.6-.4-1 0-.8.7-1.5 1.5-1.5H16c3.3 0 6-2.7 6-6 0-4.9-4.5-9-10-9z" /></>,
  globe: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></>,
  shield: <path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4Z" />,
  alert: <><path d="M10.3 3.3 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.3a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4M12 17h.01" /></>,
  logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5M21 12H9" /></>,
  camera: <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z" /><circle cx="12" cy="13" r="4" /></>,
  eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" /><circle cx="12" cy="12" r="3" /></>,
  eyeOff: <><path d="M17.9 17.9A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.6 21.6 0 0 1 5.1-6.1M9.9 4.2A10.4 10.4 0 0 1 12 4c7 0 11 8 11 8a21.7 21.7 0 0 1-3.2 4.4" /><path d="M1 1l22 22" /></>,
}

/* ---------- reusable bits ---------- */
function Card({ icon, title, desc, children, footer }) {
  return (
    <section className="stg-card">
      <div className="stg-card-head">
        <span className="stg-card-icon"><Icon path={icons[icon]} /></span>
        <div>
          <h3>{title}</h3>
          <p>{desc}</p>
        </div>
      </div>
      <div className="stg-card-body">{children}</div>
      {footer && <div className="stg-card-footer">{footer}</div>}
    </section>
  )
}

function Field({ label, children }) {
  return (
    <label className="stg-field">
      <span>{label}</span>
      {children}
    </label>
  )
}

function Toggle({ checked, onChange, label, desc }) {
  return (
    <div className="stg-toggle-row">
      <div>
        <p className="stg-toggle-label">{label}</p>
        {desc && <p className="stg-toggle-desc">{desc}</p>}
      </div>
      <button
        type="button"
        className={`stg-switch ${checked ? 'on' : ''}`}
        onClick={() => onChange(!checked)}
        aria-pressed={checked}
      >
        <span className="stg-switch-knob" />
      </button>
    </div>
  )
}

/* ---------- main page ---------- */
export default function Settings() {
  // account
  const [account, setAccount] = useState({
    employeeId: 'EMP001245',
    fullName: 'Deepika Sampath Kumar',
    email: 'deepika@xyzacademy.com',
    phone: '+91 9876543210',
    department: 'Artificial Intelligence',
    designation: 'AI Trainee',
    location: 'Chennai, Tamil Nadu',
  })
  const updateAccount = (key, value) => setAccount((a) => ({ ...a, [key]: value }))

  // security
  const [pwd, setPwd] = useState({ current: '', next: '', confirm: '' })
  const [showPwd, setShowPwd] = useState({ current: false, next: false, confirm: false })

  // notifications
  const [notifications, setNotifications] = useState({
    email: true,
    assignments: true,
    newCourses: true,
    certificates: true,
    weeklyReport: true,
    announcements: true,
  })
  const toggleNotif = (key) => setNotifications((n) => ({ ...n, [key]: !n[key] }))

  // appearance — wired to the real app-wide theme
  const { theme, setTheme, fontSize, setFontSize, accentColor, setAccentColor } = useTheme()

  // language & region
  const [language, setLanguage] = useState('English')
  const [timezone, setTimezone] = useState('(GMT+05:30) Asia/Kolkata')
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY')
  const [timeFormat, setTimeFormat] = useState('12 Hours')

  // privacy
  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showProgress: true,
    showCertificates: false,
    allowMessages: true,
  })
  const togglePrivacy = (key) => setPrivacy((p) => ({ ...p, [key]: !p[key] }))

  // logout confirm
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleSaveAccount = (e) => {
    e.preventDefault()
    alert('Account details saved.')
  }

  const handleChangePassword = (e) => {
    e.preventDefault()
    if (!pwd.current || !pwd.next || !pwd.confirm) {
      alert('Please fill in all password fields.')
      return
    }
    if (pwd.next !== pwd.confirm) {
      alert('New password and confirm password do not match.')
      return
    }
    alert('Password changed successfully.')
    setPwd({ current: '', next: '', confirm: '' })
  }

  const accentColors = ['#2563eb', '#16a34a', '#7c3aed', '#f59e0b', '#dc2626']

  const passwordChecks = [
    { label: 'Minimum 8 characters', pass: pwd.next.length >= 8 },
    { label: 'One uppercase letter', pass: /[A-Z]/.test(pwd.next) },
    { label: 'One number', pass: /[0-9]/.test(pwd.next) },
    { label: 'One special character', pass: /[^A-Za-z0-9]/.test(pwd.next) },
  ]

  return (
    <div className="stg-page">
      <div className="stg-header">
        <span className="stg-header-icon"><Icon path={icons.user} size={22} /></span>
        <div>
          <h1>Settings</h1>
          <p>Manage your account preferences and settings</p>
        </div>
        <div className="stg-breadcrumb">Dashboard &nbsp;›&nbsp; Settings</div>
      </div>

      {/* Account Settings */}
      <Card
        icon="user"
        title="Account Settings"
        desc="Update your personal information"
        footer={<button className="stg-btn stg-btn-primary" onClick={handleSaveAccount}>Save Changes</button>}
      >
        <div className="stg-avatar-row">
          <div className="stg-avatar">
            <img src="https://i.pravatar.cc/120?img=47" alt="Profile" />
            <span className="stg-avatar-camera"><Icon path={icons.camera} size={14} /></span>
          </div>
          <div>
            <button className="stg-btn stg-btn-outline">Change Photo</button>
            <p className="stg-hint">JPG, PNG up to 2MB</p>
          </div>
        </div>

        <div className="stg-grid-2">
          <Field label="Full Name">
            <input value={account.fullName} onChange={(e) => updateAccount('fullName', e.target.value)} />
          </Field>
          <Field label="Employee ID">
            <input value={account.employeeId} disabled />
          </Field>
          <Field label="Email Address">
            <input type="email" value={account.email} onChange={(e) => updateAccount('email', e.target.value)} />
          </Field>
          <Field label="Phone Number">
            <input value={account.phone} onChange={(e) => updateAccount('phone', e.target.value)} />
          </Field>
          <Field label="Department">
            <select value={account.department} onChange={(e) => updateAccount('department', e.target.value)}>
              <option>Artificial Intelligence</option>
              <option>Data Science</option>
              <option>Web Development</option>
              <option>Cloud Computing</option>
              <option>Cybersecurity</option>
            </select>
          </Field>
          <Field label="Designation">
            <input value={account.designation} onChange={(e) => updateAccount('designation', e.target.value)} />
          </Field>
          <Field label="Location">
            <input value={account.location} onChange={(e) => updateAccount('location', e.target.value)} />
          </Field>
        </div>
      </Card>

      {/* Security */}
      <Card icon="lock" title="Security Settings" desc="Change your password to keep your account secure">
        <div className="stg-grid-2">
          {['current', 'next', 'confirm'].map((key) => (
            <Field
              key={key}
              label={key === 'current' ? 'Current Password' : key === 'next' ? 'New Password' : 'Confirm New Password'}
            >
              <div className="stg-pwd-wrap">
                <input
                  type={showPwd[key] ? 'text' : 'password'}
                  placeholder={key === 'current' ? 'Enter current password' : key === 'next' ? 'Enter new password' : 'Confirm new password'}
                  value={pwd[key]}
                  onChange={(e) => setPwd((p) => ({ ...p, [key]: e.target.value }))}
                />
                <button
                  type="button"
                  className="stg-pwd-eye"
                  onClick={() => setShowPwd((s) => ({ ...s, [key]: !s[key] }))}
                >
                  <Icon path={showPwd[key] ? icons.eyeOff : icons.eye} size={16} />
                </button>
              </div>
            </Field>
          ))}
        </div>

        <div className="stg-pwd-footer">
          <div className="stg-pwd-requirements">
            <p>Password Requirements</p>
            <ul>
              {passwordChecks.map((c) => (
                <li key={c.label} className={c.pass ? 'ok' : ''}>✓ {c.label}</li>
              ))}
            </ul>
          </div>
          <button className="stg-btn stg-btn-primary" onClick={handleChangePassword}>Change Password</button>
        </div>
      </Card>

      {/* Notifications */}
      <Card icon="bell" title="Notification Preferences" desc="Choose what notifications you want to receive">
        <div className="stg-grid-2">
          <Toggle checked={notifications.email} onChange={() => toggleNotif('email')} label="Email Notifications" desc="Receive email updates" />
          <Toggle checked={notifications.certificates} onChange={() => toggleNotif('certificates')} label="Certificate Notifications" desc="Notify me about earned certificates" />
          <Toggle checked={notifications.assignments} onChange={() => toggleNotif('assignments')} label="Assignment Reminders" desc="Get reminders for pending tasks" />
          <Toggle checked={notifications.weeklyReport} onChange={() => toggleNotif('weeklyReport')} label="Weekly Progress Report" desc="Receive weekly learning summary" />
          <Toggle checked={notifications.newCourses} onChange={() => toggleNotif('newCourses')} label="New Course Alerts" desc="Notify me about new courses" />
          <Toggle checked={notifications.announcements} onChange={() => toggleNotif('announcements')} label="Announcements" desc="Important updates and news" />
        </div>
      </Card>

      <div className="stg-grid-2-cols">
        {/* Appearance */}
        <Card icon="palette" title="Appearance" desc="Customize the appearance of the platform">
          <div className="stg-appearance-row">
            <span className="stg-label-sm">Theme</span>
            <div className="stg-choice-row">
              <button className={`stg-choice ${theme === 'light' ? 'active' : ''}`} onClick={() => setTheme('light')}>☀ Light</button>
              <button className={`stg-choice ${theme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')}>☾ Dark</button>
            </div>
          </div>
          <div className="stg-appearance-row">
            <span className="stg-label-sm">Font Size</span>
            <div className="stg-choice-row">
              {['small', 'medium', 'large'].map((s) => (
                <button key={s} className={`stg-choice ${fontSize === s ? 'active' : ''}`} onClick={() => setFontSize(s)}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="stg-appearance-row">
            <span className="stg-label-sm">Accent Color</span>
            <div className="stg-swatch-row">
              {accentColors.map((c) => (
                <button
                  key={c}
                  className={`stg-swatch ${accentColor === c ? 'active' : ''}`}
                  style={{ background: c }}
                  onClick={() => setAccentColor(c)}
                  aria-label={c}
                />
              ))}
            </div>
          </div>
        </Card>

        {/* Language & Region */}
        <Card icon="globe" title="Language & Region" desc="Set your language and regional preferences">
          <div className="stg-grid-2">
            <Field label="Language">
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option>English</option>
                <option>Tamil</option>
                <option>Hindi</option>
              </select>
            </Field>
            <Field label="Timezone">
              <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                <option>(GMT+05:30) Asia/Kolkata</option>
                <option>(GMT+00:00) UTC</option>
                <option>(GMT-05:00) America/New_York</option>
              </select>
            </Field>
            <Field label="Date Format">
              <select value={dateFormat} onChange={(e) => setDateFormat(e.target.value)}>
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </Field>
            <Field label="Time Format">
              <select value={timeFormat} onChange={(e) => setTimeFormat(e.target.value)}>
                <option>12 Hours</option>
                <option>24 Hours</option>
              </select>
            </Field>
          </div>
        </Card>
      </div>

      {/* Privacy */}
      <Card icon="shield" title="Privacy Settings" desc="Manage your privacy preferences">
        <div className="stg-grid-2">
          <Toggle checked={privacy.showProfile} onChange={() => togglePrivacy('showProfile')} label="Show Profile to Colleagues" desc="Allow others to view your profile" />
          <Toggle checked={privacy.showCertificates} onChange={() => togglePrivacy('showCertificates')} label="Show Certificates Publicly" desc="Display certificates on your profile" />
          <Toggle checked={privacy.showProgress} onChange={() => togglePrivacy('showProgress')} label="Display Learning Progress" desc="Let others see your learning progress" />
          <Toggle checked={privacy.allowMessages} onChange={() => togglePrivacy('allowMessages')} label="Allow Trainer Messages" desc="Allow trainers to send you messages" />
        </div>
      </Card>

      {/* Account Actions */}
      <Card icon="alert" title="Account Actions" desc="Manage your account actions">
        <div className="stg-action-row">
          <div>
            <p className="stg-toggle-label">Download My Data</p>
            <p className="stg-toggle-desc">Download all your data and reports</p>
          </div>
          <button className="stg-btn stg-btn-outline" onClick={() => alert('Preparing your data download…')}>Download</button>
        </div>
        <div className="stg-action-row">
          <div>
            <p className="stg-toggle-label stg-danger">Delete Account</p>
            <p className="stg-toggle-desc">Permanently delete your account</p>
          </div>
          <button className="stg-btn stg-btn-danger" onClick={() => alert('This is a demo — account deletion is disabled.')}>Delete</button>
        </div>
      </Card>

      {/* Logout */}
      <Card icon="logout" title="Logout" desc="End your current session">
        {!showLogoutConfirm ? (
          <button className="stg-btn stg-btn-danger" onClick={() => setShowLogoutConfirm(true)}>Logout</button>
        ) : (
          <div className="stg-logout-confirm">
            <p>Are you sure you want to logout?</p>
            <div className="stg-choice-row">
              <button className="stg-btn stg-btn-outline" onClick={() => setShowLogoutConfirm(false)}>Cancel</button>
              <button className="stg-btn stg-btn-danger" onClick={() => alert('Logged out (demo).')}>Logout</button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
