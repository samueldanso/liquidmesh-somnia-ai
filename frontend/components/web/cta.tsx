import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LavaLamp } from "@/components/ui/fluid-blob";

export default function CallToAction() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl py-16 px-8 md:py-20 md:px-12">
          {/* Fluid blobs background */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <LavaLamp />
          </div>
          {/* Dynamic layered text */}
          <div className="text-center">
            {/* Base (visible on white) */}
            <h2 className="font-heading text-balance text-5xl font-semibold tracking-tighter md:text-[80px] text-zinc-900">
              Join the Autonomous Liquidity Revolution
            </h2>
            <h2
              aria-hidden
              className="pointer-events-none absolute inset-x-8 md:inset-x-12 top-16 md:top-20 font-heading text-balance text-5xl font-semibold tracking-tighter md:text-[80px] mix-blend-exclusion text-white"
            >
              Join the Autonomous Liquidity Revolution
            </h2>
            {/* Subtext */}
            <p className="mt-6 text-lg text-zinc-800">
              Be among the first to experience AI-powered liquidity management on
              Somnia. Multi-agent orchestration that maximizes your capital
              efficiency.
            </p>
            <p
              aria-hidden
              className="pointer-events-none absolute inset-x-8 md:inset-x-12 mt-6 text-lg mix-blend-exclusion text-white"
              style={{ top: "calc(50% - 10px)" }}
            >
              Be among the first to experience AI-powered liquidity management on
              Somnia. Multi-agent orchestration that maximizes your capital
              efficiency.
            </p>
          </div>

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
  );
}
