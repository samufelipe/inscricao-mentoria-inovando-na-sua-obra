import { cn } from "@/lib/utils";

interface ArchitecturalTitleProps {
  children: React.ReactNode;
  className?: string;
  variant?: "h1" | "h2" | "h3" | "h4";
  color?: "purple" | "orange" | "dark" | "light";
}

export function ArchitecturalTitle({
  children,
  className,
  variant = "h2",
  color = "purple",
}: ArchitecturalTitleProps) {
  const variants = {
    h1: "font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none",
    h2: "font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight",
    h3: "font-sans text-2xl md:text-3xl font-bold tracking-wide uppercase",
    h4: "font-sans text-xl font-semibold tracking-wider uppercase",
  };

  const colors = {
    purple: "text-[oklch(0.35_0.12_320)]",
    orange: "text-[oklch(0.75_0.18_65)]",
    dark: "text-[oklch(0.2_0.02_320)]",
    light: "text-[oklch(0.97_0.01_95)]",
  };

  const Tag = variant === "h1" ? "h1" : variant === "h2" ? "h2" : variant === "h3" ? "h3" : "h4";

  return (
    <Tag className={cn(variants[variant], colors[color], "relative inline-block", className)}>
      {children}
      {variant === "h2" && (
        <span className="absolute -bottom-4 left-0 w-24 h-1 bg-[oklch(0.75_0.18_65)]" />
      )}
    </Tag>
  );
}
