import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { captureLead } from "@/lib/capture-lead";
import { sendToGoogleSheets } from "@/lib/google-sheets";
import { trackFormSubmit } from "@/lib/gtm-tracking";
import logoTransparent from "@/assets/alem-da-tendencia/logo-transparent.png";

const SYMPLA_URL = "https://www.sympla.com.br/evento/alem-da-tendencia/3315090";
const SAFETY_TIMEOUT_MS = 5000;

interface LeadData {
  name: string;
  email: string;
  phone: string;
}

export default function Redirecionando() {
  const [, navigate] = useLocation();
  const hasRun = useRef(false);
  const [status, setStatus] = useState<"sending" | "redirecting" | "error">("sending");

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    // Read data from sessionStorage (set by the form before navigating here)
    const raw = sessionStorage.getItem("lead-data");
    if (!raw) {
      // No data — redirect immediately
      window.location.href = SYMPLA_URL;
      return;
    }

    const data: LeadData = JSON.parse(raw);
    const utmsRaw = sessionStorage.getItem("lead-utms");
    const utms = utmsRaw ? JSON.parse(utmsRaw) : undefined;
    sessionStorage.removeItem("lead-data");
    sessionStorage.removeItem("lead-utms");

    const safetyTimer = setTimeout(() => {
      // If requests take too long, redirect anyway
      window.location.href = SYMPLA_URL;
    }, SAFETY_TIMEOUT_MS);

    // Classify source for Google Sheets backup
    function classifySource(src?: string): string {
      if (!src) return "Orgânico/Direto";
      const s = src.toLowerCase();
      if (["facebook", "fb", "ig", "instagram"].includes(s) || s.startsWith("meta")) return "Meta Ads";
      if (s === "google") return "Google Ads";
      return src;
    }

    (async () => {
      try {
        await Promise.allSettled([
          captureLead({
            name: data.name,
            email: data.email,
            phone: data.phone,
            product: "alem-da-tendencia",
            utms,
          }),
          sendToGoogleSheets({
            name: data.name,
            email: data.email,
            whatsapp: data.phone,
            fonte: classifySource(utms?.utm_source),
          }),
        ]);
        trackFormSubmit("inscricao", true);
      } catch (err) {
        console.error("Lead capture error (non-blocking):", err);
      }

      clearTimeout(safetyTimer);
      setStatus("redirecting");
      window.location.href = SYMPLA_URL;
    })();

    return () => clearTimeout(safetyTimer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex flex-col items-center justify-center px-6 text-center">
      <img
        src={logoTransparent}
        alt="Além da Tendência"
        className="w-[160px] h-auto mb-8 opacity-80"
      />

      <div className="w-12 h-12 border-4 border-[#C9A84C] border-t-transparent rounded-full animate-spin mb-6" />

      <h1 className="text-white text-xl md:text-2xl font-bold mb-2">
        {status === "sending" ? "Salvando seus dados..." : "Redirecionando para o checkout..."}
      </h1>
      <p className="text-white/50 text-sm max-w-md">
        Aguarde um instante. Você será direcionada para a página de pagamento seguro do Sympla.
      </p>

      {status === "error" && (
        <button
          onClick={() => (window.location.href = SYMPLA_URL)}
          className="mt-6 px-6 py-3 bg-[#C9A84C] text-black font-bold rounded-lg hover:bg-[#d4b85c] transition-colors"
        >
          Ir para o checkout agora
        </button>
      )}
    </div>
  );
}
