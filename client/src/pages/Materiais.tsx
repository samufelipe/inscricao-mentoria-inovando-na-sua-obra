import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, BookOpen, ClipboardCheck, Package, Star, Award, Users, Building, ArrowRight, ShieldCheck, Instagram, Mail, Phone } from "lucide-react";
import inovandoObraImg from "@/assets/alem-da-tendencia/inovando-obra-new.png";
import logoImg from "@/assets/mentoria/logo.png";

/* ─── Fade-in wrapper ─── */
function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
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
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
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

import React from "react";

/* ─── Product data ─── */
const PRODUCTS = {
  checklists: {
    name: "Checklists Inovando na Sua Obra",
    price: 67,
    priceDisplay: "R$ 67,00",
    description: "Organize cada etapa da sua obra com checklists práticos e testados em mais de 250 projetos reais.",
    icon: ClipboardCheck,
    color: "#C9A84C",
    benefits: [
      "Checklist completo de pré-obra",
      "Checklist de acompanhamento de obra",
      "Checklist de finalização e entrega",
      "Modelo de vistoria técnica",
      "Lista de conferência de materiais",
      "Controle de cronograma simplificado",
    ],
    painPoints: [
      "Esquece etapas importantes durante a obra",
      "Não tem um processo padronizado",
      "Perde tempo refazendo tarefas",
    ],
    hotmartUrl: "https://pay.hotmart.com/F99460291O?checkoutMode=10",
  },
  ebook: {
    name: "E-book Domine a Sua Obra",
    price: 97,
    priceDisplay: "R$ 97,00",
    description: "O guia definitivo para arquitetas e designers que querem dominar a gestão de obras do início ao fim.",
    icon: BookOpen,
    color: "#C9A84C",
    benefits: [
      "Gestão completa do canteiro de obras",
      "Técnicas de negociação com fornecedores",
      "Como evitar retrabalho e desperdícios",
      "Comunicação eficiente com o cliente",
      "Cronograma realista e executável",
      "Precificação correta dos serviços",
    ],
    painPoints: [
      "Sente insegurança ao gerenciar obras",
      "Não sabe precificar corretamente",
      "Tem dificuldade com fornecedores",
    ],
    hotmartUrl: "https://pay.hotmart.com/F99460291O?checkoutMode=10&bid=1774368616199",
  },
};

const COMBO_PRICE = 147.60;
const COMBO_SAVINGS = 16.40;
const COMBO_URL = "https://pay.hotmart.com/F99460291O?checkoutMode=10&bid=1774368616199";

const SOCIAL_PROOF = [
  { value: 250, suffix: "+", label: "Obras gerenciadas", icon: Building },
  { value: 100, suffix: "+", label: "Alunas transformadas", icon: Users },
  { value: 12, suffix: "", label: "Anos de experiência", icon: Award },
  { value: 0, suffix: "", label: "Criadoras da Mentoria Inovando na Sua Obra", icon: Star, isText: true },
];

const TARGET_AUDIENCE = [
  "Arquitetas que gerenciam obras e querem mais organização",
  "Designers de interiores que acompanham execução de projetos",
  "Profissionais que estão começando a atuar em obra",
  "Quem quer parar de perder dinheiro com retrabalho",
  "Profissionais que querem processos claros e replicáveis",
  "Quem busca mais segurança e confiança na gestão de obras",
];

