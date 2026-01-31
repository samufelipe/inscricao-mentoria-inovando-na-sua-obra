import { MENTORIA_IMAGES } from "@/lib/mentoria-constants";
import MentoriaImage from "./MentoriaImage";

export default function MentoriaSkills() {
  return (
    <section className="py-20 md:py-28 bg-[#EDE8DC]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-4">
            O que você vai aprender?
          </h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto rounded-full" />
        </div>

        {/* Imagem única do design original */}
        <div className="max-w-4xl mx-auto animate-fade-up animation-delay-100">
          <MentoriaImage
            src={MENTORIA_IMAGES.skillsImage}
            alt="Habilidades Técnicas e Comportamentais que você vai aprender"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
