import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden animate-fade-up">
      <div className="bg-[#EDE8DC]/95 backdrop-blur-md border-t border-[#D4AF37]/30 p-4 shadow-2xl">
        <Button
          onClick={onClick}
          size="lg"
          className="w-full bg-[#9ACD32] hover:bg-[#8BC52A] text-white font-bold text-base h-14 uppercase shadow-lg border-2 border-[#1a1a1a]"
        >
          Quero Entrar na Mentoria
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
