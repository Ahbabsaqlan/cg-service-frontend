"use client";
import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, Trees, Hammer, ShieldCheck, Droplets, Camera } from "lucide-react";

const services = [
  { id: 1, icon: Home, title: "Property Securing", desc: "Lock changes, board-ups, and perimeter securing." },
  { id: 2, icon: Trees, title: "Landscaping", desc: "Lawn maintenance, tree trimming, and debris removal." },
  { id: 3, icon: Droplets, title: "Winterization", desc: "Plumbing system protection against freezing temperatures." },
  { id: 4, icon: Hammer, title: "Repairs & Rehab", desc: "Roof tarping, drywall, and structural minor repairs." },
  { id: 5, icon: ShieldCheck, title: "Eviction Services", desc: "Coordination with local authorities and property clearing." },
  { id: 6, icon: Camera, title: "Inspections", desc: "Detailed photographic reporting and occupancy checks." },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-40 bg-black relative overflow-hidden flex flex-col justify-center perspective-[2000px]">
      
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-cyan-900/20 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full relative z-10">
        
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16 md:mb-32"
        >
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            Zero Gravity <br /> <span className="text-cyan-500">Service Suite</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto">
             Experience a workflow that feels weightless.
          </p>
        </motion.div>

        {/* Responsive Grid: 1 Col Mobile, 2 Col Tablet, 3 Col Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
          {services.map((service, idx) => (
            <Card3D key={service.id} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card3D({ service, index }: { service: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0); 
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative h-[280px] md:h-[320px] w-full perspective-[1000px] group"
    >
      <motion.div
        // Disable bobbing animation on small screens to save battery/performance
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 2
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative h-full w-full rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        <div 
            className="absolute -inset-2 bg-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block" 
            style={{ transform: "translateZ(-50px)" }} 
        />

        <div className="relative h-full w-full p-6 md:p-8 flex flex-col justify-between" style={{ transform: "translateZ(20px)" }}>
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/50 border border-white/10 flex items-center justify-center shadow-inner mb-4 group-hover:scale-110 transition-transform duration-300">
            <service.icon className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 group-hover:text-white transition-colors" />
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
              {service.title}
            </h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
              {service.desc}
            </p>
          </div>
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-30 mt-4" />
        </div>

        {/* Glare effect - Hidden on mobile, visible on Hover capable devices */}
        <motion.div
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${useTransform(x, [-0.5, 0.5], ["0%", "100%"])} ${useTransform(y, [-0.5, 0.5], ["0%", "100%"])},
                rgba(255,255,255,0.1),
                transparent 40%
              )
            `
          }}
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block"
        />
      </motion.div>
    </motion.div>
  );
}