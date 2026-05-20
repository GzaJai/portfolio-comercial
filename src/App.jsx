import DotGrid from "./components/DotGrid";
import TopNavBar from "./components/TopNavBar";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <body className="w-[80%] mx-auto bg-background text-on-background font-body-md antialiased selection:bg-secondary-fixed selection:text-on-secondary-fixed relative z-0">
      <DotGrid />
      <TopNavBar />
      <main className="relative z-10">
        <HeroSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </body>
  );
}
