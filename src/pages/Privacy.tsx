import { ArrowLeft } from 'lucide-react'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-[800px] mx-auto">
        <a href="/" className="inline-flex items-center gap-2 text-[#a0a0a0] hover:text-white mb-8">
          <ArrowLeft size={20} />
          Înapoi la pagina principală
        </a>
        
        <h1 className="text-[40px] md:text-[48px] font-bold mb-8">Politica de Confidențialitate</h1>
        
        <div className="space-y-6 text-[#a0a0a0] text-[18px] leading-[1.6]">
          <p>
            ConsultCredit.ro respectă confidențialitatea utilizatorilor și se angajează să protejeze datele personale 
            conform Regulamentului (UE) 2016/679 (GDPR) și legislației române în vigoare.
          </p>
          
          <h2 className="text-[24px] font-semibold text-white mt-8">Ce date colectăm</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Nume și prenume</li>
            <li>Număr de telefon</li>
            <li>Adresă de email (opțional)</li>
            <li>Informații despre solicitarea de credit</li>
          </ul>
          
          <h2 className="text-[24px] font-semibold text-white mt-8">Cum folosim datele</h2>
          <p>
            Datele sunt utilizate exclusiv pentru:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Contactarea dvs. pentru ofertarea de soluții de credit</li>
            <li>Analiza eligibilității pentru credite</li>
            <li>Comunicări legate de serviciile solicitate</li>
          </ul>
          
          <h2 className="text-[24px] font-semibold text-white mt-8">Stocarea datelor</h2>
          <p>
            Datele sunt stocate în mod securizat și sunt accesibile doar personalului autorizat. 
            Nu partajăm datele cu terți fără consimțământul explicit.
          </p>
          
          <h2 className="text-[24px] font-semibold text-white mt-8">Drepturile dvs.</h2>
          <p>
            Aveți dreptul să accesați, să rectificați, să ștergeți sau să restricționați prelucrarea datelor personale. 
            Pentru exercitarea acestor drepturi, contactați-ne la contact@consultcredit.ro
          </p>
        </div>
      </div>
    </div>
  )
}
