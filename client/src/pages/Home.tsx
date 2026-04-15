import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Check,
  ShieldCheck,
  Lock,
  ArrowRight,
  Phone,
  Mail,
  Instagram,
  ChevronDown,
  FileText,
  Clock,
  Users,
  MapPin,
  BookOpen,
  TrendingUp,
  Layers,
  MessageSquare,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ─── Asset imports ─── */
import imgLogo from "@/assets/mentoria/logo.png";
import imgHeroPhoto from "@/assets/mentoria/hero-photo.png";
import imgAbout from "@/assets/mentoria/about.png";
import imgGuarantee from "@/assets/mentoria/guarantee.png";
import imgGarantiaMobile from "@/assets/mentoria/garantia-mobile.png";
import imgTestimonial1 from "@/assets/mentoria/testimonial1.png";
import imgTestimonial2 from "@/assets/mentoria/testimonial2.png";
import imgTestimonial3 from "@/assets/mentoria/testimonial3.png";
import imgTestimonial4 from "@/assets/mentoria/testimonial4.png";

/* ═══════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════ */
const C = {
  cream: "#FAF8F4",
  white: "#FFFFFF",
  ink: "#1C1C1A",
  inkLight: "#3A3A38",
  muted: "#8A8A87",
  border: "#E8E4DC",
  gold: "#C9A257",
  goldLight: "#F0E6CC",
  green: "#2E7D32",
  greenDark: "#256829",
  dark: "#1A1510",
};

/* ═══════════════════════════════════════
   ANIMATION WRAPPER
   ═══════════════════════════════════════ */
function Reveal({
  children,
  className = "",
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
  [key: string]: unknown;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   SECTION LABEL
   ═══════════════════════════════════════ */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 justify-center mb-5">
      <div className="w-8 h-px" style={{ backgroundColor: C.gold }} />
      <span
        className="text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ color: C.gold }}
      >
        {children}
      </span>
      <div className="w-8 h-px" style={{ backgroundColor: C.gold }} />
    </div>
  );
}

/* ═══════════════════════════════════════
   PHONE MASK
   ═══════════════════════════════════════ */
function phoneMask(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/* ═══════════════════════════════════════
   LEAD FORM
   ═══════════════════════════════════════ */
function LeadForm({
  id,
  ctaLabel = "QUERO ENTRAR NA MENTORIA",
  dark = false,
}: {
  id?: string;
  ctaLabel?: string;
  dark?: boolean;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Informe seu nome";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "E-mail inválido";
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 11) e.phone = "WhatsApp inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const digits = phone.replace(/\D/g, "");
    const params = new URLSearchParams({
      off: "22jnl093",
      checkoutMode: "10",
      name,
      email,
      phonenumber: `55${digits}`,
    });
    window.location.href = `https://pay.hotmart.com/Y93975016X?${params}`;
  };

  const inputClass = `w-full px-4 py-3.5 text-sm border focus:outline-none focus:ring-1 transition-colors ${
    dark
      ? "bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:ring-white/40"
      : "bg-white border-[#E8E4DC] text-[#1C1C1A] placeholder:text-[#9A9A97] focus:ring-[#C9A257] focus:border-[#C9A257]"
  }`;

  return (
    <form id={id} onSubmit={handleSubmit} className="space-y-3 w-full">
      <div>
        <input
          type="text"
          placeholder="Seu nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
        {errors.name && (
          <p className="text-red-400 text-xs mt-1">{errors.name}</p>
        )}
      </div>
      <div>
        <input
          type="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email}</p>
        )}
      </div>
      <div>
        <input
          type="tel"
          placeholder="Seu WhatsApp (99) 99999-9999"
          value={phone}
          onChange={(e) => setPhone(phoneMask(e.target.value))}
          className={inputClass}
        />
        {errors.phone && (
          <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full py-4 font-bold text-sm tracking-widest uppercase transition-colors flex items-center justify-center gap-2.5"
        style={{ backgroundColor: C.green, color: C.white }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = C.greenDark)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = C.green)
        }
      >
        {ctaLabel}
        <ArrowRight className="w-4 h-4" />
      </button>
      <p className="flex items-center justify-center gap-1.5 text-xs" style={{ color: dark ? "rgba(255,255,255,0.45)" : C.muted }}>
        <Lock className="w-3.5 h-3.5" />
        Ambiente 100% seguro
      </p>
    </form>
  );
}

/* ═══════════════════════════════════════
   DATA
   ═══════════════════════════════════════ */
