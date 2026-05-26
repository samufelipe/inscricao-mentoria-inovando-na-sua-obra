import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Check, X, ShieldCheck, Lock, ArrowRight, Phone, Mail, Instagram,
  ChevronDown, FileText, Clock, Users, MapPin, BookOpen, TrendingUp,
  Layers, MessageSquare, DollarSign, AlertCircle, Star,
  GraduationCap, Briefcase, HardHat, RefreshCw,
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

/* ─── Asset imports ─── */
import imgLogo       from "@/assets/mentoria/logo.png";
import imgHeroPhoto  from "@/assets/mentoria/hero-photo.png";
import imgAbout      from "@/assets/mentoria/about.png";
import imgLogoGarantia from "@/assets/mentoria/logo-garantia.png";
import { VideoTestimonialCard } from "@/components/ui/video-testimonial-card";
import { VideoModal } from "@/components/ui/video-modal";

/* ═══════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════ */
const C = {
  cream:     "#FAF8F4",
  white:     "#FFFFFF",
  ink:       "#1C1C1A",
  inkLight:  "#3A3A38",
  muted:     "#7A7A77",
  border:    "#E8E4DC",
  gold:      "#C9A257",
  goldLight: "#F0E6CC",
  goldDim:   "rgba(201,162,87,0.12)",
  green:     "#2E7D32",
  greenDark: "#256829",
  dark:      "#1A1510",
  darkMid:   "#252018",
  sage:      "#B2BEB5",
};

/* ─── Grid background helper ─── */
const gridBg = (color = "rgba(201,162,87,0.07)", size = "60px 60px") => ({
  backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
  backgroundSize: size,
});

/* ═══════════════════════════════════════
   ANIMATION WRAPPER
   ═══════════════════════════════════════ */
function Reveal({
  children, className = "", delay = 0, style,
}: {
  children: React.ReactNode; className?: string; delay?: number;
  style?: React.CSSProperties; [key: string]: unknown;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={className} style={style}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   SECTION LABEL
   ═══════════════════════════════════════ */
function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  const col = light ? "rgba(201,162,87,0.8)" : C.gold;
  return (
    <div className="flex items-center gap-3 justify-center mb-4">
      <div className="w-8 h-px" style={{ backgroundColor: col }} />
      <span className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: col }}>
        {children}
      </span>
      <div className="w-8 h-px" style={{ backgroundColor: col }} />
    </div>
  );
}

/* ═══════════════════════════════════════
   GOLD HIGHLIGHT WORD
   ═══════════════════════════════════════ */
function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      <span className="absolute inset-0 -skew-x-3"
        style={{ backgroundColor: C.gold, top: "8%", bottom: "8%", left: "-3px", right: "-3px", zIndex: 0 }}
      />
      <span className="relative z-10" style={{ color: C.dark }}>{children}</span>
    </span>
  );
}

/* ═══════════════════════════════════════
   DATA
   ═══════════════════════════════════════ */
const STATS = [
  { value: "+250", label: "Obras entregues" },
  { value: "+100", label: "Alunas transformadas" },
  { value: "15+",  label: "Anos de experiência" },
];

const PROBLEMS = [
  "Aprende errando",
  "Cobra barato por insegurança",
  "Tem retrabalho",
  "Não sabe custo estimado",
  "Pega muitos clientes para compensar",
  "Vive no caos",
  "Improvisa",
  "Demora anos para ganhar experiência",
];

const SOLUTIONS = [
  "Entende a prática da obra",
  "Cobra com mais clareza",
  "Evita retrabalho",
  "Faz projetos executáveis",
  "Amplia serviços",
  "Cresce com mais estratégia",
  "Acelera a valorização profissional",
];

const AUDIENCE = [
  {
    icon: GraduationCap,
    desc: "Acabou de se formar e não sabe nem por onde começar",
  },
  {
    icon: Briefcase,
    desc: "Trabalha para um escritório e quer se diferenciar",
  },
  {
    icon: HardHat,
    desc: "Tem um escritório e já fez algumas obras, mas sente falta de um método",
  },
  {
    icon: Users,
    desc: "Tem uma equipe e já faz algumas obras ao mesmo tempo. Precisa de uma metodologia para ser mais eficiente",
  },
];

const SKILLS = [
  { icon: Layers,       title: "Gestão de Obra",       desc: "Planejamento, cronograma e controle de etapas com precisão do início ao fim." },
  { icon: FileText,     title: "Documentação",          desc: "Contratos, memoriais descritivos e checklists que protegem você e seu cliente." },
  { icon: MessageSquare,title: "Comunicação",           desc: "Como conduzir reuniões, alinhar expectativas e criar uma experiência inesquecível." },
  { icon: DollarSign,   title: "Controle Financeiro",   desc: "Orçamentos, planilhas e como garantir sua margem de lucro em cada projeto." },
  { icon: AlertCircle,  title: "Gestão de Imprevistos", desc: "Como agir com segurança diante de problemas na obra sem perder o cliente." },
  { icon: TrendingUp,   title: "Posicionamento",        desc: "Diferencie-se, cobre o que vale e construa uma carteira sólida de clientes." },
];

const HOW_IT_WORKS = [
  { n: "01", title: "Acesso Imediato",      desc: "Assim que você confirmar o pagamento, recebe o acesso à plataforma Hotmart com todos os 4 módulos disponíveis." },
  { n: "02", title: "Aprenda no Seu Ritmo", desc: "16h de conteúdo gravado + plantões ao vivo. Você assiste quando e onde quiser durante 12 meses de acesso." },
  { n: "03", title: "Aplique no Dia Seguinte", desc: "Cada módulo foi desenhado para aplicação imediata. Você termina uma aula e já consegue usar o que aprendeu na próxima obra." },
];

