"use client";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import ParticleWave from "../ui/ParticleWave";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 3D Tilt Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100, mass: 2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-500, 500], [5, -5]); // Reduced tilt for better readability
  const rotateY = useTransform(smoothMouseX, [-500, 500], [-5, 5]);
  
  const backgroundX = useTransform(smoothMouseX, [-500, 500], [-15, 15]);
  const backgroundY = useTransform(smoothMouseY, [-500, 500], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-black perspective-[1000px]">
      
      {/* Parallax Grid */}
      <motion.div 
        className="absolute inset-[-10%] bg-grid-pattern opacity-20"
        style={{ x: backgroundX, y: backgroundY }}
      />

      <ParticleWave />

      {/* Spotlight */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6,182,212,0.10), transparent 40%)`
        }}
      />

      {/* Content Container */}
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 flex flex-col items-center text-center px-4 md:px-6 max-w-7xl mx-auto w-full"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ transform: "translateZ(50px)" }}
          className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-cyan-950/30 border border-cyan-500/30 text-cyan-400 text-xs md:text-sm mb-6 md:mb-8 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_#06b6d4]" />
          Next-Gen Property Preservation
        </motion.div>

        <div className="overflow-hidden pb-4" style={{ transform: "translateZ(80px)" }}>
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 leading-[1.1] md:leading-[1.1]"
          >
            Precision in <br className="hidden md:block" /> Every Property.
          </motion.h1>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{ transform: "translateZ(40px)" }}
          className="mt-6 text-base sm:text-lg md:text-2xl text-gray-400 max-w-sm sm:max-w-xl md:max-w-3xl leading-relaxed"
        >
          An integrated, automated ecosystem for vendors, crews, and property managers.
        </motion.p>
      </motion.div>
      
      {/* Bottom Fade for Smooth Transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
    </section>
  );
}