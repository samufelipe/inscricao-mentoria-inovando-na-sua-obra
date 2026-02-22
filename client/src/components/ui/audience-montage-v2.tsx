import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import audience1 from "@/assets/alem-da-tendencia/audience-1.jpg";
import audience2 from "@/assets/alem-da-tendencia/audience-2.jpg";
import audience3 from "@/assets/alem-da-tendencia/audience-3.jpg";
import audience4 from "@/assets/alem-da-tendencia/audience-4.jpg";

export function AudienceMontageV2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const images = [
    { src: audience1, alt: "Plateia atenta", y: y1, mobileVisible: true },
    { src: audience2, alt: "Networking", y: y2, mobileVisible: false },
    { src: audience3, alt: "Foco no conteúdo", y: y3, mobileVisible: false },
    { src: audience4, alt: "Palestrante", y: y4, mobileVisible: true },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-2xl"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
      }}
    >
      <div className="absolute inset-0 flex">
        {images.map((img, i) => (
          <motion.div
            key={i}
            style={{ y: img.y }}
            className={`relative flex-1 h-[120%] ${!img.mobileVisible ? "hidden md:block" : ""}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
          </motion.div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.02_280)] via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
