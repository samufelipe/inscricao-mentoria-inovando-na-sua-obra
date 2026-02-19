import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ShieldCheck, ChevronDown, MessageCircle, CreditCard, Barcode } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const IMG = "/images/mentoria";

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
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B8A3F]"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      <div>
        <input
          type="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B8A3F]"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <input
          type="tel"
          placeholder="(99) 99999-9999"
          value={phone}
          onChange={(e) => setPhone(phoneMask(e.target.value))}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B8A3F]"
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>
      <button
        type="submit"
        className="w-full py-4 bg-[#1B8A3F] hover:bg-[#156e32] text-white font-bold text-lg rounded-lg transition-colors uppercase tracking-wide"
      >
        {ctaLabel}
      </button>
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
    <div className="min-h-screen bg-[#F5F5F0] font-sans">

      {/* ── 1. HERO ── */}
      <section className="relative bg-[#EDE8DC] overflow-hidden">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Left */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
              <img
                src={`${IMG}/logo.png`}
                alt="Mentoria Inovando na sua Obra"
                className="h-16 md:h-20 object-contain mix-blend-multiply"
              />
              <h1 className="font-display font-bold text-2xl md:text-4xl lg:text-5xl uppercase leading-tight text-[#2D2D2D]">
                Domine o Gerenciamento de Obra de Interiores de Maneira{" "}
                <span className="text-[#D4AF37]">Lucrativa e Eficiente</span>
              </h1>
              <p className="text-gray-600 text-base md:text-lg max-w-xl">
                A mentoria completa para arquitetas e designers de interiores que querem transformar o gerenciamento de obras em uma fonte de lucro e reconhecimento profissional.
              </p>
              <LeadForm id="hero-form" />
            </div>
            {/* Right — photo */}
            <div className="flex-1 flex justify-center">
              <img
                src={`${IMG}/hero-photo.png`}
                alt="Ingrid e Fernanda"
                className="max-w-full h-auto mix-blend-multiply"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SKILLS ── */}
      <section className="bg-[#F5F5F0] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center">
            <h2 className="font-display font-bold text-2xl md:text-3xl uppercase text-[#D4AF37] mb-10">
              O Que Você Vai Aprender?
            </h2>
            <img
              src={`${IMG}/skills.png`}
              alt="Habilidades Técnicas e Comportamentais"
              className="mx-auto max-w-4xl w-full mix-blend-multiply"
              loading="lazy"
            />
          </FadeIn>
        </div>
      </section>

      {/* ── 3. AUDIENCE ── */}
      <section className="bg-[#EDE8DC] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center space-y-8">
            <h2 className="font-display font-bold text-2xl md:text-3xl uppercase text-[#2D2D2D]">
              Para Quem É?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
              Se você é arquiteta, designer de interiores ou engenheira e quer aprender a gerenciar obras de interiores com eficiência, organização e lucratividade, essa mentoria é para você.
            </p>
            <img
              src={`${IMG}/audience.png`}
              alt="Para quem é a mentoria"
              className="mx-auto max-w-4xl w-full mix-blend-multiply"
              loading="lazy"
            />
          </FadeIn>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS ── */}
      <section className="bg-[#F5F5F0] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center">
            <img
              src={`${IMG}/how-works.png`}
              alt="Como funciona a Mentoria"
              className="mx-auto max-w-5xl w-full mix-blend-multiply"
              loading="lazy"
            />
          </FadeIn>
        </div>
      </section>

      {/* ── 5. MODULES ── */}
      <section className="bg-[#EDE8DC] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="font-display font-bold text-2xl md:text-3xl uppercase text-[#2D2D2D]">
              Como é a Mentoria Por Dentro?
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <FadeIn key={n}>
                <img
                  src={`${IMG}/module${n}.png`}
                  alt={`Módulo ${n}`}
                  className="w-full rounded-lg shadow-lg mix-blend-multiply"
                  loading="lazy"
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. BONUS ── */}
      <section className="bg-[#F5F5F0] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="font-display font-bold text-2xl md:text-3xl uppercase text-[#D4AF37]">
              Bônus Exclusivos
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <FadeIn>
              <img src={`${IMG}/bonus1.png`} alt="Bônus 1" className="w-full rounded-lg shadow-lg mix-blend-multiply" loading="lazy" />
            </FadeIn>
            <FadeIn>
              <img src={`${IMG}/bonus2.png`} alt="Bônus 2" className="w-full rounded-lg shadow-lg mix-blend-multiply" loading="lazy" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 7. REVENUE ── */}
      <section className="bg-[#EDE8DC] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="font-display font-bold text-2xl md:text-3xl uppercase text-[#2D2D2D]">
              Como Você Pode Faturar Mais?
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <FadeIn>
              <img src={`${IMG}/revenue1.png`} alt="Depoimento 1" className="w-full rounded-lg shadow-lg" loading="lazy" />
            </FadeIn>
            <FadeIn>
              <img src={`${IMG}/revenue2.png`} alt="Depoimento 2" className="w-full rounded-lg shadow-lg" loading="lazy" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 8. PRICING ── */}
      <section id="pricing" className="bg-[#1a1a1a] py-16 md:py-24 text-white">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center space-y-8">
            <p className="text-[#D4AF37] font-bold uppercase tracking-widest text-sm">Investimento</p>
            <h2 className="font-display font-bold text-2xl md:text-4xl uppercase">
              É Quanto é o Investimento Mais Importante do Seu Ano?
            </h2>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 py-6">
              {[
                { value: "+250", label: "Obras Gerenciadas" },
                { value: "+100", label: "Alunas Formadas" },
                { value: "12", label: "Anos de Experiência" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-[#D4AF37]">{s.value}</p>
                  <p className="text-gray-400 text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Card */}
            <div className="bg-white text-gray-800 rounded-2xl shadow-2xl max-w-lg mx-auto p-8 md:p-12 space-y-6">
              <div className="text-center">
                <p className="text-gray-500 text-sm">12x de</p>
                <p className="text-5xl md:text-6xl font-bold text-[#1B8A3F]">R$ 196<span className="text-2xl">,50</span></p>
                <p className="text-gray-500 text-sm mt-1">ou R$ 1.900,00 à vista</p>
              </div>

              <ul className="space-y-3 text-left">
                {[
                  "16h de conteúdo gravado em 4 módulos",
                  "12 meses de acesso à plataforma",
                  "1h de mentoria individual",
                  "Encontro presencial em São Paulo",
                  "Materiais, checklists e ferramentas",
                  "Suporte e grupo de networking",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#1B8A3F] mt-0.5 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3 pt-4">
                <a
                  href="https://pay.hotmart.com/Y93975016X?off=22jnl093"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-[#1B8A3F] hover:bg-[#156e32] text-white font-bold text-lg rounded-lg transition-colors uppercase"
                >
                  <CreditCard className="w-5 h-5" />
                  COMPRAR COM CARTÃO
                </a>
                <a
                  href="https://pay.hotmart.com/Y93975016X?off=et69m72o"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 border-2 border-[#1B8A3F] text-[#1B8A3F] hover:bg-[#1B8A3F] hover:text-white font-bold rounded-lg transition-colors uppercase text-sm"
                >
                  <Barcode className="w-5 h-5" />
                  PAGAR COM BOLETO PARCELADO
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
                <ShieldCheck className="w-4 h-4 text-[#1B8A3F]" />
                Compra 100% segura • Garantia de 15 dias
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 9. TESTIMONIALS ── */}
      <section className="bg-[#F5F5F0] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="font-display font-bold text-2xl md:text-3xl uppercase text-[#2D2D2D]">
              Veja o Que Dizem Nossas Alunas:
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { src: "testimonial1.png", name: "Beatriz Francini" },
              { src: "testimonial2.png", name: "Ingrid Cristina" },
              { src: "testimonial3.png", name: "Monique Figueiredo" },
              { src: "testimonial4.png", name: "Aline Araujo" },
            ].map((t) => (
              <FadeIn key={t.name}>
                <img
                  src={`${IMG}/${t.src}`}
                  alt={`Depoimento de ${t.name}`}
                  className="w-full rounded-lg shadow-lg"
                  loading="lazy"
                />
              </FadeIn>
            ))}
          </div>
          <FadeIn className="text-center mt-10">
            <button
              onClick={scrollToForm}
              className="px-10 py-4 bg-[#1B8A3F] hover:bg-[#156e32] text-white font-bold text-lg rounded-lg transition-colors uppercase"
            >
              QUERO ENTRAR NA MENTORIA
            </button>
          </FadeIn>
        </div>
      </section>

      {/* ── 10. GUARANTEE ── */}
      <section className="bg-[#EDE8DC] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <FadeIn className="flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <h2 className="font-display font-bold text-2xl md:text-3xl uppercase text-[#2D2D2D]">
                Risco Zero Para Você
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Você tem 15 dias de garantia incondicional. Se dentro desse período você sentir que a mentoria não é para você, basta solicitar o reembolso e devolvemos 100% do seu investimento, sem perguntas. Queremos que você entre com total segurança e confiança.
              </p>
              <button
                onClick={scrollToForm}
                className="px-8 py-4 bg-[#1B8A3F] hover:bg-[#156e32] text-white font-bold rounded-lg transition-colors uppercase"
              >
                GARANTIR MINHA VAGA
              </button>
            </div>
            <div className="flex-1 flex justify-center">
              {/* Desktop guarantee */}
              <img
                src={`${IMG}/guarantee.png`}
                alt="Garantia 15 dias"
                className="hidden md:block max-w-xs w-full mix-blend-multiply"
                loading="lazy"
              />
              {/* Mobile guarantee */}
              <img
                src={`${IMG}/garantia-mobile.png`}
                alt="Garantia 15 dias"
                className="block md:hidden max-w-[200px] w-full mix-blend-multiply"
                loading="lazy"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 11. ABOUT ── */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <FadeIn className="flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto">
            <div className="flex-1 space-y-6">
              <h2 className="font-display font-bold text-2xl md:text-3xl uppercase text-[#2D2D2D]">
                Quem Somos
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  Somos <strong>Ingrid Zarza</strong> e <strong>Fernanda Bradaschia</strong>, arquitetas apaixonadas por compartilhar conhecimento e transformar a gestão de obras de interiores.
                </p>
                <p>
                  Unimos nossas experiências para fundar a <strong>INOVANDO ARQUITETURA</strong>, com mais de <strong>250 obras gerenciadas</strong> e <strong>12 anos de experiência</strong> no mercado de arquitetura e design de interiores.
                </p>
                <p>
                  Criamos o perfil <strong>@inovandonasuaobra</strong> para ajudar profissionais a enfrentarem os desafios reais do canteiro de obras. Em 2024, lançamos a <strong>Mentoria Inovando na Sua Obra</strong> para formar uma nova geração de profissionais que gerenciam obras com excelência, lucratividade e reconhecimento.
                </p>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <img
                src={`${IMG}/about.png`}
                alt="Ingrid Zarza e Fernanda Bradaschia"
                className="max-w-md w-full rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 12. FAQ ── */}
      <section className="bg-[#F5F5F0] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <FadeIn className="max-w-3xl mx-auto">
            <h2 className="font-display font-bold text-2xl md:text-3xl uppercase text-[#2D2D2D] text-center mb-10">
              Perguntas Frequentes
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  q: "As aulas são gravadas ou ao vivo?",
                  a: "Todo o conteúdo já está gravado e organizado por temas na plataforma. Você pode assistir no seu ritmo, quando e onde quiser, quantas vezes precisar durante o período de acesso.",
                },
                {
                  q: "Em quanto tempo eu termino a mentoria?",
                  a: "Aproximadamente 3 meses. Todo conteúdo gravado são 16h de aulas distribuídas em 4 módulos. Mas você tem 12 meses de acesso para assistir no seu ritmo.",
                },
                {
                  q: "Por quanto tempo eu tenho acesso ao conteúdo?",
                  a: "Você terá 1 ano de acesso completo a todo o conteúdo da plataforma, incluindo atualizações e materiais complementares.",
                },
                {
                  q: "Será que consigo conciliar a mentoria com meus outros compromissos?",
                  a: "Sabemos que o dia a dia nas obras são corridos. Por isso, o conteúdo é gravado e você pode assistir no seu tempo. As mentorias individuais são agendadas conforme sua disponibilidade.",
                },
                {
                  q: "Não encontrei a resposta para a minha dúvida, como faço?",
                  a: "Entre em contato com nosso time pelo WhatsApp (11) 5571-7229. Estamos prontos para te ajudar!",
                },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-white rounded-lg px-6 border border-gray-200">
                  <AccordionTrigger className="text-left font-bold text-base md:text-lg py-5 hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>

      {/* ── 13. FOOTER ── */}
      <footer className="bg-[#1a1a1a] text-gray-400 py-10">
        <div className="container mx-auto px-4 text-center space-y-3">
          <img
            src={`${IMG}/logo.png`}
            alt="Inovando na sua Obra"
            className="h-10 mx-auto opacity-70 invert"
            loading="lazy"
          />
          <p className="text-sm">
            © {new Date().getFullYear()} Inovando na Sua Obra. Todos os direitos reservados.
          </p>
          <p className="text-xs">
            Contato: (11) 5571-7229 • contato@inovandonasuaobra.com.br
          </p>
        </div>
      </footer>

      {/* ── STICKY MOBILE CTA ── */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-[#1B8A3F] text-white p-3 flex items-center justify-between md:hidden transition-transform duration-300 shadow-[0_-4px_12px_rgba(0,0,0,0.2)] ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div>
          <p className="text-xs font-medium">A partir de</p>
          <p className="text-lg font-bold">12x R$ 196</p>
        </div>
        <button
          onClick={scrollToForm}
          className="px-6 py-2 bg-white text-[#1B8A3F] font-bold rounded-lg text-sm uppercase animate-pulse"
        >
          Garantir Vaga
        </button>
      </div>
    </div>
  );
}
