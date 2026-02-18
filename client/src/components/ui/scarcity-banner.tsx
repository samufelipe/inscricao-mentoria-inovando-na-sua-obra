import { cn } from "@/lib/utils";
import { Clock, Users, MapPin } from "lucide-react";

export function ScarcityBanner() {
  return (
    <div className="bg-[oklch(0.2_0.02_320)] text-white py-4 border-b border-white/10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-sm md:text-base font-medium">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[oklch(0.75_0.18_65)]" />
          <span>Evento Presencial Exclusivo</span>
        </div>
        <div className="hidden md:block w-1 h-1 bg-white/20 rounded-full" />
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[oklch(0.75_0.18_65)]" />
          <span>Vagas Limitadas (Auditório AFRESP)</span>
        </div>
        <div className="hidden md:block w-1 h-1 bg-white/20 rounded-full" />
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[oklch(0.75_0.18_65)]" />
          <span>10 de Março de 2026</span>
        </div>
      </div>
    </div>
  );
}
