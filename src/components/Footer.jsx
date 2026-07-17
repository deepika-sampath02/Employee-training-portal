import { Link } from 'react-router-dom'
import { FiLinkedin, FiInstagram } from 'react-icons/fi'
import logo from '../assets/logo.png'

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="XYZ Academy seal" className="h-10 w-10" />
            <span className="font-display text-lg font-semibold text-paper">XYZ Academy</span>
          </div>
          <p className="mt-4 max-w-xs font-body text-sm text-paper/60">
            Industry-focused corporate training that helps employees grow — and helps
            companies keep them.
          </p>
        </div>

        <div>
          <h4 className="eyebrow">Quick Links</h4>
          <ul className="mt-4 space-y-2 font-body text-sm text-paper/70">
            <li><a href="#" className="hover:text-brassLight">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-brassLight">Terms &amp; Conditions</a></li>
            <li><a href="#" className="hover:text-brassLight">FAQs</a></li>
            <li><a href="#" className="hover:text-brassLight">Support</a></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow">Company</h4>
          <ul className="mt-4 space-y-2 font-body text-sm text-paper/70">
            <li><Link to="/about" className="hover:text-brassLight">About</Link></li>
            <li><Link to="/contact" className="hover:text-brassLight">Contact</Link></li>
            <li><Link to="/login" className="hover:text-brassLight">Employee Portal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow">Contact Us</h4>
          <ul className="mt-4 space-y-2.5 font-body text-sm text-paper/70">
            <li className="flex items-start gap-2">
              <span className="text-brassLight">📍</span>
              <span>Vriddhachalam, Tamil Nadu</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-brassLight">☎</span>
              <a href="tel:+91XXXXXXXXXX" className="hover:text-brassLight">+91 XXXXX XXXXX</a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-brassLight">✉</span>
              <a href="mailto:xyz@gmail.com" className="hover:text-brassLight">xyz@gmail.com</a>
            </li>
          </ul>

          <h4 className="eyebrow mt-6">Follow Us</h4>
          <div className="mt-3 flex gap-3">
            <a href="#" aria-label="LinkedIn" className="rounded-full border border-paper/20 p-2 hover:border-brassLight hover:text-brassLight transition-colors">
              <FiLinkedin size={14} />
            </a>
            <a href="#" aria-label="Instagram" className="rounded-full border border-paper/20 p-2 hover:border-brassLight hover:text-brassLight transition-colors">
              <FiInstagram size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-paper/10 px-6 py-5 text-center font-mono text-[11px] tracking-wide text-paper/40">
        © {new Date().getFullYear()} XYZ Academy. All rights reserved.
      </div>
    </footer>
  )
}
