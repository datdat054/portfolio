'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Mail, ChevronDown } from 'lucide-react'
import { useTypingEffect } from '@/hooks/useTypingEffect'
import { fadeUp, fadeUpReduced } from '@/lib/animations'
import { personalInfo } from '@/lib/data'

// ─── SVG Brand Icons ──────────────────────────────────────────
const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const variants = prefersReduced ? fadeUpReduced : fadeUp
  const { displayText, phase } = useTypingEffect()

  return (
    <section
      id="hero"
      className="relative flex items-center min-h-screen overflow-hidden"
      aria-label="Hero section"
    >
      {/* Animated Dot-Grid Background */}
      <div className="hero-bg pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <div className="section-container relative z-10 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — Staggered entrance */}
          <div className="max-w-xl">
            {/* i=0 Eyebrow */}
            <motion.p
              variants={variants}
              custom={0}
              initial="hidden"
              animate="visible"
              className="muted-eyebrow mb-3"
            >
              Hey, I&apos;m
            </motion.p>

            {/* i=1 Name */}
            <motion.h1
              variants={variants}
              custom={1}
              initial="hidden"
              animate="visible"
              className="gradient-text hero-name mb-4 leading-none"
            >
              {personalInfo.name}
            </motion.h1>

            {/* i=2 Typing role */}
            <motion.div
              variants={variants}
              custom={2}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-1 mb-6 h-9"
            >
              <span
                className="text-xl sm:text-2xl font-semibold"
                style={{ color: 'var(--color-muted2)', fontFamily: 'var(--font-heading)' }}
              >
                {displayText}
              </span>
              {/* Blinking cursor */}
              {!prefersReduced && (
                <span
                  className="typing-cursor inline-block w-[2px] h-7 rounded-sm ml-0.5"
                  style={{ background: 'var(--primary)' }}
                  aria-hidden="true"
                />
              )}
            </motion.div>

            {/* i=3 Short bio */}
            <motion.p
              variants={variants}
              custom={3}
              initial="hidden"
              animate="visible"
              className="text-base sm:text-lg mb-8 max-w-md"
              style={{ color: 'var(--color-muted2)', lineHeight: 1.7 }}
            >
              {personalInfo.shortBio}
            </motion.p>

            {/* i=4 CTA buttons */}
            <motion.div
              variants={variants}
              custom={4}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4 mb-10"
            >
              <a
                href="#projects"
                id="hero-view-projects"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
                  color: '#0A0F1E',
                  boxShadow: '0 0 20px rgba(249,115,22,0.3)',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                View Projects
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                id="hero-contact-link"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: 'var(--primary)',
                  color: 'var(--primary)',
                  background: 'transparent',
                  fontFamily: 'var(--font-heading)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(249,115,22,0.1)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
              >
                Get in Touch
              </a>
            </motion.div>

            {/* i=5 Social icons + scroll arrow */}
            <motion.div
              variants={variants}
              custom={5}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-4"
            >
              <a
                href={personalInfo.githubUrl}
                id="hero-github-link"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-all duration-200 group"
                style={{ color: 'var(--color-muted)' }}
                aria-label="GitHub profile"
              >
                <GithubIcon size={18} />
                <span className="group-hover:text-[var(--color-text)] transition-colors">
                  github.com/{personalInfo.github}
                </span>
              </a>
              <span style={{ color: 'var(--color-border-subtle)' }}>·</span>
              <a
                href={`mailto:${personalInfo.email}`}
                id="hero-email-link"
                className="flex items-center gap-2 text-sm transition-all duration-200 group"
                style={{ color: 'var(--color-muted)' }}
                aria-label="Email contact"
              >
                <Mail size={18} className="group-hover:text-[var(--primary)] transition-colors" />
                <span className="group-hover:text-[var(--color-text)] transition-colors">
                  {personalInfo.email}
                </span>
              </a>
            </motion.div>
          </div>

          {/* Right — Animated Terminal */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: 40 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
            className="hidden lg:flex justify-end"
          >
            <div className="terminal-float">
              <TerminalWidget />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll-down Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}
        >
          scroll
        </span>
        <ChevronDown
          size={20}
          className="scroll-bounce"
          style={{ color: 'var(--primary)' }}
        />
      </motion.div>
    </section>
  )
}

// ─── Terminal Widget — lines appear one by one ────────────────
function TerminalWidget() {
  const lines = [
    { prefix: '$ ', text: 'java -jar portfolio.jar', color: 'var(--color-text)' },
    { prefix: '> ', text: 'Initializing Spring context...', color: 'var(--color-muted)' },
    { prefix: '> ', text: 'Loading beans: 42 definitions', color: 'var(--color-muted)' },
    { prefix: '> ', text: 'Server started on :8080', color: 'var(--color-muted)' },
    { prefix: '> ', text: 'Status: UP ✓', color: '#22c55e' },
  ]

  const [visibleCount, setVisibleCount] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    function showNext(idx: number) {
      if (idx >= lines.length) return
      timerRef.current = setTimeout(() => {
        setVisibleCount(idx + 1)
        showNext(idx + 1)
      }, 600)
    }
    // start after a short delay so the widget entrance animation completes
    timerRef.current = setTimeout(() => showNext(0), 300)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const allDone = visibleCount >= lines.length

  return (
    <div
      className="rounded-xl overflow-hidden shadow-2xl w-80"
      style={{ border: '1px solid rgba(249,115,22,0.25)', boxShadow: '0 0 40px rgba(249,115,22,0.1)' }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ background: '#1A1A2E', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <span className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
        <span
          className="ml-2 text-xs"
          style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}
        >
          terminal
        </span>
      </div>

      {/* Body */}
      <div
        className="px-4 py-4 space-y-2"
        style={{ background: '#0D1117', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', minHeight: '8rem' }}
      >
        {lines.slice(0, visibleCount).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-start gap-1"
          >
            <span style={{ color: 'var(--primary)' }}>{line.prefix}</span>
            <span style={{ color: line.color }}>{line.text}</span>
          </motion.div>
        ))}

        {/* Blinking cursor — shown after all lines or while typing */}
        <div className="flex items-center gap-1">
          <span style={{ color: 'var(--primary)' }}>$ </span>
          {allDone && (
            <span
              className="typing-cursor inline-block w-2 h-4 rounded-sm"
              style={{ background: 'var(--primary)' }}
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    </div>
  )
}
