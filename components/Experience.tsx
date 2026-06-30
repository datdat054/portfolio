'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { timelineEvents } from '@/lib/data'

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="experience" ref={sectionRef} className="section-shell" aria-label="Experience section">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="section-heading"
        >
          <p className="section-kicker">Experience</p>
          <h2 className="section-title">Recent milestones.</h2>
        </motion.div>

        <div className="grid gap-3">
          {timelineEvents.map((event, index) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.38, delay: index * 0.05 }}
              className="card grid gap-4 p-5 sm:grid-cols-[160px_1fr]"
            >
              <div>
                <p className="text-sm font-bold text-[var(--primary)]">{event.date}</p>
                {event.badge && (
                  <span className="mt-3 inline-flex rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs font-bold text-[var(--muted)]">
                    {event.badge}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-lg">{event.title}</h3>
                {event.subtitle && (
                  <p className="mt-1 text-sm font-semibold text-[var(--muted)]">{event.subtitle}</p>
                )}
                <p className="mt-3 text-sm leading-7 text-[var(--muted-2)]">{event.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
