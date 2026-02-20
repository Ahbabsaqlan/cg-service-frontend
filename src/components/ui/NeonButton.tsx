"use client";
import { motion } from "framer-motion";

export default function NeonButton({ text, onClick }: { text: string; onClick?: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative px-6 py-2.5 rounded-full font-medium text-sm tracking-wide group overflow-hidden bg-black border border-cyan-500/50 text-cyan-400"
    >
      <span className="relative z-10">{text}</span>
      {/* Neon Glow Hover Effect */}
      <div className="absolute inset-0 bg-cyan-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 border border-cyan-400 rounded-full scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />
    </motion.button>
  );
}