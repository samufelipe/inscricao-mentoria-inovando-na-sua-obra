import { MENTORIA_IMAGES, MENTORIA_BONUS_EXPERTS } from "@/lib/mentoria-constants";
import MentoriaImage from "./MentoriaImage";

const expertImages: Record<string, string> = {
  luciana: MENTORIA_IMAGES.bonusLuciana,
  imira: MENTORIA_IMAGES.bonusImira,
  juliana: MENTORIA_IMAGES.bonusJuliana,
  renata: MENTORIA_IMAGES.bonusRenata,
};

export default function MentoriaDocuments() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        {/* Documents Pack - Usando imagem original */}
        <div className="text-center mb-14 animate-fade-up">
          <p className="text-[#D4AF37] font-medium text-lg mb-2">Materiais exclusivos</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-4">
            Pack de documentos que você vai receber
          </h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto mb-24 animate-fade-up animation-delay-100">
          <MentoriaImage
            src={MENTORIA_IMAGES.documentsPack}
            alt="Pack de documentos da mentoria"
            className="w-full h-auto"
          />
        </div>

        {/* Bonus Experts */}
        <div className="text-center mb-14 animate-fade-up">
          <p className="text-[#9ACD32] font-medium text-lg mb-2">Bônus especiais</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-4">
            Aulas Bônus Exclusivas
          </h2>
          <p className="text-lg text-gray-600">Time de Especialistas</p>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto rounded-full mt-4" />
        </div>

        {/* Experts Grid */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {MENTORIA_BONUS_EXPERTS.map((expert, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center animate-fade-up text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative mb-4">
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-[#D4AF37] overflow-hidden shadow-lg">
                    <MentoriaImage 
                      src={expertImages[expert.image]} 
                      alt={expert.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <p className="text-[#D4AF37] font-bold text-sm mb-1">{expert.name}</p>
                <p className="text-gray-600 text-xs leading-snug">{expert.topic}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-[#D4AF37] italic text-base md:text-lg animate-fade-up">
          + aulas bônus de impermeabilização, divulgação de projeto e aulas surpresas
        </p>
      </div>
    </section>
  );
}
