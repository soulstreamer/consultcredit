import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './sections/Header'
import Hero from './sections/Hero'
import StatsBar from './sections/StatsBar'
import About from './sections/About'
import Services from './sections/Services'
import BiroulDeCredite from './sections/BiroulDeCredite'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import Privacy from './pages/Privacy'
import GDPR from './pages/GDPR'

gsap.registerPlugin(ScrollTrigger)

function HomePage({ scrollTo }: { scrollTo: (target: string) => void }) {
  return (
    <>
      <Header scrollTo={scrollTo} />
      <div className="h-px w-full max-w-[200px] mx-auto bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
      <Hero scrollTo={scrollTo} />
      <div className="h-px w-full max-w-[200px] mx-auto bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
      <StatsBar />
      <div className="h-px w-full max-w-[200px] mx-auto bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
      <About />
      <div className="h-px w-full max-w-[200px] mx-auto bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
      <BiroulDeCredite />
      <div className="h-px w-full max-w-[200px] mx-auto bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
      <Services />
      <div className="h-px w-full max-w-[200px] mx-auto bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
      <Testimonials />
      <div className="h-px w-full max-w-[200px] mx-auto bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
      <Contact />
      <div className="h-px w-full max-w-[200px] mx-auto bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
      <Footer scrollTo={scrollTo} />
    </>
  )
}

function AppContent() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  const scrollTo = (target: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -80 })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white font-caveat overflow-x-hidden w-full max-w-[100vw]">
      <Routes>
        <Route path="/" element={<HomePage scrollTo={scrollTo} />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/confidentialitate" element={<Privacy />} />
        <Route path="/gdpr" element={<GDPR />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
