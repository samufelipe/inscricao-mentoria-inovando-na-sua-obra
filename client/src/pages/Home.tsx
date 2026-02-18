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
import { ArrowDown, Calendar, Check, MapPin, Users, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
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
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[oklch(0.2_0.02_320)] text-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            className="w-full h-full"
          >
            <img 
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663217190391/hero-bg.jpg" 
              alt="Escritório de arquitetura minimalista" 
              className="w-full h-full object-cover opacity-20"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.2_0.02_320)]/90 via-[oklch(0.2_0.02_320)]/70 to-[oklch(0.2_0.02_320)]" />
        </div>

        <div className="container relative z-10 pt-24 pb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-8">
              <div className="w-2 h-2 rounded-full bg-[oklch(0.75_0.18_65)] animate-pulse" />
              <span className="text-sm font-medium tracking-wide uppercase">Evento Presencial em São Paulo</span>
            </div>
            
            {/* Logo Oficial */}
            <div className="mb-8 max-w-[400px] w-full">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663217190391/AiIwiEKCNtnzEfRb.png" 
                alt="Além da Tendência - Logo Oficial" 
                className="w-full h-auto object-contain drop-shadow-2xl filter brightness-0 invert"
              />
            </div>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-10 font-light leading-relaxed border-l-4 border-[oklch(0.75_0.18_65)] pl-6">
              Como transformar inspiração em realidade através da gestão de escritório e obra.
            </p>

            <div className="flex flex-col md:flex-row gap-6 mb-12 text-sm font-medium tracking-wide uppercase bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm w-full md:w-auto">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-[oklch(0.75_0.18_65)]" />
                <div>
                  <span className="block text-xs text-white/60 mb-1">Data</span>
                  <span className="text-lg font-bold">10 de Março</span>
                </div>
              </div>
              <div className="w-px h-12 bg-white/20 hidden md:block mx-4" />
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-[oklch(0.75_0.18_65)]" />
                <div>
                  <span className="block text-xs text-white/60 mb-1">Local</span>
                  <span className="text-lg font-bold">Auditório AFRESP - SP</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
              <ArchitecturalButton 
                variant="primary"
                className="w-full sm:w-auto text-center justify-center py-8 text-lg shadow-[0_0_30px_rgba(243,156,18,0.3)] hover:shadow-[0_0_50px_rgba(243,156,18,0.5)] transition-all duration-300"
                onClick={() => {
                  const formSection = document.getElementById("inscricao");
                  if (formSection) {
                    formSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Garanta Sua Vaga - R$ 147,00
              </ArchitecturalButton>
              
              <p className="text-sm text-white/60 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[oklch(0.75_0.18_65)]" /> 
                Vagas limitadas a 200 participantes
              </p>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50"
        >
          <ArrowDown className="w-8 h-8" />
        </motion.div>
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

      {/* ANFITRIÃS (NOVA SEÇÃO) */}
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
              Um encontro desenhado para profissionais que buscam o próximo nível.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Arquitetas e Designers",
                desc: "Que já atuam no mercado e sentem a necessidade de profissionalizar a gestão."
              },
              {
                icon: Check,
                title: "Estudantes",
                desc: "Que desejam começar a carreira com o pé direito, entendendo a realidade do mercado."
              },
              {
                icon: MapPin,
                title: "Profissionais da Área",
                desc: "Engenheiras e gestoras que buscam aprimorar processos e networking."
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SpeakerCard 
              name="Luciana Guerra"
              role="Engenheira Civil"
              description="Especialista em patologias construtivas e gestão de obras de alto padrão."
              socialProof="Mais de 15 anos de experiência em obras complexas."
              image="https://files.manuscdn.com/user_upload_by_module/session_file/310519663217190391/luciana-guerra.jpg"
            />
            <SpeakerCard 
              name="Marcia Pereira"
              role="Arquiteta e Urbanista"
              description="Mentora de arquitetos e especialista em gestão de escritórios lucrativos."
              socialProof="Autora do método 'Escritório Lucrativo'."
              image="https://files.manuscdn.com/user_upload_by_module/session_file/310519663217190391/marcia-pereira.jpg"
            />
            <SpeakerCard 
              name="Renata Fuentes"
              role="Especialista em Iluminação"
              description="Lighting Designer premiada, transformando ambientes através da luz."
              socialProof="Projetos publicados em revistas internacionais."
              image="https://files.manuscdn.com/user_upload_by_module/session_file/310519663217190391/renata-fuentes.jpg"
            />
            <SpeakerCard 
              name="Convidada Especial"
              role="Surpresa"
              description="Uma das maiores autoridades em posicionamento de marca para arquitetos."
              socialProof="Revelação exclusiva no evento."
              image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
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
              title="Gestão de Processos"
              speaker="Marcia Pereira"
              description="Como organizar o fluxo de trabalho do escritório, desde o primeiro contato até a entrega final, garantindo eficiência e lucro."
            />
            <LearningModule 
              number="02"
              title="Gestão de Obras"
              speaker="Luciana Guerra"
              description="O passo a passo para gerenciar obras sem dor de cabeça, antecipando problemas e fidelizando clientes através da excelência técnica."
            />
            <LearningModule 
              number="03"
              title="Patologias Construtivas"
              speaker="Luciana Guerra"
              description="Aprenda a identificar e evitar os erros mais comuns em obras de interiores que podem destruir sua reputação."
            />
            <LearningModule 
              number="04"
              title="Posicionamento e Vendas"
              speaker="Convidada Especial"
              description="Como se posicionar como autoridade no mercado e atrair clientes que valorizam o seu trabalho (e pagam bem por ele)."
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
                  <p>Das 09h às 18h</p>
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

      {/* DEPOIMENTOS (PROVA SOCIAL) */}
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
                  <CheckCircle2 className="text-[oklch(0.75_0.18_65)]" /> Acesso completo ao dia de palestras
                </p>
                <p className="flex items-center gap-3">
                  <CheckCircle2 className="text-[oklch(0.75_0.18_65)]" /> Kit de boas-vindas exclusivo
                </p>
                <p className="flex items-center gap-3">
                  <CheckCircle2 className="text-[oklch(0.75_0.18_65)]" /> Certificado de participação
                </p>
                <p className="flex items-center gap-3">
                  <CheckCircle2 className="text-[oklch(0.75_0.18_65)]" /> Coffee break e networking
                </p>
              </div>

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

      {/* FOOTER */}
      <footer className="bg-[oklch(0.2_0.02_320)] text-white py-12 border-t border-white/10">
        <div className="container text-center space-y-6">
          <img 
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663217190391/AiIwiEKCNtnzEfRb.png" 
            alt="Além da Tendência" 
            className="h-12 w-auto mx-auto object-contain filter brightness-0 invert opacity-50 hover:opacity-100 transition-opacity duration-300"
          />
          <p className="text-white/40 text-sm">
            © 2026 Inovando na Sua Obra. Todos os direitos reservados.
          </p>
          <div className="flex justify-center gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
