import { useState } from "react";
import { ArchitecturalButton } from "./architectural-button";
import { ArchitecturalTitle } from "./architectural-title";
import { MessageCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profession: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      setIsLoading(false);
      return;
    }

    // Format WhatsApp message
    const message = `Olá! Gostaria de me inscrever no evento Além da Tendência.%0A%0A*Meus Dados:*%0ANome: ${formData.name}%0AE-mail: ${formData.email}%0ATelefone: ${formData.phone}%0AProfissão: ${formData.profession || "Não informado"}`;
    
    const whatsappUrl = `https://wa.me/551155717229?text=${message}`;

    // Simulate processing delay for better UX
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsLoading(false);
      toast.success("Redirecionando para o WhatsApp...");
    }, 1000);
  };

  return (
    <div className="bg-white p-8 md:p-12 shadow-2xl border-l-8 border-[oklch(0.75_0.18_65)]">
      <ArchitecturalTitle variant="h3" color="purple" className="mb-6">
        Garanta Sua Vaga
      </ArchitecturalTitle>
      
      <p className="text-gray-600 mb-8">
        Preencha seus dados abaixo para iniciar sua inscrição. Você será redirecionada para o nosso WhatsApp oficial para finalizar o pagamento seguro.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-gray-500">Nome Completo *</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 bg-gray-50 border-b-2 border-gray-200 focus:border-[oklch(0.35_0.12_320)] outline-none transition-colors"
              placeholder="Seu nome"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-gray-500">E-mail *</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 bg-gray-50 border-b-2 border-gray-200 focus:border-[oklch(0.35_0.12_320)] outline-none transition-colors"
              placeholder="seu@email.com"
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-bold uppercase tracking-wider text-gray-500">WhatsApp *</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-4 bg-gray-50 border-b-2 border-gray-200 focus:border-[oklch(0.35_0.12_320)] outline-none transition-colors"
              placeholder="(00) 00000-0000"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="profession" className="text-sm font-bold uppercase tracking-wider text-gray-500">Profissão</label>
            <select 
              id="profession" 
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              className="w-full p-4 bg-gray-50 border-b-2 border-gray-200 focus:border-[oklch(0.35_0.12_320)] outline-none transition-colors appearance-none bg-white"
            >
              <option value="">Selecione...</option>
              <option value="Arquiteta">Arquiteta</option>
              <option value="Designer de Interiores">Designer de Interiores</option>
              <option value="Estudante">Estudante</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
        </div>
        
        <div className="pt-4">
          <ArchitecturalButton 
            type="submit" 
            disabled={isLoading}
            className="w-full justify-center text-lg py-8 flex items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                PROCESSANDO...
              </>
            ) : (
              <>
                <MessageCircle className="w-6 h-6" />
                FINALIZAR INSCRIÇÃO NO WHATSAPP
              </>
            )}
          </ArchitecturalButton>
          <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Seus dados serão enviados de forma segura
          </p>
        </div>
      </form>
    </div>
  );
}
