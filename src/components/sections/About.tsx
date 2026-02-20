"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Home, CheckCircle2, AlertCircle, ScanLine, Activity, Target } from "lucide-react";

const paragraph = "Chowdhury Global Service LLC operates at the intersection of on-the-ground precision and digital efficiency. We manage assets with unmatched speed, ensuring every property is preserved with the highest standards of quality and transparency.";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // High-performance scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"], // Triggers when the section is in the sweet spot of the screen
  });

  // Smooth out the scroll progress for a "liquid" feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 3D Card Physics
  const cardY = useTransform(smoothProgress, [0, 1], [50, -50]);
  const cardRotate = useTransform(smoothProgress, [0, 1], [10, -10]);

  const words = paragraph.split(" ");

  return (
    <section ref={containerRef} id="about" className="py-32 md:py-60 bg-black relative overflow-hidden">
      
      {/* Background technical atmosphere */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* LEFT: MISSION BRIEFING (Text Engine) */}
        <div className="flex flex-col">
          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="flex items-center gap-4 mb-10"
          >
             <div className="w-10 h-[2px] bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
             <span className="text-cyan-500 font-mono text-xs tracking-[0.4em] uppercase">Phase 01: Core Directive</span>
          </motion.div>

          <div className="flex flex-wrap text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[1.05] perspective-[1000px]">
            {words.map((word, i) => (
              <Word key={i} index={i} total={words.length} progress={smoothProgress}>
                {word}
              </Word>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 grid grid-cols-2 gap-10 border-t border-white/10 pt-12"
          >
            <div className="group">
                <div className="flex items-center gap-3 mb-2">
                    <Target className="w-5 h-5 text-cyan-500" />
                    <span className="text-white font-bold text-lg uppercase tracking-tight">Precision</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                    AI-driven itemization audits ensuring 99.9% billing accuracy.
                </p>
            </div>
            <div className="group">
                <div className="flex items-center gap-3 mb-2">
                    <Activity className="w-5 h-5 text-cyan-500" />
                    <span className="text-white font-bold text-lg uppercase tracking-tight">Velocity</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                    Real-time field sync reduces turnaround time by 40%.
                </p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: 3D SCANNER CARD */}
        <div className="relative h-[500px] md:h-[650px] w-full perspective-[2000px]">
          <motion.div 
            style={{ 
              rotateX: cardRotate, 
              y: cardY, 
              transformStyle: "preserve-3d" 
            }}
            className="w-full h-full rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/10 via-black/40 to-transparent backdrop-blur-2xl p-10 flex flex-col relative shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden group"
          >
            {/* HUD Elements */}
            <div className="flex justify-between items-start relative z-10" style={{ transform: "translateZ(40px)" }}>
              <div className="space-y-1">
                 <div className="text-6xl md:text-8xl font-black text-white tracking-tighter">100<span className="text-3xl text-cyan-500">%</span></div>
                 <div className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-md text-[9px] font-mono text-cyan-400 tracking-[0.2em] inline-block uppercase">System Integrity</div>
              </div>
              <div className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center bg-black/50 shadow-inner">
                <ScanLine className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
            </div>

            {/* THE WORKER DRONE */}
            <div className="flex-1 relative flex items-center justify-center scale-110" style={{ transform: "translateZ(60px)" }}>
               <HolographicWorker />
            </div>

            {/* Technical Metadata Footer */}
            <div className="relative z-10 pt-8 border-t border-white/5 space-y-4" style={{ transform: "translateZ(30px)" }}>
              <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 tracking-widest">
                <span>REPAIR_PROTOCOL_V4</span>
                <span className="text-cyan-500/50">ENC_MODE_AES_256</span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                    <div className="text-xl text-white font-bold tracking-tight">Digital Workflow</div>
                    <div className="text-gray-500 text-xs">Proprietary ERP Engine Active</div>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
                        <span className="text-cyan-400 font-mono text-xs">LIVE_SYNC</span>
                    </div>
                </div>
              </div>
            </div>

            {/* Dynamic Glass Glare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-white/5 opacity-30 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ULTIMATE WORD REVEAL COMPONENT
function Word({ children, index, total, progress }: any) {
  // We calculate a custom range for each word based on its position in the paragraph
  const start = index / total;
  const end = start + 0.15; // Width of the highlight "brush"

  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const y = useTransform(progress, [start, end], [5, 0]);
  const color = useTransform(progress, [start, end], ["#4b5563", "#ffffff"]);
  const glow = useTransform(progress, [start, end], ["0px 0px 0px rgba(6,182,212,0)", "0px 0px 20px rgba(6,182,212,0.3)"]);

  return (
    <span className="relative mr-3 mt-2 inline-block">
      <motion.span 
        style={{ opacity, y, color, textShadow: glow }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

// THE HOLOGRAPHIC DRONE ENGINE
function HolographicWorker() {
    const [scanProgress, setScanProgress] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setScanProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 30);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Layer 1: Ghost/Pending State */}
        <div className="absolute inset-0 flex items-center justify-center text-white/5">
           <Home className="w-48 h-48 stroke-[1px]" />
           <AlertCircle className="absolute w-12 h-12 text-white/10 animate-pulse" />
        </div>
  
        {/* Layer 2: Final/Processed State (Revealed by Mask) */}
        <div 
          className="absolute inset-0 flex items-center justify-center text-cyan-400"
          style={{ 
            clipPath: `inset(0 0 ${100 - scanProgress}% 0)`, 
            transition: "clip-path 0.1s linear",
            filter: "drop-shadow(0 0 15px rgba(6,182,212,0.5))"
          }}
        >
           <Home className="w-48 h-48 stroke-[2.5px]" />
           <CheckCircle2 className="absolute w-14 h-14 text-cyan-400" />
        </div>
  
        {/* Layer 3: The Pulse Scanner */}
        <div 
          className="absolute left-[-10%] w-[120%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_30px_rgba(6,182,212,1)]"
          style={{ 
            top: `${scanProgress}%`, 
            transition: "top 0.1s linear" 
          }}
        >
          {/* Laser Head */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_15px_white]" />
        </div>
      </div>
    );
}