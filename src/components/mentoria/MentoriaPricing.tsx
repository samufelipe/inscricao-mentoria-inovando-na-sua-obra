import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MENTORIA_PRICING } from "@/lib/mentoria-constants";
import { ArrowRight, Loader2, Shield, Star, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

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
    <section id="pricing" className="py-20 md:py-28 bg-gradient-to-b from-[#5D4037] to-[#4A3229] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-up">
          <p className="text-primary font-medium text-lg mb-2">Investimento</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            E quanto é o investimento mais importante do seu ano?
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="max-w-lg mx-auto">
          {/* Price Card */}
          <div className="bg-white rounded-3xl p-8 md:p-10 text-foreground shadow-2xl animate-fade-up animation-delay-100 relative overflow-hidden">
            {/* Badge */}
            <div className="absolute top-0 right-0">
              <div className="bg-primary text-foreground font-bold text-xs px-4 py-2 rounded-bl-2xl flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                RECOMENDADO
              </div>
            </div>

            <div className="text-center mb-8">
              <p className="text-primary font-bold text-lg uppercase mb-4">
                Oportunidade única e exclusiva!
              </p>
              
              {/* Price display */}
              <div className="bg-gradient-to-r from-primary to-[hsl(43,96%,45%)] text-foreground inline-block px-8 py-6 rounded-2xl mb-4 shadow-lg">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-lg font-medium">12x</span>
                  <span className="text-sm">R$</span>
                  <span className="text-5xl md:text-6xl font-bold">{MENTORIA_PRICING.installmentValue}</span>
                  <span className="text-2xl">,{MENTORIA_PRICING.installmentCents}</span>
                </div>
              </div>
              
              <p className="text-muted-foreground">
                ou <span className="font-semibold text-foreground">{MENTORIA_PRICING.fullPrice}</span> à vista
              </p>
            </div>

            {/* Features List */}
            <div className="mb-8">
              <ul className="grid grid-cols-2 gap-3">
                {MENTORIA_PRICING.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#9ACD32] flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Form */}
            <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
              <div>
                <Label htmlFor="pricing-name" className="text-foreground text-sm font-medium">
                  Seu nome completo
                </Label>
                <Input
                  id="pricing-name"
                  type="text"
                  placeholder="Digite seu nome"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`mt-1.5 h-12 bg-muted/30 border-border/50 ${errors.name ? "border-destructive" : ""}`}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-xs text-destructive mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="pricing-email" className="text-foreground text-sm font-medium">
                  Seu melhor e-mail
                </Label>
                <Input
                  id="pricing-email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`mt-1.5 h-12 bg-muted/30 border-border/50 ${errors.email ? "border-destructive" : ""}`}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">{errors.email}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#9ACD32] hover:bg-[#8BC52A] text-foreground font-bold text-base h-14 uppercase shadow-lg hover:shadow-xl transition-all duration-300 group"
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
                className="w-full border-2 border-foreground/20 text-foreground hover:bg-foreground/5 font-bold text-base h-14 uppercase"
                disabled={isSubmitting}
                onClick={(e) => handleSubmit(e as unknown as React.FormEvent, true)}
              >
                Boleto parcelado
              </Button>
            </form>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-2 mt-6 text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span className="text-xs">Compra 100% segura • Garantia de 15 dias</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
