# ConsultCredit Backend Server

Acesta este serverul backend pentru procesarea plăților prin Stripe.

## 🚀 Setup

### 1. Instalează dependențele
```bash
cd server
npm install
```

### 2. Configurează variabilele de mediu
```bash
cp .env.example .env
# Editează fișierul .env și adaugă cheile tale Stripe
```

### 3. Creează produsele în Stripe Dashboard

1. Intră pe https://dashboard.stripe.com/products
2. Creează 2 produse:
   - **Asistență Credit Standard** - 999 RON
   - **Asistență Credit Premium** - 1.899 RON
3. Copiază Price IDs în fișierul `.env`:
   - `STRIPE_PRICE_STANDARD` = price_... (pentru 999 RON)
   - `STRIPE_PRICE_PREMIUM` = price_... (pentru 1.899 RON)

### 4. Obține cheia secretă Stripe

1. Intră pe https://dashboard.stripe.com/apikeys
2. Copiază **Secret key** (începe cu `sk_test_` pentru test sau `sk_live_` pentru producție)
3. Adaugă în fișierul `.env` la `STRIPE_SECRET_KEY`

### 5. Pornește serverul

Pentru development (cu auto-reload):
```bash
npm run dev
```

Pentru producție:
```bash
npm start
```

Serverul va rula pe http://localhost:3001

## 📋 API Endpoints

### POST /api/create-checkout-session
Creează o sesiune de checkout Stripe.

**Request body:**
```json
{
  "planId": "standard" | "premium",
  "phoneNumber": "07xxxxxxxx",
  "planName": "Asistență Credit Standard",
  "customerName": "Ion Popescu"
}
```

**Response:**
```json
{
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/..."
}
```

### GET /api/session/:sessionId
Obține detaliile unei sesiuni de plată.

### POST /api/webhook
Webhook pentru evenimente Stripe (plată reușită, etc.)

### GET /api/health
Health check - verifică dacă serverul funcționează.

## 🔐 Securitate

- Cheia secretă Stripe (`STRIPE_SECRET_KEY`) trebuie să rămână **DOAR pe server**
- Niciodată nu expune această cheie în frontend sau în codul public
- Folosește întotdeauna HTTPS în producție

## 📱 Unde vezi datele clientului în Stripe Dashboard

După o plată reușită:

1. Intră pe https://dashboard.stripe.com/payments
2. Click pe plată
3. Vei vedea în secțiunea **"Customer"** numele și numărul de telefon
4. Sau în secțiunea **"Metadata"** câmpurile:
   - `nume` - Numele clientului
   - `telefon` - Numărul de telefon
   - `produs` - Produsul achiziționat

## 🔔 Webhooks (Opțional)

Pentru a primi notificări automate când cineva plătește:

1. Intră pe https://dashboard.stripe.com/webhooks
2. Adaugă endpoint-ul: `https://domeniul-tau.ro/api/webhook`
3. Selectează evenimentele: `checkout.session.completed`
4. Copiază **Signing secret** în `.env` la `STRIPE_WEBHOOK_SECRET`

## 🐛 Troubleshooting

### "Price ID not found"
Verifică că ai copiat corect Price ID-ul din Stripe Dashboard (nu Product ID).

### "Invalid API Key"
Verifică că ai setat corect `STRIPE_SECRET_KEY` în fișierul `.env`.

### Serverul nu pornește
Verifică că portul 3001 nu este ocupat de altă aplicație.

## 💰 Trecerea în producție

1. Creează cont Stripe live: https://dashboard.stripe.com
2. Copiază cheia secretă live (`sk_live_...`)
3. Creează produsele în modul live și copiază price IDs
4. Actualizează `.env` cu valorile live
5. Asigură-te că folosești HTTPS pentru backend și frontend
