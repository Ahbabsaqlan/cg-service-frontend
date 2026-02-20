"use client";
import { motion } from "framer-motion";
import NeonButton from "../ui/NeonButton";

export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-black relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-12 md:p-20 rounded-[3rem] border border-cyan-500/20 bg-cyan-950/10 backdrop-blur-xl relative overflow-hidden"
        >
          {/* Internal Glow */}
          <div className="absolute inset-0 bg-radial-gradient from-cyan-500/10 to-transparent opacity-50" />
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">
            Ready to Streamline Your Properties?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto relative z-10">
            Whether you are a property manager needing reliable preservation, or a vendor looking to join our elite crew network, get in touch today.
          </p>
          
          <div className="relative z-10">
            <NeonButton text="Contact Administration" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}