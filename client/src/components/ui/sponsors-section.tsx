import { ArchitecturalTitle } from "./architectural-title";
import sponsorHomeney from "@/assets/alem-da-tendencia/sponsors/homeney.png";
import sponsorGuararapes from "@/assets/alem-da-tendencia/sponsors/guararapes.png";

const sponsors = [
  { name: "Homeney Acabamentos", logo: sponsorHomeney },
  { name: "Guararapes", logo: sponsorGuararapes },
];

export function SponsorsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-[oklch(0.75_0.18_65)] font-bold tracking-widest uppercase text-sm mb-3">
            Quem Apoia
          </p>
          <ArchitecturalTitle variant="h2" color="purple">
            Parceiros e Patrocinadores
          </ArchitecturalTitle>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 max-w-4xl mx-auto">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-16 md:h-20 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
