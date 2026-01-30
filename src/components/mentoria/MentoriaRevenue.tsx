import MentoriaImage from "./MentoriaImage";
import { MENTORIA_IMAGES } from "@/lib/mentoria-constants";

export default function MentoriaRevenue() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 animate-fade-up">
          <p className="text-primary font-medium text-lg mb-2">Resultados reais</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Como você pode faturar mais?
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Testimonial 1 */}
          <div className="animate-fade-up animation-delay-100">
            <div className="bg-[#FDFBF7] rounded-2xl p-6 shadow-sm border border-border/30 hover:shadow-md transition-shadow duration-300">
              <div className="text-center mb-4">
                <p className="text-lg text-muted-foreground">
                  Com único contrato ela
                </p>
                <p className="text-2xl md:text-3xl text-foreground font-bold">
                  já <span className="text-primary">faturou 7x</span>
                </p>
                <p className="text-lg text-muted-foreground">
                  o valor da mentoria
                </p>
              </div>
              <div className="rounded-xl overflow-hidden">
                <MentoriaImage
                  src={MENTORIA_IMAGES.revenue1}
                  alt="Depoimento - Faturou 7x"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="animate-fade-up animation-delay-200">
            <div className="bg-[#FDFBF7] rounded-2xl p-6 shadow-sm border border-border/30 hover:shadow-md transition-shadow duration-300">
              <div className="text-center mb-4">
                <p className="text-lg text-muted-foreground">
                  Com único contrato ela
                </p>
                <p className="text-2xl md:text-3xl text-foreground font-bold">
                  já <span className="text-primary">faturou 9x</span>
                </p>
                <p className="text-lg text-muted-foreground">
                  o valor da mentoria
                </p>
              </div>
              <div className="rounded-xl overflow-hidden">
                <MentoriaImage
                  src={MENTORIA_IMAGES.revenue2}
                  alt="Depoimento - Faturou 9x"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
