'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks, personalInfo } from '@/lib/data'

// ─── Active Section via Intersection Observer ────────────────
function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [sectionIds])

  return active
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const sectionIds = navLinks.map((l) => l.href.slice(1))
  const active = useActiveSection(sectionIds)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const id = href.slice(1)
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          scrolled ? 'scrolled backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
        style={{
          backgroundColor: scrolled ? 'rgba(10,15,30,0.92)' : 'transparent',
        }}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo Badge */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="flex items-center gap-2"
              aria-label="Back to top"
            >
              <span
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl font-bold text-sm tracking-widest"
                style={{
                  background: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
                  color: '#0A0F1E',
                  fontFamily: 'var(--font-heading)',
                  boxShadow: '0 0 16px rgba(249,115,22,0.4)',
                }}
              >
                {personalInfo.initials}
              </span>
            </a>

            {/* Desktop Nav Links */}
            <ul className="hidden md:flex items-center gap-8" role="navigation">
              {navLinks.map((link) => {
                const sectionId = link.href.slice(1)
                const isActive = active === sectionId
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={`relative text-sm font-medium transition-colors duration-200 group pb-1 ${
                        isActive
                          ? 'text-[var(--color-primary)]'
                          : 'text-[var(--color-muted2)] hover:text-[var(--color-text)]'
                      }`}
                    >
                      {link.label}
                      {/* Orange underline */}
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                        style={{ background: 'linear-gradient(90deg, #F97316, #FB923C)' }}
                      />
                    </button>
                  </li>
                )
              })}
            </ul>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-[var(--color-muted2)] hover:text-[var(--color-primary)] transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-16 left-0 right-0 z-40 border-b border-white/5"
            style={{ backgroundColor: 'rgba(10,15,30,0.97)', backdropFilter: 'blur(16px)' }}
          >
            <ul className="section-container py-4 flex flex-col gap-1" role="navigation">
              {navLinks.map((link, i) => {
                const sectionId = link.href.slice(1)
                const isActive = active === sectionId
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-[var(--color-primary-dim)] text-[var(--color-primary)]'
                          : 'text-[var(--color-muted2)] hover:bg-white/5 hover:text-[var(--color-text)]'
                      }`}
                    >
                      {link.label}
                    </button>
                  </motion.li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
