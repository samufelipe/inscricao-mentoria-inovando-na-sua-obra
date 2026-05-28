import { useEffect } from "react";
import imgLogo from "@/assets/mentoria/logo-mobile.png";

const WA_GROUP_LINK   = "https://chat.whatsapp.com/BDM8VkLaGw9DiZqMjleSbd?mode=gi_t";
const WA_CONTACT_LINK = "https://wa.me/551155717229?text=Ol%C3%A1!%20Sou%20participante%20da%20Imers%C3%A3o%20Cronograma%202.0%20e%20preciso%20de%20ajuda.";
const IG_LINK         = "https://www.instagram.com/inovandonasuaobra";

const C = {
  dark:  "#1A1510",
  cream: "#FAF8F4",
  gold:  "#C9A257",
  green: "#2E7D32",
  white: "#FFFFFF",
};

export default function GrupoImersao() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Imersão Cronograma 2.0 - O Mapa da Obra";
    return () => { document.title = prev; };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center px-6 py-14"
      style={{ backgroundColor: C.dark }}
    >
      {/* Logo da Imersão */}
      <img
        src={imgLogo}
        alt="Imersão Cronograma 2.0 - O Mapa da Obra"
        className="w-52 mb-10"
        loading="eager"
      />

      <div className="w-10 h-px mb-10" style={{ backgroundColor: C.gold }} />

      {/* Headline */}
      <h1
        className="text-3xl md:text-4xl font-black uppercase text-center mb-4"
        style={{
          fontFamily: "Montserrat, sans-serif",
          color: C.cream,
          lineHeight: "1.1",
          letterSpacing: "-0.01em",
        }}
      >
        Voce esta{" "}
        <span style={{ color: C.gold }}>quase la.</span>
      </h1>

      {/* Sub */}
      <p
        className="text-base text-center leading-relaxed mb-10"
        style={{ color: "rgba(250,248,244,0.55)", maxWidth: "32ch" }}
      >
        O grupo exclusivo e o canal oficial da Imersao Cronograma 2.0.
        Assista ao video abaixo e entre agora.
      </p>

      {/* Video */}
      <div
        className="w-full mb-10 overflow-hidden"
        style={{ maxWidth: "360px", borderRadius: "16px" }}
      >
        <video
          src="/videos/video-grupo-wpp.mp4"
          controls
          playsInline
          preload="metadata"
          className="w-full h-auto block"
          style={{ borderRadius: "16px" }}
        />
      </div>

      {/* CTA principal */}
      <a
        href={WA_GROUP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-sm tracking-widest uppercase w-full transition-opacity hover:opacity-90 mb-10"
        style={{
          backgroundColor: C.green,
          color: C.white,
          maxWidth: "360px",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        Entrar no Grupo Agora
      </a>

      {/* Icones sociais */}
      <div className="flex items-center gap-6">
        <a
          href={WA_CONTACT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp da Imersão"
          className="flex flex-col items-center gap-1.5 transition-opacity hover:opacity-70"
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(250,248,244,0.08)" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </div>
          <span className="text-xs" style={{ color: "rgba(250,248,244,0.35)" }}>WhatsApp</span>
        </a>

        <a
          href={IG_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram Inovando na Sua Obra"
          className="flex flex-col items-center gap-1.5 transition-opacity hover:opacity-70"
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(250,248,244,0.08)" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFDC80" />
                  <stop offset="25%" stopColor="#FCAF45" />
                  <stop offset="50%" stopColor="#F77737" />
                  <stop offset="75%" stopColor="#C13584" />
                  <stop offset="100%" stopColor="#833AB4" />
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="url(#ig-grad)" strokeWidth="2" />
              <circle cx="12" cy="12" r="4.5" stroke="url(#ig-grad)" strokeWidth="2" />
              <circle cx="17.5" cy="6.5" r="1.2" fill="url(#ig-grad)" />
            </svg>
          </div>
          <span className="text-xs" style={{ color: "rgba(250,248,244,0.35)" }}>Instagram</span>
        </a>
      </div>

      {/* Footer */}
      <p
        className="text-xs mt-10 text-center"
        style={{ color: "rgba(250,248,244,0.15)" }}
      >
        Imersao Cronograma 2.0 - O Mapa da Obra
      </p>
    </div>
  );
}
