import { ArchitecturalTitle } from "./architectural-title";
import { ArchitecturalSection } from "./architectural-section";
import sponsorHomeney from "@/assets/alem-da-tendencia/sponsors/homeney.png";
import sponsorGuararapes from "@/assets/alem-da-tendencia/sponsors/guararapes.png";
import sponsorWikeep from "@/assets/alem-da-tendencia/sponsors/wikeep.png";

const sponsors = [
  { name: "Homeney Acabamentos", logo: sponsorHomeney },
  { name: "Guararapes", logo: sponsorGuararapes },
  { name: "Wikeep", logo: sponsorWikeep },
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

      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 lg:gap-20 max-w-6xl mx-auto">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.name}
            className="hover:scale-105 transition-all duration-500"
          >
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="h-40 md:h-52 lg:h-64 w-auto object-contain mix-blend-multiply transition-all duration-500"
            />
          </div>
        ))}
      </div>
    </ArchitecturalSection>
  );
}
