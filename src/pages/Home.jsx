import Hero from '../components/Hero'
import Stats from '../components/Stats'
import Services from '../components/Services'
import LearningProcess from '../components/LearningProcess'
import Testimonials from '../components/Testimonials'
import { FaGraduationCap } from 'react-icons/fa'
import { FiTrendingUp, FiMonitor, FiAward, FiTool } from 'react-icons/fi'

// Grayscale SVG Company Logos
const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.24 10.285V13.4h6.887c-.275 1.564-1.852 4.579-6.887 4.579-4.343 0-7.886-3.6-7.886-8.028s3.543-8.028 7.886-8.028c2.47 0 4.12 1.028 5.067 1.936l2.443-2.355C18.172 1.037 15.485 0 12.24 0 5.58 0 0 5.4 0 12s5.58 12 12.24 12c6.96 0 11.57-4.898 11.57-11.782 0-.792-.084-1.396-.188-1.933H12.24z"/>
  </svg>
)

const MicrosoftLogo = () => (
  <svg viewBox="0 0 23 23" className="h-5 w-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="10.5" height="10.5" />
    <rect x="11.5" y="0" width="10.5" height="10.5" />
    <rect x="0" y="11.5" width="10.5" height="10.5" />
    <rect x="11.5" y="11.5" width="10.5" height="10.5" />
  </svg>
)

const InfosysLogo = () => (
  <svg viewBox="0 0 85 22" className="h-5 w-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="17" fontFamily="system-ui, sans-serif" fontWeight="900" fontStyle="italic" fontSize="18" letterSpacing="-0.5">Infosys</text>
  </svg>
)

const TcsLogo = () => (
  <svg viewBox="0 0 65 22" className="h-5 w-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="17" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="17" letterSpacing="0.5">TCS</text>
  </svg>
)

const IbmLogo = () => (
  <svg viewBox="0 0 54 20" className="h-6 w-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 2h6v2H0V2zm0 3h6v2H0V5zm0 3h6v2H0V8zm0 3h6v2H0v-2zm0 3h6v2H0v-2zm8-9h6v2H8V2zm0 3h6v2H8V5zm0 3h6v2H8V8zm0 3h2v2H8v-2zm0 3h6v2H8v-2zm8-9h6v2h-6V2zm0 3h6v2h-6V5zm0 3h6v2h-6V8zm0 3h6v2h-6v-2zm0 3h6v2h-6v-2zm8-9h6v2h-6V2zm0 3h6v2h-6V5zm0 3h6v2h-6V8zm0 3h2v2h-2v-2zm0 3h6v2h-6v-2z"/>
  </svg>
)

const reasons = [
  { text: 'Experienced Trainers', icon: FaGraduationCap },
  { text: 'Industry Relevant Courses', icon: FiTrendingUp },
  { text: 'Flexible Learning', icon: FiMonitor },
  { text: 'Certification', icon: FiAward },
  { text: 'Hands-on Projects', icon: FiTool },
]

const partners = [
  { name: 'Google', component: GoogleLogo },
  { name: 'Microsoft', component: MicrosoftLogo },
  { name: 'Infosys', component: InfosysLogo },
  { name: 'TCS', component: TcsLogo },
  { name: 'IBM', component: IbmLogo },
]

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <LearningProcess />
      <Testimonials />

      <section id="why-us" className="mx-auto max-w-7xl px-6 py-20">
        <span className="eyebrow">Why Choose Us</span>
        <h2 className="mt-3 max-w-lg font-display text-3xl font-semibold text-ink lg:text-4xl">
          Training That Actually Moves the Needle
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {reasons.map((r) => {
            const Icon = r.icon
            return (
              <li
                key={r.text}
                className="flex flex-col items-start gap-4 rounded-2xl border border-ink/10 bg-white/70 p-6 font-body text-sm text-ink shadow-sm transition-all hover:-translate-y-1 hover:shadow-card hover:bg-white duration-300"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest/10 text-forest shrink-0">
                  <Icon size={20} />
                </div>
                <span className="font-semibold text-base leading-snug">{r.text}</span>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="border-y border-ink/10 bg-paperDark py-12">
        <div className="mx-auto max-w-7xl px-6">
          <p className="eyebrow text-center">Trusted By Teams At</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-16 gap-y-6">
            {partners.map((p) => {
              const LogoComp = p.component
              return (
                <div
                  key={p.name}
                  className="text-slate/60 hover:text-ink/80 transition-all duration-300 transform hover:scale-105"
                  title={p.name}
                >
                  <LogoComp />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <div className="rounded-3xl bg-forest px-8 py-14 shadow-card">
          <h2 className="font-display text-3xl font-semibold text-paper lg:text-4xl">
            Ready to Upskill Your Workforce?
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button className="rounded-full bg-brassLight px-7 py-3 font-body text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5">
              Request Demo
            </button>
            <a
              href="/contact"
              className="rounded-full border border-paper/30 px-7 py-3 font-body text-sm font-semibold text-paper transition-colors hover:border-paper"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
