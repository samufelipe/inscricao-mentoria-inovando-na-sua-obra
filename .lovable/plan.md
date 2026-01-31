
# Plano: Correção de Erros de Build e Validação do Deploy

## Problema Identificado

O arquivo `src/components/mentoria/MentoriaTestimonials.tsx` contém **caracteres `\n` literais** (strings escapadas) em vez de quebras de linha reais, causando erros de sintaxe:

**Linha 3:**
```typescript
import { Quote } from "lucide-react";\nimport VimeoPlayer from "./VimeoPlayer";
```

**Linha 30:**
```typescript
<div className="relative">\n                <VimeoPlayer\n...
```

Esses `\n` literais quebram o parser do TypeScript e impedem a compilação.

## Correção Necessária

### 1. Corrigir `MentoriaTestimonials.tsx`

Reescrever o arquivo com quebras de linha corretas:

```typescript
import { Button } from "@/components/ui/button";
import { MENTORIA_VIDEO_TESTIMONIALS, MENTORIA_IMAGES } from "@/lib/mentoria-constants";
import { Quote } from "lucide-react";
import VimeoPlayer from "./VimeoPlayer";
import MentoriaImage from "./MentoriaImage";

interface MentoriaTestimonialsProps {
  onCtaClick: () => void;
}

export default function MentoriaTestimonials({ onCtaClick }: MentoriaTestimonialsProps) {
  return (
    <section className="py-20 md:py-28 bg-[#282828]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14 animate-fade-up">
          <p className="text-primary font-medium text-lg mb-2">Depoimentos</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Veja o que dizem nossas alunas
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-14">
          {MENTORIA_VIDEO_TESTIMONIALS.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-2xl overflow-hidden animate-fade-up group transition-all duration-300 border border-white/10 shadow-2xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Vimeo Video Player */}
              <div className="relative">
                <VimeoPlayer
                  vimeoId={testimonial.vimeoId}
                  title={`Depoimento de ${testimonial.name}`}
                  className="mb-4"
                />
                {/* Quote icon */}
                <div className="absolute top-4 right-4">
                  <Quote className="w-6 h-6 text-primary" fill="currentColor" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5 pt-0">
                <p className="text-lg font-bold text-primary mb-1">{testimonial.name}</p>
                <p className="text-xs text-white/70 mb-3">{testimonial.role}</p>
                <p className="text-white/90 text-sm italic leading-relaxed">{testimonial.quote}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center animate-fade-up">
          <Button
            onClick={onCtaClick}
            size="lg"
            className="bg-[#9ACD32] hover:bg-[#8BC52A] text-white font-bold text-base px-12 h-14 uppercase shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            Quero entrar na mentoria
          </Button>
        </div>
      </div>
    </section>
  );
}
```

## Validação Pós-Correção

Após a correção, validarei:

1. **Build sem erros** - Verificar compilação TypeScript
2. **Design e Tipografia** - Montserrat em títulos, fundo bege, destaques dourados
3. **Mídia** - Imagens e vídeos Vimeo carregando corretamente
4. **Formulários de Lead** - Testar captura no Hero e redirecionamento para checkout

## Arquivos a Modificar

| Arquivo | Mudança |
|---------|---------|
| `src/components/mentoria/MentoriaTestimonials.tsx` | Corrigir caracteres `\n` literais |

## Resultado Esperado

- Build compilando sem erros
- Página `/mentoria` renderizando corretamente
- Vídeos Vimeo carregando nos depoimentos
- Formulários funcionais com integração RD Station → Hotmart
