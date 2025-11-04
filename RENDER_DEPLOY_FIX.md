# Render Deployment Fix

## Problem Diagnosed

The errors you're seeing are because:

1. **Build command is wrong**: Render is running `bun` instead of `bun install`
2. **Root directory not set**: Render is looking in the root, but `package.json` is in `agents/` subdirectory
3. **Dependencies not installed**: Because of #1, `zod` and `@scure/bip32` (transitive dep of viem) aren't being installed

## Solution

### Option 1: Use render.yaml (Recommended)

I've created a `render.yaml` file in the root. Render will automatically detect it.

**Steps:**

1. Commit and push the `render.yaml` file to your repo
2. In Render dashboard, when creating/editing the service:
    - It should auto-detect the `render.yaml`
    - If not, go to Settings → and make sure it's using the yaml file
3. Add all environment variables in the Render dashboard

### Option 2: Manual Configuration

If you prefer to configure manually in Render dashboard:

1. **Root Directory**: Set to `agents`
2. **Build Command**: Change from `bun` to `bun install`
3. **Start Command**: Set to `bun start` (or `bun run src/index.ts`)
4. **Runtime**: Make sure it's set to `Bun`

### Required Environment Variables

Add these in Render dashboard → Environment:

```
OPENAI_API_KEY=sk-...
SUPABASE_URL=https://...
SUPABASE_KEY=...
PRIVATE_KEY=0x...
```

Optional (with defaults):

```
PORT=8000
SOMNIA_RPC_URL=https://dream-rpc.somnia.network
CHAIN_ID=50312
CHAIN_NAME=somnia-testnet
MODEL_NAME=gpt-4o
AUTO_START=false
CHECK_INTERVAL_HOURS=2
STRATEGY_AUTOMATION_ENABLED=false
STRATEGY_INTERVAL_MINUTES=2
STRATEGY_COOLDOWN_MINUTES=10
```

## Quick Fix Steps

1. Go to your Render service settings
2. Change **Build Command** from `bun` to `bun install`
3. Set **Root Directory** to `agents`
4. Set **Start Command** to `bun start`
5. Save and redeploy

This should fix both the `zod` and `@scure/bip32` errors since dependencies will actually be installed.
