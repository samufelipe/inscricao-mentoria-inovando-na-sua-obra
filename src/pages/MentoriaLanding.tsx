import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, ArrowRight, Loader2, CheckCircle2, Users, Building2, Award } from "lucide-react";
import MentoriaMobileCTA from "@/components/mentoria/MentoriaMobileCTA";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";
import { useParallax } from "@/hooks/use-parallax";
import { 
  trackPageView, 
  trackCTAClick, 
  trackSectionView,
  initScrollTracking, 
  initTimeTracking 
} from "@/lib/gtm-tracking";
import { saveUtmParams, getMergedUtmParams } from "@/lib/utm-storage";
import garantiaMobileImg from "@/assets/garantia-15-dias-mobile.png";
import mentorasImg from "@/assets/mentoras.png";
import logoImg from "@/assets/logo-white-gold.png";
import "../styles/mentoria-wp.css";

// Vimeo IDs dos depoimentos (funcionam independente do WordPress)
const vimeoTestimonials = {
  testimonial1: "1160366577",
  testimonial2: "1160366561",
  testimonial3: "1160366548",
  testimonial4: "1160366533",
};

// Placeholder SVG para imagens temporariamente indisponíveis
const placeholderSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect fill='%23EDE8DC' width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%23D4AF37' text-anchor='middle' dominant-baseline='middle'%3ECarregando...%3C/text%3E%3C/svg%3E`;
const placeholderSvgVertical = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect fill='%23EDE8DC' width='400' height='600'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='20' fill='%23D4AF37' text-anchor='middle' dominant-baseline='middle'%3ECarregando...%3C/text%3E%3C/svg%3E`;

const faqItems = [
  {
    question: "As aulas são gravadas ou ao vivo?",
    answer: "Todo o conteúdo já está gravado e organizado por temas na plataforma. Assim que você comprar, terá acesso imediato aos 4 primeiros módulos. Além disso, as aulas bônus e os plantões de dúvidas serão ao vivo pelo Zoom, com as gravações disponíveis na plataforma Hotmart."
  },
  {
    question: "Em quanto tempo eu termino a mentoria?",
    answer: "Aproximadamente 3 meses. Todo conteúdo gravado são 16h e isso dá 1h33 por semana (12 semanas)"
  },
  {
    question: "Por quanto tempo eu tenho acesso ao conteúdo?",
    answer: "1 ano de acesso."
  },
  {
    question: "Será que consigo conciliar a mentoria com meus outros compromissos?",
    answer: "Sabemos que o dia a dia nas obras são corridos, e é por isso que nossas aulas foram planejadas para se ajustarem à sua rotina. Conteúdo prático e direto ao ponto, em módulos concisos, para você aprender no seu ritmo e aplicar no dia seguinte."
  },
  {
    question: "Não encontrei a resposta para a minha dúvida, como faço?",
    answer: "Basta enviar um e-mail para inovandonasuaobra@gmail.com ou chamar o suporte do whatsapp e nossa equipe responderá todas as suas dúvidas."
  }
];

// Schema de validação do formulário
const formSchema = z.object({
  name: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome muito longo"),
  email: z.string().trim().email("E-mail inválido").max(255, "E-mail muito longo"),
});

type FormData = z.infer<typeof formSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

export default function MentoriaLanding() {
  const [searchParams] = useSearchParams();
  const heroFormRef = useRef<HTMLFormElement>(null);
  
  // Form state
  const [formData, setFormData] = useState<FormData>({ name: "", email: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "boleto">("card");

  // Parallax effects
  const heroImageParallax = useParallax({ speed: 0.15, direction: "down", maxOffset: 80 });
  const heroTextParallax = useParallax({ speed: 0.08, direction: "up", maxOffset: 40 });
  useEffect(() => {
    // Update page metadata
    document.title = "Mentoria Inovando na sua Obra – Domine o gerenciamento de obra de interiores";
    
    // Meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Transforme cada projeto em uma jornada inesquecível para seus clientes, desde o primeiro contato até a entrega final. Mentoria para arquitetas e designers.");
    }

    // Save UTMs from URL to localStorage
    saveUtmParams(searchParams);

    // Track page view with GTM
    trackPageView("Mentoria Landing Page");
    
    // Init scroll and time tracking
    initScrollTracking();
    initTimeTracking();

    // Track pricing section visibility
    const pricingSection = document.querySelector('.mentoria-pricing-new');
    if (pricingSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              trackSectionView("pricing_section");
              observer.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(pricingSection);
      return () => observer.disconnect();
    }
  }, [searchParams]);

  // Handler para scroll suave até o formulário do hero
  const scrollToForm = (selectBoleto: boolean = false) => {
    if (selectBoleto) {
      setPaymentMethod("boleto");
    }
    heroFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Focus no primeiro campo após scroll
    setTimeout(() => {
      const nameInput = heroFormRef.current?.querySelector('input[name="name"]') as HTMLInputElement;
      nameInput?.focus();
    }, 500);
  };

  // Handler para validar e submeter o formulário
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validar com Zod
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof FormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    // DataLayer event para GTM
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'checkout_intent',
        product: 'mentoria',
        payment_method: paymentMethod,
        conversion_identifier: 'checkout-mentoria',
      });
    }

    // Montar URL do checkout com UTMs preservados (mesclando URL atual + salvos)
    const checkoutUrl = new URL("/checkout/mentoria", window.location.origin);
    checkoutUrl.searchParams.set("email", result.data.email.toLowerCase().trim());
    checkoutUrl.searchParams.set("name", result.data.name.trim());
    
    // Adicionar método de pagamento se for boleto
    if (paymentMethod === "boleto") {
      checkoutUrl.searchParams.set("payment", "boleto");
    }
    
    // Usar UTMs mesclados (URL atual + salvos no localStorage)
    const mergedUtms = getMergedUtmParams(searchParams);
    Object.entries(mergedUtms).forEach(([key, value]) => {
      if (value) checkoutUrl.searchParams.set(key, value);
    });

    // Redirecionar para CheckoutBridge
    window.location.href = checkoutUrl.toString();
  };

  // Handler para selecionar boleto e ir para o form
  const handleBoletoClick = () => {
    trackCTAClick("cta_boleto", "pricing_section", "Prefiro pagar com Boleto Parcelado");
    scrollToForm(true);
  };

  // Handler para CTA de pricing
  const handlePricingCTAClick = () => {
    trackCTAClick("cta_pricing", "pricing_section", "Quero meu acesso agora");
    scrollToForm(false);
  };

  // Handler para CTA de testimonials
  const handleTestimonialsCTAClick = () => {
    trackCTAClick("cta_testimonials", "testimonials_section", "Quero entrar na mentoria");
    scrollToForm(false);
  };

  return (
    <div className="mentoria-wp-page">
      {/* Mobile CTA fixo */}
      <MentoriaMobileCTA onClick={() => scrollToForm(false)} />
      
      {/* Hero Section */}
      <section className="mentoria-section mentoria-hero mentoria-hero-parallax" id="hero-form">
        <div className="mentoria-section-inner">
          <div className="mentoria-hero-content">
            <div 
              className="mentoria-hero-text"
              style={{ transform: heroTextParallax.transform }}
            >
              <img 
                src={logoImg} 
                alt="Mentoria Inovando na sua Obra" 
                className="mentoria-logo"
                loading="eager"
              />
              <h2>
                <b>Domine o gerenciamento de obra de interiores de maneira lucrativa e eficiente</b>
              </h2>
              <h5>
                Transforme cada projeto em uma jornada inesquecível para seus clientes, desde o primeiro contato até a entrega final.
              </h5>
              
              {/* Formulário inline */}
              <form 
                ref={heroFormRef}
                onSubmit={handleFormSubmit}
                className="mentoria-hero-form"
              >
                <div className="mentoria-form-field">
                  <Label htmlFor="name" className="sr-only">Seu nome completo</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={`mentoria-input ${errors.name ? 'mentoria-input-error' : ''}`}
                    disabled={isSubmitting}
                    autoComplete="name"
                  />
                  {errors.name && <span className="mentoria-error-text">{errors.name}</span>}
                </div>
                
                <div className="mentoria-form-field">
                  <Label htmlFor="email" className="sr-only">Seu melhor e-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Seu melhor e-mail"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className={`mentoria-input ${errors.email ? 'mentoria-input-error' : ''}`}
                    disabled={isSubmitting}
                    autoComplete="email"
                  />
                  {errors.email && <span className="mentoria-error-text">{errors.email}</span>}
                </div>
                
                {/* Indicador de boleto selecionado */}
                {paymentMethod === "boleto" && (
                  <div className="mentoria-boleto-badge">
                    <span>💳 Pagamento via Boleto Parcelado</span>
                    <button 
                      type="button" 
                      onClick={() => setPaymentMethod("card")}
                      className="mentoria-boleto-change"
                    >
                      Alterar
                    </button>
                  </div>
                )}
                
                <button 
                  type="submit"
                  className="mentoria-cta-button mentoria-cta-form"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={20} />
                      Processando...
                    </>
                  ) : (
                    <>
                      {paymentMethod === "boleto" ? "CONTINUAR COM BOLETO" : "Quero ENTRAR NA MENTORIA"}
                      <ArrowRight className="ml-2" size={20} />
                    </>
                  )}
                </button>
                
                <p className="mentoria-form-security">
                  <Lock size={14} className="inline mr-1" />
                  Seus dados estão 100% seguros
                </p>
              </form>
            </div>
            <div 
              className="mentoria-hero-image"
              style={{ transform: heroImageParallax.transform }}
            >
              <img 
                src={mentorasImg} 
                alt="Ingrid Zarza e Fernanda Bradaschia" 
                loading="eager"
                width={600}
                height={600}
              />
            </div>
          </div>
        </div>
      </section>

      {/* What You Will Learn - Skills Section */}
      <section className="mentoria-section mentoria-skills">
        <div className="mentoria-section-inner">
          <ScrollAnimation>
            <h2 className="mentoria-section-title">O que você vai aprender?</h2>
          </ScrollAnimation>
          <ScrollAnimation delay={150}>
            <img 
              src={placeholderSvg} 
              alt="Habilidades técnicas e comportamentais"
              className="mentoria-skills-image"
              loading="lazy"
            />
          </ScrollAnimation>
        </div>
      </section>

      {/* Audience Section */}
      <section className="mentoria-section mentoria-audience">
        <div className="mentoria-section-inner">
          <ScrollAnimation>
            <h2 className="mentoria-section-title">Para quem é?</h2>
            <p className="mentoria-audience-description">
              Para arquitetas, designers de interiores e engenheiras que queiram aprender a organizar obras de forma eficiente e previsível.
            </p>
          </ScrollAnimation>
          <ScrollAnimation delay={150}>
            <img 
              src={placeholderSvg} 
              alt="Para quem é a mentoria"
              className="mentoria-skills-image hidden-mobile"
              loading="lazy"
            />
            <img 
              src={placeholderSvg} 
              alt="Para quem é a mentoria"
              className="mentoria-skills-image hidden-desktop"
              loading="lazy"
            />
          </ScrollAnimation>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mentoria-section mentoria-how-works">
        <div className="mentoria-section-inner">
          <ScrollAnimation>
            <h2 className="mentoria-section-title">
              Como funciona a <br /><b>Mentoria Inovando na sua Obra</b>?
            </h2>
          </ScrollAnimation>
          <ScrollAnimation delay={150}>
            <img 
              src={placeholderSvg} 
              alt="Como funciona a mentoria"
              className="mentoria-skills-image hidden-mobile"
              loading="lazy"
            />
            <img 
              src={placeholderSvg} 
              alt="Como funciona a mentoria"
              className="mentoria-skills-image hidden-desktop"
              loading="lazy"
            />
          </ScrollAnimation>
        </div>
      </section>

      {/* Modules Section - Desktop */}
      <section className="mentoria-section mentoria-modules hidden-mobile">
        <div className="mentoria-section-inner">
          <ScrollAnimation>
            <h2 className="mentoria-section-title">Como é a mentoria por dentro?</h2>
          </ScrollAnimation>
          <div className="mentoria-modules-grid">
            <ScrollAnimation delay={100}><img src={placeholderSvg} alt="Módulos da mentoria" className="mentoria-module-image" loading="lazy" /></ScrollAnimation>
            <ScrollAnimation delay={200}><img src={placeholderSvg} alt="Módulos da mentoria" className="mentoria-module-image" loading="lazy" /></ScrollAnimation>
            <ScrollAnimation delay={300}><img src={placeholderSvg} alt="Módulos da mentoria" className="mentoria-module-image" loading="lazy" /></ScrollAnimation>
            <ScrollAnimation delay={400}><img src={placeholderSvg} alt="Módulos da mentoria" className="mentoria-module-image" loading="lazy" /></ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Modules Section - Mobile */}
      <section className="mentoria-section mentoria-modules hidden-desktop">
        <div className="mentoria-section-inner text-center">
          <ScrollAnimation>
            <img src={placeholderSvg} alt="Módulos da mentoria" className="mentoria-module-image" loading="lazy" />
          </ScrollAnimation>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="mentoria-section mentoria-bonus" style={{ backgroundColor: '#F5EFE6' }}>
        <div className="mentoria-section-inner text-center">
          <ScrollAnimation>
            <h2 className="mentoria-section-title hidden-desktop">Bônus Exclusivos</h2>
          </ScrollAnimation>
          <ScrollAnimation delay={100}>
            <img src={placeholderSvg} alt="Bônus da mentoria" className="mentoria-skills-image mb-8" loading="lazy" />
          </ScrollAnimation>
          <ScrollAnimation delay={200}>
            <img src={placeholderSvg} alt="Bônus da mentoria" className="mentoria-skills-image" loading="lazy" />
          </ScrollAnimation>
        </div>
      </section>

      {/* Revenue Section */}
      <section className="mentoria-section mentoria-revenue">
        <div className="mentoria-section-inner">
          <ScrollAnimation>
            <h2 className="mentoria-section-title">Como você pode faturar mais?</h2>
          </ScrollAnimation>
          <div className="mentoria-revenue-grid">
            <ScrollAnimation delay={100} animation="fade-left">
              <img src={placeholderSvgVertical} alt="Como faturar mais" className="mentoria-revenue-image" loading="lazy" />
            </ScrollAnimation>
            <ScrollAnimation delay={200} animation="fade-right">
              <img src={placeholderSvgVertical} alt="Como faturar mais" className="mentoria-revenue-image" loading="lazy" />
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="mentoria-section mentoria-pricing-new">
        <div className="mentoria-section-inner">
          <ScrollAnimation>
            <p className="mentoria-pricing-label">Investimento</p>
            <h2 className="mentoria-section-title" style={{ color: '#fff' }}>
              E quanto é o investimento mais importante do seu ano?
            </h2>
          </ScrollAnimation>
          
          {/* Stats Row */}
          <ScrollAnimation delay={100}>
            <div className="mentoria-pricing-stats">
              <div className="mentoria-pricing-stat">
                <div className="mentoria-pricing-stat-icon">
                  <Building2 size={24} />
                </div>
                <div>
                  <p className="mentoria-pricing-stat-value">+250</p>
                  <p className="mentoria-pricing-stat-label">Obras gerenciadas</p>
                </div>
              </div>
              <div className="mentoria-pricing-stat">
                <div className="mentoria-pricing-stat-icon">
                  <Users size={24} />
                </div>
                <div>
                  <p className="mentoria-pricing-stat-value">+100</p>
                  <p className="mentoria-pricing-stat-label">Alunas transformadas</p>
                </div>
              </div>
              <div className="mentoria-pricing-stat">
                <div className="mentoria-pricing-stat-icon">
                  <Award size={24} />
                </div>
                <div>
                  <p className="mentoria-pricing-stat-value">12</p>
                  <p className="mentoria-pricing-stat-label">Anos de experiência</p>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Main Card */}
          <ScrollAnimation delay={200} animation="scale">
            <div className="mentoria-pricing-main-card">
              {/* Price Header */}
              <div className="mentoria-pricing-header">
                <p className="mentoria-pricing-access">Acesso completo por</p>
                <div className="mentoria-pricing-value">
                  <span className="mentoria-pricing-installment">12x</span>
                  <span className="mentoria-pricing-amount">R$ 196</span>
                  <span className="mentoria-pricing-cents">,50</span>
                </div>
                <p className="mentoria-pricing-full">ou R$ 1.900,00 à vista</p>
              </div>

              {/* Benefits List */}
              <div className="mentoria-pricing-benefits">
                <div className="mentoria-pricing-benefits-grid">
                  {[
                    "16h de conteúdo gravado em 4 módulos",
                    "12 meses de acesso à plataforma",
                    "1h de mentoria individual",
                    "Encontro presencial em São Paulo",
                    "Materiais, checklists e ferramentas",
                    "Suporte e grupo de networking",
                  ].map((benefit, index) => (
                    <div key={index} className="mentoria-pricing-benefit">
                      <CheckCircle2 size={20} className="mentoria-pricing-benefit-icon" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mentoria-pricing-ctas">
                <button 
                  className="mentoria-cta-button mentoria-cta-pricing"
                  onClick={handlePricingCTAClick}
                >
                  Quero meu acesso agora
                  <ArrowRight size={20} className="ml-2" />
                </button>
                <button 
                  className="mentoria-cta-secondary mentoria-cta-boleto"
                  onClick={handleBoletoClick}
                >
                  Prefiro pagar com Boleto Parcelado
                </button>
                <p className="mentoria-pricing-security">
                  <Lock size={14} className="inline mr-1" />
                  Compra 100% segura • Garantia de 15 dias
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mentoria-section mentoria-testimonials">
        <div className="mentoria-section-inner">
          <ScrollAnimation>
            <h2 className="mentoria-section-title">
              Veja o que dizem <b>nossas alunas:</b>
            </h2>
          </ScrollAnimation>
          <div className="mentoria-testimonials-grid">
            <ScrollAnimation delay={100}>
              <div className="mentoria-testimonial-video">
                <iframe
                  src={`https://player.vimeo.com/video/${vimeoTestimonials.testimonial1}?title=0&byline=0&portrait=0`}
                  title="Depoimento Beatriz"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={200}>
              <div className="mentoria-testimonial-video">
                <iframe
                  src={`https://player.vimeo.com/video/${vimeoTestimonials.testimonial2}?title=0&byline=0&portrait=0`}
                  title="Depoimento Ingrid"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={300}>
              <div className="mentoria-testimonial-video">
                <iframe
                  src={`https://player.vimeo.com/video/${vimeoTestimonials.testimonial3}?title=0&byline=0&portrait=0`}
                  title="Depoimento Mônique"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={400}>
              <div className="mentoria-testimonial-video">
                <iframe
                  src={`https://player.vimeo.com/video/${vimeoTestimonials.testimonial4}?title=0&byline=0&portrait=0`}
                  title="Depoimento Aline"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </ScrollAnimation>
          </div>
          <ScrollAnimation delay={300}>
            <div className="text-center">
              <button 
                className="mentoria-cta-button"
                onClick={handleTestimonialsCTAClick}
              >
                quero entrar na mentoria
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="mentoria-section mentoria-guarantee">
        <div className="mentoria-section-inner">
          <ScrollAnimation>
            <h2 className="mentoria-section-title">Risco Zero para você</h2>
            <p className="mentoria-guarantee-text">
              Confiamos tanto no nosso conteúdo que damos uma <br className="hidden-mobile" />
              <b>garantia incondicional de 15 dias</b> pra você.
            </p>
          </ScrollAnimation>
          <ScrollAnimation delay={150} animation="scale">
            <img 
              src={placeholderSvg} 
              alt="Garantia de 15 dias"
              className="mentoria-guarantee-image hidden-mobile"
              loading="lazy"
            />
            <img 
              src={garantiaMobileImg} 
              alt="Garantia incondicional de 15 dias"
              className="mentoria-guarantee-image-mobile hidden-desktop"
              loading="lazy"
            />
          </ScrollAnimation>
        </div>
      </section>

      {/* About Section */}
      <section className="mentoria-section mentoria-about">
        <div className="mentoria-section-inner">
          <ScrollAnimation>
            <h2 className="mentoria-section-title">Quem Somos</h2>
          </ScrollAnimation>
          <div className="mentoria-about-content">
            <ScrollAnimation delay={100} animation="fade-left">
              <div className="mentoria-about-text">
                <h2>
                  Somos <b>Ingrid Zarza e Fernanda Bradaschia</b>, arquitetas <b>apaixonadas</b> por compartilhar conhecimento e <b>transformar a gestão de obras de interiores</b>.<br /><br />
                  Unimos nossas experiências para fundar a <b>INOVANDO ARQUITETURA</b>, um escritório dedicado ao desenvolvimento e gerenciamento de projetos residenciais e comerciais de interiores. Ao longo da nossa trajetória, <b>já concluímos mais de 250 obras</b>, ajudando clientes a realizarem o seu sonho.<br /><br />
                  Criamos a <b>@inovandonasuaobra</b>, um instagram para arquitetas, designers de interiores e engenheiras que querem aprender a gerenciar obras de interiores com mais segurança e qualidade. Lá, <b>compartilhamos experiências reais de obra, dicas valiosas e estratégias práticas</b> baseadas na nossa vivência em campo.<br /><br />
                  Em <b>2024</b>, criamos a <b>Mentoria Inovando na Sua Obra</b> para <b>compartilhar todo esse conhecimento de forma organizada e acessível</b>. Já são dezenas de alunas impactadas diretamente pela nossa metodologia, conquistando mais confiança e resultados.
                </h2>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={200} animation="fade-right">
              <div className="mentoria-about-image">
                <img 
                  src={mentorasImg} 
                  alt="Ingrid Zarza e Fernanda Bradaschia"
                  loading="lazy"
                />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mentoria-section mentoria-faq">
        <div className="mentoria-section-inner">
          <ScrollAnimation>
            <h2 className="mentoria-section-title"><b>Perguntas Frequentes</b></h2>
          </ScrollAnimation>
          <div className="mentoria-faq-list">
            {faqItems.map((item, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <details className="mentoria-faq-item" open={index === 0}>
                  <summary>{item.question}</summary>
                  <div className="mentoria-faq-content">
                    <p>{item.answer}</p>
                  </div>
                </details>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mentoria-footer">
        <p>© 2025 | Inovando na Sua Obra | Todos os Direitos Reservados</p>
      </footer>
    </div>
  );
}
