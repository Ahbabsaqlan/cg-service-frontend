"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";

    // Counter animation
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20); // Adjust speed here

    // Remove preloader
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
        >
          {/* Progress Number */}
          <div className="absolute bottom-10 right-10 text-9xl font-bold text-cyan-500/20">
            {count}%
          </div>

          {/* Center Text */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex flex-col items-center gap-4"
          >
             <div className="text-white text-xl tracking-widest font-light">
                CG SERVICE LLC
             </div>
             <div className="w-64 h-[1px] bg-white/20 overflow-hidden">
                <motion.div 
                   className="h-full bg-cyan-500" 
                   initial={{ width: 0 }}
                   animate={{ width: "100%" }}
                   transition={{ duration: 2 }}
                />
             </div>
             <div className="text-gray-500 text-xs tracking-[0.2em]">
                INITIALIZING ERP ENGINE
             </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}