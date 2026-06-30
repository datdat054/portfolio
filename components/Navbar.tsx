'use client'

import { useCallback, useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks, personalInfo } from '@/lib/data'

function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-38% 0px -55% 0px', threshold: 0 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [sectionIds])

  return active
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const sectionIds = navLinks.map((link) => link.href.slice(1))
  const active = useActiveSection(sectionIds)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 24)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
        scrolled ? 'border-[var(--border)] bg-white/92 backdrop-blur' : 'border-transparent bg-white/70 backdrop-blur'
      }`}
    >
      <nav className="section-container flex h-16 items-center justify-between" aria-label="Main navigation">
        <a
          href="#hero"
          onClick={(event) => {
            event.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="flex items-center gap-3 font-semibold text-[var(--text)]"
          aria-label="Back to top"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)] text-sm font-bold text-white">
            {personalInfo.initials}
          </span>
          <span>{personalInfo.name}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const sectionId = link.href.slice(1)
            const isActive = active === sectionId

            return (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[var(--surface-2)] text-[var(--primary)]'
                      : 'text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border)] bg-white text-[var(--text)] md:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-[var(--border)] bg-white md:hidden">
          <div className="section-container py-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="block w-full rounded-md px-3 py-3 text-left text-sm font-semibold text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
