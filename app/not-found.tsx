import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)] p-6 text-center">
      <h1 className="mb-4 text-7xl font-extrabold text-[var(--primary)] sm:text-8xl">
        404
      </h1>
      <p className="mb-2 text-2xl font-semibold text-[var(--text)]">
        Page not found.
      </p>
      <p className="mb-8 max-w-md text-sm text-[var(--muted)]">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  )
}
