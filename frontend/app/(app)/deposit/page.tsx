import { ErrorBoundary } from '@/components/error-boundary'
import { AutomationStep } from './_components/automation-step'
import { DepositStep } from './_components/deposit-step'
import { PrepareTokensStep } from './_components/prepare-tokens-step'
import { StepProgressIndicator } from './_components/step-progress'
import { OnboardingFlow } from './_components/onboarding-flow'

export default function DepositPage() {
	return (
		<ErrorBoundary>
			<div className="space-y-8">
				{/* Header */}
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Liquidity Management</h1>
					<p className="text-muted-foreground mt-2">
						Deposit and activate AI-powered liquidity optimization
					</p>
				</div>

				{/* Step Progress Indicator */}
				<StepProgressIndicator />

				{/* Onboarding Flow */}
				<OnboardingFlow />
			</div>
		</ErrorBoundary>
	)
}
