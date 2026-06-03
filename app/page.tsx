import BackgroundEffects from "@/components/layout/BackgroundEffects";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import MissionControl from "@/components/sections/MissionControl";
import AIPrediction from "@/components/sections/AIPrediction";
import ThreatAnalytics from "@/components/sections/ThreatAnalytics";
import TechEcosystem from "@/components/sections/TechEcosystem";
import GlobalImpact from "@/components/sections/GlobalImpact";
import CaseStudies from "@/components/sections/CaseStudies";
import Partnerships from "@/components/sections/Partnerships";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <BackgroundEffects />
      <Navbar />
      <Hero />
      <MissionControl />
      <AIPrediction />
      <ThreatAnalytics />
      <TechEcosystem />
      <GlobalImpact />
      <CaseStudies />
      <Partnerships />
      <Contact />
      <Footer />
    </main>
  );
}