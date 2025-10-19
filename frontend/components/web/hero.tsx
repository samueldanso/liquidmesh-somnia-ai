"use client";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { TextEffect } from "@/components/ui/text-effect";
import { HeroHeader } from "@/components/web/header";

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden [--color-primary-foreground:var(--color-white)] [--color-primary:var(--color-green-600)]">
        <section className="before:bg-muted border-e-foreground relative overflow-hidden before:absolute before:inset-1 before:h-[calc(100%-8rem)] before:rounded-2xl sm:before:inset-2 md:before:rounded-[2rem] lg:before:h-[calc(100%-14rem)]">
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

              {/* Main Headline */}
              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h1"
                className="font-heading text-balance text-5xl font-semibold tracking-tighter md:text-[80px] text-left"
              >
                Autonomous Liquidity. Coordinated by AI
              </TextEffect>

              {/* Sub-headline */}
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="p"
                className="mt-6 max-w-2xl text-pretty text-lg text-left"
              >
                LiquidMesh is a decentralized, non-custodial liquidity protocol
                on Somnia. Coordinated AI agents autonomously manage your
                concentrated liquidity — maximizing capital efficiency and yield
                with zero manual work.
              </TextEffect>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
