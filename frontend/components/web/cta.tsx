import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CallToAction() {
	return (
		<section className="py-16 md:py-32">
			<div className="mx-auto max-w-7xl px-6">
				<div className="text-center bg-[#FFFFE3] rounded-3xl py-16 px-8 md:py-20 md:px-12">
					<h2 className="font-heading text-balance text-5xl font-semibold tracking-tighter md:text-[80px] text-foreground">
						Join the Autonomous Liquidity Revolution
					</h2>
					<p className="mt-6 text-lg text-muted-foreground">
						Be among the first to experience AI-powered liquidity management on Somnia.
						Multi-agent orchestration that maximizes your capital efficiency.
					</p>

					<div className="mt-10 lg:mt-12">
						<Link href="/dashboard">
							<Button
								size="lg"
								className="text-base font-medium px-8 py-3 rounded-full bg-foreground text-background hover:bg-foreground/90"
							>
								Launch LiquidMesh
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
