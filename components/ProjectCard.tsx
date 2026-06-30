'use client'

import { motion } from 'framer-motion'
import GithubIcon from '@/components/GithubIcon'
import { type Project } from '@/lib/data'

export interface ProjectCardProps {
  project: Project
  index: number
  isInView: boolean
}

export default function ProjectCard({ project, index, isInView }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="card flex h-full flex-col p-5"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-bold text-[var(--primary)]">{project.period}</p>
          <h3 className="text-xl">{project.name}</h3>
          {project.role && (
            <p className="mt-2 text-sm font-semibold text-[var(--muted)]">{project.role}</p>
          )}
        </div>
      </div>

      <p className="mb-5 flex-1 text-sm leading-7 text-[var(--muted-2)]">{project.description}</p>

      <div className="mb-5 flex flex-wrap gap-2">
        {project.stack.slice(0, 6).map((tech) => (
          <span key={tech} className="tag">
            {tech}
          </span>
        ))}
      </div>

      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:text-[var(--primary-dark)]"
          aria-label={`View ${project.name} on GitHub`}
        >
          <GithubIcon size={17} />
          View source
        </a>
      )}
    </motion.article>
  )
}
