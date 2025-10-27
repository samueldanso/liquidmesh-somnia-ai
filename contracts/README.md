# 🏗️ LiquidMesh Smart Contracts

**AI-Powered Concentrated Liquidity Management on Somnia**

Production-ready smart contracts for autonomous LP position optimization using multi-agent AI coordination.

---

## File Structure

add here
contracts/
├── README.md ⭐ COMPREHENSIVE GUIDE
├── contracts/
│ ├── AgentExecutor.sol
│ ├── LiquidityVault.sol
│ ├── MockUSDC.sol
│ └── WrappedSTT.sol
├── hardhat.config.ts
├── ignition/
│ └── modules/
│ └── LiquidMesh.ts
├── package.json
└── tsconfig.json

````

## 📦 **Contracts Overview**

| Contract             | Purpose
| -------------------- | ----------------------------------------
| `WrappedSTT.sol`     | Wrap native STT → wSTT for DEX pairs
| `MockUSDC.sol`       | Test USDC token (6 decimals)
| `LiquidityVault.sol` | Main vault for pair deposits & LP tokens
| `AgentExecutor.sol`  | AI agent proposal & execution syste

---

## 🎯 **What This Does**

### **Problem:**

Managing concentrated liquidity positions is complex and requires constant monitoring.

### **Solution:**

AI agents automatically optimize your wSTT/USDC liquidity positions:

1. **User deposits** wSTT + USDC → Receives LP tokens
2. **AI agents monitor** market conditions 24/7
3. **Agents propose** optimal range adjustments
4. **User executes** or agents auto-rebalance
5. **User earns** trading fees automatically
6. **User withdraws** anytime (burns LP tokens)


---

## ⚙️ **Tech Stack**

-   **Solidity:** 0.8.28
-   **Framework:** Hardhat 3
-   **Testing:** Node.js test runner + Foundry
-   **Deployment:** Hardhat Ignition
-   **Libraries:** OpenZeppelin Contracts
-   **Network:** Somnia Testnet (Chain ID: 50312)

---

## 🚀 **Quick Start**

### **Prerequisites**

