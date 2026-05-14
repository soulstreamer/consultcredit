import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-header',
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
        '.contact-left',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 80%',
            once: true,
          },
        }
      )
      gsap.fromTo(
        '.contact-right',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full py-20 md:py-[120px] bg-black"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="contact-header text-center mb-16">
          <h2 className="text-[40px] md:text-[56px] font-bold text-white leading-[1.15]">
            Contactează-ne
          </h2>
          <p className="text-[20px] md:text-[22px] text-[#a0a0a0] mt-4">
            Suntem aici să te ajutăm. Alege metoda preferată de contact.
          </p>
        </div>

        {/* Content */}
        <div className="contact-content grid md:grid-cols-2 gap-12">
          {/* Left - Map & Contact Info */}
          <div className="contact-left">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-[#1a1a1a] h-[280px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d91160.56615121736!2d26.024598326117176!3d44.43792692789969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f93abf1996f1%3A0x4546752dd5e31f40!2sBucure%C8%99ti!5e0!3m2!1sro!2sro!4v1700000000000!5m2!1sro!2sro"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hartă ConsultCredit București"
              />
            </div>

            {/* Contact details */}
            <div className="mt-8 space-y-4">
              <a
                href="tel:+40722123456"
                className="flex items-center gap-3 text-[18px] md:text-[20px] text-[#ffffff] hover:text-[#e0e0e0] transition-colors"
              >
                <Phone size={20} />
                +40 722 123 456
              </a>
              <a
                href="mailto:contact@consultcredit.ro"
                className="flex items-center gap-3 text-[18px] md:text-[20px] text-[#ffffff] hover:text-[#e0e0e0] transition-colors"
              >
                <Mail size={20} />
                contact@consultcredit.ro
              </a>
              <div className="flex items-center gap-3 text-[18px] md:text-[20px] text-[#fbfbfb]">
                <MapPin size={20} className="text-[#ffffff]" />
                Str. Victoriei nr. 15, București
              </div>
              <div className="flex items-center gap-3 text-[18px] md:text-[20px] text-[#fbfbfb]">
                <Clock size={20} className="text-[#ffffff]" />
                Luni-Vineri: 09:00 - 18:00
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="contact-right">
            <form
              onSubmit={handleSubmit}
              className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-3xl p-8 md:p-12 space-y-6"
            >
              <div>
                <input
                  type="text"
                  placeholder="Numele tău complet"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#111] border border-[#1a1a1a] rounded-xl px-4 py-4 text-[18px] md:text-[20px] text-white placeholder:text-[#555] focus:border-[#ffffff] focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Adresa de email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#111] border border-[#1a1a1a] rounded-xl px-4 py-4 text-[18px] md:text-[20px] text-white placeholder:text-[#555] focus:border-[#ffffff] focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Număr de telefon"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#111] border border-[#1a1a1a] rounded-xl px-4 py-4 text-[18px] md:text-[20px] text-white placeholder:text-[#555] focus:border-[#ffffff] focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Mesajul tău..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#111] border border-[#1a1a1a] rounded-xl px-4 py-4 text-[18px] md:text-[20px] text-white placeholder:text-[#555] focus:border-[#ffffff] focus:outline-none transition-colors resize-none"
                  required
                />
              </div>

              {submitted ? (
                <div className="text-center py-4 text-[#ffffff] text-[20px] font-semibold">
                  Mesaj trimis cu succes! Vă contactăm curând.
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-[#ffffff] text-black font-semibold text-[20px] py-4 rounded-full hover:bg-[#e0e0e0] hover:scale-[1.02] transition-all duration-300"
                >
                  Trimite Mesajul
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
