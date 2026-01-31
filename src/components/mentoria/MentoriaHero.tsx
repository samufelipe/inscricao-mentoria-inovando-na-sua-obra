import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MENTORIA_IMAGES } from "@/lib/mentoria-constants";
import { ArrowRight, Loader2, Users, Clock, FileCheck } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import MentoriaImage from "./MentoriaImage";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
  email: z.string().email("E-mail inválido").max(255),
});

interface MentoriaHeroProps {
  onCtaClick: () => void;
}

export default function MentoriaHero({ onCtaClick }: MentoriaHeroProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
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
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Text Content */}
          <div className="text-center lg:text-left animate-fade-up order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              <span>+250 arquitetas já transformaram suas obras</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-none mb-6 uppercase tracking-tight">
              Domine o gerenciamento de obra de interiores de maneira{" "}
              <span className="text-[#D4AF37] font-extrabold not-italic">lucrativa e eficiente</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Transforme cada projeto em uma jornada inesquecível para seus clientes, desde o
              primeiro contato até a entrega final.
            </p>

            {/* Social Proof Pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">16h de conteúdo</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <FileCheck className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">Materiais prontos</span>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-2xl border border-primary/20 max-w-md mx-auto lg:mx-0">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Preencha para acessar o checkout
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="hero-name" className="text-foreground text-sm font-medium">
                    Seu nome completo
                  </Label>
                  <Input
                    id="hero-name"
                    type="text"
                    placeholder="Digite seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`mt-1.5 h-12 bg-muted/30 border-border/50 focus:border-primary focus:ring-primary ${errors.name ? "border-destructive" : ""}`}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="hero-email" className="text-foreground text-sm font-medium">
                    Seu melhor e-mail
                  </Label>
                  <Input
                    id="hero-email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`mt-1.5 h-12 bg-muted/30 border-border/50 focus:border-primary focus:ring-primary ${errors.email ? "border-destructive" : ""}`}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive mt-1">{errors.email}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#9ACD32] hover:bg-[#8BC52A] text-white font-bold text-base h-14 uppercase tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      Quero entrar na mentoria
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                🔒 Seus dados estão 100% seguros
              </p>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-up animation-delay-200 flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#9ACD32]/20 rounded-full blur-2xl" />
              
              <MentoriaImage
                src={MENTORIA_IMAGES.heroMentoras}
                alt="Ingrid Zarza e Fernanda Bradaschia - Mentoras"
                className="w-full max-w-lg h-auto relative z-10 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
