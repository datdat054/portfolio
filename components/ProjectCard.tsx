'use client'

import { motion } from 'framer-motion'
import { type Project } from '@/lib/data'

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

function TechBadge({ label }: { label: string }) {
  return (
    <span
      className="px-2 py-0.5 rounded text-xs font-medium"
      style={{
        background: 'rgba(249,115,22,0.1)',
        color: 'var(--color-accent)',
        border: '1px solid rgba(249,115,22,0.2)',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {label}
    </span>
  )
}

function JsonPreview() {
  return (
    <div
      className="rounded-lg overflow-hidden text-xs"
      style={{
        background: '#0D1117',
        border: '1px solid rgba(249,115,22,0.15)',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <div
        className="flex items-center gap-2 px-3 py-2 text-xs"
        style={{ background: '#161B22', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--color-muted)' }}
      >
        <span style={{ color: '#22c55e' }}>GET</span>
        <span style={{ color: 'var(--color-muted2)' }}>/api/orders/123</span>
        <span className="ml-auto" style={{ color: '#22c55e' }}>200 OK</span>
      </div>
      <div className="px-4 py-3 space-y-0.5" style={{ lineHeight: 1.7 }}>
        <div style={{ color: '#E6EDF3' }}>{`{`}</div>
        <JsonLine k="orderId" v="123" vColor="#79C0FF" />
        <JsonLine k="status" v={`"CONFIRMED"`} vColor="#A5D6FF" />
        <JsonLine k="userId" v="42" vColor="#79C0FF" />
        <JsonLine k="total" v="250000" vColor="#79C0FF" />
        <JsonLine k="createdAt" v={`"2026-03-15T10:30:00Z"`} vColor="#A5D6FF" />
        <div style={{ color: '#E6EDF3' }}>{`}`}</div>
      </div>
    </div>
  )
}

function JsonLine({ k, v, vColor }: { k: string; v: string; vColor: string }) {
  return (
    <div className="pl-4">
      <span style={{ color: '#7EE787' }}>&quot;{k}&quot;</span>
      <span style={{ color: '#E6EDF3' }}>: </span>
      <span style={{ color: vColor }}>{v}</span>
      <span style={{ color: '#E6EDF3' }}>,</span>
    </div>
  )
}

export interface ProjectCardProps {
  project: Project
  index: number
  isInView: boolean
  large?: boolean
  tall?: boolean
}

export default function ProjectCard({ project, index, isInView, large = false, tall = false }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`project-card group relative rounded-2xl overflow-hidden flex flex-col ${
        large ? 'bento-featured' : tall ? 'bento-tall' : ''
      }`}
      style={{
        minHeight: tall ? '420px' : 'auto',
      }}
    >
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
        style={{ background: 'linear-gradient(90deg, #F97316, #FB923C)' }}
      />

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 pr-4">
            <h3
              className={`font-bold mb-1 ${large ? 'text-xl' : 'text-base'} group-hover:text-[var(--color-primary)] transition-colors`}
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
            >
              {project.name}
            </h3>
            {project.role && (
              <p
                className="text-xs mb-1"
                style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}
              >
                {project.role}
              </p>
            )}
          </div>
          <span
            className="shrink-0 px-2 py-1 rounded-md text-xs font-medium"
            style={{
              background: 'rgba(255,255,255,0.05)',
              color: 'var(--color-muted)',
              border: '1px solid rgba(255,255,255,0.08)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {project.period.split('–')[0].trim()}
          </span>
        </div>

        <p
          className={`leading-relaxed flex-1 mb-5 ${large ? 'text-sm' : 'text-sm'}`}
          style={{ color: 'var(--color-muted2)' }}
        >
          {project.description}
        </p>

        {project.variant === 'featured' && (
          <div className="mb-5">
            <JsonPreview />
          </div>
        )}

        <div className="flex items-end justify-between gap-3 mt-auto">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, large ? project.stack.length : 3).map((tech) => (
              <TechBadge key={tech} label={tech} />
            ))}
            {!large && project.stack.length > 3 && (
              <span
                className="px-2 py-0.5 rounded text-xs"
                style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}
              >
                +{project.stack.length - 3}
              </span>
            )}
          </div>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              id={`project-github-${project.id}`}
              className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 hover:scale-110"
              style={{
                background: 'rgba(249,115,22,0.1)',
                border: '1px solid rgba(249,115,22,0.25)',
                color: 'var(--color-primary)',
              }}
              aria-label={`GitHub — ${project.name}`}
            >
              <GithubIcon size={16} />
            </a>
          )}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-3 py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        style={{ background: 'linear-gradient(to top, rgba(249,115,22,0.15), transparent)' }}
      >
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #F97316, #FB923C)',
              color: '#0A0F1E',
              fontFamily: 'var(--font-heading)',
            }}
            aria-label={`View ${project.name} on GitHub`}
          >
            <GithubIcon size={14} />
            View on GitHub
          </a>
        )}
      </div>
    </motion.div>
  )
}
