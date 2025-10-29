import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const res = await fetch('http://localhost:8000/agents/tx/latest', {
			headers: { 'content-type': 'application/json' },
			cache: 'no-store',
		})
		const json = await res.json()
		return NextResponse.json(json)
	} catch (e: any) {
		return NextResponse.json({ txHash: null }, { status: 200 })
	}
}
