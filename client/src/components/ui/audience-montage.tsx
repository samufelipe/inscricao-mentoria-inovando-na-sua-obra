import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import audience1 from "@/assets/alem-da-tendencia/audience-1.jpg";
import audience2 from "@/assets/alem-da-tendencia/audience-2.jpg";
import audience3 from "@/assets/alem-da-tendencia/audience-3.jpg";
import audience4 from "@/assets/alem-da-tendencia/audience-4.jpg";

export function AudienceMontage() {
  const montageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: montageRef,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const y3 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y4 = useTransform(scrollYProgress, [0, 1], [15, -15]);

  return (
    <div
      ref={montageRef}
      className="relative h-[220px] md:h-[320px] lg:h-[380px] my-6 md:my-10 overflow-hidden rounded-2xl"
    >
      {/* Img 1 - Esquerda */}
      <motion.img
        src={audience1}
        alt="Plateia atenta no evento"
        style={{ y: y1 }}
        className="absolute left-0 -top-[15%] w-[55%] md:w-[32%] h-[130%] object-cover object-center opacity-75 rounded-lg"
        draggable={false}
      />

      {/* Img 2 - Centro (destaque principal) */}
      <motion.img
        src={audience2}
        alt="Networking entre participantes"
        style={{ y: y2 }}
        className="absolute left-1/2 -translate-x-1/2 -top-[10%] w-[60%] md:w-[42%] h-[120%] object-cover object-center z-[3] opacity-95 rounded-lg shadow-2xl shadow-black/40"
        draggable={false}
      />

      {/* Img 3 - Direita (hidden mobile) */}
      <motion.img
        src={audience3}
        alt="Plateia focada"
        style={{ y: y3 }}
        className="hidden md:block absolute right-[12%] -top-[20%] w-[32%] h-[140%] object-cover object-center z-[2] opacity-70 rounded-lg"
        draggable={false}
      />

      {/* Img 4 - Extrema direita (hidden mobile) */}
      <motion.img
        src={audience4}
        alt="Palestrante no palco"
        style={{ y: y4 }}
        className="hidden md:block absolute right-0 -top-[10%] w-[22%] h-[120%] object-cover object-center z-[1] opacity-55 rounded-lg"
        draggable={false}
      />

      {/* Gradient masks para blending suave nas bordas */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, oklch(0.20 0.03 300) 0%, transparent 8%, transparent 92%, oklch(0.20 0.03 300) 100%),
            linear-gradient(to bottom, oklch(0.20 0.03 300) 0%, transparent 12%, transparent 88%, oklch(0.20 0.03 300) 100%)
          `,
        }}
      />

      {/* Vignette radial */}
      <div
        className="absolute inset-0 z-[6] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)",
        }}
      />
    </div>
  );
}
