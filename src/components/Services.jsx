import {
  FiCode,
  FiUsers,
  FiBriefcase,
  FiAward,
  FiStar,
} from 'react-icons/fi'
import {
  FaPython,
  FaCloud,
  FaComments,
  FaUserTie,
} from 'react-icons/fa'

const categories = [
  {
    icon: FiCode,
    title: 'Technical Training',
    items: ['Python', 'Java', 'SQL', 'Cloud'],
  },
  {
    icon: FiUsers,
    title: 'Soft Skills',
    items: ['Communication', 'Presentation', 'Leadership', 'Teamwork'],
  },
  {
    icon: FiBriefcase,
    title: 'HR Training',
    items: ['Workplace Ethics', 'POSH', 'Company Policies', 'Time Management'],
  },
  {
    icon: FiAward,
    title: 'Certification Programs',
    items: ['Assessment', 'Certificates', 'Skill Tracking'],
  },
]

const courses = [
  {
    title: 'Python for Beginners',
    level: 'Beginner',
    weeks: '8 Weeks',
    rating: 5,
    icon: FaPython,
    iconColor: 'text-[#3776AB] bg-[#3776AB]/10',
    borderColor: 'border-[#3776AB]/25',
  },
  {
    title: 'Cloud Infrastructure',
    level: 'Intermediate',
    weeks: '6 Weeks',
    rating: 5,
    icon: FaCloud,
    iconColor: 'text-[#00A4EF] bg-[#00A4EF]/10',
    borderColor: 'border-[#00A4EF]/25',
  },
  {
    title: 'Communication Skills',
    level: 'Beginner',
    weeks: '4 Weeks',
    rating: 5,
    icon: FaComments,
    iconColor: 'text-[#36B37E] bg-[#36B37E]/10',
    borderColor: 'border-[#36B37E]/25',
  },
  {
    title: 'Leadership Development',
    level: 'Advanced',
    weeks: '6 Weeks',
    rating: 5,
    icon: FaUserTie,
    iconColor: 'text-[#B8912F] bg-[#B8912F]/10',
    borderColor: 'border-[#B8912F]/25',
  },
]

export default function Services() {
  return (
    <section id="courses" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 max-w-xl">
        <span className="eyebrow">What We Offer</span>
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink lg:text-4xl">
          Training Programs Built Around Your Workforce
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => (
          <div
            key={c.title}
            className="rounded-2xl border border-ink/10 bg-white/70 p-6 shadow-card transition-transform hover:-translate-y-1 duration-300"
          >
            <c.icon className="text-forest" size={28} />
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">{c.title}</h3>
            <ul className="mt-3 space-y-1.5">
              {c.items.map((it) => (
                <li key={it} className="font-body text-sm text-slate">
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-24 flex items-end justify-between">
        <div>
          <span className="eyebrow">Enroll Today</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink lg:text-4xl">
            Featured Courses
          </h2>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {courses.map((c) => (
          <div
            key={c.title}
            className={`flex flex-col justify-between rounded-2xl border ${c.borderColor} bg-white p-6 shadow-card hover:-translate-y-1.5 transition-transform duration-300`}
          >
            <div>
              <div className={`inline-flex items-center justify-center p-3 rounded-xl ${c.iconColor} mb-4`}>
                <c.icon size={22} />
              </div>
              <h3 className="font-display text-lg font-semibold text-ink leading-snug">{c.title}</h3>
              
              <div className="mt-3 flex items-center gap-2">
                <span className="rounded-full bg-paperDark/70 px-2 py-0.5 font-mono text-[9px] font-semibold text-slate uppercase tracking-wider">
                  {c.level}
                </span>
                <span className="font-mono text-[11px] text-slate/80">
                  {c.weeks}
                </span>
              </div>
              
              <div className="mt-3 flex gap-0.5 text-brass">
                {Array.from({ length: c.rating }).map((_, i) => (
                  <FiStar key={i} fill="currentColor" size={14} className="fill-brass text-brass" />
                ))}
              </div>
            </div>
            <button className="mt-6 w-full rounded-full bg-forest py-2.5 font-body text-sm font-semibold text-paper transition-all hover:bg-forestDeep hover:shadow-md hover:-translate-y-0.5">
              Enroll
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
