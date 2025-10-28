import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	const body = await request.json().catch(() => ({} as any))
	try {
		const res = await fetch('http://localhost:8000/agents/automation/start', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(body),
		})
		const json = await res.json()
		return NextResponse.json(json)
	} catch (e: any) {
		return NextResponse.json({ success: false }, { status: 200 })
	}
}
