import { useEffect, useRef, useState } from "react";
import React from "react";
import { motion, useInView } from "framer-motion";
import {
  Check, BookOpen, ClipboardCheck, Package, Star, Award, Users, Building,
  ArrowRight, ShieldCheck, Instagram, Mail, X, Zap, Lock, CreditCard,
  ChevronDown, Clock, AlertTriangle, Download
} from "lucide-react";
import { useIsMobile } from "@/hooks/useMobile";
import { LeadCaptureModal } from "@/components/ui/lead-capture-modal";

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
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={className}
      style={{ willChange: "opacity, transform" }}
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
    description: "Evite esquecimentos, ganhe tempo e entregue com mais segurança e profissionalismo. Criados com base em mais de 20 anos de vivência prática em obras de interiores.",
    mockup: checklistsMockup,
    benefits: [
      "Início de Obra",
      "Primeiro dia de obra",
      "Levantamento",
      "Demolição",
      "Hidráulica",
      "Ar-condicionado",
      "Elétrica",
      "Impermeabilização",
      "Construção",
      "Revestimentos",
      "Forro de Gesso",
      "Portas e Janelas",
      "Pintura",
      "Iluminação",
      "Piso Vinílico",
      "Piso de Madeira",
      "Marcenaria",
      "Marmoraria",
      "Vidros (Box e Espelhos)",
      "Vidros (Fechamento de Varanda)",
      "Verificações Finais",
    ],
    painPoints: [
      "Chega na obra e não sabe por onde começar a conferência",
      "Esquece detalhes importantes e só percebe na entrega",
      "Não tem um processo padronizado por etapa",
      "Sempre apagando incêndio por falta de controle",
    ],
    hotmartUrl: "https://pay.hotmart.com/F99460291O?checkoutMode=10",
    cta: "Comprar Materiais Individuais",
  },
  ebook: {
    name: "Manual de Gerenciamento da Sua Obra",
    price: 97,
    priceDisplay: "R$ 97,00",
    installments: "ou 3x de R$ 32,33",
    description: "Um guia completo para todos os profissionais que querem entender, de forma prática, como entregar uma obra sem dor de cabeça. Descubra a metodologia exclusiva de gerenciamento de obras da Inovando Arquitetura.",
    mockup: ebookMockup,
    benefits: [
      "Planejamento de Obra na prática: prioridades, cronograma e orçamento",
      "Etapas da Obra: Fase Cinza, Branca e Colorida",
      "Como organizar sua rotina de visita e conferência",
      "Comunicação eficiente com cliente, equipe e fornecedores",
      "Gestão de imprevistos e como evitar retrabalho",
      "Habilidades emocionais: controle emocional e postura de líder",
      "Metodologia exclusiva da Inovando Arquitetura",
    ],
    painPoints: [
      "Se sente perdida quando começa a fase de obra",
      "Quer se posicionar como líder na obra, mas não sabe como",
      "Sente que está sempre apagando incêndio, mesmo quando o projeto está lindo",
      "Quer mais organização, previsibilidade e menos estresse na obra",
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
  "Você entrega o projeto lindo, mas na obra sente que perde o controle",
  "Já perdeu cliente por causa de atraso ou retrabalho que poderia ter sido evitado",
  "Abre a planilha e não sabe se está no prazo ou no prejuízo",
  "Quer parar de improvisar e ter processos claros na obra",
  "Está começando a atuar em obra e sente insegurança",
  "Quer se posicionar como referência em gestão de obra",
];

const NOT_FOR_AUDIENCE = [
  "Quem busca fórmula mágica sem colocar em prática",
  "Quem não atua ou não pretende atuar em obra",
  "Quem espera conteúdo motivacional: aqui é processo e execução",
];

const FAQ_ITEMS = [
  {
    q: "Os materiais são digitais?",
    a: "Sim, tanto os 21 Checklists quanto o Manual são materiais 100% digitais. Após a compra, você recebe acesso imediato pela plataforma Hotmart.",
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
    q: "Qual a diferença entre os Checklists e o Manual?",
    a: "Os 21 Checklists são ferramentas práticas de execução: listas que você leva pra obra e usa etapa por etapa. O Manual é um guia estratégico completo de gestão, com fundamentos, técnicas e estratégias para dominar todo o processo de obra, do planejamento à entrega.",
  },
  {
    q: "Consigo parcelar?",
    a: "Sim. Todos os produtos podem ser parcelados em até 3x no cartão de crédito, sem juros.",
  },
];

export default function Materiais() {
  const isMobile = useIsMobile();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<"checklists" | "ebook" | "combo">("combo");

  const openCheckout = (product: "checklists" | "ebook" | "combo") => {
    setModalProduct(product);
    setModalOpen(true);
  };

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
      <section className="relative bg-[#1a1a1a] min-h-0 md:min-h-[85vh] flex flex-col md:flex-row items-center overflow-hidden">
        {/* Dark base */}
        <div className="absolute inset-0 bg-[#1a1a1a]" />
        {/* Desktop: gold glow behind mockups */}
        <div
          className="absolute z-[1] hidden md:block"
          style={{
            right: "10%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
          }}
        />
        {/* Mobile: gold glow behind mockups */}
        <div
          className="absolute z-[1] md:hidden"
          style={{
            left: "50%",
            top: "22%",
            transform: "translateX(-50%)",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)",
          }}
        />

        <GridLines variant="dark" />

        {/* ── MOBILE LAYOUT ── */}
        <div className="w-full md:hidden flex flex-col relative z-[3]">
          {/* Logo top-left */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="pt-6 px-5 flex justify-center"
          >
            <img src={logoLight} alt="Inovando na Sua Obra" className="w-[120px] opacity-90 mx-auto" />
          </motion.div>

          {/* Mockups centered */}
          <div className="relative flex justify-center items-end pt-6 pb-2 px-4">
            <motion.img
              src={ebookMockup}
              alt="Manual de Gerenciamento da Sua Obra"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-[130px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] -mr-3 relative z-[2]"
              loading="lazy" decoding="async"
            />
            <motion.img
              src={checklistsMockup}
              alt="21 Checklists de Obra"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-[165px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] relative z-[1]"
              loading="lazy" decoding="async"
            />
            {/* Fade bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1a1a1a] to-transparent z-[4]" />
          </div>

          {/* Content */}
          <div className="px-5 pt-4 pb-8">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-display text-[20px] sm:text-[22px] font-bold text-white leading-[1.15] uppercase tracking-wide mb-3 text-center"
            >
              <span className="text-[#C9A84C] block">Checklists de Obra</span>
              <span className="text-[#C9A84C] block">de Interiores</span>
              <span className="block text-white/60 text-[16px] sm:text-[18px] my-1">+</span>
              <span className="text-[#C9A84C] block">Manual de Gerenciamento</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-white/60 text-sm leading-relaxed mb-5 max-w-md"
            >
              O método de quem já gerenciou mais de 250 obras de interiores, agora nas suas mãos para organizar cada etapa e eliminar o improviso.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex items-center justify-center gap-5 mb-6"
            >
              {[
                { value: 250, suffix: "+", label: "obras", icon: Building },
                { value: 100, suffix: "+", label: "alunas", icon: Users },
                { value: 12, suffix: "", label: "anos", icon: Award },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-white/40 text-[10px] uppercase tracking-wider">
                  <item.icon className="w-3.5 h-3.5 text-[#C9A84C]/70" />
                  <span className="text-white/70 font-bold"><AnimatedNumber value={item.value} suffix={item.suffix} /></span>
                  <span>{item.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col gap-3"
            >
              <button
                onClick={scrollToProducts}
                className="bg-[#2E7D32] text-white font-bold py-4 px-8 uppercase tracking-widest text-xs hover:bg-[#256829] transition-all shadow-[0_4px_24px_rgba(46,125,50,0.3)] border border-[#2E7D32]/50 inline-flex items-center justify-center gap-2 group w-full"
              >
                Comprar Materiais Individuais
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => openCheckout("combo")}
                className="bg-[#2E7D32] text-white font-bold py-4 px-8 uppercase tracking-widest text-xs hover:bg-[#256829] transition-all shadow-[0_4px_24px_rgba(46,125,50,0.3)] border border-[#2E7D32]/50 inline-flex items-center justify-center gap-2 group w-full"
              >
                Garantir o Combo com 10% OFF
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* ── DESKTOP LAYOUT ── */}
        <div className="container mx-auto px-5 md:px-8 relative z-10 pb-8 md:pb-0 flex-1 hidden md:flex items-center">
          <div className="max-w-xl">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}>
              <img src={logoLight} alt="Inovando na Sua Obra" className="w-[200px] lg:w-[240px] mb-7 opacity-90" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-display text-3xl lg:text-4xl font-bold text-white leading-[1.15] uppercase tracking-wide mb-4"
            >
              <span className="text-[#C9A84C]">Checklists de Obra de Interiores</span>{" "}+{" "}<span className="text-[#C9A84C]">Manual de Gerenciamento</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-white/60 text-base leading-relaxed mb-6 max-w-md"
            >
              O método de quem já gerenciou mais de 250 obras de interiores, agora nas suas mãos para organizar cada etapa e eliminar o improviso.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex items-center gap-5 mb-8"
            >
              {[
                { value: 250, suffix: "+", label: "obras", icon: Building },
                { value: 100, suffix: "+", label: "alunas", icon: Users },
                { value: 12, suffix: "", label: "anos", icon: Award },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-white/40 text-[10px] uppercase tracking-wider">
                  <item.icon className="w-3.5 h-3.5 text-[#C9A84C]/70" />
                  <span className="text-white/70 font-bold"><AnimatedNumber value={item.value} suffix={item.suffix} /></span>
                  <span>{item.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-row gap-3"
            >
              <button
                onClick={scrollToProducts}
                className="bg-[#2E7D32] text-white font-bold py-4 px-8 uppercase tracking-widest text-xs hover:bg-[#256829] transition-all shadow-[0_4px_24px_rgba(46,125,50,0.3)] border border-[#2E7D32]/50 inline-flex items-center justify-center gap-2 group"
              >
                Comprar Materiais Individuais
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => openCheckout("combo")}
                className="bg-[#2E7D32] text-white font-bold py-4 px-8 uppercase tracking-widest text-xs hover:bg-[#256829] transition-all shadow-[0_4px_24px_rgba(46,125,50,0.3)] border border-[#2E7D32]/50 inline-flex items-center justify-center gap-2 group"
              >
                Garantir o Combo com 10% OFF
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Desktop: Floating mockups on the right */}
        <div className="hidden md:flex absolute right-[6%] lg:right-[10%] top-1/2 -translate-y-1/2 z-[5] items-end">
          <motion.img
            src={ebookMockup}
            alt="Manual de Gerenciamento da Sua Obra"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-[180px] lg:w-[220px] xl:w-[260px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] -mr-6 relative z-[2]"
          />
          <motion.img
            src={checklistsMockup}
            alt="21 Checklists de Obra"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-[220px] lg:w-[270px] xl:w-[320px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative z-[1]"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-white/20 text-[9px] uppercase tracking-widest">Descubra mais</span>
          <ChevronDown className="w-4 h-4 text-white/20 animate-bounce" />
        </motion.div>
      </section>


      {/* ═══════════════════ TRUST BADGES BAR ═══════════════════ */}
      <div className="bg-[#1a1a1a] border-b border-white/[0.06] py-4 relative z-10">
        <div className="container mx-auto px-4 flex items-center justify-center gap-6 sm:gap-10">
          <span className="flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white/40 font-medium">
            <Download className="w-3.5 h-3.5 text-[#C9A84C]/60" /> Materiais Digitais
          </span>
          <span className="flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white/40 font-medium">
            <Zap className="w-3.5 h-3.5 text-[#C9A84C]/60" /> Acesso Imediato
          </span>
          <span className="flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white/40 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C9A84C]/60" /> Garantia 7 Dias
          </span>
        </div>
      </div>

      {/* ═══════════════════ URGENCY BANNER ═══════════════════ */}
      <div className="bg-[#C9A84C]/10 border-y border-[#C9A84C]/20 py-3 relative z-10">
        <div className="container mx-auto px-4 flex items-center justify-center gap-3 text-center">
          <Clock className="w-4 h-4 text-[#C9A84C] shrink-0" />
          <p className="text-xs sm:text-sm text-[#1a1a1a]/80 font-medium">
            <strong className="text-red-600">Oferta por tempo limitado</strong> · Preço promocional pode encerrar a qualquer momento
          </p>
          <span className="w-2 h-2 bg-[#C9A84C] rounded-full animate-pulse shrink-0" />
        </div>
      </div>

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

          <FadeIn className="mt-10 text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#2E7D32]/10 border border-[#2E7D32]/20 px-5 py-3">
              <Check className="w-5 h-5 text-[#2E7D32]" />
              <p className="text-sm text-white/80 font-medium">
                A solução está em ter <strong className="text-[#C9A84C]">processos claros</strong> para cada etapa da obra
              </p>
            </div>
            <div>
              <button
                onClick={scrollToProducts}
                className="bg-[#2E7D32] text-white font-bold py-4 px-8 uppercase tracking-widest text-xs hover:bg-[#256829] transition-all shadow-[0_4px_24px_rgba(46,125,50,0.3)] inline-flex items-center justify-center gap-2 group w-full max-w-md mx-auto"
              >
                Quero resolver isso agora
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
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
                  loading="lazy" decoding="async"
                />
              </div>
              <div>
                
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] font-semibold mb-3">Criadoras dos materiais</p>
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
                    Cada checklist e cada página do Manual foram criados com base em{" "}
                    <strong className="text-[#1a1a1a]">experiências reais de obra</strong>. Nada de teoria vazia:
                    é o que realmente funciona no dia a dia de quem vive obra.
                  </p>
                </div>
                <div className="mt-8 text-center">
                  <button
                    onClick={scrollToProducts}
                    className="bg-[#2E7D32] text-white font-bold py-3.5 px-8 uppercase tracking-widest text-xs hover:bg-[#256829] transition-all shadow-[0_4px_24px_rgba(46,125,50,0.3)] inline-flex items-center justify-center gap-2 group"
                  >
                    Conhecer os materiais
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
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
              Um único retrabalho de piso pode custar <strong className="text-[#1a1a1a]">R$ 3.000 ou mais</strong>.
              Atrasos, refações e clientes insatisfeitos corroem seu lucro e sua reputação.
            </p>
            <p className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-2">
              Por menos que um metro quadrado de porcelanato, você organiza{" "}
              <span className="text-[#C9A84C]">todas</span> as suas obras.
            </p>
            <p className="text-xs text-[#1a1a1a]/40">
              3x de R$ 49,20 no combo · menos de R$ 50/mês para ter controle total
            </p>
          </div>
        </section>
      </FadeIn>

      {/* ═══════════════════ PRODUTOS ═══════════════════ */}
      <section id="produtos" className="py-16 md:py-24 bg-[#1a1a1a] relative overflow-hidden">
        <GridLines variant="dark" />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] font-semibold mb-3">Materiais Individuais</p>
            <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-white uppercase tracking-tight mb-4">
              Escolha o material ideal para você
            </h2>
            <p className="text-white/50 text-sm max-w-lg mx-auto">
              Ferramentas práticas criadas por quem vive o dia a dia da obra
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {/* Card Checklists */}
            <FadeIn>
              <div className="bg-[#242424] border border-white/10 flex flex-col h-full relative group hover:border-[#C9A84C]/30 transition-colors overflow-hidden">
                <div className="absolute top-3 right-3 z-10 bg-[#C9A84C]/15 border border-[#C9A84C]/30 px-2.5 py-1">
                  <span className="text-[9px] uppercase tracking-wider text-[#C9A84C] font-bold">Preço Promocional</span>
                </div>
                <div className="absolute top-0 left-0 w-12 h-px bg-[#C9A84C]" />
                <div className="absolute top-0 left-0 w-px h-12 bg-[#C9A84C]" />

                {/* Mockup image */}
                <div className="relative bg-gradient-to-b from-[#2a2a2a] to-[#242424] p-4 flex justify-center">
                  <img src={checklistsMockup} alt="21 Checklists de Obra" className="w-full max-w-[280px] h-auto" loading="lazy" decoding="async" />
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
                    Os 21 checklists que você recebe
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 mb-6 flex-1">
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
                    <button
                      onClick={() => openCheckout("checklists")}
                      className="block w-full bg-[#2E7D32] text-white font-bold py-3.5 text-center uppercase tracking-widest text-xs hover:bg-[#256829] transition-all shadow-[0_4px_24px_rgba(46,125,50,0.3)]"
                    >
                      {PRODUCTS.checklists.cta}
                    </button>
                    <p className="text-[#C9A84C]/60 text-[9px] text-center mt-1.5 font-medium">Garanta antes que o preço aumente</p>
                    <p className="text-white/20 text-[10px] text-center mt-1 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#2E7D32]" /> Pagamento seguro via Hotmart
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Card Manual */}
            <FadeIn delay={0.1}>
              <div className="bg-[#242424] border border-white/10 flex flex-col h-full relative group hover:border-[#C9A84C]/30 transition-colors overflow-hidden">
                <div className="absolute top-3 right-3 z-10 bg-[#C9A84C]/15 border border-[#C9A84C]/30 px-2.5 py-1">
                  <span className="text-[9px] uppercase tracking-wider text-[#C9A84C] font-bold">Preço Promocional</span>
                </div>
                <div className="absolute top-0 left-0 w-12 h-px bg-[#C9A84C]" />
                <div className="absolute top-0 left-0 w-px h-12 bg-[#C9A84C]" />

                {/* Mockup image */}
                <div className="relative bg-gradient-to-b from-[#2a2a2a] to-[#242424] p-6 flex justify-center">
                  <img src={ebookMockup} alt="Manual de Gerenciamento da Sua Obra" className="w-full max-w-[200px] h-auto" loading="lazy" decoding="async" />
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
                    <button
                      onClick={() => openCheckout("ebook")}
                      className="block w-full bg-[#2E7D32] text-white font-bold py-3.5 text-center uppercase tracking-widest text-xs hover:bg-[#256829] transition-all shadow-[0_4px_24px_rgba(46,125,50,0.3)]"
                    >
                      {PRODUCTS.ebook.cta}
                    </button>
                    <p className="text-[#C9A84C]/60 text-[9px] text-center mt-1.5 font-medium">Garanta antes que o preço aumente</p>
                    <p className="text-white/20 text-[10px] text-center mt-1 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#2E7D32]" /> Pagamento seguro via Hotmart
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Card Combo */}
          <FadeIn className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-[#2a2520] to-[#1a1a1a] border-2 border-[#C9A84C]/40 p-6 md:p-8 overflow-hidden">
              {/* Badges */}
              <div className="flex gap-2 mb-4">
                <span className="bg-[#C9A84C] text-[#1a1a1a] text-[10px] font-bold uppercase tracking-wider px-3 py-1">
                  Mais Popular
                </span>
                <span className="bg-red-500/90 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1">
                  Oferta Limitada
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <Package className="w-8 h-8 text-[#C9A84C]" />
                <div>
                  <h3 className="font-display text-lg md:text-xl font-bold text-white uppercase tracking-wide">
                    Combo Completo
                  </h3>
                  <p className="text-[#C9A84C]/70 text-xs">21 Checklists + Manual com 10% de desconto</p>
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
                      Manual completo de gestão
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
                  <button
                    onClick={() => openCheckout("combo")}
                    className="inline-flex items-center gap-2 bg-[#2E7D32] text-white font-bold py-4 px-8 uppercase tracking-widest text-xs hover:bg-[#256829] transition-all shadow-[0_4px_24px_rgba(46,125,50,0.3)] group"
                  >
                    Quero o Combo Completo
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="text-white/20 text-[10px] mt-2 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#2E7D32]" /> Pagamento seguro via Hotmart · Acesso imediato
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════ PARA QUEM É ═══════════════════ */}
      <FadeIn>
        <section className="py-16 md:py-24 bg-[#f0ede8] relative overflow-hidden">
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
            <div className="text-center mt-8">
              <button
                onClick={scrollToProducts}
                className="bg-[#2E7D32] text-white font-bold py-3.5 px-8 uppercase tracking-widest text-xs hover:bg-[#256829] transition-all shadow-[0_4px_24px_rgba(46,125,50,0.3)] inline-flex items-center gap-2 group"
              >
                Comprar Materiais Individuais
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ═══════════════════ PARA QUEM NÃO É ═══════════════════ */}
      <FadeIn>
        <section className="py-12 md:py-16 bg-white border-y border-[#e8e4dc] relative overflow-hidden">
          <GridLines variant="light" />
          <div className="container mx-auto px-4 max-w-3xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-red-400/80 font-semibold mb-3 text-center">Para quem NÃO é</p>
            <h2 className="font-display text-lg md:text-xl font-bold text-[#1a1a1a] uppercase tracking-tight mb-6 text-center">
              Esse material não é para todo mundo
            </h2>
            <div className="space-y-3 max-w-xl mx-auto">
              {NOT_FOR_AUDIENCE.map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-red-50 p-4 border-l-2 border-red-400/50">
                  <X className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-[#1a1a1a]/70">{item}</p>
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
              <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Pagamento seguro via Hotmart</span>
              <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> Acesso imediato</span>
              <span className="flex items-center gap-1"><CreditCard className="w-3.5 h-3.5" /> Até 3x sem juros</span>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <FadeIn>
        <section className="py-16 md:py-24 bg-[#f0ede8] relative overflow-hidden">
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
                Comprar Materiais Individuais
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => openCheckout("combo")}
                className="bg-[#2E7D32] text-white font-bold py-4 px-8 uppercase tracking-widest text-xs hover:bg-[#256829] transition-all shadow-[0_4px_24px_rgba(46,125,50,0.3)] border border-[#2E7D32]/50 inline-flex items-center justify-center gap-2 group"
              >
                Garantir o Combo com 10% OFF
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            <p className="text-white/30 text-[10px] mt-4 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" /> Pagamento 100% seguro via Hotmart
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="bg-[#111] py-10 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <img src={logoLight} alt="Inovando na Sua Obra" className="h-14 md:h-16 opacity-70 mx-auto md:mx-0 mb-4" loading="lazy" decoding="async" />
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
      {isMobile && <MobileStickyBar onOpenCheckout={() => openCheckout("combo")} />}

      {/* ═══════════════════ LEAD CAPTURE MODAL ═══════════════════ */}
      <LeadCaptureModal open={modalOpen} onOpenChange={setModalOpen} productKey={modalProduct} />
    </div>
  );
}

/* ─── Mobile Sticky CTA Bar ─── */
function MobileStickyBar({ onOpenCheckout }: { onOpenCheckout: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToProducts = () => {
    document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-md border-t border-[#C9A84C]/20 px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]"
    >
      <div className="flex gap-2">
        <button
          onClick={scrollToProducts}
          className="flex-1 bg-[#2E7D32]/20 border border-[#2E7D32]/40 text-white font-bold py-3 uppercase tracking-wider text-[10px] hover:bg-[#2E7D32]/30 transition-all text-center"
        >
          Ver Materiais
        </button>
        <button
          onClick={onOpenCheckout}
          className="flex-[2] bg-[#2E7D32] text-white font-bold py-3 uppercase tracking-wider text-[10px] hover:bg-[#256829] transition-all inline-flex items-center justify-center gap-1.5 shrink-0"
        >
          Garantir o Combo
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
      <p className="text-white/30 text-[9px] text-center mt-1.5 flex items-center justify-center gap-1">
        <ShieldCheck className="w-3 h-3 text-[#2E7D32]" /> Pagamento seguro via Hotmart
      </p>
    </motion.div>
  );
}
