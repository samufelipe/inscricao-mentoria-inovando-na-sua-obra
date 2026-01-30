import { MENTORIA_HOW_IT_WORKS } from "@/lib/mentoria-constants";
import { CheckCircle2 } from "lucide-react";

export default function MentoriaHowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 animate-fade-up">
          <p className="text-primary font-medium text-lg mb-2">Metodologia completa</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Como funciona a Mentoria?
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-[#FDFBF7] rounded-2xl p-8 md:p-10 shadow-sm border border-border/30">
            <ul className="space-y-5">
              {MENTORIA_HOW_IT_WORKS.map((item, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-4 animate-fade-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-6 h-6 text-[#9ACD32]" />
                  </div>
                  <p className="text-foreground text-base md:text-lg leading-relaxed">
                    <span className="font-semibold">{item.bold}</span>
                    {item.text && <span className="text-muted-foreground"> {item.text}</span>}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
