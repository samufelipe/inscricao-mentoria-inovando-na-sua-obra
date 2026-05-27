import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

interface VideoTestimonialCardProps {
  name: string;
  thumbnailSrc: string;
  videoSrc: string;
}

export function VideoTestimonialCard({ name, thumbnailSrc, videoSrc }: VideoTestimonialCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showControl, setShowControl] = useState(false);

  const handleClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!started) {
      setStarted(true);
      video.play();
      setPlaying(true);
    } else if (playing) {
      video.pause();
      setPlaying(false);
    } else {
      video.play();
      setPlaying(true);
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setShowControl(true)}
      onMouseLeave={() => setShowControl(false)}
      className="relative overflow-hidden rounded-2xl cursor-pointer flex-shrink-0 w-[72vw] sm:w-auto"
      style={{
        aspectRatio: "9/16",
        boxShadow: "0 8px 40px rgba(0,0,0,0.22)",
      }}
    >
      {/* Vídeo inline */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        preload="none"
        onEnded={() => { setPlaying(false); setStarted(false); }}
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
            border: "2px solid #C9A257",
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
