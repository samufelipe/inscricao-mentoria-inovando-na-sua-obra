import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { trackCTAClick } from "@/lib/gtm-tracking";

interface MentoriaMobileCTAProps {
  onClick: () => void;
}

export default function MentoriaMobileCTA({ onClick }: MentoriaMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    trackCTAClick("cta_mobile_fixed", "mobile_footer", "Quero Entrar • 12x R$196");
    onClick();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden animate-fade-up">
      <div className="bg-[#EDE8DC]/95 backdrop-blur-md border-t border-[#D4AF37]/30 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
        <Button
          onClick={handleClick}
          size="lg"
          className="w-full bg-[#1B8A3F] hover:bg-[#157A35] text-white font-bold text-base h-14 uppercase shadow-lg animate-pulse-subtle"
        >
          <span className="flex items-center justify-center gap-2">
            Quero Entrar <span className="text-[#D4AF37] font-normal">•</span> 12x R$196
          </span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
