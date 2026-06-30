'use client'

import GithubIcon from '@/components/GithubIcon'
import { navLinks, personalInfo } from '@/lib/data'

export default function Footer() {
  const handleNavClick = (href: string) => {
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-[var(--border)] bg-white py-8" role="contentinfo">
      <div className="section-container flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--muted)]">
          Built with Next.js and Tailwind CSS. Ho Chi Minh City, 2026.
        </p>

        <nav className="flex flex-wrap gap-3" aria-label="Footer navigation">
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-semibold text-[var(--muted)] hover:text-[var(--primary)]"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <a
          href={personalInfo.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border)] text-[var(--muted)] hover:text-[var(--primary)]"
          aria-label="GitHub profile"
        >
          <GithubIcon size={18} />
        </a>
      </div>
    </footer>
  )
}
