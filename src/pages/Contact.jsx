import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
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
              <input required type="text" className="rounded-lg border border-ink/15 bg-white px-4 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-brass/50" />
            </label>
            <label className="grid gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate">Work Email</span>
              <input required type="email" className="rounded-lg border border-ink/15 bg-white px-4 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-brass/50" />
            </label>
          </div>
          <label className="grid gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate">Company</span>
            <input type="text" className="rounded-lg border border-ink/15 bg-white px-4 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-brass/50" />
          </label>
          <label className="grid gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate">Message</span>
            <textarea required rows={5} className="rounded-lg border border-ink/15 bg-white px-4 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-brass/50" />
          </label>
          <button
            type="submit"
            className="mt-2 w-fit rounded-full bg-forest px-7 py-3 font-body text-sm font-semibold text-paper shadow-card transition-transform hover:-translate-y-0.5"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  )
}
