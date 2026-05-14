import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FileText, Crown, Check, Phone, User } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    id: 'standard',
    icon: FileText,
    name: 'Asistență Credit Standard',
    description: 'Analiza eligibilității, pregătirea documentației și asistență la depunerea cererii de credit. Ideal pentru credite de consum și ipotecare simple.',
    oldPrice: '1.499 RON',
    newPrice: '999 RON',
    discount: 'REDUCERE 33%',
    features: [
      'Analiză eligibilitate credit',
      'Pregătire documentație',
      'Asistență depunere cerere',
      '1 consultație telefonică',
    ],
    featured: false,
    stripeLink: '#',
  },
  {
    id: 'premium',
    icon: Crown,
    name: 'Asistență Credit Premium',
    description: 'Serviciu complet de consultanță credit cu analiză detaliată, negociere cu banca, asistență Biroul de Credite și suport prioritar.',
    oldPrice: '2.999 RON',
    newPrice: '1.899 RON',
    discount: 'REDUCERE 37%',
    features: [
      'Analiză eligibilitate detaliată',
      'Pregătire documentație completă',
      'Asistență depunere + urmărire',
      'Consultații nelimitate',
      'Asistență Biroul de Credite',
      'Negociere condiții cu banca',
    ],
    featured: true,
    stripeLink: '#',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const [phoneNumbers, setPhoneNumbers] = useState<{[key: string]: string}>({
    standard: '',
    premium: ''
  })
  const [names, setNames] = useState<{[key: string]: string}>({
    standard: '',
    premium: ''
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-header',
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
        '.service-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.service-cards',
            start: 'top 75%',
            once: true,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handlePhoneChange = (planId: string, value: string) => {
    // Allow only numbers
    const numericValue = value.replace(/\D/g, '').slice(0, 10)
    setPhoneNumbers(prev => ({ ...prev, [planId]: numericValue }))
  }

  const handleNameChange = (planId: string, value: string) => {
    setNames(prev => ({ ...prev, [planId]: value }))
  }

  const isPhoneValid = (phone: string) => phone.length === 10
  const isNameValid = (name: string) => name.trim().length >= 2

  const [isLoading, setIsLoading] = useState<{[key: string]: boolean}>({
    standard: false,
    premium: false
  })

  const handleBuy = async (planName: string, planId: string) => {
    const phone = phoneNumbers[planId]
    const name = names[planId]
    
    if (!isNameValid(name)) {
      alert('Vă rugăm să introduceți numele și prenumele (minimum 2 caractere).')
      return
    }
    
    if (!isPhoneValid(phone)) {
      alert('Vă rugăm să introduceți un număr de telefon valid din 10 cifre.')
      return
    }
    
    setIsLoading(prev => ({ ...prev, [planId]: true }))
    
    try {
      // Apelează backend-ul pentru a crea sesiunea de checkout
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: planId,
          phoneNumber: phone,
          planName: planName,
          customerName: name,
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'A apărut o eroare la procesarea plății.')
      }
      
      // Redirecționează către Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('URL-ul de plată nu a fost generat.')
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert(error instanceof Error ? error.message : 'A apărut o eroare. Încercați din nou.')
    } finally {
      setIsLoading(prev => ({ ...prev, [planId]: false }))
    }
  }

  return (
    <section
      id="servicii"
      ref={sectionRef}
      className="w-full py-20 md:py-[120px] bg-black"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="service-header text-center mb-16">
          <h2 className="text-[40px] md:text-[56px] font-bold text-white leading-[1.15]">
            Serviciile Noastre
          </h2>
          <p className="text-[20px] md:text-[22px] text-[#a0a0a0] mt-4">
            Alege pachetul potrivit pentru nevoile tale financiare
          </p>
        </div>

        {/* Cards */}
        <div className="service-cards grid md:grid-cols-2 gap-8 items-stretch justify-items-center w-full overflow-hidden">
          {plans.map((plan) => (
            <div key={plan.name} className="relative flex flex-col h-full w-full max-w-md mx-auto">
              {/* Floating Crown for Premium - Outside card */}
              {plan.featured && (
                <div
                  className="absolute -top-32 -right-32 md:-top-36 md:-right-36 z-30 pointer-events-none"
                  style={{
                    width: '280px',
                    height: '280px',
                    transform: 'rotate(30deg)',
                    animation: 'float-crown 3s ease-in-out infinite',
                  }}
                >
                  <img
                    src="/coroana.png"
                    alt="Crown"
                    className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.9)]"
                  />
                </div>
              )}
            <div
              className={`service-card relative border rounded-3xl overflow-hidden transition-all duration-400 flex flex-col flex-grow w-full max-w-md mx-auto ${
                plan.featured
                  ? 'border-[#ffffff] bronze-glow'
                  : 'bg-[#0a0a0a] border-[#1a1a1a] hover:border-[#ffffff] hover:bronze-glow'
              }`}
            >
              {/* Video background for Premium */}
              {plan.featured && (
                <>
                  <video
                    src="/consultant-video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/70" />
                </>
              )}
              
              <div className="relative z-10 p-8 md:p-12 flex flex-col flex-grow">
                {/* Featured badge */}
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ffffff] to-[#e0e0e0] text-black font-semibold text-[14px] px-6 py-2 rounded-full">
                    RECOMANDAT
                  </div>
                )}

                <plan.icon size={48} className="text-[#ffffff] mb-6 mx-auto" />

              <h3 className="text-[28px] md:text-[32px] font-semibold text-white leading-[1.3]">
                {plan.name}
              </h3>

              <p className="text-[18px] md:text-[20px] text-[#a0a0a0] mt-4 leading-[1.5]">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-[22px] md:text-[24px] text-[#a0a0a0] line-through">
                  {plan.oldPrice}
                </span>
                <span className="text-[40px] md:text-[48px] font-bold text-[#ffffff]">
                  {plan.newPrice}
                </span>
              </div>

              <span className="inline-block mt-2 bg-[#ffffff] text-black text-[14px] font-semibold px-4 py-1 rounded-full">
                {plan.discount}
              </span>

              {/* Features */}
              <ul className="mt-8 space-y-3 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check size={20} className="text-[#ffffff] flex-shrink-0" />
                    <span className="text-[18px] md:text-[20px] text-[#fbfbfb]">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Name Input */}
              <div className="mt-8">
                <label className="block text-[16px] text-[#a0a0a0] mb-2">
                  <User size={16} className="inline mr-2" />
                  Nume și Prenume *
                </label>
                <input
                  type="text"
                  value={names[plan.id]}
                  onChange={(e) => handleNameChange(plan.id, e.target.value)}
                  placeholder="Ion Popescu"
                  className="w-full bg-[#111] border border-[#333] rounded-xl px-4 py-3 text-[18px] text-white placeholder:text-[#555] focus:border-[#ffffff] focus:outline-none transition-colors"
                />
              </div>

              {/* Phone Input */}
              <div className="mt-4">
                <label className="block text-[16px] text-[#a0a0a0] mb-2">
                  <Phone size={16} className="inline mr-2" />
                  Număr de telefon *
                </label>
                <input
                  type="tel"
                  value={phoneNumbers[plan.id]}
                  onChange={(e) => handlePhoneChange(plan.id, e.target.value)}
                  placeholder="07xx xxx xxx"
                  className="w-full bg-[#111] border border-[#333] rounded-xl px-4 py-3 text-[18px] text-white placeholder:text-[#555] focus:border-[#ffffff] focus:outline-none transition-colors"
                  maxLength={10}
                />
                <p className="text-[14px] text-[#666] mt-1">
                  {phoneNumbers[plan.id].length}/10 cifre
                </p>
              </div>

              {/* CTA */}
                <button
                  onClick={() => handleBuy(plan.name, plan.id)}
                  disabled={!isNameValid(names[plan.id]) || !isPhoneValid(phoneNumbers[plan.id]) || isLoading[plan.id]}
                  className={`w-full mt-6 py-4 rounded-full font-semibold text-[20px] transition-all duration-300 ${
                    plan.featured
                      ? isNameValid(names[plan.id]) && isPhoneValid(phoneNumbers[plan.id]) && !isLoading[plan.id]
                        ? 'bg-[#ffffff] text-black hover:bg-[#e0e0e0] hover:scale-[1.02] animate-pulse'
                        : 'bg-[#333] text-[#666] cursor-not-allowed'
                      : isNameValid(names[plan.id]) && isPhoneValid(phoneNumbers[plan.id]) && !isLoading[plan.id]
                        ? 'bg-[#ffffff] text-black hover:bg-[#e0e0e0] hover:scale-105'
                        : 'bg-[#333] text-[#666] cursor-not-allowed'
                  }`}
                  style={plan.featured && isNameValid(names[plan.id]) && isPhoneValid(phoneNumbers[plan.id]) && !isLoading[plan.id] ? { animation: 'pulse-glow 3s ease-in-out infinite' } : {}}
                >
                  {isLoading[plan.id] 
                    ? 'Se procesează...' 
                    : !isNameValid(names[plan.id])
                      ? 'Introduceți numele și prenumele'
                      : !isPhoneValid(phoneNumbers[plan.id]) 
                        ? 'Introduceți numărul de telefon' 
                        : 'Cumpără Acum'}
                </button>

                {/* Payment Methods */}
                <div className="mt-6 flex items-center justify-center gap-3">
                  <div className="bg-white rounded-lg px-3 py-1.5 flex items-center">
                    <svg viewBox="0 0 48 48" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="48" height="48" rx="4" fill="#1A1F71"/>
                      <path d="M19.2 32H15L18.6 16H22.8L19.2 32Z" fill="white"/>
                      <path d="M34.2 16.4C33.4 16.1 32.2 16 30.8 16C27.4 16 25 17.6 25 20C25 21.8 26.6 22.8 27.8 23.4C29 24 29.4 24.4 29.4 24.8C29.4 25.4 28.6 25.8 27.8 25.8C26.6 25.8 25.6 25.5 24.8 25.2L24.2 25L23.6 28.2C24.4 28.5 25.8 28.8 27.2 28.8C30.8 28.8 33.2 27.2 33.2 24.6C33.2 23.2 32.2 22.2 30.4 21.4C29.2 20.8 28.4 20.4 28.4 20C28.4 19.4 29 19 30.2 19C31.2 19 32 19.2 32.6 19.4L33 19.6L33.6 16.6L34.2 16.4Z" fill="white"/>
                      <path d="M38.6 16H35.8C35.2 16 34.6 16.2 34.4 16.8L29.2 32H33L33.8 29.6H38L38.6 32H42L38.6 16ZM34.6 26.6L36.4 20.8L37.4 26.6H34.6Z" fill="white"/>
                      <path d="M13.4 16L13.2 16.8C13.2 16.8 11.6 16.2 9.8 16.2C6.6 16.2 4.4 18.2 4.4 21C4.4 22.8 5.8 24 7.4 24.8C9 25.6 9.6 26.2 9.6 27C9.6 28.2 8.2 28.8 6.8 28.8C4.8 28.8 3.6 28.4 3.6 28.4L3 28.2L2.4 31.4C2.4 31.4 4.2 32 6.2 32C9.8 32 12.2 29.8 12.2 26.6C12.2 25 11.2 23.6 9 22.6C7.6 22 6.8 21.4 6.8 20.6C6.8 19.8 7.6 19 9 19C10.6 19 11.6 19.4 12.4 19.8L12.8 20L13.4 16Z" fill="white"/>
                    </svg>
                    <span className="ml-2 text-black font-bold text-sm">VISA</span>
                  </div>
                  <div className="bg-white rounded-lg px-3 py-1.5 flex items-center">
                    <svg viewBox="0 0 48 48" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="48" height="48" rx="4" fill="#EB001B"/>
                      <circle cx="19" cy="24" r="10" fill="#EB001B"/>
                      <circle cx="29" cy="24" r="10" fill="#F79E1B"/>
                      <path d="M24 16.5C26.5 18.2 28 21 28 24C28 27 26.5 29.8 24 31.5C21.5 29.8 20 27 20 24C20 21 21.5 18.2 24 16.5Z" fill="#FF5F00"/>
                    </svg>
                    <span className="ml-2 text-black font-bold text-sm">Mastercard</span>
                  </div>
                </div>

                <p className="text-center text-[12px] text-[#666] mt-2">
                  Plată securizată prin Stripe
                </p>
              </div>
            </div>
          </div>
          ))}
        </div>

        {/* Post-purchase info */}
        <div className="mt-12 text-center max-w-[800px] mx-auto">
          <p className="text-[18px] md:text-[20px] text-[#a0a0a0] leading-[1.6]">
            După achitarea plății vei fi contactat de către un consultant dedicat în cel mai scurt timp posibil, fără întârziere. Echipa noastră prioritizează fiecare client pentru a te ghida pas cu pas în obținerea creditului dorit.
          </p>
        </div>
      </div>
    </section>
  )
}
