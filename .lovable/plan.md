

# Otimizacao da imagem Hero - Tres anfitrias visiveis

## Problemas identificados

### Desktop (image-82)
- `object-position: center 15%` puxa a imagem para cima demais, mostrando teto/estrutura metalica
- O gradiente escuro comeca a cobrir a partir de 55% da altura, exatamente onde as mulheres ficam posicionadas
- O formulario no canto direito nao e o problema principal - e a combinacao de posicao + overlay

### Mobile (image-81)
- Mesmo problema de `object-position: center 15%` mostrando teto
- O overlay adicional `bg-black/25` + vinheta radial escurecem demais os rostos
- As mulheres aparecem na metade inferior, ja na zona do gradiente escuro

## Solucao proposta

### 1. Reposicionar a imagem (Desktop e Mobile)

Trocar `object-position` de `center 15%` para `center 38%` - isso "desce" o enquadramento para centralizar nos rostos/bustos das tres mulheres em vez do teto.

- **Desktop:** `objectPosition: 'center 38%'`
- **Mobile:** `object-[center_38%]`

### 2. Ajustar o gradiente de overlay (Desktop e Mobile)

O gradiente atual comeca a escurecer a partir de 35% da altura, ficando forte demais em 55%. Vou empurrar o inicio do escurecimento mais para baixo, deixando a area central (onde as mulheres estao) mais clara:

De:
```text
transparent 0% -> transparent 35% -> rgba(0.4) 55% -> rgba(0.85) 75% -> solido 90%
```
Para:
```text
transparent 0% -> transparent 50% -> rgba(0.4) 65% -> rgba(0.85) 80% -> solido 92%
```

Isso mantem a legibilidade do texto na parte inferior mas libera a area central para as mulheres aparecerem.

### 3. Reduzir overlay mobile

- Reduzir o overlay fixo mobile de `bg-black/25` para `bg-black/10`
- Suavizar a vinheta radial: mudar de `transparent 30%` para `transparent 45%`

### 4. Reduzir o spacer superior

O spacer `min-h-[80px] md:min-h-[180px]` empurra o conteudo para baixo. Reduzir para `min-h-[40px] md:min-h-[100px]` para que o texto e formulario nao fiquem tao baixos (na zona mais escura), liberando mais area visivel das mulheres acima.

## Detalhes tecnicos

### Arquivo modificado

`client/src/pages/AlemDaTendencia.tsx`

| Alteracao | Linha | De | Para |
|-----------|-------|-----|------|
| object-position mobile | ~88 | `object-[center_15%]` | `object-[center_38%]` |
| object-position desktop | ~101 | `center 15%` | `center 38%` |
| Gradiente overlay | ~118 | `transparent 35%, rgba 55%, rgba 75%, solido 90%` | `transparent 50%, rgba 65%, rgba 80%, solido 92%` |
| Overlay mobile | ~126 | `bg-black/25` | `bg-black/10` |
| Vinheta radial | ~123 | `transparent 30%` | `transparent 45%` |
| Spacer | ~146 | `min-h-[80px] md:min-h-[180px]` | `min-h-[40px] md:min-h-[100px]` |

### Impacto

- Apenas a pagina Alem da Tendencia e afetada
- Nenhum outro componente ou pagina e modificado
- A legibilidade do texto e mantida pelo gradiente (apenas empurrado mais para baixo)

