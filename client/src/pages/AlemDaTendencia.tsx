import { ArchitecturalButton } from "@/components/ui/architectural-button";
import { ArchitecturalSection } from "@/components/ui/architectural-section";
import { ArchitecturalTitle } from "@/components/ui/architectural-title";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { HostsSection } from "@/components/ui/hosts-section";
import { LearningModule } from "@/components/ui/learning-module";
import { LocationMap } from "@/components/ui/location-map";
import { RegistrationForm } from "@/components/ui/registration-form";
import { SpeakerCard } from "@/components/ui/speaker-card";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { StickyHeader } from "@/components/ui/sticky-header";
import { ScarcityBanner } from "@/components/ui/scarcity-banner";
import { HeroRegistrationForm } from "@/components/ui/hero-registration-form";
import { ArrowDown, Calendar, Check, MapPin, Users, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { AudienceMontageV2 } from "@/components/ui/audience-montage-v2";
import heroMain from "@/assets/alem-da-tendencia/hero-main.png";
// heroLeft removed per plan
import heroRight from "@/assets/alem-da-tendencia/hero-right.png";
import heroFar from "@/assets/alem-da-tendencia/hero-far.png";
import logoTransparent from "@/assets/alem-da-tendencia/logo-transparent.png";
import lucianaGuerraImg from "@/assets/alem-da-tendencia/luciana-guerra.jpg";
import marciaPereira from "@/assets/alem-da-tendencia/marcia-pereira.jpg";

export default function AlemDaTendencia() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Além da Tendência - Evento Presencial";

    const link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
    const prevFavicon = link?.href || "";

    return () => {
      document.title = prevTitle;
      if (link) link.href = prevFavicon;
    };
  }, []);
  const whatsappLink = "https://wa.me/551155717229?text=Ol%C3%A1!%20Gostaria%20de%20me%20inscrever%20no%20evento%20Al%C3%A9m%20da%20Tend%C3%AAncia.";

  const scrollToInscricao = () => {
    document.getElementById("inscricao")?.scrollIntoView({ behavior: "smooth" });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-[oklch(0.97_0.01_95)] overflow-x-hidden">
      <StickyHeader />
      
      {/* HERO SECTION - Full Dark Cinematic Integrated */}
      <section className="relative overflow-hidden bg-[#1a1a1a] min-h-[60vh] md:min-h-[90vh] flex flex-col">
        {/* Background: 4-image composition covering entire hero */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Camada 1: Far image (profundidade) - hidden on mobile */}
          <img
            src={heroFar}
            alt=""
            className="hidden md:block absolute left-0 top-0 w-[35%] h-full object-cover object-[center_20%] opacity-70"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, black 0%, black 40%, transparent 95%)',
              maskImage: 'linear-gradient(to right, black 0%, black 40%, transparent 95%)',
            }}
          />
          {/* Camada 2 removida (heroLeft) - agora só 3 imagens */}
          {/* Camada 3: CENTRAL principal - larger on mobile */}
          <img
            src={heroMain}
            alt="Evento Além da Tendência - Mentoras"
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[95%] md:w-[60%] h-full object-cover object-[center_15%] z-[3]"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              objectPosition: 'center 15%' // Foco nos rostos
            }}
          />
          {/* Camada 4: Right image - hidden on mobile */}
          <img
            src={heroRight}
            alt=""
            className="hidden md:block absolute right-0 top-0 w-[35%] h-full object-cover object-[center_45%] z-[2]"
            style={{
              WebkitMaskImage: 'linear-gradient(to left, black 0%, black 40%, transparent 92%)',
              maskImage: 'linear-gradient(to left, black 0%, black 40%, transparent 92%)',
            }}
          />

          {/* Overlay: gradient for legibility - transparent top, dark bottom */}
          <div 
            className="absolute inset-0 z-[10] pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent 0%, transparent 25%, rgba(26,26,26,0.5) 45%, rgba(26,26,26,0.85) 65%, #1a1a1a 85%)' }}
          />
          {/* Radial vignette - Stronger on mobile for text readability */}
          <div
            className="absolute inset-0 z-[11] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)' }}
          />
          {/* Mobile specific overlay for text contrast */}
          <div className="md:hidden absolute inset-0 z-[12] bg-black/40 pointer-events-none" />
        </div>

        {/* Content overlaid on images */}
        <div className="relative z-20 flex-1 flex flex-col container mx-auto px-4">
          {/* Logo - top center */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center pt-8 md:pt-12"
          >
            <img 
              src={logoTransparent}
              alt="Além da Tendência - Logo Oficial" 
              className="w-[160px] md:w-[220px] h-auto object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
            />
          </motion.div>

          {/* Spacer to push content to bottom half */}
          <div className="flex-1 min-h-[40px] md:min-h-[180px]" />

          {/* Bottom content: text + form */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-end pb-8 md:pb-16">
            {/* Left: Text Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-start"
            >
              <h1 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 uppercase drop-shadow-lg">
                Inspiração Sem Gestão É Só Tendência Que{" "}
                <span className="text-[#C9A84C]">Não Sai do Papel</span>
              </h1>
              <p className="text-sm md:text-base text-gray-200 max-w-lg mb-4 font-light leading-relaxed border-l-4 border-[#C9A84C] pl-5 drop-shadow-md">
                Tudo o que você precisa para sair da ExpoRevestir com um plano real de gestão de obra, escritório, iluminação e contratos.
              </p>
              <p className="text-xs md:text-sm text-[#C9A84C] font-semibold uppercase tracking-wider mb-6 flex items-center gap-2 drop-shadow-md">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                Apenas 297 lugares — Lote Promocional com 50% OFF
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm font-medium tracking-wide uppercase bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/15 w-full sm:w-auto shadow-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#C9A84C]" />
                  <div>
                    <span className="block text-xs text-gray-400 mb-0.5">Data</span>
                    <span className="text-base font-bold text-white">10 de Março</span>
                  </div>
                </div>
                <div className="w-px h-10 bg-white/10 hidden sm:block" />
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#C9A84C]" />
                  <div>
                    <span className="block text-xs text-gray-400 mb-0.5">Local</span>
                    <span className="text-base font-bold text-white">Auditório AFRESP - SP</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Registration Form - Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full"
            >
              <div className="backdrop-blur-md bg-white/10 border border-white/15 rounded-2xl p-1 shadow-2xl">
                <HeroRegistrationForm />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Transition gradient from dark hero to light page */}
        <div 
          className="relative z-20 w-full h-20 md:h-32"
          style={{ background: 'linear-gradient(to bottom, #1a1a1a 0%, oklch(0.97 0.01 95) 100%)' }}
        />
      </section>

      <ScarcityBanner />

      {/* PROPOSTA DE VALOR */}
      <ArchitecturalSection id="sobre" variant="light" className="relative">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <div className="space-y-8">
            <motion.div variants={fadeInUp}>
              <ArchitecturalTitle variant="h3" color="orange">
                O Conceito
              </ArchitecturalTitle>
              <ArchitecturalTitle variant="h2" color="purple">
                Tendência Encanta.<br />Estrutura Constrói.
              </ArchitecturalTitle>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="text-gray-600 space-y-6 text-lg leading-relaxed">
              <p>
                A ExpoRevestir apresenta lançamentos. Mostra possibilidades. Desperta ideias.
                Mas para que uma tendência saia do stand e vire obra executada e cliente satisfeito, é preciso estrutura.
              </p>
              <p>
                O evento <strong className="text-[oklch(0.35_0.12_320)]">Além da Tendência</strong> nasceu para preencher essa lacuna.
                Enquanto o mercado fala de estética, nós vamos falar de <strong className="text-[oklch(0.35_0.12_320)]">negócio</strong>.
              </p>
              <ul className="space-y-3 pt-4">
                {[
                  "Como gerenciar obras sem perder o controle financeiro",
                  "Processos de escritório que blindam seu lucro",
                  "Contratos que protegem sua autoria e responsabilidade",
                  "Iluminação técnica que valoriza o projeto real"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[oklch(0.75_0.18_65)]/20 flex items-center justify-center text-[oklch(0.75_0.18_65)] mt-0.5">
                      <Check className="w-4 h-4" />
                    </span>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp} className="pt-4">
              <ArchitecturalButton onClick={scrollToInscricao}>
                Quero Profissionalizar Minha Gestão
              </ArchitecturalButton>
            </motion.div>
          </div>

          {/* Citação estilizada */}
          <motion.div variants={fadeInUp} className="relative flex items-center justify-center">
            <div className="relative bg-[oklch(0.35_0.12_320)]/5 border-l-4 border-[oklch(0.75_0.18_65)] p-8 md:p-12 rounded-r-2xl">
              <span className="absolute -top-6 -left-2 text-[oklch(0.75_0.18_65)] text-8xl font-serif leading-none opacity-30">"</span>
              <p className="text-xl md:text-2xl font-serif italic text-[oklch(0.35_0.12_320)] leading-relaxed mb-4">
                Não existe arquitetura sem gestão. Não existe obra sem processo.
              </p>
              <p className="text-sm uppercase tracking-widest text-[oklch(0.75_0.18_65)] font-bold">
                — Filosofia do Evento
              </p>
              <span className="absolute -bottom-6 right-4 text-[oklch(0.75_0.18_65)] text-8xl font-serif leading-none opacity-30 rotate-180">"</span>
            </div>
          </motion.div>
        </motion.div>
      </ArchitecturalSection>

      {/* NOVA SEÇÃO: PARA QUEM É (Movida para cá) */}
      <ArchitecturalSection id="publico" variant="dark" className="relative overflow-hidden">
        <div className="text-center mb-12 relative z-10">
          <ArchitecturalTitle variant="h2" color="light">
            Para Quem É Este Evento?
          </ArchitecturalTitle>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Reunimos profissionais que buscam ir além do óbvio e transformar seus escritórios em empresas sólidas e lucrativas.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <AudienceMontageV2 />
        </motion.div>

        {/* Cards de perfil do público-alvo */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8 mt-12 relative z-10"
        >
          {[
            {
              icon: <Users className="w-8 h-8 text-[#C9A84C]" />,
              title: "Arquitetas e Designers de Interiores",
              desc: "Você que projeta, especifica e executa - mas sente que falta método para escalar. Aqui você vai estruturar seu escritório como uma empresa real, com processos que sustentam o crescimento."
            },
            {
              icon: <CheckCircle2 className="w-8 h-8 text-[#C9A84C]" />,
              title: "Quem Busca Estrutura e Processos",
              desc: "Talento sem gestão não escala. Se você precisa precificar com segurança, organizar sua operação e proteger seu lucro, este evento foi desenhado para você sair com um plano concreto."
            },
            {
              icon: <Calendar className="w-8 h-8 text-[#C9A84C]" />,
              title: "Quem Quer Transformar Tendência em Execução",
              desc: "Você acompanha feiras, se inspira e consome conteúdo - mas na hora de executar, falta segurança jurídica, controle financeiro e método de obra. Aqui a tendência vira projeto entregue."
            }
          ].map((card, i) => (
            <motion.div 
              key={i} variants={fadeInUp}
              className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/10 transition-all duration-500 group"
            >
              <div className="mb-4">{card.icon}</div>
              <h3 className="text-white font-bold text-lg mb-3 group-hover:text-[#C9A84C] transition-colors">{card.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </ArchitecturalSection>

      {/* ANFITRIÃS */}
      <HostsSection />

      {/* PALESTRANTES */}
      <ArchitecturalSection id="palestrantes" variant="dark">
        <div className="text-center mb-16">
          <ArchitecturalTitle variant="h2" color="light">
            Quem Vai Guiar Sua Jornada
          </ArchitecturalTitle>
          <ArchitecturalTitle variant="h3" color="orange">
            Palestrantes
          </ArchitecturalTitle>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <SpeakerCard 
            name="Luciana Guerra"
            role="Especialista em Iluminação"
            description="Referência nacional em Lighting Design, Luciana ensina como a luz pode transformar ambientes e aumentar o valor percebido dos seus projetos."
            image={lucianaGuerraImg}
            socialProof="Iluminação que Vende e Valoriza"
          />
          <SpeakerCard 
            name="Marcia Pereira"
            role="Advogada Especialista em Arquitetura"
            description="Especialista em contratos e responsabilidade civil para arquitetos e engenheiros. Aprenda a se proteger de riscos e garantir seus honorários."
            image={marciaPereira}
            socialProof="Blindagem Jurídica para Arquitetos"
          />
        </div>
      </ArchitecturalSection>

      {/* CONTEÚDO / MÓDULOS */}
      <ArchitecturalSection id="conteudo" variant="light">
        <div className="text-center mb-16">
          <ArchitecturalTitle variant="h2" color="purple">
            O Que Você Vai Aprender
          </ArchitecturalTitle>
          <ArchitecturalTitle variant="h3" color="purple">
            Programação
          </ArchitecturalTitle>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <LearningModule 
            number="01"
            title="Gestão de Escritório"
            description="Processos, precificação e organização interna para escalar seu negócio sem perder a qualidade de vida."
            speaker="Ingrid Zarza"
          />
          <LearningModule 
            number="02"
            title="Gestão de Obras"
            description="Do cronograma à entrega das chaves: como evitar prejuízos, atrasos e dores de cabeça na execução."
            speaker="Fernanda Bradaschia"
          />
          <LearningModule 
            number="03"
            title="Iluminação Estratégica"
            description="Técnicas de lighting design que valorizam o projeto e encantam o cliente final."
            speaker="Luciana Guerra"
          />
          <LearningModule 
            number="04"
            title="Segurança Jurídica"
            description="Contratos à prova de falhas e como se proteger legalmente em todas as etapas do projeto."
            speaker="Marcia Pereira"
          />
        </div>
      </ArchitecturalSection>

      {/* LOCAL */}
      <ArchitecturalSection id="local" variant="dark" className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <ArchitecturalTitle variant="h3" color="orange">
              O Palco
            </ArchitecturalTitle>
            <ArchitecturalTitle variant="h2" color="light">
              Auditório AFRESP
            </ArchitecturalTitle>
            
            <div className="space-y-6 mt-8 text-gray-300 text-lg">
              <p>
                Um espaço moderno e confortável no coração de São Paulo, preparado para receber você com toda a estrutura necessária para um dia de imersão.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#C9A84C]">
                    <MapPin />
                  </div>
                  <div>
                    <strong className="block text-white">Localização Privilegiada</strong>
                    Av. Brig. Luís Antônio, 4843 - Jardim Paulista, SP
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#C9A84C]">
                    <Users />
                  </div>
                  <div>
                    <strong className="block text-white">Networking Exclusivo</strong>
                    Coffee break incluso para conexões de alto nível
                  </div>
                </li>
              </ul>
              
              <div className="pt-6">
                <a 
                  href="https://maps.app.goo.gl/xyz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-white transition-colors uppercase tracking-wider font-bold text-sm border-b border-[#C9A84C] pb-1"
                >
                  Ver no Google Maps <ArrowDown className="-rotate-90 w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group">
            {/* Google Maps Embed */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.786699368388!2d-46.66479692376166!3d-23.57604497879058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59e6f0a6b0b1%3A0x6f6b6b6b6b6b6b6b!2sAv.%20Brig.%20Lu%C3%ADs%20Ant%C3%B4nio%2C%204843%20-%20Jardim%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001401-002!5e0!3m2!1spt-BR!2sbr!4v1708450000000!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
            
            {/* Overlay interativo */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent pointer-events-none transition-colors duration-500" />
          </div>
        </div>
      </ArchitecturalSection>

      {/* DEPOIMENTOS */}
      <ArchitecturalSection variant="light">
        <div className="text-center mb-16">
          <ArchitecturalTitle variant="h3" color="purple">
            Depoimentos
          </ArchitecturalTitle>
          <ArchitecturalTitle variant="h2" color="purple">
            Quem Já Viveu a Experiência
          </ArchitecturalTitle>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <TestimonialCard 
            name="Ana Clara"
            role="Arquiteta"
            quote="A Inovando na Sua Obra mudou minha visão sobre gestão. Antes eu era refém da obra, hoje eu lidero o processo com segurança."
            image="https://randomuser.me/api/portraits/women/44.jpg"
          />
          <TestimonialCard 
            name="Beatriz Souza"
            role="Designer de Interiores"
            quote="Conteúdo denso, prático e direto ao ponto. Saí do evento com um plano de ação claro para aplicar no meu escritório na segunda-feira."
            image="https://randomuser.me/api/portraits/women/68.jpg"
          />
          <TestimonialCard 
            name="Carla Mendes"
            role="Engenheira"
            quote="Networking incrível e palestras de altíssimo nível. Valeu cada centavo do investimento. Já garanti meu lugar na próxima edição!"
            image="https://randomuser.me/api/portraits/women/32.jpg"
          />
        </div>

        {/* CTA after testimonials */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button onClick={scrollToInscricao} className="bg-[oklch(0.75_0.18_65)] text-white font-bold px-12 py-4 rounded-none uppercase tracking-wider text-sm hover:bg-[oklch(0.7_0.18_65)] transition-all shadow-lg hover:-translate-y-1">
            Inscreva-se Agora — R$ 147 →
          </button>
        </motion.div>
      </ArchitecturalSection>

      {/* FAQ */}
      <ArchitecturalSection variant="light">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <ArchitecturalTitle variant="h2" color="purple">
              Perguntas Frequentes
            </ArchitecturalTitle>
          </div>
          <FAQAccordion />
          
          {/* CTA after FAQ */}
          <div className="text-center mt-10">
            <button onClick={scrollToInscricao} className="bg-[oklch(0.35_0.12_320)] text-white font-bold px-10 py-4 rounded-none uppercase tracking-wider text-sm hover:bg-[oklch(0.3_0.12_320)] transition-all shadow-lg">
              Ainda tem dúvidas? Garanta sua vaga →
            </button>
          </div>
        </div>
      </ArchitecturalSection>

      {/* FOOTER */}
      <footer className="bg-[#1a1a1a] text-white py-16 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <img 
                src={logoTransparent} 
                alt="Além da Tendência" 
                className="w-48 mb-6 opacity-90"
              />
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                O evento presencial definitivo para arquitetas e designers que buscam gestão, lucratividade e segurança jurídica.
              </p>
            </div>
            
            <div>
              <h4 className="text-[#C9A84C] font-bold uppercase tracking-wider mb-6 text-sm">Links Rápidos</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><button onClick={() => document.getElementById("sobre")?.scrollIntoView({behavior: "smooth"})} className="hover:text-white transition-colors">O Conceito</button></li>
                <li><button onClick={() => document.getElementById("palestrantes")?.scrollIntoView({behavior: "smooth"})} className="hover:text-white transition-colors">Palestrantes</button></li>
                <li><button onClick={() => document.getElementById("conteudo")?.scrollIntoView({behavior: "smooth"})} className="hover:text-white transition-colors">Programação</button></li>
                <li><button onClick={() => document.getElementById("local")?.scrollIntoView({behavior: "smooth"})} className="hover:text-white transition-colors">Local</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[#C9A84C] font-bold uppercase tracking-wider mb-6 text-sm">Contato</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full"></span>
                  suporte@inovandonasuaobra.com.br
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full"></span>
                  (11) 5571-7229
                </li>
                <li className="mt-4 flex gap-4">
                  {/* Social Icons placeholder */}
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#C9A84C] transition-colors cursor-pointer">
                    <span className="sr-only">Instagram</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.373c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© 2025 Inovando na Sua Obra. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
