"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Home, CheckCircle2, Activity, ScanLine, Target } from "lucide-react";

const paragraph = "Chowdhury Global Service LLC operates at the intersection of on-the-ground precision and digital efficiency. We manage assets with unmatched speed, ensuring every property is preserved with the highest standards of quality and transparency.";

export default function About() {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const words = paragraph.split(" ");
  
  // Track scroll strictly for the text container
  // Start Center to End Center means words ONLY light up in the exact middle of the screen
  const { scrollYProgress } = useScroll({
    target: textContainerRef,
    offset: ["start center", "end center"], 
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 3D Tilt for the card (but NOT moving Y, CSS handles Y now)
  const cardRotate = useTransform(smoothProgress, [0, 1], [15, -15]);

  return (
    // CRITICAL FIX: Removed `overflow-hidden`. Sticky will not work if parent has overflow hidden!
    <section id="about" className="relative bg-black border-t border-white/5 py-20 md:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      
      {/* NATIVE GRID LAYOUT */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
        
        {/* LEFT COLUMN: THE SCROLLING TEXT (This dictates the height of the section) */}
        <div ref={textContainerRef} className="flex flex-col relative z-10 pb-20 md:pb-40">
          
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="flex items-center gap-3 mb-10"
          >
             <div className="w-10 h-[2px] bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
             <span className="text-cyan-500 font-mono text-[10px] tracking-[0.4em] uppercase">Core Directive</span>
          </motion.div>

          {/* THE WORD REVEAL */}
          <div className="flex flex-wrap text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-bold tracking-tighter leading-[1.05] mb-20">
            {words.map((word, i) => (
              <Word key={i} index={i} total={words.length} progress={smoothProgress}>
                {word}
              </Word>
            ))}
          </div>

          {/* CLEAR STATUS TABS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 border-t border-white/10">
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
                <Target className="w-6 h-6 text-cyan-500 mb-4" />
                <span className="block text-white font-black text-sm uppercase tracking-widest mb-2">Precision</span>
                <span className="text-gray-400 text-xs leading-relaxed block">99.9% AI Audit Accuracy across all line items.</span>
            </div>
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
                <Activity className="w-6 h-6 text-cyan-400 mb-4" />
                <span className="block text-white font-black text-sm uppercase tracking-widest mb-2">Velocity</span>
                <span className="text-gray-400 text-xs leading-relaxed block">Real-time cloud sync reduces turnaround by 40%.</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: THE STICKY WRAPPER */}
        {/* The column stretches to match the text height. The inner div sticks to the screen. */}
        <div className="relative h-full w-full hidden lg:block">
          
          {/* THE STICKY CARD: This will physically "run down" the column as you scroll */}
          <div className="sticky top-[20vh] w-full flex justify-end">
            
            <motion.div 
              style={{ 
                rotateX: cardRotate, 
                transformStyle: "preserve-3d" 
              }}
              className="w-full max-w-[420px] aspect-[4/5] rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/10 to-black backdrop-blur-3xl p-10 flex flex-col relative shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
            >
              <div className="flex justify-between items-start mb-10 relative z-10" style={{ transform: "translateZ(30px)" }}>
                <div className="space-y-1">
                   <div className="text-7xl font-black text-white tracking-tighter">100<span className="text-2xl text-cyan-500">%</span></div>
                   <div className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-[9px] font-mono text-cyan-400 uppercase tracking-widest inline-block">Audit Success</div>
                </div>
                <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center bg-black/50 shadow-xl">
                  <ScanLine className="w-6 h-6 text-cyan-500 animate-pulse" />
                </div>
              </div>

              <div className="flex-1 relative flex items-center justify-center scale-125" style={{ transform: "translateZ(50px)" }}>
                 <HolographicWorker />
              </div>

              <div className="pt-8 border-t border-white/5 flex justify-between items-end relative z-10" style={{ transform: "translateZ(30px)" }}>
                  <div className="flex flex-col">
                      <span className="text-white font-black text-xl tracking-tighter uppercase leading-none">Digital Link</span>
                      <span className="text-gray-600 text-[9px] font-mono tracking-widest mt-2 uppercase">ERP_PROTOCOL_V4</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
                      <span className="text-cyan-400 font-mono text-[9px] uppercase font-bold tracking-tighter">Syncing</span>
                  </div>
              </div>

              {/* Dynamic Glare */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-white/5 pointer-events-none rounded-[3rem]" />
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}

// 🎯 FOCUSED WORD HIGHLIGHT COMPONENT
function Word({ children, index, total, progress }: any) {
  const centerPoint = index / total;
  
  // Words are Dim. They turn Pure White exactly in the middle of the screen.
  const opacity = useTransform(
    progress, 
    [centerPoint - 0.15, centerPoint, centerPoint + 0.15], 
    [0.15, 1, 0.15]
  );
  
  const color = useTransform(
    progress, 
    [centerPoint - 0.15, centerPoint, centerPoint + 0.15], 
    ["#374151", "#ffffff", "#374151"]
  );

  return (
    <span className="relative mr-4 mt-2 inline-block">
      <motion.span style={{ opacity, color }} className="inline-block transition-colors duration-150">
        {children}
      </motion.span>
    </span>
  );
}

// THE HOUSE ANIMATION
function HolographicWorker() {
    const [scanProgress, setScanProgress] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => setScanProgress(p => p >= 100 ? 0 : p + 1), 30);
      return () => clearInterval(interval);
    }, []);
    
    return (
      <div className="relative w-48 h-48 flex items-center justify-center">
        <Home className="absolute w-32 h-32 text-white/5 stroke-[1px]" />
        <div 
          className="absolute inset-0 flex items-center justify-center text-cyan-400"
          style={{ clipPath: `inset(0 0 ${100 - scanProgress}% 0)`, transition: "clip-path 0.1s linear" }}
        >
           <Home className="w-32 h-32 stroke-[2.5px] drop-shadow-[0_0_20px_rgba(6,182,212,1)]" />
           <CheckCircle2 className="absolute w-10 h-10 text-cyan-400 bg-black rounded-full" />
        </div>
        <div className="absolute left-[-15%] w-[130%] h-[1px] bg-cyan-400 shadow-[0_0_30px_#06b6d4]" style={{ top: `${scanProgress}%` }} />
      </div>
    );
}