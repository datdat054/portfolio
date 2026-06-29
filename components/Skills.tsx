'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import { fadeUp, fadeUpReduced } from '@/lib/animations'
import { skillCategories, type SkillTab, type Skill } from '@/lib/data'

// ─── Skill Progress Bar ───────────────────────────────────────
function SkillBar({
  skill,
  trigger,
  index,
  prefersReduced,
}: {
  skill: Skill
  trigger: boolean
  index: number
  prefersReduced: boolean | null
}) {
  const variants = prefersReduced ? fadeUpReduced : fadeUp

  return (
    <motion.div
      variants={variants}
      custom={index}
      initial="hidden"
      animate={trigger ? 'visible' : 'hidden'}
      className="skill-card group p-4"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: 'linear-gradient(135deg, #F97316, #FB923C)' }}
          />
          <span
            className="text-sm font-medium"
            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}
          >
            {skill.name}
          </span>
        </div>
        <span
          className="text-xs font-semibold tabular-nums"
          style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}
        >
          {skill.level}%
        </span>
      </div>

      <div className="progress-track">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={trigger ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{
            duration: prefersReduced ? 0 : 1.1,
            delay: prefersReduced ? 0 : index * 0.08,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      </div>
    </motion.div>
  )
}

// ─── Skills Section ───────────────────────────────────────────
export default function Skills() {
  const [activeTab, setActiveTab] = useState<SkillTab>('Backend')
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const prefersReduced = useReducedMotion()

  const currentCategory = skillCategories.find((c) => c.tab === activeTab)!
  const tabs: SkillTab[] = ['Backend', 'Frontend', 'DevOps', 'Database']
  const headingVariants = prefersReduced ? fadeUpReduced : fadeUp

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24"
      style={{ background: 'var(--color-surface)' }}
      aria-label="Skills section"
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
            02. Skills
          </p>
          <h2 className="section-title">What I work with</h2>
          <div
            className="mt-3 h-1 w-16 rounded-full"
            style={{ background: 'linear-gradient(90deg, #F97316, #FB923C)' }}
          />
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          variants={headingVariants}
          custom={1}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-wrap gap-2 mb-10"
          role="tablist"
          aria-label="Skill categories"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              id={`skills-tab-${tab.toLowerCase()}`}
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className="relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none"
              style={{
                background: activeTab === tab ? 'linear-gradient(135deg, #F97316, #FB923C)' : 'rgba(255,255,255,0.05)',
                color: activeTab === tab ? '#0A0F1E' : 'var(--color-muted2)',
                border: activeTab === tab ? 'none' : '1px solid rgba(255,255,255,0.08)',
                fontFamily: 'var(--font-heading)',
                boxShadow: activeTab === tab ? '0 0 16px rgba(249,115,22,0.35)' : 'none',
              }}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid — AnimatePresence tab slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: 16 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: prefersReduced ? 0.2 : 0.22 }}
            role="tabpanel"
            aria-labelledby={`skills-tab-${activeTab.toLowerCase()}`}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6"
          >
            {currentCategory.skills.map((skill, i) => (
              <SkillBar
                key={`${activeTab}-${skill.name}`}
                skill={skill}
                trigger={isInView}
                index={i}
                prefersReduced={prefersReduced}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Languages */}
        <motion.div
          variants={headingVariants}
          custom={2}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-16 pt-10 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-5 font-medium"
            style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}
          >
            Languages
          </p>
          <div className="flex flex-wrap gap-3">
            {['Java', 'SQL', 'JavaScript', 'Python', 'C++'].map((lang) => (
              <span
                key={lang}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105"
                style={{
                  background: 'var(--color-surface2)',
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-border-subtle)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {lang}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
