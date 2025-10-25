import type { LiquidityPosition, PoolMetrics, WalletBalance } from "./types";

// Mock pool data for Somnia DEXes
export const mockPools: PoolMetrics[] = [
	{
		poolAddress: "0x1234567890abcdef1234567890abcdef12345678",
		dex: "quickswap",
		token0: {
			symbol: "STT",
			address: "0xSTT_address",
			decimals: 18,
		},
		token1: {
			symbol: "USDC",
			address: "0xUSDC_address",
			decimals: 6,
		},
		currentPrice: 1.25,
		volume24h: 2500000,
		tvl: 8000000,
		fee: 0.003,
		volatility: 0.12,
		currentRange: { lower: 1.2, upper: 1.3, inRange: true },
		apy: 35.5,
		feesEarned24h: 750,
	},
	{
		poolAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
		dex: "somnex",
		token0: {
			symbol: "WETH",
			address: "0xWETH_address",
			decimals: 18,
		},
		token1: {
			symbol: "USDC",
			address: "0xUSDC_address",
			decimals: 6,
		},
		currentPrice: 3200,
		volume24h: 5000000,
		tvl: 15000000,
		fee: 0.005,
		volatility: 0.18,
		currentRange: { lower: 3000, upper: 3400, inRange: true },
		apy: 42.8,
		feesEarned24h: 2100,
	},
	{
		poolAddress: "0x9876543210fedcba9876543210fedcba98765432",
		dex: "quickswap",
		token0: {
			symbol: "STT",
			address: "0xSTT_address",
			decimals: 18,
		},
		token1: {
			symbol: "WETH",
			address: "0xWETH_address",
			decimals: 18,
		},
		currentPrice: 0.00039,
		volume24h: 1800000,
		tvl: 6000000,
		fee: 0.003,
		volatility: 0.22,
		currentRange: { lower: 0.00035, upper: 0.00043, inRange: false },
		apy: 28.3,
		feesEarned24h: 450,
	},
];

// Mock wallet balances
export const mockWalletBalances: WalletBalance[] = [
	{
		symbol: "STT",
		address: "0xSTT_address",
		balance: 50000,
		balanceUSD: 62500,
		price: 1.25,
	},
	{
		symbol: "USDC",
		address: "0xUSDC_address",
		balance: 100000,
		balanceUSD: 100000,
		price: 1.0,
	},
	{
		symbol: "WETH",
		address: "0xWETH_address",
		balance: 15,
		balanceUSD: 48000,
		price: 3200,
	},
];

// Mock liquidity positions
export const mockLiquidityPositions: LiquidityPosition[] = [
	{
		poolAddress: "0x1234567890abcdef1234567890abcdef12345678",
		token0Symbol: "STT",
		token1Symbol: "USDC",
		liquidity: 150000,
		liquidityUSD: 187500,
		rangeLower: 1.2,
		rangeUpper: 1.3,
		feesEarned: 2500,
		feesEarnedUSD: 2500,
		apy: 35.5,
		inRange: true,
	},
];

export const getMockPoolMetrics = (
	poolAddress?: string,
): PoolMetrics | PoolMetrics[] => {
	if (poolAddress) {
		return mockPools.find((p) => p.poolAddress === poolAddress) || mockPools[0];
	}
	return mockPools;
};

export const getMockWalletBalances = (): WalletBalance[] => {
	return mockWalletBalances;
};

export const getMockLiquidityPositions = (): LiquidityPosition[] => {
	return mockLiquidityPositions;
};
