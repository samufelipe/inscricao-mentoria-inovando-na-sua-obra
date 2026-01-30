import { MENTORIA_SKILLS } from "@/lib/mentoria-constants";
import { CheckCircle2 } from "lucide-react";

export default function MentoriaSkills() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            O que você vai aprender?
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Habilidades Técnicas */}
            <div className="animate-fade-up animation-delay-100">
              <div className="bg-[#FDFBF7] rounded-2xl p-8 shadow-sm border border-border/30 h-full hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">🛠️</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">
                    Habilidades Técnicas
                  </h3>
                </div>
                <ul className="space-y-4">
                  {MENTORIA_SKILLS.technical.map((skill, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground text-base md:text-lg">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Plus sign between cards */}
            <div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <span className="text-3xl font-bold text-foreground">+</span>
              </div>
            </div>

            {/* Habilidades Comportamentais */}
            <div className="animate-fade-up animation-delay-200">
              <div className="bg-[#FDFBF7] rounded-2xl p-8 shadow-sm border border-border/30 h-full hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">💡</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">
                    Habilidades Comportamentais
                  </h3>
                </div>
                <ul className="space-y-4">
                  {MENTORIA_SKILLS.behavioral.map((skill, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground text-base md:text-lg">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Plus sign for mobile */}
          <div className="flex md:hidden items-center justify-center -mt-4 -mb-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-foreground">+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
