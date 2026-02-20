

# Otimizacao da Hero para Clareza de "Evento Presencial"

## Problema

Um lead que acessa a pagina nao entende imediatamente que se trata de um evento presencial com data e local definidos. Especificamente:

- No **mobile**, os cards de Data e Local estao ocultos (classe `hidden md:flex`), entao nao ha nenhuma referencia a evento presencial na primeira dobra.
- No **desktop**, a informacao de data/local existe mas esta posicionada de forma discreta no canto inferior.
- A palavra "evento" ou "presencial" nao aparece em nenhum ponto da hero.

---

## Solucao Proposta

### 1. Adicionar badge "EVENTO PRESENCIAL" acima do H1

Inserir um micro-badge logo antes do titulo principal, visivel em todos os dispositivos:

```
EVENTO PRESENCIAL  |  SAO PAULO - SP
```

Estilizado como um badge discreto em uppercase, com icone de MapPin, usando as cores gold (#C9A84C) sobre fundo semi-transparente. Funciona como ancora visual que comunica instantaneamente o formato.

### 2. Mostrar data e local no mobile

Remover o `hidden md:flex` dos cards de Data e Local, adaptando-os para mobile com um layout mais compacto:

- Versao mobile: uma unica linha horizontal com "10 de Marco | Auditorio AFRESP - SP" 
- Versao desktop: manter o layout atual com os cards separados

### 3. Ajustar o subtitulo para mencionar o formato

Subtitulo atual:
> "Gestao de obra, escritorio, iluminacao e contratos: o que ninguem mostra nas feiras, mas que define quem cresce de verdade."

Subtitulo novo:
> "Um dia inteiro dedicado ao que ninguem mostra: gestao de obra, escritorio, iluminacao e contratos -- o bastidor que define quem cresce de verdade."

A expressao "Um dia inteiro dedicado" deixa claro que e um evento com duracao definida, sem perder a promessa dos bastidores.

---

## Detalhes Tecnicos

### Arquivo: `client/src/pages/AlemDaTendencia.tsx`

**Alteracao 1 -- Badge de evento presencial (antes do H1, ~linha 147):**
Inserir um novo elemento `div` com badge acima do `h1`:

```tsx
<div className="flex items-center gap-2 mb-3 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#C9A84C] font-semibold">
  <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
  <span>Evento Presencial</span>
  <span className="text-white/30">|</span>
  <span>Sao Paulo - SP</span>
</div>
```

**Alteracao 2 -- Subtitulo (linha 151-153):**
Trocar o texto do paragrafo para:
> "Um dia inteiro dedicado ao que ninguem mostra: gestao de obra, escritorio, iluminacao e contratos -- o bastidor que define quem cresce de verdade."

**Alteracao 3 -- Cards de data/local visiveis no mobile (linhas 159-175):**
Substituir o bloco atual por dois layouts:

- **Mobile** (`flex md:hidden`): layout compacto em uma linha com data e local lado a lado, fonte menor
- **Desktop** (`hidden md:flex`): manter o layout atual com os cards detalhados

```tsx
{/* Mobile: compacto */}
<div className="flex md:hidden items-center gap-3 text-xs text-white/80 bg-white/5 backdrop-blur-md px-4 py-3 rounded-xl border border-white/15">
  <Calendar className="w-4 h-4 text-[#C9A84C] shrink-0" />
  <span className="font-semibold text-white">10 de Marco</span>
  <span className="text-white/30">|</span>
  <MapPin className="w-4 h-4 text-[#C9A84C] shrink-0" />
  <span className="font-semibold text-white">AFRESP - SP</span>
</div>

{/* Desktop: cards detalhados (manter atual) */}
<div className="hidden md:flex ...">
  ...
</div>
```

### Resumo das alteracoes

| O que muda | Onde | Impacto |
|---|---|---|
| Badge "Evento Presencial - Sao Paulo" | Acima do H1 (mobile + desktop) | Clareza imediata do formato |
| Subtitulo com "Um dia inteiro dedicado" | Paragrafo abaixo do H1 | Reforco de que e um evento com duracao |
| Cards de data/local no mobile | Abaixo do subtitulo | Informacao critica visivel em qualquer dispositivo |

Nenhuma alteracao de layout, componentes ou estrutura. Apenas copy e visibilidade de elementos existentes.

