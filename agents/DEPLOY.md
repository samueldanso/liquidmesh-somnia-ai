# Deploying to Render

## Configuration Steps

### 1. Service Configuration in Render Dashboard

When setting up your web service in Render, configure:

-   **Name**: `liquidmesh-agents`
-   **Runtime**: `Bun`
-   **Root Directory**: `agents`
-   **Build Command**: `bun install`
-   **Start Command**: `bun start`

### 2. Environment Variables

Set these in the Render dashboard under Environment:

**Required:**

-   `OPENAI_API_KEY` - Your OpenAI API key
-   `SUPABASE_URL` - Your Supabase project URL
-   `SUPABASE_KEY` - Your Supabase anon/service key
-   `PRIVATE_KEY` - Wallet private key (0x...)

**Optional:**

-   `PORT` - Server port (default: 8000)
-   `AGENT_PRIVATE_KEY` - Agent wallet for contract interactions (optional)
-   `SOMNIA_RPC_URL` - Somnia RPC endpoint (default: https://dream-rpc.somnia.network)
-   `CHAIN_ID` - Chain ID (default: 50312)
-   `CHAIN_NAME` - Chain name (default: somnia-testnet)
-   `MODEL_NAME` - OpenAI model (default: gpt-4o)
-   `AUTO_START` - Auto-start agents on deploy (default: false)
-   `CHECK_INTERVAL_HOURS` - Check interval in hours (default: 2)
-   `STRATEGY_AUTOMATION_ENABLED` - Enable strategy automation (default: false)
-   `STRATEGY_INTERVAL_MINUTES` - Strategy check interval (default: 2)
-   `STRATEGY_COOLDOWN_MINUTES` - Strategy cooldown period (default: 10)

### 3. Using render.yaml (Alternative)

If you prefer using `render.yaml`, the file is already configured. You can:

1. Connect your GitHub repo to Render
2. Render will automatically detect `render.yaml` and use those settings
3. Still need to add environment variables in the dashboard

## Troubleshooting

### Error: "ENOENT while resolving package"

This usually means dependencies aren't installed. Make sure:

-   Root Directory is set to `agents`
-   Build Command is `bun install` (not just `bun`)
-   Start Command is `bun start`

### Error: "@scure/bip32" missing

This is a transitive dependency of `viem`. If it persists:

1. Ensure `bun install` runs successfully
2. Check that the `agents/package.json` has all dependencies listed
3. Try clearing Render's build cache and redeploying

### Port Configuration

Render automatically sets `PORT` environment variable. Our app reads it from `env.PORT`, so it should work automatically.

## Manual Deployment Steps

If `render.yaml` doesn't work, manually configure:

1. **New Web Service** in Render
2. **Connect** your GitHub repository
3. **Settings**:
    - Name: `liquidmesh-agents`
    - Region: Choose closest to your users
    - Branch: `main`
    - Root Directory: `agents`
    - Runtime: `Bun`
    - Build Command: `bun install`
    - Start Command: `bun start`
4. **Environment**: Add all required variables
5. **Deploy**
