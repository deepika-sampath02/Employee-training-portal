import { FiBookOpen, FiTv, FiFileText, FiAward, FiChevronRight, FiChevronDown } from 'react-icons/fi'

const steps = [
  {
    num: '01',
    title: 'Choose a Course',
    desc: 'Browse our catalog and select a program aligned with your goals.',
    icon: FiBookOpen,
  },
  {
    num: '02',
    title: 'Attend Live Training',
    desc: 'Participate in hands-on, live interactive sessions led by experts.',
    icon: FiTv,
  },
  {
    num: '03',
    title: 'Complete Assessment',
    desc: 'Verify your new skills through practical quizzes and projects.',
    icon: FiFileText,
  },
  {
    num: '04',
    title: 'Download Certificate',
    desc: 'Receive your verified industry certification to showcase growth.',
    icon: FiAward,
  },
]

export default function LearningProcess() {
  return (
    <section className="bg-paper border-t border-ink/5 relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-forest -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-brass -translate-y-1/2" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20 relative z-10">
        <div className="text-center mb-16">
          <span className="eyebrow">Our Methodology</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink lg:text-4xl">
            Learning Process
          </h2>
          <p className="mt-4 mx-auto max-w-md font-body text-sm text-slate">
            A structured, hands-on path designed to deliver immediate value and long-term career growth.
          </p>
        </div>

        <div className="relative grid gap-8 md:grid-cols-4">
          {steps.map((s, idx) => {
            const Icon = s.icon
            return (
              <div key={s.num} className="relative flex flex-col items-center text-center group">
                {/* Step Card Visual */}
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-card border border-ink/10 mb-6 transition-transform group-hover:-translate-y-1 duration-300">
                  <Icon className="text-forest" size={24} />
                </div>

                <span className="font-mono text-xs uppercase tracking-wider text-brass font-semibold">
                  Step {s.num}
                </span>

                <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                  {s.title}
                </h3>

                <p className="mt-3 font-body text-xs text-slate leading-relaxed px-4">
                  {s.desc}
                </p>

                {/* Connectors */}
                {idx < steps.length - 1 && (
                  <>
                    {/* Desktop Connector */}
                    <div className="absolute top-8 right-0 translate-x-1/2 hidden md:flex items-center text-brass/30">
                      <FiChevronRight size={22} className="animate-pulse" />
                    </div>
                    {/* Mobile Connector */}
                    <div className="flex justify-center mt-6 mb-2 md:hidden text-brass/30">
                      <FiChevronDown size={22} className="animate-pulse" />
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
