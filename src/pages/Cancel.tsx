import { XCircle, ArrowLeft } from 'lucide-react'

export default function Cancel() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-[600px] w-full text-center">
        <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle size={40} className="text-black" />
        </div>
        
        <h1 className="text-[40px] md:text-[48px] font-bold text-white mb-4">
          Plată Anulată
        </h1>
        
        <p className="text-[20px] text-[#a0a0a0] mb-8">
          Plata a fost anulată. Dacă doriți să achiziționați serviciul, puteți încerca din nou.
        </p>
        
        <div className="space-y-4">
          <a
            href="/#servicii"
            className="inline-block bg-[#ffffff] text-black font-semibold text-[18px] px-8 py-4 rounded-full hover:bg-[#e0e0e0] transition-colors"
          >
            Înapoi la servicii
          </a>
          
          <div>
            <a
              href="/"
              className="inline-flex items-center gap-2 text-[#a0a0a0] hover:text-white transition-colors mt-6"
            >
              <ArrowLeft size={20} />
              <span>Pagina principală</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