const SKILLS = [
  {
    icon: Layers,
    title: "Gestão de Obra Eficiente",
    desc: "Planejamento, cronograma e controle de etapas com precisão do início ao fim.",
  },
  {
    icon: FileText,
    title: "Documentação Profissional",
    desc: "Contratos, memoriais descritivos e checklists que protegem você e seu cliente.",
  },
  {
    icon: MessageSquare,
    title: "Comunicação com Clientes",
    desc: "Como conduzir reuniões, alinhar expectativas e criar uma experiência inesquecível.",
  },
  {
    icon: DollarSign,
    title: "Controle Financeiro da Obra",
    desc: "Orçamentos, planilhas e como garantir sua margem de lucro em cada projeto.",
  },
  {
    icon: AlertCircle,
    title: "Resolução de Imprevistos",
    desc: "Como agir com segurança diante de problemas na obra sem perder o cliente.",
  },
  {
    icon: TrendingUp,
    title: "Posicionamento de Mercado",
    desc: "Diferencie-se, cobre o que seu trabalho vale e construa uma carteira sólida.",
  },
];

const AUDIENCE = [
  {
    title: "Arquitetas",
    desc: "Que querem estruturar o gerenciamento de obras com método e segurança.",
  },
  {
    title: "Designers de Interiores",
    desc: "Que perdem o controle das obras dos clientes e buscam um processo eficiente.",
  },
  {
    title: "Engenheiras",
    desc: "Que atuam com projetos de interiores e desejam elevar a qualidade da entrega.",
  },
  {
    title: "Profissionais em Crescimento",
    desc: "Que querem transformar o caos da obra em um processo previsível e lucrativo.",
  },
];

const MODULES = [
  {
    number: "01",
    title: "Primeiros Passos",
    desc: "Fundamentos do gerenciamento de interiores: organização do início do projeto, onboarding do cliente e estruturação do escritório para crescer com consistência.",
    items: [
      "Diagnóstico e alinhamento com o cliente",
      "Estrutura do contrato de gerenciamento",
      "Checklist de início de obra",
      "Organização do escritório e fluxo de trabalho",
    ],
  },
  {
    number: "02",
    title: "Projeto Executável",
    desc: "Como criar um projeto de interiores que realmente funciona na obra: compatibilização, memoriais e comunicação com fornecedores e equipe.",
    items: [
      "Memorial descritivo completo",
      "Compatibilização de projetos",
      "Seleção e gestão de fornecedores",
      "Comunicação técnica com pedreiros e instaladores",
    ],
  },
  {
    number: "03",
    title: "Gerenciamento de Obra",
    desc: "Gestão de cronograma, visitas técnicas, controle de execução e resolução de imprevistos em tempo real com segurança e clareza.",
    items: [
      "Cronograma detalhado por etapas",
      "Relatórios de visita técnica",
      "Controle de qualidade em campo",
      "Protocolo para imprevistos e retrabalhos",
    ],
  },
  {
    number: "04",
    title: "Finalização e Fidelização",
    desc: "Entrega impecável, vistoria final, satisfação do cliente e estratégias para transformar cada projeto em indicações e novos contratos.",
    items: [
      "Protocolo de vistoria e entrega",
      "Gestão do pós-obra",
      "Como gerar indicações orgânicas",
      "Fidelização e recorrência de clientes",
    ],
  },
];

const BONUS = [
  {
    icon: FileText,
    title: "Pack Completo de Documentos",
    subtitle: "Biblioteca de ferramentas prontas para uso",
    items: [
      "Modelo de contrato de gerenciamento",
      "Planilha de orçamento e controle financeiro",
      "Checklist completo de visita técnica",
      "Modelos de e-mail e comunicação profissional",
    ],
  },
  {
    icon: BookOpen,
    title: "Aulas Bônus Exclusivas",
    subtitle: "Conteúdo extra para acelerar seus resultados",
    items: [
      "Precificação e como cobrar o que você vale",
      "Posicionamento digital para arquitetas",
      "Como construir uma carteira de clientes sólida",
      "Plantões de dúvidas ao vivo com as mentoras",
    ],
  },
];

const STATS = [
  { value: "+250", label: "Obras gerenciadas" },
  { value: "+100", label: "Alunas transformadas" },
  { value: "20", label: "Anos de experiência" },
];

