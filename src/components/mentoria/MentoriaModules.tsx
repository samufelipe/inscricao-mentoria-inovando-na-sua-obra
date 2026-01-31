import { MENTORIA_MODULES } from "@/lib/mentoria-constants";
import { CheckCircle2 } from "lucide-react";
import MentoriaImage from "./MentoriaImage";

export default function MentoriaModules() {
  return (
    <section className="py-20 md:py-28 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <p className="text-primary font-medium text-lg mb-2">Conteúdo exclusivo</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Como é a mentoria por dentro?
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          {MENTORIA_MODULES.map((module, index) => (
            <div
              key={module.number}
              className={`bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200 animate-fade-up hover:shadow-2xl transition-all duration-500`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <MentoriaImage
                    src={module.image}
                    alt={`Módulo ${module.number} - ${module.title}`}
                    className="w-full h-full object-cover min-h-[200px] md:min-h-[300px]"
                  />
                </div>

                {/* Content */}
                <div className={`p-6 md:p-8 flex flex-col justify-center ${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full font-semibold">
                      MÓDULO {module.number}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-5">
                    {module.title}
                  </h3>
                  <ul className="space-y-3">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#9ACD32] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm md:text-base">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
