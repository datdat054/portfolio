'use client'

import { useRef, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { projects } from '@/lib/data'
import SkeletonGrid from '@/components/SkeletonCard'

const ProjectCard = dynamic(() => import('@/components/ProjectCard'), {
  loading: () => <div className="h-full w-full min-h-[260px] bg-[var(--surface)] animate-pulse rounded-xl" />,
})

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const featured = projects.find((p) => p.variant === 'featured')!
  const card2 = projects.find((p) => p.variant === 'card2')!
  const card3 = projects.find((p) => p.variant === 'card3')!
  const card4 = projects.find((p) => p.variant === 'card4')!

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24"
      aria-label="Projects section"
    >
      <div className="section-container">
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
            03. Projects
          </p>
          <h2 className="section-title">
            Things I&apos;ve built
          </h2>
          <div
            className="mt-3 h-1 w-16 rounded-full"
            style={{ background: 'linear-gradient(90deg, #F97316, #FB923C)' }}
          />
        </motion.div>

        <Suspense fallback={<SkeletonGrid />}>
          <div className="bento-grid">
            <div
              className="bento-featured"
              style={{ gridColumn: 'span 2', gridRow: 'span 1' }}
            >
              <ProjectCard project={featured} index={0} isInView={isInView} large />
            </div>

            <div
              className="bento-card2"
              style={{ gridColumn: '3', gridRow: 'span 2' }}
            >
              <ProjectCard project={card2} index={1} isInView={isInView} tall />
            </div>

            <div className="bento-card3">
              <ProjectCard project={card3} index={2} isInView={isInView} />
            </div>

            <div className="bento-card4">
              <ProjectCard project={card4} index={3} isInView={isInView} />
            </div>
          </div>
        </Suspense>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 flex justify-center"
        >
          <a
            href="https://github.com/datdat054"
            target="_blank"
            rel="noopener noreferrer"
            id="projects-github-all"
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105"
            style={{
              background: 'rgba(249,115,22,0.1)',
              color: 'var(--color-primary)',
              border: '1px solid rgba(249,115,22,0.3)',
              fontFamily: 'var(--font-heading)',
            }}
          >
            <GithubIcon size={16} />
            View All on GitHub
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
