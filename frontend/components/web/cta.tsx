import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center bg-[#FFFFE3] rounded-3xl py-16 px-8 md:py-20 md:px-12">
          <h2 className="font-heading text-balance text-5xl font-semibold tracking-tighter md:text-[80px]">
            Join the Autonomous Liquidity Revolution
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Be among the first to experience AI-powered liquidity management on
            Somnia. Multi-agent orchestration that maximizes your capital
            efficiency.
          </p>

          <form action="" className="mx-auto mt-10 max-w-md lg:mt-12">
            <div className="bg-background has-[input:focus]:ring-muted relative grid grid-cols-[1fr_auto] items-center rounded-full border pr-3 shadow shadow-zinc-950/5 has-[input:focus]:ring-2">
              <input
                placeholder="name@email.com"
                className="h-14 w-full bg-transparent px-6 text-base focus:outline-none"
                type="email"
              />

              <div>
                <Button
                  aria-label="submit"
                  size="lg"
                  className="text-base font-medium px-6 py-2 rounded-full"
                >
                  <span>Join Waitlist</span>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
