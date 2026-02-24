import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { ArchitecturalButton } from "./architectural-button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { trackFormStart, trackFormFieldFocus } from "@/lib/gtm-tracking";

export function HeroRegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [, navigate] = useLocation();
  const hasTrackedStart = useRef(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      trackFormStart("hero-inscricao");
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFocus = (fieldName: string) => {
    trackFormFieldFocus("hero-inscricao", fieldName);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setIsLoading(true);
    sessionStorage.setItem("lead-data", JSON.stringify(formData));
    navigate("/redirecionando");
  };

  return (
    <div className="pt-2">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="hero-name" className="text-xs font-bold uppercase tracking-wider text-white/50">Nome Completo *</label>
          <input 
            type="text" id="hero-name" name="name"
            value={formData.name} onChange={handleChange} onFocus={() => handleFocus("name")} required
            className="w-full p-3 md:p-4 bg-white/5 border border-white/5 focus:border-[#C9A84C] outline-none transition-colors rounded-lg text-sm text-white placeholder:text-white/30"
            placeholder="Seu nome"
          />
        </div>
        
        <div className="space-y-1.5">
          <label htmlFor="hero-email" className="text-xs font-bold uppercase tracking-wider text-white/50">E-mail *</label>
          <input 
            type="email" id="hero-email" name="email"
            value={formData.email} onChange={handleChange} onFocus={() => handleFocus("email")} required
            className="w-full p-3 md:p-4 bg-white/5 border border-white/5 focus:border-[#C9A84C] outline-none transition-colors rounded-lg text-sm text-white placeholder:text-white/30"
            placeholder="seu@email.com"
          />
        </div>
        
        <div className="space-y-1.5">
          <label htmlFor="hero-phone" className="text-xs font-bold uppercase tracking-wider text-white/50">WhatsApp *</label>
          <input 
            type="tel" id="hero-phone" name="phone"
            value={formData.phone} onChange={handleChange} onFocus={() => handleFocus("phone")} required
            className="w-full p-3 md:p-4 bg-white/5 border border-white/5 focus:border-[#C9A84C] outline-none transition-colors rounded-lg text-sm text-white placeholder:text-white/30"
            placeholder="(00) 00000-0000"
          />
        </div>
        
        <div className="pt-2">
          <ArchitecturalButton 
            type="submit" disabled={isLoading}
            className="w-full justify-center text-base py-6 flex items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> PROCESSANDO...</>
            ) : (
              <>GARANTIR MINHA VAGA</>
            )}
          </ArchitecturalButton>
          <p className="text-center text-xs text-white/40 mt-3 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Pagamento 100% seguro via Sympla
          </p>
        </div>
      </form>
    </div>
  );
}
