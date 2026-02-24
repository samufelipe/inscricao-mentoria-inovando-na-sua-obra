import { useState } from "react";
import { useLocation } from "wouter";
import { ArchitecturalButton } from "./architectural-button";
import { ArchitecturalTitle } from "./architectural-title";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setIsLoading(true);

    const params = new URLSearchParams(window.location.search);
    const utms = {
      utm_source: params.get("utm_source") || undefined,
      utm_medium: params.get("utm_medium") || undefined,
      utm_campaign: params.get("utm_campaign") || undefined,
      utm_content: params.get("utm_content") || undefined,
      utm_term: params.get("utm_term") || undefined,
    };
    sessionStorage.setItem("lead-data", JSON.stringify(formData));
    sessionStorage.setItem("lead-utms", JSON.stringify(utms));
    navigate("/redirecionando");
  };

  return (
    <div className="bg-white p-5 sm:p-8 md:p-12 shadow-2xl border-l-4 sm:border-l-8 border-[oklch(0.75_0.18_65)]">
      <ArchitecturalTitle variant="h3" color="purple" className="mb-6">
        Garanta Sua Vaga
      </ArchitecturalTitle>
      
      <p className="text-gray-600 mb-8">
        Preencha seus dados abaixo para iniciar sua inscrição. Você será redirecionada para o checkout seguro do Sympla.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-gray-500">Nome Completo *</label>
            <input 
              type="text" id="name" name="name"
              value={formData.name} onChange={handleChange} required
              className="w-full p-4 bg-gray-50 border-b-2 border-gray-200 focus:border-[oklch(0.35_0.12_320)] outline-none transition-colors"
              placeholder="Seu nome"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-gray-500">E-mail *</label>
            <input 
              type="email" id="email" name="email"
              value={formData.email} onChange={handleChange} required
              className="w-full p-4 bg-gray-50 border-b-2 border-gray-200 focus:border-[oklch(0.35_0.12_320)] outline-none transition-colors"
              placeholder="seu@email.com"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-bold uppercase tracking-wider text-gray-500">WhatsApp *</label>
          <input 
            type="tel" id="phone" name="phone"
            value={formData.phone} onChange={handleChange} required
            className="w-full p-4 bg-gray-50 border-b-2 border-gray-200 focus:border-[oklch(0.35_0.12_320)] outline-none transition-colors"
            placeholder="(00) 00000-0000"
          />
        </div>
        
        <div className="pt-4">
          <ArchitecturalButton 
            type="submit" disabled={isLoading}
            className="w-full justify-center text-lg py-8 flex items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                PROCESSANDO...
              </>
            ) : (
              <>GARANTIR MINHA VAGA</>
            )}
          </ArchitecturalButton>
          <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Pagamento 100% seguro via Sympla
          </p>
        </div>
      </form>
    </div>
  );
}
