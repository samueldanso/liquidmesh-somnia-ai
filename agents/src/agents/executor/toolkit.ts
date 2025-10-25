import { tool } from 'ai'
import { z } from 'zod'

export function getExecutorToolkit() {
	return {
		simulateTransaction: tool({
			description:
				'Simulate a liquidity transaction to check gas costs and expected outcomes before execution.',
			inputSchema: z.object({
				action: z.string().describe('Action type: rebalance, withdraw, deposit'),
				poolAddress: z.string().describe('Pool contract address'),
				params: z.string().describe('Transaction parameters as JSON string'),
			}),
			execute: async ({
				action,
				poolAddress,
				params,
			}: {
				action: string
				poolAddress: string
				params: string
			}) => {
				console.log('======== simulateTransaction Tool =========')
				console.log(`[simulateTransaction] simulating ${action} on pool ${poolAddress}`)

				// Parse params to extract actual range values
				let parsedParams: any = {}
				try {
					parsedParams = JSON.parse(params)
				} catch {
					parsedParams = { description: params }
				}

				const range = parsedParams.newRange || parsedParams.range || [1.22, 1.28]

				// Mock simulation
				const simulation = {
					success: true,
					estimatedGas: 150000,
					gasCostUSD: 0.75,
					expectedOutcome: 'Position rebalanced successfully',
					newAPY: 38.2,
					newRange: range,
				}

				console.log(`[simulateTransaction] simulation complete`)
				return JSON.stringify(simulation, null, 2)
			},
		}),

		executeTransaction: tool({
			description: 'Execute the liquidity management transaction on Somnia blockchain.',
			inputSchema: z.object({
				action: z.string().describe('Action type: rebalance, withdraw, deposit'),
				poolAddress: z.string().describe('Pool contract address'),
				params: z.string().describe('Transaction parameters as JSON string'),
			}),
			execute: async ({
				action,
				poolAddress,
				params,
			}: {
				action: string
				poolAddress: string
				params: string
			}) => {
				console.log('======== executeTransaction Tool =========')
				console.log(`[executeTransaction] executing ${action} on pool ${poolAddress}`)

				// Parse params to extract actual range values
				let parsedParams: any = {}
				try {
					parsedParams = JSON.parse(params)
				} catch {
					// If parsing fails, params might already be a string description
					parsedParams = { description: params }
				}

				// Extract range from params (strategist passes newRange or range)
				const range = parsedParams.newRange || parsedParams.range || [1.22, 1.28]

				// Mock execution (replace with real Somnia tx later)
				const result = {
					success: true,
					txHash: `0x${Math.random().toString(16).substring(2)}`,
					gasUsed: 142350,
					gasCostUSD: 0.71,
					newPosition: {
						range: range,
						liquidity: 190000,
						apy: 38.2,
					},
				}

				console.log(`[executeTransaction] execution complete: ${result.txHash}`)
				return JSON.stringify(result, null, 2)
			},
		}),
	}
}
