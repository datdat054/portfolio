'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import GithubIcon from '@/components/GithubIcon'
import ProjectCard from '@/components/ProjectCard'
import { personalInfo, projects } from '@/lib/data'

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="projects" ref={sectionRef} className="section-shell" aria-label="Projects section">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="section-heading flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="section-kicker">Projects</p>
            <h2 className="section-title">Selected backend work.</h2>
          </div>
          <a
            href={personalInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-fit"
          >
            <GithubIcon size={18} />
            GitHub
          </a>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