const INCLUDES = [
  { icon: Clock, text: "16h de conteúdo gravado em 4 módulos" },
  { icon: BookOpen, text: "12 meses de acesso à plataforma" },
  { icon: Users, text: "1h de mentoria individual com as fundadoras" },
  { icon: MapPin, text: "Encontro presencial em São Paulo" },
  { icon: FileText, text: "Materiais, checklists e ferramentas prontas" },
  { icon: MessageSquare, text: "Suporte e grupo exclusivo de networking" },
];

const FAQS = [
  {
    q: "As aulas são gravadas ou ao vivo?",
    a: "Todo o conteúdo já está gravado e organizado por temas na plataforma. Assim que você comprar, terá acesso imediato aos 4 módulos. As aulas bônus e os plantões de dúvidas serão ao vivo pelo Zoom, com gravações disponíveis na Hotmart.",
  },
  {
    q: "Em quanto tempo eu termino a mentoria?",
    a: "Aproximadamente 3 meses. O conteúdo gravado tem 16h — o equivalente a 1h33 por semana ao longo de 12 semanas.",
  },
  {
    q: "Por quanto tempo eu tenho acesso ao conteúdo?",
    a: "1 ano de acesso completo à plataforma e a todos os materiais.",
  },
  {
    q: "Consigo conciliar a mentoria com meu dia a dia?",
    a: "Sim. As aulas foram planejadas para se ajustar à rotina de quem trabalha em obra. Conteúdo prático e direto, em módulos concisos, para você aprender no seu ritmo e aplicar no dia seguinte.",
  },
  {
    q: "Não encontrei a resposta para minha dúvida, como faço?",
    a: "Entre em contato pelo WhatsApp ou e-mail. Nossa equipe está pronta para te ajudar antes, durante e após a compra.",
  },
];

/* ═══════════════════════════════════════
   SKILL HERO CARD
   ═══════════════════════════════════════ */
function SkillHero({ skill }: { skill: typeof SKILLS[0] }) {
  const Icon = skill.icon;
  return (
    <Reveal
      delay={0}
      className="lg:row-span-2 relative overflow-hidden flex flex-col justify-between p-10"
      style={{ backgroundColor: C.dark, minHeight: "320px" }}
    >
      <div
        className="absolute bottom-0 right-0 font-display font-bold leading-none select-none pointer-events-none"
        style={{ fontFamily: "Montserrat, sans-serif", fontSize: "11rem", color: C.gold, opacity: 0.06, lineHeight: 1 }}
      >
        01
      </div>
      <div className="relative z-10 space-y-5">
        <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: C.gold }}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="w-8 h-px" style={{ backgroundColor: C.gold }} />
        <h3
          className="font-display font-bold text-xl uppercase text-white leading-tight"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {skill.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
          {skill.desc}
        </p>
      </div>
      <div className="relative z-10 mt-8">
        <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: C.gold }}>
          Habilidade principal
        </span>
      </div>
    </Reveal>
  );
}

function SkillWide({ skill }: { skill: typeof SKILLS[0] }) {
  const Icon = skill.icon;
  return (
    <Reveal
      delay={0.42}
      className="lg:col-span-2 p-7 flex flex-col sm:flex-row items-start gap-6"
      style={{ backgroundColor: C.goldLight, border: `1px solid ${C.border}` }}
    >
      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: C.gold }}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="space-y-2">
        <h3
          className="font-display font-bold text-base uppercase tracking-wide"
          style={{ fontFamily: "Montserrat, sans-serif", color: C.ink }}
        >
          {skill.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: C.inkLight }}>
          {skill.desc}
        </p>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════ */
