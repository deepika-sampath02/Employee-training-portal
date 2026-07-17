import { useState } from 'react'
import { FiEye, FiEyeOff, FiLoader } from 'react-icons/fi'
import logo from '../assets/logo.png'
import loginIllustration from '../assets/login_illustration.png'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate authenticating for 1.5 seconds
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <div className="mx-auto flex min-h-[85vh] max-w-5xl items-center justify-center px-4 py-12 md:px-8">
      <div className="grid w-full gap-8 overflow-hidden rounded-3xl border border-ink/10 bg-white/70 shadow-card backdrop-blur-md lg:grid-cols-2">
        
        {/* Left Side: Illustration (hidden on mobile) */}
        <div className="relative hidden items-center justify-center bg-gradient-to-br from-paper/30 to-paperDark/20 p-12 lg:flex">
          <div className="max-w-md text-center">
            <img 
              src={loginIllustration} 
              alt="Corporate Training Portal Illustration" 
              className="mx-auto h-auto w-full max-w-[320px] object-contain drop-shadow-md animate-drift"
            />
            <h3 className="mt-8 font-display text-xl font-semibold text-ink">
              Accelerate Your Career
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-slate">
              Access your personalized learning paths, courses, and certifications tailored to help you succeed in your role.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex flex-col justify-center px-6 py-12 sm:px-12">
          <div className="mx-auto w-full max-w-md">
            
            {/* Header: Logo & Title */}
            <div className="mb-8 flex flex-col items-center text-center">
              <img src={logo} alt="XYZ Academy seal" className="h-16 w-16 object-contain" />
              <h1 className="mt-4 font-display text-2xl font-semibold text-ink">
                Employee Portal
              </h1>
              <p className="mt-2 font-body text-sm italic text-forest">
                Empowering employees through continuous learning.
              </p>
            </div>

            {submitted ? (
              <div className="rounded-2xl border border-forest/30 bg-forest/5 p-6 text-center">
                <p className="font-display text-lg font-medium text-forest">You're signed in.</p>
                <p className="mt-2 font-body text-sm text-slate">
                  Welcome back! Redirecting you to your training dashboard...
                </p>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="grid gap-5">
                  
                  {/* Email Field */}
                  <div className="grid gap-1.5">
                    <label htmlFor="email" className="font-mono text-[11px] uppercase tracking-wider text-slate">
                      Email Address
                    </label>
                    <input
                      id="email"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="employee@company.com"
                      className="rounded-xl border border-ink/15 bg-white/80 px-4 py-3 font-body text-sm transition-all focus:border-forest/50 focus:outline-none focus:ring-2 focus:ring-forest/10"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="grid gap-1.5">
                    <label htmlFor="password" className="font-mono text-[11px] uppercase tracking-wider text-slate">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        required
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full rounded-xl border border-ink/15 bg-white/80 pl-4 pr-11 py-3 font-body text-sm transition-all focus:border-forest/50 focus:outline-none focus:ring-2 focus:ring-forest/10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate hover:text-ink focus:outline-none"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between font-body text-xs">
                    <label className="flex items-center gap-2 cursor-pointer text-slate select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 rounded border-ink/15 text-forest focus:ring-forest/50"
                      />
                      <span>Remember Me</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Please contact your HR administrator to reset your password.')}
                      className="font-medium text-forest hover:underline focus:outline-none"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 font-body text-sm font-semibold text-paper shadow-card transition-all hover:bg-forestDeep disabled:opacity-85 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {isSubmitting ? (
                      <>
                        <FiLoader className="animate-spin" size={16} />
                        <span>Signing In...</span>
                      </>
                    ) : (
                      'Employee Sign In'
                    )}
                  </button>
                </form>

                {/* Footer Help Section */}
                <div className="mt-8 border-t border-ink/10 pt-6 text-center">
                  <p className="font-body text-xs text-slate">
                    Need an account? Contact your HR Administrator.
                  </p>
                  
                  <div className="mt-4 flex flex-col items-center gap-2 font-body text-xs text-slate">
                    <span className="font-semibold text-ink">Need Help?</span>
                    <a href="mailto:support@xyzacademy.com" className="flex items-center gap-1.5 hover:text-forest transition-colors">
                      <span>📧</span>
                      <span>support@xyzacademy.com</span>
                    </a>
                    <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-1.5 hover:text-forest transition-colors">
                      <span>☎</span>
                      <span>+91 XXXXX XXXXX</span>
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
