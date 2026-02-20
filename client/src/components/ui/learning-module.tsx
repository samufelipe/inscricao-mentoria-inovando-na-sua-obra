import { cn } from "@/lib/utils";
import { ArchitecturalTitle } from "./architectural-title";

interface LearningModuleProps {
  number: string;
  title: string;
  description: string;
  speaker: string;
  time?: string;
  className?: string;
}

export function LearningModule({
  number,
  title,
  description,
  speaker,
  time,
  className,
}: LearningModuleProps) {
  return (
    <div className={cn("relative group p-5 sm:p-8 bg-white border-l-4 border-[oklch(0.35_0.12_320)] hover:border-[oklch(0.75_0.18_65)] transition-colors duration-300 overflow-hidden", className)}>
      <div className="absolute top-0 right-0 p-2 sm:p-4 opacity-10 font-serif text-5xl sm:text-8xl font-bold text-[oklch(0.35_0.12_320)] leading-none select-none">
        {number}
      </div>
      
      <div className="relative z-10">
        <p className="text-[oklch(0.75_0.18_65)] text-xs font-bold tracking-widest uppercase mb-4">
          Palestra {number}{time ? ` • ${time}` : ''} • {speaker}
        </p>
        
        <ArchitecturalTitle variant="h3" color="purple" className="mb-4">
          {title}
        </ArchitecturalTitle>
        
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
