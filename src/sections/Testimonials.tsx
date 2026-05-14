import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote: 'Am obținut creditul ipotecar în doar 10 zile datorită ConsultCredit. Fără ei, aș fi renunțat la procesul birocratic. Recomand cu încredere!',
    author: 'Maria I.',
    role: 'Client Credit Ipotecar',
  },
  {
    quote: 'Profesionalism, rapiditate și transparență. Am primit cele mai bune condiții de la bancă și am economisit mii de lei pe termen lung.',
    author: 'Andrei P.',
    role: 'Client Refinanțare',
  },
  {
    quote: 'După ce am fost refuzat la două bănci, ConsultCredit mi-a găsit soluția perfectă. Acum am casa visurilor mele!',
    author: 'Cristina D.',
    role: 'Client Credit Nou',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials-header',
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
        '.testimonial-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonial-cards',
            start: 'top 75%',
            once: true,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="testimoniale"
      ref={sectionRef}
      className="w-full py-20 md:py-[120px] bg-black"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="testimonials-header text-center mb-16">
          <h2 className="text-[40px] md:text-[56px] font-bold text-white leading-[1.15]">
            Ce Spun Clienții Noștri
          </h2>
        </div>

        {/* Cards */}
        <div className="testimonial-cards grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="testimonial-card bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-8 md:p-10"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="text-[#ffffff]"
                    fill="#ffffff"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[18px] md:text-[20px] text-[#fbfbfb] italic leading-[1.6]">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="mt-6">
                <p className="text-[16px] md:text-[18px] font-semibold text-[#ffffff]">
                  {t.author}
                </p>
                <p className="text-[14px] md:text-[16px] text-[#a0a0a0]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
