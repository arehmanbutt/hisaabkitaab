# ہساب کتاب — HisaabKitaab

A mobile-first Urdu/English web app for Pakistani kiryana store and paan shop owners to track loans, suppliers, and stock.

## Features

- **ہساب (Loans)** — Track customer credit/loans with WhatsApp reminders and overdue highlighting
- **سپلائر (Suppliers)** — Save supplier contacts and order via Tajir
- **اسٹاک (Stock)** — Track inventory with low-stock alerts and quick +/− updates
- Full RTL Urdu layout with Noto Nastaliq Urdu font
- Language toggle (Urdu ↔ English)
- All data persisted in localStorage — no backend needed

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
```

Outputs a static export in the `out/` directory.

## Deploy to Vercel

1. Push this repo to GitHub
2. Import into [Vercel](https://vercel.com)
3. No configuration needed — Vercel detects Next.js automatically

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel --prod
```
