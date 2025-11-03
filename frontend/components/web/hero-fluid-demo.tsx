"use client";

import { LavaLamp } from "@/components/ui/fluid-blob";

export default function HeroFluidDemo() {
  return (
    <section className="relative flex h-[80vh] w-full items-center justify-center overflow-hidden">
      {/* Fluid background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <LavaLamp />
      </div>

      {/* Centered content exactly as provided */}
      <div className="flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mix-blend-exclusion text-white whitespace-nowrap">
          Morphic Dreams
        </h1>
        <p className="mt-4 text-lg md:text-xl text-center text-white mix-blend-exclusion max-w-2xl leading-relaxed">
          Where thoughts take shape and consciousness flows like liquid mercury
          through infinite dimensions.
        </p>
      </div>
    </section>
  );
}
