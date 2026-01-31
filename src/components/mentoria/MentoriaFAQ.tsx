import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MENTORIA_FAQ } from "@/lib/mentoria-constants";
import { HelpCircle } from "lucide-react";

export default function MentoriaFAQ() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 text-[#D4AF37] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>Tire suas dúvidas</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-4">
            Perguntas Frequentes
          </h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {MENTORIA_FAQ.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-[#EDE8DC] rounded-xl border border-[#D4AF37]/20 shadow-sm overflow-hidden animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <AccordionTrigger className="text-left text-[#1a1a1a] hover:text-[#D4AF37] px-6 py-5 hover:no-underline [&[data-state=open]]:text-[#D4AF37]">
                  <span className="flex items-center gap-3 pr-4">
                    <span className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#D4AF37] font-bold text-sm">{index + 1}</span>
                    </span>
                    <span className="font-medium">{item.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 px-6 pb-5 pt-0 ml-11">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
