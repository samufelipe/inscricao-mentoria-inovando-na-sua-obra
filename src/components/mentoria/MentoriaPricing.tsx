import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MENTORIA_PRICING, MENTORIA_IMAGES } from "@/lib/mentoria-constants";
import { ArrowRight, Loader2, Shield } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import MentoriaImage from "./MentoriaImage";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
  email: z.string().email("E-mail inválido").max(255),
});

export default function MentoriaPricing() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleSubmit = async (e: React.FormEvent, isBoleto: boolean = false) => {
    e.preventDefault();
    setErrors({});

    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: { name?: string; email?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "name") fieldErrors.name = err.message;
        if (err.path[0] === "email") fieldErrors.email = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const checkoutUrl = new URL("/checkout/mentoria", window.location.origin);
      checkoutUrl.searchParams.set("email", formData.email.toLowerCase().trim());
      checkoutUrl.searchParams.set("name", formData.name.trim());
      
      if (isBoleto) {
        checkoutUrl.searchParams.set("payment", "boleto");
      }

      const utmParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
      utmParams.forEach((param) => {
        const value = searchParams.get(param);
        if (value) {
          checkoutUrl.searchParams.set(param, value);
        }
      });

      navigate(checkoutUrl.pathname + checkoutUrl.search);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erro ao processar",
        description: "Tente novamente em alguns segundos.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#5D4037]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-up">
          <p className="text-[#D4AF37] font-medium text-lg mb-2">Investimento</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            E quanto é o investimento mais importante do seu ano?
          </h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Imagem do card de preço original */}
            <div className="animate-fade-up animation-delay-100">
              <MentoriaImage
                src={MENTORIA_IMAGES.pricingCard}
                alt="Investimento da Mentoria"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>

            {/* Formulário de captura sobreposto */}
            <div className="animate-fade-up animation-delay-200">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-[#1a1a1a] text-center mb-2">
                  Garanta sua vaga agora!
                </h3>
                <p className="text-sm text-gray-600 text-center mb-6">
                  Preencha seus dados para acessar o checkout
                </p>

                <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
                  <div>
                    <Label htmlFor="pricing-name" className="text-[#1a1a1a] text-sm font-medium">
                      Seu nome completo
                    </Label>
                    <Input
                      id="pricing-name"
                      type="text"
                      placeholder="Digite seu nome"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`mt-1.5 h-12 bg-gray-50 border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37] ${errors.name ? "border-red-500" : ""}`}
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="pricing-email" className="text-[#1a1a1a] text-sm font-medium">
                      Seu melhor e-mail
                    </Label>
                    <Input
                      id="pricing-email"
                      type="email"
                      placeholder="Digite seu e-mail"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`mt-1.5 h-12 bg-gray-50 border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37] ${errors.email ? "border-red-500" : ""}`}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#9ACD32] hover:bg-[#8BC52A] text-white font-bold text-base h-14 uppercase shadow-lg hover:shadow-xl transition-all duration-300 group border-2 border-[#1a1a1a]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      <>
                        Quero meu acesso agora
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="w-full border-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-gray-50 font-bold text-base h-14 uppercase"
                    disabled={isSubmitting}
                    onClick={(e) => handleSubmit(e as unknown as React.FormEvent, true)}
                  >
                    Boleto parcelado
                  </Button>
                </form>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-2 mt-6 text-gray-500">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs">Compra 100% segura • Garantia de 15 dias</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
