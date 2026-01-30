import { Button } from "@/components/ui/button";
import { MENTORIA_VIDEO_TESTIMONIALS, MENTORIA_IMAGES } from "@/lib/mentoria-constants";
import { Play, Quote } from "lucide-react";
import MentoriaImage from "./MentoriaImage";

interface MentoriaTestimonialsProps {
  onCtaClick: () => void;
}

const testimonialImages: Record<string, string> = {
  "Beatriz Francini": MENTORIA_IMAGES.testimonial1,
  "Ingrid Cristina": MENTORIA_IMAGES.testimonial2,
  "Mônique Figueiredo": MENTORIA_IMAGES.testimonial3,
  "Aline Araujo": MENTORIA_IMAGES.testimonial4,
};

export default function MentoriaTestimonials({ onCtaClick }: MentoriaTestimonialsProps) {
  return (
    <section className="py-20 md:py-28 bg-[#5D4037]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 animate-fade-up">
          <p className="text-primary font-medium text-lg mb-2">Depoimentos</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Veja o que dizem nossas alunas
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-14">
          {MENTORIA_VIDEO_TESTIMONIALS.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden animate-fade-up group cursor-pointer hover:bg-white/15 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <MentoriaImage
                  src={testimonialImages[testimonial.name]}
                  alt={testimonial.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Play className="w-6 h-6 text-foreground ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Quote icon */}
                <div className="absolute top-4 left-4">
                  <Quote className="w-6 h-6 text-primary" fill="currentColor" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-lg font-bold text-primary mb-1">{testimonial.name}</p>
                <p className="text-xs text-white/70 mb-3">{testimonial.role}</p>
                <p className="text-white/90 text-sm italic leading-relaxed">{testimonial.quote}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center animate-fade-up">
          <Button
            onClick={onCtaClick}
            size="lg"
            className="bg-[#9ACD32] hover:bg-[#8BC52A] text-foreground font-bold text-base px-12 h-14 uppercase shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            Quero entrar na mentoria
          </Button>
        </div>
      </div>
    </section>
  );
}
