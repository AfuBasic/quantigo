import { Navbar } from '@/components/marketing/Navbar';
import { HeroSection } from '@/components/marketing/HeroSection';
import { ProblemSection } from '@/components/marketing/ProblemSection';
import { HowItWorksSection } from '@/components/marketing/HowItWorksSection';
import { BenefitsSection } from '@/components/marketing/BenefitsSection';
import { InventoryFlowSection } from '@/components/marketing/InventoryFlowSection';
import { AudienceSection } from '@/components/marketing/AudienceSection';
import { ComparisonSection } from '@/components/marketing/ComparisonSection';
import { VisionSection } from '@/components/marketing/VisionSection';
import { CtaSection } from '@/components/marketing/CtaSection';
import { Footer } from '@/components/marketing/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <BenefitsSection />
        <InventoryFlowSection />
        <AudienceSection />
        <ComparisonSection />
        <VisionSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