export default function Home() {
  const [stickyNav, setStickyNav] = useState(false);
  const [showMobileCTA, setShowMobileCTA] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setStickyNav(window.scrollY > 60);
      setShowMobileCTA(window.scrollY > 800);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Mentoria Inovando na Sua Obra",
      description:
        "Mentoria completa de gerenciamento de obras de interiores para arquitetas, designers e engenheiras.",
      brand: { "@type": "Organization", name: "Inovando na Sua Obra" },
      offers: {
        "@type": "Offer",
        price: "2300.00",
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
        url: "https://www.inovandonasuaobra.com.br/",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: "100",
      },
    };
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.cream, fontFamily: "Inter, sans-serif" }}>

      {/* ══════════════════════════════
          STICKY NAV
      ══════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: stickyNav ? "rgba(250,248,244,0.97)" : "transparent",
          backdropFilter: stickyNav ? "blur(12px)" : "none",
          borderBottom: stickyNav ? `1px solid ${C.border}` : "none",
        }}
      >
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <img
            src={imgLogo}
            alt="Inovando na Sua Obra"
            className="h-14 object-contain mix-blend-multiply"
          />
          <button
            onClick={() => scrollTo("pricing")}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-widest uppercase transition-colors"
            style={{ backgroundColor: C.green, color: C.white }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = C.greenDark)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = C.green)
            }
          >
            Quero me inscrever
          </button>
        </div>
      </header>

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center pt-16"
        style={{ backgroundColor: C.cream }}
      >
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — copy + form */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px" style={{ backgroundColor: C.gold }} />
                  <span
                    className="text-xs font-semibold uppercase tracking-[0.2em]"
                    style={{ color: C.gold }}
                  >
                    Mentoria para Arquitetas e Designers
                  </span>
                </div>

                <h1
                  className="font-display text-3xl md:text-4xl xl:text-5xl font-bold uppercase leading-[1.1]"
                  style={{ color: C.ink, fontFamily: "Montserrat, sans-serif" }}
                >
                  Domine o gerenciamento de obra de interiores de forma{" "}
                  <em className="not-italic" style={{ color: C.gold }}>lucrativa</em>{" "}
                  e eficiente
                </h1>

                <p className="text-base md:text-lg leading-relaxed" style={{ color: C.inkLight }}>
                  Transforme cada projeto em uma jornada inesquecível para seus clientes — do primeiro contato à entrega final.
                </p>
              </div>

              <div
                className="p-6 md:p-8 space-y-5"
                style={{ backgroundColor: C.white, border: `1px solid ${C.border}` }}
              >
                <p
                  className="text-sm font-semibold uppercase tracking-wider"
                  style={{ color: C.ink }}
                >
                  Garante sua vaga agora
                </p>
                <LeadForm id="hero-form" />
              </div>
            </motion.div>

            {/* Right — photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Gold accent frame */}
                <div
                  className="absolute -top-3 -right-3 w-full h-full"
                  style={{ border: `2px solid ${C.gold}`, zIndex: 0 }}
                />
                <img
                  src={imgHeroPhoto}
                  alt="Ingrid Zarza e Fernanda Bradaschia — Mentoria Inovando na Sua Obra"
                  className="relative z-10 max-w-full h-auto mix-blend-multiply"
                  style={{ maxHeight: "560px", objectFit: "cover" }}
                  loading="eager"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-5 h-5" style={{ color: C.muted }} />
        </motion.div>
      </section>

      {/* ══════════════════════════════
          STATS BAR
      ══════════════════════════════ */}
      <section style={{ backgroundColor: C.dark }}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-3 divide-x" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            {STATS.map((s) => (
              <Reveal key={s.label} className="py-10 md:py-14 text-center px-4">
                <p
                  className="font-display text-3xl md:text-5xl font-bold"
                  style={{ fontFamily: "Montserrat, sans-serif", color: C.gold }}
                >
                  {s.value}
                </p>
                <p className="text-xs md:text-sm mt-2 uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          PARA QUEM É
      ══════════════════════════════ */}
      <section className="py-24 md:py-32 overflow-hidden" style={{ backgroundColor: C.white }}>
        <div className="container mx-auto px-4 md:px-8">
          <Reveal className="text-center mb-16">
            <Label>Para Quem É</Label>
            <h2
              className="font-display text-2xl md:text-4xl font-bold uppercase"
              style={{ fontFamily: "Montserrat, sans-serif", color: C.ink }}
            >
              Esta mentoria foi feita para você
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AUDIENCE.map((a, i) => (
              <Reveal
                key={a.title}
                delay={i * 0.1}
                className="relative overflow-hidden group"
                style={{ backgroundColor: C.cream, border: `1px solid ${C.border}` }}
              >
                {/* Ghost ordinal number */}
                <div
                  className="absolute -top-4 -right-2 font-display font-bold leading-none select-none pointer-events-none"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "7rem",
                    color: C.gold,
                    opacity: 0.07,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="relative z-10 p-8 space-y-4">
                  <div
                    className="w-7 h-7 flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: C.gold, color: C.white, fontFamily: "Montserrat, sans-serif" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3
                    className="font-display font-bold text-base uppercase"
                    style={{ fontFamily: "Montserrat, sans-serif", color: C.ink }}
                  >
                    {a.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
                    {a.desc}
                  </p>
                  <div className="w-0 h-px transition-all duration-500 group-hover:w-full" style={{ backgroundColor: C.gold }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          O QUE VOCÊ VAI APRENDER
      ══════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: C.cream }}>
        <div className="container mx-auto px-4 md:px-8">
          <Reveal className="text-center mb-16">
            <Label>Habilidades</Label>
            <h2
              className="font-display text-2xl md:text-4xl font-bold uppercase"
              style={{ fontFamily: "Montserrat, sans-serif", color: C.ink }}
            >
              O que você vai aprender
            </h2>
          </Reveal>

          {/* Featured layout: 1 large hero skill + 5 supporting */}
          <div className="grid lg:grid-cols-3 gap-6">

            {/* Hero skill — spans 1 col full height */}
            <SkillHero skill={SKILLS[0]} />

            {/* Supporting skills — 2 cols × 2 rows + last row spans 2 */}
            {SKILLS.slice(1, 5).map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal
                  key={s.title}
                  delay={(i + 1) * 0.07}
                  className="p-7 space-y-3 group"
                  style={{ backgroundColor: C.white, border: `1px solid ${C.border}` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center shrink-0" style={{ backgroundColor: C.goldLight }}>
                      <Icon className="w-4 h-4" style={{ color: C.gold }} />
                    </div>
                    <h3
                      className="font-display font-bold text-sm uppercase tracking-wide leading-tight"
                      style={{ fontFamily: "Montserrat, sans-serif", color: C.ink }}
                    >
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{s.desc}</p>
                  <div className="w-0 h-px transition-all duration-500 group-hover:w-full" style={{ backgroundColor: C.gold }} />
                </Reveal>
              );
            })}

            {/* Last skill spans 2 cols */}
            <SkillWide skill={SKILLS[5]} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          COMO FUNCIONA
      ══════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: C.white }}>
        <div className="container mx-auto px-4 md:px-8">
          <Reveal className="text-center mb-20">
            <Label>Como Funciona</Label>
            <h2
              className="font-display text-2xl md:text-4xl font-bold uppercase"
              style={{ fontFamily: "Montserrat, sans-serif", color: C.ink }}
            >
              O que está incluído na mentoria
            </h2>
          </Reveal>

          {/* Visual timeline grid */}
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {INCLUDES.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.text} delay={i * 0.08} className="relative">
                  {/* Connector line (desktop only, not on last of each row) */}
                  <div className="flex flex-col items-start gap-4">
                    {/* Icon with number badge */}
                    <div className="relative">
                      <div
                        className="w-14 h-14 flex items-center justify-center"
                        style={{ backgroundColor: C.cream, border: `2px solid ${C.gold}` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: C.gold }} />
                      </div>
                      <div
                        className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-[10px] font-bold"
                        style={{ backgroundColor: C.dark, color: C.gold, fontFamily: "Montserrat, sans-serif" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    </div>
                    <p
                      className="text-sm leading-relaxed font-medium"
                      style={{ color: C.inkLight }}
                    >
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="text-center mt-14">
            <button
              onClick={() => scrollTo("pricing")}
              className="inline-flex items-center gap-2.5 px-8 py-4 font-bold text-sm tracking-widest uppercase transition-colors"
              style={{ backgroundColor: C.green, color: C.white }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = C.greenDark)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = C.green)
              }
            >
              Quero meu acesso
              <ArrowRight className="w-4 h-4" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════
          MÓDULOS
      ══════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: C.cream }}>
        <div className="container mx-auto px-4 md:px-8">
          <Reveal className="text-center mb-16">
            <Label>Conteúdo</Label>
            <h2
              className="font-display text-2xl md:text-4xl font-bold uppercase"
              style={{ fontFamily: "Montserrat, sans-serif", color: C.ink }}
            >
              Os 4 módulos da mentoria
            </h2>
          </Reveal>

          <div className="max-w-3xl mx-auto space-y-3">
            {MODULES.map((mod, i) => (
              <Reveal key={mod.number} delay={i * 0.08}>
                <details
                  className="group"
                  style={{ backgroundColor: C.white, border: `1px solid ${C.border}` }}
                >
                  <summary
                    className="flex items-center gap-0 cursor-pointer list-none select-none overflow-hidden"
                    style={{ color: C.ink }}
                  >
                    {/* Large number accent */}
                    <div
                      className="flex-shrink-0 w-16 md:w-20 self-stretch flex items-center justify-center font-display font-bold text-3xl md:text-4xl"
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        color: C.white,
                        backgroundColor: i % 2 === 0 ? C.dark : C.gold,
                      }}
                    >
                      {mod.number}
                    </div>

                    {/* Content */}
                    <div className="flex-1 px-6 py-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] mb-1" style={{ color: C.muted }}>
                        Módulo {mod.number}
                      </p>
                      <h3
                        className="font-display font-bold text-sm md:text-base uppercase"
                        style={{ fontFamily: "Montserrat, sans-serif", color: C.ink }}
                      >
                        {mod.title}
                      </h3>
                    </div>

                    <div className="px-5 flex-shrink-0">
                      <ChevronDown
                        className="w-5 h-5 transition-transform group-open:rotate-180"
                        style={{ color: C.muted }}
                      />
                    </div>
                  </summary>

                  <div
                    className="px-6 md:px-8 pb-8 pt-6"
                    style={{ borderTop: `1px solid ${C.border}` }}
                  >
                    <p className="text-sm leading-relaxed mb-5" style={{ color: C.muted }}>
                      {mod.desc}
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                      {mod.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm" style={{ color: C.inkLight }}>
                          <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: C.green }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          BÔNUS
      ══════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: C.dark }}>
        <div className="container mx-auto px-4 md:px-8">
          <Reveal className="text-center mb-16">
            <Label>Bônus Exclusivos</Label>
            <h2
              className="font-display text-2xl md:text-4xl font-bold uppercase text-white"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Você também recebe
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {BONUS.map((b, i) => {
              const Icon = b.icon;
              return (
                <Reveal
                  key={b.title}
                  delay={i * 0.1}
                  className="p-8 md:p-10 space-y-6"
                  style={{ border: `1px solid rgba(201,162,87,0.3)`, backgroundColor: "rgba(255,255,255,0.04)" }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 flex items-center justify-center"
                      style={{ backgroundColor: C.gold }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3
                        className="font-display font-bold text-base uppercase text-white"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {b.title}
                      </h3>
                      <p className="text-xs mt-0.5" style={{ color: C.gold }}>
                        {b.subtitle}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {b.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                        <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: C.gold }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          DEPOIMENTOS
      ══════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: C.white }}>
        <div className="container mx-auto px-4 md:px-8">
          <Reveal className="text-center mb-14">
            <Label>Resultados Reais</Label>
            <h2
              className="font-display text-2xl md:text-4xl font-bold uppercase"
              style={{ fontFamily: "Montserrat, sans-serif", color: C.ink }}
            >
              O que nossas alunas dizem
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { src: imgTestimonial1, name: "Beatriz Francini" },
              { src: imgTestimonial2, name: "Ingrid Cristina" },
              { src: imgTestimonial3, name: "Monique Figueiredo" },
              { src: imgTestimonial4, name: "Aline Araujo" },
            ].map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <img
                  src={t.src}
                  alt={`Depoimento ${t.name}`}
                  className="w-full mix-blend-multiply"
                  loading="lazy"
                />
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-12">
            <button
              onClick={() => scrollTo("pricing")}
              className="inline-flex items-center gap-2.5 px-8 py-4 font-bold text-sm tracking-widest uppercase transition-colors"
              style={{ backgroundColor: C.green, color: C.white }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = C.greenDark)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = C.green)
              }
            >
              Quero ser a próxima
              <ArrowRight className="w-4 h-4" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════
          INVESTIMENTO
      ══════════════════════════════ */}
      <section id="pricing" className="py-24 md:py-32" style={{ backgroundColor: C.cream }}>
        <div className="container mx-auto px-4 md:px-8">
          <Reveal className="text-center mb-14">
            <Label>Investimento</Label>
            <h2
              className="font-display text-2xl md:text-4xl font-bold uppercase"
              style={{ fontFamily: "Montserrat, sans-serif", color: C.ink }}
            >
              O investimento mais importante do seu ano
            </h2>
          </Reveal>

          <div className="max-w-md mx-auto">
            <Reveal>
              <div
                className="overflow-hidden shadow-xl"
                style={{ border: `1px solid ${C.border}` }}
              >
                {/* Gold header */}
                <div
                  className="py-10 px-8 text-center space-y-2"
                  style={{ backgroundColor: C.dark }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: C.gold }}>
                    Acesso completo à Mentoria
                  </p>
                  <div className="flex items-end justify-center gap-1 pt-2">
                    <span className="text-lg font-medium text-white/80">12x</span>
                    <span
                      className="font-display text-6xl font-bold text-white leading-none"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      R$&nbsp;237
                    </span>
                    <span className="text-2xl font-bold text-white/80 pb-1">,87</span>
                  </div>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                    ou <strong className="text-white/70">R$ 2.300,00</strong> à vista
                  </p>
                </div>

                {/* White body */}
                <div className="p-8 space-y-7" style={{ backgroundColor: C.white }}>
                  <div
                    className="pb-6"
                    style={{ borderBottom: `1px solid ${C.border}` }}
                  >
                    <p
                      className="text-xs font-semibold uppercase tracking-[0.15em] mb-4"
                      style={{ color: C.muted }}
                    >
                      Tudo que você recebe
                    </p>
                    <ul className="space-y-3">
                      {INCLUDES.map((item) => (
                        <li key={item.text} className="flex items-start gap-3 text-sm" style={{ color: C.inkLight }}>
                          <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: C.green }} />
                          {item.text}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <a
                      href="https://pay.hotmart.com/Y93975016X?off=22jnl093"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2.5 w-full py-4 font-bold text-sm tracking-widest uppercase transition-colors"
                      style={{ backgroundColor: C.green, color: C.white }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = C.greenDark)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = C.green)
                      }
                    >
                      Quero meu acesso agora
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href="https://pay.hotmart.com/Y93975016X?off=et69m72o"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full py-3 text-xs font-semibold uppercase tracking-wider transition-colors"
                      style={{ border: `1px solid ${C.border}`, color: C.muted }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = C.ink;
                        e.currentTarget.style.color = C.ink;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = C.border;
                        e.currentTarget.style.color = C.muted;
                      }}
                    >
                      Prefiro pagar com Boleto Parcelado
                    </a>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs" style={{ color: C.muted }}>
                    <ShieldCheck className="w-4 h-4" style={{ color: C.green }} />
                    Compra 100% segura — Garantia incondicional de 15 dias
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          GARANTIA
      ══════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: C.white }}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <Reveal className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6 text-center md:text-left">
                <Label>Risco Zero</Label>
                <h2
                  className="font-display text-2xl md:text-3xl font-bold uppercase"
                  style={{ fontFamily: "Montserrat, sans-serif", color: C.ink }}
                >
                  Garantia incondicional de 15 dias
                </h2>
                <p className="text-base leading-relaxed" style={{ color: C.inkLight }}>
                  Confiamos tanto no nosso conteúdo que, se por qualquer motivo você não ficar satisfeita nos primeiros 15 dias, devolvemos 100% do seu investimento. Sem perguntas, sem burocracia.
                </p>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <ShieldCheck className="w-5 h-5" style={{ color: C.green }} />
                  <span className="text-sm font-semibold" style={{ color: C.green }}>
                    Compra 100% segura e protegida
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0 flex justify-center">
                <img
                  src={imgGuarantee}
                  alt="Garantia de 15 dias"
                  className="hidden md:block w-44 mix-blend-multiply"
                  loading="lazy"
                />
                <img
                  src={imgGarantiaMobile}
                  alt="Garantia incondicional de 15 dias"
                  className="block md:hidden w-36 mix-blend-multiply"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          SOBRE NÓS
      ══════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: C.cream }}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* Photo */}
                <div className="relative flex justify-center md:justify-start order-2 md:order-1">
                  <div className="relative">
                    <div
                      className="absolute -bottom-3 -left-3 w-full h-full"
                      style={{ border: `2px solid ${C.gold}` }}
                    />
                    <img
                      src={imgAbout}
                      alt="Ingrid Zarza e Fernanda Bradaschia"
                      className="relative z-10 w-full max-w-sm mix-blend-multiply"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="order-1 md:order-2 space-y-7">
                  <div>
                    <Label>Quem Somos</Label>
                    <h2
                      className="font-display text-2xl md:text-3xl font-bold uppercase text-center md:text-left"
                      style={{ fontFamily: "Montserrat, sans-serif", color: C.ink }}
                    >
                      Ingrid Zarza &{" "}
                      <br className="hidden md:block" />
                      Fernanda Bradaschia
                    </h2>
                  </div>

                  <div className="space-y-4 text-sm leading-relaxed" style={{ color: C.inkLight }}>
                    <p>
                      Somos arquitetas <strong style={{ color: C.ink }}>apaixonadas</strong> por compartilhar conhecimento e transformar a gestão de obras de interiores.
                    </p>
                    <p>
                      Fundamos a <strong style={{ color: C.ink }}>INOVANDO ARQUITETURA</strong>, escritório dedicado ao desenvolvimento e gerenciamento de projetos residenciais e comerciais. Ao longo da nossa trajetória, <strong style={{ color: C.ink }}>já concluímos mais de 250 obras</strong>.
                    </p>
                    <p>
                      Em 2024 criamos a <strong style={{ color: C.ink }}>Mentoria Inovando na Sua Obra</strong> para compartilhar toda essa vivência de forma organizada e acessível. Já são dezenas de alunas impactadas pela nossa metodologia.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-px" style={{ backgroundColor: C.gold }} />
                    <a
                      href="https://www.instagram.com/inovandonasuaobra/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold uppercase tracking-[0.2em] flex items-center gap-2 transition-opacity hover:opacity-70"
                      style={{ color: C.gold }}
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      @inovandonasuaobra
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FAQ
      ══════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: C.white }}>
        <div className="container mx-auto px-4 md:px-8">
          <Reveal className="text-center mb-14">
            <Label>Dúvidas</Label>
            <h2
              className="font-display text-2xl md:text-4xl font-bold uppercase"
              style={{ fontFamily: "Montserrat, sans-serif", color: C.ink }}
            >
              Perguntas Frequentes
            </h2>
          </Reveal>

          <Accordion type="single" collapsible className="max-w-2xl mx-auto space-y-3">
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <AccordionItem
                  value={`faq-${i}`}
                  className="overflow-hidden"
                  style={{
                    backgroundColor: C.cream,
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <AccordionTrigger
                    className="px-6 py-5 text-left text-sm font-semibold hover:no-underline"
                    style={{ color: C.ink }}
                  >
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent
                    className="px-6 pb-6 text-sm leading-relaxed"
                    style={{ color: C.muted }}
                  >
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ══════════════════════════════
          FOOTER
      ══════════════════════════════ */}
      <footer style={{ backgroundColor: C.dark }}>
        <div className="container mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start pb-10" style={{ borderBottom: `1px solid rgba(255,255,255,0.08)` }}>
            <div className="space-y-4">
              <img
                src={imgLogo}
                alt="Inovando na Sua Obra"
                className="h-12 object-contain"
                loading="lazy"
              />
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
                Transformando a gestão de obras de interiores com método, segurança e resultados reais.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-5" style={{ color: C.gold }}>
                Links
              </p>
              {[
                { label: "Investimento", action: () => scrollTo("pricing") },
              ].map((l) => (
                <button
                  key={l.label}
                  onClick={l.action}
                  className="block text-xs transition-opacity hover:opacity-60"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {l.label}
                </button>
              ))}
              {[
                { label: "Quero me inscrever", href: "https://pay.hotmart.com/Y93975016X?off=22jnl093" },
                { label: "Materiais para Obra", href: "/materiais" },
                { label: "Instagram", href: "https://www.instagram.com/inovandonasuaobra/" },
                { label: "Termos de Uso", href: "/termos-de-uso" },
                { label: "Política de Privacidade", href: "/politica-de-privacidade" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block text-xs transition-opacity hover:opacity-60"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {l.label}
                </a>
              ))}
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-5" style={{ color: C.gold }}>
                Contato
              </p>
              <a
                href="https://wa.me/5511955717229"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs transition-opacity hover:opacity-60"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                <Phone className="w-3.5 h-3.5" />
                (11) 5571-7229
              </a>
              <a
                href="mailto:contato@inovandonasuaobra.com.br"
                className="flex items-center gap-2.5 text-xs transition-opacity hover:opacity-60"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                <Mail className="w-3.5 h-3.5" />
                contato@inovandonasuaobra.com.br
              </a>
              <a
                href="https://www.instagram.com/inovandonasuaobra/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs transition-opacity hover:opacity-60"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                <Instagram className="w-3.5 h-3.5" />
                @inovandonasuaobra
              </a>
            </div>
          </div>

          <div className="pt-8 text-center">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
              © {new Date().getFullYear()} Inovando na Sua Obra. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════
          MOBILE STICKY CTA
      ══════════════════════════════ */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${
          showMobileCTA ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          backgroundColor: C.dark,
          borderTop: `1px solid rgba(201,162,87,0.3)`,
          boxShadow: "0 -8px 32px rgba(0,0,0,0.3)",
        }}
      >
        <div className="flex items-center justify-between px-5 py-3.5">
          <div>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              A partir de
            </p>
            <p
              className="font-display text-lg font-bold text-white"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              12× R$ 237<span className="text-sm font-normal text-white/60">,87</span>
            </p>
          </div>
          <button
            onClick={() => scrollTo("pricing")}
            className="px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors"
            style={{ backgroundColor: C.green, color: C.white }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = C.greenDark)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = C.green)
            }
          >
            Garantir Vaga
          </button>
        </div>
      </div>
    </div>
  );
}