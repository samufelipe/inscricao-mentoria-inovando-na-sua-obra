import { MENTORIA_IMAGES } from "@/lib/mentoria-constants";
import MentoriaImage from "./MentoriaImage";

export default function MentoriaHowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 animate-fade-up">
          <p className="text-[#D4AF37] font-medium text-lg mb-2">Metodologia completa</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-4">
            Como funciona a Mentoria?
          </h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto rounded-full" />
        </div>

        {/* Imagens originais do funcionamento */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="animate-fade-up animation-delay-100">
            <MentoriaImage
              src={MENTORIA_IMAGES.howItWorks1}
              alt="Como funciona a mentoria - Parte 1"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          
          <div className="animate-fade-up animation-delay-200">
            <MentoriaImage
              src={MENTORIA_IMAGES.howItWorks2}
              alt="Como funciona a mentoria - Parte 2"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
