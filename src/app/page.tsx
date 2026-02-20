import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import WorkflowTimeline from "@/components/sections/WorkflowTimeline";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black overflow-hidden">
      <Hero />
      <About />
      <Services />
      <WorkflowTimeline />
      <WhyChooseUs />
      <Contact />
      <Footer />
    </main>
  );
}