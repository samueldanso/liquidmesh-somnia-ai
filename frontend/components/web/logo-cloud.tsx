import { InfiniteSlider } from "../ui/infinite-slider";
import { ProgressiveBlur } from "../ui/progressive-blur";

export default function LogoCloud() {
  const protocols = [
    { name: "Somnia", src: "/protocols/somnia.png" },
    { name: "Privy", src: "/protocols/privy.png" },
    { name: "Somnia", src: "/protocols/somnia.png" },
    { name: "Privy", src: "/protocols/privy.png" },
    { name: "Somnia", src: "/protocols/somnia.png" },
    { name: "Privy", src: "/protocols/privy.png" },
  ];

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="group relative m-auto max-w-7xl px-6">
        <div className="flex flex-col items-center">
          <div className="mb-8 text-center">
            <h3 className="font-heading text-foreground text-2xl font-semibold tracking-tight">
              Powered by
            </h3>
          </div>
          <div className="relative w-full py-6">
            <InfiniteSlider speedOnHover={20} speed={60} gap={80}>
              {protocols.map((protocol) => (
                <div key={protocol.name} className="flex">
                  <img
                    className="mx-auto h-8 w-fit opacity-60 transition-opacity hover:opacity-100"
                    src={protocol.src}
                    alt={`${protocol.name} Logo`}
                    height="32"
                    width="auto"
                  />
                </div>
              ))}
            </InfiniteSlider>

            <div className="bg-gradient-to-r from-background absolute inset-y-0 left-0 w-20"></div>
            <div className="bg-gradient-to-l from-background absolute inset-y-0 right-0 w-20"></div>
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
