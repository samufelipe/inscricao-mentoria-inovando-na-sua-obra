import { ArchitecturalTitle } from "./architectural-title";
import { cn } from "@/lib/utils";
import { Instagram } from "lucide-react";

export function HostsSection() {
  return (
    <section className="relative py-12 md:py-32 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[oklch(0.97_0.01_95)] -skew-x-12 translate-x-1/4 z-0" />
      
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <p className="text-[#C9A84C] font-bold tracking-widest uppercase text-sm mb-2">
            Suas Anfitriãs
          </p>
          <ArchitecturalTitle variant="h2" color="purple">
            Unidas por um propósito
          </ArchitecturalTitle>
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto font-light">
            São os bastidores que constroem e sustentam uma carreira sólida na arquitetura.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Inovando na Sua Obra */}
          <div className="space-y-8 group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663217190391/LAKSQEpLPcJkePXw.jpg" 
                alt="Ingrid Zarza e Fernanda Bradaschia - Inovando na Sua Obra" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 object-[center_20%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold uppercase tracking-wide mb-1">Ingrid Zarza & <br/>Fernanda Bradaschia</h3>
                <p className="text-[#C9A84C] font-medium text-sm uppercase tracking-wider">Inovando na Sua Obra</p>
              </div>
            </div>
            
            <div className="space-y-4 px-2">
              <div className="flex items-center gap-2 text-[#C9A84C] font-bold uppercase tracking-wider text-sm">
                <Instagram className="w-4 h-4" />
                <span>@inovandonasuaobra</span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Especialistas em Gestão de Obras de Interiores. Ensinam arquitetos e designers a transformarem obras caóticas em processos lucrativos e organizados.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-gray-50 p-4 rounded-lg border-l-2 border-[#C9A84C]">
                  <span className="block text-2xl font-bold text-gray-800">55mil+</span>
                  <span className="text-xs text-gray-500 uppercase">Seguidores</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border-l-2 border-[#C9A84C]">
                  <span className="block text-2xl font-bold text-gray-800">250+</span>
                  <span className="text-xs text-gray-500 uppercase">Obras Realizadas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Juliana Campelo */}
          <div className="space-y-8 group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl">
              {/* Usando a mesma imagem por enquanto, mas focado na Juliana se possível, ou placeholder se não tiver foto individual */}
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663217190391/LAKSQEpLPcJkePXw.jpg" 
                alt="Juliana Campelo - AjudaMONU" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 object-[right_20%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold uppercase tracking-wide mb-1">Juliana Campelo</h3>
                <p className="text-[#C9A84C] font-medium text-sm uppercase tracking-wider">AjudaMONU</p>
              </div>
            </div>
            
            <div className="space-y-4 px-2">
              <div className="flex items-center gap-2 text-[#C9A84C] font-bold uppercase tracking-wider text-sm">
                <Instagram className="w-4 h-4" />
                <span>@arq.julianacampelo</span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Arquiteta e mentora de gestão de escritórios. Ajuda profissionais a estruturarem seus negócios para crescerem com segurança e previsibilidade.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-gray-50 p-4 rounded-lg border-l-2 border-[#C9A84C]">
                  <span className="block text-2xl font-bold text-gray-800">+850</span>
                  <span className="text-xs text-gray-500 uppercase">Escritórios Estruturados</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border-l-2 border-[#C9A84C]">
                  <span className="block text-2xl font-bold text-gray-800">+3000</span>
                  <span className="text-xs text-gray-500 uppercase">Alunos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
