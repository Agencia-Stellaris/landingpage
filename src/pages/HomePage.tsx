import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "../components/sections/Hero";
import { Stats } from "../components/sections/Stats";
import { AboutUs } from "../components/sections/AboutUs";
import { Services } from "../components/sections/Services";
import { WhyUs } from "../components/sections/WhyUs";
import { Process } from "../components/sections/Process";
import { ContactCTA } from "../components/sections/ContactCTA";
import { useLenis } from "../contexts/LenisContext";

export default function HomePage() {
  const { hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (!hash) return;
    // Pre-rAF guard: confirms the target exists in the current synchronous DOM.
    // The rAF then waits one frame so layout/paint is settled before scrolling.
    const el = document.querySelector(hash);
    if (!el) return;
    const id = requestAnimationFrame(() => {
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: 0 });
      else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
    });
    return () => cancelAnimationFrame(id);
  }, [hash, lenis]);

  return (
    <>
      <Hero />
      <Stats />
      <AboutUs />
      <Services />
      <WhyUs />
      <Process />
      <ContactCTA />
    </>
  );
}
