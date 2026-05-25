import { Play } from "lucide-react";

interface VideoTestimonialCardProps {
  name: string;
  role?: string;
  thumbnailSrc: string;
  onClick: () => void;
}

export function VideoTestimonialCard({ name, role, thumbnailSrc, onClick }: VideoTestimonialCardProps) {
  return (
    <div
      onClick={onClick}
      className="relative overflow-hidden rounded-2xl cursor-pointer group flex-shrink-0 w-[72vw] sm:w-auto"
      style={{
        aspectRatio: "9/16",
        boxShadow: "0 8px 40px rgba(0,0,0,0.22)",
      }}
    >
      {/* Thumbnail */}
      <img
        src={thumbnailSrc}
        alt={`Depoimento de ${name}`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, transparent 35%, rgba(26,21,16,0.92) 100%)",
        }}
      />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{
            border: "2px solid #C9A257",
            backgroundColor: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(4px)",
          }}
        >
          <Play className="w-7 h-7 fill-white text-white ml-1" />
        </div>
      </div>

    </div>
  );
}
