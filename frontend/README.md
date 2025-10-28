# LiquidMesh Web

Somnia Testnet UI for the LiquidMesh Coordinated Liquidity Manager (CLM).

## ✨ Features

-   Next.js 15 (App Router) + React 19
-   Wagmi v2 + Privy wallet connect for Somnia
-   TanStack Query for data fetching
-   Tailwind CSS + shadcn/ui
-   Error boundaries and loading states

## 🚀 Quick Start

```bash
bun install
bun dev
```

Open http://localhost:3000.

### Environment

Create `.env.local` in `frontend/`:

```bash
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
NEXT_PUBLIC_CHAIN_ID=50312
NEXT_PUBLIC_RPC_URL=https://dream-rpc.somnia.network
```

## 🧭 App Structure

-   `/deposit` – Wrap/Mint, Approve, Deposit, Enable Automation (stepper)
-   `/dashboard` – Agent activity feed with Shannon Explorer links
-   `/api/agents/*` – Proxies to agents backend (`http://localhost:8000`)

## 🔗 Useful Links

-   Shannon Explorer: https://shannon-explorer.somnia.network
-   Wagmi: https://wagmi.sh
-   Privy: https://docs.privy.io
-   shadcn/ui: https://ui.shadcn.com
