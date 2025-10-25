import { tool } from "ai";
import { z } from "zod";
import {
	getMockLiquidityPositions,
	getMockPoolMetrics,
	getMockWalletBalances,
} from "../../data";
import { retrievePastReports } from "../../memory/db";

export function getWatcherToolkit(address: string) {
	return {
		getPastReports: tool({
			description:
				"A tool that returns past reports containing information about previously executed liquidity management actions.",
			inputSchema: z.object({
				question: z
					.string()
					.describe(
						'The question to retrieve past reports for. For example: "What rebalancing actions were taken for STT/USDC pool?"',
					),
			}),
			execute: async ({ question }) => {
				console.log("======== getPastReports Tool =========");
				console.log(
					`[getPastReports] retrieving past reports with question: ${question}`,
				);
				const reports = await retrievePastReports(question);

				if (!reports || reports.length === 0) {
					return "No past reports found. This is ok, it means this is a new analysis.";
				}

				console.log(`[getPastReports] reports retrieved: ${reports.length}`);

				return reports
					.map(
						(report: any) =>
							`Report from ${report.created_at}:\n${report.content}\n`,
					)
					.join("\n");
			},
		}),

		getPoolMetrics: tool({
			description:
				"Fetch current metrics for liquidity pools on Somnia (price, volume, TVL, volatility, APY, etc.)",
			inputSchema: z.object({
				poolAddress: z
					.string()
					.optional()
					.describe(
						"Specific pool address to fetch metrics for. If not provided, returns all pools.",
					),
			}),
			execute: async ({ poolAddress }) => {
				console.log("======== getPoolMetrics Tool =========");
				console.log(`[getPoolMetrics] fetching pool metrics...`);

				const pools = getMockPoolMetrics(poolAddress);
				const poolsArray = Array.isArray(pools) ? pools : [pools];

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
							}] ${pool.currentRange.inRange ? "✓ IN RANGE" : "✗ OUT OF RANGE"}\n` +
							`  Fees earned (24h): $${pool.feesEarned24h}`,
					)
					.join("\n\n");

				console.log(`[getPoolMetrics] metrics fetched successfully`);
				return `Current Somnia Pool Metrics:\n\n${formatted}`;
			},
		}),

		getWalletBalances: tool({
			description:
				"Get current token balances and liquidity positions for the monitored wallet.",
			inputSchema: z.object({}),
			execute: async () => {
				console.log("======== getWalletBalances Tool =========");
				console.log(
					`[getWalletBalances] fetching wallet balances for ${address}...`,
				);

				const balances = getMockWalletBalances();
				const positions = getMockLiquidityPositions();

				const tokenBalances = balances
					.map(
						(b: any) =>
							`[${
								b.symbol
							}] ${b.balance.toLocaleString()} ($${b.balanceUSD.toLocaleString()}) - price: $${
								b.price
							}`,
					)
					.join("\n");

				const liquidityPositions = positions
					.map(
						(p: any) =>
							`[${p.token0Symbol}/${p.token1Symbol}] Pool: ${p.poolAddress}\n` +
							`  Liquidity: $${p.liquidityUSD.toLocaleString()}\n` +
							`  Range: [${p.rangeLower}, ${p.rangeUpper}] ${
								p.inRange ? "✓ IN RANGE" : "✗ OUT OF RANGE"
							}\n` +
							`  Fees earned: $${p.feesEarnedUSD}\n` +
							`  APY: ${p.apy}%`,
					)
					.join("\n\n");

				console.log(`[getWalletBalances] balances fetched successfully`);
				return `Wallet Status (${address}):\n\nToken Balances:\n${tokenBalances}\n\nLiquidity Positions:\n${liquidityPositions}`;
			},
		}),

		noFurtherActionsTool: tool({
			description:
				"Use this tool when no immediate actions are needed. Market conditions are stable and positions are performing well.",
			inputSchema: z.object({
				reason: z
					.string()
					.describe("Explain why no further actions are needed."),
				waitTime: z
					.number()
					.describe(
						"Time to wait before next analysis in minutes. Should be logical based on market conditions.",
					),
			}),
			execute: async ({ reason, waitTime }) => {
				console.log("======== noFurtherActions Tool =========");
				console.log(
					`[noFurtherActions] reason: ${reason}, wait time: ${waitTime} minutes`,
				);
				return { action: "wait", reason, waitTime };
			},
		}),
	};
}
