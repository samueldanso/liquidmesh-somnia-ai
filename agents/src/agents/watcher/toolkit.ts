import { tool } from 'ai'
import { z } from 'zod'
import type { Address } from 'viem'
import {
	getMockLiquidityPositions,
	getMockPoolMetrics,
	getMockWalletBalances,
	realPoolDataProvider,
} from '../../data'
import { retrievePastReports } from '../../memory/db'
import env from '../../env'

// Use real data by default, fallback to mock if API fails
const USE_REAL_DATA = true

export function getWatcherToolkit(address: string) {
	return {
		getPastReports: tool({
			description:
				'A tool that returns past reports containing information about previously executed liquidity management actions.',
			inputSchema: z.object({
				question: z
					.string()
					.describe(
						'The question to retrieve past reports for. For example: "What rebalancing actions were taken for STT/USDC pool?"'
					),
			}),
			execute: async ({ question }) => {
				console.log('======== getPastReports Tool =========')
				console.log(`[getPastReports] retrieving past reports with question: ${question}`)
				const reports = await retrievePastReports(question)

				if (!reports || reports.length === 0) {
					return 'No past reports found. This is ok, it means this is a new analysis.'
				}

				console.log(`[getPastReports] reports retrieved: ${reports.length}`)

				return reports
					.map((report: any) => `Report from ${report.created_at}:\n${report.content}\n`)
					.join('\n')
			},
		}),

		getPoolMetrics: tool({
			description:
				'Fetch current metrics for liquidity pools on Somnia (price, volume, TVL, volatility, APY, etc.). Uses REAL data from DefiLlama API when available.',
			inputSchema: z.object({
				poolAddress: z
					.string()
					.optional()
					.describe(
						'Specific pool address to fetch metrics for. If not provided, returns all pools.'
					),
			}),
			execute: async ({ poolAddress }) => {
				console.log('======== getPoolMetrics Tool =========')
				console.log(
					`[getPoolMetrics] fetching pool metrics from ${
						USE_REAL_DATA ? 'REAL DATA (DefiLlama)' : 'mock data'
					}...`
				)

				let pools

				if (USE_REAL_DATA) {
					try {
						// Try to get real data first
						pools = await realPoolDataProvider.getRealPoolMetrics()
						console.log(
							`[getPoolMetrics] fetched ${pools.length} REAL pools from DefiLlama`
						)

						// Filter by address if provided
						if (poolAddress) {
							pools = pools.filter(
								(p) => p.poolAddress.toLowerCase() === poolAddress.toLowerCase()
							)
						}
					} catch (error) {
						console.warn(
							'[getPoolMetrics] Real data fetch failed, falling back to mock:',
							error
						)
						pools = getMockPoolMetrics(poolAddress)
					}
				} else {
					pools = getMockPoolMetrics(poolAddress)
				}

				const poolsArray = Array.isArray(pools) ? pools : [pools]

				const formatted = poolsArray
					.map(
						(pool: any) =>
							`[${pool.token0.symbol}/${pool.token1.symbol}] on ${pool.dex}\n` +
							`  Pool: ${pool.poolAddress}\n` +
							`  Price: ${pool.currentPrice}\n` +
							`  Volume 24h: $${pool.volume24h.toLocaleString()}\n` +
							`  TVL: $${pool.tvl.toLocaleString()}\n` +
							`  APY: ${pool.apy}%\n` +
							`  Fee tier: ${(pool.fee * 100).toFixed(2)}%\n` +
							`  Volatility: ${(pool.volatility * 100).toFixed(1)}%\n` +
							`  Current range: [${pool.currentRange.lower}, ${
								pool.currentRange.upper
							}] ${pool.currentRange.inRange ? '✓ IN RANGE' : '✗ OUT OF RANGE'}\n` +
							`  Fees earned (24h): $${pool.feesEarned24h}`
					)
					.join('\n\n')

				console.log(`[getPoolMetrics] metrics fetched successfully`)
				return `Current Somnia Pool Metrics:\n\n${formatted}`
			},
		}),

		getWalletBalances: tool({
			description:
				'Get current token balances and liquidity positions for the monitored wallet. Uses REAL Somnia testnet balances when available.',
			inputSchema: z.object({}),
			execute: async () => {
				console.log('======== getWalletBalances Tool =========')
				console.log(
					`[getWalletBalances] fetching wallet balances for ${address} from ${
						USE_REAL_DATA ? 'REAL DATA (Somnia RPC)' : 'mock data'
					}...`
				)

				let balances
				let positions = getMockLiquidityPositions() // Keep positions mock for now

				if (USE_REAL_DATA) {
					try {
						// Fetch REAL balances from Somnia testnet
						const realBalances = await realPoolDataProvider.getRealWalletBalances(
							address as Address
						)
						console.log(
							`[getWalletBalances] REAL balances - STT: ${realBalances.stt}, USDC: ${realBalances.usdc}`
						)

						// Convert to our format
						balances = [
							{
								token: 'STT',
								address: '0x0000000000000000000000000000000000000000',
								balance: realBalances.stt,
								balanceUSD: realBalances.stt * 1.25, // Assume $1.25 per STT
								price: 1.25,
							},
							{
								token: 'USDC',
								address: '0x0ED782B8079529f7385c3eDA9fAf1EaA0DbC6a17',
								balance: realBalances.usdc,
								balanceUSD: realBalances.usdc,
								price: 1.0,
							},
						]
					} catch (error) {
						console.warn(
							'[getWalletBalances] Real data fetch failed, falling back to mock:',
							error
						)
						balances = getMockWalletBalances()
					}
				} else {
					balances = getMockWalletBalances()
				}

				const tokenBalances = balances
					.map(
						(b: any) =>
							`[${
								b.symbol
							}] ${b.balance.toLocaleString()} ($${b.balanceUSD.toLocaleString()}) - price: $${
								b.price
							}`
					)
					.join('\n')

				const liquidityPositions = positions
					.map(
						(p: any) =>
							`[${p.token0Symbol}/${p.token1Symbol}] Pool: ${p.poolAddress}\n` +
							`  Liquidity: $${p.liquidityUSD.toLocaleString()}\n` +
							`  Range: [${p.rangeLower}, ${p.rangeUpper}] ${
								p.inRange ? '✓ IN RANGE' : '✗ OUT OF RANGE'
							}\n` +
							`  Fees earned: $${p.feesEarnedUSD}\n` +
							`  APY: ${p.apy}%`
					)
					.join('\n\n')

				console.log(`[getWalletBalances] balances fetched successfully`)
				return `Wallet Status (${address}):\n\nToken Balances:\n${tokenBalances}\n\nLiquidity Positions:\n${liquidityPositions}`
			},
		}),
	}
}
