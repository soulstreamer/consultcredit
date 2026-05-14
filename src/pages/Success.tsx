import { useEffect, useState } from 'react'
import { CheckCircle, Phone, User, Loader2 } from 'lucide-react'
import { useSearchParams } from 'react-router'

export default function Success() {
  const [searchParams] = useSearchParams()
  const [sessionData, setSessionData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    if (sessionId) {
      // Fetch session details from backend
      fetch(`/api/session/${sessionId}`)
        .then(res => res.json())
        .then(data => {
          setSessionData(data)
          setLoading(false)
        })
        .catch(err => {
          console.error('Error fetching session:', err)
          setLoading(false)
        })
    }
  }, [sessionId])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-[600px] w-full text-center">
        {loading ? (
          <div className="flex flex-col items-center">
            <Loader2 size={48} className="text-white animate-spin mb-4" />
            <p className="text-[#a0a0a0] text-[18px]">Se verifică detaliile plății...</p>
          </div>
        ) : (
          <>
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-black" />
            </div>
            
            <h1 className="text-[40px] md:text-[48px] font-bold text-white mb-4">
              Plată Reușită!
            </h1>
            
            <p className="text-[20px] text-[#a0a0a0] mb-8">
              Vă mulțumim pentru achiziție! Un consultant te va contacta în cel mai scurt timp posibil.
            </p>
            
            {sessionData && (
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-6 mb-8 text-left">
                <h3 className="text-[20px] font-semibold text-white mb-4">Detalii comandă:</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User size={20} className="text-[#ffffff]" />
                    <span className="text-[18px] text-[#fbfbfb]">
                      Nume: {sessionData.metadata?.nume || sessionData.customer_details?.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={20} className="text-[#ffffff]" />
                    <span className="text-[18px] text-[#fbfbfb]">
                      Telefon: {sessionData.metadata?.telefon || sessionData.customer_details?.phone}
                    </span>
                  </div>
                  <div className="text-[18px] text-[#a0a0a0]">
                    Produs: {sessionData.metadata?.produs}
                  </div>
                  <div className="text-[18px] text-[#a0a0a0]">
                    Status: <span className="text-green-400">Plătit</span>
                  </div>
                </div>
              </div>
            )}
            
            <a
              href="/"
              className="inline-block bg-[#ffffff] text-black font-semibold text-[18px] px-8 py-4 rounded-full hover:bg-[#e0e0e0] transition-colors"
            >
              Înapoi la pagina principală
            </a>
          </>
        )}
      </div>
    </div>
  )
}
