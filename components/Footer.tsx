'use client'

import { navLinks, personalInfo } from '@/lib/data'

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)


export default function Footer() {
  const handleNavClick = (href: string) => {
    const id = href.slice(1)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      className="py-10 border-t"
      style={{
        background: 'var(--color-surface)',
        borderColor: 'rgba(255,255,255,0.06)',
      }}
      role="contentinfo"
    >
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p
            className="text-sm text-center sm:text-left"
            style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}
          >
            Built with Next.js · Ho Chi Minh City · 2026
          </p>

          {/* Nav Links */}
          <nav className="flex items-center flex-wrap gap-6 justify-center" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-xs uppercase tracking-widest transition-colors duration-200 hover:text-[var(--color-primary)]"
                style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* GitHub Icon */}
          <a
            href={personalInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="footer-github"
            className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 hover:scale-110 hover:text-[var(--color-primary)]"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'var(--color-muted)',
            }}
            aria-label="GitHub profile"
          >
            <GithubIcon size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
