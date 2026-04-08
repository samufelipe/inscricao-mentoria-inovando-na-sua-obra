import { useEffect } from "react";
import { motion } from "framer-motion";
import { Instagram, BookOpen, Home, ChevronRight } from "lucide-react";
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
    accent: "#C9A84C",
  },
  {
    label: "Materiais de Obra",
    description: "Checklists + Manual de Gerenciamento",
    href: "/materiais",
    icon: BookOpen,
    internal: true,
    accent: "#2E7D32",
  },
  {
    label: "Instagram",
    description: "@inovandodasuaobra",
    href: "https://www.instagram.com/inovandodasuaobra/",
    icon: Instagram,
    internal: false,
    accent: "#E1306C",
  },
];

/* ─── Animated link card ─── */
function LinkCard({
  label,
  description,
  href,
  icon: Icon,
  internal,
  accent,
  index,
}: (typeof LINKS)[number] & { index: number }) {
  return (
    <motion.a
      href={href}
      target={internal ? "_self" : "_blank"}
      rel={internal ? undefined : "noopener noreferrer"}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 + index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.25 } }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex items-center gap-4 w-full px-5 py-5 bg-[#f0ede8] border border-[#e0dbd2] hover:border-[#C9A84C]/50 transition-all duration-400 rounded-sm overflow-hidden"
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {/* Hover glow accent */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${accent}08 0%, transparent 60%)`,
        }}
      />

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-[20%] bottom-[20%] w-[2px] rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:top-[10%] group-hover:bottom-[10%]"
        style={{ backgroundColor: accent }}
      />

      {/* Icon */}
      <div className="relative flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-sm bg-white border border-[#e8e4dc] group-hover:border-[#C9A84C]/30 transition-all duration-300 group-hover:shadow-[0_2px_12px_rgba(201,168,76,0.1)]">
        <Icon
          className="w-5 h-5 transition-all duration-300 group-hover:scale-110"
          style={{ color: accent }}
        />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0 relative">
        <p className="text-[#1a1a1a] font-semibold text-sm tracking-wide group-hover:text-[#1a1a1a] transition-colors">
          {label}
        </p>
        <p className="text-[#1a1a1a]/45 text-xs mt-0.5 truncate">{description}</p>
      </div>

      {/* Arrow */}
      <ChevronRight className="w-4 h-4 text-[#1a1a1a]/15 group-hover:text-[#C9A84C] transition-all duration-300 group-hover:translate-x-1 flex-shrink-0" />
    </motion.a>
  );
}

/* ─── Page ─── */
export default function Links() {
  useEffect(() => {
    document.title = "Links · Inovando na Sua Obra";
    const setMeta = (prop: string, content: string) => {
      let el = document.querySelector(`meta[property="${prop}"]`) || document.querySelector(`meta[name="${prop}"]`);
      if (!el) { el = document.createElement("meta"); (prop.startsWith("og:") ? el.setAttribute("property", prop) : el.setAttribute("name", prop)); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("og:title", "Links · Inovando na Sua Obra");
    setMeta("og:description", "Acesse todos os links da Inovando na Sua Obra: site oficial, materiais de obra, Instagram e mais.");
    setMeta("og:url", "https://www.inovandonasuaobra.com.br/links");
    setMeta("og:image", "https://www.inovandonasuaobra.com.br/images/mentoria/og-mentoria.png");
  }, []);

  return (
    <div className="min-h-screen bg-[#f0ede8] flex flex-col items-center relative overflow-hidden">
      {/* Subtle architectural grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <div className="absolute top-0 w-px h-full bg-[#1a1a1a]" style={{ left: "5%" }} />
        <div className="absolute top-0 w-px h-full bg-[#1a1a1a]" style={{ left: "35%" }} />
        <div className="absolute top-0 w-px h-full bg-[#1a1a1a]" style={{ left: "65%" }} />
        <div className="absolute top-0 w-px h-full bg-[#1a1a1a]" style={{ left: "95%" }} />
        <div className="absolute left-0 h-px w-full bg-[#1a1a1a]" style={{ top: "10%" }} />
        <div className="absolute left-0 h-px w-full bg-[#1a1a1a]" style={{ top: "50%" }} />
        <div className="absolute left-0 h-px w-full bg-[#1a1a1a]" style={{ top: "90%" }} />
      </div>

      {/* Warm ambient glow */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#C9A84C]/[0.05] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[420px] mx-auto px-5 pt-14 pb-20 flex flex-col items-center min-h-screen">

        {/* Profile photo with elegant ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative mb-6"
        >
          {/* Outer decorative ring */}
          <div className="absolute -inset-2 rounded-full border border-[#C9A84C]/15" />
          <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-[3px] border-[#C9A84C]/25 shadow-[0_8px_40px_rgba(201,168,76,0.12)]">
            <img
              src={inovandoObraImg}
              alt="Ingrid Zarza e Fernanda Bradaschia"
              className="w-full h-full object-cover object-[center_20%]"
            />
          </div>
          {/* Verified badge */}
          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#2E7D32] rounded-full border-[3px] border-[#f0ede8] flex items-center justify-center shadow-sm">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white fill-current">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
        </motion.div>

        {/* Name & bio */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-10"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] font-semibold mb-2">
            Arquitetas & Mentoras
          </p>
          <h1 className="font-display text-xl font-bold text-[#1a1a1a] uppercase tracking-wider mb-3">
            Inovando na Sua Obra
          </h1>
          <p className="text-[#1a1a1a]/50 text-xs leading-relaxed max-w-[300px] mx-auto">
            Ingrid Zarza & Fernanda Bradaschia · +20 anos de experiência · +250 obras gerenciadas
          </p>

          {/* Subtle divider */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="w-8 h-px bg-[#C9A84C]/25" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#C9A84C]/25" />
            <div className="w-8 h-px bg-[#C9A84C]/25" />
          </div>
        </motion.div>

        {/* Link cards */}
        <div className="w-full flex flex-col gap-3 mb-12">
          {LINKS.map((link, i) => (
            <LinkCard key={link.href} {...link} index={i} />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-auto flex flex-col items-center gap-3"
        >
          <img
            src={logoLight}
            alt="Inovando na Sua Obra"
            className="h-9 opacity-20 hover:opacity-40 transition-opacity duration-500 mix-blend-multiply"
          />
        </motion.div>
      </div>
    </div>
  );
}
