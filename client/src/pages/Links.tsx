import { motion } from "framer-motion";
import { Instagram, BookOpen, Calendar, Home, ExternalLink } from "lucide-react";
import inovandoObraImg from "@/assets/alem-da-tendencia/inovando-obra-new.png";
import logoLight from "@/assets/materiais/logo-inovando-light.png";

/* ─── Links data ─── */
const LINKS = [
  {
    label: "Site Oficial",
    description: "Conheça a Inovando na Sua Obra",
    href: "/",
    icon: Home,
    internal: true,
  },
  {
    label: "Materiais de Obra",
    description: "Checklists + Manual de Gerenciamento",
    href: "/materiais",
    icon: BookOpen,
    internal: true,
  },
  {
    label: "Evento Além da Tendência",
    description: "O evento presencial para arquitetas",
    href: "/alem-da-tendencia",
    icon: Calendar,
    internal: true,
  },
  {
    label: "Instagram",
    description: "@inovandodasuaobra",
    href: "https://www.instagram.com/inovandodasuaobra/",
    icon: Instagram,
    internal: false,
  },
];

/* ─── Animated link card ─── */
function LinkCard({
  label,
  description,
  href,
  icon: Icon,
  internal,
  index,
}: (typeof LINKS)[number] & { index: number }) {
  const Tag = internal ? "a" : "a";
  return (
    <motion.a
      href={href}
      target={internal ? "_self" : "_blank"}
      rel={internal ? undefined : "noopener noreferrer"}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative flex items-center gap-4 w-full px-5 py-4 bg-white/[0.06] backdrop-blur-sm border border-white/10 hover:border-[#C9A84C]/40 hover:bg-white/[0.1] transition-all duration-300 rounded-sm"
    >
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-[#C9A84C]/10 rounded-sm group-hover:bg-[#C9A84C]/20 transition-colors">
        <Icon className="w-5 h-5 text-[#C9A84C]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm tracking-wide">{label}</p>
        <p className="text-white/50 text-xs mt-0.5 truncate">{description}</p>
      </div>
      <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-[#C9A84C]/60 transition-colors flex-shrink-0" />
    </motion.a>
  );
}

/* ─── Page ─── */
export default function Links() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center relative overflow-hidden">
      {/* Subtle grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 w-px h-full bg-white" style={{ left: "5%" }} />
        <div className="absolute top-0 w-px h-full bg-white" style={{ left: "35%" }} />
        <div className="absolute top-0 w-px h-full bg-white" style={{ left: "65%" }} />
        <div className="absolute top-0 w-px h-full bg-white" style={{ left: "95%" }} />
      </div>

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#C9A84C]/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md mx-auto px-5 pt-12 pb-16 flex flex-col items-center">
        {/* Profile photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative mb-5"
        >
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#C9A84C]/30 shadow-[0_0_40px_rgba(201,168,76,0.12)]">
            <img
              src={inovandoObraImg}
              alt="Ingrid Zarza e Fernanda Bradaschia"
              className="w-full h-full object-cover object-[center_20%]"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#2E7D32] rounded-full border-2 border-[#1a1a1a] flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-3 h-3 text-white fill-current">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
        </motion.div>

        {/* Name & bio */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-lg font-bold text-white uppercase tracking-wider mb-1.5">
            Inovando na Sua Obra
          </h1>
          <p className="text-white/50 text-xs leading-relaxed max-w-[280px]">
            Ingrid Zarza & Fernanda Bradaschia · Arquitetas com +20 anos de experiência e +250 obras gerenciadas
          </p>
        </motion.div>

        {/* Link cards */}
        <div className="w-full flex flex-col gap-3 mb-10">
          {LINKS.map((link, i) => (
            <LinkCard key={link.href} {...link} index={i} />
          ))}
        </div>

        {/* Footer logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-auto"
        >
          <img
            src={logoLight}
            alt="Inovando na Sua Obra"
            className="h-8 opacity-30 hover:opacity-50 transition-opacity"
          />
        </motion.div>
      </div>
    </div>
  );
}
