import { useEffect, useRef, useState } from "react";
import React from "react";
import { motion, useInView } from "framer-motion";
import {
  Check, BookOpen, ClipboardCheck, Package, Star, Award, Users, Building,
  ArrowRight, ShieldCheck, Instagram, Mail, X, Zap, Lock, CreditCard,
  ChevronDown
} from "lucide-react";
import { useIsMobile } from "@/hooks/useMobile";

/* ─── Assets ─── */
import inovandoObraImg from "@/assets/alem-da-tendencia/inovando-obra-new.png";
import logoLight from "@/assets/materiais/logo-inovando-light.png";
import logoDark from "@/assets/materiais/logo-inovando-dark.png";
import checklistsMockup from "@/assets/materiais/checklists-mockup.png";
import ebookMockup from "@/assets/materiais/ebook-mockup.png";
import irmasObra from "@/assets/materiais/irmas-obra.png";

/* ─── Architectural grid lines (matches Além da Tendência) ─── */
function GridLines({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const color = variant === "dark" ? "bg-white" : "bg-[#1a1a1a]";
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-[1]">
      <div className={`absolute top-0 w-px h-full ${color}`} style={{ left: "5%" }} />
      <div className={`absolute top-0 w-px h-full ${color}`} style={{ left: "35%" }} />
      <div className={`absolute top-0 w-px h-full ${color}`} style={{ left: "65%" }} />
      <div className={`absolute top-0 w-px h-full ${color}`} style={{ left: "95%" }} />
      <div className={`absolute left-0 h-px w-full ${color}`} style={{ top: "10%" }} />
      <div className={`absolute left-0 h-px w-full ${color}`} style={{ top: "50%" }} />
      <div className={`absolute left-0 h-px w-full ${color}`} style={{ top: "90%" }} />
    </div>
  );
}

/* ─── Fade-in wrapper ─── */
function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated counter ─── */
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ─── Product data (CORRECTED) ─── */
const PRODUCTS = {
  checklists: {
    name: "21 Checklists Inovando na Sua Obra",
    price: 67,
    priceDisplay: "R$ 67,00",
    installments: "ou 3x de R$ 22,33",
    description: "21 checklists práticos para conferir cada etapa da obra. Do primeiro dia no canteiro até a vistoria final, com processos testados em mais de 250 obras reais.",
    mockup: checklistsMockup,
    benefits: [
      "Início de Obra e Primeiro Dia",
      "Levantamento e Demolição",
      "Hidráulica e Ar-condicionado",
      "Elétrica e Impermeabilização",
      "Construção e Revestimentos",
      "Forro de Gesso e Pintura",
      "Iluminação e Pisos (Vinílico e Madeira)",
      "Marcenaria e Marmoraria",
      "Vidros, Box, Espelhos e Varanda",
      "Portas e Janelas",
      "Verificações Finais",
    ],
    painPoints: [
      "Chega na obra e não sabe por onde começar a conferência",
      "Esquece detalhes importantes e só percebe na entrega",
      "Não tem um processo padronizado por etapa",
      "Sempre apagando incêndio por falta de controle",
    ],
    hotmartUrl: "https://pay.hotmart.com/F99460291O?checkoutMode=10",
    cta: "Quero organizar minhas obras",
  },
  ebook: {
    name: "E-book Domine a Sua Obra",
    price: 97,
    priceDisplay: "R$ 97,00",
    installments: "ou 3x de R$ 32,33",
    description: "O guia completo para dominar a gestão de obra do planejamento à entrega. Aprenda a liderar o canteiro com segurança, organizar cronogramas e se posicionar como referência.",
    mockup: ebookMockup,
    benefits: [
      "Planejamento de Obra (cronograma e orçamento)",
      "Acompanhamento por Fases: Cinza, Branca e Colorida",
      "Como se posicionar como líder no canteiro",
      "Habilidades Técnicas + Emocionais para obra",
      "Comunicação eficiente com cliente e equipe",
      "Gestão de imprevistos e retrabalho",
    ],
    painPoints: [
      "Se sente perdida quando começa a fase de obra",
      "O projeto ficou lindo, mas a obra virou um pesadelo",
      "Não sabe como se posicionar como líder no canteiro",
      "Está sempre correndo atrás do prejuízo",
    ],
    hotmartUrl: "https://pay.hotmart.com/Q99258692R?off=ivk4h3rr&checkoutMode=10",
    cta: "Quero dominar a gestão de obra",
  },
};

