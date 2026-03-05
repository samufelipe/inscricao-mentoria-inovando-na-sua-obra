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

  // Refined edge-fade masks for seamless blending between images
  const getMaskStyle = (index: number, total: number) => {
    if (index === 0) {
      return "linear-gradient(to right, black 40%, transparent 95%)";
    }
    if (index === total - 1) {
      return "linear-gradient(to right, transparent 5%, black 60%)";
    }
    return "linear-gradient(to right, transparent 5%, black 20%, black 80%, transparent 95%)";
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-2xl"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
      }}
    >
      <div className="absolute inset-0 flex" style={{ margin: "0 -6%" }}>
        {images.map((img, i) => {
          const maskImg = getMaskStyle(i, images.length);
          return (
            <motion.div
              key={i}
              style={{
                y: img.y,
                maskImage: maskImg,
                WebkitMaskImage: maskImg,
                flex: "1 0 30%",
                marginLeft: i === 0 ? 0 : "-5%",
              }}
              className={`relative h-[120%] ${!img.mobileVisible ? "hidden md:block" : ""}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              {/* Subtle top/bottom vignette for cinematic feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15 pointer-events-none" />
            </motion.div>
          );
        })}
      </div>
      {/* Bottom fade into dark section background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.02_280)] via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
