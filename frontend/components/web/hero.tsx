"use client";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { LavaLamp } from "@/components/ui/fluid-blob";
import { TextEffect } from "@/components/ui/text-effect";
import { HeroHeader } from "@/components/web/header";

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden [--color-primary-foreground:var(--color-white)] [--color-primary:var(--color-green-600)]">
        {/* Remove prior gray rounded overlay; keep a clean canvas for the fluid blobs */}
        <section className="relative overflow-hidden">
          {/* Liquid blobs background */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <LavaLamp />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-48 lg:pt-64">
            <div className="relative z-10 max-w-4xl text-left">
              {/* Badge/CTA Button */}
              <Badge
                variant="secondary"
                className="mb-6 inline-flex items-center gap-2 bg-gray-100 text-gray-900 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium"
              >
                Start optimizing →
                <ArrowRightIcon className="size-3" />
              </Badge>

              {/* Main Headline (base + blend overlay for dynamic readability) */}
              <div className="relative">
                {/* Base text (visible on white background) */}
                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h1"
                  className="font-heading text-balance text-5xl font-semibold tracking-tighter md:text-[80px] text-left text-zinc-900"
                >
                  Autonomous Liquidity. Coordinated by AI
                </TextEffect>
                {/* Overlay text that adapts over blobs */}
                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h1"
                  aria-hidden
                  className="pointer-events-none absolute inset-0 font-heading text-balance text-5xl font-semibold tracking-tighter md:text-[80px] text-left mix-blend-exclusion text-white"
                >
                  Autonomous Liquidity. Coordinated by AI
                </TextEffect>
              </div>

              {/* Sub-headline (base + blend overlay) */}
              <div className="relative">
                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="mt-6 max-w-2xl text-pretty text-lg text-left text-zinc-800"
                >
                  LiquidMesh is a decentralized, non-custodial liquidity protocol
                  on Somnia. Coordinated AI agents autonomously manage your
                  concentrated liquidity — maximizing capital efficiency and yield
                  with zero manual work.
                </TextEffect>
                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  aria-hidden
                  className="pointer-events-none absolute inset-0 mt-6 max-w-2xl text-pretty text-lg text-left mix-blend-exclusion text-white"
                >
                  LiquidMesh is a decentralized, non-custodial liquidity protocol
                  on Somnia. Coordinated AI agents autonomously manage your
                  concentrated liquidity — maximizing capital efficiency and yield
                  with zero manual work.
                </TextEffect>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
