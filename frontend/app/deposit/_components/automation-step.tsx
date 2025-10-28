'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export function AutomationStep() {
	const router = useRouter()
	const [enabled, setEnabled] = useState(false)
	const [interval, setInterval] = useState(2)
	const [cooldown, setCooldown] = useState(10)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		fetch('/api/agents/automation/status')
			.then((r) => r.json())
			.then((j) => {
				setEnabled(!!j.enabled)
				if (j.intervalMinutes) setInterval(j.intervalMinutes)
				if (j.cooldownMinutes) setCooldown(j.cooldownMinutes)
			})
			.catch(() => {})
	}, [])

	async function onStart() {
		try {
			setLoading(true)
			// Start agents (hourly loop) first, then enable automation (2-min tick)
			await fetch('/api/agents/start', { method: 'POST' })
			const res = await fetch('/api/agents/automation/start', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ intervalMinutes: interval, cooldownMinutes: cooldown }),
			})
			const j = await res.json()
			if (j.success !== false) {
				setEnabled(true)
				toast.success('Automation enabled')
				router.push('/dashboard')
			} else {
				toast.error('Failed to enable automation')
			}
		} finally {
			setLoading(false)
		}
	}

	async function onStop() {
		try {
			setLoading(true)
			await fetch('/api/agents/automation/stop', { method: 'POST' })
			await fetch('/api/agents/stop', { method: 'POST' })
			setEnabled(false)
			toast.success('Automation disabled')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Enable Automation</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid grid-cols-2 gap-3">
					<div className="space-y-1">
						<Label htmlFor="interval">Interval (minutes)</Label>
						<Input
							id="interval"
							type="number"
							value={interval}
							onChange={(e) => setInterval(Number(e.target.value))}
							min={1}
						/>
					</div>
					<div className="space-y-1">
						<Label htmlFor="cooldown">Cooldown (minutes)</Label>
						<Input
							id="cooldown"
							type="number"
							value={cooldown}
							onChange={(e) => setCooldown(Number(e.target.value))}
							min={1}
						/>
					</div>
				</div>

				<div className="flex gap-2">
					{!enabled ? (
						<Button onClick={onStart} disabled={loading} className="flex-1">
							{loading ? 'Enabling…' : 'Enable Automation'}
						</Button>
					) : (
						<Button
							onClick={onStop}
							disabled={loading}
							variant="outline"
							className="flex-1"
						>
							{loading ? 'Disabling…' : 'Disable Automation'}
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	)
}
