import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HomeImpactSection from "@/components/landing/HomeImpactSection";
import HomeCtaSection from "@/components/landing/HomeCtaSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <HomeImpactSection />
      <Features />
      <HomeCtaSection />
      <Footer />
    </main>
  );
}
