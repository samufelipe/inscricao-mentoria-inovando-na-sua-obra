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
    <ArchitecturalSection variant="light" className="bg-gray-50">
      <div className="text-center mb-14">
        <p className="text-[#C9A84C] font-bold tracking-[0.2em] uppercase text-xs mb-4">
          Realização e Apoio
        </p>
        <ArchitecturalTitle variant="h2" color="purple">
          Parceiros Oficiais
        </ArchitecturalTitle>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-16 md:gap-24 max-w-5xl mx-auto">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.name}
            className="hover:scale-105 transition-all duration-500"
          >
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="h-32 md:h-48 lg:h-60 w-auto object-contain mix-blend-multiply transition-all duration-500"
            />
          </div>
        ))}
      </div>
    </ArchitecturalSection>
  );
}
