'use client'

import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
	children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { authenticated, ready } = usePrivy()
	const router = useRouter()

	useEffect(() => {
		// Only redirect once Privy is ready and user is not authenticated
		if (ready && !authenticated) {
			router.push('/')
		}
	}, [ready, authenticated, router])

	// Show loading state while Privy initializes
	if (!ready) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="flex flex-col items-center gap-4">
					<Loader2 className="size-8 animate-spin text-primary" />
					<p className="text-sm text-muted-foreground">Loading...</p>
				</div>
			</div>
		)
	}

	// Show loading state while redirecting unauthenticated users
	if (!authenticated) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="flex flex-col items-center gap-4">
					<Loader2 className="size-8 animate-spin text-primary" />
					<p className="text-sm text-muted-foreground">Redirecting...</p>
				</div>
			</div>
		)
	}

	// User is authenticated, render the protected content
	return <>{children}</>
}
