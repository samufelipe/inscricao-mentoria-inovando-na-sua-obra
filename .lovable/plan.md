
# Plano: Redesign Clean e Profissional da LP Mentoria

## Resumo do Problema

A Landing Page atual da Mentoria (`/mentoria`) apresenta problemas de design, layout inconsistente, imagens com carregamento falho (URLs externas do WordPress), e warnings de `forwardRef` no console. A página precisa de um redesign completo para ficar mais clean, profissional e fiel às referências originais.

## Problemas Identificados

1. **Imagens externas com problemas de carregamento**: Todas as URLs apontam para `inovandonasuaobra.com.br` que pode ter problemas de CORS ou disponibilidade
2. **Warnings de console**: `MentoriaFooter` e `MentoriaMobileCTA` gerando erros de `forwardRef`
3. **Layout inconsistente**: Espaçamentos irregulares, tipografia sem hierarquia clara
4. **Seção de Testimonials**: Cards com placeholders em vez de imagens reais
5. **Design sem respiração**: Seções muito comprimidas, sem espaço em branco adequado
6. **Paleta de cores pouco harmônica**: Uso excessivo de cores sem contraste adequado

## Solução: Redesign em 5 Frentes

### 1. Sistema de Imagens Resiliente

Criar fallback local para todas as imagens críticas e adicionar estados de loading/error para imagens externas.

**Arquivos afetados:**
- `src/lib/mentoria-constants.ts` - Adicionar mapeamento de fallbacks locais
- Componentes que usam imagens - Adicionar `onError` handlers

### 2. Correção dos Warnings de Console

Corrigir os componentes que geram warnings de `forwardRef`.

**Arquivos afetados:**
- `src/components/mentoria/MentoriaFooter.tsx` - Converter para componente correto
- `src/components/mentoria/MentoriaMobileCTA.tsx` - Adicionar forwardRef se necessário

### 3. Hero Section Premium

Redesign completo do Hero com:
- Formulário mais elegante com sombra suave e bordas arredondadas
- Melhor hierarquia tipográfica
- Imagem das mentoras com tratamento visual (sombra, máscara)
- Badges de prova social

**Arquivos afetados:**
- `src/components/mentoria/MentoriaHero.tsx`

### 4. Seções com Design Limpo

Aplicar design system consistente em todas as seções:
- Espaçamentos padronizados (py-20 md:py-28)
- Títulos com decoração sutil (linha dourada abaixo)
- Cards com sombras suaves e bordas sutis
- Transições de cores entre seções mais harmônicas

**Arquivos afetados:**
- `src/components/mentoria/MentoriaSkills.tsx`
- `src/components/mentoria/MentoriaAudience.tsx`
- `src/components/mentoria/MentoriaHowItWorks.tsx`
- `src/components/mentoria/MentoriaModules.tsx`
- `src/components/mentoria/MentoriaDocuments.tsx`
- `src/components/mentoria/MentoriaRevenue.tsx`
- `src/components/mentoria/MentoriaPricing.tsx`
- `src/components/mentoria/MentoriaTestimonials.tsx`
- `src/components/mentoria/MentoriaGuarantee.tsx`
- `src/components/mentoria/MentoriaMentors.tsx`
- `src/components/mentoria/MentoriaFAQ.tsx`

### 5. Detalhes de Polimento

- Scroll-triggered animations mais suaves
- Micro-interações em hover
- Footer redesenhado
- Mobile CTA com design mais elegante

**Arquivos afetados:**
- `src/components/mentoria/MentoriaFooter.tsx`
- `src/components/mentoria/MentoriaMobileCTA.tsx`
- `src/index.css` - Adicionar novas animações

---

## Implementação Detalhada

### Fase 1: Sistema de Imagens com Fallback

Atualizar `mentoria-constants.ts` para incluir componente de imagem resiliente:

```typescript
// Adicionar helper para imagens com fallback
export const MENTORIA_FALLBACK_IMAGES = {
  placeholder: "/placeholder.svg",
  gradient: "linear-gradient(135deg, #f5f0e8 0%, #e8dfd0 100%)"
};
```

Criar componente `MentoriaImage.tsx`:
- Aceita `src`, `fallbackSrc`, `alt`
- Mostra skeleton durante loading
- Fallback gracioso em caso de erro

### Fase 2: Hero Redesenhado

