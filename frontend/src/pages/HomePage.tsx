import FAQ from "@/components/home/FAQ";
import Hero from "@/components/home/Hero";
import Footer from "@/components/common/Footer";
import Features from "@/components/home/Features";
import CTABanner from "@/components/home/CTABanner";
import HowItWorks from "@/components/home/HowitWorks";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-[#080808] text-surface-100">
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <Testimonials />
          <FAQ />
          <CTABanner />
        </main>
        <Footer />
      </div>
    </>
  );
}
