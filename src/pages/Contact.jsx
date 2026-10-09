import { useState } from 'react'
import { api } from '../services/api'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', work_email: '', company: '', message: '' })

  function update(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSending(true)
    try {
      await api('/contact/', { method: 'POST', auth: false, body: form })
      setSent(true)
    } catch (err) {
      if (err.status === 429) {
        setError('Too many messages in a short time. Please wait a minute and try again.')
      } else if (err.status === 400 && err.data) {
        // Show the first field error the server returned
        const first = Object.values(err.data)[0]
        setError(Array.isArray(first) ? first[0] : String(first))
      } else if (err instanceof TypeError) {
        setError('Cannot reach the server right now. Please try again shortly.')
      } else {
        setError(err.message || 'Something went wrong. Please try again.')
      }
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <span className="eyebrow">Get In Touch</span>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink">Contact Us</h1>
      <p className="mt-4 font-body text-slate">
        Want training for your team? Send us a note and we'll get back within one business day.
      </p>

      {sent ? (
        <div className="mt-10 rounded-2xl border border-forest/30 bg-forest/5 p-8">
          <p className="font-display text-lg font-medium text-forest">Message sent.</p>
          <p className="mt-1 font-body text-sm text-slate">
            Thanks for reaching out — our team will follow up shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-10 grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate">Name</span>
              <input required type="text" maxLength={120} value={form.name} onChange={update('name')} className="rounded-lg border border-ink/15 bg-white px-4 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-brass/50" />
            </label>
            <label className="grid gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate">Work Email</span>
              <input required type="email" value={form.work_email} onChange={update('work_email')} className="rounded-lg border border-ink/15 bg-white px-4 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-brass/50" />
            </label>
          </div>
          <label className="grid gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate">Company</span>
            <input type="text" maxLength={150} value={form.company} onChange={update('company')} className="rounded-lg border border-ink/15 bg-white px-4 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-brass/50" />
          </label>
          <label className="grid gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate">Message</span>
            <textarea required rows={5} maxLength={3000} value={form.message} onChange={update('message')} className="rounded-lg border border-ink/15 bg-white px-4 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-brass/50" />
          </label>

          {error && (
            <div role="alert" className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 font-body text-xs text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={sending}
            className="mt-2 w-fit rounded-full bg-forest px-7 py-3 font-body text-sm font-semibold text-paper shadow-card transition-transform hover:-translate-y-0.5 disabled:opacity-70"
          >
            {sending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  )
}
