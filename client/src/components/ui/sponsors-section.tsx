import { ArchitecturalTitle } from "./architectural-title";
import { ArchitecturalSection } from "./architectural-section";
import sponsorHomeney from "@/assets/alem-da-tendencia/sponsors/homeney.png";
import sponsorGuararapes from "@/assets/alem-da-tendencia/sponsors/guararapes.png";
import sponsorWikeep from "@/assets/alem-da-tendencia/sponsors/wikeep.png";
import sponsorKairox from "@/assets/alem-da-tendencia/sponsors/kairox-ai.png";

const sponsors = [
  { name: "Homeney Acabamentos", logo: sponsorHomeney, className: "" },
  { name: "Guararapes", logo: sponsorGuararapes, className: "" },
  { name: "Wikeep", logo: sponsorWikeep, className: "" },
  { name: "Kairox AI", logo: sponsorKairox, className: "scale-125" },
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

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 md:gap-x-16 md:gap-y-4 lg:gap-x-20 lg:gap-y-4 max-w-6xl mx-auto">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.name}
            className="hover:scale-105 transition-all duration-500"
          >
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className={`h-40 md:h-52 lg:h-64 w-auto object-contain mix-blend-multiply transition-all duration-500 ${sponsor.className}`}
            />
          </div>
        ))}
      </div>
    </ArchitecturalSection>
  );
}
