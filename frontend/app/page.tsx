import CallToAction from "@/components/web/cta";
import FaqsSection from "@/components/web/faqs";
import FeaturesSection from "@/components/web/features";
import Footer from "@/components/web/footer";
import HeroSection from "@/components/web/hero";
import HeroFluidDemo from "@/components/web/hero-fluid-demo";
import HowItWorksSection from "@/components/web/how-it-works";
import LogoCloud from "@/components/web/logo-cloud";

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* Exact copy of the Fluid Blob demo (centered, "Morphic Dreams") */}
      <HeroFluidDemo />
      <LogoCloud />
      <FeaturesSection />
      <HowItWorksSection />
      <FaqsSection />
      <CallToAction />
      <Footer />
    </>
  );
}
