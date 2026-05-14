import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield, Building2, Lock } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const badges = [
  { icon: Shield, label: 'Consultanți Autorizați' },
  { icon: Building2, label: 'Colaborări Bancare' },
  { icon: Lock, label: 'Confidențialitate 100%' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-text',
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
        '.about-image',
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
        '.about-badge',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-badges',
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
      id="despre"
      ref={sectionRef}
      className="w-full py-20 md:py-[120px] relative bg-fixed md:bg-scroll"
      style={{
        backgroundImage: 'url(/birou-elegant.jpg)',
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
        <div className="grid md:grid-cols-[55%_45%] gap-8 md:gap-16 items-center">
          {/* Image - appears first on mobile */}
          <div className="about-image order-1 md:order-2">
            <img
              src="/consultant.jpg"
              alt="Consultant ConsultCredit"
              className="w-full rounded-2xl border-2 border-[#ffffff] shadow-[0_20px_60px_rgba(184,115,51,0.2)]"
            />
          </div>

          {/* Text - appears second on mobile */}
          <div className="about-text order-2 md:order-1">
            <h2 className="text-[32px] md:text-[56px] font-bold text-white leading-[1.15]">
              Echipa Noastră de Experți
            </h2>
            <p className="text-[18px] md:text-[22px] leading-[1.6] text-[#a0a0a0] mt-6">
              ConsultCredit.ro este o firmă de asistență financiară specializată în consultanță credit, cu o experiență de peste 15 ani în domeniul financiar-bancar. Echipa noastră de consultanți autorizați vă oferă soluții personalizate pentru obținerea creditelor, refinanțare și îmbunătățirea scoringului la Biroul de Credite.
            </p>
            <p className="text-[18px] md:text-[22px] leading-[1.6] text-[#a0a0a0] mt-4">
              Fie că aveți nevoie de un credit ipotecar, de consum sau pentru afaceri, suntem alături de dumneavoastră la fiecare pas — de la evaluarea eligibilității până la semnarea contractului cu banca. Colaborăm cu toate instituțiile financiare importante din România pentru a vă oferi cele mai bune condiții.
            </p>

            {/* Badges */}
            <div className="about-badges flex flex-wrap gap-4 md:gap-6 mt-6 md:mt-8">
              {badges.map((badge) => (
                <div
                  key={badge.label}
                  className="about-badge flex items-center gap-2 md:gap-3"
                >
                  <badge.icon size={20} className="text-[#ffffff] md:w-[22px] md:h-[22px]" />
                  <span className="text-[16px] md:text-[18px] text-[#fbfbfb]">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
