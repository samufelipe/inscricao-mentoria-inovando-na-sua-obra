import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

interface VideoTestimonialCardProps {
  name: string;
  thumbnailSrc: string;
  videoSrc: string;
  /** cor do anel do botão de play; acompanha a paleta da página */
  accent?: string;
}

/* Só um depoimento toca por vez: ao dar play em um, o que estava tocando pausa. */
let videoTocando: HTMLVideoElement | null = null;

export function VideoTestimonialCard({ name, thumbnailSrc, videoSrc, accent = "#C9A257" }: VideoTestimonialCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showControl, setShowControl] = useState(false);

  const handleClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      /* O vídeo começa por um toque da pessoa, então pode e deve tocar com som. */
      video.muted = false;
      video.volume = 1;
      if (videoTocando && videoTocando !== video) videoTocando.pause();
      videoTocando = video;
      setStarted(true);
      const tentativa = video.play();
      if (tentativa && typeof tentativa.catch === "function") tentativa.catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={playing ? `Pausar o depoimento de ${name}` : `Assistir ao depoimento de ${name}, com som`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      onMouseEnter={() => setShowControl(true)}
      onMouseLeave={() => setShowControl(false)}
      className="relative overflow-hidden rounded-2xl cursor-pointer flex-shrink-0 w-[72vw] sm:w-auto"
      style={{
        aspectRatio: "9/16",
        boxShadow: "0 8px 40px rgba(0,0,0,0.22)",
      }}
    >
      {/* Vídeo inline. O botão segue o que o vídeo está fazendo de verdade (onPlay e onPause). */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setStarted(false);
          if (videoTocando === videoRef.current) videoTocando = null;
        }}
      />

      {/* Thumbnail some suavemente quando o vídeo inicia */}
      <img
        src={thumbnailSrc}
        alt={`Depoimento de ${name}`}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        style={{ opacity: started ? 0 : 1, pointerEvents: "none" }}
        loading="lazy"
      />

      {/* Gradiente */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, transparent 35%, rgba(26,21,16,0.85) 100%)",
        }}
      />

      {/* Botão play/pause: sempre visível quando parado, aparece no hover quando tocando */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            border: `2px solid ${accent}`,
            backgroundColor: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(4px)",
            opacity: playing && !showControl ? 0 : 1,
          }}
        >
          {playing ? (
            <Pause className="w-7 h-7 fill-white text-white" />
          ) : (
            <Play className="w-7 h-7 fill-white text-white ml-1" />
          )}
        </div>
      </div>
    </div>
  );
}
