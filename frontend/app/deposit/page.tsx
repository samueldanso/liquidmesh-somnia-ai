import { ErrorBoundary } from '@/components/error-boundary'
import { DepositForm } from './_components/deposit-form'
import { DepositStats } from './_components/deposit-stats'
import { WithdrawForm } from './_components/withdraw-form'
import { AutomationStep } from './_components/automation-step'

export default function DepositPage() {
	return (
		<ErrorBoundary>
			<div className="space-y-8">
				{/* Header */}
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Liquidity Management</h1>
					<p className="text-muted-foreground mt-2">
						Deposit and withdraw liquidity with AI-powered optimization
					</p>
				</div>

				{/* Deposit Stats */}
				<DepositStats />

				{/* Deposit and Withdraw Forms */}
				<div className="grid gap-6 md:grid-cols-2">
					<DepositForm />
					<WithdrawForm />
				</div>

				{/* Enable Automation */}
				<AutomationStep />
			</div>
		</ErrorBoundary>
	)
}
