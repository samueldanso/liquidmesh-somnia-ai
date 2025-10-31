'use client'

import type React from 'react'
import { ThemeProvider } from 'next-themes'
import AppFooter from '@/components/app-footer'
import AppHeader from '@/components/app-header'
import { ProtectedRoute } from '@/components/protected-route'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<ProtectedRoute>
			<ThemeProvider
				attribute="class"
				defaultTheme="dark"
				enableSystem={false}
				storageKey="liquidmesh-app-theme"
			>
				<div>
					<AppHeader />
					<main className="container mx-auto px-4 py-8">{children}</main>
					<AppFooter />
				</div>
			</ThemeProvider>
		</ProtectedRoute>
	)
}
