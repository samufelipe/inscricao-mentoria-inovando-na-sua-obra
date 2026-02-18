import { cn } from "@/lib/utils";
import { ArchitecturalTitle } from "./architectural-title";

interface SpeakerCardProps {
  name: string;
  role: string;
  description: string;
  image: string;
  socialProof: string;
  className?: string;
}

export function SpeakerCard({
  name,
  role,
  description,
  image,
  socialProof,
  className,
}: SpeakerCardProps) {
  return (
    <div className={cn("group relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500", className)}>
      <div className="aspect-[3/4] overflow-hidden relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.35_0.12_320)]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-white/90 text-sm font-medium mb-2">{socialProof}</p>
          <p className="text-white text-sm leading-relaxed">{description}</p>
        </div>
      </div>
      
      <div className="p-6 bg-white relative z-10 border-t-4 border-[oklch(0.75_0.18_65)]">
        <p className="text-[oklch(0.75_0.18_65)] text-xs font-bold tracking-widest uppercase mb-2">{role}</p>
        <h3 className="font-serif text-2xl font-bold text-[oklch(0.35_0.12_320)]">{name}</h3>
      </div>
    </div>
  );
}
