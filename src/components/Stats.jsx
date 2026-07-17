const stats = [
  { value: '500+', label: 'Employees Trained' },
  { value: '45+', label: 'Corporate Clients' },
  { value: '120+', label: 'Courses Available' },
  { value: '98%', label: 'Course Completion Rate' },
]

export default function Stats() {
  return (
    <section className="bg-forest border-y border-forestDeep">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-16 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="group text-center lg:border-l lg:border-paper/10 lg:first:border-l-0 py-4 transition-transform hover:-translate-y-1 duration-300"
          >
            <p className="font-display text-5xl font-semibold text-brassLight lg:text-6xl tracking-tight">
              {s.value}
            </p>
            {/* Elegant spacing divider */}
            <div className="h-[2px] w-6 bg-brassLight/30 mx-auto mt-5 mb-4 group-hover:w-10 transition-all duration-300" />
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/80 leading-relaxed max-w-[180px] mx-auto">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
