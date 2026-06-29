import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
      style={{ background: 'var(--bg)' }}
    >
      <h1
        className="text-8xl font-extrabold mb-4 gradient-text"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        404
      </h1>
      <p
        className="text-2xl font-semibold mb-2"
        style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
      >
        Page not found.
      </p>
      <p className="text-sm mb-8 max-w-md" style={{ color: 'var(--color-muted)' }}>
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
        style={{
          background: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
          color: '#0A0F1E',
          fontFamily: 'var(--font-heading)',
          boxShadow: '0 0 20px rgba(249,115,22,0.3)',
        }}
      >
        Back to Home
      </Link>
    </div>
  )
}
