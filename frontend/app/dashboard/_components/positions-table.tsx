'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useLiquidityPositions } from '@/hooks/use-agent-data'

export function PositionsTable() {
	const { data: positions, isLoading } = useLiquidityPositions()

	return (
		<Card>
			<CardHeader>
				<CardTitle>Your Liquidity Positions</CardTitle>
				<CardDescription>Active concentrated liquidity positions on Somnia</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-3">
					{isLoading && (
						<div className="text-center py-8 text-muted-foreground">
							Loading positions...
						</div>
					)}

					{!isLoading && (!positions || positions.length === 0) && (
						<div className="text-center py-8 text-muted-foreground">
							No active positions yet
						</div>
					)}

					{positions?.map((position, index) => (
						<div
							key={index}
							className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
						>
							<div className="flex items-center gap-4">
								<div className="flex items-center gap-2">
									<div className="size-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full" />
									<div>
										<div className="font-medium">
											{position.token0Symbol}/{position.token1Symbol}
										</div>
										<div className="text-sm text-muted-foreground">
											Range: [{position.rangeLower}, {position.rangeUpper}]
										</div>
									</div>
								</div>
							</div>

							<div className="flex items-center gap-6">
								<div className="text-right">
									<div className="font-medium">
										$
										{position.liquidityUSD.toLocaleString(undefined, {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										})}
									</div>
									<div className="text-sm text-muted-foreground">Liquidity</div>
								</div>

								<div className="text-right">
									<div className="font-medium text-green-500">
										{position.apy.toFixed(1)}%
									</div>
									<div className="text-sm text-muted-foreground">APY</div>
								</div>

								<div className="text-right">
									<div className="font-medium">
										${position.feesEarnedUSD.toLocaleString()}
									</div>
									<div className="text-sm text-muted-foreground">Fees Earned</div>
								</div>

								<Badge
									variant={position.inRange ? 'default' : 'destructive'}
									className={
										position.inRange
											? 'bg-green-500/10 text-green-500'
											: 'bg-red-500/10 text-red-500'
									}
								>
									{position.inRange ? 'In Range' : 'Out of Range'}
								</Badge>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
