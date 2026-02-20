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
import { AudienceMontage } from "@/components/ui/audience-montage";
import heroMain from "@/assets/alem-da-tendencia/hero-main.png";
import heroLeft from "@/assets/alem-da-tendencia/hero-left.png";
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
            className="hidden md:block absolute left-0 top-0 w-[28%] h-full object-cover object-[center_20%] opacity-70"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, black 0%, black 40%, transparent 95%)',
              maskImage: 'linear-gradient(to right, black 0%, black 40%, transparent 95%)',
            }}
          />
          {/* Camada 2: Left image - hidden on mobile */}
          <img
            src={heroLeft}
            alt=""
            className="hidden md:block absolute left-[8%] top-0 w-[40%] h-full object-cover object-[center_20%] z-[2]"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 55%, transparent 92%)',
              maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 55%, transparent 92%)',
            }}
          />
          {/* Camada 3: CENTRAL principal - larger on mobile */}
          <img
            src={heroMain}
            alt="Evento Além da Tendência - Mentoras"
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[95%] md:w-[58%] h-full object-cover object-[center_15%] z-[3]"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            }}
          />
          {/* Camada 4: Right image - hidden on mobile */}
          <img
            src={heroRight}
            alt=""
            className="hidden md:block absolute right-0 top-0 w-[35%] h-full object-cover object-[center_20%] z-[2]"
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
          {/* Radial vignette */}
          <div
            className="absolute inset-0 z-[11] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)' }}
          />
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
              <h1 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 uppercase">
                Inspiração Sem Gestão É Só Tendência Que{" "}
                <span className="text-[#C9A84C]">Não Sai do Papel</span>
              </h1>
              <p className="text-sm md:text-base text-gray-300 max-w-lg mb-4 font-light leading-relaxed border-l-4 border-[#C9A84C] pl-5">
                4 especialistas. 4 horas. Tudo o que você precisa para sair da ExpoRevestir com um plano real de gestão de obra, escritório, iluminação e contratos.
              </p>
              <p className="text-xs md:text-sm text-[#C9A84C] font-semibold uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                Apenas 297 lugares — Lote Promocional com 50% OFF
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm font-medium tracking-wide uppercase bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/15 w-full sm:w-auto">
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
              <div className="backdrop-blur-md bg-white/10 border border-white/15 rounded-2xl p-1">
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
      <ArchitecturalSection variant="light" className="relative">
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
            
            <motion.div variants={fadeInUp} className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                A ExpoRevestir apresenta lançamentos. Mostra possibilidades. Desperta ideias.
                Mas para que uma tendência saia do stand e vire obra executada e cliente satisfeito, é preciso estrutura.
              </p>
              <p className="font-medium text-[oklch(0.35_0.12_320)] border-l-4 border-[oklch(0.35_0.12_320)] pl-6 py-2 bg-purple-50/50">
                Além da Tendência é um evento voltado para arquitetas que entendem que inspiração é apenas o ponto de partida.
              </p>
              <p>
                Para transformar referências em projetos viáveis, obras bem conduzidas e crescimento sustentável, é preciso dominar aquilo que sustenta a profissão: <strong>gestão de escritório e gestão de obra.</strong>
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6 pt-4">
              <div className="p-6 bg-white shadow-lg border-t-4 border-[oklch(0.35_0.12_320)] hover:-translate-y-1 transition-transform duration-300">
                <h4 className="font-display text-2xl font-bold text-[oklch(0.35_0.12_320)] mb-2 uppercase">Gestão de Escritório</h4>
                <p className="text-sm text-gray-500">Processos, contratos e posicionamento para crescer com segurança.</p>
              </div>
              <div className="p-6 bg-white shadow-lg border-t-4 border-[oklch(0.75_0.18_65)] hover:-translate-y-1 transition-transform duration-300">
                <h4 className="font-display text-2xl font-bold text-[oklch(0.35_0.12_320)] mb-2 uppercase">Gestão de Obra</h4>
                <p className="text-sm text-gray-500">Técnica, especificação e execução para entregar o que foi prometido.</p>
              </div>
            </motion.div>
          </div>
          
          <motion.div variants={fadeInUp} className="relative">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-[oklch(0.75_0.18_65)]/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[oklch(0.35_0.12_320)]/10 rounded-full blur-3xl animate-pulse delay-700" />
            
            <img 
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663217190391/gestao-escritorio.jpg" 
              alt="Gestão de escritório de arquitetura" 
              className="relative z-10 w-full shadow-2xl border-8 border-white transform hover:scale-[1.02] transition-transform duration-500"
            />
            
            <div className="absolute -bottom-8 -left-8 bg-[oklch(0.35_0.12_320)] p-8 text-white max-w-xs shadow-xl z-20 hidden md:block">
              <p className="font-display text-xl italic">"Autoridade não nasce da estética, nasce da base."</p>
            </div>
          </motion.div>
        </motion.div>
      </ArchitecturalSection>

      {/* ANFITRIÃS */}
      <HostsSection />

      {/* PARA QUEM É */}
      <ArchitecturalSection variant="dark" className="text-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto space-y-12"
        >
          <motion.div variants={fadeInUp} className="space-y-4">
            <ArchitecturalTitle variant="h2" color="orange" className="mx-auto">
              Para Quem é Este Evento?
            </ArchitecturalTitle>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Você sai da ExpoRevestir cheia de ideias... mas na segunda-feira, a realidade do escritório e da obra continua a mesma?
            </p>
          </motion.div>

          {/* Montagem cinematográfica de fotos reais com parallax */}
          <AudienceMontage />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Arquitetas e Designers",
                desc: "Que atuam no mercado mas sentem que a gestão do escritório e da obra ainda é o calcanhar de Aquiles."
              },
              {
                icon: Check,
                title: "Quem Quer Ter Escritório Próprio",
                desc: "Que desejam começar com base sólida — não apenas com portfólio bonito, mas com processos, contratos e método."
              },
              {
                icon: MapPin,
                title: "Profissionais que Gerenciam Obras",
                desc: "Engenheiras e arquitetas que precisam dominar a execução para entregar o que foi prometido no projeto."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors duration-300 group"
              >
                <div className="w-16 h-16 bg-[oklch(0.75_0.18_65)]/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-8 h-8 text-[oklch(0.75_0.18_65)]" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-4 uppercase">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </ArchitecturalSection>

      {/* PALESTRANTES */}
      <ArchitecturalSection variant="light">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-16"
        >
          <div className="text-center max-w-3xl mx-auto">
            <ArchitecturalTitle variant="h3" color="orange">
              Line-up Exclusivo
            </ArchitecturalTitle>
            <ArchitecturalTitle variant="h2" color="purple">
              Quem Vai Guiar Você
            </ArchitecturalTitle>
            <p className="mt-6 text-lg text-gray-600">
              Reunimos especialistas que vivem o campo de batalha da arquitetura e engenharia todos os dias.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <SpeakerCard 
              name="Luciana Guerra"
              role="Especialista em Iluminação"
              description="Arquiteta e Urbanista especialista em iluminação. Defende que a luz é o elemento mais importante de qualquer espaço. Mentora de profissionais de elite com metodologia exclusiva de cálculo e sensibilidade."
              socialProof="64,1 mil seguidores • 2.500+ alunos formados"
              image={lucianaGuerraImg}
            />
            <SpeakerCard 
              name="Marcia Pereira"
              role="Advogada — Contratos para Arquitetos"
              description="Especialista em unir segurança jurídica e identidade profissional. Traduz o 'juridiquês' para a linguagem do projeto, ajudando escritórios a criarem contratos que valorizam a marca e protegem o profissional."
              socialProof="Referência em contratos de arquitetura"
              image={marciaPereira}
            />
          </div>
        </motion.div>
      </ArchitecturalSection>

      {/* CONTEÚDO / MÓDULOS */}
      <ArchitecturalSection variant="purple" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative z-10 max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <ArchitecturalTitle variant="h2" color="light">
              O Que Você Vai Aprender
            </ArchitecturalTitle>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <LearningModule 
              number="01"
              title="Gestão de Obra"
              speaker="Ingrid Zarza & Fernanda Bradaschia"
              description="Como gerenciar obras de interiores com segurança e lucro — do planejamento à entrega final, antecipando problemas e fidelizando clientes."
            />
            <LearningModule 
              number="02"
              title="Gestão de Escritório"
              speaker="Juliana Campelo"
              description="Estratégias práticas para estruturar seu escritório de arquitetura com processos, precificação e posicionamento que geram lucro e consistência."
            />
            <LearningModule 
              number="03"
              title="Iluminação que Transforma"
              speaker="Luciana Guerra"
              description="Iluminar é mais do que escolher luminária. Unindo ciência, saúde e estética para criar atmosferas que elevam qualquer projeto."
            />
            <LearningModule 
              number="04"
              title="Contratos que Protegem"
              speaker="Marcia Pereira"
              description="Como criar contratos que comunicam com clareza, valorizam sua marca e fortalecem a relação com os clientes — sem juridiquês."
            />
          </div>
        </motion.div>
      </ArchitecturalSection>

      {/* LOCAL */}
      <ArchitecturalSection variant="light">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-8">
            <ArchitecturalTitle variant="h3" color="orange">
              O Palco
            </ArchitecturalTitle>
            <ArchitecturalTitle variant="h2" color="purple">
              Auditório AFRESP
            </ArchitecturalTitle>
            
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                Um espaço moderno e confortável, localizado no coração de São Paulo, preparado para receber você com toda a infraestrutura necessária para um dia de imersão.
              </p>
              
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[oklch(0.75_0.18_65)] mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-[oklch(0.35_0.12_320)]">Endereço</h4>
                  <p>Av. Brigadeiro Luís Antônio, 4843 - Jardim Paulista, São Paulo - SP</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Calendar className="w-6 h-6 text-[oklch(0.75_0.18_65)] mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-[oklch(0.35_0.12_320)]">Data e Horário</h4>
                  <p>10 de Março de 2026</p>
                  <p>Das 14h às 18h</p>
                </div>
              </div>
            </div>

            <ArchitecturalButton 
              variant="outline" 
              className="mt-4"
              onClick={() => window.open("https://maps.google.com/?q=Av.+Brigadeiro+Luís+Antônio,+4843+-+Jardim+Paulista,+São+Paulo+-+SP", "_blank")}
            >
              Ver no Google Maps
            </ArchitecturalButton>
          </div>

          <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-2xl border-4 border-white">
            <LocationMap />
          </div>
        </motion.div>
      </ArchitecturalSection>

      {/* DEPOIMENTOS */}
      <ArchitecturalSection variant="dark" className="bg-[oklch(0.2_0.02_320)]">
        <div className="text-center mb-16">
          <ArchitecturalTitle variant="h2" color="light">
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
        </div>
      </ArchitecturalSection>

      {/* INSCRIÇÃO / CTA FINAL */}
      <section id="inscricao" className="py-20 bg-[oklch(0.35_0.12_320)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight uppercase">
                Garanta Seu Lugar <br />
                <span className="text-[oklch(0.75_0.18_65)]">Agora Mesmo</span>
              </h2>
              
              <div className="space-y-4 text-lg text-white/80">
                <p className="flex items-center gap-3">
                  <CheckCircle2 className="text-[oklch(0.75_0.18_65)]" /> 4 palestras com especialistas referência
                </p>
                <p className="flex items-center gap-3">
                  <CheckCircle2 className="text-[oklch(0.75_0.18_65)]" /> Gestão de obra + escritório + iluminação + contratos
                </p>
                <p className="flex items-center gap-3">
                  <CheckCircle2 className="text-[oklch(0.75_0.18_65)]" /> Coffee break e networking presencial
                </p>
                <p className="flex items-center gap-3">
                  <CheckCircle2 className="text-[oklch(0.75_0.18_65)]" /> Certificado de participação
                </p>
              </div>

              <p className="text-sm text-white/50 flex items-center gap-2 pt-2">
                <Users className="w-4 h-4" /> Auditório AFRESP — Capacidade máxima: 297 lugares
              </p>

              <div className="pt-8">
                <p className="text-sm uppercase tracking-widest text-white/60 mb-2">Investimento Único</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl text-white/60 line-through">R$ 297,00</span>
                  <span className="text-6xl font-bold text-white">R$ 147,00</span>
                </div>
                <p className="text-sm text-[oklch(0.75_0.18_65)] mt-2 font-medium">Lote Promocional por Tempo Limitado</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-2xl text-gray-800">
              <h3 className="font-display text-2xl font-bold text-[oklch(0.35_0.12_320)] mb-6 text-center uppercase">
                Preencha para Garantir
              </h3>
              <RegistrationForm />
              <p className="text-xs text-center text-gray-400 mt-4">
                Seus dados estão seguros. Ao clicar, você será redirecionado para o WhatsApp da nossa equipe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PARCEIROS E PATROCINADORES */}
      <ArchitecturalSection variant="light" className="py-16">
        <div className="text-center mb-12">
          <ArchitecturalTitle variant="h3" color="orange">
            Quem Apoia
          </ArchitecturalTitle>
          <ArchitecturalTitle variant="h2" color="purple">
            Parceiros e Patrocinadores
          </ArchitecturalTitle>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto items-center">
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i}
              className="h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200 hover:border-[oklch(0.75_0.18_65)] transition-colors duration-300"
            >
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Logo em breve</span>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-400 mt-8">
          Interessado em patrocinar? Entre em contato pelo nosso WhatsApp.
        </p>
      </ArchitecturalSection>

      {/* FOOTER */}
      <footer className="bg-[oklch(0.2_0.02_320)] text-white pt-20 pb-10 border-t border-white/10">
        <div className="container grid md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6 text-left">
            <img 
              src={logoTransparent}
              alt="Além da Tendência" 
              className="h-16 w-auto object-contain object-left opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
            <p className="text-white/60 text-sm leading-relaxed">
              O evento definitivo para arquitetas que buscam transformar inspiração em realidade através da gestão de escritório e obra.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[oklch(0.75_0.18_65)] transition-colors duration-300 group">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5 text-white/60 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.53c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[oklch(0.75_0.18_65)] transition-colors duration-300 group">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5 text-white/60 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-[oklch(0.75_0.18_65)] uppercase tracking-wider">Navegação</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[oklch(0.75_0.18_65)] rounded-full"></span> Início</a></li>
              <li><a href="#sobre" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[oklch(0.75_0.18_65)] rounded-full"></span> Sobre o Evento</a></li>
              <li><a href="#palestrantes" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[oklch(0.75_0.18_65)] rounded-full"></span> Palestrantes</a></li>
              <li><a href="#inscricao" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[oklch(0.75_0.18_65)] rounded-full"></span> Inscrição</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-[oklch(0.75_0.18_65)] uppercase tracking-wider">Contato</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[oklch(0.75_0.18_65)] shrink-0" />
                <span>Auditório AFRESP<br />Av. Brig. Luís Antônio, 4843<br />Jardim Paulista, São Paulo - SP</span>
              </li>
              <li className="flex items-center gap-3">
                <Users className="w-5 h-5 text-[oklch(0.75_0.18_65)] shrink-0" />
                <span>suporte@inovandonasuaobra.com.br</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-[oklch(0.75_0.18_65)] uppercase tracking-wider">Inscreva-se</h4>
            <p className="text-white/60 text-sm mb-4">Receba novidades e conteúdos exclusivos sobre gestão de obras.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="bg-white/5 border border-white/10 rounded px-4 py-2 text-sm text-white w-full focus:outline-none focus:border-[oklch(0.75_0.18_65)] transition-colors"
              />
              <button className="bg-[oklch(0.75_0.18_65)] text-white px-4 py-2 rounded hover:bg-[oklch(0.7_0.18_65)] transition-colors">
                <ArrowDown className="w-4 h-4 -rotate-90" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="container pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© 2026 Inovando na Sua Obra. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