const COMBO_PRICE = 147.60;
const COMBO_SAVINGS = 16.40;
const COMBO_INSTALLMENTS = "ou 3x de R$ 49,20";
const COMBO_URL = "https://pay.hotmart.com/F99460291O?checkoutMode=10&bid=1774368616199";

const SOCIAL_PROOF = [
  { value: 250, suffix: "+", label: "Obras gerenciadas", icon: Building },
  { value: 100, suffix: "+", label: "Alunas transformadas", icon: Users },
  { value: 12, suffix: "", label: "Anos de experiência", icon: Award },
  { value: 0, suffix: "", label: "Criadoras da Mentoria Inovando na Sua Obra", icon: Star, isText: true },
];

const PAIN_SCENARIOS = [
  "Chega na obra e não sabe por onde começar a conferência",
  "O cliente liga reclamando e você não tem controle do que foi feito",
  "Sente que está sempre correndo atrás do prejuízo",
  "O projeto ficou lindo, mas a obra virou um pesadelo",
  "Esquece detalhes importantes e só descobre na entrega",
  "Não tem um processo claro para cada etapa da obra",
];

const TARGET_AUDIENCE = [
  "Arquitetas que acompanham obras e querem parar de improvisar",
  "Designers de interiores que precisam de processos claros no canteiro",
  "Profissionais que estão começando a atuar em obra e sentem insegurança",
  "Quem já perdeu dinheiro com retrabalho e quer evitar que aconteça de novo",
  "Profissionais que querem se posicionar como referência em gestão de obra",
  "Quem busca mais confiança e organização no dia a dia da obra",
];

const FAQ_ITEMS = [
  {
    q: "Os materiais são digitais?",
    a: "Sim, tanto os 21 Checklists quanto o E-book são materiais 100% digitais. Após a compra, você recebe acesso imediato pela plataforma Hotmart.",
  },
  {
    q: "Como vou receber o material?",
    a: "Após a confirmação do pagamento, você recebe automaticamente um e-mail com o acesso ao conteúdo pela plataforma Hotmart. Você pode acessar de qualquer dispositivo.",
  },
  {
    q: "O conteúdo serve para quem está começando?",
    a: "Com certeza. Os materiais foram criados pensando tanto em quem está iniciando quanto em quem já atua, mas precisa organizar melhor seus processos de obra.",
  },
  {
    q: "Posso usar os checklists em todos os meus projetos?",
    a: "Sim. Os 21 checklists são modelos adaptáveis que você pode utilizar em quantos projetos quiser, personalizando conforme a necessidade de cada obra.",
  },
  {
    q: "Tem garantia?",
    a: "Sim. Você tem 7 dias de garantia incondicional. Se por qualquer motivo não ficar satisfeita, basta solicitar o reembolso dentro do prazo.",
  },
  {
    q: "Qual a diferença entre os Checklists e o E-book?",
    a: "Os 21 Checklists são ferramentas práticas de execução: listas que você leva pro canteiro e usa etapa por etapa. O E-book é um guia estratégico completo de gestão, com fundamentos, técnicas e estratégias para dominar todo o processo de obra, do planejamento à entrega.",
  },
  {
    q: "Consigo parcelar?",
    a: "Sim. Todos os produtos podem ser parcelados em até 3x no cartão de crédito, sem juros.",
  },
];

