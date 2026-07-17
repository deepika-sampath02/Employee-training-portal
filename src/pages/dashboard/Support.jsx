import { useState } from 'react'
import './Support.css'

/* ---------- tiny inline icons ---------- */
const Icon = ({ path, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
)
const icons = {
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.5 2.1L7.9 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.5 2.9.6a2 2 0 0 1 1.8 2Z" />,
  chat: <path d="M21 11.5a8.4 8.4 0 0 1-1 4.1 8.5 8.5 0 0 1-7.5 4.4 8.4 8.4 0 0 1-4-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-4A8.5 8.5 0 0 1 8.4 3.5a8.4 8.4 0 0 1 4.1-1h.5a8.5 8.5 0 0 1 8 8v1Z" />,
  clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
  chevron: <path d="m6 9 6 6 6-6" />,
  ticket: <><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M13 5v2M13 17v2M13 11v2" /></>,
  attach: <path d="M21.4 11.1 12 20.4a5 5 0 0 1-7.1-7.1l9-9a3.5 3.5 0 0 1 5 5l-9 9a2 2 0 0 1-2.8-2.8l8.2-8.2" />,
  book: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2Z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7Z" /></>,
  video: <><rect x="2" y="5" width="15" height="14" rx="2" /><path d="m22 8-5 4 5 4Z" /></>,
  doc: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M9 13h6M9 17h6" /></>,
  user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
  pin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
  globe: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></>,
  star: <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1Z" />,
}

const quickHelp = [
  { icon: 'mail', title: 'Email Support', line: 'support@xyzacademy.com' },
  { icon: 'phone', title: 'Call Support', line: '+91 98765 43210' },
  { icon: 'chat', title: 'Live Chat', line: 'Available · 9 AM – 6 PM' },
  { icon: 'clock', title: 'Working Hours', line: 'Mon – Fri, 9 AM – 6 PM' },
]

const faqs = [
  { q: 'How do I reset my password?', a: 'Go to Settings → Security Settings → enter your current password → enter a new password → click Change Password.' },
  { q: 'How do I continue a course?', a: 'Go to My Courses, pick the course you started, and it will resume from your last completed module.' },
  { q: 'How do I download certificates?', a: 'Go to Certificates, find the completed course, and click Download next to it.' },
  { q: 'How do I submit assignments?', a: 'Open the task from My Tasks, attach your file or notes, and click Submit.' },
  { q: 'How do I contact my trainer?', a: 'Use the Trainer Contact card below, or click Send Message next to your assigned trainer.' },
  { q: 'Why is my course progress not updating?', a: 'Progress updates after each module is marked complete — try refreshing the page, or raise a ticket if it persists.' },
  { q: 'How do I change my profile picture?', a: 'Go to Settings → Account Settings → click Change Photo.' },
  { q: 'Can I access courses on mobile?', a: 'Yes, the portal is fully responsive and works on mobile browsers.' },
]

const categories = ['Account Issues', 'Course Access', 'Assignments', 'Certificates', 'Technical Problems', 'Payment Issues', 'Profile Issues', 'Other']

const initialTickets = [
  { id: '#SUP001', category: 'Course Access', status: 'Resolved', date: '15 Jul' },
  { id: '#SUP002', category: 'Assignments', status: 'Pending', date: '14 Jul' },
  { id: '#SUP003', category: 'Certificates', status: 'In Progress', date: '12 Jul' },
]

const statusClass = {
  Resolved: 'sup-status-resolved',
  Pending: 'sup-status-pending',
  'In Progress': 'sup-status-progress',
  Closed: 'sup-status-closed',
}

const resources = [
  { icon: 'book', title: 'User Guide', desc: 'How to use the LMS' },
  { icon: 'video', title: 'Video Tutorials', desc: 'Learn platform features' },
  { icon: 'doc', title: 'Academy Guidelines', desc: 'Rules & policies' },
  { icon: 'phone', title: 'Contact Trainer', desc: 'Reach your assigned trainer' },
]

export default function Support() {
  const [openFaq, setOpenFaq] = useState(null)
  const [tickets, setTickets] = useState(initialTickets)
  const [viewingTicket, setViewingTicket] = useState(null)

  const [form, setForm] = useState({ category: '', subject: '', priority: 'Medium', message: '', fileName: '' })
  const updateForm = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [feedback, setFeedback] = useState('')

  const handleSubmitTicket = (e) => {
    e.preventDefault()
    if (!form.category || !form.subject || !form.message) {
      alert('Please fill in category, subject, and message.')
      return
    }
    const newTicket = {
      id: `#SUP${String(tickets.length + 1).padStart(3, '0')}`,
      category: form.category,
      status: 'Pending',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
    }
    setTickets((t) => [newTicket, ...t])
    setForm({ category: '', subject: '', priority: 'Medium', message: '', fileName: '' })
    alert(`Ticket ${newTicket.id} submitted.`)
  }

  const handleSubmitFeedback = (e) => {
    e.preventDefault()
    if (rating === 0) {
      alert('Please select a star rating.')
      return
    }
    alert('Thanks for your feedback!')
    setRating(0)
    setFeedback('')
  }

  return (
    <div className="sup-page">
      {/* Hero */}
      <section className="sup-hero">
        <div>
          <span className="sup-hero-icon"><Icon path={icons.chat} size={26} /></span>
          <h1>Support Center</h1>
          <p>Need help? We're here to assist you with your courses, assignments, certificates, and technical issues.</p>
          <button className="sup-btn sup-btn-primary" onClick={() => document.getElementById('sup-ticket-form')?.scrollIntoView({ behavior: 'smooth' })}>
            Contact Support
          </button>
        </div>
      </section>

      {/* Quick help cards */}
      <div className="sup-grid-4">
        {quickHelp.map((c) => (
          <div className="sup-card sup-quick-card" key={c.title}>
            <span className="sup-card-icon"><Icon path={icons[c.icon]} /></span>
            <div>
              <h4>{c.title}</h4>
              <p>{c.line}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <section className="sup-card">
        <h2 className="sup-section-title">Frequently Asked Questions</h2>
        <div className="sup-faq-list">
          {faqs.map((f, i) => (
            <div className={`sup-faq-item ${openFaq === i ? 'open' : ''}`} key={f.q}>
              <button className="sup-faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{f.q}</span>
                <span className="sup-faq-chevron"><Icon path={icons.chevron} size={18} /></span>
              </button>
              {openFaq === i && <div className="sup-faq-answer">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Raise ticket */}
      <section className="sup-card" id="sup-ticket-form">
        <div className="stg-card-head-alt">
          <span className="sup-card-icon"><Icon path={icons.ticket} /></span>
          <h2 className="sup-section-title" style={{ margin: 0 }}>Raise a Support Ticket</h2>
        </div>
        <form className="sup-ticket-form" onSubmit={handleSubmitTicket}>
          <div className="sup-grid-2">
            <label className="sup-field">
              <span>Issue Category</span>
              <select value={form.category} onChange={(e) => updateForm('category', e.target.value)}>
                <option value="">Select a category</option>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label className="sup-field">
              <span>Subject</span>
              <input value={form.subject} onChange={(e) => updateForm('subject', e.target.value)} placeholder="Brief summary of the issue" />
            </label>
          </div>

          <div className="sup-field">
            <span>Priority</span>
            <div className="sup-choice-row">
              {['Low', 'Medium', 'High'].map((p) => (
                <button
                  type="button"
                  key={p}
                  className={`sup-choice ${form.priority === p ? 'active' : ''}`}
                  onClick={() => updateForm('priority', p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <label className="sup-field">
            <span>Message</span>
            <textarea rows={4} value={form.message} onChange={(e) => updateForm('message', e.target.value)} placeholder="Describe your issue in detail..." />
          </label>

          <label className="sup-field">
            <span>Attachment</span>
            <div className="sup-file-row">
              <label className="sup-btn sup-btn-outline sup-file-btn">
                <Icon path={icons.attach} size={16} /> Choose File
                <input type="file" hidden onChange={(e) => updateForm('fileName', e.target.files?.[0]?.name || '')} />
              </label>
              {form.fileName && <span className="sup-file-name">{form.fileName}</span>}
            </div>
          </label>

          <button type="submit" className="sup-btn sup-btn-primary">Submit Ticket</button>
        </form>
      </section>

      {/* My tickets */}
      <section className="sup-card">
        <h2 className="sup-section-title">My Support Tickets</h2>
        <div className="sup-table-wrap">
          <table className="sup-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.category}</td>
                  <td><span className={`sup-status ${statusClass[t.status] || ''}`}>{t.status}</span></td>
                  <td>{t.date}</td>
                  <td><button className="sup-link-btn" onClick={() => setViewingTicket(t)}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {viewingTicket && (
        <div className="sup-modal-backdrop" onClick={() => setViewingTicket(null)}>
          <div className="sup-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{viewingTicket.id}</h3>
            <p><strong>Category:</strong> {viewingTicket.category}</p>
            <p><strong>Status:</strong> <span className={`sup-status ${statusClass[viewingTicket.status] || ''}`}>{viewingTicket.status}</span></p>
            <p><strong>Date:</strong> {viewingTicket.date}</p>
            <button className="sup-btn sup-btn-outline" onClick={() => setViewingTicket(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Help resources */}
      <section>
        <h2 className="sup-section-title">Help Resources</h2>
        <div className="sup-grid-4">
          {resources.map((r) => (
            <div className="sup-card sup-quick-card sup-resource-card" key={r.title}>
              <span className="sup-card-icon"><Icon path={icons[r.icon]} /></span>
              <div>
                <h4>{r.title}</h4>
                <p>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trainer contact + contact info */}
      <div className="sup-grid-2-cols">
        <section className="sup-card">
          <h2 className="sup-section-title">Trainer Contact</h2>
          <div className="sup-trainer-row">
            <span className="sup-card-icon"><Icon path={icons.user} /></span>
            <div>
              <h4>Mr. Aravind</h4>
              <p className="sup-muted">Python Trainer</p>
              <p className="sup-muted">aravind@xyzacademy.com</p>
              <p className="sup-muted">+91 XXXXX XXXXX</p>
            </div>
          </div>
          <button className="sup-btn sup-btn-primary" onClick={() => alert('Message sent to trainer (demo).')}>Send Message</button>
        </section>

        <section className="sup-card">
          <h2 className="sup-section-title">Contact Information</h2>
          <p className="sup-contact-line"><Icon path={icons.pin} size={16} /> XYZ Academy, Chennai, Tamil Nadu</p>
          <p className="sup-contact-line"><Icon path={icons.mail} size={16} /> support@xyzacademy.com</p>
          <p className="sup-contact-line"><Icon path={icons.phone} size={16} /> +91 98765 43210</p>
          <p className="sup-contact-line"><Icon path={icons.globe} size={16} /> www.xyzacademy.com</p>
          <p className="sup-muted" style={{ marginTop: 10 }}>Working Hours: Monday – Friday, 9:00 AM – 6:00 PM</p>
        </section>
      </div>

      {/* Rate support */}
      <section className="sup-card">
        <h2 className="sup-section-title">Rate Our Support</h2>
        <form onSubmit={handleSubmitFeedback}>
          <div className="sup-stars">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type="button"
                key={n}
                className={`sup-star-btn ${(hoverRating || rating) >= n ? 'filled' : ''}`}
                onClick={() => setRating(n)}
                onMouseEnter={() => setHoverRating(n)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Icon path={icons.star} size={26} />
              </button>
            ))}
          </div>
          <label className="sup-field">
            <span>Comments</span>
            <textarea rows={3} value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Tell us about your experience..." />
          </label>
          <button type="submit" className="sup-btn sup-btn-primary">Submit Feedback</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="sup-footer">
        <div>
          <h4>Still Need Help?</h4>
          <p><Icon path={icons.mail} size={14} /> support@xyzacademy.com</p>
          <p><Icon path={icons.phone} size={14} /> +91 98765 43210</p>
        </div>
        <div className="sup-footer-response">
          <h4>Response Time</h4>
          <p>Within 24 Hours</p>
        </div>
      </footer>
    </div>
  )
}
