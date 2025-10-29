# 🧪 LiquidMesh End-to-End Testing Guide

**Complete testing guide for LiquidMesh CLM system - Multi-agent DeFi protocol on Somnia**

---

## 📋 **System Overview**

LiquidMesh is a complete end-to-end DeFi system with:

-   **Frontend**: Next.js dashboard with wallet integration
-   **Backend**: Multi-agent orchestration system (Watcher, Strategist, Executor)
-   **Smart Contracts**: 4 deployed and verified contracts on Somnia Testnet
-   **Real Data**: DefiLlama API + Somnia RPC integration

---

## 🚀 **Prerequisites**

### **Required Setup**

1. **Somnia Testnet STT** - Get from [faucet](https://testnet.somnia.network)
2. **Wallet** - MetaMask or compatible wallet
3. **Environment Variables** - Configured for agents backend
4. **Running Services** - Agents backend + Frontend

### **Contract Addresses** (Verified on Shannon Explorer)

```
WrappedSTT:     0x9e1B4FbB45F30b0628e4C406A6F4Eec1fadb54E1
MockUSDC:       0x758dA18F8424f637f788a0CD0DAF8407069D380b
LiquidityVault: 0x28205BB97e1BEe146E0b095D3cf62433D9bAb47d
AgentExecutor:  0x5e639e2F345577514aFA0159AEdDf0A832e4139f
```

---

## 🎯 **Complete User Flow Testing**

### **Phase 1: System Startup**

#### **1.1 Start Backend Services**

```bash
# Terminal 1: Start Agents Backend
cd agents
bun run --bun src/index.ts

# Expected Output:
# ╔════════════════════════════════════╗
# ║        LIQUIDMESH AGENTS           ║
# ╚════════════════════════════════════╝
# [🚀] Server starting on port 8000
# [📍] Wallet address: 0x...
# [⏸️] AUTO_START disabled - Agents idle
```

```bash
# Terminal 2: Start Frontend
cd frontend
bun run dev

# Expected Output:
# ▲ Next.js 15.5.0 (Turbopack)
# - Local: http://localhost:3000
# ✓ Ready in 2.8s
```

#### **1.2 Verify Services**

```bash
# Test Agents API
curl http://localhost:8000/agents/status

# Expected Response:
{
  "isRunning": false,
  "wallet": null,
  "cycleCount": 0,
  "checkIntervalHours": 2,
  "nextCheckIn": null,
  "status": "offline"
}
```

---

### **Phase 2: Frontend Navigation**

#### **2.1 Access Application**

1. **Open Browser**: Navigate to `http://localhost:3000`
2. **Verify Landing Page**: Should show LiquidMesh branding
3. **Check Navigation**: Dashboard and Liquidity links visible

#### **2.2 Dashboard Page**

1. **Navigate to Dashboard**: Click "Dashboard" in navigation
2. **Verify Components**:
    - ✅ Agent Control section
    - ✅ Stats Cards (may show loading initially)
    - ✅ Positions Table (empty initially)
    - ✅ Agent Activity Feed (empty initially)

---

### **Phase 3: Wallet Connection**

#### **3.1 Connect Wallet**

1. **Click "Connect Wallet"** button
2. **Select Wallet Provider** (MetaMask recommended)
3. **Approve Connection** in wallet popup
4. **Verify Connection**:
    - ✅ Wallet address displayed
    - ✅ "Connected" badge shown
    - ✅ Balance queries start loading

#### **3.2 Verify Wallet Integration**

1. **Check Balance Display**: Should show STT balance
2. **Switch to Somnia Testnet**: Ensure wallet is on Somnia Testnet (Chain ID: 50312)
3. **Get Test STT**: Use [faucet](https://testnet.somnia.network) if needed

---

### **Phase 4: Liquidity Management**

#### **4.1 Navigate to Liquidity Page**

1. **Click "Liquidity"** in navigation
2. **Verify Page Loads**: Should show "Liquidity Management" title
3. **Check Components**:
    - ✅ Wallet Balances (Native STT, wSTT, USDC)
    - ✅ Deposit Form (left side)
    - ✅ Withdraw Form (right side)

#### **4.2 Token Preparation**

**Step 1: Wrap STT to wSTT**

1. **Enter Amount**: Type "100" in wSTT amount field
2. **Click "Wrap"** button
3. **Approve Transaction** in wallet
4. **Verify Success**:
    - ✅ Transaction hash shown
    - ✅ CheckCircle icon appears
    - ✅ Toast notification: "STT wrapping initiated"

**Step 2: Mint Test USDC**

1. **Enter Amount**: Type "100" in USDC amount field
2. **Click "Mint"** button
3. **Approve Transaction** in wallet
4. **Verify Success**:
    - ✅ Transaction hash shown
    - ✅ CheckCircle icon appears
    - ✅ Toast notification: "USDC minting initiated"

#### **4.3 Deposit Liquidity**

**Step 3: Deposit to Vault**

1. **Verify Amounts**: Both wSTT and USDC amounts should be filled
2. **Click "Deposit Liquidity"** button
3. **Approve Transaction** in wallet
4. **Verify Success**:
    - ✅ Transaction hash shown
    - ✅ CheckCircle icon appears
    - ✅ Toast notification: "Deposit successful! Your liquidity is now being managed by AI agents"
    - ✅ Balance updates in stats section

---

### **Phase 5: Agent Activation**

#### **5.1 Start Agent Monitoring**

1. **Return to Dashboard**: Click "Dashboard" in navigation
2. **Agent Control Section**: Should show "Start Monitoring" button
3. **Click "Start Monitoring"**:
    - ✅ Button changes to "Stop Monitoring"
    - ✅ Status shows "online"
    - ✅ Cycle count starts incrementing
    - ✅ Toast notification: "Agents started successfully"

#### **5.2 Verify Agent Activity**

1. **Check Agent Activity Feed**: Should show agent thoughts
2. **Monitor Console**: Backend terminal should show agent logs
3. **Expected Agent Flow**:
    ```
    [AgentManager] 🚀 Starting autonomous monitoring
    [AgentManager] 🔄 Running cycle #1
    [Watcher] Monitoring wallet: 0x...
    [Watcher] Fetching pool metrics from DefiLlama...
    [Strategist] Analyzing market conditions...
    [Executor] Preparing strategy execution...
    ```

---

### **Phase 6: Real Data Integration**

#### **6.1 Verify Real Data**

1. **Check Pool Metrics**: Should show real Somnia DEX data
2. **Verify Sources**:
    - ✅ DefiLlama API integration
    - ✅ Somnia RPC wallet balances
    - ✅ No mock data in logs

#### **6.2 Monitor Agent Decisions**

1. **Watch Agent Thoughts**: Real-time AI reasoning
2. **Check Strategy Proposals**: Agents should propose range adjustments
3. **Verify Contract Interactions**: Agents interact with deployed contracts

---

### **Phase 7: Withdraw Functionality**

#### **7.1 Test Withdraw**

1. **Return to Liquidity Page**: Click "Liquidity" in navigation
2. **Withdraw Form**: Should show current position
3. **Enter LP Amount**: Type amount to withdraw
4. **Click "Withdraw Liquidity"**:
    - ✅ Transaction hash shown
    - ✅ Tokens returned to wallet
    - ✅ Position updated

---

### **Phase 8: Agent Control**

#### **8.1 Stop Agents**

1. **Return to Dashboard**: Click "Dashboard"
2. **Click "Stop Monitoring"**:
    - ✅ Button changes to "Start Monitoring"
    - ✅ Status shows "offline"
    - ✅ Agents go idle (no OpenAI costs)

#### **8.2 Restart Agents**

1. **Click "Start Monitoring"** again
2. **Verify Restart**: Agents resume monitoring
3. **Check Status**: Should show cycle count incrementing

---

## 🔍 **Detailed Testing Checklist**

### **Frontend Components**

-   [ ] **Landing Page**: Loads correctly
-   [ ] **Navigation**: All links work
-   [ ] **Wallet Connection**: Privy integration works
-   [ ] **Dashboard**: All components render
-   [ ] **Liquidity Page**: Deposit/withdraw forms work
-   [ ] **Error Boundaries**: Graceful error handling
-   [ ] **Loading States**: Skeletons show during loading
-   [ ] **Toast Notifications**: User feedback works

### **Backend API**

-   [ ] **Agent Status**: `/agents/status` returns correct data
-   [ ] **Agent Control**: Start/stop endpoints work
-   [ ] **Thoughts API**: `/thoughts` returns agent data
-   [ ] **Positions API**: `/positions` returns position data
-   [ ] **Pool Metrics**: Real DefiLlama data
-   [ ] **CORS**: Frontend can access backend

### **Smart Contracts**

-   [ ] **WrappedSTT**: Deposit/withdraw functions work
-   [ ] **MockUSDC**: Mint function works
-   [ ] **LiquidityVault**: Deposit/withdraw pair functions work
-   [ ] **AgentExecutor**: Proposal system works
-   [ ] **Contract Verification**: All contracts verified on Shannon Explorer

### **Agent System**

-   [ ] **Watcher Agent**: Monitors pools and generates reports
-   [ ] **Strategist Agent**: Analyzes reports and creates strategies
-   [ ] **Executor Agent**: Executes strategies on-chain
-   [ ] **Agent Manager**: Controls agent lifecycle
-   [ ] **Real Data**: No mock data usage
-   [ ] **Contract Integration**: Agents interact with deployed contracts

---

## 🚨 **Troubleshooting**

### **Common Issues**

#### **"Failed to connect to localhost:8000"**

-   **Solution**: Ensure agents backend is running
-   **Check**: `curl http://localhost:8000/agents/status`

#### **"Insufficient funds for gas"**

-   **Solution**: Get more STT from [faucet](https://testnet.somnia.network)
-   **Check**: Wallet balance in dashboard

#### **"Transaction reverted"**

-   **Solution**: Check token approvals and minimum amounts
-   **Check**: Contract requirements (min 10 USDC deposit)

#### **"Agents not starting"**

-   **Solution**: Check environment variables and OpenAI API key
-   **Check**: Backend logs for error messages

#### **"No agent activity"**

-   **Solution**: Ensure wallet has deposited liquidity
-   **Check**: Agents only activate for users with positions

---

## 📊 **Expected Performance**

### **Transaction Times**

-   **Wrap STT**: ~5-10 seconds
-   **Mint USDC**: ~5-10 seconds
-   **Deposit Pair**: ~10-15 seconds
-   **Withdraw**: ~10-15 seconds

### **Agent Response**

-   **First Cycle**: ~30-60 seconds
-   **Subsequent Cycles**: Every 2 hours (configurable)
-   **Real-time Updates**: Dashboard updates every 5 seconds

### **Data Sources**

-   **DefiLlama**: Real Somnia mainnet data
-   **Somnia RPC**: Real testnet balances
-   **Contract Events**: Real on-chain data

---

## 🎯 **Success Criteria**

### **Complete User Journey**

1. ✅ **Connect wallet** to Somnia Testnet
2. ✅ **Prepare tokens** (wrap STT, mint USDC)
3. ✅ **Deposit liquidity** to vault
4. ✅ **Start agent monitoring** for autonomous management
5. ✅ **Monitor agent activity** and real-time decisions
6. ✅ **Withdraw liquidity** when needed
7. ✅ **Control agent lifecycle** (start/stop)

### **Technical Validation**

-   ✅ **Real blockchain transactions** on Somnia Testnet
-   ✅ **Verified smart contracts** on Shannon Explorer
-   ✅ **Multi-agent coordination** with AI reasoning
-   ✅ **Real data integration** (DefiLlama + Somnia RPC)
-   ✅ **Production-ready UI** with error handling
-   ✅ **Complete documentation** and testing guide

---

## 🏆 **Demo Ready**

This testing guide validates a **complete end-to-end DeFi system**:

-   **Multi-agent AI orchestration** ✅
-   **Real blockchain integration** ✅
-   **Production-quality UI/UX** ✅
-   **Comprehensive testing** ✅
-   **Hackathon-winning potential** ✅

**Ready for demo video and pitch!** 🎬

---

**Built for Somnia AI Hackathon 2025** 🚀
