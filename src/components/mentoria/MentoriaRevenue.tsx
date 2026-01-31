import MentoriaImage from "./MentoriaImage";
import { MENTORIA_IMAGES } from "@/lib/mentoria-constants";

export default function MentoriaRevenue() {
  return (
    <section className="py-20 md:py-28 bg-[#EDE8DC]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 animate-fade-up">
          <p className="text-[#D4AF37] font-medium text-lg mb-2">Resultados reais</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-4">
            Como você pode faturar mais?
          </h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto rounded-full" />
        </div>

        {/* Imagens verticais dos depoimentos de faturamento - scroll horizontal no mobile */}
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 md:overflow-visible md:pb-0 justify-center">
            <div className="flex-shrink-0 w-64 md:w-auto snap-center animate-fade-up animation-delay-100">
              <MentoriaImage
                src={MENTORIA_IMAGES.revenue1Vertical}
                alt="Depoimento - Faturou 7x o valor da mentoria"
                className="w-full h-auto rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              />
            </div>
            
            <div className="flex-shrink-0 w-64 md:w-auto snap-center animate-fade-up animation-delay-200">
              <MentoriaImage
                src={MENTORIA_IMAGES.revenue2Vertical}
                alt="Depoimento - Faturou 9x o valor da mentoria"
                className="w-full h-auto rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
