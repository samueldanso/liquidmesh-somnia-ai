import env from '../env'
import { executorAgent } from '../setup'
import { getLatestTxAtMs } from './tx-store'

let timer: NodeJS.Timeout | null = null
let enabled = false
let intervalMinutes = env.STRATEGY_INTERVAL_MINUTES
let cooldownMinutes = env.STRATEGY_COOLDOWN_MINUTES

export function getAutomationStatus() {
	return {
		enabled,
		intervalMinutes,
		cooldownMinutes,
		lastTxAt: getLatestTxAtMs(),
	}
}

export function stopAutomation() {
	if (timer) {
		clearInterval(timer)
		timer = null
	}
	enabled = false
}

export function startAutomation({
	interval,
	cooldown,
}: { interval?: number; cooldown?: number } = {}) {
	if (interval && interval > 0) intervalMinutes = interval
	if (cooldown && cooldown > 0) cooldownMinutes = cooldown

	if (timer) {
		clearInterval(timer)
		timer = null
	}

	enabled = true
	const intervalMs = intervalMinutes * 60 * 1000
	const cooldownMs = cooldownMinutes * 60 * 1000

	timer = setInterval(async () => {
		try {
			const lastAt = getLatestTxAtMs()
			if (lastAt && Date.now() - lastAt < cooldownMs) return

			await executorAgent.handleEvent(`strategist-executor`, {
				result: JSON.stringify({
					action: 'deposit',
					poolAddress: 'somnia-v2:WSTT/USDC',
					params: JSON.stringify({
						amount0Wei: '50000000000000000',
						amount1Wei: '50000000',
					}),
				}),
				report: 'Automated periodic strategy tick',
			})
		} catch (e) {
			console.error('[automation] tick error', e)
		}
	}, intervalMs)
}
