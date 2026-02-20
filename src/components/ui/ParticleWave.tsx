"use client";
import { useEffect, useRef } from "react";

export default function ParticleWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    
    // Configuration
    const particleCount = 600; // Number of particles
    const connectionDistance = 0; // Set to 100 if you want lines connecting them
    const mouseRepelRadius = 150; // How big the "wave" around the mouse is
    const mouseRepelForce = 2; // How hard they fly away

    // Colors matching your Cyber/Dark theme
    const colors = [
      "#06b6d4", // Cyan-500
      "#ffffff", // White
      "#3b82f6", // Blue-500
      "#8b5cf6", // Violet-500
    ];

    let mouse = { x: -1000, y: -1000 };

    // Handle resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      baseX: number;
      baseY: number;
      density: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.5; // Random drift speed
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1; // Random size
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.density = (Math.random() * 30) + 1; // How heavy the particle feels
      }

      update() {
        // Mouse Interaction Physics
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Calculate the vector to push the particle away
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        
        const maxDistance = mouseRepelRadius;
        let force = (maxDistance - distance) / maxDistance;

        // If mouse is close, push away (The "Wave" Effect)
        if (distance < mouseRepelRadius) {
            const directionX = forceDirectionX * force * this.density * mouseRepelForce;
            const directionY = forceDirectionY * force * this.density * mouseRepelForce;
            this.x -= directionX;
            this.y -= directionY;
        } else {
            // If mouse is far, slowly drift back to original spot (or keep drifting)
            if (this.x !== this.baseX) {
                const dx = this.x - this.baseX;
                this.x -= dx / 20; // Return speed
            }
            if (this.y !== this.baseY) {
                const dy = this.y - this.baseY;
                this.y -= dy / 20;
            }
        }
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fillStyle = this.color;
        ctx!.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    // Event Listeners
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    // Start
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none opacity-60" 
    />
  );
}