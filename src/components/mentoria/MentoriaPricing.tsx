import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MENTORIA_CHECKOUT_URLS } from "@/lib/mentoria-constants";
import { ArrowRight, Loader2, Shield, CheckCircle2, Users, Building2, Award } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
  email: z.string().email("E-mail inválido").max(255),
});

const STATS = [
  { icon: Building2, value: "+250", label: "Obras gerenciadas" },
  { icon: Users, value: "+100", label: "Alunas transformadas" },
  { icon: Award, value: "12", label: "Anos de experiência" },
];

const BENEFITS = [
  "16h de conteúdo gravado em 4 módulos",
  "12 meses de acesso à plataforma",
  "1h de mentoria individual",
  "Encontro presencial em São Paulo",
  "Materiais, checklists e ferramentas",
  "Suporte e grupo de networking",
];

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
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <p className="text-[#D4AF37] font-medium text-lg mb-2">Investimento</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            E quanto é o investimento mais importante do seu ano?
          </h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto rounded-full" />
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12 animate-fade-up animation-delay-100">
          {STATS.map((stat, index) => (
            <div key={index} className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Card */}
        <div className="max-w-2xl mx-auto animate-fade-up animation-delay-200">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
            {/* Price Header */}
            <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8962E] p-6 md:p-8 text-center">
              <p className="text-[#5D4037] text-sm font-medium mb-1">Acesso completo por</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-[#5D4037] text-2xl font-bold">12x</span>
                <span className="text-[#5D4037] text-5xl md:text-6xl font-black">R$ 196</span>
                <span className="text-[#5D4037] text-2xl font-bold">,50</span>
              </div>
              <p className="text-[#5D4037]/80 text-sm mt-2">ou R$ 1.900,00 à vista</p>
            </div>

            {/* Benefits List */}
            <div className="p-6 md:p-8 bg-gray-50 border-b border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {BENEFITS.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#1B8A3F] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="p-6 md:p-8">
              <h3 className="text-lg font-bold text-[#1a1a1a] text-center mb-1">
                Garanta sua vaga agora!
              </h3>
              <p className="text-sm text-gray-500 text-center mb-6">
                Preencha seus dados para acessar o checkout seguro
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
                  className="w-full bg-[#1B8A3F] hover:bg-[#157A35] text-white font-bold text-base h-14 uppercase shadow-lg hover:shadow-xl transition-all duration-300 group"
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
                  className="w-full border-2 border-[#5D4037] text-[#5D4037] hover:bg-[#5D4037]/5 font-bold text-sm h-12 uppercase"
                  disabled={isSubmitting}
                  onClick={(e) => handleSubmit(e as unknown as React.FormEvent, true)}
                >
                  Prefiro pagar com Boleto Parcelado
                </Button>
              </form>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-2 mt-6 text-gray-400">
                <Shield className="w-4 h-4" />
                <span className="text-xs">Compra 100% segura • Garantia de 15 dias</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
