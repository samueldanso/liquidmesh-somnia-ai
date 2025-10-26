import { Hono } from 'hono'
import { agentManager, walletAddress } from '../setup'

const agentsRouter = new Hono()

/**
 * POST /agents/start/:wallet
 * Start autonomous monitoring for a specific wallet
 */
agentsRouter.post('/start/:wallet', async (c) => {
	try {
		const wallet = c.req.param('wallet')

		if (!wallet || !wallet.startsWith('0x')) {
			return c.json({ error: 'Invalid wallet address' }, 400)
		}

		await agentManager.start(wallet)

		return c.json({
			success: true,
			message: `Autonomous monitoring started for wallet: ${wallet}`,
			status: agentManager.getStatus(),
		})
	} catch (error: any) {
		console.error('[POST /agents/start] Error:', error)
		return c.json({ error: error.message || 'Failed to start agents' }, 500)
	}
})

/**
 * POST /agents/start
 * Start autonomous monitoring for the configured default wallet
 */
agentsRouter.post('/start', async (c) => {
	try {
		await agentManager.start(walletAddress)

		return c.json({
			success: true,
			message: `Autonomous monitoring started for wallet: ${walletAddress}`,
			status: agentManager.getStatus(),
		})
	} catch (error: any) {
		console.error('[POST /agents/start] Error:', error)
		return c.json({ error: error.message || 'Failed to start agents' }, 500)
	}
})

/**
 * POST /agents/stop
 * Stop autonomous monitoring
 */
agentsRouter.post('/stop', (c) => {
	try {
		agentManager.stop()

		return c.json({
			success: true,
			message: 'Autonomous monitoring stopped',
			status: agentManager.getStatus(),
		})
	} catch (error: any) {
		console.error('[POST /agents/stop] Error:', error)
		return c.json({ error: error.message || 'Failed to stop agents' }, 500)
	}
})

/**
 * GET /agents/status
 * Get current agent status
 */
agentsRouter.get('/status', (c) => {
	const status = agentManager.getStatus()

	return c.json({
		...status,
		status: status.isRunning ? 'online' : 'offline',
		message: status.isRunning ? `Monitoring wallet ${status.wallet}` : 'Agents are offline',
	})
})

export { agentsRouter }
