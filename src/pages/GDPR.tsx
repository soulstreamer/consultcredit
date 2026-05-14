import { ArrowLeft } from 'lucide-react'

export default function GDPR() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-[800px] mx-auto">
        <a href="/" className="inline-flex items-center gap-2 text-[#a0a0a0] hover:text-white mb-8">
          <ArrowLeft size={20} />
          Înapoi la pagina principală
        </a>
        
        <h1 className="text-[40px] md:text-[48px] font-bold mb-8">GDPR - Protecția Datelor</h1>
        
        <div className="space-y-6 text-[#a0a0a0] text-[18px] leading-[1.6]">
          <p>
            În conformitate cu Regulamentul (UE) 2016/679 privind protecția persoanelor fizice în ceea ce privește 
            prelucrarea datelor cu caracter personal și privind libera circulație a acestor date (GDPR), 
            vă informăm despre modul în care ConsultCredit.ro prelucrează datele personale.
          </p>
          
          <h2 className="text-[24px] font-semibold text-white mt-8">Operatorul de date</h2>
          <p>
            <strong className="text-white">Denumire:</strong> ConsultCredit SRL<br />
            <strong className="text-white">Adresă:</strong> Str. Exemplu nr. 123, București, România<br />
            <strong className="text-white">Email:</strong> gdpr@consultcredit.ro<br />
            <strong className="text-white">Telefon:</strong> 0700 000 000
          </p>
          
          <h2 className="text-[24px] font-semibold text-white mt-8">Temeiul juridic</h2>
          <p>
            Prelucrarea datelor se realizează pe baza:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Executarea unui contract sau demersuri la cererea persoanei vizate (Art. 6 alin. 1 lit. b GDPR)</li>
            <li>Consimțământul persoanei vizate (Art. 6 alin. 1 lit. a GDPR)</li>
            <li>Interes legitim (Art. 6 alin. 1 lit. f GDPR)</li>
          </ul>
          
          <h2 className="text-[24px] font-semibold text-white mt-8">Perioada de stocare</h2>
          <p>
            Datele personale sunt stocate pe o perioadă de 5 ani de la încheierea raportului contractual, 
            conform prevederilor legale în vigoare.
          </p>
          
          <h2 className="text-[24px] font-semibold text-white mt-8">Drepturile persoanei vizate</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Dreptul de acces la date (Art. 15 GDPR)</li>
            <li>Dreptul la rectificare (Art. 16 GDPR)</li>
            <li>Dreptul la ștergerea datelor (Art. 17 GDPR)</li>
            <li>Dreptul la restricționarea prelucrării (Art. 18 GDPR)</li>
            <li>Dreptul la portabilitatea datelor (Art. 20 GDPR)</li>
            <li>Dreptul la opoziție (Art. 21 GDPR)</li>
          </ul>
          
          <h2 className="text-[24px] font-semibold text-white mt-8">Reclamații</h2>
          <p>
            Aveți dreptul de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor 
            cu Caracter Personal (ANSPDCP) dacă considerați că drepturile dvs. au fost încălcate.
          </p>
        </div>
      </div>
    </div>
  )
}
