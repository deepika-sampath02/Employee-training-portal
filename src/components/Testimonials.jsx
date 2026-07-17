import { FiStar } from 'react-icons/fi'

const quotes = [
  {
    quote: 'The Python training helped me automate daily tasks that used to take hours.',
    name: 'Priya R.',
    role: 'Operations Analyst',
  },
  {
    quote: 'Excellent instructors and practical sessions — I use what I learned every week.',
    name: 'Arjun S.',
    role: 'Team Lead',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-paperDark">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <span className="eyebrow">Employee Testimonials</span>
        <h2 className="mt-3 max-w-lg font-display text-3xl font-semibold text-ink lg:text-4xl">
          What Our Learners Say
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {quotes.map((q) => (
            <blockquote
              key={q.name}
              className="rounded-2xl border border-ink/10 bg-white p-8 shadow-card"
            >
              <div className="flex gap-0.5 text-brass">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar key={i} fill="currentColor" size={14} />
                ))}
              </div>
              <p className="mt-4 font-display text-lg leading-relaxed text-ink">
                “{q.quote}”
              </p>
              <footer className="mt-4 font-mono text-xs uppercase tracking-wider text-slate">
                — {q.name}, {q.role}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
