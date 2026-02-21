"use client";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const stats = [
  { value: "24/7", label: "Real-time Tracking" },
  { value: "5", label: "Specialized User Roles" },
  { value: "0", label: "Communication Gaps" },
];

export default function WhyChooseUs() {
  return (
    <section className="py-32 bg-black border-t border-white/5 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE: Text Content */}
          <div className="space-y-8">
            <BlinkingText>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                The <span className="text-cyan-500">CG Service</span> Advantage.
              </h2>
            </BlinkingText>
            
            <BlinkingText delay={500}>
              <p className="text-gray-400 text-lg leading-relaxed">
                We aren't just a preservation company. We are a technology-first logistics engine. 
                By utilizing our proprietary ERP, we ensure vendors are paid faster, clients receive 
                accurate quotes sooner, and assets are protected better.
              </p>
            </BlinkingText>
          </div>

          {/* RIGHT SIDE: Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
               <motion.div
                 key={idx}
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: idx * 0.2 }}
                 className={`p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent text-center backdrop-blur-sm hover:bg-white/[0.03] transition-colors ${
                    idx === 0 ? "sm:col-span-2" : "" // Make the first card wide on tablets
                 }`}
               >
                 {/* Glitching Number Component */}
                 <div className="mb-2">
                    <GlitchNumber value={stat.value} className="text-5xl md:text-6xl font-bold text-cyan-400 font-mono" />
                 </div>
                 
                 {/* Blinking Label */}
                 <BlinkingText delay={1000 + (idx * 200)}>
                    <div className="text-gray-400 font-medium uppercase tracking-wider text-sm">
                        {stat.label}
                    </div>
                 </BlinkingText>
               </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------
   HELPER 1: BLINKING WRAPPER (Simulates Eye Blink / Loose Wire)
   ----------------------------------------------------------- */
function BlinkingText({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const controls = useAnimation();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const blink = async () => {
      // 1. Random Blink (Opacity dip)
      await controls.start({ opacity: 0.3, filter: "blur(2px)", transition: { duration: 0.05 } });
      await controls.start({ opacity: 1, filter: "blur(0px)", transition: { duration: 0.1 } });

      // 2. Occasional Double Blink (30% chance)
      if (Math.random() > 0.7) {
        await new Promise(r => setTimeout(r, 50));
        await controls.start({ opacity: 0.3, filter: "blur(2px)", transition: { duration: 0.05 } });
        await controls.start({ opacity: 1, filter: "blur(0px)", transition: { duration: 0.1 } });
      }

      // 3. Schedule next blink (Random time between 2s and 7s)
      const nextDelay = Math.random() * 5000 + 2000;
      timeout = setTimeout(blink, nextDelay);
    };

    // Initial Start
    timeout = setTimeout(blink, delay + Math.random() * 1000);

    return () => clearTimeout(timeout);
  }, [controls, delay]);

  return (
    <motion.div animate={controls} initial={{ opacity: 1 }}>
      {children}
    </motion.div>
  );
}

/* -----------------------------------------------------------
   HELPER 2: GLITCH NUMBER (Scrambles digits on blink)
   ----------------------------------------------------------- */
function GlitchNumber({ value, className }: { value: string, className?: string }) {
  const [display, setDisplay] = useState(value);
  const controls = useAnimation();
  const chars = "0123456789"; 

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const glitch = async () => {
      // 1. Blink Opacity
      controls.start({ opacity: 0.4, transition: { duration: 0.1 } });

      // 2. Scramble Numbers for 150ms
      const interval = setInterval(() => {
        setDisplay(prev => 
          value.split('').map(char => {
             // Don't scramble special chars like "/" in "24/7"
             if (isNaN(parseInt(char))) return char;
             return chars[Math.floor(Math.random() * chars.length)];
          }).join('')
        );
      }, 50);

      // 3. Reset
      setTimeout(() => {
        clearInterval(interval);
        setDisplay(value);
        controls.start({ opacity: 1, transition: { duration: 0.1 } });
      }, 200);

      // 4. Next glitch (Random time 3s - 8s)
      timeout = setTimeout(glitch, Math.random() * 5000 + 3000);
    };

    timeout = setTimeout(glitch, Math.random() * 2000);
    return () => clearTimeout(timeout);
  }, [value, controls]);

  return (
    <motion.div animate={controls} className={className}>
      {display}
    </motion.div>
  );
}