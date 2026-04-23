import "./lib/firebase"; // Initialize Firebase + Analytics
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { SmoothScroll } from "./components/layout/SmoothScroll";
import { Hero } from "./components/sections/Hero";
import { Stats } from "./components/sections/Stats";
import { AboutUs } from "./components/sections/AboutUs";
import { Services } from "./components/sections/Services";
import { WhyUs } from "./components/sections/WhyUs";
import { Process } from "./components/sections/Process";
// import { Portfolio } from "./components/sections/Portfolio";
// import { Testimonials } from "./components/sections/Testimonials";
// import { Blog } from "./components/sections/Blog";
import { ContactCTA } from "./components/sections/ContactCTA";

export default function App() {
  return (
    <SmoothScroll>
      {/* Accessibility: skip to main content */}
      <a href="#main-content" className="skip-link">
        Ir al contenido principal
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <Stats />
        <AboutUs />
        <Services />
        <WhyUs />
        <Process />
        {/* <Portfolio /> */}
        {/* <Testimonials /> */}
        {/* <Blog /> */}
        <ContactCTA />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
