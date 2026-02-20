"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Home, CheckCircle2, AlertCircle, ScanLine } from "lucide-react";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]); 
  const rotateX = useTransform(scrollYProgress, [0, 1], [5, -5]); 

  return (
    <section ref={containerRef} id="about" className="py-20 md:py-32 relative bg-black overflow-hidden perspective-[1000px]">
      {/* Top Fade for Smooth Entry */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-20" />

      {/* Background Blob */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
        className="absolute top-0 right-0 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-cyan-900/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Text Side */}
        <div className="order-2 lg:order-1">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 tracking-tighter"
          >
            Redefining <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Preservation.
            </span>
          </motion.h2>

          <div className="space-y-4 md:space-y-6 text-base md:text-lg text-gray-400 leading-relaxed">
            {["Chowdhury Global Service LLC operates at the intersection", 
              "of on-the-ground precision and digital efficiency.",
              "We manage assets with unmatched speed."
            ].map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="border-l-2 border-cyan-900/50 pl-4 md:pl-6"
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>

        {/* 3D Card Side */}
        <div className="order-1 lg:order-2 relative perspective-[1000px] h-[400px] md:h-[500px] w-full">
          <motion.div 
            style={{ rotateX, y, transformStyle: "preserve-3d" }}
            className="w-full h-full rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-xl p-6 md:p-8 flex flex-col relative shadow-[0_0_50px_rgba(6,182,212,0.1)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
            
            <div className="flex justify-between items-start relative z-10 mb-4">
              <div className="text-5xl md:text-7xl font-bold text-white tracking-tighter">100<span className="text-2xl md:text-3xl text-cyan-500">%</span></div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-cyan-500/30 flex items-center justify-center bg-black/50 backdrop-blur-md">
                <ScanLine className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>

            <div className="flex-1 relative flex items-center justify-center py-4">
               <HolographicWorker />
            </div>

            <div className="relative z-10">
              <div className="text-xl md:text-2xl text-cyan-400 font-medium mb-1 md:mb-2">Digital Workflow</div>
              <div className="text-gray-500 text-xs md:text-sm">
                From order receipt to crew payout, automated by our proprietary ERP engine.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HolographicWorker() {
    const [scanProgress, setScanProgress] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setScanProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 30);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500/30 grayscale opacity-50">
           <Home className="w-28 h-28 md:w-40 md:h-40 stroke-1" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
             <AlertCircle className="w-8 h-8 md:w-12 md:h-12 text-red-500 animate-pulse" />
           </div>
        </div>
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center text-cyan-400 bg-black/80"
          style={{ clipPath: `inset(0 0 ${100 - scanProgress}% 0)`, transition: "clip-path 0.1s linear" }}
        >
           <Home className="w-28 h-28 md:w-40 md:h-40 stroke-[2px] drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
             <CheckCircle2 className="w-8 h-8 md:w-12 md:h-12 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,1)]" />
           </div>
        </div>
        <div 
          className="absolute left-0 w-full h-1 bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,1)] flex items-center"
          style={{ top: `${scanProgress}%`, transition: "top 0.1s linear" }}
        >
          <div className="absolute right-0 -translate-y-1/2 translate-x-1/2 bg-black border border-cyan-500 rounded-full p-1.5 md:p-2 shadow-[0_0_15px_rgba(6,182,212,0.6)]">
             <ScanLine className="w-3 h-3 md:w-4 md:h-4 text-white animate-spin-slow" />
          </div>
        </div>
      </div>
    );
}