'use client'

import { CheckCircle, Info, Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { formatUnits, parseUnits } from 'viem'
import {
	useAccount,
	useBalance,
	useWaitForTransactionReceipt,
	useWriteContract,
} from 'wagmi'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LIQUIDITY_VAULT_ABI } from '@/lib/abis'
import { CONTRACTS, TOKENS } from '@/lib/contracts'
import { useOnboardingStore } from '@/lib/stores/onboarding-store'

export function DepositStep() {
	const { address, isConnected } = useAccount()

	const {
		wsttAmount,
		usdcAmount,
		setWsttAmount,
		setUsdcAmount,
		setDepositCompleted,
		setCurrentStep,
		approveWSTTCompleted,
		approveUSDCCompleted,
	} = useOnboardingStore()

	// Get balances
	const { data: wsttBalance } = useBalance({
		address,
		token: TOKENS.WSTT.address,
	})

	const { data: usdcBalance } = useBalance({
		address,
		token: TOKENS.USDC.address,
	})

	// Contract interactions
	const { writeContract: writeVault, data: depositHash } = useWriteContract()

	// Transaction receipt
	const { isLoading: isDepositing, isSuccess: isDepositSuccess } =
		useWaitForTransactionReceipt({
			hash: depositHash,
		})

	// Update store when deposit completes
	useEffect(() => {
		if (isDepositSuccess) {
			setDepositCompleted(true)
		}
	}, [isDepositSuccess, setDepositCompleted])

	const handleDeposit = async () => {
		if (!address || !wsttAmount || !usdcAmount) return

		try {
			const wsttAmountWei = parseUnits(wsttAmount, 18)
			const usdcAmountWei = parseUnits(usdcAmount, 6)

			await writeVault({
				address: CONTRACTS.LiquidityVault,
				abi: LIQUIDITY_VAULT_ABI,
				functionName: 'depositPair',
				args: [wsttAmountWei, usdcAmountWei],
			})
			toast.success('Deposit initiated')
		} catch (error) {
			toast.error('Failed to deposit')
			console.error('Deposit error:', error)
		}
	}

	const handleContinue = () => {
		if (isDepositSuccess) {
			setCurrentStep(3)
		}
	}

	const canDeposit =
		wsttAmount &&
		usdcAmount &&
		parseFloat(wsttAmount) > 0 &&
		parseFloat(usdcAmount) > 0 &&
		approveWSTTCompleted &&
		approveUSDCCompleted

	if (!isConnected) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Deposit Liquidity</CardTitle>
				</CardHeader>
				<CardContent>
					<Alert>
						<AlertDescription>
							Please connect your wallet to deposit liquidity
						</AlertDescription>
					</Alert>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Deposit Liquidity</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<Alert>
					<Info className="size-4" />
					<AlertDescription>
						Deposit your prepared tokens into the liquidity vault. The vault will
						manage your liquidity position and optimize it using AI agents.
					</AlertDescription>
				</Alert>

				{/* Balance Display */}
				<div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-muted/50">
					<div>
						<div className="text-sm text-muted-foreground">wSTT Balance</div>
						<div className="text-lg font-semibold">
							{wsttBalance
								? parseFloat(formatUnits(wsttBalance.value, 18)).toFixed(4)
								: '0.0000'}
						</div>
					</div>
					<div>
						<div className="text-sm text-muted-foreground">USDC Balance</div>
						<div className="text-lg font-semibold">
							{usdcBalance
								? parseFloat(formatUnits(usdcBalance.value, 6)).toFixed(4)
								: '0.0000'}
						</div>
					</div>
				</div>

				{/* Deposit Amounts */}
				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="deposit-wstt">wSTT Amount</Label>
						<Input
							id="deposit-wstt"
							type="number"
							placeholder="0.0"
							value={wsttAmount}
							onChange={(e) => setWsttAmount(e.target.value)}
							disabled={isDepositing || isDepositSuccess}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="deposit-usdc">USDC Amount</Label>
						<Input
							id="deposit-usdc"
							type="number"
							placeholder="0.0"
							value={usdcAmount}
							onChange={(e) => setUsdcAmount(e.target.value)}
							disabled={isDepositing || isDepositSuccess}
						/>
					</div>
				</div>

				{/* Deposit Button */}
				{!isDepositSuccess ? (
					<Button
						onClick={handleDeposit}
						disabled={!canDeposit || isDepositing}
						variant="gradient"
						size="lg"
						className="w-full px-8 py-3 rounded-md text-base font-medium"
					>
						{isDepositing ? (
							<>
								<Loader2 className="size-4 mr-2 animate-spin" />
								Depositing...
							</>
						) : (
							'Deposit Liquidity'
						)}
					</Button>
				) : (
					<>
						<Alert>
							<CheckCircle className="size-4" />
							<AlertDescription>
								Deposit successful! Your liquidity is now being managed by AI
								agents.
							</AlertDescription>
						</Alert>
						<Button
							onClick={handleContinue}
							variant="gradient"
							size="lg"
							className="w-full px-8 py-3 rounded-md text-base font-medium"
						>
							Continue to Automation
						</Button>
					</>
				)}
			</CardContent>
		</Card>
	)
}
