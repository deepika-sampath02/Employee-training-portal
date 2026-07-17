import { useState } from 'react'
import { FiArrowRight, FiSearch } from 'react-icons/fi'
import heroImage from '../assets/hero_learning.png'

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-paper/30 to-paperDark/20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="eyebrow">Corporate Learning &amp; Development</span>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink lg:text-6xl">
            Build Skills.
            <br />
            Grow Careers.
            <br />
            <span className="italic text-forest">Drive Success.</span>
          </h1>
          <p className="mt-6 max-w-md font-body text-base leading-relaxed text-slate">
            XYZ Academy delivers industry-focused corporate training programs that help
            employees develop technical, leadership, and communication skills through hands-on
            learning and certification.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#courses"
              className="group flex items-center gap-2 rounded-full bg-forest px-6 py-3 font-body text-sm font-semibold text-paper shadow-card transition-transform hover:-translate-y-0.5"
            >
              Explore Courses
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#why-us"
              className="rounded-full border border-ink/20 px-6 py-3 font-body text-sm font-semibold text-ink transition-colors hover:border-forest hover:text-forest"
            >
              Why Choose Us
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-xl">
          <div className="relative overflow-hidden rounded-3xl border border-brass/25 bg-white shadow-card p-2 animate-drift">
            <img
              src={heroImage}
              alt="XYZ Academy Corporate Learning"
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>

      {/* Prominent Search Bar Below Hero */}
      <div className="mx-auto max-w-2xl px-6 pb-12">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const target = document.getElementById('courses')
            if (target) target.scrollIntoView({ behavior: 'smooth' })
          }}
          className="flex items-center gap-3 rounded-full border border-ink/15 bg-white px-5 py-3 shadow-card focus-within:border-forest/50 transition-all duration-300"
        >
          <FiSearch className="text-forest shrink-0" size={20} />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search courses..."
            className="w-full bg-transparent font-body text-base text-ink placeholder:text-slate/60 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-forest px-6 py-2 font-body text-sm font-semibold text-paper hover:bg-forestDeep transition-colors shrink-0"
          >
            Search
          </button>
        </form>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-slate">
          <span>Popular:</span>
          {['Python', 'Cloud', 'Communication', 'Leadership'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setSearchQuery(tag)
                const target = document.getElementById('courses')
                if (target) target.scrollIntoView({ behavior: 'smooth' })
              }}
              className="rounded-full bg-white/50 border border-ink/10 px-2.5 py-0.5 hover:border-forest hover:bg-white transition-all"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="rule mx-6" />
    </section>
  )
}
