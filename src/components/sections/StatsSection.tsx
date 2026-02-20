"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function StatsSection() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={targetRef} className="py-40 bg-black relative">
      <motion.div style={{ scale, opacity }} className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <StatItem number="500+" label="Properties Managed" />
          <StatItem number="100%" label="Digital Transparency" />
          <StatItem number="24/7" label="Global Monitoring" />

        </div>
      </motion.div>
    </section>
  );
}

function StatItem({ number, label }: { number: string, label: string }) {
  return (
    <div className="group relative p-12 rounded-[40px] border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent text-center">
      <div className="text-7xl font-bold tracking-tighter text-white mb-4 group-hover:text-cyan-400 transition-colors">
        {number}
      </div>
      <div className="text-cyan-500/60 font-mono text-xs uppercase tracking-widest">
        {label}
      </div>
      {/* Floating inner glow */}
      <div className="absolute inset-0 rounded-[40px] bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-all duration-700 blur-2xl" />
    </div>
  );
}