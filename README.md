<div align="center">
  <img src="./public/logo.svg" alt="Finance Hub logo" width="320" />

  <h1>Finance Hub</h1>

  <p><strong>A modern personal finance management dashboard.</strong><br/>
  Track expenses, income, investments and bills — with AI-driven insights and live crypto data.</p>

  <p>
    <a href="https://www.fnchub.site/"><strong>🌐 Live demo → fnchub.site</strong></a>
  </p>

  <p>
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
    <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-Prisma-4169E1?logo=postgresql&logoColor=white" />
    <img alt="OpenAI" src="https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?logo=openai&logoColor=white" />
  </p>
</div>

---

## 📖 About

**Finance Hub** is a financial management dashboard where users can take full control of
their money in one place. It was built as my **TCC (Trabalho de Conclusão de Curso / Bachelor's
final project)**.

Users can log transactions, income, investment holdings and outstanding or paid bills, then
visualize everything through performance charts and metrics. On top of the raw data, the app
generates **AI-driven financial reports and insights** and tracks **cryptocurrency performance**
in real time.

## ✨ Features

- **💸 Transaction tracking** — Record deposits, expenses and investments, each categorized
  (housing, food, transportation, health, education, etc.) with a payment method (credit/debit
  card, PIX, bank transfer, bank slip, cash…).
- **🧾 Bills management** — Keep track of outstanding, paid and expired bills with due dates,
  categories and payment methods.
- **📊 Performance charts & metrics**
  - Top spending categories breakdown
  - Month-by-month comparison of expenses vs. income
  - Monthly performance summary cards (balance, invested, income, expenses)
- **🎯 Investment goals** — Set an investment target and follow your progress visually.
- **🤖 AI financial reports** — Generate personalized reports with insights and recommendations
  on how to improve your financial life, powered by OpenAI (GPT-4o-mini).
- **🪙 Crypto tracking** — Live cryptocurrency prices, market cap rankings, 24h variation and
  historical charts, fed daily from the CoinGecko API.
- **🔐 Authentication** — Secure sign-in and user management via Clerk.
- **📬 Email notifications** — Automated emails delivered through Resend.
- **🌗 Light & dark mode** with a fully responsive UI.

## 🛠️ Tech Stack

| Layer | Technologies |
| --- | --- |
| **Framework** | [Next.js 14](https://nextjs.org) (App Router, Server Actions) · [React 18](https://react.dev) · [TypeScript](https://www.typescriptlang.org) |
| **Styling / UI** | [Tailwind CSS](https://tailwindcss.com) · [shadcn/ui](https://ui.shadcn.com) · [Radix UI](https://www.radix-ui.com) · [Lucide Icons](https://lucide.dev) |
| **Database / ORM** | [PostgreSQL](https://www.postgresql.org) · [Prisma](https://www.prisma.io) |
| **Authentication** | [Clerk](https://clerk.com) |
| **AI** | [OpenAI API](https://platform.openai.com) (GPT-4o-mini) |
| **Charts** | [ApexCharts](https://apexcharts.com) · [Recharts](https://recharts.org) |
| **Forms & validation** | [React Hook Form](https://react-hook-form.com) · [Zod](https://zod.dev) |
| **Tables** | [TanStack Table](https://tanstack.com/table) |
| **Email** | [Resend](https://resend.com) |
| **External data** | [CoinGecko API](https://www.coingecko.com/en/api) |
| **Deployment** | [Vercel](https://vercel.com) (with scheduled Cron Jobs) |

## 🏗️ Architecture Highlights

- **Server Actions** handle data mutations (upserting transactions/bills, generating AI reports)
  directly from the server without a separate API layer.
- **Prisma schema** models `Transaction`, `Bills`, `Cryptos` and `CryptoCharts` against a
  PostgreSQL database.
- **Vercel Cron Jobs** run scheduled tasks:
  - `/api/cron` — refreshes cryptocurrency market data and charts daily (23:00).
  - `/api/send` — dispatches scheduled email notifications daily (00:00).

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database
- API keys for Clerk, OpenAI, CoinGecko and Resend

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd finance-hub

# 2. Install dependencies
yarn install   # or npm install

# 3. Configure your environment variables
cp .env.example .env
# then fill in the values (see below)

# 4. Apply the database schema
npx prisma generate
npx prisma db push

# 5. Run the development server
yarn dev       # or npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment Variables

```env
# Database
DATABASE_URL=""

# Clerk (authentication)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""

# OpenAI (AI reports)
OPENAI_API_KEY=""

# CoinGecko (crypto data)
GECKO_API_KEY=""

# Resend (emails)
RESEND_API_KEY=""
```

> 💡 Optional: the scripts in `/scripts` (`importCoinsToDb.js`, `importCoinsChartToDb.js`)
> can be used to seed cryptocurrency data into the database.

## 📂 Project Structure

```
app/
├── (home)/          # Dashboard — charts, summary cards, AI report
├── transactions/    # Transactions CRUD + data table
├── bills/           # Bills CRUD + data table
├── crypto/          # Cryptocurrency tracking
├── login/           # Authentication page
├── api/             # Route handlers (cron, cryptos, charts, send)
├── _actions/        # Server actions
├── _components/     # Shared & UI components (shadcn/ui)
├── _data/           # Data-fetching layer (dashboard)
├── _constants/      # Shared constants
├── _lib/            # Prisma client & utils
└── _utils/          # Currency & date helpers
prisma/
└── schema.prisma    # Database models
```

## 📜 License

This project was developed for academic purposes as a Bachelor's final project (TCC).

---

<div align="center">
  Made with ☕ by <strong>Artur César</strong>
</div>