const FAQ_ITEMS = [
  {
    q: "Os materiais são digitais?",
    a: "Sim, tanto os Checklists quanto o E-book são materiais 100% digitais. Após a compra, você recebe acesso imediato pela plataforma Hotmart.",
  },
  {
    q: "Como vou receber o material?",
    a: "Após a confirmação do pagamento, você recebe automaticamente um e-mail com o acesso ao conteúdo pela plataforma Hotmart. Você pode acessar de qualquer dispositivo.",
  },
  {
    q: "O conteúdo serve para quem está começando?",
    a: "Com certeza. Os materiais foram criados pensando tanto em quem está iniciando quanto em quem já atua, mas precisa organizar melhor seus processos.",
  },
  {
    q: "Posso usar os checklists em todos os meus projetos?",
    a: "Sim. Os checklists são modelos adaptáveis que você pode utilizar em quantos projetos quiser, personalizando conforme a necessidade de cada obra.",
  },
  {
    q: "Tem garantia?",
    a: "Sim. Você tem 7 dias de garantia incondicional. Se por qualquer motivo não ficar satisfeita, basta solicitar o reembolso dentro do prazo.",
  },
  {
    q: "Qual a diferença entre o Checklist e o E-book?",
    a: "Os Checklists são ferramentas práticas de execução, listas que você usa no dia a dia da obra. O E-book é um guia completo de gestão, com fundamentos, técnicas e estratégias para dominar todo o processo de obra.",
  },
];

