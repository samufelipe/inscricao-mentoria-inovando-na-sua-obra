import { motion } from "framer-motion";
import audience1 from "@/assets/alem-da-tendencia/audience-1.jpg";
import audience2 from "@/assets/alem-da-tendencia/audience-2.jpg";
import audience3 from "@/assets/alem-da-tendencia/audience-3.jpg";
import audience4 from "@/assets/alem-da-tendencia/audience-4.jpg";

export function AudienceMontageV2() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-[#1a1a1a] shadow-2xl">
      {/* Container Panorâmico (Desktop) */}
      <div className="hidden md:grid grid-cols-4 h-[400px] relative">
        {/* Imagem 1 */}
        <div className="relative h-full w-full overflow-hidden group">
          <img
            src={audience1}
            alt="Plateia atenta"
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
          />
          {/* Vinheta suave apenas nas bordas */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </div>

        {/* Imagem 2 */}
        <div className="relative h-full w-full overflow-hidden group">
          <img
            src={audience2}
            alt="Networking"
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
          />
          {/* Vinheta suave */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        </div>

        {/* Imagem 3 */}
        <div className="relative h-full w-full overflow-hidden group">
          <img
            src={audience3}
            alt="Foco no conteúdo"
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
          />
          {/* Vinheta suave */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        </div>

        {/* Imagem 4 */}
        <div className="relative h-full w-full overflow-hidden group">
          <img
            src={audience4}
            alt="Palestrante"
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
          />
          {/* Vinheta suave apenas nas bordas */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-transparent" />
        </div>
      </div>

      {/* Versão Mobile (Grid 2x2 Limpo - Sem cortes estranhos) */}
      <div className="md:hidden grid grid-cols-2 h-[400px]">
        <div className="relative overflow-hidden border-r border-b border-white/10">
          <img
            src={audience2}
            alt="Networking"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="relative overflow-hidden border-b border-white/10">
          <img
            src={audience1}
            alt="Plateia"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="relative overflow-hidden border-r border-white/10">
          <img
            src={audience3}
            alt="Foco"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="relative overflow-hidden">
          <img
            src={audience4}
            alt="Palestra"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      </div>

      {/* Borda sutil para acabamento */}
      <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-xl" />
    </div>
  );
}