const MODULES = [
  {
    number: "01", title: "Primeiros Passos",
    desc: "Fundamentos do gerenciamento de interiores: organização do início do projeto, onboarding do cliente e estruturação do escritório para crescer com consistência.",
    items: ["Diagnóstico e alinhamento com o cliente", "Estrutura do contrato de gerenciamento", "Checklist de início de obra", "Organização do escritório e fluxo de trabalho"],
  },
  {
    number: "02", title: "Projeto Executável",
    desc: "Como criar um projeto de interiores que realmente funciona na obra: compatibilização, memoriais e comunicação com fornecedores e equipe.",
    items: ["Memorial descritivo completo", "Compatibilização de projetos", "Seleção e gestão de fornecedores", "Comunicação técnica com pedreiros e instaladores"],
  },
  {
    number: "03", title: "Gerenciamento de Obra",
    desc: "Gestão de cronograma, visitas técnicas, controle de execução e resolução de imprevistos em tempo real com segurança e clareza.",
    items: ["Cronograma detalhado por etapas", "Relatórios de visita técnica", "Controle de qualidade em campo", "Protocolo para imprevistos e retrabalhos"],
  },
  {
    number: "04", title: "Finalização e Fidelização",
    desc: "Entrega impecável, vistoria final, satisfação do cliente e estratégias para transformar cada projeto em indicações e novos contratos.",
    items: ["Protocolo de vistoria e entrega", "Gestão do pós-obra", "Como gerar indicações orgânicas", "Fidelização e recorrência de clientes"],
  },
];

const BONUS = [
  {
    icon: FileText, title: "Pack Completo de Documentos",
    subtitle: "Biblioteca de ferramentas prontas para usar amanhã",
    items: ["Modelo de contrato de gerenciamento", "Planilha de orçamento e controle financeiro", "Checklist completo de visita técnica", "Modelos de e-mail e comunicação profissional"],
  },
  {
    icon: BookOpen, title: "Aulas Bônus Exclusivas",
    subtitle: "Conteúdo extra para acelerar seus resultados",
    items: ["Precificação e como cobrar o que você vale", "Posicionamento digital para arquitetas", "Como construir uma carteira de clientes sólida", "Plantões de dúvidas ao vivo com as mentoras"],
  },
];

const INCLUDES = [
  { icon: Clock,         text: "16h de conteúdo gravado em 4 módulos" },
  { icon: BookOpen,      text: "12 meses de acesso à plataforma" },
  { icon: Users,         text: "1h de mentoria individual com as fundadoras" },
  { icon: MapPin,        text: "Encontro presencial em São Paulo" },
  { icon: FileText,      text: "Materiais, checklists e ferramentas prontas" },
  { icon: MessageSquare, text: "Suporte e grupo exclusivo de networking" },
];

const FAQS = [
  { q: "As aulas são gravadas ou ao vivo?", a: "Todo o conteúdo já está gravado e organizado por temas na plataforma. Assim que você comprar, terá acesso imediato aos 4 módulos. As aulas bônus e os plantões de dúvidas serão ao vivo pelo Zoom, com gravações disponíveis na Hotmart." },
  { q: "Em quanto tempo eu termino a mentoria?", a: "Aproximadamente 3 meses. O conteúdo gravado tem 16h, o equivalente a 1h33 por semana ao longo de 12 semanas." },
  { q: "Por quanto tempo eu tenho acesso ao conteúdo?", a: "1 ano de acesso completo à plataforma e a todos os materiais." },
  { q: "Consigo conciliar a mentoria com meu dia a dia?", a: "Sim. As aulas foram planejadas para se ajustar à rotina de quem trabalha em obra. Conteúdo prático e direto, em módulos concisos, para você aprender no seu ritmo e aplicar no dia seguinte." },
  { q: "Não sou arquiteta formada, posso fazer a mentoria?", a: "A mentoria foi desenhada para arquitetas, designers de interiores e engenheiras que atuam com projetos de interiores. Se você se encaixa nesse perfil, o conteúdo é para você." },
  { q: "Não encontrei a resposta para minha dúvida, como faço?", a: "Entre em contato pelo WhatsApp ou e-mail. Nossa equipe está pronta para te ajudar antes, durante e após a compra." },
];

/* ═══════════════════════════════════════
   DEADLINE — fechamento do carrinho em 12/06/2026
   ═══════════════════════════════════════ */
const DEADLINE = new Date("2026-06-12T23:59:59-03:00");

/* ═══════════════════════════════════════
   COUNTDOWN TIMER
   ═══════════════════════════════════════ */
