import { motion } from "framer-motion";
import audience1 from "@/assets/alem-da-tendencia/audience-1.jpg";
import audience2 from "@/assets/alem-da-tendencia/audience-2.jpg";
import audience3 from "@/assets/alem-da-tendencia/audience-3.jpg";
import audience4 from "@/assets/alem-da-tendencia/audience-4.jpg";

export function AudienceMontageV2() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg"
      >
        <img src={audience1} alt="Plateia atenta" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </motion.div>
      
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg mt-8"
      >
        <img src={audience2} alt="Networking" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg -mt-8"
      >
        <img src={audience3} alt="Foco no conteúdo" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg"
      >
        <img src={audience4} alt="Palestrante" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </motion.div>
    </div>
  );
}
