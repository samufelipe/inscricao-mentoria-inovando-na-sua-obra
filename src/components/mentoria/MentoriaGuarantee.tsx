import { Button } from "@/components/ui/button";
import { MENTORIA_WHATSAPP } from "@/lib/mentoria-constants";
import { MessageCircle, Shield } from "lucide-react";

export default function MentoriaGuarantee() {
  return (
    <section className="py-20 md:py-28 bg-[#FDFBF7]">
      <div className="container mx-auto px-4">
        {/* Guarantee */}
        <div className="max-w-3xl mx-auto text-center mb-20 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-[#9ACD32]/10 text-[#9ACD32] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            <span>Garantia incondicional</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Risco Zero para você
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
            Confiamos tanto no nosso conteúdo que damos uma{" "}
            <span className="font-semibold text-foreground">garantia incondicional de 15 dias</span> pra você.
          </p>

          <div className="inline-flex items-center gap-6 bg-white rounded-2xl p-6 shadow-sm border border-border/30">
            <div className="text-left">
              <span className="text-primary font-bold text-xl md:text-2xl uppercase leading-tight block">
                Garantia
              </span>
              <span className="text-primary font-bold text-xl md:text-2xl uppercase leading-tight block">
                Incondicional
              </span>
            </div>
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary to-[hsl(43,96%,45%)] flex items-center justify-center shadow-lg">
              <span className="text-xl md:text-2xl font-bold text-foreground text-center leading-tight">
                15<br/>DIAS
              </span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground max-w-md mx-auto mt-6">
            Compra 100% segura pela plataforma HOTMART.<br />
            Se em 15 dias não gostar, você pode pedir seu reembolso e tem 100% do seu dinheiro de volta.
          </p>
        </div>

        {/* Support CTA */}
        <div className="text-center animate-fade-up animation-delay-200">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Ficou com alguma dúvida?
          </h3>
          <Button
            asChild
            size="lg"
            className="bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-base px-8 h-14 uppercase shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <a href={MENTORIA_WHATSAPP} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Falar com o suporte
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
