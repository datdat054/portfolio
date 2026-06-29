'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { personalInfo, stats, type Stat } from '@/lib/data'

// ─── Count-up hook ────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, trigger: boolean) {
  const [count, setCount] = useState(0)
  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!trigger) return
    startRef.current = null
    const step = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      }
    }
    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [trigger, target, duration])

  return count
}

// ─── Stat Counter Card ────────────────────────────────────────
function StatCard({ stat, trigger }: { stat: Stat; trigger: boolean }) {
  const value = useCountUp(stat.value, 1600, trigger)

  return (
    <div className="flex flex-col items-center text-center p-5 rounded-xl glass-card">
      <span
        className="text-3xl sm:text-4xl font-bold gradient-text mb-1"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {value}{stat.suffix}
      </span>
      <span
        className="text-xs uppercase tracking-widest font-medium"
        style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}
      >
        {stat.label}
      </span>
    </div>
  )
}

// ─── Darcula Code Line ────────────────────────────────────────
interface CodeLine {
  lineNum: number
  content: React.ReactNode
}

function CodeBlock() {
  const codeLines: CodeLine[] = [
    {
      lineNum: 1,
      content: (
        <span>
          <span className="kw">public class </span>
          <span className="nm">AboutMe</span>
          <span className="nm"> {'{'}</span>
        </span>
      ),
    },
    {
      lineNum: 2,
      content: (
        <span>
          {'    '}<span className="kw">private </span>
          <span className="kw">String </span>
          <span className="nm">name </span>
          <span className="nm">= </span>
          <span className="str">&quot;Luu Duc Dat&quot;</span>
          <span className="nm">;</span>
        </span>
      ),
    },
    {
      lineNum: 3,
      content: (
        <span>
          {'    '}<span className="kw">private </span>
          <span className="kw">String </span>
          <span className="nm">role </span>
          <span className="nm">= </span>
          <span className="str">&quot;Java Backend Developer&quot;</span>
          <span className="nm">;</span>
        </span>
      ),
    },
    {
      lineNum: 4,
      content: (
        <span>
          {'    '}<span className="kw">private </span>
          <span className="kw">String </span>
          <span className="nm">location </span>
          <span className="nm">= </span>
          <span className="str">&quot;Ho Chi Minh City&quot;</span>
          <span className="nm">;</span>
        </span>
      ),
    },
    {
      lineNum: 5,
      content: (
        <span>
          {'    '}<span className="kw">private </span>
          <span className="kw">String </span>
          <span className="nm">school </span>
          <span className="nm">= </span>
          <span className="str">&quot;PTIT HCMC — GPA 3.0/4.0&quot;</span>
          <span className="nm">;</span>
        </span>
      ),
    },
    {
      lineNum: 6,
      content: (
        <span>
          {'    '}<span className="kw">private </span>
          <span className="kw">String</span>
          <span className="nm">[] stack = {'{'}</span>
        </span>
      ),
    },
    {
      lineNum: 7,
      content: (
        <span>
          {'        '}
          <span className="str">&quot;Spring Boot&quot;</span>
          <span className="nm">, </span>
          <span className="str">&quot;Microservices&quot;</span>
          <span className="nm">, </span>
          <span className="str">&quot;PostgreSQL&quot;</span>
        </span>
      ),
    },
    {
      lineNum: 8,
      content: <span><span className="nm">{'    }'};</span></span>,
    },
    {
      lineNum: 9,
      content: (
        <span>
          {'    '}<span className="kw">private </span>
          <span className="kw">String </span>
          <span className="nm">goal </span>
          <span className="nm">= </span>
          <span className="str">&quot;Senior Backend Engineer in 3 years&quot;</span>
          <span className="nm">;</span>
        </span>
      ),
    },
    {
      lineNum: 10,
      content: (
        <span>
          {'    '}<span className="kw">private int </span>
          <span className="nm">coffeePerDay </span>
          <span className="nm">= </span>
          <span className="num">3</span>
          <span className="nm">;</span>
        </span>
      ),
    },
    { lineNum: 11, content: <span className="nm">&nbsp;</span> },
    {
      lineNum: 12,
      content: (
        <span>
          {'    '}<span className="ann">@Override</span>
        </span>
      ),
    },
    {
      lineNum: 13,
      content: (
        <span>
          {'    '}<span className="kw">public </span>
          <span className="kw">String </span>
          <span className="mtd">toString</span>
          <span className="nm">() {'{'}</span>
        </span>
      ),
    },
    {
      lineNum: 14,
      content: (
        <span>
          {'        '}<span className="kw">return </span>
          <span className="str">&quot;Always building. Always learning.&quot;</span>
          <span className="nm">;</span>
        </span>
      ),
    },
    {
      lineNum: 15,
      content: <span><span className="nm">{'    }'}</span></span>,
    },
    { lineNum: 16, content: <span><span className="nm">{'}'}</span></span> },
  ]

  return (
    <div className="code-block rounded-xl overflow-hidden">
      {/* Mac-style title bar */}
      <div
        className="flex items-center gap-2 px-4 py-3 -mx-6 -mt-5 mb-3"
        style={{ background: '#1E1E2E', borderBottom: '1px solid #3C3F41' }}
      >
        <span className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
        <span
          className="ml-2 text-xs"
          style={{ color: '#808080', fontFamily: 'var(--font-mono)' }}
        >
          AboutMe.java
        </span>
      </div>
      {/* Code lines */}
      <div className="overflow-x-auto">
        {codeLines.map((line) => (
          <div key={line.lineNum} className="flex items-start hover:bg-white/5 transition-colors">
            <span className="line-numbers select-none text-right w-8 shrink-0 pr-4">
              {line.lineNum}
            </span>
            <span className="whitespace-pre">{line.content}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── About Section ────────────────────────────────────────────
export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const statsInView = useInView(statsRef, { once: true, margin: '-50px' })

  const bioLines = personalInfo.bio.split('\n\n')

  return (
    <section id="about" ref={sectionRef} className="py-24" aria-label="About section">
      <div className="section-container">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p
            className="muted-eyebrow mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            01. About
          </p>
          <h2
            className="section-title"
          >
            Who I Am
          </h2>
          <div
            className="mt-3 h-1 w-16 rounded-full"
            style={{ background: 'linear-gradient(90deg, #F97316, #FB923C)' }}
          />
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            {bioLines.map((line, i) => (
              <p key={i} className="text-base leading-relaxed" style={{ color: 'var(--color-muted2)' }}>
                {line}
              </p>
            ))}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['OOP', 'Clean Code', 'API Design', 'System Design', 'Distributed Systems'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: 'rgba(249,115,22,0.12)',
                    color: 'var(--primary)',
                    border: '1px solid rgba(249,115,22,0.25)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — Code Block */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <CodeBlock />
          </motion.div>
        </div>

        {/* Stats Row */}
        <div ref={statsRef} className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-3 gap-4 sm:gap-6"
          >
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} trigger={statsInView} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
