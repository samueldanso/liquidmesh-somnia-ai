# Frontend-Agents Integration

## ✅ What Was Done

### 1. Environment Configuration

-   Added `NEXT_PUBLIC_AGENTS_API_URL` to `env.ts`
-   Defaults to `http://localhost:8000` (agents API)

### 2. TypeScript Types (`lib/types.ts`)

-   `PoolMetrics` - Pool data from agents
-   `LiquidityPosition` - Position data
-   `AgentThought` - Agent activity logs
-   `AgentStatus` - Agent states

### 3. Next.js API Routes (`app/api/`)

-   `GET /api/thoughts` - Proxy to agents API for all thoughts
-   `GET /api/thoughts/[agent]` - Proxy for agent-specific thoughts
-   `GET /api/positions` - Proxy for liquidity positions
-   `GET /api/positions/pools` - Proxy for pool metrics

**Benefits:**

-   🔒 Hides backend URL from client
-   🛡️ Server-side error handling
-   🌐 Production-ready
-   🚀 No CORS issues

### 4. API Hooks (`hooks/use-agent-data.ts`)

-   `useAgentThoughts(agent?)` - Fetches agent activity via API routes (polls every 5s)
-   `useLiquidityPositions()` - Fetches positions via API routes (polls every 10s)
-   `usePoolMetrics()` - Fetches pool data via API routes (polls every 15s)
-   `useDashboardStats()` - Calculates TVL, APY, active positions

### 5. Dashboard Components (`app/dashboard/_components/`)

-   `stats-cards.tsx` - TVL, Positions, APY, Agent Status
-   `positions-table.tsx` - Liquidity positions table
-   `agent-activity.tsx` - Real-time agent activity feed

### 6. Updated Dashboard Page

-   Clean, minimal design (Tydro-inspired)
-   Real-time data from agents API
-   Auto-refreshing every 5-15 seconds

## 🚀 How to Run

### 1. Start Agents Backend

```bash
cd agents
bun run dev
# Runs on http://localhost:8000
```

### 2. Start Frontend

```bash
cd frontend

# Add to .env.local:
NEXT_PUBLIC_AGENTS_API_URL=http://localhost:8000

bun run dev
# Runs on http://localhost:3000
```

### 3. View Dashboard

Navigate to `http://localhost:3000/dashboard`

## 📊 What You'll See

-   **Real-time stats:** TVL, positions, APY from mock data
-   **Live agent activity:** Watcher, Strategist, Executor thoughts
-   **Position tracking:** In-range/out-of-range status
-   **Auto-refreshing:** Data updates every 5-15 seconds

## 🎯 API Architecture

### Next.js API Routes (Frontend)

-   `GET /api/thoughts` - All agent thoughts
-   `GET /api/thoughts/[agent]` - Specific agent thoughts
-   `GET /api/positions` - Liquidity positions
-   `GET /api/positions/pools` - Pool metrics

### Agents Backend (localhost:8000)

-   `GET /thoughts` - All agent thoughts (proxied)
-   `GET /thoughts/:agent` - Specific agent thoughts (proxied)
-   `GET /positions` - Liquidity positions (proxied)
-   `GET /positions/pools` - Pool metrics (proxied)

**Flow:** Client → Next.js API Routes → Agents API → Response

## 📝 Notes

-   Components are co-located in `_components` (follows Next.js conventions)
-   Uses TanStack Query for data fetching (as per cursor rules)
-   Follows existing patterns from agentathon-app reference
-   Clean, modern UI inspired by Tydro
-   No wallet connection required for viewing (read-only dashboard)

## 🔄 Next Steps

1. Test with live agents running
2. Add error boundaries for failed API calls
3. Add loading skeletons
4. Add refresh button
5. Optionally add real Somnia data integration
