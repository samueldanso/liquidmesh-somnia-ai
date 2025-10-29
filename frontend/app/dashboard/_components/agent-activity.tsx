'use client'

import { Activity, Brain, Zap, Clock, AlertCircle, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useAgentThoughts } from '@/hooks/use-agent-data'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'

const AGENT_ICONS = {
	watcher: Activity,
	strategist: Brain,
	executor: Zap,
}

const AGENT_COLORS = {
	watcher: 'text-blue-500',
	strategist: 'text-purple-500',
	executor: 'text-green-500',
}

export function AgentActivity() {
	const { data: thoughts = [], isLoading, isError, error } = useAgentThoughts()

	// Poll latest adapter tx hash
	const { data: latestTx } = useQuery({
		queryKey: ['latest-adapter-tx'],
		queryFn: async () => {
			const res = await fetch('/api/agents/tx/latest')
			const json = await res.json()
			return json?.txHash as string | null
		},
		refetchInterval: 5000,
	})

	const recentThoughts = thoughts.slice(0, 10)

	return (
		<Card>
			<CardHeader>
				<CardTitle>Agent Activity Feed</CardTitle>
				<CardDescription>
					Real-time monitoring of agent decisions and actions
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-3">
					{/* Latest Adapter Transaction */}
					{latestTx && (
						<div className="flex items-start gap-4 p-3 border rounded-lg bg-green-50 dark:bg-green-950/20">
							<Zap className="size-4 mt-0.5 text-green-500" />
							<div className="flex-1 space-y-1">
								<div className="flex items-center gap-2">
									<span className="text-sm font-medium">Executor</span>
									<Badge
										variant="outline"
										className="text-xs bg-green-100 dark:bg-green-900"
									>
										Router TX
									</Badge>
								</div>
								<p className="text-sm text-muted-foreground">
									Agent executed Somnia V2 adapter transaction
								</p>
								<a
									href={`https://shannon-explorer.somnia.network/tx/${latestTx}`}
									target="_blank"
									rel="noreferrer"
									className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
								>
									{latestTx.slice(0, 10)}...{latestTx.slice(-8)}
									<ExternalLink className="size-3" />
								</a>
							</div>
							<div className="flex items-center gap-1 text-xs text-muted-foreground">
								<Clock className="size-3" />
								Just now
							</div>
						</div>
					)}

					{isLoading && (
						<>
							{[...Array(5)].map((_, i) => (
								<div
									key={i}
									className="flex items-start gap-4 p-3 border rounded-lg"
								>
									<Skeleton className="size-4 mt-0.5 rounded" />
									<div className="flex-1 space-y-2">
										<div className="flex items-center gap-2">
											<Skeleton className="h-4 w-20" />
											<Skeleton className="h-4 w-12" />
										</div>
										<Skeleton className="h-3 w-full" />
										<Skeleton className="h-3 w-3/4" />
									</div>
									<Skeleton className="h-3 w-16" />
								</div>
							))}
						</>
					)}

					{isError && (
						<div className="flex flex-col items-center justify-center py-8 text-center">
							<AlertCircle className="size-8 text-destructive mb-2" />
							<p className="text-sm text-muted-foreground">
								{error?.message || 'Failed to load agent activity'}
							</p>
						</div>
					)}

					{!isLoading && !isError && recentThoughts.length === 0 && !latestTx && (
						<div className="text-center py-8 text-muted-foreground">
							No agent activity yet
						</div>
					)}

					{recentThoughts.map((thought) => {
						const Icon =
							AGENT_ICONS[thought.agent as keyof typeof AGENT_ICONS] || Activity
						const color =
							AGENT_COLORS[thought.agent as keyof typeof AGENT_COLORS] ||
							'text-gray-500'

						return (
							<div
								key={thought.id}
								className="flex items-start gap-4 p-3 border rounded-lg hover:bg-accent/50 transition-colors"
							>
								<Icon className={`size-4 mt-0.5 ${color}`} />

								<div className="flex-1 space-y-1">
									<div className="flex items-center gap-2">
										<span className="text-sm font-medium capitalize">
											{thought.agent}
										</span>
										<Badge variant="outline" className="text-xs">
											{thought.tool_calls?.length || 0} tools
										</Badge>
									</div>
									<p className="text-sm text-muted-foreground line-clamp-2">
										{thought.text || 'Processing...'}
									</p>
								</div>

								<div className="flex items-center gap-1 text-xs text-muted-foreground">
									<Clock className="size-3" />
									{formatDistanceToNow(new Date(thought.created_at), {
										addSuffix: true,
									})}
								</div>
							</div>
						)
					})}
				</div>
			</CardContent>
		</Card>
	)
}
