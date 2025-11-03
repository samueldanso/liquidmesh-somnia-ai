"use client";

import Link from "next/link";
import { LavaLamp } from "@/components/ui/fluid-blob";
import { Button } from "../ui/button";

export function CallToAction() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl py-16 px-8 md:py-20 md:px-12">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <LavaLamp />
          </div>
          <div className="flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mix-blend-exclusion text-white whitespace-nowrap">
              Join the Autonomous Liquidity Revolution
            </h1>
            <p className="mt-4 text-lg md:text-xl text-center text-white mix-blend-exclusion max-w-2xl leading-relaxed">
              Experience AI-powered liquidity management on Somnia. Multi-agent
              orchestration that maximizes your capital efficiency.
            </p>
          </div>
          <div className="mt-10 lg:mt-12">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="text-base font-medium px-8 py-3 rounded-full bg-foreground text-background hover:bg-foreground/90"
              >
                Start earning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
