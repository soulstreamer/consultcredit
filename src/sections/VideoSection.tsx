import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.video-header',
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
      gsap.fromTo(
        '.video-container',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.video-container',
            start: 'top 80%',
            once: true,
          },
        }
      )
      gsap.fromTo(
        '.video-quote',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.video-quote',
            start: 'top 85%',
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
      className="w-full py-20 md:py-[120px] bg-black"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="video-header text-center mb-12">
          <h2 className="text-[40px] md:text-[56px] font-bold text-white leading-[1.15]">
            Consultantul Tău Personal
          </h2>
          <p className="text-[20px] md:text-[22px] text-[#a0a0a0] mt-4">
            Discută cu un expert dedicat, chiar de la prima conversație
          </p>
        </div>

        {/* Video container */}
        <div className="video-container relative aspect-video rounded-3xl overflow-hidden border-2 border-[#ffffff]">
          <video
            src="/consultant-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Quote */}
        <div className="video-quote text-center mt-12 max-w-[800px] mx-auto">
          <p className="text-[22px] md:text-[28px] font-bold text-white italic leading-[1.4]">
            "Fiecare client este unic, iar soluția noastră este întotdeauna personalizată. Suntem aici să transformăm un proces complicat într-o experiență simplă și plăcută."
          </p>
          <p className="text-[16px] md:text-[18px] text-[#a0a0a0] mt-4">
            — Elena M., Consultant Șef ConsultCredit
          </p>
        </div>
      </div>
    </section>
  )
}
