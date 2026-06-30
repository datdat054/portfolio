'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-md border border-[var(--border)] bg-white text-[var(--primary)] shadow-lg transition-transform duration-200 hover:scale-105"
          style={{
            boxShadow: '0 12px 30px rgba(15, 23, 42, 0.14)',
          }}
          aria-label="Back to top"
        >
          <ArrowUp size={20} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
