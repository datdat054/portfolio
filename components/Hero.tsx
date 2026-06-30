'use client'

import { Mail, MapPin } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import GithubIcon from '@/components/GithubIcon'
import { fadeUp, fadeUpReduced } from '@/lib/animations'
import { personalInfo } from '@/lib/data'

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const variants = prefersReduced ? fadeUpReduced : fadeUp

  return (
    <section id="hero" className="section-shell pt-32 sm:pt-36" aria-label="Hero section">
      <div className="section-container">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <motion.div
            variants={variants}
            custom={0}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <div className="pill px-3 py-2 mb-5">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              Open to internship and junior backend roles
            </div>

            <h1 className="text-[clamp(2.55rem,8vw,5.1rem)] tracking-normal">
              {personalInfo.name}
            </h1>

            <p className="mt-4 text-xl font-semibold text-[var(--primary)] sm:text-2xl">
              {personalInfo.role}
            </p>

            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted-2)] sm:text-lg">
              I build clean REST APIs, Spring Boot services, and database-backed systems with a focus on readability and steady growth.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#projects" className="btn-primary">
                View Projects
              </a>
              <a href={`mailto:${personalInfo.email}`} className="btn-secondary">
                <Mail size={18} />
                Contact Me
              </a>
            </div>
          </motion.div>

          <motion.aside
            variants={variants}
            custom={1}
            initial="hidden"
            animate="visible"
            className="card p-5"
            aria-label="Profile summary"
          >
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-lg bg-[var(--surface-2)] text-xl font-bold text-[var(--primary)]">
              {personalInfo.initials}
            </div>

            <dl className="space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-[var(--text)]">Focus</dt>
                <dd className="mt-1 text-[var(--muted)]">Java, Spring Boot, REST APIs</dd>
              </div>
              <div>
                <dt className="font-semibold text-[var(--text)]">Education</dt>
                <dd className="mt-1 text-[var(--muted)]">Software Engineering at PTIT HCMC</dd>
              </div>
              <div>
                <dt className="font-semibold text-[var(--text)]">Location</dt>
                <dd className="mt-1 flex items-center gap-2 text-[var(--muted)]">
                  <MapPin size={16} />
                  Ho Chi Minh City
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex gap-3 border-t border-[var(--border)] pt-5">
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary min-h-10 flex-1 px-3 py-2"
                aria-label="GitHub profile"
              >
                <GithubIcon size={17} />
                GitHub
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="btn-secondary min-h-10 flex-1 px-3 py-2"
                aria-label="Email"
              >
                <Mail size={17} />
                Email
              </a>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
