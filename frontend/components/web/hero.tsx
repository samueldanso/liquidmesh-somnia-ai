'use client'

import { LavaLamp } from '@/components/ui/fluid-blob'
import { HeroHeader } from '@/components/web/header'

export default function Hero() {
	return (
		<>
			<HeroHeader />
			<section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
				<div className="pointer-events-none absolute inset-0 -z-10">
					<LavaLamp />
				</div>
				<div className="flex flex-col items-center justify-center text-center px-4">
					<h1 className="text-6xl md:text-8xl font-bold tracking-tight mix-blend-exclusion text-white whitespace-nowrap">
						AI Orchestration Layer
					</h1>
					<p className="mt-4 text-lg md:text-xl text-center text-white mix-blend-exclusion max-w-2xl leading-relaxed">
						Autonomous liquidity management for maximum capital efficiency.
					</p>
				</div>
			</section>
		</>
	)
}
