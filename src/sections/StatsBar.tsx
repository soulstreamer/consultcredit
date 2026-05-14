import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FileCheck, Calendar, TrendingUp, Clock } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { number: 2847, suffix: '+', label: 'Credite Obținute', icon: FileCheck },
  { number: 15, suffix: '+', label: 'Ani de Experiență', icon: Calendar },
  { number: 98, suffix: '%', label: 'Rată de Succes', icon: TrendingUp },
  { number: 24, suffix: 'h', label: 'Timp de Răspuns', icon: Clock },
]

export default function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null)
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      stats.forEach((stat, i) => {
        const el = numberRefs.current[i]
        if (!el) return
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: stat.number,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
            delay: i * 0.15,
          }
        )
      })

      gsap.fromTo(
        '.stat-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
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
      id="stats"
      ref={sectionRef}
      className="w-full py-16 md:py-20 border-t border-[#1a1a1a] bg-black"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div key={stat.label} className="stat-item flex flex-col items-center text-center">
              <stat.icon size={32} className="text-[#ffffff] mb-3" />
              <span className="text-[40px] md:text-[48px] font-bold text-[#ffffff] leading-none">
                <span ref={(el) => { numberRefs.current[i] = el }}>0</span>
                {stat.suffix}
              </span>
              <span className="text-[18px] md:text-[20px] text-[#a0a0a0] mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