**Novo layout:**
```
┌────────────────────────────────────────────────────────┐
│                    FUNDO BEGE #f5f0e8                 │
│                                                        │
│   ┌──────────────────────┐  ┌──────────────────────┐  │
│   │                      │  │                      │  │
│   │  TÍTULO IMPACTANTE   │  │  IMAGEM MENTORAS     │  │
│   │  com destaque dourado│  │  com sombra suave    │  │
│   │                      │  │                      │  │
│   │  Subtítulo elegante  │  └──────────────────────┘  │
│   │                      │                            │
│   │  ┌────────────────┐  │                            │
│   │  │  FORM CARD     │  │                            │
│   │  │  Nome          │  │                            │
│   │  │  Email         │  │                            │
│   │  │  [CTA VERDE]   │  │                            │
│   │  └────────────────┘  │                            │
│   └──────────────────────┘                            │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Fase 3: Design System Consistente

**Paleta refinada:**
- Background principal: `#FDFBF7` (off-white mais suave)
- Background alternativo: `#f5f0e8` (bege atual)
- Texto principal: `#1a1a1a` (preto suavizado)
- Accent: `#9ACD32` (lime green)
- Accent secundário: `#5D4037` (marrom)
- Dourado: `hsl(45, 100%, 50%)` (já existente)

**Tipografia:**
- Títulos: Font-weight mais leve (600-700)
- Subtítulos em itálico com cor dourada
- Corpo de texto com line-height 1.7

**Espaçamentos:**
- Seções: `py-20 md:py-28` (mais respiro)
- Container: `max-w-6xl` (mais compacto e elegante)

### Fase 4: Cards e Componentes

**Skills Cards:**
- Fundo branco com sombra `shadow-sm`
- Borda sutil `border border-border`
- Ícones dourados menores e mais elegantes

**Modules:**
- Cards com imagem ocupando mais espaço
- Numeração mais discreta
- Lista de tópicos com tipografia mais clean

**Pricing Card:**
- Destaque central na página
- Badge "MAIS POPULAR" ou "RECOMENDADO"
- Preço com animação sutil de entrada

### Fase 5: Testimonials com Imagens Reais

Atualizar para usar as imagens das alunas que já estão referenciadas em `MENTORIA_IMAGES`:
- `testimonial1`, `testimonial2`, `testimonial3`, `testimonial4`

Cada card terá:
- Foto circular da aluna
- Nome e profissão
- Quote em itálico
- Ícone de aspas decorativo

---

## Arquivos a Modificar

| Arquivo | Tipo de Mudança |
|---------|-----------------|
| `src/lib/mentoria-constants.ts` | Adicionar sistema de fallback |
| `src/components/mentoria/MentoriaHero.tsx` | Redesign completo |
| `src/components/mentoria/MentoriaSkills.tsx` | Polish de design |
| `src/components/mentoria/MentoriaAudience.tsx` | Polish de design |
| `src/components/mentoria/MentoriaHowItWorks.tsx` | Polish de design |
| `src/components/mentoria/MentoriaModules.tsx` | Redesign dos cards |
| `src/components/mentoria/MentoriaDocuments.tsx` | Polish de design |
| `src/components/mentoria/MentoriaRevenue.tsx` | Polish de design |
| `src/components/mentoria/MentoriaPricing.tsx` | Redesign premium |
| `src/components/mentoria/MentoriaTestimonials.tsx` | Adicionar fotos reais |
| `src/components/mentoria/MentoriaGuarantee.tsx` | Polish de design |
| `src/components/mentoria/MentoriaMentors.tsx` | Polish de design |
| `src/components/mentoria/MentoriaFAQ.tsx` | Polish de design |
| `src/components/mentoria/MentoriaFooter.tsx` | Corrigir forwardRef + redesign |
| `src/components/mentoria/MentoriaMobileCTA.tsx` | Corrigir forwardRef + polish |
| `src/index.css` | Novas animações e utilities |

## Arquivos a Criar

| Arquivo | Propósito |
|---------|-----------|
| `src/components/mentoria/MentoriaImage.tsx` | Componente de imagem resiliente |

---

## Resultado Esperado

- Design clean e profissional alinhado com padrões modernos
- Imagens carregando corretamente com fallbacks
- Console sem warnings
- Experiência de usuário fluida com animações suaves
- Alta conversão com formulários bem posicionados
- Mobile-first com CTA sticky elegante
