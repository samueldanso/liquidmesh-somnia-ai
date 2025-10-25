'use client'

import { DollarSign, BarChart3, TrendingUp, Network } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDashboardStats } from '@/hooks/use-agent-data'

export function StatsCards() {
	const { totalTVL, avgAPY, activePositions, totalPositions } = useDashboardStats()

	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Value Locked</CardTitle>
					<DollarSign className="size-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						$
						{totalTVL.toLocaleString(undefined, {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}
					</div>
					<p className="text-xs text-muted-foreground">
						Across {totalPositions} position{totalPositions !== 1 ? 's' : ''}
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Active Positions</CardTitle>
					<BarChart3 className="size-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{activePositions}</div>
					<p className="text-xs text-muted-foreground">
						{activePositions === totalPositions
							? 'All in range'
							: `${totalPositions - activePositions} out of range`}
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Average APY</CardTitle>
					<TrendingUp className="size-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						{avgAPY > 0 ? `${avgAPY.toFixed(1)}%` : '-'}
					</div>
					<p className="text-xs text-muted-foreground">
						{avgAPY > 0 ? 'Weighted average' : 'No active positions'}
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Agent Status</CardTitle>
					<Network className="size-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="flex items-center space-x-2">
						<Badge variant="default" className="bg-green-500/10 text-green-500">
							Active
						</Badge>
					</div>
					<p className="text-xs text-muted-foreground mt-1">Monitoring markets</p>
				</CardContent>
			</Card>
		</div>
	)
}
