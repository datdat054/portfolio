import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  metadataBase: new URL('https://ducdat.dev'),
  title: 'Luu Duc Dat — Java Backend Developer',
  description:
    'Portfolio of Luu Duc Dat, a Java Backend Developer specializing in Spring Boot, microservices, and PostgreSQL. Software Engineering student at PTIT HCMC.',
  keywords: [
    'Java developer',
    'Spring Boot',
    'backend developer',
    'microservices',
    'PTIT HCMC',
    'Ho Chi Minh City',
  ],
  authors: [{ name: 'Luu Duc Dat' }],
  openGraph: {
    title: 'Luu Duc Dat — Java Backend Developer',
    description: 'Spring Boot engineer building scalable backend systems. PTIT HCMC.',
    type: 'website',
    url: 'https://ducdat.dev',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Luu Duc Dat Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luu Duc Dat — Java Backend Developer',
    description: 'Spring Boot engineer. PTIT HCMC.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-md focus:bg-[var(--primary)] focus:text-[#0A0F1E] font-semibold shadow-lg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
