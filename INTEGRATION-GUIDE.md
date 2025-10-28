# 🔗 LiquidMesh Integration Guide

**Step-by-step integration of verified contracts with agents and frontend.**

## 📋 **FINAL Contract Addresses**

| Contract           | Address                                      | Verified | Explorer                                                                                                |
| ------------------ | -------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| **WrappedSTT**     | `0x9e1B4FbB45F30b0628e4C406A6F4Eec1fadb54E1` | ✅       | [View](https://shannon-explorer.somnia.network/address/0x9e1B4FbB45F30b0628e4C406A6F4Eec1fadb54E1#code) |
| **MockUSDC**       | `0x758dA18F8424f637f788a0CD0DAF8407069D380b` | ✅       | [View](https://shannon-explorer.somnia.network/address/0x758dA18F8424f637f788a0CD0DAF8407069D380b#code) |
| **LiquidityVault** | `0x28205BB97e1BEe146E0b095D3cf62433D9bAb47d` | ✅       | [View](https://shannon-explorer.somnia.network/address/0x28205BB97e1BEe146E0b095D3cf62433D9bAb47d#code) |
| **AgentExecutor**  | `0x5e639e2F345577514aFA0159AEdDf0A832e4139f` | ✅       | [View](https://shannon-explorer.somnia.network/address/0x5e639e2F345577514aFA0159AEdDf0A832e4139f#code) |

## 🤖 **Step 1: Update Agents**

### **File: `agents/src/data/somnia-client.ts`**

```typescript
// Replace the existing SOMNIA_CONTRACTS with these FINAL addresses
export const SOMNIA_CONTRACTS = {
	WrappedSTT: '0x9e1B4FbB45F30b0628e4C406A6F4Eec1fadb54E1',
	MockUSDC: '0x758dA18F8424f637f788a0CD0DAF8407069D380b',
	LiquidityVault: '0x28205BB97e1BEe146E0b095D3cf62433D9bAb47d',
	AgentExecutor: '0x5e639e2F345577514aFA0159AEdDf0A832e4139f',
}
```

### **File: `agents/src/data/contract-abis.ts` (NEW FILE)**

```typescript
// Contract ABIs - copy from Shannon Explorer
export const WRAPPED_STT_ABI = [
	// Copy ABI from: https://shannon-explorer.somnia.network/address/0x9e1B4FbB45F30b0628e4C406A6F4Eec1fadb54E1#code
	// Click "Contract" tab → Copy ABI JSON
] as const

export const MOCK_USDC_ABI = [
	// Copy ABI from: https://shannon-explorer.somnia.network/address/0x758dA18F8424f637f788a0CD0DAF8407069D380b#code
] as const

export const LIQUIDITY_VAULT_ABI = [
	// Copy ABI from: https://shannon-explorer.somnia.network/address/0x28205BB97e1BEe146E0b095D3cf62433D9bAb47d#code
] as const

export const AGENT_EXECUTOR_ABI = [
	// Copy ABI from: https://shannon-explorer.somnia.network/address/0x5e639e2F345577514aFA0159AEdDf0A832e4139f#code
] as const
```

### **File: `agents/src/utils/contract-interactions.ts` (NEW FILE)**

```typescript
import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { SOMNIA_CONTRACTS } from '../data/somnia-client'
import { LIQUIDITY_VAULT_ABI, AGENT_EXECUTOR_ABI } from '../data/contract-abis'

// Somnia Testnet configuration
const somniaTestnet = {
	id: 50312,
	name: 'Somnia Testnet',
	rpcUrls: { default: { http: ['https://dream-rpc.somnia.network'] } },
	nativeCurrency: { name: 'STT', symbol: 'STT', decimals: 18 },
}

// Initialize clients for REAL execution (not simulation)
const publicClient = createPublicClient({
	chain: somniaTestnet,
	transport: http('https://dream-rpc.somnia.network'),
})

const walletClient = createWalletClient({
	chain: somniaTestnet,
	transport: http('https://dream-rpc.somnia.network'),
	account: privateKeyToAccount(process.env.AGENT_PRIVATE_KEY!),
})

// Agent functions - REAL blockchain transactions
export async function proposeStrategy(
	user: string,
	rangeLower: number,
	rangeUpper: number,
	reasoning: string
) {
	console.log(`[Agent] Proposing strategy for ${user}: ${rangeLower}-${rangeUpper}`)

	return await walletClient.writeContract({
		address: SOMNIA_CONTRACTS.AgentExecutor,
		abi: AGENT_EXECUTOR_ABI,
		functionName: 'proposeStrategy',
		args: [user, rangeLower, rangeUpper, reasoning],
	})
}

export async function executeProposal(proposalId: number) {
	console.log(`[Agent] Executing proposal ${proposalId}`)

	return await walletClient.writeContract({
		address: SOMNIA_CONTRACTS.AgentExecutor,
		abi: AGENT_EXECUTOR_ABI,
		functionName: 'executeProposal',
		args: [proposalId],
	})
}

export async function updatePosition(user: string, rangeLower: number, rangeUpper: number) {
	console.log(`[Agent] Updating position for ${user}: ${rangeLower}-${rangeUpper}`)

	return await walletClient.writeContract({
		address: SOMNIA_CONTRACTS.LiquidityVault,
		abi: LIQUIDITY_VAULT_ABI,
		functionName: 'updatePosition',
		args: [user, rangeLower, rangeUpper],
	})
}
```

### **File: `agents/.env` (NEW FILE)**

```bash
# Agent wallet private key for blockchain transactions
AGENT_PRIVATE_KEY=your_agent_wallet_private_key_here

# OpenAI API key
OPENAI_API_KEY=your_openai_api_key_here

# Supabase credentials
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🎨 **Step 2: Update Frontend**

### **File: `frontend/lib/contracts.ts` (NEW FILE)**

```typescript
// Contract configuration for frontend
export const CONTRACTS = {
	WrappedSTT: '0x9e1B4FbB45F30b0628e4C406A6F4Eec1fadb54E1',
	MockUSDC: '0x758dA18F8424f637f788a0CD0DAF8407069D380b',
	LiquidityVault: '0x28205BB97e1BEe146E0b095D3cf62433D9bAb47d',
	AgentExecutor: '0x5e639e2F345577514aFA0159AEdDf0A832e4139f',
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
			name: 'Shannon Explorer',
			url: 'https://shannon-explorer.somnia.network',
		},
	},
}
```

### **File: `frontend/lib/abis.ts` (NEW FILE)**

```typescript
// Contract ABIs - copy from Shannon Explorer
export const WRAPPED_STT_ABI = [
	// Copy ABI from: https://shannon-explorer.somnia.network/address/0x9e1B4FbB45F30b0628e4C406A6F4Eec1fadb54E1#code
] as const

export const MOCK_USDC_ABI = [
	// Copy ABI from: https://shannon-explorer.somnia.network/address/0x758dA18F8424f637f788a0CD0DAF8407069D380b#code
] as const

export const LIQUIDITY_VAULT_ABI = [
	// Copy ABI from: https://shannon-explorer.somnia.network/address/0x28205BB97e1BEe146E0b095D3cf62433D9bAb47d#code
] as const

export const AGENT_EXECUTOR_ABI = [
	// Copy ABI from: https://shannon-explorer.somnia.network/address/0x5e639e2F345577514aFA0159AEdDf0A832e4139f#code
] as const
```

### **File: `frontend/app/deposit/page.tsx` (NEW FILE)**

```typescript
'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACTS, LIQUIDITY_VAULT_ABI } from '@/lib/contracts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export default function DepositPage() {
	const { address } = useAccount()
	const [wsttAmount, setWsttAmount] = useState('')
	const [usdcAmount, setUsdcAmount] = useState('')

	const { writeContract, data: hash } = useWriteContract()
	const { isLoading, isSuccess } = useWaitForTransactionReceipt({
		hash,
	})

	const handleDeposit = async () => {
		if (!address) {
			toast.error('Please connect your wallet')
			return
		}

		try {
			writeContract({
				address: CONTRACTS.LiquidityVault,
				abi: LIQUIDITY_VAULT_ABI,
				functionName: 'depositPair',
				args: [
					BigInt(parseFloat(wsttAmount) * 1e18), // wSTT (18 decimals)
					BigInt(parseFloat(usdcAmount) * 1e6), // USDC (6 decimals)
				],
			})
		} catch (error) {
			toast.error('Deposit failed')
		}
	}

	if (isSuccess) {
		toast.success('Deposit successful!')
	}

	return (
		<div className="container mx-auto py-8">
			<Card className="max-w-md mx-auto">
				<CardHeader>
					<CardTitle>Deposit Liquidity</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<label className="text-sm font-medium">wSTT Amount</label>
						<Input
							type="number"
							placeholder="0.0"
							value={wsttAmount}
							onChange={(e) => setWsttAmount(e.target.value)}
						/>
					</div>
					<div>
						<label className="text-sm font-medium">USDC Amount</label>
						<Input
							type="number"
							placeholder="0.0"
							value={usdcAmount}
							onChange={(e) => setUsdcAmount(e.target.value)}
						/>
					</div>
					<Button
						onClick={handleDeposit}
						disabled={isLoading || !address}
						className="w-full"
					>
						{isLoading ? 'Depositing...' : 'Deposit'}
					</Button>
				</CardContent>
			</Card>
		</div>
	)
}
```

## 📋 **Step 3: Development Setup**

### **Authorize Agent Wallet**

```bash
npx hardhat console --network somnia
```

```javascript
const executor = await ethers.getContractAt(
	'AgentExecutor',
	'0x5e639e2F345577514aFA0159AEdDf0A832e4139f'
)
await executor.authorizeAgent('0xYourAgentWalletAddress')
```

### **Mint Test Tokens**

```javascript
// Mint test USDC
const usdc = await ethers.getContractAt('MockUSDC', '0x758dA18F8424f637f788a0CD0DAF8407069D380b')
await usdc.mint('0xYourAddress', 10000_000000) // 10,000 USDC

// Wrap STT → wSTT
const wstt = await ethers.getContractAt('WrappedSTT', '0x9e1B4FbB45F30b0628e4C406A6F4Eec1fadb54E1')
await wstt.deposit({ value: ethers.parseEther('10000') }) // Wrap 10,000 STT
```

### **Test Deposit**

```javascript
const vault = await ethers.getContractAt(
	'LiquidityVault',
	'0x28205BB97e1BEe146E0b095D3cf62433D9bAb47d'
)

// Approve tokens
await wstt.approve(vault.address, ethers.parseEther('1000'))
await usdc.approve(vault.address, 1000_000000)

// Deposit pair
await vault.depositPair(
	ethers.parseEther('1000'), // 1000 wSTT
	1000_000000 // 1000 USDC
)
```

## 📋 **Step 4: Testing Checklist**

-   [ ] **Copy ABIs** from Shannon Explorer links
-   [ ] **Set environment variables** in agents/.env
-   [ ] **Update contract addresses** in both agents and frontend
-   [ ] **Test agent authorization** on AgentExecutor
-   [ ] **Test deposit flow** in frontend
-   [ ] **Test agent proposal** creation
-   [ ] **Test proposal execution**
-   [ ] **End-to-end flow** works

## 🚨 **Important Notes**

1. **ABI Copying**: Copy ABIs from Shannon Explorer, not from local artifacts
2. **Environment Variables**: Set `AGENT_PRIVATE_KEY` for agent transactions
3. **Gas Fees**: Ensure sufficient STT for transactions
4. **Error Handling**: Add proper error boundaries and toast notifications
5. **Real Execution**: Agents execute real blockchain transactions, not simulations

---

**Ready for integration!** 🚀