export default function Materiais() {
  const isMobile = useIsMobile();

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Materiais Digitais · Inovando na Sua Obra";
    const link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
    const prevFavicon = link?.href || "";
    if (link) link.href = "/favicon-inovando.png";
    return () => {
      document.title = prevTitle;
      if (link) link.href = prevFavicon;
    };
  }, []);

  const scrollToProducts = () => {
    document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-[#1a1a1a] bg-[#f0ede8] overflow-x-hidden w-full max-w-[100vw]">

      {/* ═══════════════════ HERO CINEMATOGRÁFICO ═══════════════════ */}
      <section className="relative bg-[#1a1a1a] min-h-[100svh] md:min-h-[85vh] flex items-end md:items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={irmasObra}
            alt="Ingrid Zarza e Fernanda Bradaschia em obra"
            className="absolute inset-0 w-full h-full object-cover object-[center_25%]"
            fetchPriority="high"
          />
          {/* Gradient overlays for legibility */}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background: isMobile
                ? "linear-gradient(to bottom, rgba(26,26,26,0.4) 0%, transparent 20%, transparent 35%, rgba(26,26,26,0.7) 50%, rgba(26,26,26,0.95) 65%, #1a1a1a 80%)"
                : "linear-gradient(to right, rgba(26,26,26,0.95) 0%, rgba(26,26,26,0.85) 35%, rgba(26,26,26,0.4) 60%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-0 z-[1] hidden md:block"
            style={{ background: "linear-gradient(to bottom, rgba(26,26,26,0.3) 0%, transparent 30%, transparent 70%, rgba(26,26,26,0.5) 100%)" }}
          />
        </div>

        <GridLines variant="dark" />

        {/* Content */}
        <div className="container mx-auto px-5 md:px-8 relative z-10 pb-8 md:pb-0">
          <div className="max-w-xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <img src={logoLight} alt="Inovando na Sua Obra" className="h-12 md:h-14 mb-6 opacity-80" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex items-center gap-2 mb-4 text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-[#C9A84C]/80 font-medium"
            >
              <span>Materiais Digitais</span>
              <span className="text-white/20">·</span>
              <span>Acesso Imediato</span>
              <span className="text-white/20">·</span>
              <span>Garantia 7 Dias</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-[26px] sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] uppercase tracking-wide mb-4"
            >
              Sua obra não precisa{" "}
              <span className="text-[#C9A84C]">ser um caos</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white/60 text-sm md:text-base leading-relaxed mb-6 max-w-md"
            >
              21 Checklists + E-book criados por quem já gerenciou mais de 250 obras de interiores.
              Organize seus processos, evite retrabalho e entregue com excelência.
            </motion.p>

            {/* Social proof inline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              {[
                { label: "+250 obras", icon: Building },
                { label: "+100 alunas", icon: Users },
                { label: "12 anos", icon: Award },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-white/40 text-[10px] uppercase tracking-wider">
                  <item.icon className="w-3.5 h-3.5 text-[#C9A84C]/70" />
                  <span>{item.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={scrollToProducts}
                className="bg-[#2E7D32] text-white font-bold py-4 px-8 uppercase tracking-widest text-xs hover:bg-[#256829] transition-all shadow-[0_4px_24px_rgba(46,125,50,0.3)] border border-[#2E7D32]/50 inline-flex items-center justify-center gap-2 group"
              >
                Ver materiais
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href={COMBO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C9A84C] text-[#1a1a1a] font-bold py-4 px-8 uppercase tracking-widest text-xs hover:bg-[#d4b65c] transition-all shadow-[0_4px_24px_rgba(201,168,76,0.3)] inline-flex items-center justify-center gap-2 group"
              >
                Combo com 10% OFF
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-white/20 text-[9px] uppercase tracking-widest">Descubra mais</span>
          <ChevronDown className="w-4 h-4 text-white/20 animate-bounce" />
        </motion.div>
      </section>

      {/* ═══════════════════ SOCIAL PROOF NUMBERS ═══════════════════ */}
      <FadeIn>
        <section className="py-10 md:py-14 bg-white border-b border-[#e8e4dc] relative overflow-hidden">
          <GridLines variant="light" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {SOCIAL_PROOF.map((item, i) => (
                <div key={i} className="text-center p-4 md:p-6 border border-[#C9A84C]/15 bg-[#f0ede8] relative">
                  <div className="absolute top-0 left-0 w-8 h-px bg-[#C9A84C]" />
                  <div className="absolute top-0 left-0 w-px h-8 bg-[#C9A84C]" />
                  <item.icon className="w-5 h-5 text-[#C9A84C] mx-auto mb-2" />
                  {item.isText ? (
                    <p className="text-xs font-bold text-[#1a1a1a] leading-tight">{item.label}</p>
                  ) : (
                    <>
                      <p className="font-display text-2xl md:text-3xl font-bold text-[#1a1a1a]">
                        <AnimatedNumber value={item.value} suffix={item.suffix} />
                      </p>
                      <p className="text-[10px] text-[#1a1a1a]/50 uppercase tracking-wider mt-1">{item.label}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ═══════════════════ SEÇÃO DE DOR ═══════════════════ */}
      <section className="py-16 md:py-24 bg-[#1a1a1a] relative overflow-hidden">
        <GridLines variant="dark" />
        <div className="container mx-auto px-4 relative z-10 max-w-3xl">
          <FadeIn className="text-center mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] font-semibold mb-3">Você se identifica?</p>
            <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-white uppercase tracking-tight">
              Se alguma dessas situações faz parte do seu dia a dia, esses materiais foram feitos para você
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-3">
            {PAIN_SCENARIOS.map((pain, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flex items-start gap-3 bg-white/[0.04] border border-white/[0.08] p-4 hover:border-red-400/30 transition-colors">
                  <X className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-white/70 leading-relaxed">{pain}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 bg-[#2E7D32]/10 border border-[#2E7D32]/20 px-5 py-3">
              <Check className="w-5 h-5 text-[#2E7D32]" />
              <p className="text-sm text-white/80 font-medium">
                A solução está em ter <strong className="text-[#C9A84C]">processos claros</strong> para cada etapa da obra
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════ QUEM SOMOS ═══════════════════ */}
      <FadeIn>
        <section className="py-16 md:py-24 bg-[#f0ede8] relative overflow-hidden">
          <GridLines variant="light" />
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-5xl mx-auto">
              <div className="relative">
                <div className="absolute -inset-3 bg-[#C9A84C]/10 -z-10" />
                <img
                  src={inovandoObraImg}
                  alt="Ingrid Zarza e Fernanda Bradaschia"
                  className="w-full rounded-sm shadow-lg"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] font-semibold mb-3">Quem criou esses materiais</p>
                <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-[#1a1a1a] uppercase tracking-tight mb-5">
                  Ingrid Zarza &<br />Fernanda Bradaschia
                </h2>
                <div className="space-y-4 text-sm text-[#1a1a1a]/70 leading-relaxed">
                  <p>
                    Arquitetas com mais de <strong className="text-[#1a1a1a]">12 anos de experiência</strong> no mercado,
                    já gerenciaram mais de 250 obras e transformaram a carreira de centenas de profissionais
                    através da Mentoria Inovando na Sua Obra.
                  </p>
                  <p>
                    Cada checklist e cada página do E-book foram criados com base em{" "}
                    <strong className="text-[#1a1a1a]">experiências reais de canteiro</strong>. Nada de teoria vazia:
                    é o que realmente funciona no dia a dia de quem vive obra.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 mt-6">
                  <div className="flex items-center gap-2 text-xs text-[#1a1a1a]/50 bg-[#1a1a1a]/5 px-3 py-1.5">
                    <Award className="w-3.5 h-3.5 text-[#C9A84C]" />
                    12 anos de mercado
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#1a1a1a]/50 bg-[#1a1a1a]/5 px-3 py-1.5">
                    <Building className="w-3.5 h-3.5 text-[#C9A84C]" />
                    +250 obras
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#1a1a1a]/50 bg-[#1a1a1a]/5 px-3 py-1.5">
                    <Users className="w-3.5 h-3.5 text-[#C9A84C]" />
                    +100 alunas
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ═══════════════════ ANCORAGEM DE PREÇO ═══════════════════ */}
      <FadeIn>
        <section className="py-10 md:py-14 bg-white border-y border-[#e8e4dc] relative overflow-hidden">
          <GridLines variant="light" />
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p className="text-sm text-[#1a1a1a]/60 leading-relaxed mb-4">
              Uma única obra mal gerenciada pode custar <strong className="text-[#1a1a1a]">milhares de reais</strong> em retrabalho,
              atrasos e clientes insatisfeitos.
            </p>
            <p className="text-lg md:text-xl font-bold text-[#1a1a1a]">
              Por menos que um almoço de negócios, você organiza{" "}
              <span className="text-[#C9A84C]">todas</span> as suas obras.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* ═══════════════════ PRODUTOS ═══════════════════ */}
      <section id="produtos" className="py-16 md:py-24 bg-[#1a1a1a] relative overflow-hidden">
        <GridLines variant="dark" />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] font-semibold mb-3">Nossos Materiais</p>
            <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-white uppercase tracking-tight mb-4">
              Escolha o material ideal para você
            </h2>
            <p className="text-white/50 text-sm max-w-lg mx-auto">
              Ferramentas práticas criadas por quem vive o dia a dia do canteiro
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {/* Card Checklists */}
            <FadeIn>
              <div className="bg-[#242424] border border-white/10 flex flex-col h-full relative group hover:border-[#C9A84C]/30 transition-colors overflow-hidden">
                <div className="absolute top-0 left-0 w-12 h-px bg-[#C9A84C]" />
                <div className="absolute top-0 left-0 w-px h-12 bg-[#C9A84C]" />

                {/* Mockup image */}
                <div className="relative bg-gradient-to-b from-[#2a2a2a] to-[#242424] p-4 flex justify-center">
                  <img src={checklistsMockup} alt="21 Checklists de Obra" className="w-full max-w-[280px] h-auto" loading="lazy" />
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <ClipboardCheck className="w-7 h-7 text-[#C9A84C] mb-3" />
                  <h3 className="font-display text-lg font-bold text-white uppercase tracking-wide mb-2">
                    {PRODUCTS.checklists.name}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-5">
                    {PRODUCTS.checklists.description}
                  </p>

                  <p className="text-[10px] uppercase tracking-[0.2em] text-red-400/70 font-semibold mb-3">
                    Dores que resolve
                  </p>
                  <ul className="space-y-2 mb-5">
                    {PRODUCTS.checklists.painPoints.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/40">
                        <X className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C]/70 font-semibold mb-3">
                    21 Checklists incluídos
                  </p>
                  <ul className="space-y-1.5 mb-6 flex-1">
                    {PRODUCTS.checklists.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                        <Check className="w-4 h-4 text-[#2E7D32] mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-white/10 pt-5">
                    <p className="font-display text-2xl font-bold text-white mb-0.5">
                      {PRODUCTS.checklists.priceDisplay}
                    </p>
                    <p className="text-white/30 text-xs mb-4">{PRODUCTS.checklists.installments}</p>
                    <a
                      href={PRODUCTS.checklists.hotmartUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-[#2E7D32] text-white font-bold py-3.5 text-center uppercase tracking-widest text-xs hover:bg-[#256829] transition-all shadow-[0_4px_24px_rgba(46,125,50,0.3)]"
                    >
                      {PRODUCTS.checklists.cta}
                    </a>
                    <p className="text-white/20 text-[10px] text-center mt-2 flex items-center justify-center gap-1">
                      <Lock className="w-3 h-3" /> Acesso imediato após o pagamento
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Card E-book */}
            <FadeIn delay={0.1}>
              <div className="bg-[#242424] border border-white/10 flex flex-col h-full relative group hover:border-[#C9A84C]/30 transition-colors overflow-hidden">
                <div className="absolute top-0 left-0 w-12 h-px bg-[#C9A84C]" />
                <div className="absolute top-0 left-0 w-px h-12 bg-[#C9A84C]" />

                {/* Mockup image */}
                <div className="relative bg-gradient-to-b from-[#2a2a2a] to-[#242424] p-6 flex justify-center">
                  <img src={ebookMockup} alt="E-book Domine a Sua Obra" className="w-full max-w-[200px] h-auto" loading="lazy" />
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <BookOpen className="w-7 h-7 text-[#C9A84C] mb-3" />
                  <h3 className="font-display text-lg font-bold text-white uppercase tracking-wide mb-2">
                    {PRODUCTS.ebook.name}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-5">
                    {PRODUCTS.ebook.description}
                  </p>

                  <p className="text-[10px] uppercase tracking-[0.2em] text-red-400/70 font-semibold mb-3">
                    Dores que resolve
                  </p>
                  <ul className="space-y-2 mb-5">
                    {PRODUCTS.ebook.painPoints.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/40">
                        <X className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C]/70 font-semibold mb-3">
                    O que você aprende
                  </p>
                  <ul className="space-y-1.5 mb-6 flex-1">
                    {PRODUCTS.ebook.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                        <Check className="w-4 h-4 text-[#2E7D32] mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-white/10 pt-5">
                    <p className="font-display text-2xl font-bold text-white mb-0.5">
                      {PRODUCTS.ebook.priceDisplay}
                    </p>
                    <p className="text-white/30 text-xs mb-4">{PRODUCTS.ebook.installments}</p>
                    <a
                      href={PRODUCTS.ebook.hotmartUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-[#2E7D32] text-white font-bold py-3.5 text-center uppercase tracking-widest text-xs hover:bg-[#256829] transition-all shadow-[0_4px_24px_rgba(46,125,50,0.3)]"
                    >
                      {PRODUCTS.ebook.cta}
                    </a>
                    <p className="text-white/20 text-[10px] text-center mt-2 flex items-center justify-center gap-1">
                      <Lock className="w-3 h-3" /> Acesso imediato após o pagamento
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Card Combo */}
          <FadeIn className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-[#2a2520] to-[#1a1a1a] border-2 border-[#C9A84C]/40 p-6 md:p-8 overflow-hidden">
              {/* Badge */}
              <div className="absolute top-4 right-4 bg-[#C9A84C] text-[#1a1a1a] text-[10px] font-bold uppercase tracking-wider px-3 py-1">
                Mais Popular
              </div>

              <div className="flex items-center gap-3 mb-4">
                <Package className="w-8 h-8 text-[#C9A84C]" />
                <div>
                  <h3 className="font-display text-lg md:text-xl font-bold text-white uppercase tracking-wide">
                    Combo Completo
                  </h3>
                  <p className="text-[#C9A84C]/70 text-xs">21 Checklists + E-book com 10% de desconto</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">
                    Leve os dois materiais e tenha o kit completo para dominar a gestão das suas obras.
                    Do planejamento à entrega, com processos claros e ferramentas práticas.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-white/70">
                      <Check className="w-4 h-4 text-[#C9A84C] shrink-0" />
                      Todos os 21 Checklists de obra
                    </li>
                    <li className="flex items-center gap-2 text-sm text-white/70">
                      <Check className="w-4 h-4 text-[#C9A84C] shrink-0" />
                      E-book completo de gestão
                    </li>
                    <li className="flex items-center gap-2 text-sm text-white/70">
                      <Check className="w-4 h-4 text-[#C9A84C] shrink-0" />
                      Acesso imediato e vitalício
                    </li>
                    <li className="flex items-center gap-2 text-sm text-white/70">
                      <Check className="w-4 h-4 text-[#C9A84C] shrink-0" />
                      7 dias de garantia incondicional
                    </li>
                    <li className="flex items-center gap-2 text-sm text-white/70">
                      <Check className="w-4 h-4 text-[#C9A84C] shrink-0" />
                      Pagamento 100% seguro
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col justify-center items-center md:items-end text-center md:text-right">
                  <p className="text-white/40 text-sm line-through mb-1">De R$ 164,00</p>
                  <p className="font-display text-3xl md:text-4xl font-bold text-white mb-0.5">
                    R$ {COMBO_PRICE.toFixed(2).replace(".", ",")}
                  </p>
                  <p className="text-white/30 text-xs mb-1">{COMBO_INSTALLMENTS}</p>
                  <p className="text-[#C9A84C] text-xs font-semibold mb-5">
                    Economia de R$ {COMBO_SAVINGS.toFixed(2).replace(".", ",")}
                  </p>
                  <a
                    href={COMBO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#1a1a1a] font-bold py-4 px-8 uppercase tracking-widest text-xs hover:bg-[#d4b65c] transition-all shadow-[0_4px_24px_rgba(201,168,76,0.3)] group"
                  >
                    Quero o Combo Completo
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <p className="text-white/20 text-[10px] mt-2 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Pagamento seguro · Acesso imediato
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════ PARA QUEM É ═══════════════════ */}
      <FadeIn>
        <section className="py-16 md:py-24 bg-[#faf9f6] relative overflow-hidden">
          <GridLines variant="light" />
          <div className="container mx-auto px-4 max-w-3xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] font-semibold mb-3 text-center">Para quem é</p>
            <h2 className="font-display text-xl md:text-2xl font-bold text-[#1a1a1a] uppercase tracking-tight mb-8 text-center">
              Esses materiais são para você que...
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {TARGET_AUDIENCE.map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white p-4 border-l-2 border-[#C9A84C]">
                  <Check className="w-5 h-5 text-[#2E7D32] mt-0.5 shrink-0" />
                  <p className="text-sm text-[#1a1a1a]/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ═══════════════════ GARANTIA ═══════════════════ */}
      <FadeIn>
        <section className="py-12 md:py-16 bg-white border-y border-[#e8e4dc] relative overflow-hidden">
          <GridLines variant="light" />
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <ShieldCheck className="w-12 h-12 text-[#2E7D32] mx-auto mb-4" />
            <h2 className="font-display text-lg md:text-xl font-bold text-[#1a1a1a] uppercase tracking-tight mb-3">
              Garantia incondicional de 7 dias
            </h2>
            <p className="text-sm text-[#1a1a1a]/60 leading-relaxed mb-4">
              Se por qualquer motivo você não ficar satisfeita com o material, basta solicitar o reembolso
              dentro de 7 dias e devolvemos 100% do seu investimento. Sem burocracia, sem perguntas.
            </p>
            <div className="flex items-center justify-center gap-6 text-[10px] text-[#1a1a1a]/40 uppercase tracking-wider">
              <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Pagamento seguro</span>
              <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> Acesso imediato</span>
              <span className="flex items-center gap-1"><CreditCard className="w-3.5 h-3.5" /> Até 3x sem juros</span>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <FadeIn>
        <section className="py-16 md:py-24 bg-[#faf9f6] relative overflow-hidden">
          <GridLines variant="light" />
          <div className="container mx-auto px-4 max-w-3xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] font-semibold mb-3 text-center">Dúvidas Frequentes</p>
            <h2 className="font-display text-xl md:text-2xl font-bold text-[#1a1a1a] uppercase tracking-tight mb-8 text-center">
              Perguntas frequentes
            </h2>
            <div className="space-y-3">
              {FAQ_ITEMS.map((faq, i) => (
                <details key={i} className="group bg-white border border-[#e8e4dc] open:border-[#C9A84C]/30">
                  <summary className="cursor-pointer list-none p-5 flex items-center justify-between font-bold text-sm text-[#1a1a1a] hover:text-[#C9A84C] transition-colors">
                    {faq.q}
                    <span className="text-[#C9A84C] text-lg ml-4 shrink-0 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-[#1a1a1a]/60 leading-relaxed border-t border-[#e8e4dc] pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ═══════════════════ CTA FINAL ═══════════════════ */}
      <section className="py-16 md:py-20 bg-[#1a1a1a] relative overflow-hidden">
        <GridLines variant="dark" />
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <FadeIn>
            <h2 className="font-display text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4">
              Comece a transformar suas obras <span className="text-[#C9A84C]">hoje</span>
            </h2>
            <p className="text-white/50 text-sm mb-8">
              Materiais práticos, testados em mais de 250 obras, com acesso imediato e garantia de 7 dias.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={scrollToProducts}
                className="bg-[#2E7D32] text-white font-bold py-4 px-8 uppercase tracking-widest text-xs hover:bg-[#256829] transition-all shadow-[0_4px_24px_rgba(46,125,50,0.3)] inline-flex items-center justify-center gap-2 group"
              >
                Ver materiais disponíveis
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href={COMBO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C9A84C] text-[#1a1a1a] font-bold py-4 px-8 uppercase tracking-widest text-xs hover:bg-[#d4b65c] transition-all inline-flex items-center justify-center gap-2 group"
              >
                Combo com 10% OFF
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="bg-[#111] py-10 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <img src={logoLight} alt="Inovando na Sua Obra" className="h-10 opacity-60 mx-auto md:mx-0 mb-3" loading="lazy" />
              <p className="text-white/30 text-xs leading-relaxed">
                Transformando a forma como arquitetas e designers gerenciam suas obras.
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C]/60 font-semibold mb-3">Contato</p>
              <div className="space-y-2">
                <a href="https://www.instagram.com/inovando.nasuaobra/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/40 text-xs hover:text-[#C9A84C] transition-colors justify-center md:justify-start">
                  <Instagram className="w-3.5 h-3.5" /> @inovando.nasuaobra
                </a>
                <a href="mailto:contato@inovandonasuaobra.com.br" className="flex items-center gap-2 text-white/40 text-xs hover:text-[#C9A84C] transition-colors justify-center md:justify-start">
                  <Mail className="w-3.5 h-3.5" /> contato@inovandonasuaobra.com.br
                </a>
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C]/60 font-semibold mb-3">Legal</p>
              <div className="space-y-2">
                <a href="/termos-de-uso" className="block text-white/40 text-xs hover:text-[#C9A84C] transition-colors">Termos de Uso</a>
                <a href="/politica-de-privacidade" className="block text-white/40 text-xs hover:text-[#C9A84C] transition-colors">Política de Privacidade</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 mt-8 pt-6 text-center">
            <p className="text-white/20 text-[10px]">
              © {new Date().getFullYear()} Inovando na Sua Obra. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* ═══════════════════ STICKY CTA MOBILE ═══════════════════ */}
      {isMobile && <MobileStickyBar />}
    </div>
  );
}

/* ─── Mobile Sticky CTA Bar ─── */
function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-md border-t border-[#C9A84C]/20 px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
      <div className="flex flex-col">
        <span className="text-white/40 text-[10px] line-through">R$ 164,00</span>
        <span className="text-white font-bold text-lg leading-tight">R$ 147,60</span>
        <span className="text-[#C9A84C] text-[10px] font-semibold">Combo · 10% OFF</span>
      </div>
      <a
        href={COMBO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#C9A84C] text-[#1a1a1a] font-bold py-3 px-5 uppercase tracking-wider text-[11px] hover:bg-[#d4b65c] transition-all inline-flex items-center gap-1.5 shrink-0"
      >
        Quero o Combo
        <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
