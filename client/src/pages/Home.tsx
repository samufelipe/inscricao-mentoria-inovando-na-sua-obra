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
import { ArrowDown, Calendar, Check, MapPin, Users } from "lucide-react";
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
      
      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://private-us-east-1.manuscdn.com/sessionFile/ZtfPFZ51JsThUuxV2egc5S/sandbox/pm6D7hFUMyE4Re5sQzA2Ul_1771419213630_na1fn_aGVyby1iZw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvWnRmUEZaNTFKc1RoVXV4VjJlZ2M1Uy9zYW5kYm94L3BtNkQ3aEZVTXlFNFJlNXNRekEyVWxfMTc3MTQxOTIxMzYzMF9uYTFmbl9hR1Z5YnkxaVp3LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=DAqWB4WETtG8Jck0Yr8Dc8S1w71hE5ITNv9xQ6O3SsvZlhp6LpKyMhP9sivOaBgT7exPXYC2Jm3bogRg~pdblY~Yc2-VSW41H6frjqqsHLyLAKsO~fIxGOLCHFvEztCW~U5au0dDs87Ajon3fsb21~~wKzoegsqrrXxhxVOADww2R2cAXjSurUaFM9nf21Tm6GIhrnYOhCR6Nn7I2rrrc-YIXL0TWsMgphp1bpDKDeCY6zHVXrUZ0IYTSWF~M169z3zk1S7eWonqMTSo6QW2fHNTpRUVQiwJKDeQ20HWciTIk0uvRTXp6NyVlo33Zn~PwPLRAMYQILMoQY4TWGkzjA__" 
            alt="Escritório de arquitetura elegante" 
            className="w-full h-full object-cover animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.35_0.12_320)]/90 via-[oklch(0.35_0.12_320)]/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8 text-white"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium tracking-wider uppercase">
              <span className="w-2 h-2 bg-[oklch(0.75_0.18_65)] rounded-full animate-pulse" />
              Evento Presencial em São Paulo
            </motion.div>
            
            <motion.div variants={fadeInUp} className="space-y-4">
              <ArchitecturalTitle variant="h1" className="text-white drop-shadow-lg leading-tight">
                ALÉM DA<br />TENDÊNCIA
              </ArchitecturalTitle>
              <p className="text-xl md:text-2xl font-light text-white/90 max-w-xl leading-relaxed border-l-4 border-[oklch(0.75_0.18_65)] pl-6">
                Como transformar inspiração em realidade através da gestão de escritório e obra.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 pt-4">
              <div className="flex items-center gap-3 text-white/80">
                <Calendar className="w-6 h-6 text-[oklch(0.75_0.18_65)]" />
                <div>
                  <p className="font-bold uppercase text-sm tracking-wider">Data</p>
                  <p className="text-lg">10 de Março de 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="w-6 h-6 text-[oklch(0.75_0.18_65)]" />
                <div>
                  <p className="font-bold uppercase text-sm tracking-wider">Local</p>
                  <p className="text-lg">Auditório AFRESP - SP</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="pt-8">
              <a href="#inscricao" className="block w-full sm:w-auto">
                <ArchitecturalButton variant="primary" className="text-lg px-10 py-8 shadow-2xl shadow-[oklch(0.75_0.18_65)]/30 w-full sm:w-auto justify-center">
                  GARANTA SUA VAGA - R$ 147,00
                </ArchitecturalButton>
              </a>
              <p className="mt-4 text-sm text-white/60 flex items-center gap-2 justify-center sm:justify-start">
                <Users className="w-4 h-4" /> Vagas limitadas a 200 participantes
              </p>
            </motion.div>
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
                <h4 className="font-serif text-2xl font-bold text-[oklch(0.35_0.12_320)] mb-2">Gestão de Escritório</h4>
                <p className="text-sm text-gray-500">Processos, contratos e posicionamento para crescer com segurança.</p>
              </div>
              <div className="p-6 bg-white shadow-lg border-t-4 border-[oklch(0.75_0.18_65)] hover:-translate-y-1 transition-transform duration-300">
                <h4 className="font-serif text-2xl font-bold text-[oklch(0.35_0.12_320)] mb-2">Gestão de Obra</h4>
                <p className="text-sm text-gray-500">Técnica, especificação e execução para entregar o que foi prometido.</p>
              </div>
            </motion.div>
          </div>
          
          <motion.div variants={fadeInUp} className="relative">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-[oklch(0.75_0.18_65)]/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[oklch(0.35_0.12_320)]/10 rounded-full blur-3xl animate-pulse delay-700" />
            
            <img 
              src="https://private-us-east-1.manuscdn.com/sessionFile/ZtfPFZ51JsThUuxV2egc5S/sandbox/pm6D7hFUMyE4Re5sQzA2Ul_1771419213631_na1fn_Z2VzdGFvLWVzY3JpdG9yaW8.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvWnRmUEZaNTFKc1RoVXV4VjJlZ2M1Uy9zYW5kYm94L3BtNkQ3aEZVTXlFNFJlNXNRekEyVWxfMTc3MTQxOTIxMzYzMV9uYTFmbl9aMlZ6ZEdGdkxXVnpZM0pwZEc5eWFXOC5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=culaMJ6zL8YiJ9~s-CFxhYrvatQfwfB9deEPQzC5SzKPvMzX9H3UvWbbE~9QMnBsLRVti7lHtVweS343Yd2PfCZ8y-pGiCUC~mbPEnge0jHcFTFswnmHXG9M1LEvKKtap5OM8Mlq3KvSDhesNV0qTTIQUb7ipmVzFlgBoDOFUvWUHQoNo1wgz1XIbdNUrhKoX6Egt03iJm4i0si2~rguZx78Zbj4USWmIPDH4BcH0FyOtonlkbBf-o1PXmlWgE3080hYAMVlnoIRC9T-v-NQe8RUCwMavSmFGG1YOAmqODa36g1p4L2EZNLHVDm64VrMaqz9mP4nzczCQMJaq6i95w__" 
              alt="Gestão de escritório de arquitetura" 
              className="relative z-10 w-full shadow-2xl border-8 border-white transform hover:scale-[1.02] transition-transform duration-500"
            />
            
            <div className="absolute -bottom-8 -left-8 bg-[oklch(0.35_0.12_320)] p-8 text-white max-w-xs shadow-xl z-20 hidden md:block">
              <p className="font-serif text-xl italic">"Autoridade não nasce da estética, nasce da base."</p>
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
            <ArchitecturalTitle variant="h3" color="orange">
              Público-Alvo
            </ArchitecturalTitle>
            <ArchitecturalTitle variant="h2" color="light">
              Este Evento é Para Você Que...
            </ArchitecturalTitle>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            {[
              "É arquiteta ou designer de interiores e quer ter (ou já tem) escritório próprio",
              "Sente que falta estrutura para transformar projetos em obras lucrativas",
              "Quer aprender gestão de escritório e obra com quem realmente executa",
              "Busca autoridade, consistência e crescimento sustentável na carreira",
              "Está cansada de apenas 'colocar lâmpadas' e quer criar atmosferas que transformam",
              "Precisa de segurança jurídica e contratos que protegem e valorizam seu trabalho"
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-[oklch(0.75_0.18_65)] flex items-center justify-center shrink-0 mt-1 group-hover:scale-110 transition-transform">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <p className="text-lg text-white/90">{item}</p>
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
        >
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <ArchitecturalTitle variant="h3" color="orange">
              Specialists
            </ArchitecturalTitle>
            <ArchitecturalTitle variant="h2" color="purple">
              Aprenda Com Quem Realmente Executa
            </ArchitecturalTitle>
            <p className="text-gray-600 text-lg">
              Reunimos 4 especialistas que vivem o dia a dia da arquitetura para compartilhar metodologias validadas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SpeakerCard 
              name="Juliana Campelo"
              role="Gestão Estratégica"
              description="Especialista em gestão estratégica para escritórios de arquitetura. Proprietária da MONU Arquitetura."
              socialProof="+500 escritórios mentorados"
              image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
            />
            <SpeakerCard 
              name="Luciana Guerra"
              role="Iluminação Técnica"
              description="Arquiteta especialista em iluminação. Missão de formar profissionais que criam atmosferas."
              socialProof="+2.500 alunos formados"
              image="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800"
            />
            <SpeakerCard 
              name="Marcia Pereira"
              role="Contratos Jurídicos"
              description="Advogada especializada em contratos para arquitetos. Traduz o 'juridiquês' para a linguagem de projeto."
              socialProof="Segurança jurídica e proteção"
              image="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800"
            />
            <SpeakerCard 
              name="Renata Fuentes"
              role="Rochas Naturais"
              description="Especialista em rochas. Consultoria personalizada para evitar erros que custam caro na obra."
              socialProof="Workshops exclusivos"
              image="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=800"
            />
          </div>
        </motion.div>
      </ArchitecturalSection>

      {/* O QUE VOCÊ VAI APRENDER */}
      <ArchitecturalSection variant="light" className="bg-gray-50">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8 sticky top-24 self-start">
            <ArchitecturalTitle variant="h3" color="orange">
              Conteúdo Programático
            </ArchitecturalTitle>
            <ArchitecturalTitle variant="h2" color="purple">
              4 Horas de Imersão Prática
            </ArchitecturalTitle>
            <p className="text-gray-600 text-lg leading-relaxed">
              Um conteúdo denso e direto ao ponto, estruturado para que você saia do evento com ferramentas aplicáveis imediatamente no seu escritório e nas suas obras.
            </p>
            <a href="#inscricao" className="block w-full sm:w-auto">
              <ArchitecturalButton variant="secondary">
                QUERO PARTICIPAR
              </ArchitecturalButton>
            </a>
          </div>

          <div className="space-y-6">
            <LearningModule 
              number="01"
              speaker="Juliana Campelo"
              title="Gestão de Escritório Lucrativo"
              description="Como estruturar processos que geram consistência, autoridade e lucro. Metodologia aplicada em mais de 500 escritórios de arquitetura pelo Brasil e exterior."
            />
            <LearningModule 
              number="02"
              speaker="Luciana Guerra"
              title="Iluminação Além do Básico"
              description="Metodologia exclusiva de cálculo e sensibilidade. Aprenda a criar atmosferas que valorizam o projeto e cuidam da saúde das pessoas, posicionando-se no mercado de luxo."
            />
            <LearningModule 
              number="03"
              speaker="Marcia Pereira"
              title="Contratos Blindados"
              description="Transforme seu contrato em uma ferramenta de posicionamento e venda. Aprenda a se proteger juridicamente e valorizar sua marca através de documentos claros e seguros."
            />
            <LearningModule 
              number="04"
              speaker="Renata Fuentes"
              title="Especificação de Rochas"
              description="Segurança técnica para especificar rochas naturais. Evite patologias, erros de execução e prejuízos na obra com conhecimento técnico aprofundado."
            />
          </div>
        </div>
      </ArchitecturalSection>

      {/* LOCAL */}
      <ArchitecturalSection variant="dark" className="pb-0">
        <div className="grid lg:grid-cols-2 gap-0">
          <div className="p-12 md:p-24 flex flex-col justify-center space-y-8">
            <ArchitecturalTitle variant="h3" color="orange">
              O Local
            </ArchitecturalTitle>
            <ArchitecturalTitle variant="h2" color="light">
              Auditório AFRESP
            </ArchitecturalTitle>
            <p className="text-white/80 text-lg leading-relaxed">
              Escolhemos um local com infraestrutura completa, conforto e fácil acesso na região da Avenida Paulista, o coração financeiro e cultural de São Paulo.
            </p>
            <ul className="space-y-4 text-white/70">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[oklch(0.75_0.18_65)]" />
                Auditório moderno e climatizado
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[oklch(0.75_0.18_65)]" />
                Equipamentos de áudio e vídeo de última geração
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[oklch(0.75_0.18_65)]" />
                Segurança e acessibilidade
              </li>
            </ul>
          </div>
          <div className="h-[500px] lg:h-auto w-full">
            <LocationMap />
          </div>
        </div>
      </ArchitecturalSection>

      {/* DEPOIMENTOS */}
      <ArchitecturalSection variant="light" className="bg-[oklch(0.97_0.01_95)]">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <ArchitecturalTitle variant="h3" color="orange">
            Prova Social
          </ArchitecturalTitle>
          <ArchitecturalTitle variant="h2" color="purple">
            O Que Dizem Nossas Alunas
          </ArchitecturalTitle>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <TestimonialCard 
            name="Ana Clara"
            role="Arquiteta"
            quote="A metodologia da Ju mudou completamente a forma como eu cobro meus projetos. Hoje tenho segurança e lucro real."
            image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
          />
          <TestimonialCard 
            name="Beatriz Silva"
            role="Designer de Interiores"
            quote="Eu tinha medo de obra. Depois de aprender gestão, a obra virou minha maior fonte de receita e satisfação do cliente."
            image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
          />
          <TestimonialCard 
            name="Carla Mendes"
            role="Arquiteta"
            quote="O contrato da Marcia salvou meu escritório de um prejuízo enorme. Vale cada centavo investir em conhecimento estrutural."
            image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
          />
        </div>
      </ArchitecturalSection>

      {/* INSCRIÇÃO */}
      <ArchitecturalSection variant="light" className="relative overflow-hidden" id="inscricao">
        <div className="absolute inset-0 bg-[oklch(0.35_0.12_320)]/5 skew-y-3 transform origin-top-left scale-110" />
        
        <div className="container relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <ArchitecturalTitle variant="h3" color="orange">
              Últimas Vagas
            </ArchitecturalTitle>
            <ArchitecturalTitle variant="h2" color="purple">
              Invista na Sua Carreira
            </ArchitecturalTitle>
            
            <div className="bg-white p-8 shadow-lg border border-gray-100">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-sm text-gray-500 line-through">De R$ 297,00</span>
                <span className="text-4xl font-bold text-[oklch(0.35_0.12_320)]">R$ 147,00</span>
              </div>
              <p className="text-gray-600 mb-6">Investimento único para 4 horas de imersão presencial.</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-green-500" />
                  Acesso completo ao evento presencial
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-green-500" />
                  Material de apoio exclusivo
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-green-500" />
                  Certificado de participação
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-green-500" />
                  Networking com até 200 profissionais
                </li>
              </ul>
            </div>
          </div>
          
          <div>
            <RegistrationForm />
          </div>
        </div>
      </ArchitecturalSection>

      {/* FAQ */}
      <ArchitecturalSection variant="light" className="bg-gray-50">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <ArchitecturalTitle variant="h2" color="purple">
            Perguntas Frequentes
          </ArchitecturalTitle>
        </div>
        <FAQAccordion />
      </ArchitecturalSection>

      {/* FOOTER */}
      <footer className="bg-[oklch(0.2_0.02_320)] text-white py-16 border-t border-white/10">
        <div className="container grid md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-6">
            <ArchitecturalTitle variant="h3" color="light">
              ALÉM DA TENDÊNCIA
            </ArchitecturalTitle>
            <p className="text-white/60 max-w-sm">
              O evento definitivo para arquitetas que buscam transformar inspiração em realidade através da gestão e estrutura.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-wider text-[oklch(0.75_0.18_65)]">Contato</h4>
            <ul className="space-y-2 text-white/60">
              <li>contato@inovandonasuaobra.com.br</li>
              <li>@inovandonasuaobra</li>
              <li>São Paulo - SP</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-wider text-[oklch(0.75_0.18_65)]">Legal</h4>
            <ul className="space-y-2 text-white/60">
              <li>Política de Privacidade</li>
              <li>Termos de Uso</li>
              <li>© 2026 Inovando na Sua Obra</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
