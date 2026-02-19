import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ShieldCheck, Lock, ArrowRight, Phone, Mail, Instagram } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ─── Image imports (ES6 — Vite bundles these into build output) ─── */
import imgLogo from "@/assets/mentoria/logo.png";
import imgHeroPhoto from "@/assets/mentoria/hero-photo.png";
import imgSkills from "@/assets/mentoria/skills.png";
import imgAudience from "@/assets/mentoria/audience.png";
import imgHowWorks from "@/assets/mentoria/how-works.png";
import imgModule1 from "@/assets/mentoria/module1.png";
import imgModule2 from "@/assets/mentoria/module2.png";
import imgModule3 from "@/assets/mentoria/module3.png";
import imgModule4 from "@/assets/mentoria/module4.png";
import imgBonus1 from "@/assets/mentoria/bonus1.png";
import imgBonus2 from "@/assets/mentoria/bonus2.png";
import imgRevenue1 from "@/assets/mentoria/revenue1.png";
import imgRevenue2 from "@/assets/mentoria/revenue2.png";
import imgTestimonial1 from "@/assets/mentoria/testimonial1.png";
import imgTestimonial2 from "@/assets/mentoria/testimonial2.png";
import imgTestimonial3 from "@/assets/mentoria/testimonial3.png";
import imgTestimonial4 from "@/assets/mentoria/testimonial4.png";
import imgGuarantee from "@/assets/mentoria/guarantee.png";
import imgGarantiaMobile from "@/assets/mentoria/garantia-mobile.png";
import imgAbout from "@/assets/mentoria/about.png";

const modules = [imgModule1, imgModule2, imgModule3, imgModule4];
const moduleLabels = [
  "Módulo 01 - Primeiros Passos",
  "Módulo 02 - Projeto Executável",
  "Módulo 03 - Gerenciamento de Obra",
  "Módulo 04 - Finalização e Fidelização",
];
const testimonials = [
  { src: imgTestimonial1, name: "Beatriz Francini" },
  { src: imgTestimonial2, name: "Ingrid Cristina" },
  { src: imgTestimonial3, name: "Monique Figueiredo" },
  { src: imgTestimonial4, name: "Aline Araujo" },
];

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

