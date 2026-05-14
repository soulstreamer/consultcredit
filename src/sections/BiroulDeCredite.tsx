import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const points = [
  'Analiză raport Biroul de Credite',
  'Strategii de îmbunătățire scoring',
  'Asistență documente contestare',
  'Plan de recuperare financiară',
]

export default function BiroulDeCredite() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.bc-image',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
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
        '.bc-text',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
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
        '.bc-point',
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.bc-points',
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
      className="w-full py-20 md:py-[120px] relative"
      style={{
        backgroundImage: 'url(/birou-contract.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        WebkitBackgroundSize: 'cover',
        MozBackgroundSize: 'cover',
        OBackgroundSize: 'cover'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80" />
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-[45%_55%] gap-8 md:gap-16 items-center">
          {/* Image */}
          <div className="bc-image order-1 md:order-1">
            <img
              src="/reclama.png"
              alt="Birou ConsultCredit"
              className="w-full rounded-2xl border-2 border-[#ffffff] shadow-[0_20px_60px_rgba(255,255,255,0.2)]"
            />
          </div>

          {/* Text */}
          <div className="bc-text order-2 md:order-2">
            <h2 className="text-[32px] md:text-[56px] font-bold text-white leading-[1.15]">
              Soluții pentru Biroul de Credite
            </h2>
            <p className="text-[18px] md:text-[22px] leading-[1.6] text-[#a0a0a0] mt-6">
              Ești înscris la Biroul de Credite și ți-e frică că nu vei mai putea obține un credit? Echipa noastră te poate ajuta cu informații detaliate despre cum funcționează Biroul de Credite și ce pași trebuie să urmezi pentru a-ți îmbunătăți scoringul.
            </p>
            <p className="text-[18px] md:text-[22px] leading-[1.6] text-[#a0a0a0] mt-4">
              Deși ștergerea din Biroul de Credite nu este imediată, există căi legale și strategii financiare prin care poți reduce impactul negativ și reveni la un profil favorabil. Noi îți oferim un plan personalizat de recuperare financiară.
            </p>

            {/* Points */}
            <div className="bc-points mt-6 md:mt-8 space-y-3">
              {points.map((point) => (
                <div key={point} className="bc-point flex items-center gap-3">
                  <Check size={20} className="text-[#ffffff] flex-shrink-0 md:w-[22px] md:h-[22px]" />
                  <span className="text-[16px] md:text-[20px] text-[#fbfbfb]">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
