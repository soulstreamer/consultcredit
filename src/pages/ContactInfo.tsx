import { ArrowLeft, MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactInfo() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-[800px] mx-auto">
        <a href="/" className="inline-flex items-center gap-2 text-[#a0a0a0] hover:text-white mb-8">
          <ArrowLeft size={20} />
          Înapoi la pagina principală
        </a>
        
        <h1 className="text-[40px] md:text-[48px] font-bold mb-8">Datele Noastre de Contact</h1>
        
        <div className="space-y-8">
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <MapPin size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-[20px] font-semibold text-white">Adresă</h2>
                <p className="text-[#a0a0a0]">Str. Exemplu nr. 123, București, România</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Phone size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-[20px] font-semibold text-white">Telefon</h2>
                <p className="text-[#a0a0a0]">0700 000 000</p>
                <p className="text-[14px] text-[#666]">Disponibil L-V: 09:00 - 18:00</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Mail size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-[20px] font-semibold text-white">Email</h2>
                <p className="text-[#a0a0a0]">contact@consultcredit.ro</p>
                <p className="text-[14px] text-[#666]">Răspundem în maxim 24 de ore</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Clock size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-[20px] font-semibold text-white">Program de Lucru</h2>
                <p className="text-[#a0a0a0]">Luni - Vineri: 09:00 - 18:00</p>
                <p className="text-[#a0a0a0]">Sâmbătă: 10:00 - 14:00</p>
                <p className="text-[14px] text-[#666]">Duminică: Închis</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a 
            href="/#contact" 
            className="inline-block bg-white text-black font-semibold text-[18px] px-8 py-4 rounded-full hover:bg-[#e0e0e0] transition-colors"
          >
            Trimite-ne un mesaj
          </a>
        </div>
      </div>
    </div>
  )
}
