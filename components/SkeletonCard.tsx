'use client'

export function SkeletonCard({ large = false, tall = false }: { large?: boolean; tall?: boolean }) {
  return (
    <div
      className="animate-pulse rounded-[12px] p-6 flex flex-col justify-between"
      style={{
        background: 'var(--surface)',
        minHeight: tall ? '420px' : large ? '320px' : '260px',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-6 w-1/3 bg-white/10 rounded" />
          <div className="h-4 w-12 bg-white/10 rounded" />
        </div>
        <div className="h-4 w-3/4 bg-white/10 rounded" />
        <div className="h-4 w-1/2 bg-white/10 rounded" />
      </div>
      <div className="flex gap-2 pt-6">
        <div className="h-6 w-16 bg-white/10 rounded" />
        <div className="h-6 w-20 bg-white/10 rounded" />
        <div className="h-6 w-14 bg-white/10 rounded" />
      </div>
    </div>
  )
}

export default function SkeletonGrid() {
  return (
    <div className="bento-grid">
      <div className="bento-featured" style={{ gridColumn: 'span 2', gridRow: 'span 1' }}>
        <SkeletonCard large />
      </div>
      <div className="bento-card2" style={{ gridColumn: '3', gridRow: 'span 2' }}>
        <SkeletonCard tall />
      </div>
      <div className="bento-card3">
        <SkeletonCard />
      </div>
      <div className="bento-card4">
        <SkeletonCard />
      </div>
    </div>
  )
}
