import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQAccordion() {
  const faqs = [
    {
      question: "Quando e onde será o evento?",
      answer: "O evento será realizado no dia 10 de Março de 2026, das 14h às 18h, no Auditório da AFRESP (Av. Brigadeiro Luís Antônio, 4843 - Jardim Paulista, São Paulo - SP)."
    },
    {
      question: "O evento é presencial ou online?",
      answer: "O evento é 100% presencial, focado em networking e imersão prática. Não haverá transmissão online."
    },
    {
      question: "Receberei certificado?",
      answer: "Sim, todas as participantes receberão certificado de participação digital após o evento."
    },
    {
      question: "Posso levar acompanhante?",
      answer: "O ingresso é individual. Caso queira levar acompanhante, é necessário adquirir um ingresso adicional."
    },
    {
      question: "Qual a política de cancelamento?",
      answer: "Cancelamentos podem ser solicitados até 7 dias após a compra, desde que a solicitação seja realizada 48h antes do início do evento, conforme política do Sympla."
    },
    {
      question: "Haverá coffee break?",
      answer: "Sim, haverá um momento de networking com coffee break incluso no valor da inscrição."
    },
    {
      question: "Como faço para chegar ao local?",
      answer: "O local possui fácil acesso por transporte público e estacionamento conveniado nas proximidades."
    }
  ];

  return (
    <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
          <AccordionTrigger className="text-left font-sans font-bold text-lg hover:text-[oklch(0.75_0.18_65)] transition-colors py-6">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 leading-relaxed pb-6">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
