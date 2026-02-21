

# Otimizacao Hero Desktop + Correcao de Build Errors

## Problemas identificados

### 1. Imagem cortada no desktop
A imagem hero no desktop usa `object-cover` dentro de um container `min-h-[90vh]`, o que faz a imagem expandir e cortar as pessoas. A solucao e mudar a estrategia de exibicao para que a imagem apareca completa, usando `object-contain` ou ajustando o layout para que o container respeite as proporcoes da imagem.

### 2. Build errors (color="white")
Existem dois usos de `color="white"` no componente `ArchitecturalTitle` (linhas 328 e 425), mas o tipo so aceita `"dark" | "light" | "orange" | "purple"`. Precisa trocar para `color="light"`.

## Solucao proposta

### A. Imagem hero desktop visivel por completo

Mudar a abordagem da imagem de background para que ela apareca inteira sem cortes:

- Trocar `object-cover` para `object-contain` na imagem hero desktop
- Adicionar `bg-[#1a1a1a]` no container da imagem para preencher as laterais com fundo escuro
- Manter os gradientes de overlay para legibilidade do texto
- Ajustar `objectPosition` para `center center` ja que a imagem estara contida

### B. Corrigir build errors

- Linha 328: trocar `color="white"` para `color="light"`
- Linha 425: trocar `color="white"` para `color="light"`

## Detalhes tecnicos

### Arquivo: `client/src/pages/AlemDaTendencia.tsx`

| Alteracao | Linha | De | Para |
|-----------|-------|-----|------|
| Imagem desktop | 153 | `object-cover` | `object-contain` |
| objectPosition | 155 | `center 20%` | `center center` |
| Build error 1 | 328 | `color="white"` | `color="light"` |
| Build error 2 | 425 | `color="white"` | `color="light"` |

### Impacto
- A imagem aparecera completa no desktop, sem cortar as pessoas
- O fundo escuro preenche as areas laterais mantendo a estetica
- Os dois erros de build serao corrigidos

