import { useState, useEffect } from 'react'
import gsap from 'gsap'

interface HeaderProps {
  scrollTo: (target: string) => void
}

export default function Header({ scrollTo }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    gsap.fromTo(
      '.header-container',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.2 }
    )
    gsap.fromTo(
      '.nav-link',
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.4 }
    )
  }, [])

  const leftLinks = [
    { label: 'Acasă', target: '#hero' },
    { label: 'Despre Noi', target: '#despre' },
    { label: 'Servicii', target: '#servicii' },
  ]

  const rightLinks = [
    { label: 'Testimoniale', target: '#testimoniale' },
    { label: 'Contact', target: '#contact' },
  ]

  const handleNav = (target: string) => {
    scrollTo(target)
  }

  return (
    <header
      className={`header-container fixed top-0 left-0 right-0 z-50 h-32 md:h-40 flex items-center justify-center transition-all duration-300 ${
        scrolled ? 'bg-black/92 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-[1280px] px-6 flex items-center justify-center">
        <div className="flex items-center gap-2">
          {/* Left nav - desktop */}
          <nav className="hidden md:flex items-center">
            {leftLinks.map((link, index) => (
              <div key={link.label} className="flex items-center">
                <button
                  onClick={() => handleNav(link.target)}
                  className="nav-link relative text-[20px] font-medium text-[#a0a0a0] hover:text-[#ffffff] transition-colors duration-300 px-3 py-2 group overflow-hidden"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-0 w-full h-0.5 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                </button>
                {index < leftLinks.length - 1 && (
                  <div className="w-px h-4 bg-white/50 mx-1" />
                )}
              </div>
            ))}
          </nav>

          {/* Logo - centered on all screens */}
          <button onClick={() => handleNav('#hero')} className="flex-shrink-0 mx-auto md:mx-6">
            <img
              src="/consultfinanciar.png"
              alt="ConsultCredit"
              className="h-24 md:h-40 w-auto object-contain"
            />
          </button>

          {/* Right nav - desktop */}
          <nav className="hidden md:flex items-center">
            {rightLinks.map((link, index) => (
              <div key={link.label} className="flex items-center">
                <button
                  onClick={() => handleNav(link.target)}
                  className="nav-link relative text-[20px] font-medium text-[#a0a0a0] hover:text-[#ffffff] transition-colors duration-300 px-3 py-2 group overflow-hidden"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-0 w-full h-0.5 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                </button>
                {index < rightLinks.length - 1 && (
                  <div className="w-px h-4 bg-white/50 mx-1" />
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