export default function Materiais() {
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
    <div className="min-h-screen flex flex-col font-sans text-[#1a1a1a] bg-[#faf9f6] overflow-x-hidden w-full max-w-[100vw]">
      
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative bg-[#1a1a1a] overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <div className="absolute left-[5%] top-0 w-px h-full bg-white" />
          <div className="absolute left-[35%] top-0 w-px h-full bg-white" />
          <div className="absolute left-[65%] top-0 w-px h-full bg-white" />
          <div className="absolute left-[95%] top-0 w-px h-full bg-white" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img src={logoImg} alt="Inovando na Sua Obra" className="h-12 md:h-14 mb-6 brightness-0 invert opacity-80" />
              
              <div className="flex items-center gap-2 mb-4 text-[10px] uppercase tracking-[0.25em] text-[#C9A84C]/80 font-medium">
                <span>Materiais Digitais</span>
                <span className="text-white/20">·</span>
                <span>Acesso Imediato</span>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] uppercase tracking-wide mb-5">
                Pare de perder dinheiro e tempo em obras{" "}
                <span className="text-[#C9A84C]">desorganizadas</span>
              </h1>

              <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
                Materiais práticos criados por quem já gerenciou mais de 250 obras. 
                Organize seus processos, evite retrabalho e entregue projetos com excelência.
              </p>

              <button
                onClick={scrollToProducts}
                className="bg-[#2E7D32] text-white font-bold py-4 px-8 uppercase tracking-widest text-xs hover:bg-[#256829] transition-all shadow-[0_4px_24px_rgba(46,125,50,0.3)] border border-[#2E7D32]/50 inline-flex items-center gap-2 group"
              >
                Ver materiais
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-[#C9A84C]/20 to-transparent rounded-lg" />
                <img
                  src={inovandoObraImg}
                  alt="Ingrid Zarza e Fernanda Bradaschia"
                  className="relative w-full max-w-md rounded-lg shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ SOCIAL PROOF ═══════════════════ */}
      <FadeIn>
        <section className="py-12 md:py-16 bg-white border-b border-[#e8e4dc]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {SOCIAL_PROOF.map((item, i) => (
                <div key={i} className="text-center p-4 md:p-6 border border-[#C9A84C]/20 bg-[#faf9f6] relative">
                  <div className="absolute top-0 left-0 w-8 h-px bg-[#C9A84C]" />
                  <div className="absolute top-0 left-0 w-px h-8 bg-[#C9A84C]" />
                  <item.icon className="w-6 h-6 text-[#C9A84C] mx-auto mb-3" />
                  {item.isText ? (
                    <p className="text-sm font-bold text-[#1a1a1a] leading-tight">{item.label}</p>
                  ) : (
                    <>
                      <p className="font-display text-2xl md:text-3xl font-bold text-[#1a1a1a]">
                        <AnimatedNumber value={item.value} suffix={item.suffix} />
                      </p>
                      <p className="text-xs text-[#1a1a1a]/60 uppercase tracking-wider mt-1">{item.label}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ═══════════════════ QUEM SOMOS ═══════════════════ */}
      <FadeIn>
        <section className="py-16 md:py-24 bg-[#faf9f6]">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-5xl mx-auto">
              <div className="relative">
                <div className="absolute -inset-3 bg-[#C9A84C]/10 -z-10" />
                <img
                  src={inovandoObraImg}
                  alt="Ingrid Zarza e Fernanda Bradaschia"
                  className="w-full rounded-sm shadow-lg"
                />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] font-semibold mb-3">Quem somos</p>
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
                    Criadoras de uma metodologia prática e comprovada, elas ensinam o que realmente funciona 
                    no dia a dia da obra, sem teoria vazia. Cada material foi desenvolvido com base em 
                    experiências reais de canteiro.
                  </p>
                </div>
                <div className="flex gap-3 mt-6">
                  <div className="flex items-center gap-2 text-xs text-[#1a1a1a]/50 bg-[#1a1a1a]/5 px-3 py-1.5">
                    <Award className="w-3.5 h-3.5 text-[#C9A84C]" />
                    12 anos de mercado
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#1a1a1a]/50 bg-[#1a1a1a]/5 px-3 py-1.5">
                    <Building className="w-3.5 h-3.5 text-[#C9A84C]" />
                    +250 obras
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ═══════════════════ PRODUTOS ═══════════════════ */}
      <section id="produtos" className="py-16 md:py-24 bg-[#1a1a1a] relative overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <div className="absolute left-[5%] top-0 w-px h-full bg-white" />
          <div className="absolute left-[95%] top-0 w-px h-full bg-white" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] font-semibold mb-3">Nossos Materiais</p>
            <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-white uppercase tracking-tight mb-4">
              Escolha o material ideal para você
            </h2>
            <p className="text-white/50 text-sm max-w-lg mx-auto">
              Ferramentas práticas para organizar sua obra e entregar projetos com excelência
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {/* Card Checklists */}
            <FadeIn>
              <div className="bg-[#242424] border border-white/10 p-6 md:p-8 flex flex-col h-full relative group hover:border-[#C9A84C]/30 transition-colors">
                <div className="absolute top-0 left-0 w-12 h-px bg-[#C9A84C]" />
                <div className="absolute top-0 left-0 w-px h-12 bg-[#C9A84C]" />
                
                <ClipboardCheck className="w-8 h-8 text-[#C9A84C] mb-4" />
                <h3 className="font-display text-lg font-bold text-white uppercase tracking-wide mb-2">
                  {PRODUCTS.checklists.name}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5">
                  {PRODUCTS.checklists.description}
                </p>

                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C]/70 font-semibold mb-3">
                  Dores que resolve
                </p>
                <ul className="space-y-2 mb-5">
                  {PRODUCTS.checklists.painPoints.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/40">
                      <span className="text-red-400 mt-0.5">✕</span>
                      {p}
                    </li>
                  ))}
                </ul>

                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C]/70 font-semibold mb-3">
                  O que você recebe
                </p>
                <ul className="space-y-2 mb-6 flex-1">
                  {PRODUCTS.checklists.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                      <Check className="w-4 h-4 text-[#2E7D32] mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/10 pt-5">
                  <p className="font-display text-2xl font-bold text-white mb-3">
                    {PRODUCTS.checklists.priceDisplay}
                  </p>
                  <a
                    href={PRODUCTS.checklists.hotmartUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#2E7D32] text-white font-bold py-3.5 text-center uppercase tracking-widest text-xs hover:bg-[#256829] transition-all shadow-[0_4px_24px_rgba(46,125,50,0.3)] group-hover:shadow-[0_4px_32px_rgba(46,125,50,0.4)]"
                  >
                    Quero os Checklists
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Card E-book */}
            <FadeIn>
              <div className="bg-[#242424] border border-white/10 p-6 md:p-8 flex flex-col h-full relative group hover:border-[#C9A84C]/30 transition-colors">
                <div className="absolute top-0 left-0 w-12 h-px bg-[#C9A84C]" />
                <div className="absolute top-0 left-0 w-px h-12 bg-[#C9A84C]" />
                
                <BookOpen className="w-8 h-8 text-[#C9A84C] mb-4" />
                <h3 className="font-display text-lg font-bold text-white uppercase tracking-wide mb-2">
                  {PRODUCTS.ebook.name}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5">
                  {PRODUCTS.ebook.description}
                </p>

                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C]/70 font-semibold mb-3">
                  Dores que resolve
                </p>
                <ul className="space-y-2 mb-5">
                  {PRODUCTS.ebook.painPoints.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/40">
                      <span className="text-red-400 mt-0.5">✕</span>
                      {p}
                    </li>
                  ))}
                </ul>

                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C]/70 font-semibold mb-3">
                  O que você recebe
                </p>
                <ul className="space-y-2 mb-6 flex-1">
                  {PRODUCTS.ebook.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                      <Check className="w-4 h-4 text-[#2E7D32] mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/10 pt-5">
                  <p className="font-display text-2xl font-bold text-white mb-3">
                    {PRODUCTS.ebook.priceDisplay}
                  </p>
                  <a
                    href={PRODUCTS.ebook.hotmartUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#2E7D32] text-white font-bold py-3.5 text-center uppercase tracking-widest text-xs hover:bg-[#256829] transition-all shadow-[0_4px_24px_rgba(46,125,50,0.3)] group-hover:shadow-[0_4px_32px_rgba(46,125,50,0.4)]"
                  >
                    Quero o E-book
                  </a>
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
                  <p className="text-[#C9A84C]/70 text-xs">Checklists + E-book com 10% de desconto</p>
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
                      Todos os 6 Checklists de obra
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
                      7 dias de garantia
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col justify-center items-center md:items-end text-center md:text-right">
                  <p className="text-white/40 text-sm line-through mb-1">De R$ 164,00</p>
                  <p className="font-display text-3xl md:text-4xl font-bold text-white mb-1">
                    R$ {COMBO_PRICE.toFixed(2).replace(".", ",")}
                  </p>
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
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════ PARA QUEM É ═══════════════════ */}
      <FadeIn>
        <section className="py-16 md:py-24 bg-[#faf9f6]">
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
        <section className="py-12 md:py-16 bg-white border-y border-[#e8e4dc]">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <ShieldCheck className="w-12 h-12 text-[#2E7D32] mx-auto mb-4" />
            <h2 className="font-display text-lg md:text-xl font-bold text-[#1a1a1a] uppercase tracking-tight mb-3">
              Garantia incondicional de 7 dias
            </h2>
            <p className="text-sm text-[#1a1a1a]/60 leading-relaxed">
              Se por qualquer motivo você não ficar satisfeita com o material, basta solicitar o reembolso 
              dentro de 7 dias e devolvemos 100% do seu investimento. Sem burocracia, sem perguntas.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <FadeIn>
        <section className="py-16 md:py-24 bg-[#faf9f6]">
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
      <section className="py-16 md:py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <FadeIn>
            <h2 className="font-display text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4">
              Comece a transformar suas obras <span className="text-[#C9A84C]">hoje</span>
            </h2>
            <p className="text-white/50 text-sm mb-8">
              Materiais práticos, testados em mais de 250 obras, com acesso imediato e garantia de 7 dias.
            </p>
            <button
              onClick={scrollToProducts}
              className="bg-[#2E7D32] text-white font-bold py-4 px-8 uppercase tracking-widest text-xs hover:bg-[#256829] transition-all shadow-[0_4px_24px_rgba(46,125,50,0.3)] inline-flex items-center gap-2 group"
            >
              Ver materiais disponíveis
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="bg-[#111] py-10 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <img src={logoImg} alt="Inovando na Sua Obra" className="h-8 brightness-0 invert opacity-60 mx-auto md:mx-0 mb-3" />
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
    </div>
  );
}
