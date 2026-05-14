import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FinalQuote() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.final-quote-content',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full py-32 md:py-40 bg-black relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(184,115,51,0.05) 0%, transparent 70%)',
      }}
    >
      <div className="final-quote-content max-w-[800px] mx-auto px-6 text-center relative">
        {/* Decorative quote mark */}
        <span
          className="text-[100px] md:text-[120px] text-[#ffffff] leading-none select-none block"
          style={{ animation: 'float 4s ease-in-out infinite' }}
        >
          "
        </span>

        <blockquote className="text-[26px] md:text-[36px] font-bold text-white leading-[1.4] -mt-8">
          Creditul nu este un lux, ci un instrument. Folosit cu înțelepciune, deschide uși pe care altfel nu ai putea să le atingi.
        </blockquote>

        <cite className="block text-[18px] md:text-[20px] text-[#a0a0a0] mt-6 not-italic">
          — Robert Kiyosaki
        </cite>
      </div>
    </section>
  )
}
