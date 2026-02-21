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
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-gray-400 font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Realização e Apoio
          </p>
          {/* Título reduzido conforme solicitado */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 uppercase tracking-wide">
            Parceiros Oficiais
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-16 md:gap-24 max-w-5xl mx-auto">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500 transform hover:scale-105"
            >
              {/* Logos aumentados conforme solicitado */}
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-28 md:h-40 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
