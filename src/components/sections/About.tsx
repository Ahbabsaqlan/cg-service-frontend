"use client";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionTemplate,
  useMotionValueEvent, 
  AnimatePresence,
  useMotionValue
} from "framer-motion";
import { useRef, useState } from "react";
import { 
  Home, CheckCircle2, Activity, ScanLine, 
  Target, Globe, Zap, ShieldCheck 
} from "lucide-react";

// --- DATA CONFIGURATION ---
// We split the text into 4 chunks for Mobile, but join them for Desktop.
const TEXT_CHUNKS = [
  "Chowdhury Global Service LLC operates at the intersection of on-the-ground precision and digital efficiency.",
  "We manage assets with unmatched speed, ensuring every property is preserved with",
  "the highest standards of quality and transparency.",
  "Our workflow integrates automated ecosystems for vendors, crews, and property managers."
];

const FULL_PARAGRAPH = TEXT_CHUNKS.join(" ");

export default function About() {
  const containerRef = useRef(null);
  const words = FULL_PARAGRAPH.split(" ");
  const [activeCard, setActiveCard] = useState(0);

  // --- DESKTOP LOGIC (Your existing perfect scroll) ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"], 
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40, damping: 15, mass: 0.1, restDelta: 0.001
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.25) setActiveCard(0);
    else if (latest < 0.50) setActiveCard(1);
    else if (latest < 0.75) setActiveCard(2);
    else setActiveCard(3);
  });

  const cardRotate = useTransform(smoothProgress, [0, 1], [5, -5]);

  return (
    <section 
      ref={containerRef} 
      id="about" 
      className="relative bg-black w-full border-t border-white/5"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* ======================================================== */}
      {/*                 MOBILE LAYOUT (lg:hidden)                */}
      {/*      Chunk 1 -> Card 1 -> Chunk 2 -> Card 2 ...          */}
      {/* ======================================================== */}
      <div className="lg:hidden flex flex-col px-6 py-16 gap-20">
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="flex items-center gap-3"
        >
           <div className="w-8 h-[2px] bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
           <span className="text-cyan-500 font-mono text-[10px] tracking-[0.4em] uppercase">Core Directive</span>
        </motion.div>

        {TEXT_CHUNKS.map((text, index) => (
          <div key={index} className="flex flex-col gap-8">
            {/* Mobile Text Chunk */}
            <motion.p 
              initial={{ opacity: 0.2, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-10% 0px -10% 0px" }} // Highlight when in center
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl font-bold tracking-tighter leading-[1.1] text-white"
            >
              {text}
            </motion.p>

            {/* Mobile Card (Static, no 3D tilt needed for mobile) */}
            <div className="w-full aspect-[4/5] max-h-[400px] rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 via-black to-black backdrop-blur-xl p-8 flex flex-col relative shadow-2xl overflow-hidden mx-auto">
               <CardHeader data={CARD_STATES[index]} />
               <div className="flex-1 relative flex items-center justify-center scale-110">
                  {(() => {
                    const VisualComponent = CARD_STATES[index].Visual;
                    // On mobile, we pass a fake "always active" progress so animations loop constantly
                    return <VisualComponent isMobile={true} />; 
                  })()}
               </div>
               <CardFooter data={CARD_STATES[index]} />
            </div>
          </div>
        ))}
      </div>


      {/* ======================================================== */}
      {/*                 DESKTOP LAYOUT (hidden lg:flex)          */}
      {/*              Exact same sticky logic as before           */}
      {/* ======================================================== */}
      <div className="hidden lg:flex max-w-[1800px] mx-auto px-6 relative z-10 flex-row gap-16 2xl:gap-32">
        
        {/* LEFT: TEXT ENGINE */}
        <div className="w-1/2 flex flex-col relative z-10 pt-[25vh] pb-[40vh]">
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="flex items-center gap-3 mb-10"
          >
             <div className="w-10 h-[2px] bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
             <span className="text-cyan-500 font-mono text-[10px] tracking-[0.4em] uppercase">Core Directive</span>
          </motion.div>

          <div className="flex flex-wrap text-[4.5rem] xl:text-[5.5rem] 2xl:text-[7rem] font-bold tracking-tighter leading-[1.0] mb-20">
            {words.map((word, i) => (
              <Word key={i} index={i} total={words.length} progress={smoothProgress}>
                {word}
              </Word>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6 pt-10 border-t border-white/10 mt-auto">
             <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex items-center gap-4">
                <Target className="w-6 h-6 text-cyan-500 shrink-0" />
                <div>
                    <span className="block text-white font-black text-xs uppercase tracking-widest">Precision</span>
                    <span className="text-gray-500 text-[10px]">99.9% Audit Accuracy</span>
                </div>
            </div>
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex items-center gap-4">
                <Activity className="w-6 h-6 text-cyan-400 shrink-0" />
                <div>
                    <span className="block text-white font-black text-xs uppercase tracking-widest">Velocity</span>
                    <span className="text-gray-500 text-[10px]">Real-time Sync Active</span>
                </div>
            </div>
          </div>
        </div>

        {/* RIGHT: STICKY GLIDING CARD */}
        <div className="w-1/2 relative">
          <div className="sticky top-0 h-screen flex items-center justify-end w-full">
            <motion.div 
              style={{ rotateX: cardRotate, transformStyle: "preserve-3d" }}
              className="will-change-transform w-full max-w-[460px] 2xl:max-w-[550px] aspect-[4/5] rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/10 via-black to-black backdrop-blur-xl p-10 flex flex-col relative shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCard}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex flex-col h-full w-full relative z-10"
                >
                  <CardHeader data={CARD_STATES[activeCard]} />
                  <div className="flex-1 relative flex items-center justify-center scale-125 2xl:scale-150">
                     {(() => {
                        const VisualComponent = CARD_STATES[activeCard].Visual;
                        return <VisualComponent progress={smoothProgress} />;
                     })()}
                  </div>
                  <CardFooter data={CARD_STATES[activeCard]} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ================= 4 STATE CONFIGURATIONS ================= */
const CARD_STATES = [
  { title: "100", symbol: "%", sub: "Audit Success", icon: ScanLine, iconColor: "text-cyan-500", tagBg: "bg-cyan-500/10", tagBorder: "border-cyan-500/20", tagText: "text-cyan-400", footerTitle: "Digital Link", footerSub: "ERP_PROTOCOL_V4", status: "Syncing", statusDot: "bg-cyan-500", Visual: HolographicWorker },
  { title: "360", symbol: "°", sub: "Global Mapping", icon: Globe, iconColor: "text-blue-500", tagBg: "bg-blue-500/10", tagBorder: "border-blue-500/20", tagText: "text-blue-400", footerTitle: "Geo-Spatial", footerSub: "LAT_LONG_TRACK", status: "Scanning", statusDot: "bg-blue-500", Visual: RadarScanner },
  { title: "<10", symbol: "ms", sub: "Data Velocity", icon: Zap, iconColor: "text-amber-500", tagBg: "bg-amber-500/10", tagBorder: "border-amber-500/20", tagText: "text-amber-400", footerTitle: "Real-Time", footerSub: "SOCKET_STREAM", status: "Active", statusDot: "bg-amber-500", Visual: DataWave },
  { title: "99", symbol: ".9%", sub: "Quality Ensured", icon: ShieldCheck, iconColor: "text-emerald-500", tagBg: "bg-emerald-500/10", tagBorder: "border-emerald-500/20", tagText: "text-emerald-400", footerTitle: "Verification", footerSub: "PRESERVATION", status: "Secured", statusDot: "bg-emerald-500", Visual: ShieldLock }
];

/* ================= HELPERS ================= */
function CardHeader({ data }: { data: any }) {
  const Icon = data.icon;
  return (
    <div className="flex justify-between items-start mb-8 lg:mb-10">
      <div className="space-y-1">
          <div className="text-5xl lg:text-7xl 2xl:text-8xl font-black text-white tracking-tighter">{data.title}<span className={`text-xl lg:text-2xl ${data.iconColor}`}>{data.symbol}</span></div>
          <div className={`px-2 py-0.5 ${data.tagBg} ${data.tagBorder} border rounded text-[9px] font-mono ${data.tagText} uppercase tracking-widest inline-block`}>{data.sub}</div>
      </div>
      <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center bg-black/50 shadow-xl"><Icon className={`w-6 h-6 ${data.iconColor} animate-pulse`} /></div>
    </div>
  );
}

function CardFooter({ data }: { data: any }) {
  return (
    <div className="pt-6 lg:pt-8 border-t border-white/5 flex justify-between items-end">
        <div className="flex flex-col">
            <span className="text-white font-black text-lg lg:text-xl tracking-tighter uppercase leading-none">{data.footerTitle}</span>
            <span className="text-gray-600 text-[9px] font-mono tracking-widest uppercase mt-2">{data.footerSub}</span>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${data.tagBg} border ${data.tagBorder}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${data.statusDot} animate-ping`} />
            <span className={`${data.tagText} font-mono text-[9px] uppercase font-bold tracking-tighter`}>{data.status}</span>
        </div>
    </div>
  );
}

function Word({ children, index, total, progress }: any) {
  const centerPoint = index / total;
  const opacity = useTransform(progress, [centerPoint - 0.2, centerPoint, centerPoint + 0.2], [0.2, 1, 0.2]);
  const color = useTransform(progress, [centerPoint - 0.2, centerPoint, centerPoint + 0.2], ["#374151", "#ffffff", "#374151"]);
  return (
    <span className="relative mr-3 lg:mr-4 mt-2 inline-block">
      <motion.span style={{ opacity, color }} className="inline-block will-change-opacity">{children}</motion.span>
    </span>
  );
}

/* ================= 4 ANIMATIONS (Mobile Compatible) ================= */
// NOTE: I added an `isMobile` check. If mobile, we use looped animations instead of scroll-driven ones.

function HolographicWorker({ progress, isMobile }: { progress?: any, isMobile?: boolean }) {
    // Desktop: Scroll Driven. Mobile: Auto Loop
    const localProg = useTransform(progress || useMotionValue(0), [0, 0.25], [0, 1]); 
    const rawPercent = useTransform(localProg, [0, 1], [0, 100]);
    const topVal = useMotionTemplate`${rawPercent}%`;
    const clipPathVal = useTransform(rawPercent, (v) => `inset(0 0 ${100 - v}% 0)`);

    return (
      <div className="relative w-40 h-40 lg:w-48 lg:h-48 flex items-center justify-center">
        <Home className="absolute w-28 h-28 lg:w-32 lg:h-32 text-white/5 stroke-[1px]" />
        
        <motion.div 
          className="absolute inset-0 flex items-center justify-center text-cyan-400 will-change-transform" 
          style={!isMobile ? { clipPath: clipPathVal } : {}}
          animate={isMobile ? { clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
           <Home className="w-28 h-28 lg:w-32 lg:h-32 stroke-[2.5px]" />
           <CheckCircle2 className="absolute w-8 h-8 lg:w-10 lg:h-10 text-cyan-400 bg-black rounded-full" />
        </motion.div>

        <motion.div 
          className="absolute left-[-15%] w-[130%] h-[2px] bg-cyan-400 shadow-[0_0_15px_#06b6d4] z-10 will-change-transform" 
          style={!isMobile ? { top: topVal } : {}}
          animate={isMobile ? { top: ["0%", "100%"] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
             <div className="absolute right-0 -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
        </motion.div>
      </div>
    );
}

function RadarScanner({ progress, isMobile }: { progress?: any, isMobile?: boolean }) {
    const localProg = useTransform(progress || useMotionValue(0), [0.25, 0.5], [0, 1]); 
    const rawPercent = useTransform(localProg, [0, 1], [0, 100]);
    const scale = useTransform(localProg, [0, 1], [0.5, 2]);
    const opacity = useTransform(localProg, [0, 0.8, 1], [1, 1, 0]);
    const clipPathVal = useTransform(rawPercent, (v) => `circle(${v}% at 50% 50%)`);

    return (
      <div className="relative w-40 h-40 lg:w-48 lg:h-48 flex items-center justify-center">
         <Globe className="absolute w-28 h-28 lg:w-32 lg:h-32 text-white/5 stroke-[1px]" />
         <motion.div 
           className="absolute inset-0 flex items-center justify-center text-blue-500 will-change-transform" 
           style={!isMobile ? { clipPath: clipPathVal } : {}}
           animate={isMobile ? { clipPath: ["circle(0% at 50% 50%)", "circle(100% at 50% 50%)"] } : {}}
           transition={{ duration: 2, repeat: Infinity }}
         >
            <Globe className="w-28 h-28 lg:w-32 lg:h-32 stroke-[2.5px]" />
         </motion.div>
         <motion.div 
           className="absolute inset-0 border-[2px] border-blue-500 rounded-full will-change-transform" 
           style={!isMobile ? { scale, opacity } : {}}
           animate={isMobile ? { scale: [0.5, 2], opacity: [1, 0] } : {}}
           transition={{ duration: 2, repeat: Infinity }}
         />
      </div>
    );
}

function DataWave({ progress, isMobile }: { progress?: any, isMobile?: boolean }) {
    const localProg = useTransform(progress || useMotionValue(0), [0.5, 0.75], [0, 1]); 
    const h1 = useMotionTemplate`${useTransform(localProg, [0, 1], [20, 100])}%`;
    const h2 = useMotionTemplate`${useTransform(localProg, [0, 1], [40, 80])}%`;
    const h3 = useMotionTemplate`${useTransform(localProg, [0, 1], [10, 90])}%`;

    return (
       <div className="relative w-40 h-40 lg:w-48 lg:h-48 flex items-end justify-center gap-3 lg:gap-4 pb-6 lg:pb-8">
          <motion.div className="w-5 lg:w-6 bg-amber-500 rounded-t-md will-change-transform" style={!isMobile ? { height: h1 } : {}} animate={isMobile ? { height: ["20%", "100%", "20%"] } : {}} transition={{ duration: 1.5, repeat: Infinity }} />
          <motion.div className="w-5 lg:w-6 bg-amber-400 rounded-t-md will-change-transform" style={!isMobile ? { height: h2 } : {}} animate={isMobile ? { height: ["40%", "80%", "40%"] } : {}} transition={{ duration: 1.5, delay: 0.2, repeat: Infinity }} />
          <motion.div className="w-5 lg:w-6 bg-amber-300 rounded-t-md will-change-transform" style={!isMobile ? { height: h3 } : {}} animate={isMobile ? { height: ["10%", "90%", "10%"] } : {}} transition={{ duration: 1.5, delay: 0.4, repeat: Infinity }} />
       </div>
    );
}

function ShieldLock({ progress, isMobile }: { progress?: any, isMobile?: boolean }) {
    const localProg = useTransform(progress || useMotionValue(0), [0.75, 0.9], [0, 1]); 
    const rawPercent = useTransform(localProg, [0, 1], [0, 100]);
    const clipPathVal = useTransform(rawPercent, (v) => `inset(${100 - v}% 0 0 0)`);

    return (
       <div className="relative w-40 h-40 lg:w-48 lg:h-48 flex items-center justify-center">
          <ShieldCheck className="absolute w-28 h-28 lg:w-32 lg:h-32 text-white/5 stroke-[1px]" />
          <motion.div 
            className="absolute inset-0 flex items-center justify-center text-emerald-400 will-change-transform" 
            style={!isMobile ? { clipPath: clipPathVal } : {}}
            animate={isMobile ? { clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"] } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          >
             <ShieldCheck className="w-28 h-28 lg:w-32 lg:h-32 stroke-[2.5px]" />
          </motion.div>
       </div>
    );
}