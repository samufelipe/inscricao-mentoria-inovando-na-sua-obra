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
import { SponsorsSection } from "@/components/ui/sponsors-section";
import { HeroRegistrationForm } from "@/components/ui/hero-registration-form";
import { ArrowDown, Calendar, Check, MapPin, Users, CheckCircle2, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { AudienceMontageV2 } from "@/components/ui/audience-montage-v2";
import heroMain from "@/assets/alem-da-tendencia/hero-main.png";
import heroRight from "@/assets/alem-da-tendencia/hero-right.png";
import heroFar from "@/assets/alem-da-tendencia/hero-far.png";
import heroEvent from "@/assets/alem-da-tendencia/hero-event.png";
import logoTransparent from "@/assets/alem-da-tendencia/logo-transparent.png";
import inovandoObraImg from "@/assets/alem-da-tendencia/inovando-obra.png";
import julianaCapelo from "@/assets/alem-da-tendencia/juliana-capelo.jpg";
import lucianaGuerraImg from "@/assets/alem-da-tendencia/luciana-guerra-new.jpg";
import marciaPereira from "@/assets/alem-da-tendencia/marcia-pereira-new.png";

// Nova imagem das anfitriãs (será substituída pelo upload real)
const newHostsImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663217190391/vHxDiyaMsWHITuBB.png";
const videoUrl = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663217190391/BzRHClvGpXplcBna.mp4";

export default function AlemDaTendencia() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Além da Tendência - A Arquitetura Acontece nos Bastidores";

    const link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
    const prevFavicon = link?.href || "";
    if (link) link.href = "/favicon-alem-da-tendencia.png";

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
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-[oklch(0.97_0.01_95)] overflow-x-hidden w-full max-w-[100vw]">
      <StickyHeader />
      
      {/* HERO SECTION - COM NOVA IMAGEM E AJUSTES DE LEGIBILIDADE */}
      {/* HERO - MOBILE */}
      <section className="md:hidden bg-[#1a1a1a] flex flex-col">
        <div className="relative w-full aspect-[3/4] max-h-[65vh] overflow-hidden">
          <img
            src={newHostsImage}
            alt="Evento Além da Tendência - Anfitriãs"
            className="absolute inset-0 w-full h-full object-cover object-[center_top]"
          />
          {/* Gradiente reforçado para legibilidade no mobile */}
          <div 
            className="absolute inset-0 z-[10] pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(26,26,26,0.4) 0%, transparent 25%, transparent 50%, rgba(26,26,26,0.8) 75%, #1a1a1a 100%)' }}
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-6 left-0 right-0 z-20 flex justify-center"
          >
            <img 
              src={logoTransparent}
              alt="Além da Tendência - Logo Oficial" 
              className="w-[150px] h-auto object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
            />
          </motion.div>
        </div>

        <div className="relative z-20 px-4 py-6 flex flex-col gap-5 -mt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <div className="flex items-center gap-2 mb-3 text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold drop-shadow-md">
              <MapPin className="w-3 h-3" />
              <span>Evento Presencial</span>
              <span className="text-white/30">|</span>
              <span>São Paulo</span>
              <span className="text-white/30">|</span>
              <span>Durante a Revestir</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight mb-3 uppercase drop-shadow-lg">
              Como transformar <span className="text-[#C9A84C]">inspiração</span> em <span className="text-[#C9A84C]">realidade</span>
            </h1>
            
            <p className="text-sm text-gray-200 max-w-lg mb-3 font-light leading-relaxed border-l-4 border-[#C9A84C] pl-4 drop-shadow-md bg-black/20 p-2 rounded-r-lg backdrop-blur-sm">
              A Arquitetura acontece nos bastidores. Uma tarde inteira focada no outro lado da moeda dos escritórios de arquitetura, além da tendência: Gestão de escritório, Gestão de Obra e Projeto.
            </p>
            
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-4 font-medium">
              Evento por Inovando na sua obra @inovandonasuaobra e AjudaMONU @arq.julianacampelo
            </p>

            <div className="flex items-center gap-3 text-xs text-white/80 bg-black/60 backdrop-blur-md px-4 py-3 rounded-xl border border-white/15 w-full mb-4 shadow-lg">
              <Calendar className="w-4 h-4 text-[#C9A84C] shrink-0" />
              <span className="font-semibold text-white">10 de Março</span>
              <span className="text-white/30">|</span>
              <MapPin className="w-4 h-4 text-[#C9A84C] shrink-0" />
              <span className="font-semibold text-white">AFRESP - SP</span>
            </div>

            <button 
              onClick={() => document.getElementById("inscricao")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full bg-[#C9A84C] text-white font-bold py-4 rounded-lg uppercase tracking-wider text-sm hover:bg-[#b08d35] transition-all shadow-lg border border-[#C9A84C]/50"
            >
              Garantir meu ingresso
            </button>
          </motion.div>
        </div>
      </section>

      {/* HERO - DESKTOP */}
      <section className="hidden md:flex relative overflow-hidden bg-[#1a1a1a] min-h-[75vh] lg:min-h-[80vh] flex-col">
        <div className="absolute inset-0 overflow-hidden">
          {/* Background Image Full Width */}
          <img
            src={newHostsImage}
            alt="Evento Além da Tendência - Mentoras"
            className="absolute inset-0 w-full h-full object-cover z-[1]"
            style={{
              objectPosition: 'center 38%'
            }}
          />
          
          {/* Overlay Gradients para Legibilidade */}
          <div 
            className="absolute inset-0 z-[2] pointer-events-none"
            style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.2) 100%)' }}
          />
          <div 
            className="absolute inset-0 z-[2] pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 20%, transparent 80%, #1a1a1a 100%)' }}
          />
        </div>

        <div className="relative z-20 flex-1 flex flex-col container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-start pt-12"
          >
            <img 
              src={logoTransparent}
              alt="Além da Tendência - Logo Oficial" 
              className="w-[220px] h-auto object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
            />
          </motion.div>

          <div className="flex-1 min-h-[100px]" />

          <div className="grid lg:grid-cols-12 gap-12 items-end pb-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="col-span-7 flex flex-col items-start"
            >
              <div className="flex items-center gap-2 mb-4 text-sm uppercase tracking-[0.2em] text-[#C9A84C] font-semibold bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-lg">
                <MapPin className="w-4 h-4" />
                <span>Evento Presencial</span>
                <span className="text-white/30">|</span>
                <span>São Paulo</span>
                <span className="text-white/30">|</span>
                <span>Durante a Revestir</span>
              </div>

              <h1 className="font-display text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 uppercase drop-shadow-2xl">
                Como transformar <br/>
                <span className="text-[#C9A84C]">inspiração</span> em <span className="text-[#C9A84C]">realidade</span>
              </h1>
              
              <div className="border-l-4 border-[#C9A84C] pl-6 mb-8 bg-gradient-to-r from-black/60 to-transparent p-6 rounded-r-xl backdrop-blur-md shadow-xl max-w-2xl">
                <h2 className="text-2xl text-white font-bold mb-2 uppercase">A Arquitetura acontece nos bastidores</h2>
                <p className="text-lg text-gray-200 font-light leading-relaxed">
                  Uma tarde inteira focada no outro lado da moeda dos escritórios de arquitetura, além da tendência: <strong className="text-white">Gestão de escritório, Gestão de Obra e Projeto.</strong>
                </p>
              </div>
              
              <p className="text-sm text-gray-300 uppercase tracking-wider mb-8 font-medium bg-black/20 p-2 rounded inline-block backdrop-blur-sm">
                Evento por Inovando na sua obra <span className="text-[#C9A84C]">@inovandonasuaobra</span> e AjudaMONU <span className="text-[#C9A84C]">@arq.julianacampelo</span>
              </p>

              <div className="flex gap-6 items-center">
                <div className="flex items-center gap-6 text-sm font-medium tracking-wide uppercase bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/15 shadow-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#C9A84C]" />
                    <div>
                      <span className="block text-xs text-gray-400 mb-0.5">Data</span>
                      <span className="text-base font-bold text-white">10 de Março</span>
                    </div>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#C9A84C]" />
                    <div>
                      <span className="block text-xs text-gray-400 mb-0.5">Local</span>
                      <span className="text-base font-bold text-white">Auditório AFRESP - SP</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => document.getElementById("inscricao")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-[#C9A84C] text-white font-bold px-10 py-5 rounded-xl uppercase tracking-wider text-base hover:bg-[#b08d35] transition-all shadow-lg hover:-translate-y-1 hover:shadow-[#C9A84C]/20 border border-[#C9A84C]/50"
                >
                  Garantir meu ingresso
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ScarcityBanner />

      {/* SEÇÃO 2 - CONCEITO (COM NOVA IMAGEM) */}
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
              <h3 className="text-xl md:text-2xl font-bold text-[#C9A84C] uppercase tracking-wider mb-4 leading-snug">
                Você não precisa escolher entre criar com beleza e entregar com eficiência. As duas coisas caminham juntas quando existe método.
              </h3>
              <ArchitecturalTitle variant="h2" color="purple" className="!text-3xl md:!text-4xl">
                Tendência Encanta.<br />Estrutura Constrói.
              </ArchitecturalTitle>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="text-gray-600 space-y-6 text-lg leading-relaxed">
              <p>
                <strong>Além da Tendência</strong> é um evento presencial que acontece junto à semana da Expo Revestir como um complemento perfeito para arquitetos e designers de interiores que querem aprofundar seus conhecimentos além das tendências.
              </p>
              <p>
                Transformar inspiração em realidade exige estrutura e conhecimento técnico e é isso que você vai ver no evento:
              </p>
              
              <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#C9A84C]">
                <p className="font-bold text-gray-800 mb-4 uppercase tracking-wide">Um aprofundamento em:</p>
                <ul className="space-y-3">
                  {[
                    "Gestão de Escritório",
                    "Gestão de Obras",
                    "Projeto"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#C9A84C] flex items-center justify-center text-white shadow-sm">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-gray-800 font-bold text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-gray-500 italic">Os 3 grandes pilares que sustentam um escritório.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="pt-4">
              <ArchitecturalButton onClick={scrollToInscricao}>
                QUERO PROFISSIONALIZAR MEU ESCRITÓRIO
              </ArchitecturalButton>
            </motion.div>
          </div>

          {/* Imagem Ilustrativa Conceitual - Substituída pela nova foto */}
          <motion.div variants={fadeInUp} className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
             <img 
               src={newHostsImage} 
               alt="Conceito do Evento" 
               className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
             <div className="absolute bottom-8 left-8 right-8 text-white">
               <p className="text-lg font-light italic">"Não existe arquitetura sem gestão. Não existe obra sem processo."</p>
             </div>
          </motion.div>
        </motion.div>
      </ArchitecturalSection>

      {/* SEÇÃO 3 - PÚBLICO-ALVO (REVERTIDA ESTRUTURA, MANTIDA COPY PDF) */}
      <ArchitecturalSection id="publico" variant="dark" className="relative overflow-hidden">
        <div className="text-center mb-12 relative z-10">
          <div className="inline-block border-b-2 border-[#C9A84C] pb-2 mb-4">
            <h3 className="text-[#C9A84C] font-bold uppercase tracking-widest text-sm">
              Público-Alvo
            </h3>
          </div>
          <ArchitecturalTitle variant="h2" color="light" className="!text-3xl md:!text-4xl">
            Para Quem É Este Evento?
          </ArchitecturalTitle>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <AudienceMontageV2 />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h4 className="text-2xl text-white font-light">
              Arquitetos e Designers de Interiores que:
            </h4>
            
            <ul className="space-y-6">
              {[
                "Têm o próprio escritório e querem crescer, com equipe ou sem, home office ou físico",
                "Sonham em ter o próprio escritório com segurança",
                "Sabem que a parte mais difícil do escritório está nos bastidores, onde ninguém vê",
                "Querem aprofundar seus conhecimentos além das tendências"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <span className="w-8 h-8 rounded-full bg-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C] mt-0.5 group-hover:bg-[#C9A84C] group-hover:text-white transition-colors">
                    <Check className="w-5 h-5" />
                  </span>
                  <span className="text-gray-300 text-lg font-light group-hover:text-white transition-colors">{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-white/10">
              <p className="text-white text-lg mb-6 font-medium">Se você se identificou, o próximo passo é simples:</p>
              <button 
                onClick={scrollToInscricao}
                className="bg-[#C9A84C] text-white font-bold px-10 py-4 rounded-lg uppercase tracking-wider text-sm hover:bg-[#b08d35] transition-all shadow-lg w-full sm:w-auto"
              >
                Garantir minha vaga
              </button>
            </div>
          </motion.div>
        </div>
      </ArchitecturalSection>

      {/* ANFITRIÃS */}
      <HostsSection />

      {/* PALESTRANTES - RESTAURADA E INTEGRADA */}
      <ArchitecturalSection id="palestrantes" variant="light" className="bg-gray-50 border-t border-gray-200">
        <div className="text-center mb-16">
          <p className="text-[#C9A84C] font-bold tracking-widest uppercase text-sm mb-2">
            Especialistas Convidadas
          </p>
          <ArchitecturalTitle variant="h2" color="purple">
            Conteúdo de Alto Nível
          </ArchitecturalTitle>
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto font-light">
            Além das anfitriãs, trouxemos referências do mercado para complementar sua visão estratégica.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <SpeakerCard 
            name="Luciana Guerra"
            role="Especialista em Iluminação"
            description="Arquiteta especialista em iluminação, vai te ensinar como valorizar seus projetos e evitar erros comuns que comprometem o resultado final."
            image={lucianaGuerraImg}
            socialProof="Referência em Lighting Design"
          />
          <SpeakerCard 
            name="Márcia Pereira"
            role="Advogada Especialista"
            description="Advogada focada em arquitetura e design, trará a segurança jurídica que seu escritório precisa para fechar contratos blindados."
            image={marciaPereira}
            socialProof="Proteção Jurídica para Arquitetos"
          />
        </div>
      </ArchitecturalSection>

      {/* INFORMAÇÕES IMPORTANTES */}
      <ArchitecturalSection id="local" variant="dark" className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <ArchitecturalTitle variant="h3" color="orange">
              INFORMAÇÕES IMPORTANTES
            </ArchitecturalTitle>
            <ArchitecturalTitle variant="h2" color="light">
              Auditório AFRESP
            </ArchitecturalTitle>
            
            <div className="space-y-6 mt-8 text-gray-300 text-lg">
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#C9A84C] shrink-0">
                    <MapPin />
                  </div>
                  <div>
                    <strong className="block text-white text-xl mb-1">Localização</strong>
                    Av. Brig. Luís Antônio, 4843 - Jardim Paulista, SP
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#C9A84C] shrink-0">
                    <Calendar />
                  </div>
                  <div>
                    <strong className="block text-white text-xl mb-1">Data</strong>
                    10.03.2026 - Terça-feira
                    <span className="block text-sm text-gray-400 mt-1">Horário: 13h30 às 19h</span>
                    <span className="block text-xs text-[#C9A84C] mt-1 uppercase tracking-wider font-bold">Chegue cedo para não perder as palestras</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#C9A84C] shrink-0">
                    <Users />
                  </div>
                  <div>
                    <strong className="block text-white text-xl mb-1">Networking Exclusivo</strong>
                    Coffee break incluso para conexões de alto nível
                  </div>
                </li>
              </ul>
              
              <div className="pt-8">
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
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.786699368388!2d-46.66479692376166!3d-23.57604497879058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59e6f0a6b0b1%3A0x6f6b6b6b6b6b6b6b!2sAv.%20Brig.%20Lu%C3%ADs%20Ant%C3%B4nio%2C%204843%20-%20Jardim%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001401-002!5e0!3m2!1spt-BR!2sbr!4v1708450000000!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="transition-all duration-700"
            ></iframe>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent pointer-events-none transition-colors duration-500" />
          </div>
        </div>
      </ArchitecturalSection>

      {/* PREÇO - BACKGROUND DARK/CINEMÁTICO */}
      <section id="inscricao" className="py-20 bg-[#1a1a1a] relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/10 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-black p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                <img 
                  src={logoTransparent} 
                  alt="Além da Tendência" 
                  className="w-40 mx-auto mb-4 relative z-10"
                />
                <div className="inline-block bg-[#C9A84C] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest relative z-10">
                  Lote 01
                </div>
              </div>
              
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-[#C9A84C]" />
                    <span className="font-medium">Acesso ao evento presencial dia 10.03</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-[#C9A84C]" />
                    <span className="font-medium">Coffee break com networking</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-[#C9A84C]" />
                    <span className="font-medium">Certificado de participação</span>
                  </li>
                </ul>

                <div className="text-center mb-8">
                  <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Por apenas</p>
                  <div className="flex items-center justify-center gap-1 text-[#1a1a1a]">
                    <span className="text-2xl font-bold">R$</span>
                    <span className="text-6xl font-bold tracking-tighter">147</span>
                    <span className="text-2xl font-bold">,00</span>
                  </div>
                </div>

                <HeroRegistrationForm />
                
                <p className="text-center text-xs text-gray-400 mt-4">
                  Pagamento seguro via Sympla. Vagas limitadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS - VÍDEO ÚNICO E TÍTULO AJUSTADO */}
      <ArchitecturalSection variant="light">
        <div className="text-center mb-12">
          <ArchitecturalTitle variant="h2" color="purple">
            Quem Já Viveu a Experiência
          </ArchitecturalTitle>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black relative group border-4 border-white">
            <video 
              src={videoUrl} 
              controls 
              className="w-full h-full object-cover"
              poster={heroEvent} // Usando imagem do evento como poster
            >
              Seu navegador não suporta o elemento de vídeo.
            </video>
          </div>
          <p className="text-center text-gray-500 mt-4 italic">
            Confira os melhores momentos da nossa última edição
          </p>
        </div>
      </ArchitecturalSection>

      {/* FAQ */}
      <ArchitecturalSection variant="light" className="bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <ArchitecturalTitle variant="h2" color="purple">
              Perguntas Frequentes
            </ArchitecturalTitle>
          </div>
          <FAQAccordion />
          
          <div className="text-center mt-10">
            <p className="text-gray-600 mb-4">Ainda tem dúvidas?</p>
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-8 py-3 rounded-full uppercase tracking-wider text-sm hover:bg-[#128C7E] transition-all shadow-lg hover:-translate-y-1"
            >
              Ir para o WhatsApp
            </a>
          </div>
        </div>
      </ArchitecturalSection>

      {/* SPONSORS - BACKGROUND DARK/CINEMÁTICO */}
      <SponsorsSection />

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
                <li><button onClick={() => document.getElementById("local")?.scrollIntoView({behavior: "smooth"})} className="hover:text-white transition-colors">Local</button></li>
                <li><button onClick={() => document.getElementById("inscricao")?.scrollIntoView({behavior: "smooth"})} className="hover:text-white transition-colors">Inscrição</button></li>
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
