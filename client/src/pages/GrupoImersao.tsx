import { useEffect, useRef, useState, useCallback } from "react";
import imgLogo from "@/assets/materiais/logo-inovando-light.png";
import imgCapa from "@/assets/mentoria/capa-video-grupo.jpg";

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

/* ─── Icone play ─── */
function IconPlay({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white" style={{ marginLeft: "3px" }} aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

/* ─── Icone pause ─── */
function IconPause({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

/* ─── Player de vídeo ─── */
function VideoPlayer() {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [started,  setStarted]  = useState(false);   // usuario ja clicou ao menos uma vez
  const [playing,  setPlaying]  = useState(false);   // esta tocando agora
  const [overlay,  setOverlay]  = useState(false);   // overlay de controle visivel

  /* mostra overlay por 2.5s apos interacao e some sozinho */
  const flashOverlay = useCallback(() => {
    setOverlay(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setOverlay(false), 2500);
  }, []);

  /* play / pause ao clicar */
  const handleClick = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;

    if (!started) {
      setStarted(true);
      v.play();
      return;
    }

    if (playing) {
      v.pause();
      setOverlay(true);           // ao pausar, overlay fica fixo
    } else {
      v.play();
      flashOverlay();             // ao dar play, overlay some apos 2.5s
    }
  }, [started, playing, flashOverlay]);

  /* sincroniza estado com eventos nativos do video */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay  = () => { setPlaying(true);  flashOverlay(); };
    const onPause = () => { setPlaying(false); setOverlay(true); };
    const onEnded = () => { setStarted(false); setPlaying(false); setOverlay(false); };
    v.addEventListener("play",  onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("play",  onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [flashOverlay]);

  /* no desktop, overlay aparece no hover */
  const handleMouseEnter = () => { if (started) setOverlay(true); };
  const handleMouseLeave = () => { if (playing) setOverlay(false); };

  const showOverlay = !started || overlay;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(); } }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full select-none overflow-hidden"
      style={{
        maxWidth: "360px",
        borderRadius: "16px",
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* Capa — fica no fluxo e define a altura do container */}
      <img
        src={imgCapa}
        alt="Assistir vídeo"
        className="w-full h-auto block"
        style={{
          borderRadius: "16px",
          opacity: started ? 0 : 1,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      />

      {/* Video — absolute sobre a capa, aparece quando inicia */}
      <video
        ref={videoRef}
        src="/videos/video-grupo-wpp.mp4"
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full"
        style={{
          borderRadius: "16px",
          display: "block",
          objectFit: "cover",
          opacity: started ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Overlay de controle — fade in/out suave */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          borderRadius: "16px",
          backgroundColor: started && playing && !overlay ? "transparent" : "rgba(0,0,0,0.38)",
          transition: "background-color 0.25s ease, opacity 0.25s ease",
          opacity: showOverlay ? 1 : 0,
          pointerEvents: "none",
        }}
      >
        {/* Botao play/pause — touch target >= 64px */}
        <div
          className="flex items-center justify-center"
          style={{
            width: "68px",
            height: "68px",
            borderRadius: "50%",
            border: `2px solid ${C.gold}`,
            backgroundColor: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(6px)",
            transition: "transform 0.15s ease",
            transform: showOverlay ? "scale(1)" : "scale(0.8)",
          }}
        >
          {playing ? <IconPause /> : <IconPlay />}
        </div>
      </div>
    </div>
  );
}

/* ─── Pagina /grupo ─── */
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
      {/* Logo */}
      <img
        src={imgLogo}
        alt="Inovando na Sua Obra"
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

      {/* Player */}
      <div className="w-full flex justify-center mb-10">
        <VideoPlayer />
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
