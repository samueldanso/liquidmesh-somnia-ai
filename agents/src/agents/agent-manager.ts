import type { WatcherAgent } from './watcher'
import env from '../env'

/**
 * Agent State Manager
 * Controls agent lifecycle: start, stop, status
 */
export class AgentManager {
	private isRunning = false
	private currentWallet?: string
	private intervalId?: NodeJS.Timeout
	private cycleCount = 0

	constructor(private watcherAgent: WatcherAgent) {}

	/**
	 * Start autonomous monitoring for a wallet
	 */
	async start(walletAddress: string): Promise<void> {
		if (this.isRunning) {
			console.log(`[AgentManager] Already monitoring wallet: ${this.currentWallet}`)
			return
		}

		this.isRunning = true
		this.currentWallet = walletAddress
		this.cycleCount = 0

		console.log(`[AgentManager] 🚀 Starting autonomous monitoring for wallet: ${walletAddress}`)
		console.log(`[AgentManager] Check interval: ${env.CHECK_INTERVAL_HOURS} hours`)

		// Run first cycle immediately
		await this.runCycle()

		// Schedule periodic checks
		this.scheduleNextCheck()
	}

	/**
	 * Stop autonomous monitoring
	 */
	stop(): void {
		if (!this.isRunning) {
			console.log('[AgentManager] Not currently running')
			return
		}

		console.log(
			`[AgentManager] 🛑 Stopping autonomous monitoring for wallet: ${this.currentWallet}`
		)

		if (this.intervalId) {
			clearTimeout(this.intervalId)
			this.intervalId = undefined
		}

		this.isRunning = false
		this.currentWallet = undefined
		this.cycleCount = 0
	}

	/**
	 * Get current agent status
	 */
	getStatus() {
		return {
			isRunning: this.isRunning,
			wallet: this.currentWallet || null,
			cycleCount: this.cycleCount,
			checkIntervalHours: env.CHECK_INTERVAL_HOURS,
			nextCheckIn: this.isRunning ? `${env.CHECK_INTERVAL_HOURS} hours` : null,
			lastCycle: this.cycleCount > 0 ? new Date().toISOString() : null,
		}
	}

	/**
	 * Run a single analysis cycle
	 */
	private async runCycle(): Promise<void> {
		if (!this.currentWallet || !this.isRunning) return

		this.cycleCount++
		console.log(
			`[AgentManager] 🔄 Running cycle #${this.cycleCount} for wallet: ${this.currentWallet}`
		)

		try {
			await this.watcherAgent.start(this.currentWallet)
		} catch (error) {
			console.error(`[AgentManager] Error in cycle #${this.cycleCount}:`, error)
		}
	}

	/**
	 * Schedule next check based on configured interval
	 */
	private scheduleNextCheck(): void {
		if (!this.isRunning) return

		const intervalMs = env.CHECK_INTERVAL_HOURS * 60 * 60 * 1000

		console.log(`[AgentManager] ⏰ Next check scheduled in ${env.CHECK_INTERVAL_HOURS} hours`)

		this.intervalId = setTimeout(async () => {
			await this.runCycle()
			this.scheduleNextCheck() // Schedule next one
		}, intervalMs)
	}
}
