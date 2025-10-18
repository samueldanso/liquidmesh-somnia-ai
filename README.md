# 🧩 LiquidMesh — Coordinated Liquidity Manager (CLM)

**The AI orchestration layer for concentrated liquidity on Somnia.**

-   **Video Demo**: [Watch Demo]()
-   **Pitch Deck**: [View Presentation]()

LiquidMesh is a **decentralized, non-custodial autonomous liquidity protocol** built on Somnia powered by a multi-agent orchestration framework. It enables liquidity providers (LPs) to achieve maximum capital efficiency and superior risk-adjusted yield by autonomously reasoning, executing, and managing liquidity positions across Somnia DEXes and beyond.

It coordinates specialized AI agents — the **Watcher**, **Strategist**, and **Executor** — to continuously monitor pool metrics, reason about market changes, and autonomously execute liquidity strategies.

### 🌊 Core Idea

> Turn DeFi liquidity management from manual labor into coordinated AI reasoning.

## 🚀 Key Features

-   **Autonomous Management** - Fully automated liquidity optimization for maximum capital efficiency
-   **Multi-Agent Framework** - Specialized AI agents (Watcher, Strategist, Executor) with modular architecture
-   **Superior Yield** - Constantly optimizes range positions for better returns
-   **Self-Custodial** - Fully on-chain and non-custodial
-   **Simplified UX** - Abstracts complex DeFi interactions
-   **Somnia Native** - Optimized for low-latency execution on Somnia ecosystem

## 🔄 How It Works — Workflow

### Agent Roles and Functions:

-   **Watcher Agent** — Fetches and tracks pool metrics (price, volume, volatility, range status). Sends structured data to Strategist.
-   **Strategist Agent** — Decides optimal liquidity range and rebalance strategy; explains reasoning. Sends strategy intent to Executor.
-   **Executor Agent** — Prepares and/or signs transaction payload for optimal strategy execution. Returns result/status.
-   **AgentMesh Orchestrator** — Routes messages, manages state, and handles execution logic/retries. Logs decisions and outcomes.

### Agent Workflow

```mermaid
flowchart TD
    A[User Connects Wallet] --> B[Select/Deposit Tokens]
    B --> C[AgentMesh Initializes]
    C --> D[Watcher Monitors Pool]
    D --> E{Market Conditions?}
    E -->|Stable| F[Continue Monitoring]
    E -->|Volatile| G[Strategist Analyzes]
    G --> H[Generate Strategy]
    H --> I[Executor Prepares TX]
    I --> J[Execute on Somnia]
    J --> K[Update Dashboard]
    K --> L[Log Results]
    L --> D
    F --> D
```

### User Flow:

1. **Connect wallet** and deposit tokens
2. **Agents initialize** and start monitoring
3. **Strategist analyzes** market conditions and proposes optimal ranges
4. **Executor executes** transactions automatically
5. **Dashboard shows** real-time performance and agent reasoning
6. **Continuous optimization** based on market changes

## 🏗️ Technical Architecture

### System Overview

```mermaid
graph TB
    subgraph "Frontend Layer"
        UI[Next.js Dashboard]
        Wallet[Wallet Connect]
    end

    subgraph "AgentMesh Orchestrator"
        Router[Message Router]
        State[State Manager]
        Retry[Retry Logic]
    end

    subgraph "AI Agents"
        Watcher[Watcher Agent]
        Strategist[Strategist Agent]
        Executor[Executor Agent]
    end

    subgraph "Data Layer"
        RPC[Somnia RPC]
        Subgraph[Subgraph API]
        Mock[Mock Data]
    end

    subgraph "Blockchain"
        Contract[Smart Contract]
        Somnia[Somnia Network]
    end

    UI --> Router
    Wallet --> Router
    Router --> Watcher
    Router --> Strategist
    Router --> Executor
    Watcher --> RPC
    Watcher --> Subgraph
    Watcher --> Mock
    Strategist --> State
    Executor --> Contract
    Contract --> Somnia
```

### Architecture Flow

```mermaid
sequenceDiagram
    participant U as User
    participant UI as Frontend
    participant O as Orchestrator
    participant W as Watcher
    participant S as Strategist
    participant E as Executor
    participant C as Contract

    U->>UI: Connect Wallet
    UI->>O: Initialize Agents
    O->>W: Start Monitoring
    W->>O: Pool Metrics
    O->>S: Market Data
    S->>O: Strategy Decision
    O->>E: Execute Strategy
    E->>C: Transaction
    C->>E: Result
    E->>O: Status Update
    O->>UI: Dashboard Update
```

### ⚙️ Tech Stack

-   **Frontend:** [Next.js 15](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), [Shadcn UI](https://ui.shadcn.com/),
-   **Backend:** [Node.js](https://nodejs.org/) with [Bun](https://bun.sh/), [Hono](https://hono.dev/), [Supabase](https://supabase.com/)
-   **AI/Agent:** [Vercel AI SDK](https://www.vercel.com/ai-sdk)
-   **LLM:** [OpenAI](https://openai.com/)
-   **Smart Contracts:** [Solidity](https://docs.soliditylang.org/) & [Hardhat](https://hardhat.org/docs/getting-started)
-   **Blockchain:** [Somnia Testnet](https://docs.somnia.network/)
-   **Web3 Integration:** [wagmi](https://wagmi.sh) & [viem](https://viem.sh)
-   **Connect Wallet:** [Privy](https://docs.privy.io/)

## 🚀 Getting Started

1. Clone the repository

    ```bash
    git clone https://github.com/samueldanso/liquidmesh-somnia-ai
    cd liquidmesh-somnia-ai
    ```

2. Install dependencies

    ```bash
    bun install
    ```

3. Copy the `.env.example` to `.env` and update the variables.

    ```bash
    cp .env.example .env
    ```

4. Start the development server

    ```bash
    bun dev
    ```

## 🚀 Deploy

Follow the deployment guides for [Vercel](https://nextjs.org/learn-pages-router/basics/deploying-nextjs-app/deploy).

## 📋 Roadmap

1. Build minimal AgentMesh core
2. Implement Watcher, Strategist, and Executor
3. Integrate Somnia pool data and simulation engine
4. Deliver demo dashboard + orchestrated CLM pipeline
5. Submit for Somnia AI Hackathon

## 🏆 Built at Somnia AI Hackathon 2025

**Team**

-   **Samuel Danso - Full Stack Product & Engineering** – `me.samueldanso@gmail.com`

## 🔗 Links

-   **Live Demo**: [LiquidMesh](https://liquidmesh-somnia-ai.vercel.app)
