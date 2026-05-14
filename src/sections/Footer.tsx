import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface FooterProps {
  scrollTo: (target: string) => void
}

const quickLinks = [
  { label: 'Despre Noi', target: '#despre' },
  { label: 'Servicii', target: '#servicii' },
  { label: 'Biroul de Credite', target: '#birou' },
  { label: 'Contact', target: '#contact' },
]

const legalLinks = [
  { label: 'Confidențialitate', href: '/confidentialitate' },
  { label: 'GDPR', href: '/gdpr' },
]

export default function Footer({ scrollTo }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-content',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      )
    }, footerRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="w-full py-12 md:py-16 bg-black border-t border-[#1a1a1a]"
    >
      <div className="footer-content max-w-[1280px] mx-auto px-4 md:px-6 flex flex-col items-center">
        {/* Logo */}
        <button onClick={() => scrollTo('#hero')} className="mb-4">
          <img
            src="/consultfinanciar.png"
            alt="ConsultCredit"
            className="h-32 md:h-60 w-auto object-contain"
          />
        </button>
        <p className="text-[14px] md:text-[18px] text-[#a0a0a0] mt-2 text-center">
          Asistență Credit Premium
        </p>

        {/* Quick links */}
        <nav className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6 md:mt-8">
          {quickLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.target)}
              className="text-[14px] md:text-[18px] text-[#a0a0a0] hover:text-white transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Legal links */}
        <nav className="flex flex-wrap justify-center gap-3 md:gap-4 mt-4 md:mt-6 pt-4 md:pt-6 border-t border-[#1a1a1a] w-full max-w-md">
          {legalLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[12px] md:text-[16px] text-[#666] hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-[12px] md:text-[16px] text-[#555] mt-8 md:mt-10 text-center">
          © 2025 ConsultCredit.ro — Toate drepturile rezervate.
        </p>
      </div>
    </footer>
  )
}
