import { NextResponse } from 'next/server'

const AGENTS_API_URL = process.env.NEXT_PUBLIC_AGENTS_API_URL || 'http://localhost:8000'

export async function GET() {
	try {
		const response = await fetch(`${AGENTS_API_URL}/positions`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'no-store',
		})

		if (!response.ok) {
			throw new Error(`Agents API error: ${response.status}`)
		}

		const data = await response.json()
		return NextResponse.json(data)
	} catch (error) {
		console.error('API Route Error:', error)
		return NextResponse.json({ error: 'Failed to fetch liquidity positions' }, { status: 500 })
	}
}
