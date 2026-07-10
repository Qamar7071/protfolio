import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";

/* -------------------------------------------------------------------------- */
/*  HOME PAGE                                                                 */
/*                                                                            */
/*  Note: The sections below are TEMPORARY placeholders so the Navbar's       */
/*  active-section tracking works while we build each real section.           */
/*  Each placeholder will be replaced step-by-step in upcoming steps:         */
/*    Step 3: Hero        (#home)                                             */
/*    Step 4: About       (#about)                                            */
/*    Step 5: Skills      (#skills)                                           */
/*    Step 6: Projects    (#projects)                                         */
/*    Step 7: Experience  (#experience)                                       */
/*    Step 8: Contact     (#contact)                                          */
/*    Step 9: Footer                                                          */
/* -------------------------------------------------------------------------- */

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ============================ HERO ============================ */}
      <Hero />

      {/* ============================ ABOUT (placeholder) =========================== */}
      <PlaceholderSection
        id="about"
        step="Step 4"
        heading="About"
        description="A bit about me — background, story, and what I care about as an engineer."
      />

      {/* ============================ SKILLS (placeholder) ========================== */}
      <PlaceholderSection
        id="skills"
        step="Step 5"
        heading="Skills"
        description="Grouped skill cards — AI/ML, Backend, Frontend, DevOps."
        tinted
      />

      {/* ============================ PROJECTS ======================== */}
      <Projects />

      {/* ============================ SERVICES ==================== */}
      <Services />

      {/* ============================ EXPERIENCE (placeholder) ==================== */}
      <PlaceholderSection
        id="experience"
        step="Step 8"
        heading="Experience"
        description="Work timeline with roles, companies, and highlights."
      />

      {/* ============================ CONTACT (placeholder) ========================= */}
      <PlaceholderSection
        id="contact"
        step="Step 8"
        heading="Contact"
        description="Contact form with React Hook Form + Zod validation, plus social links."
      />

      {/* ============================ FOOTER (placeholder) ========================== */}
      <footer className="bg-dark-900 text-white py-8 text-center text-sm">
        <p className="text-dark-400">
          Footer coming in Step 9 · © {new Date().getFullYear()} Qamar
        </p>
      </footer>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Reusable placeholder section (removed once real sections are built)       */
/* -------------------------------------------------------------------------- */
function PlaceholderSection({
  id,
  step,
  heading,
  description,
  tinted = false,
}: {
  id: string;
  step: string;
  heading: string;
  description: string;
  tinted?: boolean;
}) {
  return (
    <section
      id={id}
      className={tinted ? "bg-dark-50" : "bg-white"}
    >
      <div className="container-custom section-padding">
        <div className="max-w-2xl">
          <span className="eyebrow">🚧 {step} placeholder</span>
          <h2 className="section-heading heading-underline mt-1">{heading}</h2>
          <p className="section-subheading">{description}</p>
        </div>
      </div>
    </section>
  );
}