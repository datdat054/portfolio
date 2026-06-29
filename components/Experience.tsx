'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { timelineEvents, type TimelineEvent } from '@/lib/data'
import { fadeUp, fadeUpReduced } from '@/lib/animations'

const badgeStyles: Record<NonNullable<TimelineEvent['badgeColor']>, { bg: string; color: string; border: string }> = {
  orange: { bg: 'rgba(249,115,22,0.12)', color: '#F97316', border: 'rgba(249,115,22,0.3)' },
  blue:   { bg: 'rgba(59,130,246,0.12)',  color: '#60A5FA', border: 'rgba(59,130,246,0.3)' },
  green:  { bg: 'rgba(34,197,94,0.12)',   color: '#4ADE80', border: 'rgba(34,197,94,0.3)' },
  purple: { bg: 'rgba(168,85,247,0.12)',  color: '#C084FC', border: 'rgba(168,85,247,0.3)' },
}

interface TimelineNodeProps {
  event: TimelineEvent
  index: number
  isInView: boolean
  isLast: boolean
  prefersReduced: boolean | null
}

function TimelineNode({ event, index, isInView, isLast, prefersReduced }: TimelineNodeProps) {
  const badgeStyle = event.badgeColor ? badgeStyles[event.badgeColor] : badgeStyles.orange

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: -32 }}
      animate={isInView
        ? prefersReduced ? { opacity: 1 } : { opacity: 1, x: 0 }
        : {}
      }
      transition={{ duration: prefersReduced ? 0.3 : 0.55, delay: index * 0.15, ease: 'easeOut' }}
      className="relative flex gap-6"
    >
      {/* Left — Line & Dot */}
      <div className="relative flex flex-col items-center" style={{ minWidth: '40px' }}>
        {/* Animated vertical connector */}
        {!isLast && (
          <motion.div
            className="absolute top-10 bottom-0 w-[2px]"
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.15, ease: 'easeOut' }}
            style={{
              background: 'linear-gradient(to bottom, rgba(249,115,22,0.5), rgba(249,115,22,0.05))',
              left: '50%',
              transform: 'translateX(-50%)',
              transformOrigin: 'top',
            }}
          />
        )}
        {/* Dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 + index * 0.15, ease: 'backOut' }}
          className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: 'var(--color-surface)',
            border: '2px solid #F97316',
            boxShadow: '0 0 12px rgba(249,115,22,0.3)',
          }}
        >
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: 'linear-gradient(135deg, #F97316, #FB923C)' }}
          />
        </motion.div>
      </div>

      {/* Right — Content card */}
      <div
        className={`flex-1 rounded-xl p-5 glass-card ${isLast ? 'mb-0' : 'mb-6'}`}
        style={{ marginTop: '5px' }}
      >
        {/* Date + Badge */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span
            className="text-xs font-medium"
            style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}
          >
            {event.date}
          </span>
          {event.badge && (
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
              style={{
                background: badgeStyle.bg,
                color: badgeStyle.color,
                border: `1px solid ${badgeStyle.border}`,
                fontFamily: 'var(--font-mono)',
              }}
            >
              {event.badge}
            </span>
          )}
        </div>

        <h3
          className="font-semibold text-base mb-1"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
        >
          {event.title}
        </h3>

        {event.subtitle && (
          <p className="text-sm mb-1" style={{ color: 'var(--primary)' }}>
            {event.subtitle}
          </p>
        )}

        <p className="text-sm" style={{ color: 'var(--color-muted2)' }}>
          {event.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()
  const headingVariants = prefersReduced ? fadeUpReduced : fadeUp

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24"
      style={{ background: 'var(--color-surface)' }}
      aria-label="Experience section"
    >
      <div className="section-container">
        {/* Section Heading */}
        <motion.div
          variants={headingVariants}
          custom={0}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <p className="muted-eyebrow mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
            04. Experience
          </p>
          <h2 className="section-title">Where I&apos;ve been</h2>
          <div
            className="mt-3 h-1 w-16 rounded-full"
            style={{ background: 'linear-gradient(90deg, #F97316, #FB923C)' }}
          />
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl">
          {timelineEvents.map((event, i) => (
            <TimelineNode
              key={event.id}
              event={event}
              index={i}
              isInView={isInView}
              isLast={i === timelineEvents.length - 1}
              prefersReduced={prefersReduced}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
