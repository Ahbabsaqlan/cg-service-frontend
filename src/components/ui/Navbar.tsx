"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import NeonButton from "./NeonButton";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
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
        <Link href="#about" className="hover:text-white transition-colors">About</Link>
        <Link href="#services" className="hover:text-white transition-colors">Services</Link>
        <Link href="#workflow" className="hover:text-white transition-colors">Workflow</Link>
      </div>

      <MagneticButton>
        <NeonButton text="Portal Login" />
      </MagneticButton>
    </motion.nav>
  );
}