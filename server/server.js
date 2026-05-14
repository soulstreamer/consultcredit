import express from 'express'
import Stripe from 'stripe'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
dotenv.config()

const app = express()
const port = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_your_key_here', {
  apiVersion: '2023-10-16',
})

// Price IDs for your products (you need to create these in Stripe Dashboard)
const PRICE_IDS = {
  standard: process.env.STRIPE_PRICE_STANDARD || 'price_standard_placeholder',
  premium: process.env.STRIPE_PRICE_PREMIUM || 'price_premium_placeholder',
}

// Create checkout session endpoint
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { planId, phoneNumber, planName, customerName } = req.body

    // Validate inputs
    if (!customerName || customerName.trim().length < 2) {
      return res.status(400).json({ 
        error: 'Numele este obligatoriu (minimum 2 caractere).' 
      })
    }

    if (!phoneNumber || phoneNumber.length !== 10) {
      return res.status(400).json({ 
        error: 'Număr de telefon invalid. Este necesar un număr din 10 cifre.' 
      })
    }

    // Get the correct price ID
    const priceId = PRICE_IDS[planId]
    if (!priceId || priceId.includes('placeholder')) {
      return res.status(400).json({ 
        error: 'Produsul nu este configurat corect. Contactați administratorul.' 
      })
    }

    // Create a customer with name and phone number
    const customer = await stripe.customers.create({
      name: customerName.trim(),
      phone: phoneNumber,
      metadata: {
        nume: customerName.trim(),
        produs: planName,
        plan_id: planId,
        telefon: phoneNumber,
      },
    })

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/cancel`,
      metadata: {
        nume: customerName.trim(),
        telefon: phoneNumber,
        produs: planName,
        plan_id: planId,
        customer_id: customer.id,
      },
      // Add phone to custom fields for additional visibility
      custom_fields: [
        {
          key: 'telefon_confirmat',
          label: {
            type: 'custom',
            custom: 'Număr de telefon',
          },
          type: 'text',
          text: {
            default_value: phoneNumber,
          },
        },
      ],
    })

    res.json({ 
      sessionId: session.id,
      url: session.url 
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    res.status(500).json({ 
      error: 'A apărut o eroare la crearea sesiunii de plată.' 
    })
  }
})

// Webhook endpoint for Stripe events (optional but recommended)
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object
      console.log('Payment successful!')
      console.log('Session:', session)
      console.log('Customer name:', session.metadata?.nume)
      console.log('Customer phone:', session.metadata?.telefon)
      console.log('Product:', session.metadata?.produs)
      
      // Here you can:
      // - Send notification to your admin
      // - Save to database
      // - Send confirmation SMS to customer
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  res.json({ received: true })
})

// Test endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// Get session details (for success page)
app.get('/api/session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer'],
    })
    res.json(session)
  } catch (error) {
    console.error('Error retrieving session:', error)
    res.status(500).json({ error: 'Error retrieving session' })
  }
})

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`)
  console.log(`📞 Stripe Checkout API ready`)
  console.log(`⚠️  Don't forget to:`)
  console.log(`   1. Create products in Stripe Dashboard`)
  console.log(`   2. Add STRIPE_SECRET_KEY to .env file`)
  console.log(`   3. Add price IDs to .env file`)
})
