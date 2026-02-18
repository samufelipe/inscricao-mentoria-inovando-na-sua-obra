import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  image: string;
  className?: string;
}

export function TestimonialCard({
  name,
  role,
  quote,
  image,
  className,
}: TestimonialCardProps) {
  return (
    <div className={cn("bg-white p-8 shadow-lg border-t-4 border-[oklch(0.35_0.12_320)] relative", className)}>
      <div className="absolute -top-6 left-8 w-12 h-12 bg-[oklch(0.75_0.18_65)] rounded-full flex items-center justify-center text-white text-2xl font-serif font-bold">
        "
      </div>
      
      <p className="text-gray-600 italic mb-6 pt-4 leading-relaxed">
        "{quote}"
      </p>
      
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[oklch(0.35_0.12_320)]">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-bold text-[oklch(0.35_0.12_320)]">{name}</h4>
          <p className="text-xs text-gray-500 uppercase tracking-wider">{role}</p>
        </div>
      </div>
    </div>
  );
}
