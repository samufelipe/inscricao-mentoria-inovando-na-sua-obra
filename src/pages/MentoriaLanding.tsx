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

import "../styles/mentoria-wp.css";

const WP_CDN = "https://inovandonasuaobra.com.br/wp-content/uploads";

const images = {
  logo: `${WP_CDN}/2025/07/Masterclass-Cronograma-1507-e1752603988566.webp`,
  heroPhoto: `${WP_CDN}/2025/06/Post-instagram-contratar-advogado-moderno-azul-e-bege-4-e1752604162881.png`,
  skills: `${WP_CDN}/2025/07/1-2-e1752679552648.webp`,
  audience: `${WP_CDN}/2025/07/2-1.webp`,
  audienceMobile: `${WP_CDN}/2025/07/2.webp`,
  howWorks: `${WP_CDN}/2025/07/3-1-e1752674351215.png`,
  howWorksMobile: `${WP_CDN}/2025/07/3-e1752678867880.webp`,
  modules1: `${WP_CDN}/2025/07/5-1.png`,
  modules2: `${WP_CDN}/2025/07/6-1024x576.png`,
  modules3: `${WP_CDN}/2025/07/7-1024x576.png`,
  modules4: `${WP_CDN}/2025/07/8-e1752606854888.png`,
  modulesMobile: `${WP_CDN}/2025/07/5-e1752604964742.webp`,
  bonus1: `${WP_CDN}/2025/07/15.png`,
  bonus2: `${WP_CDN}/2025/07/16-1.png`,
  revenue1: `${WP_CDN}/2025/07/12-e1752605232522-651x1024.webp`,
  revenue2: `${WP_CDN}/2025/07/13-576x1024.png`,
  pricing: `${WP_CDN}/2025/10/Pagina-de-VendaSite-1-e1759350501979-768x658.png`,
  guarantee: `${WP_CDN}/2025/07/14-e1752677582621-1024x172.png`,
  guaranteeMobile: `${WP_CDN}/2025/07/14mobile.webp`,
  about: `${WP_CDN}/2025/01/inso4-1-e1738203060570.png`,
  testimonial1Poster: `${WP_CDN}/2025/05/beatriz-com-frase-1.jpg`,
  testimonial2Poster: `${WP_CDN}/2025/05/ingrid-com-frase.jpg`,
  testimonial3Poster: `${WP_CDN}/2025/05/monique-com-frase.jpg`,
  testimonial4Poster: `${WP_CDN}/2025/05/aline-com-frase.jpg`,
};

