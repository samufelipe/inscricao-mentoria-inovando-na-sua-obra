import { MENTORIA_IMAGES } from "@/lib/mentoria-constants";
import MentoriaImage from "./MentoriaImage";

export default function MentoriaAudience() {
  return (
    <section className="py-20 md:py-28 bg-[#FDFBF7]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Para quem é?
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Para arquitetas, designers de interiores e engenheiras que queiram aprender
            a organizar obras de forma eficiente e previsível.
          </p>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-center text-primary italic mb-10 animate-fade-up animation-delay-100">
          A mentoria é para você que ...
        </h3>

        <div className="max-w-4xl mx-auto animate-fade-up animation-delay-200">
          <div className="bg-white rounded-2xl p-4 md:p-8 shadow-sm border border-border/30">
            <MentoriaImage
              src={MENTORIA_IMAGES.audienceSteps}
              alt="Para quem é a mentoria"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
