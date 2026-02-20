"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { Activity, ClipboardCheck, Users, HardHat, ShieldCheck } from "lucide-react";

const steps = [
  { 
    title: "Order Received", 
    desc: "Digital intake of work orders via API or manual entry, instantly indexed in our global cloud.",
    icon: Activity 
  },
  { 
    title: "Quotation & Processing", 
    desc: "AI-assisted cost analysis and line-item generation for rapid client approval turnarounds.",
    icon: ClipboardCheck 
  },
  { 
    title: "Crew Dispatch", 
    desc: "Automated vendor matching based on location, performance rating, and availability.",
    icon: Users 
  },
  { 
    title: "Work in Progress", 
    desc: "Real-time field updates with GPS-tagged photo evidence and live status tracking.",
    icon: HardHat 
  },
  { 
    title: "Quality Assurance", 
    desc: "Multi-point inspection and final audit before automated invoice generation.",
    icon: ShieldCheck 
  },
];

export default function WorkflowTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Parallax for the "Ghost UI" Background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const ghostY = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const ghostRotate = useTransform(scrollYProgress, [0, 1], [5, -5]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. The Laser Beam Animation
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

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      id="workflow" 
      ref={containerRef}
      className="py-32 md:py-60 bg-black relative overflow-hidden perspective-[1500px]"
    >
      {/* 1. BLENDING MASKS (Top & Bottom) */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

      {/* 2. GHOST UI PARALLAX (Technical Background) */}
      <motion.div 
        style={{ y: ghostY, rotateX: ghostRotate }}
        className="absolute right-[-5%] top-1/4 w-[400px] md:w-[700px] h-[500px] rounded-[3rem] border border-white/5 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent backdrop-blur-[2px] pointer-events-none hidden lg:block overflow-hidden opacity-40"
      >
        <div className="p-10 space-y-6">
          <div className="flex gap-3">
             <div className="w-3 h-3 rounded-full bg-red-500/20" />
             <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
             <div className="w-3 h-3 rounded-full bg-green-500/20" />
          </div>
          <div className="w-2/3 h-4 bg-white/10 rounded-full" />
          <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="h-32 bg-cyan-500/5 rounded-2xl border border-white/5" />
              <div className="h-32 bg-white/5 rounded-2xl border border-white/5" />
          </div>
          <div className="h-40 bg-white/5 rounded-2xl border border-white/5 animate-pulse" />
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-32"
        >
          <h4 className="text-cyan-500 font-mono text-xs tracking-[0.4em] uppercase mb-4">The Protocol</h4>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white">
            Intelligent <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">Workflow.</span>
          </h2>
        </motion.div>

        {/* 3. THE TIMELINE ENGINE */}
        <div className="relative pl-8 md:pl-0">
          
          {/* Static Gray Track */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />
          
          {/* The Laser Beam (Fills up on scroll) */}
          <div 
            ref={lineRef} 
            className="absolute left-4 md:left-1/2 top-0 w-[1px] bg-gradient-to-b from-cyan-600 to-cyan-400 -translate-x-1/2 shadow-[0_0_25px_rgba(6,182,212,1)] h-0 overflow-visible" 
          >
            {/* The Laser Tip */}
            <div 
              ref={glowRef} 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_40px_rgba(6,182,212,1)] z-20" 
            />
          </div>

          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`timeline-item relative flex flex-col md:flex-row items-start md:items-center mb-32 md:mb-48 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="hidden md:block w-1/2" />
              
              {/* Connector Node */}
              <div className="absolute left-4 md:left-1/2 w-10 h-10 bg-black border border-white/10 rounded-xl -translate-x-1/2 z-10 flex items-center justify-center backdrop-blur-md">
                 <step.icon className="w-5 h-5 text-cyan-500" />
              </div>
              
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? "md:pl-20" : "md:pr-20"}`}
              >
                <div className="relative group p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all duration-700">
                  {/* Subtle Inner Glow */}
                  <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/[0.02] transition-colors rounded-[2rem] pointer-events-none" />
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-cyan-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-base leading-relaxed">
                    {step.desc}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs font-mono text-cyan-500/50 uppercase tracking-widest">
                    <span className="w-8 h-[1px] bg-cyan-500/30" />
                    Phase 0{index + 1}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}