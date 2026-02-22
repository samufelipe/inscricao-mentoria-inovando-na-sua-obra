import { useState } from "react";
import { ArchitecturalButton } from "./architectural-button";
import { MessageCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { captureLead } from "@/lib/capture-lead";

export function HeroRegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      setIsLoading(false);
      return;
    }

    try {
      await captureLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        product: "alem-da-tendencia",
      });
    } catch {
      // Non-blocking: don't prevent redirect on capture failure
    }

    window.open("https://www.sympla.com.br/evento/alem-da-tendencia/3315090", "_blank");
    setIsLoading(false);
    toast.success("Redirecionando para o Sympla...");
  };

  return (
    <div className="pt-2">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="hero-name" className="text-xs font-bold uppercase tracking-wider text-white/50">Nome Completo *</label>
          <input 
            type="text" id="hero-name" name="name"
            value={formData.name} onChange={handleChange} required
            className="w-full p-3 md:p-4 bg-white/5 border border-white/5 focus:border-[#C9A84C] outline-none transition-colors rounded-lg text-sm text-white placeholder:text-white/30"
            placeholder="Seu nome"
          />
        </div>
        
        <div className="space-y-1.5">
          <label htmlFor="hero-email" className="text-xs font-bold uppercase tracking-wider text-white/50">E-mail *</label>
          <input 
            type="email" id="hero-email" name="email"
            value={formData.email} onChange={handleChange} required
            className="w-full p-3 md:p-4 bg-white/5 border border-white/5 focus:border-[#C9A84C] outline-none transition-colors rounded-lg text-sm text-white placeholder:text-white/30"
            placeholder="seu@email.com"
          />
        </div>
        
        <div className="space-y-1.5">
          <label htmlFor="hero-phone" className="text-xs font-bold uppercase tracking-wider text-white/50">WhatsApp *</label>
          <input 
            type="tel" id="hero-phone" name="phone"
            value={formData.phone} onChange={handleChange} required
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
