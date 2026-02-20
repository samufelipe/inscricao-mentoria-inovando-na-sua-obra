import { motion } from "framer-motion";
import audience1 from "@/assets/alem-da-tendencia/audience-1.jpg";
import audience2 from "@/assets/alem-da-tendencia/audience-2.jpg";
import audience3 from "@/assets/alem-da-tendencia/audience-3.jpg";
import audience4 from "@/assets/alem-da-tendencia/audience-4.jpg";

export function AudienceMontageV2() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-[#1a1a1a] shadow-2xl">
      {/* Container Panorâmico (Desktop) - com blending suave entre imagens */}
      <div className="hidden md:block relative h-[400px] overflow-hidden">
        {/* Imagem 1 - Esquerda */}
        <img
          src={audience1}
          alt="Plateia atenta"
          className="absolute left-0 top-0 w-[30%] h-full object-cover opacity-85"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, black 0%, black 50%, transparent 95%)',
            maskImage: 'linear-gradient(to right, black 0%, black 50%, transparent 95%)',
          }}
        />
        {/* Imagem 2 - Centro-Esquerda */}
        <img
          src={audience2}
          alt="Networking"
          className="absolute left-[18%] top-0 w-[35%] h-full object-cover z-[2] opacity-90"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          }}
        />
        {/* Imagem 3 - Centro-Direita */}
        <img
          src={audience3}
          alt="Foco no conteúdo"
          className="absolute right-[18%] top-0 w-[35%] h-full object-cover z-[3] opacity-90"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          }}
        />
        {/* Imagem 4 - Direita */}
        <img
          src={audience4}
          alt="Palestrante"
          className="absolute right-0 top-0 w-[30%] h-full object-cover z-[1] opacity-85"
          style={{
            WebkitMaskImage: 'linear-gradient(to left, black 0%, black 50%, transparent 95%)',
            maskImage: 'linear-gradient(to left, black 0%, black 50%, transparent 95%)',
          }}
        />
        {/* Vinheta radial geral */}
        <div
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)' }}
        />
        {/* Gradientes de borda top/bottom */}
        <div
          className="absolute inset-0 z-[6] pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(26,26,26,0.6) 0%, transparent 15%, transparent 85%, rgba(26,26,26,0.6) 100%)' }}
        />
      </div>

      {/* Versão Mobile - 2 imagens com blending */}
      <div className="md:hidden relative h-[300px] overflow-hidden">
        <img
          src={audience2}
          alt="Networking"
          className="absolute left-0 top-0 w-[60%] h-full object-cover opacity-90"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, black 0%, black 50%, transparent 100%)',
            maskImage: 'linear-gradient(to right, black 0%, black 50%, transparent 100%)',
          }}
        />
        <img
          src={audience3}
          alt="Foco"
          className="absolute right-0 top-0 w-[60%] h-full object-cover opacity-90 z-[2]"
          style={{
            WebkitMaskImage: 'linear-gradient(to left, black 0%, black 50%, transparent 100%)',
            maskImage: 'linear-gradient(to left, black 0%, black 50%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)' }}
        />
        <div
          className="absolute inset-0 z-[6] pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(26,26,26,0.5) 0%, transparent 12%, transparent 88%, rgba(26,26,26,0.5) 100%)' }}
        />
      </div>

      {/* Borda sutil para acabamento */}
      <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-xl" />
    </div>
  );
}
