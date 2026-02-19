

# Composicao Hero com 4 Fotos - Fade Blending via CSS

## O que foi entendido errado
Na implementacao anterior, substituimos a hero por uma unica foto. O correto e criar uma **composicao visual com as 4 fotos fundidas**, usando gradientes CSS para mesclar as bordas entre elas, com a foto das tres mulheres em pe (DSC03181_1.jpg) como imagem **central e principal**.

## Como funciona o Fade Blending via CSS

A tecnica usa `mask-image` com gradientes lineares para fazer as bordas de cada imagem "desaparecerem" suavemente, criando uma transicao fluida entre elas.

```text
Layout da composicao (desktop):
  [DSC03085] [DSC03181_1 - PRINCIPAL] [DSC03192] [DSC03250]
      fade ->  <- destaque central ->  <- fade

Layout da composicao (mobile):
  Mesma composicao mas com alturas ajustadas e posicionamento
  otimizado para telas menores
```

## Alteracoes

### 1. Adicionar as 4 imagens como assets
- Copiar `DSC03181_1.jpg` como `hero-main.png` (imagem central/principal)
- Copiar `DSC03085.jpg` como `hero-left.png`
- Copiar `DSC03192.jpg` como `hero-right.png`
- Copiar `DSC03250.jpg` como `hero-far.png`
- Todas em `client/src/assets/alem-da-tendencia/`

### 2. Substituir a imagem unica por composicao CSS
No `AlemDaTendencia.tsx`, a area da hero image (linhas 56-70) sera substituida por um container com 4 imagens sobrepostas usando:

- **position: absolute** para empilhar as imagens
- **CSS `mask-image`** com gradientes lineares para criar o fade nas bordas de cada foto
- A imagem central (tres mulheres) fica com **z-index maior** e **sem mascara** (ou mascara minima), sendo a mais visivel
- As imagens laterais ficam parcialmente sobrepostas com fade suave nas bordas internas

### 3. Responsividade
- **Desktop**: As 4 fotos lado a lado com sobreposicao e fade entre elas
- **Mobile**: Composicao mantida mas com altura reduzida, ajustando `object-position` para focar nos rostos/corpos

### 4. Arquivo editado
- `client/src/pages/AlemDaTendencia.tsx` - Secao hero (linhas 54-70)

### Detalhes tecnicos

```text
Estrutura CSS da composicao:

<div class="relative w-full h-[300px] md:h-[500px] overflow-hidden">
  <!-- Imagem esquerda (DSC03085) -->
  <img style="mask-image: linear-gradient(to right, black 30%, transparent 100%)"
       class="absolute left-0 w-1/2 h-full object-cover" />

  <!-- Imagem central PRINCIPAL (DSC03181_1) -->
  <img class="absolute left-1/4 w-1/2 h-full object-cover z-10" />

  <!-- Imagem direita (DSC03192) -->
  <img style="mask-image: linear-gradient(to left, black 30%, transparent 100%)"
       class="absolute right-0 w-1/2 h-full object-cover" />

  <!-- Gradient inferior para blend com fundo -->
  <div class="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
</div>
```

A quarta imagem (DSC03250) pode ser posicionada atras de uma das laterais para dar mais profundidade, ou usada em outra secao caso a composicao de 3 fique mais limpa visualmente. Isso sera ajustado durante a implementacao para o melhor resultado.

