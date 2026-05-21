import DotGrid from "./components/DotGrid";
import MobileDotGrid from "./components/MobileDotGrid";
import TopNavBar from "./components/TopNavBar";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="w-full md:w-[80%] mx-auto relative z-0">
      <DotGrid />
      <MobileDotGrid />
      <TopNavBar />
      <main className="relative z-10">
        <HeroSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
