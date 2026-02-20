import { cn } from "@/lib/utils";

interface ArchitecturalSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark" | "purple" | "orange";
  gridLines?: boolean;
  id?: string;
}

export function ArchitecturalSection({
  children,
  className,
  variant = "light",
  gridLines = true,
  id,
}: ArchitecturalSectionProps) {
  const variants = {
    light: "bg-[oklch(0.97_0.01_95)] text-[oklch(0.2_0.02_320)]",
    dark: "bg-[oklch(0.2_0.02_320)] text-[oklch(0.97_0.01_95)]",
    purple: "bg-[oklch(0.35_0.12_320)] text-white",
    orange: "bg-[oklch(0.75_0.18_65)] text-white",
  };

  return (
    <section id={id} className={cn("relative py-12 sm:py-20 md:py-32 overflow-hidden", variants[variant], className)}>
      {gridLines && (
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute left-0 top-0 w-px h-full bg-current" style={{ left: "5%" }} />
          <div className="absolute left-0 top-0 w-px h-full bg-current" style={{ left: "35%" }} />
          <div className="absolute left-0 top-0 w-px h-full bg-current" style={{ left: "65%" }} />
          <div className="absolute left-0 top-0 w-px h-full bg-current" style={{ left: "95%" }} />
          
          <div className="absolute left-0 top-0 h-px w-full bg-current" style={{ top: "10%" }} />
          <div className="absolute left-0 top-0 h-px w-full bg-current" style={{ top: "50%" }} />
          <div className="absolute left-0 top-0 h-px w-full bg-current" style={{ top: "90%" }} />
        </div>
      )}
      <div className="container relative z-10 px-3 sm:px-4">
        {children}
      </div>
    </section>
  );
}
