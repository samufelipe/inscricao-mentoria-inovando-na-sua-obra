import { MENTORIA_IMAGES, MENTORIA_MENTORS_BIO } from "@/lib/mentoria-constants";
import MentoriaImage from "./MentoriaImage";

export default function MentoriaMentors() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 animate-fade-up">
          <p className="text-primary font-medium text-lg mb-2">Conheça suas mentoras</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Quem somos nós?
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
          {/* Mentors Image */}
          <div className="animate-fade-up flex justify-center order-1 md:order-2">
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
              <MentoriaImage
                src={MENTORIA_IMAGES.mentors}
                alt="Ingrid Zarza e Fernanda Bradaschia"
                className="w-full max-w-md h-auto relative z-10 drop-shadow-xl"
              />
            </div>
          </div>

          {/* Bio Text */}
          <div className="animate-fade-up animation-delay-100 order-2 md:order-1">
            <div className="space-y-4">
              {MENTORIA_MENTORS_BIO.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-muted-foreground text-base leading-relaxed">
                  {paragraph.split(/(Ingrid Zarza e Fernanda Bradaschia|INOVANDO ARQUITETURA|@inovandonasuaobra|Mentoria Inovando na Sua Obra|já concluímos mais de 250 obras|compartilhamos experiências reais de obra, dicas valiosas e estratégias práticas|Em 2024)/).map((part, i) => {
                    const boldPhrases = [
                      "Ingrid Zarza e Fernanda Bradaschia",
                      "INOVANDO ARQUITETURA",
                      "@inovandonasuaobra",
                      "Mentoria Inovando na Sua Obra",
                      "já concluímos mais de 250 obras",
                      "compartilhamos experiências reais de obra, dicas valiosas e estratégias práticas",
                      "Em 2024"
                    ];
                    if (boldPhrases.includes(part)) {
                      return <strong key={i} className="text-foreground">{part}</strong>;
                    }
                    return part;
                  })}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
