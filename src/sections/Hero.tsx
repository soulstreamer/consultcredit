import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ChevronDown } from 'lucide-react'

interface HeroProps {
  scrollTo: (target: string) => void
}

export default function Hero({ scrollTo }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-h1',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
      )
      gsap.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: 'power3.out' }
      )
      gsap.fromTo(
        '.hero-cta',
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.9, ease: 'power3.out' }
      )
      gsap.fromTo(
        '.hero-scroll',
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 1.4, ease: 'power3.out' }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/birou-elegant.jpg"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-[800px]">
        <h1 className="hero-h1 text-[48px] md:text-[72px] font-bold leading-[1.1] text-white">
          Asistență Credit Premium
        </h1>
        <p className="hero-subtitle text-[20px] md:text-[24px] leading-[1.6] text-[#a0a0a0] mt-6 max-w-[600px]">
          Obține creditul dorit cu ajutorul experților ConsultCredit. Soluții financiare personalizate, rapid și fără stres.
        </p>
        <button
          onClick={() => scrollTo('#servicii')}
          className="hero-cta mt-10 bg-[#ffffff] text-black font-semibold text-[20px] px-12 py-4 rounded-full hover:bg-[#e0e0e0] hover:scale-105 transition-all duration-300"
        >
          Află Mai Multe
        </button>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('#stats')}
        className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={{ animation: 'scroll-chevron 2s ease-in-out infinite' }}
      >
        <ChevronDown size={32} className="text-[#ffffff]" />
      </button>
    </section>
  )
}
