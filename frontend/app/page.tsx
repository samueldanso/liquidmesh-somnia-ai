import FaqsSection from '@/components/web/faqs'
import FeaturesSection from '@/components/web/features'
import Footer from '@/components/web/footer'
import HowItWorksSection from '@/components/web/how-it-works'
import LogoCloud from '@/components/web/logo-cloud'
import { CallToAction } from '@/components/web/cta'
import Hero from '@/components/web/hero'

export default function Home() {
	return (
		<>
			<Hero />
			<LogoCloud />
			<FeaturesSection />
			<HowItWorksSection />
			<FaqsSection />
			<CallToAction />
			<Footer />
		</>
	)
}
