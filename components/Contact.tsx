'use client'

import { FormEvent, useRef, useState } from 'react'
import { Mail, Send } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import GithubIcon from '@/components/GithubIcon'
import { personalInfo } from '@/lib/data'

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  multiline = false,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  multiline?: boolean
}) {
  const classes =
    'mt-2 w-full rounded-md border border-[var(--border)] bg-white px-3 py-3 text-[var(--text)] outline-none transition-colors placeholder:text-slate-400 focus:border-[var(--primary)]'

  return (
    <label htmlFor={id} className="block text-sm font-bold text-[var(--text)]">
      {label}
      {multiline ? (
        <textarea
          id={id}
          rows={5}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={classes}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={classes}
        />
      )}
    </label>
  )
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`)
    const body = encodeURIComponent(`Hi Dat,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`)
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" ref={sectionRef} className="section-shell" aria-label="Contact section">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="section-heading"
        >
          <p className="section-kicker">Contact</p>
          <h2 className="section-title">Let&apos;s talk.</h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="card p-6"
          >
            <p className="text-base leading-8 text-[var(--muted-2)]">
              Open to internships, junior backend roles, and project collaboration.
            </p>

            <div className="mt-6 space-y-3">
              <a href={`mailto:${personalInfo.email}`} className="btn-secondary w-full justify-start">
                <Mail size={18} />
                {personalInfo.email}
              </a>
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full justify-start"
              >
                <GithubIcon size={18} />
                github.com/{personalInfo.github}
              </a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.16 }}
            onSubmit={handleSubmit}
            className="card space-y-5 p-6"
            aria-label="Contact form"
          >
            <Field id="contact-name" label="Name" value={name} onChange={setName} />
            <Field id="contact-email" label="Email" type="email" value={email} onChange={setEmail} />
            <Field id="contact-message" label="Message" value={message} onChange={setMessage} multiline />

            <button type="submit" className="btn-primary">
              <Send size={18} />
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
