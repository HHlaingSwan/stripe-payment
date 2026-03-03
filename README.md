# Stripe Payment Integration Tutorial

A Next.js application demonstrating how to integrate Stripe Checkout with multiple pricing tiers. Built as a hands-on tutorial for learning Stripe's payment flow end-to-end.

## Features

- 💳 **Multiple Pricing Plans** — Starter ($9), Pro ($29), and Enterprise ($99) cards
- 🔒 **Stripe Checkout** — Secure, hosted payment page powered by Stripe
- ✅ **Success Page** — Post-payment confirmation page after checkout
- ⚡ **Next.js App Router** — Uses Server-side API Routes for secure Stripe interactions
- 🎨 **Modern UI** — Dark theme with Tailwind CSS v4

## How It Works

```
User clicks "Get Plan"
        ↓
POST /api/checkout  (sends plan name + price)
        ↓
Stripe creates a Checkout Session (server-side)
        ↓
App redirects user to Stripe's hosted Checkout page
        ↓
User completes payment on Stripe
        ↓
Stripe redirects back to /success
```

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Payments**: [Stripe](https://stripe.com/) — `stripe` (server SDK) + `@stripe/stripe-js` (client SDK)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: TypeScript

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/HHlaingSwan/stripe-payment.git
cd stripe-payment
npm install
```

### 2. Set Up Stripe API Keys

Create a `.env.local` file in the root of the project:

```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

> Get your API keys from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys). Use **test mode** keys for development.

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── page.tsx              # Pricing page with 3 plan cards
│   ├── success/
│   │   └── page.tsx          # Payment success confirmation page
│   └── api/
│       └── checkout/
│           └── route.ts      # API route — creates Stripe Checkout Session
├── .env.local                # Stripe API keys (not committed to git)
└── ...
```

## Testing Payments

Use Stripe's test card numbers to simulate payments without real money:

| Card Number           | Scenario           |
| --------------------- | ------------------ |
| `4242 4242 4242 4242` | Payment succeeds   |
| `4000 0000 0000 9995` | Payment declined   |
| `4000 0025 0000 3155` | Requires 3D Secure |

Use any future expiry date, any 3-digit CVC, and any zip code.

## Key Concepts Covered

- **Server-side session creation** — Stripe sessions are created in an API route to keep your secret key safe
- **Session URL redirect** — Modern Stripe redirect approach using `session.url` instead of the deprecated `redirectToCheckout`
- **Dynamic pricing** — A single API route handles multiple price points by accepting `name` and `amount` in the request body
- **Success & cancel URLs** — Stripe redirects back to your app after payment completes or is cancelled
