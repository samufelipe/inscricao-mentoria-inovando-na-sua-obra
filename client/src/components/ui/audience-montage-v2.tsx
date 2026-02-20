import { motion } from "framer-motion";
import audience1 from "@/assets/alem-da-tendencia/audience-1.jpg";
import audience2 from "@/assets/alem-da-tendencia/audience-2.jpg";
import audience3 from "@/assets/alem-da-tendencia/audience-3.jpg";
import audience4 from "@/assets/alem-da-tendencia/audience-4.jpg";

export function AudienceMontageV2() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-black shadow-2xl">
      {/* Container Panorâmico (Desktop) */}
      <div className="hidden md:grid grid-cols-4 h-[400px] relative">
        {/* Imagem 1 */}
        <div className="relative h-full w-full overflow-hidden">
          <img
            src={audience1}
            alt="Plateia atenta"
            className="absolute inset-0 w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-transparent to-transparent" />
        </div>

        {/* Imagem 2 */}
        <div className="relative h-full w-full overflow-hidden">
          <img
            src={audience2}
            alt="Networking"
            className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-transparent to-transparent" />
        </div>

        {/* Imagem 3 */}
        <div className="relative h-full w-full overflow-hidden">
          <img
            src={audience3}
            alt="Foco no conteúdo"
            className="absolute inset-0 w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-transparent to-transparent" />
        </div>

        {/* Imagem 4 */}
        <div className="relative h-full w-full overflow-hidden">
          <img
            src={audience4}
            alt="Palestrante"
            className="absolute inset-0 w-full h-full object-cover opacity-50 hover:opacity-70 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black" />
        </div>

        {/* Overlay Geral para Unificar */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Versão Mobile (Carrossel Vertical Suave) */}
      <div className="md:hidden flex flex-col gap-0 relative h-[500px]">
        <div className="flex-1 relative overflow-hidden">
          <img
            src={audience2}
            alt="Networking"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/80" />
        </div>
        <div className="flex-1 relative overflow-hidden">
          <img
            src={audience1}
            alt="Plateia"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
        </div>
        
        {/* Vinheta Forte Mobile */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      {/* Bordas Cinemáticas (Vinheta Geral) */}
      <div className="absolute inset-0 pointer-events-none border-[1px] border-white/10 rounded-xl shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" />
    </div>
  );
}
