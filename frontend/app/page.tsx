import CallToAction from '@/components/web/cta'
import FaqsSection from '@/components/web/faqs'
import FeaturesSection from '@/components/web/features'
import Footer from '@/components/web/footer'
import HeroFluidDemo from '@/components/web/hero-fluid-demo'
import HowItWorksSection from '@/components/web/how-it-works'
import LogoCloud from '@/components/web/logo-cloud'
import HeroMorphic from '@/components/web/hero-morphic'
import CtaMorphic from '@/components/web/cta-morphic'

export default function Home() {
	return (
		<>
			{/* Morphic Dreams exact demo hero */}
			<HeroMorphic />
			<LogoCloud />
			<FeaturesSection />
			<HowItWorksSection />
			<FaqsSection />
			{/* Morphic Dreams exact demo CTA */}
			<CtaMorphic />
			<Footer />
		</>
	)
}
