"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

const steps = [
  { title: "Order Received", desc: "Client Manager receives and digitizes the work order." },
  { title: "Quotation & Processing", desc: "Processor builds the bid. Awaits client approval." },
  { title: "Crew Assigned", desc: "Vendor Manager dispatches the perfect crew." },
  { title: "Work in Progress", desc: "Crew uploads real-time before & after evidence." },
  { title: "Quality Assurance", desc: "Vendor Manager reviews and approves the job." },
];

export default function WorkflowTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom 80%",
        scrub: 1.5,
      },
    });

    tl.to(lineRef.current, { height: "100%", ease: "none" })
      .to(glowRef.current, { top: "100%", ease: "none" }, "<");

    const items = gsap.utils.toArray<HTMLElement>(".timeline-item");
    items.forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, scale: 0.9, filter: "blur(10px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.5,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section id="workflow" className="py-20 md:py-40 bg-black relative overflow-hidden" ref={containerRef}>
      
      {/* Top Gradient for blending */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />

      <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
        <h2 className="text-4xl md:text-7xl font-bold mb-16 md:mb-32 text-center tracking-tighter">
          Intelligent <span className="text-cyan-500">Workflow</span>
        </h2>

        {/* Timeline Container */}
        <div className="relative pl-8 md:pl-0">
          
          {/* Vertical Lines - Centered on MD, Left on Mobile */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" />
          
          <div 
            ref={lineRef} 
            className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-cyan-400 -translate-x-1/2 shadow-[0_0_20px_rgba(6,182,212,0.8)] h-0 overflow-visible" 
          >
            <div ref={glowRef} className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full shadow-[0_0_30px_rgba(6,182,212,1)] z-20" />
          </div>

          {steps.map((step, index) => (
            <div key={index} className={`timeline-item relative flex flex-col md:flex-row items-start md:items-center mb-16 md:mb-24 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
              
              <div className="hidden md:block w-1/2" />
              
              {/* Dot: Left on Mobile, Center on Desktop */}
              <div className="absolute left-4 md:left-1/2 w-6 h-6 md:w-8 md:h-8 bg-black border border-cyan-500/50 rounded-full -translate-x-1/2 z-10 flex items-center justify-center mt-1 md:mt-0">
                 <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-cyan-500 rounded-full" />
              </div>
              
              <div className={`w-full md:w-1/2 pl-10 md:pl-0 ${index % 2 === 0 ? "md:pl-16" : "md:pr-16"}`}>
                <div className="p-6 md:p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors duration-500 group">
                  <h3 className="text-lg md:text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{step.title}</h3>
                  <p className="text-sm md:text-base text-gray-400">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}