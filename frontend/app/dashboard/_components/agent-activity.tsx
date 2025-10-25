'use client'

import { Activity, Brain, Zap, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAgentThoughts } from '@/hooks/use-agent-data'
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
	const { data: thoughts, isLoading } = useAgentThoughts()

	const recentThoughts = thoughts?.slice(0, 10) || []

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
					{isLoading && (
						<div className="text-center py-8 text-muted-foreground">
							Loading activity...
						</div>
					)}

					{!isLoading && recentThoughts.length === 0 && (
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
