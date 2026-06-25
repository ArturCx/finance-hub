<div align="center">
  <img src="./public/logo.svg" alt="Finance Hub logo" width="320" />

  <h1>Finance Hub</h1>

  <p><strong>A modern personal finance management dashboard.</strong><br/>
  Track expenses, income, investments and bills — with AI-driven insights and live crypto data.</p>

  <p>
    <strong>Live demo:</strong>
    <a href="https://www.fnchub.site/">fnchub.site</a>
    ·
    <a href="https://finance-hub-indol.vercel.app/login">finance-hub-indol.vercel.app</a>
  </p>

  <p>
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
    <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-Prisma-4169E1?logo=postgresql&logoColor=white" />
    <img alt="OpenAI" src="https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?logo=openai&logoColor=white" />
  </p>
</div>

---

## About

**Finance Hub** is a financial management dashboard where users can take full control of
their money in one place. It was built as my **TCC (Trabalho de Conclusão de Curso / Bachelor's
final project)**.

Users can log transactions, income, investment holdings and outstanding or paid bills, then
visualize everything through performance charts and metrics. On top of the raw data, the app
generates **AI-driven financial reports and insights** and tracks **cryptocurrency performance**
in real time.

## Features

- **Transaction tracking** — Record deposits, expenses and investments, each categorized
  (housing, food, transportation, health, education, etc.) with a payment method (credit/debit
  card, PIX, bank transfer, bank slip, cash…).
- **Bills management** — Keep track of outstanding, paid and expired bills with due dates,
  categories and payment methods.
- **Performance charts & metrics**
  - Top spending categories breakdown
  - Month-by-month comparison of expenses vs. income
  - Monthly performance summary cards (balance, invested, income, expenses)
- **Investment goals** — Set an investment target and follow your progress visually.
- **AI financial reports** — Generate personalized reports with insights and recommendations
  on how to improve your financial life, powered by OpenAI (GPT-4o-mini).
- **Crypto tracking** — Live cryptocurrency prices, market cap rankings, 24h variation and
  historical charts, fed daily from the CoinGecko API.
- **Authentication** — Secure sign-in and user management via Clerk.

## Tech Stack

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
| **External data** | [CoinGecko API](https://www.coingecko.com/en/api) |
| **Deployment** | [Vercel](https://vercel.com) (with scheduled Cron Jobs) |

## Architecture

Finance Hub is a **full-stack Next.js application** — there is no separate backend service.
The App Router handles both the UI and the server-side logic in a single codebase, deployed
together on Vercel.

```
Browser (React components)
        │
Next.js server  ──  Server Actions + Route Handlers   ← backend layer
        │
Prisma  ──  PostgreSQL          + external APIs (OpenAI, CoinGecko)
```

- **Server Actions** (`"use server"`) handle data mutations (upserting transactions/bills,
  generating AI reports) directly from the server without a separate API layer.
- **Route Handlers** (`app/api/*`) expose HTTP endpoints, including the scheduled cron job.
- **Prisma** is the ORM, modeling `Transaction`, `Bills`, `Cryptos` and `CryptoCharts`
  against a **PostgreSQL** database.
- **Vercel Cron Jobs** refresh cryptocurrency market data and charts daily via `/api/cron`.

---

<div align="center">
  Made with ☕ by <strong>ArturCx</strong>
</div>
