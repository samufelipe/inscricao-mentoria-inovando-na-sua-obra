import { MENTORIA_MODULES } from "@/lib/mentoria-constants";
import MentoriaImage from "./MentoriaImage";

export default function MentoriaModules() {
  return (
    <section className="py-20 md:py-28 bg-[#EDE8DC]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <p className="text-[#D4AF37] font-medium text-lg mb-2">Conteúdo exclusivo</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-4">
            Como é a mentoria por dentro?
          </h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto rounded-full" />
        </div>

        {/* Cards verticais dos módulos - scroll horizontal no mobile */}
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
            {MENTORIA_MODULES.map((module, index) => (
              <div
                key={module.number}
                className="flex-shrink-0 w-72 md:w-auto snap-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <MentoriaImage
                  src={module.verticalImage}
                  alt={`Módulo ${module.number} - ${module.title}`}
                  className="w-full h-auto rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
