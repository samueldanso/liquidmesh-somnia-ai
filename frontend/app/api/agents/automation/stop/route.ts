import { NextResponse } from 'next/server'

export async function POST() {
	try {
		const res = await fetch('http://localhost:8000/agents/automation/stop', { method: 'POST' })
		const json = await res.json()
		return NextResponse.json(json)
	} catch (e: any) {
		return NextResponse.json({ success: false }, { status: 200 })
	}
}
