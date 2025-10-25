'use client'

import { useQuery } from '@tanstack/react-query'
import type { AgentThought, LiquidityPosition, PoolMetrics } from '@/lib/types'

// Fetch agent thoughts via Next.js API route
export function useAgentThoughts(agent?: string) {
	return useQuery({
		queryKey: ['agent-thoughts', agent],
		queryFn: async () => {
			const url = agent ? `/api/thoughts/${agent}` : '/api/thoughts'
			const response = await fetch(url)
			if (!response.ok) throw new Error('Failed to fetch agent thoughts')
			return (await response.json()) as AgentThought[]
		},
		refetchInterval: 5000, // Poll every 5 seconds
		staleTime: 3000,
	})
}

// Fetch liquidity positions via Next.js API route
export function useLiquidityPositions() {
	return useQuery({
		queryKey: ['liquidity-positions'],
		queryFn: async () => {
			const response = await fetch('/api/positions')
			if (!response.ok) throw new Error('Failed to fetch positions')
			return (await response.json()) as LiquidityPosition[]
		},
		refetchInterval: 10000, // Poll every 10 seconds
		staleTime: 5000,
	})
}

// Fetch pool metrics via Next.js API route
export function usePoolMetrics() {
	return useQuery({
		queryKey: ['pool-metrics'],
		queryFn: async () => {
			const response = await fetch('/api/positions/pools')
			if (!response.ok) throw new Error('Failed to fetch pool metrics')
			return (await response.json()) as PoolMetrics[]
		},
		refetchInterval: 15000, // Poll every 15 seconds
		staleTime: 10000,
	})
}

// Calculate total TVL and APY
export function useDashboardStats() {
	const { data: positions } = useLiquidityPositions()
	const { data: pools } = usePoolMetrics()

	const totalTVL = positions?.reduce((sum, pos) => sum + pos.liquidityUSD, 0) || 0
	const avgAPY =
		positions && positions.length > 0
			? positions.reduce((sum, pos) => sum + pos.apy, 0) / positions.length
			: 0
	const activePositions = positions?.filter((pos) => pos.inRange).length || 0

	return {
		totalTVL,
		avgAPY,
		activePositions,
		totalPositions: positions?.length || 0,
		pools: pools || [],
	}
}
