# Vercel Deployment Guide

## Environment Variables Required

Add these environment variables in your Vercel project settings (`Settings > Environment Variables`):

### Required Variables

```bash
# App Configuration
NEXT_PUBLIC_APP_URL=https://your-app-url.vercel.app

# Privy Wallet Integration
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id

# Blockchain Configuration
NEXT_PUBLIC_CHAIN_ID=50312

# Agents API URL (Backend)
NEXT_PUBLIC_AGENTS_API_URL=https://your-agents-api-url.com
```

## How to Set Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to `Settings > Environment Variables`
3. Add each variable:
    - **Key**: Variable name (e.g., `NEXT_PUBLIC_APP_URL`)
    - **Value**: Your actual value
    - **Environment**: Select `Production`, `Preview`, and `Development` as needed

## Important Notes

### NEXT_PUBLIC_AGENTS_API_URL

This should point to your deployed agents backend (Hono/Bun server). Options:

-   Deploy agents backend separately (e.g., Railway, Fly.io, Render)
-   Use a tunnel service during development (ngrok, Cloudflare Tunnel)
-   Self-host on a VPS

### NEXT_PUBLIC_PRIVY_APP_ID

Get this from your [Privy Dashboard](https://dashboard.privy.io/):

1. Create a Privy app
2. Copy the App ID
3. Configure allowed domains in Privy (add your Vercel domain)

### NEXT_PUBLIC_APP_URL

This is your actual Vercel deployment URL:

-   Production: `https://your-app.vercel.app`
-   Or your custom domain if configured

## Deployment Checklist

-   [x] Fixed duplicate POST function exports
-   [x] Replaced all hardcoded `localhost:8000` with environment variables
-   [x] Standardized all API routes to use `env` from `@/env`
-   [x] Improved error handling in all routes
-   [ ] Set environment variables in Vercel dashboard
-   [ ] Deploy agents backend and get URL
-   [ ] Configure Privy app with Vercel domain
-   [ ] Test deployment

## Troubleshooting

### Build Error: "the name POST is defined multiple times"

✅ **FIXED** - Removed duplicate POST functions in route handlers

### Runtime Error: Failed to fetch agents API

❌ Make sure `NEXT_PUBLIC_AGENTS_API_URL` is set correctly in Vercel

### Wallet connection issues

❌ Verify `NEXT_PUBLIC_PRIVY_APP_ID` and add Vercel domain to Privy allowed domains

## After Deployment

Test these endpoints to verify everything works:

-   `GET /api/agents/status` - Agent status
-   `POST /api/agents/start` - Start agents
-   `POST /api/agents/stop` - Stop agents
-   `GET /api/positions` - Fetch positions
-   `GET /api/thoughts` - Fetch agent thoughts