/* ─── Phone mask helper ─── */
function phoneMask(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/* ─── Lead form component ─── */
function LeadForm({ id, ctaLabel = "QUERO ENTRAR NA MENTORIA" }: { id?: string; ctaLabel?: string }) {
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

  return (
    <form id={id} onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <input
          type="text"
          placeholder="Seu nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      <div>
        <input
          type="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <input
          type="tel"
          placeholder="Seu WhatsApp (99) 99999-9999"
          value={phone}
          onChange={(e) => setPhone(phoneMask(e.target.value))}
          className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>
      <button
        type="submit"
        className="w-full py-4 bg-[#2E7D32] hover:bg-[#256829] text-white font-bold text-lg rounded-lg transition-colors uppercase tracking-wide flex items-center justify-center gap-2"
      >
        {ctaLabel}
        <ArrowRight className="w-5 h-5" />
      </button>
      <p className="flex items-center justify-center gap-2 text-sm text-gray-500">
        <Lock className="w-4 h-4" />
        Seus dados estão 100% seguros
      </p>
    </form>
  );
}

/* ═══════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════ */
export default function Home() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 800);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] font-sans">

      {/* ── 1. HERO ── */}
      <section className="relative bg-[#F5F0E8] overflow-hidden" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
              <img
                src={imgLogo}
                alt="Mentoria Inovando na sua Obra"
                className="h-20 md:h-28 object-contain mix-blend-multiply"
              />
              <h1 className="font-display font-bold text-2xl md:text-4xl lg:text-[2.75rem] uppercase leading-tight text-[#2D2D2D]">
                Domine o gerenciamento de obra de interiores de maneira lucrativa e eficiente
              </h1>
              <p className="text-[#555] text-sm md:text-base uppercase tracking-wide font-medium max-w-xl">
                Transforme cada projeto em uma jornada inesquecível para seus clientes, desde o primeiro contato até a entrega final.
              </p>
              <LeadForm id="hero-form" />
            </div>
            <div className="flex-1 flex justify-center">
              <img
                src={imgHeroPhoto}
                alt="Ingrid Zarza e Fernanda Bradaschia"
                className="max-w-full h-auto mix-blend-multiply"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SKILLS ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="container mx-auto px-4">
          <FadeIn className="text-center">
            <img
              src={imgSkills}
              alt="O que você vai aprender - Habilidades técnicas e comportamentais"
              className="mx-auto max-w-4xl w-full mix-blend-multiply"
              loading="lazy"
            />
          </FadeIn>
        </div>
      </section>

      {/* ── 3. AUDIENCE ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="container mx-auto px-4">
          <FadeIn className="text-center space-y-8">
            <h2 className="font-display font-bold text-2xl md:text-3xl uppercase text-[#D4AF37] italic">
              Para quem é?
            </h2>
            <p className="text-[#555] max-w-2xl mx-auto text-base md:text-lg">
              Para arquitetas, designers de interiores e engenheiras que queiram aprender a organizar obras de forma eficiente e previsível.
            </p>
            <img
              src={imgAudience}
              alt="Para quem é a mentoria"
              className="mx-auto max-w-4xl w-full mix-blend-multiply"
              loading="lazy"
            />
          </FadeIn>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="container mx-auto px-4">
          <FadeIn className="text-center">
            <img
              src={imgHowWorks}
              alt="Como funciona a Mentoria Inovando na sua Obra"
              className="mx-auto max-w-5xl w-full"
              loading="lazy"
            />
          </FadeIn>
        </div>
      </section>

      {/* ── 5. MODULES (vertical stacked) ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="font-display font-bold text-2xl md:text-4xl uppercase text-[#2D2D2D] italic">
              Como é a mentoria por dentro?
            </h2>
          </FadeIn>
          <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto">
            {modules.map((src, i) => (
              <FadeIn key={i} className="w-full">
                <img
                  src={src}
                  alt={moduleLabels[i]}
                  className="w-full mix-blend-multiply"
                  loading="lazy"
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. BONUS (vertical stacked) ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto">
            <FadeIn className="w-full">
              <img src={imgBonus1} alt="Pack de documentos" className="w-full mix-blend-multiply" loading="lazy" />
            </FadeIn>
            <FadeIn className="w-full">
              <img src={imgBonus2} alt="Aulas bônus exclusivas" className="w-full mix-blend-multiply" loading="lazy" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 7. REVENUE ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="font-display font-bold text-2xl md:text-3xl uppercase text-[#2D2D2D] italic">
              Como você pode faturar mais?
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <FadeIn>
              <img src={imgRevenue1} alt="Como faturar mais" className="w-full rounded-lg shadow-lg" loading="lazy" />
            </FadeIn>
            <FadeIn>
              <img src={imgRevenue2} alt="Como faturar mais" className="w-full rounded-lg shadow-lg" loading="lazy" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 8. PRICING ── */}
      <section id="pricing" className="bg-[#2D2018] py-16 md:py-24 text-white">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center space-y-8">
            <p className="text-[#D4AF37] font-bold uppercase tracking-widest text-sm">Investimento</p>
            <h2 className="font-display font-bold text-2xl md:text-4xl uppercase">
              E quanto é o investimento mais importante do seu ano?
            </h2>

            <div className="flex flex-wrap justify-center gap-8 md:gap-16 py-6">
              {[
                { value: "+250", label: "Obras gerenciadas" },
                { value: "+100", label: "Alunas transformadas" },
                { value: "12", label: "Anos de experiência" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-white">{s.value}</p>
                  <p className="text-gray-400 text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white text-gray-800 rounded-2xl shadow-2xl max-w-lg mx-auto overflow-hidden">
              {/* Gold header */}
              <div className="bg-gradient-to-br from-[#D4AF37] to-[#C49B30] text-center py-8 px-6">
                <p className="text-white/90 text-sm font-medium">Acesso completo por</p>
                <p className="text-white mt-2">
                  <span className="text-lg">12x</span>{" "}
                  <span className="text-5xl md:text-6xl font-bold">R$ 196</span>
                  <span className="text-2xl font-bold">,50</span>
                </p>
                <p className="text-white/80 text-sm mt-2">ou R$ 1.900,00 à vista</p>
              </div>
              {/* White body */}
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  {[
                    "16h de conteúdo gravado em 4 módulos",
                    "12 meses de acesso à plataforma",
                    "1h de mentoria individual",
                    "Encontro presencial em São Paulo",
                    "Materiais, checklists e ferramentas",
                    "Suporte e grupo de networking",
                  ].map((b) => (
                    <div key={b} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#2E7D32] mt-0.5 shrink-0" />
                      <span className="text-sm">{b}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-2">
                  <a
                    href="https://pay.hotmart.com/Y93975016X?off=22jnl093"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-[#2E7D32] hover:bg-[#256829] text-white font-bold text-base rounded-lg transition-colors uppercase"
                  >
                    Quero meu acesso agora
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <a
                    href="https://pay.hotmart.com/Y93975016X?off=et69m72o"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center w-full py-3 border border-gray-300 rounded-lg font-bold text-sm uppercase text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Prefiro pagar com Boleto Parcelado
                  </a>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
                  <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                  Compra 100% segura - Garantia de 15 dias
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 9. TESTIMONIALS ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="font-display font-bold text-2xl md:text-3xl uppercase text-[#2D2D2D]">
              Veja o que dizem <strong>nossas alunas:</strong>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <FadeIn key={t.name}>
                <img
                  src={t.src}
                  alt={`Depoimento ${t.name}`}
                  className="w-full rounded-lg shadow-lg"
                  loading="lazy"
                />
              </FadeIn>
            ))}
          </div>
          <FadeIn className="text-center mt-10">
            <button
              onClick={scrollToForm}
              className="px-10 py-4 bg-[#2E7D32] hover:bg-[#256829] text-white font-bold text-lg rounded-lg transition-colors uppercase"
            >
              quero entrar na mentoria
            </button>
          </FadeIn>
        </div>
      </section>

      {/* ── 10. GUARANTEE ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="container mx-auto px-4">
          <FadeIn className="flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <h2 className="font-display font-bold text-2xl md:text-3xl uppercase text-[#2D2D2D]">
                Risco Zero para você
              </h2>
              <p className="text-[#555] leading-relaxed text-lg">
                Confiamos tanto no nosso conteúdo que damos uma{" "}
                <strong>garantia incondicional de 15 dias</strong> pra você.
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <img
                src={imgGuarantee}
                alt="Garantia de 15 dias"
                className="hidden md:block max-w-xs w-full mix-blend-multiply"
                loading="lazy"
              />
              <img
                src={imgGarantiaMobile}
                alt="Garantia incondicional de 15 dias"
                className="block md:hidden max-w-[200px] w-full mix-blend-multiply"
                loading="lazy"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 11. ABOUT ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="container mx-auto px-4">
          <FadeIn className="flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto">
            <div className="flex-1 space-y-6">
              <h2 className="font-display font-bold text-2xl md:text-3xl uppercase text-[#2D2D2D]">
                Quem Somos
              </h2>
              <div className="text-[#555] leading-relaxed space-y-4 text-base">
                <p>
                  Somos <strong>Ingrid Zarza e Fernanda Bradaschia</strong>, arquitetas <strong>apaixonadas</strong> por compartilhar conhecimento e <strong>transformar a gestão de obras de interiores</strong>.
                </p>
                <p>
                  Unimos nossas experiências para fundar a <strong>INOVANDO ARQUITETURA</strong>, um escritório dedicado ao desenvolvimento e gerenciamento de projetos residenciais e comerciais de interiores. Ao longo da nossa trajetória, <strong>já concluímos mais de 250 obras</strong>, ajudando clientes a realizarem o seu sonho.
                </p>
                <p>
                  Criamos a <strong>@inovandonasuaobra</strong>, um instagram para arquitetas, designers de interiores e engenheiras que querem aprender a gerenciar obras de interiores com mais segurança e qualidade. Lá, <strong>compartilhamos experiências reais de obra, dicas valiosas e estratégias práticas</strong> baseadas na nossa vivência em campo.
                </p>
                <p>
                  Em <strong>2024</strong>, criamos a <strong>Mentoria Inovando na Sua Obra</strong> para <strong>compartilhar todo esse conhecimento de forma organizada e acessível</strong>. Já são dezenas de alunas impactadas diretamente pela nossa metodologia, conquistando mais confiança e resultados.
                </p>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <img
                src={imgAbout}
                alt="Ingrid Zarza e Fernanda Bradaschia"
                className="max-w-md w-full rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 12. FAQ ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="container mx-auto px-4">
          <FadeIn className="max-w-3xl mx-auto">
            <h2 className="font-display font-bold text-2xl md:text-3xl uppercase text-[#2D2D2D] text-center mb-10">
              <strong>Perguntas Frequentes</strong>
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  q: "As aulas são gravadas ou ao vivo?",
                  a: "Todo o conteúdo já está gravado e organizado por temas na plataforma. Assim que você comprar, terá acesso imediato aos 4 primeiros módulos. Além disso, as aulas bônus e os plantões de dúvidas serão ao vivo pelo Zoom, com as gravações disponíveis na plataforma Hotmart.",
                },
                {
                  q: "Em quanto tempo eu termino a mentoria?",
                  a: "Aproximadamente 3 meses. Todo conteúdo gravado são 16h e isso dá 1h33 por semana (12 semanas)",
                },
                {
                  q: "Por quanto tempo eu tenho acesso ao conteúdo?",
                  a: "1 ano de acesso.",
                },
                {
                  q: "Será que consigo conciliar a mentoria com meus outros compromissos?",
                  a: "Sabemos que o dia a dia nas obras são corridos, e é por isso que nossas aulas foram planejadas para se ajustarem à sua rotina. Conteúdo prático e direto ao ponto, em módulos concisos, para você aprender no seu ritmo e aplicar no dia seguinte.",
                },
                {
                  q: "Não encontrei a resposta para a minha dúvida, como faço?",
                  a: "Entre em contato com nosso time pelo WhatsApp ou e-mail. Estamos prontos para te ajudar!",
                },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-white rounded-lg px-6 border border-gray-200">
                  <AccordionTrigger className="text-left font-bold text-base md:text-lg py-5 hover:no-underline text-[#2D2D2D]">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#555] leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>

      {/* ── 13. FOOTER ── */}
      <footer className="bg-[#1a1a1a] text-gray-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            {/* Logo & brand */}
            <div className="space-y-4 text-center md:text-left">
              <img
                src={imgLogo}
                alt="Inovando na sua Obra"
                className="h-16 mx-auto md:mx-0"
                loading="lazy"
              />
              <p className="text-sm text-gray-500 leading-relaxed">
                Transformando a gestão de obras de interiores com método, segurança e resultados reais.
              </p>
            </div>

            {/* Links */}
            <div className="space-y-3 text-center md:text-left">
              <h4 className="font-display font-bold text-white uppercase text-sm tracking-wider mb-4">Links Úteis</h4>
              <button onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })} className="block text-gray-400 hover:text-[#D4AF37] transition-colors text-sm mx-auto md:mx-0">Investimento</button>
              <a href="https://pay.hotmart.com/Y93975016X?off=22jnl093" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">Quero me inscrever</a>
              <a href="https://www.instagram.com/inovandonasuaobra/" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">Instagram</a>
            </div>

            {/* Contact */}
            <div className="space-y-3 text-center md:text-left">
              <h4 className="font-display font-bold text-white uppercase text-sm tracking-wider mb-4">Contato</h4>
              <a href="https://wa.me/5511955717229" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors text-sm justify-center md:justify-start">
                <Phone className="w-4 h-4" />
                (11) 5571-7229
              </a>
              <a href="mailto:contato@inovandonasuaobra.com.br" className="flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors text-sm justify-center md:justify-start">
                <Mail className="w-4 h-4" />
                contato@inovandonasuaobra.com.br
              </a>
              <a href="https://www.instagram.com/inovandonasuaobra/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors text-sm justify-center md:justify-start">
                <Instagram className="w-4 h-4" />
                @inovandonasuaobra
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-6 text-center">
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} Inovando na Sua Obra. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* ── STICKY MOBILE CTA ── */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-[#2E7D32] text-white p-3 flex items-center justify-between md:hidden transition-transform duration-300 shadow-[0_-4px_12px_rgba(0,0,0,0.2)] ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div>
          <p className="text-xs font-medium">A partir de</p>
          <p className="text-lg font-bold">12x R$ 196</p>
        </div>
        <button
          onClick={scrollToForm}
          className="px-6 py-2 bg-white text-[#2E7D32] font-bold rounded-lg text-sm uppercase animate-pulse"
        >
          Garantir Vaga
        </button>
      </div>
    </div>
  );
}
