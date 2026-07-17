import { Link } from 'react-router-dom'
import { 
  FiTarget, 
  FiEye, 
  FiUsers, 
  FiTrendingUp, 
  FiAward, 
  FiZap, 
  FiArrowRight,
  FiBriefcase,
  FiBookOpen,
  FiClock,
  FiLayers
} from 'react-icons/fi'
import aboutIllustration from '../assets/about_illustration.png'

export default function About() {
  const stats = [
    { icon: <FiUsers className="text-brassLight" size={24} />, value: '500+', label: 'Employees Trained' },
    { icon: <FiBriefcase className="text-brassLight" size={24} />, value: '45+', label: 'Corporate Clients' },
    { icon: <FiBookOpen className="text-brassLight" size={24} />, value: '120+', label: 'Courses Delivered' },
    { icon: <FiAward className="text-brassLight" size={24} />, value: '98%', label: 'Completion Rate' }
  ]

  const values = [
    { icon: <FiUsers className="text-forest" size={20} />, title: 'Collaboration', desc: 'Working closely with HR and management to align training with company objectives.' },
    { icon: <FiTrendingUp className="text-forest" size={20} />, title: 'Continuous Learning', desc: 'Fostering a growth mindset that keeps employees adaptable and ahead of industry trends.' },
    { icon: <FiAward className="text-forest" size={20} />, title: 'Excellence', desc: 'Delivering gold-standard training programs with proven real-world outcomes.' },
    { icon: <FiZap className="text-forest" size={20} />, title: 'Innovation', desc: 'Utilizing modern pedagogy, interactive tech, and hands-on projects.' }
  ]

  const reasons = [
    { icon: <FiUsers className="text-brass" size={20} />, title: 'Expert Trainers', desc: 'Learn from active practitioners with years of field experience.' },
    { icon: <FiBookOpen className="text-brass" size={20} />, title: 'Practical Learning', desc: 'Case studies and real-world scenarios instead of dry theory.' },
    { icon: <FiClock className="text-brass" size={20} />, title: 'Flexible Delivery', desc: 'On-site workshops or interactive virtual cohorts.' },
    { icon: <FiTrendingUp className="text-brass" size={20} />, title: 'Progress Tracking', desc: 'Regular milestones and performance metrics for management.' },
    { icon: <FiAward className="text-brass" size={20} />, title: 'Real Certification', desc: 'Boost career credibility with certificates recognized by top firms.' },
    { icon: <FiLayers className="text-brass" size={20} />, title: 'Hands-on Projects', desc: 'Build real portfolio items that prove your skill sets.' }
  ]

  const timeline = [
    { year: '2023', title: 'Company Started', desc: 'XYZ Academy was founded with the mission to redefine corporate learning.' },
    { year: '2024', title: '100 Employees Trained', desc: 'Partnered with initial core clients to deliver soft skills and dev training.' },
    { year: '2025', title: 'Corporate Partnerships', desc: 'Scaled operations to sign direct long-term partnerships with major organizations.' },
    { year: '2026', title: '500+ Employees Trained', desc: 'Reached a new milestone of workforce training with active, live tracks.' }
  ]

  return (
    <div className="bg-paper/10 min-h-screen">
      {/* 1. Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brass/10 px-3 py-1 text-xs font-semibold text-brass">
              <span>⭐</span>
              <span>Trusted by 45+ Companies</span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink lg:text-6xl">
              Learning Is Our Craft
            </h1>
            <p className="mt-6 font-body text-base leading-relaxed text-slate">
              XYZ Academy partners with organizations to deliver practical corporate training
              that improves technical, leadership, and workplace skills through measurable,
              job-focused learning.
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-xl">
            <div className="overflow-hidden rounded-3xl border border-brass/25 bg-white shadow-card p-2 animate-drift">
              <img
                src={aboutIllustration}
                alt="Corporate Training Collaboration"
                className="w-full h-auto rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Company Statistics */}
      <section className="bg-forest py-16 text-paper">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center rounded-2xl border border-paper/10 bg-white/5 p-6 backdrop-blur-sm hover:-translate-y-1.5 hover:shadow-card hover:border-paper/20 hover:bg-white/10 transition-all duration-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-paper/10 mb-4">
                  {stat.icon}
                </div>
                <span className="font-display text-3xl font-bold text-brassLight md:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-2 text-center font-body text-xs font-medium tracking-wide text-paper/70">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision Cards */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 sm:grid-cols-2">
          {/* Mission Card */}
          <div className="group rounded-2xl border border-ink/10 bg-white/70 p-10 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-forest/10 transition-colors group-hover:bg-forest/20">
              <FiTarget className="text-forest" size={26} />
            </div>
            <h2 className="mt-6 font-display text-2xl font-semibold text-ink">Our Mission</h2>
            <p className="mt-3 font-body text-sm leading-relaxed text-slate">
              To make continuous learning a natural part of every employee's career — practical,
              accessible, and tied directly to the work they do.
            </p>
          </div>
          {/* Vision Card */}
          <div className="group rounded-2xl border border-ink/10 bg-white/70 p-10 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brass/10 transition-colors group-hover:bg-brass/20">
              <FiEye className="text-brass" size={26} />
            </div>
            <h2 className="mt-6 font-display text-2xl font-semibold text-ink">Our Vision</h2>
            <p className="mt-3 font-body text-sm leading-relaxed text-slate">
              A workforce where every employee has the skills, confidence, and certification to
              grow into their next role.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Our Values */}
      <section className="bg-paperDark/20 border-y border-ink/5 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="eyebrow">How We Work</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink lg:text-4xl">Our Core Values</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div key={i} className="rounded-2xl border border-ink/10 bg-white/50 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest/10">
                  {v.icon}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 font-body text-xs leading-relaxed text-slate">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose XYZ Academy */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-12">
          <span className="eyebrow">Our Competitive Edge</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink lg:text-4xl">
            Why Companies Choose Us
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-sm text-slate">
            We go beyond standard video tutorials. Our tailored learning plans are built specifically around corporate operations to ensure zero learning loss.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <div key={i} className="group rounded-2xl border border-ink/10 bg-white/70 p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brass/10 mb-4 transition-colors group-hover:bg-brass/20">
                {r.icon}
              </div>
              <h3 className="font-display text-lg font-semibold text-ink">{r.title}</h3>
              <p className="mt-2 font-body text-xs leading-relaxed text-slate">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Employee Learning Journey */}
      <section className="bg-paperDark/20 border-y border-ink/5 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <span className="eyebrow">The Learning Process</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink lg:text-4xl">
              Employee Learning Journey
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-body text-sm text-slate">
              Here is how our training programs operate from start to finish after an employee joins.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-5 text-center relative">
            {[
              { step: '1', title: 'Browse Courses', desc: 'Explore specialized courses catalog on the platform.' },
              { step: '2', title: 'Employee Login', desc: 'Log in using secure company credentials.' },
              { step: '3', title: 'Attend Training', desc: 'Participate in hands-on lectures and workshops.' },
              { step: '4', title: 'Complete Assessments', desc: 'Validate learnings with practical milestones.' },
              { step: '5', title: 'Earn Certificate', desc: 'Gain official certifications for career growth.' }
            ].map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center bg-white/60 border border-ink/10 rounded-2xl p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest text-paper font-mono text-sm font-semibold mb-4">
                  {step.step}
                </div>
                <h3 className="font-display text-base font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 font-body text-xs text-slate leading-relaxed">{step.desc}</p>
                
                {idx < 4 && (
                  <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-4 z-10 text-brass text-lg font-bold">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Company Timeline */}
      <section className="bg-paperDark/10 border-t border-ink/5 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center mb-16">
            <span className="eyebrow">Our History</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink lg:text-4xl">
              Our Journey So Far
            </h2>
          </div>
          
          <div className="relative border-l-2 border-forest/20 pl-8 ml-4 sm:ml-6 space-y-12">
            {timeline.map((item, i) => (
              <div key={i} className="relative">
                {/* Bullet node on timeline, perfectly centered on 2px border */}
                <div className="absolute -left-[39px] top-2 h-4 w-4 rounded-full bg-forest border-4 border-paper"></div>
                
                <span className="inline-block rounded bg-brass/10 px-3 py-1 font-mono text-xs font-semibold text-brass">
                  {item.year}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-1 font-body text-sm leading-relaxed text-slate">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Call To Action */}
      <section className="bg-forest py-20 text-paper">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-3xl font-semibold leading-tight text-paper lg:text-4xl">
            Empower Your Team with Smarter Learning
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-base text-paper/80">
            Discover customized training programs that help your workforce build practical skills,
            earn certifications, and achieve measurable business outcomes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/#courses"
              className="flex items-center gap-2 rounded-full bg-brass px-6 py-3 font-body text-sm font-semibold text-paper hover:bg-brassLight transition-colors shadow-lg"
            >
              Explore Courses <FiArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-paper/20 px-6 py-3 font-body text-sm font-semibold text-paper hover:border-paper hover:bg-white/5 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