function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days:    Math.floor(diff / 86_400_000),
      hours:   Math.floor((diff % 86_400_000) / 3_600_000),
      minutes: Math.floor((diff % 3_600_000)  / 60_000),
      seconds: Math.floor((diff % 60_000)     / 1_000),
      expired: diff === 0,
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function CountdownTimer({ label = "Vagas fecham em:", dark = false }: { label?: string; dark?: boolean }) {
  const { days, hours, minutes, seconds, expired } = useCountdown(DEADLINE);
  if (expired) return null;
  const textMain = dark ? C.white : C.ink;
  const textSub  = dark ? "rgba(255,255,255,0.45)" : C.muted;
  const bg       = dark ? "rgba(255,255,255,0.06)" : C.cream;
  const border   = dark ? "rgba(255,255,255,0.1)"  : C.border;
  const pad = (n: number) => String(n).padStart(2, "0");
  const units = [
    { v: pad(days),    l: "dias" },
    { v: pad(hours),   l: "horas" },
    { v: pad(minutes), l: "min" },
    { v: pad(seconds), l: "seg" },
  ];
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: dark ? C.gold : C.gold }}>
        {label}
      </p>
      <div className="flex items-center gap-2">
        {units.map(({ v, l }, i) => (
          <React.Fragment key={l}>
            <div className="flex flex-col items-center gap-0.5">
              <div className="min-w-[2.4rem] px-2 py-1.5 text-center font-black text-lg leading-none"
                style={{ fontFamily: "Montserrat, sans-serif", backgroundColor: bg, border: `1px solid ${border}`, color: textMain }}
              >
                {v}
              </div>
              <span className="text-[9px] uppercase tracking-wider" style={{ color: textSub }}>{l}</span>
            </div>
            {i < 3 && <span className="font-black text-lg mb-3" style={{ color: dark ? C.gold : C.gold }}>:</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════ */
export default function Home() {
  const [stickyNav,    setStickyNav]    = useState(false);
  const [showMobileCTA,setShowMobileCTA] = useState(false);
  const [activeVideo,  setActiveVideo]  = useState<string | null>(null);

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
      "@context": "https://schema.org", "@type": "Product",
      name: "Mentoria Inovando na Sua Obra",
      description: "Mentoria completa de gerenciamento de obras de interiores para arquitetas, designers e engenheiras.",
      brand: { "@type": "Organization", name: "Inovando na Sua Obra" },
      offers: { "@type": "Offer", price: "2300.00", priceCurrency: "BRL", availability: "https://schema.org/InStock", url: "https://www.inovandonasuaobra.com.br/" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "5", reviewCount: "100" },
    };
    const s = document.createElement("script");
    s.type = "application/ld+json"; s.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(s);
    return () => { document.head.removeChild(s); };
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: C.cream, fontFamily: "Inter, sans-serif" }}>

      {/* ══════════════════════════════════════════
          NAV
      ══════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: stickyNav ? "rgba(250,248,244,0.96)" : "transparent",
          backdropFilter: stickyNav ? "blur(14px)" : "none",
          borderBottom: stickyNav ? `1px solid ${C.border}` : "none",
        }}
      >
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="focus:outline-none">
            <img src={imgLogo} alt="Inovando na Sua Obra" className="h-14 object-contain mix-blend-multiply" />
          </button>
          <button onClick={() => scrollTo("pricing")}
            className="hidden md:flex items-center gap-2 px-6 py-2.5 text-xs font-bold tracking-[0.15em] uppercase transition-colors"
            style={{ backgroundColor: C.green, color: C.white }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.greenDark)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.green)}
          >
            Quero me inscrever
          </button>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          URGENCY BAR
      ══════════════════════════════════════════ */}
      <div className="pt-16">
        <div className="w-full py-2.5 px-4 flex items-center justify-center gap-3 flex-wrap text-center"
          style={{ backgroundColor: C.dark, borderBottom: `1px solid rgba(201,162,87,0.2)` }}
        >
          <div className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ backgroundColor: "#FF4444" }} />
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
            Condição exclusiva para participantes da Imersão{" "}
            <span className="hidden sm:inline">|</span>{" "}
            <span style={{ color: C.gold }}>Vagas fecham em 12/06</span>
          </p>
          <span className="hidden md:inline text-white/20">·</span>
          <p className="text-[11px] font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>
            Valor exclusivo nova turma Junho 2026{" "}
            <span className="hidden md:inline">· após o fechamento, o valor volta a <span style={{ color: C.gold }}>R$ 2.300</span></span>
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden"
        style={{ backgroundColor: C.cream, ...gridBg() }}
      >
        {/* Vignette corners */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(250,248,244,0.7) 100%)" }}
        />

        <div className="container mx-auto px-4 md:px-8 py-6 md:py-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">

            {/* Left — copy + form */}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              className="space-y-4"
            >
              {/* Headline */}
              <div className="space-y-3">
                <h1 className="font-display font-black uppercase"
                  style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.5rem, 2.8vw, 2.4rem)", color: C.ink, lineHeight: "1.15" }}
                >
                  Domine a obra de interiores<br />
                  com mais <Highlight>lucro</Highlight>,{" "}
                  organização<br className="hidden sm:block" />
                  {" "}e segurança,<br />
                  do primeiro atendimento{" "}
                  <br className="hidden sm:block" />
                  à entrega final.
                </h1>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: C.inkLight, maxWidth: "42ch" }}>
                  Tenha acesso à experiência prática, técnica e comportamental
                  {" "}que leva anos para ser construída, e aprenda a cobrar
                  {" "}melhor, evitar erros e crescer sem transformar
                  {" "}seu escritório em um caos.
                </p>
              </div>

              {/* Social proof mini */}
              <div className="flex flex-col gap-1">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: C.gold }} />
                  ))}
                </div>
                <span className="text-xs" style={{ color: C.muted }}>+1000 arquitetas impactadas</span>
              </div>

              {/* Hero CTAs */}
              <div className="shadow-xl overflow-hidden"
                style={{ border: `1px solid ${C.border}` }}
              >
                <div className="px-5 py-3 flex items-center"
                  style={{ backgroundColor: C.dark }}
                >
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-white">
                      Garanta sua vaga agora
                    </p>
                    <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                      Valor exclusivo nova turma Junho 2026
                    </p>
                  </div>
                </div>
                <div className="p-4 md:p-5 space-y-3" style={{ backgroundColor: C.white }}>
                  <div className="flex flex-col gap-2.5">
                    <button
                      onClick={() => scrollTo("pricing")}
                      className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 font-bold text-sm tracking-widest uppercase transition-all hover:gap-4 cursor-pointer"
                      style={{ backgroundColor: C.green, color: C.white }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.greenDark)}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.green)}
                    >
                      Quero meu acesso agora <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="flex items-center justify-center gap-1.5 text-xs" style={{ color: C.muted }}>
                    <Lock className="w-3.5 h-3.5" /> Ambiente 100% seguro
                  </p>
                  <CountdownTimer label="Vagas fecham em:" />
                </div>
              </div>
            </motion.div>

            {/* Right — photo editorial (hidden on mobile) */}
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
              className="relative hidden lg:flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Gold accent frame */}
                <div className="absolute -top-4 -right-4 w-full h-full"
                  style={{ border: `2px solid ${C.gold}`, zIndex: 0 }}
                />
                {/* Secondary frame */}
                <div className="absolute -bottom-4 -left-4 w-24 h-24"
                  style={{ border: `2px solid ${C.gold}`, opacity: 0.3, zIndex: 0 }}
                />
                <img src={imgAbout}
                  alt="Ingrid Zarza e Fernanda Bradaschia — Mentoria Inovando na Sua Obra"
                  className="relative z-10 max-w-full h-auto mix-blend-multiply"
                  style={{ maxHeight: "480px", objectFit: "cover" }}
                  loading="eager"
                />
                {/* Floating stat card */}
                <div className="absolute -bottom-6 -left-6 z-20 px-5 py-4 shadow-xl"
                  style={{ backgroundColor: C.dark }}
                >
                  <p className="font-display font-black text-2xl" style={{ fontFamily: "Montserrat, sans-serif", color: C.gold }}>
                    +250
                  </p>
                  <p className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Obras entregues
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-5 h-5" style={{ color: C.muted }} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          DEPOIMENTOS
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: C.white }}>
        <div className="container mx-auto px-4 md:px-8">
          <Reveal className="text-center mb-16">
            <Label>Resultados Reais</Label>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase leading-[1.0]"
              style={{ fontFamily: "Montserrat, sans-serif", color: C.ink }}
            >
              O que nossas<br className="hidden md:block" /> alunas dizem
            </h2>
          </Reveal>

          {/* Video testimonials — carrossel mobile, grid desktop */}
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none px-4 sm:px-0 pb-2 sm:pb-0 -mx-4 sm:mx-auto scrollbar-hide">
            {[
              { name: "Beatriz Francini", thumbnail: "/thumbnails/capa-beatriz.png",  video: "/videos/video-beatriz.mp4" },
              { name: "Laura Almeida",    thumbnail: "/thumbnails/capa-laura.png",     video: "/videos/video-laura.mp4"  },
              { name: "Ligia",            thumbnail: "/thumbnails/capa-ligia.png",     video: "/videos/video-ligia.mp4"  },
              { name: "Luísa",            thumbnail: "/thumbnails/capa-luisa.png",     video: "/videos/video-luisa.mp4"  },
            ].map((t) => (
              <div key={t.name} className="snap-center flex-shrink-0 w-[72vw] sm:w-auto">
                <VideoTestimonialCard
                  name={t.name}
                  thumbnailSrc={t.thumbnail}
                  onClick={() => setActiveVideo(t.video)}
                />
              </div>
            ))}
          </div>

          <VideoModal videoSrc={activeVideo} onClose={() => setActiveVideo(null)} />

          <Reveal className="text-center mt-14">
            <button onClick={() => scrollTo("pricing")}
              className="inline-flex items-center gap-2.5 px-8 py-4 font-bold text-sm tracking-widest uppercase transition-all hover:gap-4"
              style={{ backgroundColor: C.green, color: C.white }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.greenDark)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.green)}
            >
              Quero ser a próxima
              <ArrowRight className="w-4 h-4" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HABILIDADES — 2×2 GRID
      ══════════════════════════════════════════ */}
      <section className="py-16 md:py-24" style={{ backgroundColor: C.cream }}>
        <div className="container mx-auto px-4 md:px-8">
          <Reveal className="text-center mb-3">
            <Label>Habilidades</Label>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase leading-[1.0] mt-2"
              style={{ fontFamily: "Montserrat, sans-serif", color: C.ink }}
            >
              O que você vai dominar
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="text-center mb-10 max-w-xl mx-auto space-y-2">
            <p className="font-semibold text-base md:text-lg" style={{ color: C.inkLight }}>
              A faculdade ensina teoria. O mercado exige muito mais.
            </p>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: C.muted }}>
              Você vai aprender o que a graduação não ensina: como conduzir uma obra do início ao fim, se posicionar com autoridade, lidar com clientes e imprevistos, e transformar seu conhecimento em um negócio lucrativo.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-4">

            {/* Card 01 — Prática Técnica (dark) */}
            <Reveal delay={0}
              className="relative overflow-hidden flex flex-col p-6 md:p-8"
              style={{ backgroundColor: C.dark }}
            >
              <div className="absolute bottom-0 right-0 font-display font-black select-none pointer-events-none"
                style={{ fontFamily: "Montserrat, sans-serif", fontSize: "9rem", color: C.gold, opacity: 0.05, lineHeight: 1 }}
              >
                01
              </div>
              <div className="absolute inset-0 opacity-25" style={gridBg("rgba(201,162,87,0.15)", "40px 40px")} />
              <div className="relative z-10 flex flex-col gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: C.gold }}>01</span>
                  <div className="w-7 h-px mt-2 mb-3" style={{ backgroundColor: C.gold }} />
                  <h3 className="font-display font-black text-lg md:text-xl uppercase text-white leading-tight"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Prática Técnica
                  </h3>
                </div>
                <ul className="space-y-2">
                  {["Passo a passo da obra", "Leitura prática da execução", "Compatibilização", "Todas as etapas da obra", "Cronograma", "Custo estimado"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm md:text-base" style={{ color: "rgba(255,255,255,0.65)" }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: C.gold }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm italic leading-relaxed border-t pt-3" style={{ color: "rgba(255,255,255,0.4)", borderColor: "rgba(201,162,87,0.2)" }}>
                  "Pare de projetar sem entender como a obra realmente funciona."
                </p>
              </div>
            </Reveal>

            {/* Card 02 — Comunicação e Posicionamento (white) */}
            <Reveal delay={0.1}
              className="relative overflow-hidden flex flex-col p-6 md:p-8"
              style={{ backgroundColor: C.white, border: `1px solid ${C.border}` }}
            >
              <div className="absolute bottom-0 right-0 font-display font-black select-none pointer-events-none"
                style={{ fontFamily: "Montserrat, sans-serif", fontSize: "9rem", color: C.gold, opacity: 0.04, lineHeight: 1 }}
              >
                02
              </div>
              <div className="relative z-10 flex flex-col gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: C.gold }}>02</span>
                  <div className="w-7 h-px mt-2 mb-3" style={{ backgroundColor: C.gold }} />
                  <h3 className="font-display font-black text-lg md:text-xl uppercase leading-tight"
                    style={{ fontFamily: "Montserrat, sans-serif", color: C.ink }}
                  >
                    Comunicação e Posicionamento
                  </h3>
                </div>
                <ul className="space-y-2">
                  {["Apresentação de projeto", "Condução do cliente", "Alinhamento", "Limites", "Comunicação com fornecedor", "Liderança"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm md:text-base" style={{ color: C.muted }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: C.gold }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm italic leading-relaxed border-t pt-3" style={{ color: C.muted, borderColor: C.border }}>
                  "A forma como você se comunica define o quanto seu trabalho é valorizado."
                </p>
              </div>
            </Reveal>

            {/* Card 03 — Mentalidade (white) */}
            <Reveal delay={0.2}
              className="relative overflow-hidden flex flex-col p-6 md:p-8"
              style={{ backgroundColor: C.white, border: `1px solid ${C.border}` }}
            >
              <div className="absolute bottom-0 right-0 font-display font-black select-none pointer-events-none"
                style={{ fontFamily: "Montserrat, sans-serif", fontSize: "9rem", color: C.gold, opacity: 0.04, lineHeight: 1 }}
              >
                03
              </div>
              <div className="relative z-10 flex flex-col gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: C.gold }}>03</span>
                  <div className="w-7 h-px mt-2 mb-3" style={{ backgroundColor: C.gold }} />
                  <h3 className="font-display font-black text-lg md:text-xl uppercase leading-tight"
                    style={{ fontFamily: "Montserrat, sans-serif", color: C.ink }}
                  >
                    Mentalidade
                  </h3>
                </div>
                <ul className="space-y-2">
                  {["Lidar com imprevistos", "Responsabilidade", "Emocional do cliente", "Tomada de decisão", "Maturidade profissional"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm md:text-base" style={{ color: C.muted }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: C.gold }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm italic leading-relaxed border-t pt-3" style={{ color: C.muted, borderColor: C.border }}>
                  "Arquitetas inseguras improvisam. Arquitetas preparadas conduzem."
                </p>
              </div>
            </Reveal>

            {/* Card 04 — Visão Financeira (goldLight) */}
            <Reveal delay={0.3}
              className="relative overflow-hidden flex flex-col p-6 md:p-8"
              style={{ backgroundColor: C.goldLight, border: `1px solid ${C.border}` }}
            >
              <div className="absolute bottom-0 right-0 font-display font-black select-none pointer-events-none"
                style={{ fontFamily: "Montserrat, sans-serif", fontSize: "9rem", color: C.gold, opacity: 0.08, lineHeight: 1 }}
              >
                04
              </div>
              <div className="relative z-10 flex flex-col gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: C.gold }}>04</span>
                  <div className="w-7 h-px mt-2 mb-3" style={{ backgroundColor: C.gold }} />
                  <h3 className="font-display font-black text-lg md:text-xl uppercase leading-tight"
                    style={{ fontFamily: "Montserrat, sans-serif", color: C.ink }}
                  >
                    Visão Financeira
                  </h3>
                </div>
                <ul className="space-y-2">
                  {["Precificação", "Custo estimado", "Margem", "Percepção de valor", "Cobrar melhor"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm md:text-base" style={{ color: C.inkLight }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: C.gold }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm italic leading-relaxed border-t pt-3" style={{ color: C.inkLight, borderColor: "rgba(201,162,87,0.3)" }}>
                  "A insegurança faz arquitetas cobrarem barato."
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROBLEMA / SOLUÇÃO
      ══════════════════════════════════════════ */}
      <section className="overflow-hidden" style={{ backgroundColor: C.ink }}>
        <div className="grid lg:grid-cols-2">

          {/* Left — O problema */}
          <div className="px-8 md:px-16 py-20 md:py-28 relative overflow-hidden"
            style={{ backgroundColor: "#111110" }}
          >
            <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: "#FF4444", opacity: 0.6 }} />
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.25em] mb-8" style={{ color: "#FF6B6B" }}>
                Sem a mentoria
              </p>
              <ul className="space-y-4">
                {PROBLEMS.map((p, i) => (
                  <motion.li key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-4 text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center mt-0.5"
                      style={{ backgroundColor: "rgba(255,68,68,0.15)" }}
                    >
                      <X className="w-3 h-3" style={{ color: "#FF6B6B" }} />
                    </div>
                    {p}
                  </motion.li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Right — A solução */}
          <div className="px-8 md:px-16 py-20 md:py-28 relative overflow-hidden"
            style={{ backgroundColor: C.darkMid }}
          >
            <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: C.gold }} />
            {/* Ghost text */}
            <div className="absolute -right-8 -bottom-8 font-display font-black leading-none select-none pointer-events-none"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "12rem", color: C.gold, opacity: 0.04 }}
            >
              SIM
            </div>
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.25em] mb-8" style={{ color: C.gold }}>
                Com a mentoria
              </p>
              <ul className="space-y-4">
                {SOLUTIONS.map((s, i) => (
                  <motion.li key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-4 text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center mt-0.5"
                      style={{ backgroundColor: "rgba(201,162,87,0.2)" }}
                    >
                      <Check className="w-3 h-3" style={{ color: C.gold }} />
                    </div>
                    {s}
                  </motion.li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PARA QUEM É
      ══════════════════════════════════════════ */}
      <section className="py-16 md:py-24" style={{ backgroundColor: C.white }}>
        <div className="container mx-auto px-4 md:px-8">
          <Reveal className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
            <Label>Para Quem É</Label>
            <h2 className="font-display font-black text-2xl md:text-4xl leading-snug mt-3"
              style={{ fontFamily: "Montserrat, sans-serif", color: C.ink }}
            >
              Para arquitetas, designer de interiores, engenheiras que queiram aprender sobre obra de interiores
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {AUDIENCE.map((a, i) => {
              const Icon = a.icon;
              return (
                <Reveal key={i} delay={i * 0.1}
                  className="group cursor-default transition-transform duration-300 hover:-translate-y-1 flex flex-col items-center text-center"
                  style={{ backgroundColor: C.cream, border: `1px solid ${C.border}` }}
                >
                  <div className="p-6 md:p-8 flex flex-col items-center gap-5">
                    <Icon className="w-10 h-10 md:w-12 md:h-12" style={{ color: C.ink }} strokeWidth={1.25} />
                    <div className="w-6 h-px" style={{ backgroundColor: C.gold }} />
                    <p className="text-sm md:text-base font-semibold leading-snug" style={{ color: C.ink }}>
                      {a.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          COMO FUNCIONA — NÚMEROS MASSIVOS
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: C.white }}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left sticky title */}
            <Reveal className="lg:col-span-4 lg:sticky lg:top-32">
              <Label>Como Funciona</Label>
              <h2 className="font-display font-black text-4xl md:text-6xl uppercase leading-[0.95] mt-4"
                style={{ fontFamily: "Montserrat, sans-serif", color: C.ink }}
              >
                O que está<br />incluído
              </h2>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {STATS.map((s) => (
                  <div key={s.label} className="text-center p-4" style={{ backgroundColor: C.cream }}>
                    <p className="font-display font-black text-xl" style={{ fontFamily: "Montserrat, sans-serif", color: C.gold }}>
                      {s.value}
                    </p>
                    <p className="text-[9px] uppercase tracking-wider mt-1" style={{ color: C.muted }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right steps with massive numbers */}
            <div className="lg:col-span-8 space-y-1">
              {HOW_IT_WORKS.map((step, i) => (
                <Reveal key={step.n} delay={i * 0.1}>
                  <div className="group flex items-start gap-6 py-8 border-b transition-colors duration-300 hover:bg-[#FAF8F4] px-4 -mx-4"
                    style={{ borderColor: C.border }}
                  >
                    <span className="font-display font-black leading-none flex-shrink-0 transition-all duration-300 group-hover:opacity-100"
                      style={{ fontFamily: "Montserrat, sans-serif", fontSize: "5rem", color: C.gold, opacity: 0.18, lineHeight: 0.85 }}
                    >
                      {step.n}
                    </span>
                    <div className="space-y-2 pt-1">
                      <h3 className="font-display font-black text-lg uppercase"
                        style={{ fontFamily: "Montserrat, sans-serif", color: C.ink }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}

              {/* Includes grid */}
              <Reveal delay={0.3}>
                <div className="pt-8 grid sm:grid-cols-2 gap-3">
                  {INCLUDES.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.text} className="flex items-center gap-3 px-4 py-3"
                        style={{ backgroundColor: C.cream, border: `1px solid ${C.border}` }}
                      >
                        <div className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: C.dark }}
                        >
                          <Icon className="w-4 h-4" style={{ color: C.gold }} />
                        </div>
                        <p className="text-xs leading-relaxed font-medium" style={{ color: C.inkLight }}>
                          {item.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </Reveal>

              <Reveal className="pt-8" delay={0.4}>
                <button
                  onClick={() => scrollTo("pricing")}
                  className="inline-flex items-center gap-2.5 px-8 py-4 font-bold text-sm tracking-widest uppercase transition-all hover:gap-4 cursor-pointer"
                  style={{ backgroundColor: C.green, color: C.white }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.greenDark)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.green)}
                >
                  Quero meu acesso
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MÓDULOS
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: C.cream }}>
        <div className="container mx-auto px-4 md:px-8">
          <Reveal className="text-center mb-16">
            <Label>Conteúdo</Label>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase leading-[1.0]"
              style={{ fontFamily: "Montserrat, sans-serif", color: C.ink }}
            >
              Os 4 módulos<br className="hidden md:block" /> da mentoria
            </h2>
          </Reveal>

          <div className="max-w-3xl mx-auto space-y-2">
            {MODULES.map((mod, i) => (
              <Reveal key={mod.number} delay={i * 0.08}>
                <details className="group" style={{ backgroundColor: C.white, border: `1px solid ${C.border}` }}>
                  <summary className="flex items-center gap-0 cursor-pointer list-none select-none overflow-hidden"
                    style={{ color: C.ink }}
                  >
                    <div className="flex-shrink-0 w-16 md:w-20 self-stretch flex items-center justify-center font-display font-black text-3xl md:text-4xl"
                      style={{ fontFamily: "Montserrat, sans-serif", color: C.white, backgroundColor: i % 2 === 0 ? C.dark : C.gold }}
                    >
                      {mod.number}
                    </div>
                    <div className="flex-1 px-6 py-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1" style={{ color: C.muted }}>
                        Módulo {mod.number}
                      </p>
                      <h3 className="font-display font-black text-sm md:text-base uppercase"
                        style={{ fontFamily: "Montserrat, sans-serif", color: C.ink }}
                      >
                        {mod.title}
                      </h3>
                    </div>
                    <div className="px-5 flex-shrink-0">
                      <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" style={{ color: C.muted }} />
                    </div>
                  </summary>
                  <div className="px-6 md:px-8 pb-8 pt-6" style={{ borderTop: `1px solid ${C.border}` }}>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: C.muted }}>{mod.desc}</p>
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

      {/* ══════════════════════════════════════════
          BÔNUS
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative overflow-hidden"
        style={{ backgroundColor: C.dark, ...gridBg("rgba(201,162,87,0.05)", "50px 50px") }}
      >
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <Reveal className="text-center mb-16">
            <Label light>Bônus Exclusivos</Label>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase leading-[1.0] text-white"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Você também<br className="hidden md:block" /> recebe
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {BONUS.map((b, i) => {
              const Icon = b.icon;
              return (
                <Reveal key={b.title} delay={i * 0.12}
                  className="p-8 md:p-10 space-y-6 relative overflow-hidden"
                  style={{ border: `1px solid rgba(201,162,87,0.25)`, backgroundColor: "rgba(255,255,255,0.03)" }}
                >
                  <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: C.gold }} />
                  <div className="flex items-center gap-4 pl-2">
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: C.gold }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-base uppercase text-white"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {b.title}
                      </h3>
                      <p className="text-xs mt-0.5" style={{ color: C.gold }}>{b.subtitle}</p>
                    </div>
                  </div>
                  <ul className="space-y-3 pl-2">
                    {b.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
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

      {/* ══════════════════════════════════════════
          SOBRE NÓS
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: C.cream }}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Photo */}
                <div className="relative flex justify-center md:justify-start order-2 md:order-1">
                  <div className="relative">
                    <div className="absolute -bottom-4 -left-4 w-full h-full"
                      style={{ border: `2px solid ${C.gold}`, zIndex: 0 }}
                    />
                    <img src={imgHeroPhoto} alt="Ingrid Zarza e Fernanda Bradaschia"
                      className="relative z-10 w-full max-w-sm mix-blend-multiply" loading="lazy" />
                    {/* Stat badge */}
                    <div className="absolute -top-5 -right-5 z-20 px-4 py-3 shadow-lg"
                      style={{ backgroundColor: C.gold }}
                    >
                      <p className="font-display font-black text-xl text-white" style={{ fontFamily: "Montserrat, sans-serif" }}>
                        +250
                      </p>
                      <p className="text-[9px] uppercase tracking-widest text-white/80">obras</p>
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="order-1 md:order-2 space-y-7">
                  <div>
                    <Label>Quem Somos</Label>
                    <h2 className="font-display font-black text-2xl md:text-3xl uppercase text-center md:text-left leading-tight"
                      style={{ fontFamily: "Montserrat, sans-serif", color: C.ink }}
                    >
                      Ingrid Zarza &{" "}
                      <br className="hidden md:block" />
                      Fernanda Bradaschia
                    </h2>
                  </div>
                  <div className="space-y-4 text-sm leading-relaxed" style={{ color: C.inkLight }}>
                    <p>
                      Somos arquitetas <strong style={{ color: C.ink }}>apaixonadas</strong> por compartilhar conhecimento e transformar a gestão de obras de interiores no Brasil.
                    </p>
                    <p>
                      Fundamos a <strong style={{ color: C.ink }}>INOVANDO ARQUITETURA</strong>, escritório especializado em desenvolvimento e gerenciamento de projetos residenciais e comerciais. Ao longo da nossa trajetória, <strong style={{ color: C.ink }}>já concluímos mais de 250 obras</strong>.
                    </p>
                    <p>
                      Em 2024 criamos a <strong style={{ color: C.ink }}>Mentoria Inovando na Sua Obra</strong> para compartilhar toda essa vivência de forma organizada, prática e acessível. Já são dezenas de alunas impactadas pela nossa metodologia.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-px" style={{ backgroundColor: C.gold }} />
                    <a href="https://www.instagram.com/inovandonasuaobra/"
                      target="_blank" rel="noopener noreferrer"
                      className="text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 transition-opacity hover:opacity-70"
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

      {/* ══════════════════════════════════════════
          INVESTIMENTO
      ══════════════════════════════════════════ */}
      <section id="pricing" className="py-16 md:py-24" style={{ backgroundColor: C.ink, ...gridBg("rgba(201,162,87,0.05)", "50px 50px") }}>
        <div className="container mx-auto px-4 md:px-8">
          <Reveal>
            <div className="flex flex-col lg:flex-row overflow-hidden shadow-2xl" style={{ borderRadius: "24px" }}>

              {/* LEFT — headline + urgência + CTA principal */}
              <div className="flex-1 flex flex-col justify-between p-8 md:p-12 lg:p-14 gap-8"
                style={{ backgroundColor: C.dark, backgroundImage: gridBg("rgba(201,162,87,0.06)", "40px 40px").backgroundImage }}
              >
                <div className="space-y-5">
                  <Label light>Investimento</Label>
                  <h2 className="font-display font-black uppercase leading-[1.05] text-white"
                    style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                  >
                    Condição exclusiva.<br />
                    Nova turma<br />
                    Junho 2026.
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", maxWidth: "34ch" }}>
                    Após o fechamento, o valor volta a R$ 2.300.
                  </p>
                  <div className="px-4 py-3 text-sm font-semibold"
                    style={{ backgroundColor: "rgba(201,162,87,0.12)", color: C.gold, border: `1px solid rgba(201,162,87,0.25)` }}
                  >
                    Uma obra com gerenciamento cobrado paga a mentoria inteira.
                  </div>
                  <CountdownTimer label="Vagas fecham em:" dark />
                </div>

                <div className="space-y-3">
                  <a href="https://pay.hotmart.com/Y93975016X?off=22jnl093"
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 w-full py-4 font-bold text-sm tracking-widest uppercase transition-all hover:gap-4"
                    style={{ backgroundColor: C.green, color: C.white }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.greenDark)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.green)}
                  >
                    Quero meu acesso agora
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <div className="flex items-center justify-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                    <ShieldCheck className="w-3.5 h-3.5" style={{ color: C.green }} />
                    Compra segura · Garantia incondicional de 15 dias
                  </div>
                </div>
              </div>

              {/* RIGHT — preço + features + boleto */}
              <div className="flex-1 lg:max-w-[440px] flex flex-col p-8 md:p-12 lg:p-14"
                style={{ backgroundColor: C.white, borderLeft: `1px solid ${C.border}` }}
              >
                {/* Badge + Preço */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 self-start"
                    style={{ backgroundColor: "rgba(255,68,68,0.08)", border: "1px solid rgba(255,68,68,0.22)" }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#FF4444" }} />
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#FF6B6B" }}>
                      Valor exclusivo nova turma
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: C.muted }}>
                      Seu investimento
                    </p>
                    <p className="font-black leading-none"
                      style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2.4rem, 5vw, 3.2rem)", color: C.ink }}
                    >
                      R$ 1.997
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-7 h-px" style={{ backgroundColor: C.border }} />

                {/* Features */}
                <div className="flex-1 space-y-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.muted }}>
                    Tudo que você recebe
                  </p>
                  <ul className="space-y-3.5">
                    {INCLUDES.map((item) => (
                      <li key={item.text} className="flex items-start gap-3 text-sm leading-snug" style={{ color: C.inkLight }}>
                        <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: C.green }} />
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Divider + Boleto */}
                <div className="mt-7 pt-6 space-y-3" style={{ borderTop: `1px solid ${C.border}` }}>
                  <a href="https://pay.hotmart.com/Y93975016X?off=et69m72o"
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-3 text-xs font-semibold uppercase tracking-wider transition-colors"
                    style={{ border: `1px solid ${C.border}`, color: C.muted }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.ink; e.currentTarget.style.color = C.ink; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}
                  >
                    Prefiro pagar com Boleto Parcelado
                  </a>
                </div>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          GARANTIA
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: C.white }}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <Reveal className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6 text-center md:text-left">
                <Label>Risco Zero</Label>
                <h2 className="font-display font-black text-2xl md:text-4xl uppercase leading-tight"
                  style={{ fontFamily: "Montserrat, sans-serif", color: C.ink }}
                >
                  Garantia incondicional<br /> de 15 dias
                </h2>
                <p className="text-base leading-relaxed" style={{ color: C.inkLight }}>
                  Confiamos tanto no nosso conteúdo que, se por qualquer motivo você não ficar satisfeita nos primeiros 15 dias, devolvemos 100% do seu investimento. Sem perguntas, sem burocracia.
                </p>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <ShieldCheck className="w-5 h-5" style={{ color: C.green }} />
                  <span className="text-sm font-bold" style={{ color: C.green }}>
                    Compra 100% segura e protegida
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0 flex justify-center">
                <img src={imgLogoGarantia} alt="Garantia incondicional de 15 dias"
                  className="w-48 md:w-64 object-contain" loading="lazy" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: C.cream }}>
        <div className="container mx-auto px-4 md:px-8">
          <Reveal className="text-center mb-14">
            <Label>Dúvidas</Label>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase leading-[1.0]"
              style={{ fontFamily: "Montserrat, sans-serif", color: C.ink }}
            >
              Perguntas<br className="hidden md:block" /> Frequentes
            </h2>
          </Reveal>

          <Accordion type="single" collapsible className="max-w-2xl mx-auto space-y-2">
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <AccordionItem value={`faq-${i}`} className="overflow-hidden"
                  style={{ backgroundColor: C.white, border: `1px solid ${C.border}` }}
                >
                  <AccordionTrigger className="px-6 py-5 text-left text-sm font-bold hover:no-underline"
                    style={{ color: C.ink }}
                  >
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 text-sm leading-relaxed"
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

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer style={{ backgroundColor: C.dark }}>
        <div className="container mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start pb-10"
            style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}
          >
            <div className="space-y-4">
              <img src={imgLogo} alt="Inovando na Sua Obra"
                className="h-12 object-contain" loading="lazy" />
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.3)" }}>
                Transformando a gestão de obras de interiores com método, segurança e resultados reais.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-5" style={{ color: C.gold }}>
                Links
              </p>
              <button onClick={() => scrollTo("pricing")}
                className="block text-xs transition-opacity hover:opacity-70"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Investimento
              </button>
              {[
                { label: "Quero me inscrever", href: "https://pay.hotmart.com/Y93975016X?off=22jnl093" },
                { label: "Materiais para Obra", href: "/materiais" },
                { label: "Instagram", href: "https://www.instagram.com/inovandonasuaobra/" },
                { label: "Termos de Uso", href: "/termos-de-uso" },
                { label: "Política de Privacidade", href: "/politica-de-privacidade" },
              ].map((l) => (
                <a key={l.label} href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block text-xs transition-opacity hover:opacity-70"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {l.label}
                </a>
              ))}
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-5" style={{ color: C.gold }}>
                Contato
              </p>
              <a href="https://wa.me/5511955717229" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs transition-opacity hover:opacity-70"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <Phone className="w-3.5 h-3.5" /> (11) 5571-7229
              </a>
              <a href="mailto:contato@inovandonasuaobra.com.br"
                className="flex items-center gap-2.5 text-xs transition-opacity hover:opacity-70"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <Mail className="w-3.5 h-3.5" /> contato@inovandonasuaobra.com.br
              </a>
              <a href="https://www.instagram.com/inovandonasuaobra/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs transition-opacity hover:opacity-70"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <Instagram className="w-3.5 h-3.5" /> @inovandonasuaobra
              </a>
            </div>
          </div>

          <div className="pt-8 text-center">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.18)" }}>
              © {new Date().getFullYear()} Inovando na Sua Obra. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════════════════
          MOBILE STICKY CTA
      ══════════════════════════════════════════ */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${showMobileCTA ? "translate-y-0" : "translate-y-full"}`}
        style={{ backgroundColor: C.dark, borderTop: `1px solid rgba(201,162,87,0.25)`, boxShadow: "0 -8px 32px rgba(0,0,0,0.3)" }}
      >
        <div className="flex items-center justify-between px-5 py-3.5">
          <div>
            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>Turma Junho 2026</p>
            <p className="font-display font-black text-lg text-white" style={{ fontFamily: "Montserrat, sans-serif" }}>
              R$ 1.997
            </p>
          </div>
          <button
            onClick={() => scrollTo("pricing")}
            className="px-6 py-3 text-xs font-black uppercase tracking-widest transition-colors"
            style={{ backgroundColor: C.green, color: C.white }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.greenDark)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.green)}
          >
            Garantir Vaga
          </button>
        </div>
      </div>
    </div>
  );
}