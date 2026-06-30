'use client'

export function SkeletonCard() {
  return (
    <div className="card flex min-h-[240px] animate-pulse flex-col justify-between p-5">
      <div className="space-y-4">
        <div className="h-5 w-1/3 rounded bg-[var(--surface-2)]" />
        <div className="h-7 w-2/3 rounded bg-[var(--surface-2)]" />
        <div className="h-4 w-full rounded bg-[var(--surface-2)]" />
        <div className="h-4 w-4/5 rounded bg-[var(--surface-2)]" />
      </div>
      <div className="flex gap-2 pt-6">
        <div className="h-7 w-16 rounded-full bg-[var(--surface-2)]" />
        <div className="h-7 w-20 rounded-full bg-[var(--surface-2)]" />
        <div className="h-7 w-14 rounded-full bg-[var(--surface-2)]" />
      </div>
    </div>
  )
}

export default function SkeletonGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
}
