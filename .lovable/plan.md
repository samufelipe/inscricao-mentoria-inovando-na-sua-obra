
# Otimizacao da Visibilidade da Imagem Hero

## Problema Atual

A foto das tres mulheres (heroMain) esta praticamente invisivel porque:

1. **Object-position muito alto** (`center 15%`) -- mostra so a parte superior da imagem
2. **Overlay escuro muito agressivo** -- comeca a escurecer a partir de 45% da altura, cobrindo os rostos
3. **Spacer minimo no mobile** (`min-h-[20px]`) -- empurra o conteudo para cima das imagens
4. **Formulario sobrepoe a area da imagem** no grid de 2 colunas

---

## Solucao Proposta

### 1. Aumentar a altura minima da hero

Dar mais espaco vertical para as imagens respirarem antes do conteudo comecar.

- Mobile: de `min-h-[60vh]` para `min-h-[75vh]`
- Desktop: manter `min-h-[90vh]` (ja esta bom)

### 2. Ajustar o object-position da imagem principal

Mudar de `center 15%` para `center 35%` -- isso desce o enquadramento para mostrar o torso e rostos das mulheres em vez de so o topo das cabecas.

### 3. Suavizar o overlay gradiente

O gradiente atual escurece cedo demais. Ajustar para comecar a escurecer mais abaixo, preservando a area das imagens:

- Atual: `transparent 25%, rgba(0.5) 45%, rgba(0.85) 65%, solid 85%`
- Novo: `transparent 35%, rgba(0.4) 55%, rgba(0.85) 75%, solid 90%`

### 4. Reduzir a opacidade do overlay mobile

O overlay mobile (`bg-black/40`) esta muito pesado. Reduzir para `bg-black/25`.

### 5. Aumentar o spacer para empurrar conteudo mais para baixo

Garantir que o conteudo de texto/formulario fique na parte inferior, deixando a area da imagem visivel:

- Mobile: de `min-h-[20px]` para `min-h-[80px]`
- Desktop: manter `min-h-[180px]`

---

## Detalhes Tecnicos

### Arquivo: `client/src/pages/AlemDaTendencia.tsx`

**Alteracao 1 -- Altura da hero (linha 69):**
```
Antes: min-h-[60vh] md:min-h-[90vh]
Depois: min-h-[75vh] md:min-h-[90vh]
```

**Alteracao 2 -- Object-position da heroMain (linhas 87-92):**
```
Antes: object-[center_15%] / objectPosition: 'center 15%'
Depois: object-[center_35%] / objectPosition: 'center 35%'
```

**Alteracao 3 -- Overlay gradiente (linha 108):**
```
Antes: transparent 0%, transparent 25%, rgba(26,26,26,0.5) 45%, rgba(26,26,26,0.85) 65%, #1a1a1a 85%
Depois: transparent 0%, transparent 35%, rgba(26,26,26,0.4) 55%, rgba(26,26,26,0.85) 75%, #1a1a1a 90%
```

**Alteracao 4 -- Overlay mobile (linha 116):**
```
Antes: bg-black/40
Depois: bg-black/25
```

**Alteracao 5 -- Spacer (linha 136):**
```
Antes: min-h-[20px] md:min-h-[180px]
Depois: min-h-[80px] md:min-h-[180px]
```

### Resumo do impacto

| Alteracao | Efeito |
|---|---|
| Hero mais alta no mobile | Mais espaco vertical para imagem + conteudo |
| Object-position 35% | Rostos e torso das mulheres visiveis |
| Gradiente mais suave | Imagem visivel por mais tempo antes de escurecer |
| Overlay mobile mais leve | Foto mais visivel no celular |
| Spacer maior no mobile | Conteudo desce, liberando area da imagem |

Nenhuma mudanca estrutural -- apenas ajustes de CSS em 5 propriedades no mesmo arquivo.
