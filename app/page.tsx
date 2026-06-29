import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import TopProgressBar from '@/components/TopProgressBar'

export default function Home() {
  return (
    <>
      <TopProgressBar />
      <Navbar />
      <main id="main-content">
        <Hero />
        <hr className="section-divider" />
        <About />
        <hr className="section-divider" />
        <Skills />
        <hr className="section-divider" />
        <Projects />
        <hr className="section-divider" />
        <Experience />
        <hr className="section-divider" />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
