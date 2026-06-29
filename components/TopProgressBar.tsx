'use client'

import { useEffect, useState, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function ProgressBarContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  if (!loading) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 h-0.5 z-[10000] animate-pulse transition-all duration-300"
      style={{
        background: 'linear-gradient(90deg, #F97316, #FB923C)',
        boxShadow: '0 0 10px #F97316',
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
