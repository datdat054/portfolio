'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Send } from 'lucide-react'
import { personalInfo } from '@/lib/data'

// ─── SVG Brand Icons ──────────────────────────────────────────
const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)



// ─── Animated Input ────────────────────────────────────────────
interface InputProps {
  id: string
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
}

function AnimatedInput({ id, label, type = 'text', value, onChange, multiline = false }: InputProps) {
  const [focused, setFocused] = useState(false)
  const hasValue = value.length > 0

  const baseStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'var(--color-text)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    paddingTop: '1.5rem',
    paddingBottom: '0.5rem',
    resize: 'none' as const,
  }

  const labelStyle: React.CSSProperties = {
    position: 'absolute' as const,
    left: 0,
    top: focused || hasValue ? '0.25rem' : '1rem',
    fontSize: focused || hasValue ? '0.7rem' : '0.95rem',
    color: focused ? 'var(--color-primary)' : 'var(--color-muted)',
    fontFamily: 'var(--font-body)',
    transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
    pointerEvents: 'none',
    letterSpacing: focused || hasValue ? '0.06em' : '0',
    textTransform: focused || hasValue ? 'uppercase' : 'none',
  }

  return (
    <div className="input-wrapper relative pb-1" style={{ borderBottom: `1px solid ${focused ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)'}`, transition: 'border-color 0.3s' }}>
      <label htmlFor={id} style={labelStyle}>{label}</label>
      {multiline ? (
        <textarea
          id={id}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={baseStyle}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={baseStyle}
        />
      )}
      {/* Animated sweep underline */}
      <div
        style={{
          position: 'absolute',
          bottom: -1,
          left: 0,
          height: '2px',
          width: focused ? '100%' : '0',
          background: 'linear-gradient(90deg, #F97316, #FB923C)',
          transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)',
          borderRadius: '999px',
        }}
      />
    </div>
  )
}

// ─── Contact Section ──────────────────────────────────────────
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`)
    const body = encodeURIComponent(`Hi Dat,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`)
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`
  }

  const socialLinks = [
    {
      id: 'contact-github',
      icon: GithubIcon,
      label: 'GitHub',
      href: personalInfo.githubUrl,
      value: `github.com/${personalInfo.github}`,
    },
    {
      id: 'contact-email',
      icon: Mail,
      label: 'Email',
      href: `mailto:${personalInfo.email}`,
      value: personalInfo.email,
    },
    {
      id: 'contact-linkedin',
      icon: LinkedinIcon,
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      value: 'linkedin.com/in/datld',
    },
  ]


  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24"
      aria-label="Contact section"
    >
      <div className="section-container">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p
            className="muted-eyebrow mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            05. Contact
          </p>
          <h2
            className="section-title"
          >
            Let's talk
          </h2>
          <div
            className="mt-3 h-1 w-16 rounded-full"
            style={{ background: 'linear-gradient(90deg, #F97316, #FB923C)' }}
          />
        </motion.div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — Message + Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p
              className="text-xl sm:text-2xl font-semibold mb-4 leading-snug"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
            >
              If you're looking for a backend developer who takes system design seriously,{' '}
              <span className="gradient-text">I'd love to connect.</span>
            </p>
            <p className="text-sm mb-10" style={{ color: 'var(--color-muted2)' }}>
              Open to internships, part-time roles, and collaboration.
            </p>

            <div className="space-y-5">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  id={link.id}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border-subtle)',
                  }}
                  whileHover={{
                    borderColor: 'rgba(249,115,22,0.4)',
                    boxShadow: '0 0 16px rgba(249,115,22,0.15)',
                    x: 4,
                  }}
                >
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
                    style={{
                      background: 'rgba(249,115,22,0.1)',
                      border: '1px solid rgba(249,115,22,0.2)',
                      color: 'var(--color-primary)',
                    }}
                  >
                    <link.icon size={18} />
                  </div>
                  <div>
                    <div
                      className="text-xs uppercase tracking-widest mb-0.5"
                      style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}
                    >
                      {link.label}
                    </div>
                    <div
                      className="text-sm font-medium group-hover:text-[var(--color-primary)] transition-colors"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {link.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-8 space-y-8"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border-subtle)',
              }}
              aria-label="Contact form"
            >
              <AnimatedInput
                id="contact-name"
                label="Your Name"
                value={name}
                onChange={setName}
              />
              <AnimatedInput
                id="contact-email"
                label="Email Address"
                type="email"
                value={email}
                onChange={setEmail}
              />
              <AnimatedInput
                id="contact-message"
                label="Message"
                value={message}
                onChange={setMessage}
                multiline
              />

              <button
                id="contact-submit"
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
                  color: '#0A0F1E',
                  boxShadow: '0 0 20px rgba(249,115,22,0.25)',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                <Send size={16} />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