-   Node.js 18+
-   Somnia testnet STT for gas ([Get from faucet](https://testnet.somnia.network))


### **1. Install Dependencies**

```bash
npm install
# or
bun install
````

### **2. Configure Environment**

Set your private key using Hardhat's secure keystore:

```bash
npx hardhat keystore set SOMNIA_PRIVATE_KEY
```

When prompted, enter your private key securely (input is hidden).

**Alternative:** Set as environment variable:

```bash
export SOMNIA_PRIVATE_KEY="your_private_key_here"
```

### **3. Compile Contracts**

```bash
npx hardhat compile
```

### **4. Deploy to Somnia Testnet**

```bash
npx hardhat ignition deploy --network somniaTestnet ignition/modules/LiquidMesh.ts
```

**Deployment Order:**

1. ✅ WrappedSTT
2. ✅ MockUSDC
3. ✅ LiquidityVault (with wSTT + USDC addresses)
4. ✅ AgentExecutor (with vault address)
5. ✅ Transfer vault ownership → AgentExecutor

**Save the deployed addresses!** You'll need them for integration.

---

## 📝 **Post-Deployment Setup**

### **1. Authorize Your Agent Wallet**

```bash
npx hardhat console --network somniaTestnet
```

```javascript
const executor = await ethers.getContractAt('AgentExecutor', '0xYourAgentExecutorAddress')

// Authorize your agent wallet to propose strategies
await executor.authorizeAgent('0xYourAgentWalletAddress')
```

### **2. Test Token Minting (Testnet)**

```javascript
// Mint test USDC
const usdc = await ethers.getContractAt('MockUSDC', '0xYourMockUSDCAddress')
await usdc.mint('0xYourAddress', 10000_000000) // 10,000 USDC

// Wrap STT → wSTT
const wstt = await ethers.getContractAt('WrappedSTT', '0xYourWrappedSTTAddress')
await wstt.deposit({ value: ethers.parseEther('10000') }) // Wrap 10,000 STT
```

### **3. Test Deposit**

```javascript
const vault = await ethers.getContractAt('LiquidityVault', '0xYourVaultAddress')

// Approve tokens
await wstt.approve(vault.address, ethers.parseEther('1000'))
await usdc.approve(vault.address, 1000_000000)

// Deposit pair
await vault.depositPair(
	ethers.parseEther('1000'), // 1000 wSTT
	1000_000000 // 1000 USDC
)
```

---

## 🔗 **Integration Guide** ( out th eintegrTIO GUIDE IN CONTRACTS.md file rather not in here jsudges and dev n=dont nned this)

### **For Frontend (Next.js)**

#### **1. Install Dependencies**

```bash
cd ../frontend
npm install viem wagmi @tanstack/react-query
```

#### **2. Add Contract Addresses**

Create `frontend/lib/contracts.ts`:

```typescript
export const CONTRACTS = {
	WRAPPED_STT: '0x...', // From deployment
	MOCK_USDC: '0x...', // From deployment
	LIQUIDITY_VAULT: '0x...', // From deployment
	AGENT_EXECUTOR: '0x...', // From deployment
} as const

export const SOMNIA_TESTNET = {
	id: 50312,
	name: 'Somnia Testnet',
	network: 'somnia-testnet',
	nativeCurrency: { name: 'STT', symbol: 'STT', decimals: 18 },
	rpcUrls: {
		default: { http: ['https://dream-rpc.somnia.network'] },
		public: { http: ['https://dream-rpc.somnia.network'] },
	},
	blockExplorers: {
		default: {
			name: 'Somnia Explorer',
			url: 'https://somnia-testnet.socialscan.io',
		},
	},
}
```

#### **3. Copy Contract ABIs**

```bash
# Copy compiled ABIs to frontend
cp artifacts/contracts/WrappedSTT.sol/WrappedSTT.json ../frontend/lib/abis/
cp artifacts/contracts/MockUSDC.sol/MockUSDC.json ../frontend/lib/abis/
cp artifacts/contracts/LiquidityVault.sol/LiquidityVault.json ../frontend/lib/abis/
cp artifacts/contracts/AgentExecutor.sol/AgentExecutor.json ../frontend/lib/abis/
```

#### **4. Create Deposit Component**

See `frontend/app/deposit/page.tsx` for full implementation.

Key functions:

-   Wrap STT → wSTT
-   Approve tokens
-   Deposit pair → Get LP tokens
-   Display position & fees

---

### **For Agents Backend (Bun + Hono)**

#### **1. Add Contract Configuration**

Create `agents/src/contracts/addresses.ts`:

```typescript
export const VAULT_ADDRESS = '0x...' // From deployment
export const EXECUTOR_ADDRESS = '0x...' // From deployment
export const WSTT_ADDRESS = '0x...' // From deployment
export const USDC_ADDRESS = '0x...' // From deployment
```

#### **2. Add Contract ABIs**

```bash
# Copy ABIs to agents
cp artifacts/contracts/LiquidityVault.sol/LiquidityVault.json ../agents/src/contracts/abis/
cp artifacts/contracts/AgentExecutor.sol/AgentExecutor.json ../agents/src/contracts/abis/
```

#### **3. Create Vault Client**

Create `agents/src/contracts/vault-client.ts`:

```typescript
import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { VAULT_ADDRESS, EXECUTOR_ADDRESS } from './addresses'
import VaultABI from './abis/LiquidityVault.json'
import ExecutorABI from './abis/AgentExecutor.json'

const somniaTestnet = {
	id: 50312,
	name: 'Somnia Testnet',
	rpcUrls: { default: { http: ['https://dream-rpc.somnia.network'] } },
	nativeCurrency: { name: 'STT', symbol: 'STT', decimals: 18 },
}

export const publicClient = createPublicClient({
	chain: somniaTestnet,
	transport: http(),
})

// Get all active users
export async function getActiveUsers() {
	return await publicClient.readContract({
		address: VAULT_ADDRESS,
		abi: VaultABI.abi,
		functionName: 'getActiveUsers',
	})
}

// Get user position
export async function getUserPosition(userAddress: string) {
	return await publicClient.readContract({
		address: VAULT_ADDRESS,
		abi: VaultABI.abi,
		functionName: 'getPosition',
		args: [userAddress],
	})
}

// Propose strategy (requires authorized agent)
export async function proposeStrategy(
	userAddress: string,
	rangeLower: number,
	rangeUpper: number,
	reasoning: string
) {
	const account = privateKeyToAccount(process.env.AGENT_PRIVATE_KEY as `0x${string}`)

	const walletClient = createWalletClient({
		account,
		chain: somniaTestnet,
		transport: http(),
	})

	const { request } = await publicClient.simulateContract({
		address: EXECUTOR_ADDRESS,
		abi: ExecutorABI.abi,
		functionName: 'proposeStrategy',
		args: [userAddress, rangeLower, rangeUpper, reasoning],
		account,
	})

	return await walletClient.writeContract(request)
}
```

#### **4. Listen for Deposit Events**

Create `agents/src/contracts/event-listener.ts`:

```typescript
import { publicClient } from './vault-client'
import { VAULT_ADDRESS } from './addresses'
import VaultABI from './abis/LiquidityVault.json'

export async function watchDepositEvents(onDeposit: (user: string, amount: bigint) => void) {
	publicClient.watchContractEvent({
		address: VAULT_ADDRESS,
		abi: VaultABI.abi,
		eventName: 'DepositPair',
		onLogs: (logs) => {
			for (const log of logs) {
				const { user, wsttAmount, usdcAmount } = log.args
				console.log(`[Deposit] User: ${user}, wSTT: ${wsttAmount}, USDC: ${usdcAmount}`)
				onDeposit(user, wsttAmount + usdcAmount)
			}
		},
	})
}
```

#### **5. Update Agent Manager**

Integrate with existing `agents/src/agents/agent-manager.ts`:

```typescript
import { getActiveUsers, getUserPosition, proposeStrategy } from './contracts/vault-client'
import { watchDepositEvents } from './contracts/event-listener'

// In runCycle()
const users = await getActiveUsers()
for (const user of users) {
	const position = await getUserPosition(user)
	// Analyze position, generate strategy
	// Call proposeStrategy() if rebalance needed
}

// Start event listener
watchDepositEvents((user, amount) => {
	console.log(`New deposit detected: ${user}`)
	// Trigger agent cycle for this user
})
```

---

## 🧪 **Testing**

### **Run All Tests**

```bash
npx hardhat test
```

### **Run Specific Test Types**

```bash
# Solidity tests only
npx hardhat test solidity

# Node.js tests only
npx hardhat test nodejs
```

### **Test Coverage**

```bash
npx hardhat coverage
```

---

## 🔍 **Verify on Somnia Explorer**

After deployment, verify your contracts:

1. Go to [Somnia Testnet Explorer](https://somnia-testnet.socialscan.io/)
2. Search for your contract address
3. Click "Verify Contract"
4. Upload source files + compiler settings

---

## 📊 **Contract Addresses**

### **Somnia Testnet (Chain ID: 50312)**

```
WrappedSTT:     0x7896B9A48690957f49973E1F8E19E7976BA4c929
MockUSDC:       0xF5875F25ccEB2edDc57F218eaF1F71c5CF161f21
LiquidityVault: 0xE86feD31B02D1C9B14772098F3b0Dde78dbAcc9E
AgentExecutor:  0x47E8e1031c066b9B51a56bDecFc5cF0c4935891c
```

**✅ Deployed!** [View on Shannon Explorer](https://shannon-explorer.somnia.network/)

**Next Steps:**

-   [x] Deploy contracts ✅
-   [ ] Verify contracts on Somnia Explorer
-   [ ] Update `frontend/lib/contracts.ts`
-   [ ] Update `agents/src/contracts/addresses.ts`
-   [ ] Test deposit flow

---

## 🏗️ **Architecture**

### **Contract Relationships**

```
User
  │
  ├─> WrappedSTT.deposit() → Wrap STT to wSTT
  │
  ├─> MockUSDC.mint() → Get test USDC
  │
  ├─> LiquidityVault.depositPair()
  │     ├─ Transfers wSTT + USDC
  │     ├─ Mints LP tokens (ERC20)
  │     └─ Creates position
  │
  └─> AgentExecutor.executeProposal()
        └─ Updates vault position range

AI Agents (off-chain)
  │
  ├─> Monitor vault positions
  ├─> Analyze market conditions
  └─> AgentExecutor.proposeStrategy()
        └─ Stores reasoning on-chain
```

### **Data Flow**

```
1. Deposit → Event emitted
2. Agent detects → Analyzes position
3. Agent proposes → Stored on-chain
4. User/agent executes → Range updated
5. Fees accrue → Claimable anytime
6. User withdraws → LP tokens burned
```

---

## 🔐 **Security Features**

-   ✅ **ReentrancyGuard** on all state-changing functions
-   ✅ **Ownable** for access control
-   ✅ **Pausable** for emergency stops
-   ✅ **Input validation** on all parameters
-   ✅ **CEI pattern** (Checks-Effects-Interactions)
-   ✅ **Agent authorization** system
-   ✅ **Market cap limits** (future enhancement)

---

## 🐛 **Troubleshooting**

### **"Insufficient funds for gas"**

Get more STT from [Somnia faucet](https://testnet.somnia.network)

### **"SOMNIA_PRIVATE_KEY not set"**

Run: `npx hardhat keystore set SOMNIA_PRIVATE_KEY`

### **"Contract already deployed"**

Use `--reset` flag: `npx hardhat ignition deploy --reset ...`

### **"Transaction reverted"**

Check:

-   Token approvals are sufficient
-   Minimum deposit met (10 USDC)
-   Agent is authorized (for proposals)

---

## 📚 **Resources**

-   [Somnia Documentation](https://docs.somnia.network/)
-   [Build a DEX on Somnia](https://docs.somnia.network/developer/how-to-guides/advanced/build-a-dex-on-somnia)
-   [Hardhat 3 Docs](https://hardhat.org/docs)
-   [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
-   [Viem Documentation](https://viem.sh)

---

## 🤝 **Contributing**

This is a hackathon project for **Somnia AI Hackathon 2025**.

For production use:

1. Complete security audit
2. Add comprehensive tests
3. Implement oracle price feeds
4. Add slippage protection
5. Deploy with multisig ownership

---

## 📄 **License**

MIT License - See LICENSE file for details

---

## 🏆 **Built For**

**Somnia AI Hackathon 2025**

-   Track: DeFi Agents + Infra Agents
-   Team: LiquidMesh Finance
-   Innovation: AI-powered autonomous CLM

---

**Questions?** Check the main project [README](../README.md) or open an issue.
