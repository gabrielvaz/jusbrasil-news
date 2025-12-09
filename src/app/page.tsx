
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { SourcesSection } from "@/components/landing/sources-section";
import { AudienceSection } from "@/components/landing/audience-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FAQSection } from "@/components/landing/faq-section";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <HeroSection />
      <HowItWorks />
      <SourcesSection />
      <AudienceSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
