import { ArchitecturalTitle } from "./architectural-title";
import { ArchitecturalSection } from "./architectural-section";
import sponsorHomeney from "@/assets/alem-da-tendencia/sponsors/homeney.png";
import sponsorGuararapes from "@/assets/alem-da-tendencia/sponsors/guararapes.png";

const sponsors = [
  { name: "Homeney Acabamentos", logo: sponsorHomeney },
  { name: "Guararapes", logo: sponsorGuararapes },
];

export function SponsorsSection() {
  return (
    <section className="py-20 bg-[#1a1a1a] border-t border-white/10 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <p className="text-[#C9A84C] font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Realização e Apoio
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wide">
            Parceiros Oficiais
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-16 md:gap-24 max-w-5xl mx-auto">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 transform hover:scale-105 bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/5 hover:border-[#C9A84C]/30 hover:bg-white/10"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-24 md:h-32 w-auto object-contain brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-500"
                style={{ filter: 'brightness(0) invert(1)' }} // Força logos brancos inicialmente
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
