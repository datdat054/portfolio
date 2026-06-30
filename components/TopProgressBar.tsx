'use client'

import { useEffect, useState, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function ProgressBarContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const start = setTimeout(() => setLoading(true), 0)
    const timer = setTimeout(() => setLoading(false), 500)
    return () => {
      clearTimeout(start)
      clearTimeout(timer)
    }
  }, [pathname, searchParams])

  if (!loading) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 h-0.5 z-[10000] animate-pulse transition-all duration-300"
      style={{
        background: 'var(--primary)',
        boxShadow: '0 0 10px rgba(37, 99, 235, 0.35)',
      }}
    />
  )
}

export default function TopProgressBar() {
  return (
    <Suspense fallback={null}>
      <ProgressBarContent />
    </Suspense>
  )
}
