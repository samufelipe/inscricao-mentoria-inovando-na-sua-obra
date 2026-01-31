import { Button } from "@/components/ui/button";
import { MENTORIA_WHATSAPP, MENTORIA_IMAGES } from "@/lib/mentoria-constants";
import { MessageCircle } from "lucide-react";
import MentoriaImage from "./MentoriaImage";

export default function MentoriaGuarantee() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        {/* Guarantee - Usando imagens originais */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          {/* Banner de garantia */}
          <div className="animate-fade-up mb-8">
            <MentoriaImage
              src={MENTORIA_IMAGES.guaranteeBanner}
              alt="Garantia incondicional"
              className="w-full h-auto"
            />
          </div>

          {/* Selo de garantia */}
          <div className="animate-fade-up animation-delay-100">
            <MentoriaImage
              src={MENTORIA_IMAGES.guaranteeSeal}
              alt="Garantia de 15 dias - Risco Zero"
              className="w-full max-w-lg mx-auto h-auto"
            />
          </div>

          <p className="text-sm text-gray-600 max-w-md mx-auto mt-6 animate-fade-up animation-delay-200">
            Compra 100% segura pela plataforma HOTMART.<br />
            Se em 15 dias não gostar, você pode pedir seu reembolso e tem 100% do seu dinheiro de volta.
          </p>
        </div>

        {/* Support CTA */}
        <div className="text-center animate-fade-up animation-delay-300">
          <h3 className="text-2xl md:text-3xl font-bold text-[#D4AF37] mb-6">
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
