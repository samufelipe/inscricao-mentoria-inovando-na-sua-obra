import { MENTORIA_DOCUMENTS, MENTORIA_BONUS_EXPERTS, MENTORIA_IMAGES } from "@/lib/mentoria-constants";
import { CheckCircle2 } from "lucide-react";
import MentoriaImage from "./MentoriaImage";

const expertImages: Record<string, string> = {
  luciana: MENTORIA_IMAGES.bonusLuciana,
  imira: MENTORIA_IMAGES.bonusImira,
  juliana: MENTORIA_IMAGES.bonusJuliana,
  renata: MENTORIA_IMAGES.bonusRenata,
};

export default function MentoriaDocuments() {
  return (
    <section className="py-20 md:py-28 bg-[#FDFBF7]">
      <div className="container mx-auto px-4">
        {/* Documents Pack */}
        <div className="text-center mb-14 animate-fade-up">
          <p className="text-primary font-medium text-lg mb-2">Materiais exclusivos</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pack de documentos que você vai receber
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto mb-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-up animation-delay-100">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-border/30">
                <ul className="space-y-4">
                  {MENTORIA_DOCUMENTS.map((doc, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#9ACD32] flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm md:text-base">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="animate-fade-up animation-delay-200 flex justify-center">
              <MentoriaImage 
                src={MENTORIA_IMAGES.documentsIcon} 
                alt="Pack de documentos"
                className="w-56 h-56 object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Bonus Experts */}
        <div className="text-center mb-14 animate-fade-up">
          <p className="text-[#9ACD32] font-medium text-lg mb-2">Bônus especiais</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Aulas Bônus Exclusivas
          </h2>
          <p className="text-lg text-muted-foreground">Time de Especialistas</p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-4" />
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
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-primary overflow-hidden shadow-lg">
                    <MentoriaImage 
                      src={expertImages[expert.image]} 
                      alt={expert.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <p className="text-primary font-bold text-sm mb-1">{expert.name}</p>
                <p className="text-muted-foreground text-xs leading-snug">{expert.topic}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-primary italic text-base md:text-lg animate-fade-up">
          + aulas bônus de impermeabilização, divulgação de projeto e aulas surpresas
        </p>
      </div>
    </section>
  );
}
