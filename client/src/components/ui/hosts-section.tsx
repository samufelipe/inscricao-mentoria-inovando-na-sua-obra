import { ArchitecturalTitle } from "./architectural-title";
import { cn } from "@/lib/utils";

export function HostsSection() {
  return (
    <section className="relative py-12 md:py-32 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[oklch(0.97_0.01_95)] -skew-x-12 translate-x-1/4 z-0" />
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className="relative group">
            <div className="absolute inset-0 bg-[oklch(0.35_0.12_320)] translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
            <div className="relative aspect-[4/5] overflow-hidden border-4 border-white shadow-2xl">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663217190391/LAKSQEpLPcJkePXw.jpg" 
                alt="Anfitriãs: Ingrid Zarza, Fernanda Bradaschia e Juliana Campelo" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Names Overlay */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
                <div className="flex flex-col sm:flex-row justify-between text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase gap-1 sm:gap-0">
                  <span>Ingrid Zarza</span>
                  <span>Fernanda Bradaschia</span>
                  <span>Juliana Campelo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-[oklch(0.75_0.18_65)] font-bold tracking-widest uppercase text-sm">
                Suas Anfitriãs
              </p>
              <ArchitecturalTitle variant="h2" color="purple">
                Unidas Pelo Propósito
              </ArchitecturalTitle>
            </div>

            <div className="space-y-4 sm:space-y-6 text-gray-600 text-base sm:text-lg leading-relaxed font-light">
              <p>
                <span className="text-[oklch(0.35_0.12_320)] font-medium">Nós três representamos o bastidor que sustenta uma carreira sólida.</span>
              </p>
              
              <p>
                Enquanto o mercado se encanta com tendências, lançamentos e vitrines como a Expo Revestir e a Casa Cor, nós defendemos aquilo que realmente transforma a trajetória de uma arquiteta: <strong>gestão de escritório e gestão de obra.</strong>
              </p>
              
              <p className="border-l-4 border-[oklch(0.75_0.18_65)] pl-6 italic text-gray-800">
                "Porque antes do projeto fotografado, existe organização, método, responsabilidade e estrutura."
              </p>

              {/* Metrics - Inovando na Sua Obra */}
              <div className="pt-6">
                <p className="font-display text-sm font-bold tracking-widest uppercase text-[oklch(0.35_0.12_320)] mb-4">Inovando na Sua Obra</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-[oklch(0.97_0.01_95)] rounded-lg">
                    <p className="font-display text-2xl font-bold text-[oklch(0.35_0.12_320)]">55mil+</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Seguidores no Instagram</p>
                  </div>
                  <div className="text-center p-4 bg-[oklch(0.97_0.01_95)] rounded-lg">
                    <p className="font-display text-2xl font-bold text-[oklch(0.35_0.12_320)]">250+</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Obras Concluídas</p>
                  </div>
                  <div className="text-center p-4 bg-[oklch(0.97_0.01_95)] rounded-lg">
                    <p className="font-display text-2xl font-bold text-[oklch(0.35_0.12_320)]">200+</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Alunas na Mentoria</p>
                  </div>
                </div>
              </div>

              {/* Metrics - Juliana Capelo */}
              <div className="pt-2">
                <p className="font-display text-sm font-bold tracking-widest uppercase text-[oklch(0.35_0.12_320)] mb-4">Juliana Capelo</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-[oklch(0.97_0.01_95)] rounded-lg">
                    <p className="font-display text-2xl font-bold text-[oklch(0.35_0.12_320)]">500+</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Escritórios Atendidos</p>
                  </div>
                  <div className="text-center p-4 bg-[oklch(0.97_0.01_95)] rounded-lg">
                    <p className="font-display text-2xl font-bold text-[oklch(0.35_0.12_320)]">2000+</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Alunos</p>
                  </div>
                  <div className="text-center p-4 bg-[oklch(0.97_0.01_95)] rounded-lg">
                    <p className="font-display text-2xl font-bold text-[oklch(0.35_0.12_320)]">47mil+</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Seguidores no Instagram</p>
                  </div>
                </div>
              </div>
              
              <p className="font-display text-xl text-[oklch(0.35_0.12_320)] font-bold pt-4">
                Juntas, mostramos que autoridade não nasce da estética, nasce da base.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
