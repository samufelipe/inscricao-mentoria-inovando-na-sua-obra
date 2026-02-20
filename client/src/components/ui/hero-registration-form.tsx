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

    const message = `Olá! Gostaria de me inscrever no evento Além da Tendência.%0A%0A*Meus Dados:*%0ANome: ${formData.name}%0AE-mail: ${formData.email}%0ATelefone: ${formData.phone}`;
    const whatsappUrl = `https://wa.me/551155717229?text=${message}`;

    window.open(whatsappUrl, "_blank");
    setIsLoading(false);
    toast.success("Redirecionando para o WhatsApp...");
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl">
      <div className="text-center mb-6">
        <h3 className="font-display text-xl md:text-2xl font-bold text-[oklch(0.35_0.12_320)] uppercase mb-2">
          Garanta Sua Vaga
        </h3>
        <div className="flex items-baseline justify-center gap-2 mb-1">
          <span className="text-sm text-gray-400 line-through">R$ 297,00</span>
          <span className="text-3xl md:text-4xl font-bold text-[oklch(0.35_0.12_320)]">R$ 147,00</span>
        </div>
        <p className="text-xs text-[oklch(0.75_0.18_65)] font-medium">Lote Promocional por Tempo Limitado</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="hero-name" className="text-xs font-bold uppercase tracking-wider text-gray-500">Nome Completo *</label>
          <input 
            type="text" id="hero-name" name="name"
            value={formData.name} onChange={handleChange} required
            className="w-full p-3 md:p-4 bg-gray-50 border-b-2 border-gray-200 focus:border-[oklch(0.35_0.12_320)] outline-none transition-colors rounded-lg text-sm"
            placeholder="Seu nome"
          />
        </div>
        
        <div className="space-y-1.5">
          <label htmlFor="hero-email" className="text-xs font-bold uppercase tracking-wider text-gray-500">E-mail *</label>
          <input 
            type="email" id="hero-email" name="email"
            value={formData.email} onChange={handleChange} required
            className="w-full p-3 md:p-4 bg-gray-50 border-b-2 border-gray-200 focus:border-[oklch(0.35_0.12_320)] outline-none transition-colors rounded-lg text-sm"
            placeholder="seu@email.com"
          />
        </div>
        
        <div className="space-y-1.5">
          <label htmlFor="hero-phone" className="text-xs font-bold uppercase tracking-wider text-gray-500">WhatsApp *</label>
          <input 
            type="tel" id="hero-phone" name="phone"
            value={formData.phone} onChange={handleChange} required
            className="w-full p-3 md:p-4 bg-gray-50 border-b-2 border-gray-200 focus:border-[oklch(0.35_0.12_320)] outline-none transition-colors rounded-lg text-sm"
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
              <><MessageCircle className="w-5 h-5" /> FINALIZAR INSCRIÇÃO</>
            )}
          </ArchitecturalButton>
          <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Dados enviados de forma segura via WhatsApp
          </p>
        </div>
      </form>
    </div>
  );
}
