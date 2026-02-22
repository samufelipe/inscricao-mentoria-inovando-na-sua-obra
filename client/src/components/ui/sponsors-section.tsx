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
    <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#faf8f5' }}>
      {/* Subtle grid lines like the previous section */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 199px, rgba(0,0,0,0.03) 199px, rgba(0,0,0,0.03) 200px)', backgroundSize: '200px 100%' }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 199px, rgba(0,0,0,0.03) 199px, rgba(0,0,0,0.03) 200px)', backgroundSize: '100% 200px' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <p className="text-[#C9A84C] font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Realização e Apoio
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] uppercase tracking-wide">
            Parceiros Oficiais
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 max-w-5xl mx-auto">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="grayscale hover:grayscale-0 transition-all duration-500 transform hover:scale-105 p-8 md:p-10 rounded-xl border border-black/5 hover:border-[#C9A84C]/30 bg-white/60 hover:bg-white hover:shadow-lg"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-20 md:h-28 lg:h-36 w-auto object-contain transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
