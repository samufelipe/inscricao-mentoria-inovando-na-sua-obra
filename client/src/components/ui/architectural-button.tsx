import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ArchitecturalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  showIcon?: boolean;
}

export function ArchitecturalButton({
  children,
  variant = "primary",
  className,
  showIcon = true,
  ...props
}: ArchitecturalButtonProps) {
  const baseStyles = "relative overflow-hidden transition-all duration-300 group font-sans font-bold tracking-wider uppercase text-sm py-6 px-8 rounded-none border-0";
  
  const variants = {
    primary: "bg-[#2E7D32] text-white hover:bg-[#256829] shadow-lg hover:shadow-xl hover:-translate-y-1",
    secondary: "bg-[oklch(0.35_0.12_320)] text-white hover:bg-[oklch(0.3_0.12_320)] shadow-lg hover:shadow-xl hover:-translate-y-1",
    outline: "bg-transparent border-2 border-[oklch(0.35_0.12_320)] text-[oklch(0.35_0.12_320)] hover:bg-[oklch(0.35_0.12_320)] hover:text-white"
  };

  return (
    <Button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {showIcon && (
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
    </Button>
  );
}
