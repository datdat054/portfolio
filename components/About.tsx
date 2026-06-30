'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { personalInfo, stats } from '@/lib/data'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const bioLines = personalInfo.bio.split('\n\n')

  return (
    <section id="about" ref={sectionRef} className="section-shell" aria-label="About section">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="section-heading"
        >
          <p className="section-kicker">About</p>
          <h2 className="section-title">Backend-focused, practical, and always learning.</h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="card p-6 sm:p-7"
          >
            <div className="space-y-5">
              {bioLines.map((line) => (
                <p key={line} className="text-base leading-8 text-[var(--muted-2)]">
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {['Java', 'Spring Boot', 'REST APIs', 'Microservices', 'Databases'].map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="grid gap-3"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="card p-5">
                <div className="text-3xl font-bold text-[var(--primary)]">
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="mt-1 text-sm font-semibold text-[var(--muted)]">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