const videos = {
  testimonial1: `https://vimeo.com/1160366577`,
  testimonial2: `https://vimeo.com/1160366561`,
  testimonial3: `https://vimeo.com/1160366548`,
  testimonial4: `https://vimeo.com/1160366533`,
};

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
    const metaDesc = document.querySelector("meta[name=\"description\"]");
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
    const pricingSection = document.querySelector(".mentoria-pricing-new");
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
    heroFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    // Focus no primeiro campo após scroll
    setTimeout(() => {
      const nameInput = heroFormRef.current?.querySelector("input[name=\"name\"]") as HTMLInputElement;
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
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "checkout_intent",
        product: "mentoria",
        payment_method: paymentMethod,
        conversion_identifier: "checkout-mentoria",
      });
    }

    // Montar URL do checkout com UTMs preservados (mesclando URL atual + salvos)
    const checkoutUrl = new URL("https://pay.hotmart.com/Y93975016X?off=22jnl093");
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
                src={images.logo} 
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
                    className={`mentoria-input ${errors.name ? "mentoria-input-error" : ""}`}
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
                    placeholder="Seu melhor e-email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className={`mentoria-input ${errors.email ? "mentoria-input-error" : ""}`}
                    disabled={isSubmitting}
                    autoComplete="email"
                  />
                  {errors.email && <span className="mentoria-error-text">{errors.email}</span>}
                </div>

                <button 
                  type="submit"
                  className="mentoria-cta-button mentoria-cta-button-form"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      Quero meu acesso agora <ArrowRight />
                    </>
                  )}
                </button>
                
                <div className="mentoria-form-footer">
                  <Lock /> Pagamento 100% seguro
                </div>
              </form>
            </div>

            <div 
              className="mentoria-hero-image"
              style={{ transform: heroImageParallax.transform }}
            >
               <img 
                src={images.heroPhoto} 
                alt="Foto da mentora, Samia, sorrindo"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mentoria-section mentoria-skills">
        <div className="mentoria-section-inner">
          <ScrollAnimation>
            <h2>Aprenda a gerenciar suas obras com mais segurança e se destaque no mercado</h2>
          </ScrollAnimation>
          <div className="mentoria-skills-grid">
            <ScrollAnimation className="mentoria-skill-item">
              <Users />
              <p>Atraia clientes qualificados</p>
            </ScrollAnimation>
            <ScrollAnimation className="mentoria-skill-item">
              <Building2 />
              <p>Estruture seu escritório</p>
            </ScrollAnimation>
            <ScrollAnimation className="mentoria-skill-item">
              <Award />
              <p>Seja uma referência na sua área</p>
            </ScrollAnimation>
          </div>
          <img src={images.skills} alt="Imagem com 3 mulheres arquitetas" className="mentoria-skills-image" />
        </div>
      </section>

      {/* Audience Section */}
      <section className="mentoria-section mentoria-audience">
        <div className="mentoria-section-inner">
          <div className="mentoria-audience-image">
            <img src={images.audience} alt="Para quem é a mentoria" className="desktop-only" />
            <img src={images.audienceMobile} alt="Para quem é a mentoria" className="mobile-only" />
          </div>
          <div className="mentoria-audience-content">
            <ScrollAnimation>
              <h2>Para quem é a mentoria?</h2>
            </ScrollAnimation>
            <ul>
              <ScrollAnimation as="li">
                <CheckCircle2 />
                Arquitetas e designers de interiores que buscam mais segurança e lucratividade em suas obras.
              </ScrollAnimation>
              <ScrollAnimation as="li">
                <CheckCircle2 />
                Profissionais que querem se posicionar como especialistas em gerenciamento de obras.
              </ScrollAnimation>
              <ScrollAnimation as="li">
                <CheckCircle2 />
                Quem deseja otimizar processos e ter mais tempo livre sem abrir mão da qualidade.
              </ScrollAnimation>
              <ScrollAnimation as="li">
                <CheckCircle2 />
                Mulheres que buscam uma comunidade de apoio para crescer na carreira.
              </ScrollAnimation>
            </ul>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="mentoria-section mentoria-how-works">
        <div className="mentoria-section-inner">
          <ScrollAnimation>
            <h2>Como funciona a mentoria?</h2>
          </ScrollAnimation>
          <img src={images.howWorks} alt="Como funciona a mentoria" className="desktop-only" />
          <img src={images.howWorksMobile} alt="Como funciona a mentoria" className="mobile-only" />
        </div>
      </section>

      {/* Modules Section */}
      <section className="mentoria-section mentoria-modules">
        <div className="mentoria-section-inner">
          <ScrollAnimation>
            <h2>O que você vai aprender na prática</h2>
          </ScrollAnimation>
          <div className="mentoria-modules-grid">
            <img src={images.modules1} alt="Módulos da mentoria" />
            <img src={images.modules2} alt="Módulos da mentoria" />
            <img src={images.modules3} alt="Módulos da mentoria" />
            <img src={images.modules4} alt="Módulos da mentoria" />
          </div>
          <img src={images.modulesMobile} alt="Módulos da mentoria" className="mobile-only" />
        </div>
      </section>

      {/* Bonus Section */}
      <section className="mentoria-section mentoria-bonus">
        <div className="mentoria-section-inner">
          <ScrollAnimation>
            <h2>E ainda tem mais... Bônus exclusivos!</h2>
          </ScrollAnimation>
          <div className="mentoria-bonus-grid">
            <img src={images.bonus1} alt="Bônus da mentoria" />
            <img src={images.bonus2} alt="Bônus da mentoria" />
          </div>
        </div>
      </section>

      {/* Revenue Section */}
      <section className="mentoria-section mentoria-revenue">
        <div className="mentoria-section-inner">
          <ScrollAnimation>
            <h2>Aumente seu faturamento com obras</h2>
          </ScrollAnimation>
          <div className="mentoria-revenue-grid">
            <img src={images.revenue1} alt="Aumente seu faturamento" />
            <img src={images.revenue2} alt="Aumente seu faturamento" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mentoria-section mentoria-testimonials">
        <div className="mentoria-section-inner">
          <ScrollAnimation>
            <h2>Veja o que minhas alunas dizem</h2>
          </ScrollAnimation>
          <div className="mentoria-testimonials-grid">
            <video controls poster={images.testimonial1Poster}><source src={videos.testimonial1} type="video/mp4" /></video>
            <video controls poster={images.testimonial2Poster}><source src={videos.testimonial2} type="video/mp4" /></video>
            <video controls poster={images.testimonial3Poster}><source src={videos.testimonial3} type="video/mp4" /></video>
            <video controls poster={images.testimonial4Poster}><source src={videos.testimonial4} type="video/mp4" /></video>
          </div>
          <button className="mentoria-cta-button" onClick={handleTestimonialsCTAClick}>
            Quero entrar na mentoria
          </button>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="mentoria-section mentoria-pricing-new">
        <div className="mentoria-section-inner">
          <img src={images.pricing} alt="Preço da mentoria" />
          <div className="mentoria-pricing-ctas">
            <button className="mentoria-cta-button" onClick={handlePricingCTAClick}>
              Quero meu acesso agora
            </button>
            <a href="#" onClick={handleBoletoClick} className="mentoria-boleto-link">
              Prefiro pagar com Boleto Parcelado
            </a>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="mentoria-section mentoria-guarantee">
        <div className="mentoria-section-inner">
          <img src={images.guarantee} alt="Garantia de 7 dias" className="desktop-only" />
          <img src={images.guaranteeMobile} alt="Garantia de 7 dias" className="mobile-only" />
        </div>
      </section>

      {/* About Section */}
      <section className="mentoria-section mentoria-about">
        <div className="mentoria-section-inner">
          <div className="mentoria-about-image">
            <img src={images.about} alt="Sobre Samia" />
          </div>
          <div className="mentoria-about-content">
            <ScrollAnimation>
              <h2>Quem sou eu?</h2>
            </ScrollAnimation>
            <p>...
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mentoria-section mentoria-faq">
        <div className="mentoria-section-inner">
          <ScrollAnimation>
            <h2>Perguntas Frequentes</h2>
          </ScrollAnimation>
          <div className="mentoria-faq-list">
            {faqItems.map((item, index) => (
              <div key={index} className="mentoria-faq-item">
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="mentoria-section mentoria-final-cta">
        <div className="mentoria-section-inner">
          <button className="mentoria-cta-button" onClick={() => scrollToForm(false)}>
            Quero meu acesso agora
          </button>
        </div>
      </section>
    </div>
  );
}
