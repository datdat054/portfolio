'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { skillCategories, type SkillTab } from '@/lib/data'

export default function Skills() {
  const [activeTab, setActiveTab] = useState<SkillTab>('Backend')
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()
  const tabs: SkillTab[] = ['Backend', 'Frontend', 'DevOps', 'Database']
  const currentCategory = skillCategories.find((category) => category.tab === activeTab)!

  return (
    <section id="skills" ref={sectionRef} className="section-shell" aria-label="Skills section">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="section-heading"
        >
          <p className="section-kicker">Skills</p>
          <h2 className="section-title">Tools I use most often.</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mb-6 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Skill categories"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-md border px-4 py-2 text-sm font-bold transition-colors ${
                activeTab === tab
                  ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                  : 'border-[var(--border)] bg-white text-[var(--muted)] hover:text-[var(--text)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {currentCategory.skills.map((skill, index) => (
            <motion.div
              key={`${activeTab}-${skill.name}`}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: index * 0.03 }}
              className="card p-4"
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <span className="font-semibold text-[var(--text)]">{skill.name}</span>
                <span className="text-sm font-bold text-[var(--primary)]">{skill.level}%</span>
              </div>
              <div className="progress-track">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: prefersReduced ? 0 : 0.8, delay: index * 0.03 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
