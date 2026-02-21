"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function MagneticButton({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Physics for button movement
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring physics makes the button feel heavy
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const [isHovered, setIsHovered] = useState(false);
  // Store mouse position relative to button center
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [lightningPath, setLightningPath] = useState("");

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    
    // Calculate center of button
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Distance from center
    const distX = clientX - centerX;
    const distY = clientY - centerY;

    // Move button 30% towards mouse
    x.set(distX * 0.3);
    y.set(distY * 0.3);

    // Save relative cursor position for SVG drawing
    setCursorPos({ x: distX, y: distY });

    // Broadcast absolute center to Cursor for Rotation Logic
    window.dispatchEvent(new CustomEvent("magnet-move", {
      detail: { x: centerX, y: centerY }
    }));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Initial broadcast to turn cursor into magnet
    if (ref.current) {
      const { height, width, left, top } = ref.current.getBoundingClientRect();
      window.dispatchEvent(new CustomEvent("magnet-start", {
        detail: { x: left + width / 2, y: top + height / 2 }
      }));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    setLightningPath("");
    window.dispatchEvent(new CustomEvent("magnet-end"));
  };

  // Generate Lightning Bolt Animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered) {
      interval = setInterval(() => {
        // Start point: The button's current shifted position (springX, springY)
        const sx = springX.get();
        const sy = springY.get();
        
        // End point: The mouse cursor position
        const ex = cursorPos.x;
        const ey = cursorPos.y;

        // Calculate distance
        const dist = Math.sqrt(Math.pow(ex - sx, 2) + Math.pow(ey - sy, 2));
        
        // Only draw lightning if distance is significant
        if (dist > 5) {
          // Generate 2 random jagged mid-points
          const mx1 = sx + (ex - sx) * 0.33 + (Math.random() * 10 - 5);
          const my1 = sy + (ey - sy) * 0.33 + (Math.random() * 10 - 5);
          const mx2 = sx + (ex - sx) * 0.66 + (Math.random() * 10 - 5);
          const my2 = sy + (ey - sy) * 0.66 + (Math.random() * 10 - 5);
          
          setLightningPath(`M ${sx} ${sy} L ${mx1} ${my1} L ${mx2} ${my2} L ${ex} ${ey}`);
        } else {
          setLightningPath("");
        }
      }, 40); // 25fps flickers
    }
    return () => clearInterval(interval);
  }, [isHovered, springX, springY, cursorPos]);

  return (
    <div className="relative inline-flex items-center justify-center">
      
      {/* LIGHTNING LAYER */}
      {/* overflow-visible allows lightning to reach OUTSIDE the button to the cursor */}
      <svg className="absolute top-1/2 left-1/2 w-0 h-0 overflow-visible pointer-events-none z-0">
         {isHovered && (
           <>
            {/* Cyan Glow */}
            <motion.path
              d={lightningPath}
              fill="none"
              stroke="rgba(6, 182, 212, 0.5)" // Cyan 500
              strokeWidth="4"
              strokeLinecap="round"
              className="filter blur-[4px]"
            />
            {/* White Core */}
            <motion.path
              d={lightningPath}
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
           </>
         )}
      </svg>

      {/* THE BUTTON */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        className={`relative z-10 ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}