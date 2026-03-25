import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./dialog";
import { Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { captureLead } from "@/lib/capture-lead";

declare global {
  interface Window {
    hotmart?: {
      showCheckout(opts: { offer: string; email?: string; name?: string; phone?: string }): void;
    };
  }
}

interface LeadCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productKey: "checklists" | "ebook" | "combo";
}

const OFFER_MAP: Record<string, { offer: string; product: string }> = {
  checklists: { offer: "F99460291O", product: "materiais-checklists" },
  ebook: { offer: "Q99258692R", product: "materiais-ebook" },
  combo: { offer: "F99460291O", product: "materiais-combo" },
};

// For combo, append bid param
const COMBO_BID = "1774368616199";

export function LeadCaptureModal({ open, onOpenChange, productKey }: LeadCaptureModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Preencha todos os campos.");
      return;
    }
    setIsLoading(true);

    try {
      const { product } = OFFER_MAP[productKey];
      await captureLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        product,
      });
    } catch {
      // non-blocking – proceed to checkout even if lead capture fails
      console.error("Lead capture failed, proceeding to checkout");
    }

    // Open Hotmart overlay
    const { offer } = OFFER_MAP[productKey];
    if (window.hotmart?.showCheckout) {
      const opts: Parameters<typeof window.hotmart.showCheckout>[0] = {
        offer,
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
      };
      window.hotmart.showCheckout(opts);
    } else {
      // Fallback: redirect
      let url = `https://pay.hotmart.com/${offer}?checkoutMode=10&email=${encodeURIComponent(formData.email)}&name=${encodeURIComponent(formData.name)}`;
      if (productKey === "combo") url += `&bid=${COMBO_BID}`;
      window.open(url, "_blank");
    }

    setIsLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1a1a1a] border-[#C9A84C]/30 text-white max-w-md p-0 overflow-hidden">
        {/* Urgency strip */}
        <div className="bg-[#C9A84C]/10 border-b border-[#C9A84C]/20 px-5 py-2.5 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full animate-pulse" />
            Oferta por tempo limitado
          </p>
        </div>

        <div className="px-5 pt-4 pb-6 sm:px-6">
          <DialogHeader className="mb-4 text-center sm:text-center">
            <DialogTitle className="text-lg font-bold text-white uppercase tracking-wide font-display">
              Quase lá!
            </DialogTitle>
            <DialogDescription className="text-white/50 text-sm">
              Preencha seus dados para abrir o checkout seguro
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.15em] text-white/40 font-semibold">Nome completo</label>
              <input
                name="name" type="text" required value={formData.name} onChange={handleChange}
                placeholder="Seu nome"
                className="w-full bg-white/5 border border-white/10 text-white text-sm px-4 py-3 outline-none focus:border-[#C9A84C]/50 transition-colors placeholder:text-white/20"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.15em] text-white/40 font-semibold">E-mail</label>
              <input
                name="email" type="email" required value={formData.email} onChange={handleChange}
                placeholder="seu@email.com"
                className="w-full bg-white/5 border border-white/10 text-white text-sm px-4 py-3 outline-none focus:border-[#C9A84C]/50 transition-colors placeholder:text-white/20"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.15em] text-white/40 font-semibold">WhatsApp</label>
              <input
                name="phone" type="tel" required value={formData.phone} onChange={handleChange}
                placeholder="(00) 00000-0000"
                className="w-full bg-white/5 border border-white/10 text-white text-sm px-4 py-3 outline-none focus:border-[#C9A84C]/50 transition-colors placeholder:text-white/20"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2E7D32] text-white font-bold py-4 uppercase tracking-widest text-xs hover:bg-[#256829] transition-all shadow-[0_4px_24px_rgba(46,125,50,0.3)] inline-flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Processando...</>
              ) : (
                <>
                  Ir para o pagamento
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            <p className="text-white/30 text-[10px] text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#2E7D32]" /> Pagamento 100% seguro via Hotmart
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
