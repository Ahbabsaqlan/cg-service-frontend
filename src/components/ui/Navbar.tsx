"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import NeonButton from "./NeonButton";
import MagneticButton from "./MagneticButton";

export default function Navbar() {

  // 1. Helper to tell CustomCursor to switch to an Emoji
  const setCursor = (emoji: string) => {
    // We dispatch the event we created in CustomCursor.tsx
    window.dispatchEvent(new CustomEvent("cursor-emoji-set", { detail: emoji }));
  };

  // 2. Helper to tell CustomCursor to go back to normal
  const resetCursor = () => {
    window.dispatchEvent(new CustomEvent("cursor-emoji-clear"));
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-4 backdrop-blur-xl bg-black/40 border-b border-white/5"
    >
      <div className="text-xl font-bold tracking-tighter text-white">
        CG <span className="text-cyan-500">Service</span>
      </div>
      
      <div className="hidden md:flex gap-8 text-sm text-gray-400 font-medium">
        
        {/* ABOUT -> 🔍 */}
        <Link 
          href="#about" 
          className="hover:text-white transition-colors"
          onMouseEnter={() => setCursor("🔍")} 
          onMouseLeave={resetCursor}
        >
          About
        </Link>

        {/* SERVICES -> 🔨 */}
        <Link 
          href="#services" 
          className="hover:text-white transition-colors"
          onMouseEnter={() => setCursor("🔨")} 
          onMouseLeave={resetCursor}
        >
          Services
        </Link>

        {/* WORKFLOW -> 🗺️ */}
        <Link 
          href="#workflow" 
          className="hover:text-white transition-colors"
          onMouseEnter={() => setCursor("🗺️")} 
          onMouseLeave={resetCursor}
        >
          Workflow
        </Link>

      </div>

      {/* PORTAL LOGIN -> 🧲 (Handled internally by MagneticButton) */}
      <MagneticButton>
        <NeonButton text="Portal Login" />
      </MagneticButton>
    </motion.nav>
  );
}