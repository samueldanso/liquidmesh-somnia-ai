import CallToAction from '@/components/web/cta'
import FaqsSection from '@/components/web/faqs'
import FeaturesSection from '@/components/web/features'
import Footer from '@/components/web/footer'
import HeroFluidDemo from '@/components/web/hero-fluid-demo'
import HowItWorksSection from '@/components/web/how-it-works'
import LogoCloud from '@/components/web/logo-cloud'

export default function Home() {
	return (
		<>
			{/* Fluid blob hero (includes its own site header) */}
			<HeroFluidDemo />
			<LogoCloud />
			<FeaturesSection />
			<HowItWorksSection />
			<FaqsSection />
			<CallToAction />
			<Footer />
		</>
	)
}
