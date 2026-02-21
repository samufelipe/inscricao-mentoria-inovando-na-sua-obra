import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQAccordion() {
  const faqs = [
    {
      question: "O que torna este evento diferente de outros do mercado?",
      answer: "Reunimos especialistas de áreas complementares (gestão de obra, gestão de escritório, iluminação e contratos) em um único dia. Não é palestra motivacional, é conteúdo prático que você aplica na segunda-feira. Além disso, o formato presencial garante networking de altíssimo nível."
    },
    {
      question: "Vou conseguir aplicar o conteúdo imediatamente?",
      answer: "Sim. Cada módulo é focado em ações práticas. Você sai com um plano claro para gestão de obra, precificação, contratos e iluminação, tudo aplicável na semana seguinte."
    },
    {
      question: "O investimento de R$147 realmente vale a pena?",
      answer: "R$147 é menos do que um almoço de negócios em São Paulo. No evento, você acessa conteúdo de especialistas que cobram milhares por consultoria, além de networking com centenas de profissionais. Um único contrato bem feito ou uma obra melhor gerida já paga o investimento dezenas de vezes."
    },
    {
      question: "Não moro em São Paulo. Vale a pena ir?",
      answer: "Profissionais de todo o Brasil participam justamente pelo conteúdo exclusivo e pelo networking presencial que não existe online. O retorno em conexões, parcerias e aprendizado prático supera em muito o custo do deslocamento."
    },
    {
      question: "Quando e onde será o evento?",
      answer: "10 de Março de 2026, das 13h30 às 19h, no Auditório da AFRESP (Av. Brigadeiro Luís Antônio, 4843 - Jardim Paulista, São Paulo - SP)."
    },
    {
      question: "Tem estacionamento?",
      answer: "O local não conta com estacionamento próprio, mas há diversos estacionamentos pagos ao redor para sua comodidade."
    },
    {
      question: "Qual a política de cancelamento?",
      answer: "Cancelamentos podem ser solicitados até 7 dias após a compra, desde que a solicitação seja realizada 48h antes do início do evento, conforme política do Sympla."
    },
    {
      question: "Como vou receber meu ingresso?",
      answer: "Após a confirmação do pagamento, o Sympla envia automaticamente o ingresso para o e-mail cadastrado na compra. Você também pode acessá-lo pelo app do Sympla. No dia do evento, basta apresentar o ingresso digital (QR Code) na entrada do auditório."
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
