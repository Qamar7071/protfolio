import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import MarqueeBand from "@/components/sections/MarqueeBand";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import Services from "@/components/sections/Services";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import IntroProvider from "@/components/ui/IntroProvider";
import SmoothScroll from "@/components/fx/SmoothScroll";
import Cursor from "@/components/fx/Cursor";
import ScrollProgress from "@/components/fx/ScrollProgress";

export default function HomePage() {
  return (
    <IntroProvider>
      <SmoothScroll />
      <Cursor />
      <ScrollProgress />
      <div className="grain" aria-hidden="true" />

      <Navbar />
      <Hero />
      <MarqueeBand />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Services />
      <Experience />
      <Contact />
      <Footer />
    </IntroProvider>
  );
}
