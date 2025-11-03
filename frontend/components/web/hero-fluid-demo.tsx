'use client'

import { LavaLamp } from '@/components/ui/fluid-blob'
import { HeroHeader } from '@/components/web/header'

export default function HeroFluidDemo() {
	return (
		<>
			<HeroHeader />
			<section className="relative flex h-[80vh] w-full overflow-hidden">
				{/* Fluid background */}
				<div className="pointer-events-none absolute inset-0 -z-10">
					<LavaLamp />
				</div>

				{/* Bottom-left aligned content */}
				<div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 md:pb-28">
					<div className="flex flex-col items-start justify-end text-left">
						{/* Dynamic liquid-glass badge (base + blend overlay) */}
						<div className="relative mb-6 inline-block">
							{/* Base badge visible on white background */}
							<span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-white/70 text-zinc-900 shadow-sm backdrop-blur-md ring-1 ring-black/10">
								Start earning
								<span aria-hidden>→</span>
							</span>
							{/* Overlay badge that adapts over blobs */}
							<span
								aria-hidden
								className="pointer-events-none absolute inset-0 inline-flex items-center justify-start rounded-full px-4 py-2 text-sm font-medium mix-blend-exclusion text-white"
							>
								Start earning <span className="ml-1">→</span>
							</span>
						</div>
						<h1 className="text-6xl md:text-8xl font-bold tracking-tight mix-blend-exclusion text-white whitespace-nowrap">
							Autonomous Liquidity. Coordinated by AI
						</h1>
						<p className="mt-4 max-w-2xl text-lg md:text-xl text-left text-white mix-blend-exclusion leading-relaxed">
							LiquidMesh is a decentralized, non-custodial liquidity protocol on
							Somnia. Coordinated AI agents autonomously manage your concentrated
							liquidity — maximizing capital efficiency and yield with zero manual
							work.
						</p>
					</div>
				</div>
			</section>
		</>
	)
}
