import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import logoDark from "@/assets/alem-da-tendencia/logo-dark.png";

export function StickyHeader() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show header after scrolling past the hero section (approx 600px)
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    const formSection = document.getElementById("inscricao");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300 transform",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img 
            src={logoDark}
            alt="Além da Tendência" 
            className="h-12 w-auto object-contain"
          />
        </button>
        
        <div className="flex items-center gap-4">
          <span className="hidden md:block text-sm font-medium text-gray-600">
            Evento Presencial • 10 de Março
          </span>
          <Button 
            onClick={scrollToForm}
            className="bg-[#2E7D32] hover:bg-[#256829] text-white font-bold uppercase tracking-wider text-xs md:text-sm px-6"
          >
            Garantir Vaga
          </Button>
        </div>
      </div>
    </header>
  );
}
