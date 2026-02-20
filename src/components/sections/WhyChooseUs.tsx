"use client";
import { motion } from "framer-motion";

const stats = [
  { value: "24/7", label: "Real-time Tracking" },
  { value: "5", label: "Specialized User Roles" },
  { value: "0", label: "Communication Gaps" },
];

export default function WhyChooseUs() {
  return (
    <section className="py-32 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              The <span className="text-cyan-500">CG Service</span> Advantage.
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              We aren't just a preservation company. We are a technology-first logistics engine. By utilizing our proprietary ERP, we ensure vendors are paid faster, clients receive accurate quotes sooner, and assets are protected better.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
               <motion.div
                 key={idx}
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: idx * 0.2 }}
                 className="p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent text-center"
               >
                 <div className="text-5xl font-bold text-cyan-400 mb-2">{stat.value}</div>
                 <div className="text-gray-400 font-medium">{stat.label}</div>
               </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}