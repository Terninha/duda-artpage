import GrainOverlay from "@/components/GrainOverlay";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ManifestoSection from "@/components/ManifestoSection";
import WorksSection from "@/components/WorksSection";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <GrainOverlay />
      <Navbar />
      <main>
        <HeroSection />
        <ManifestoSection />
        <WorksSection />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
