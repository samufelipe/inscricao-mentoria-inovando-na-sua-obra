

# Correcao da Composicao Hero - Fade Blending com Atmosfera Dark

## Problema Atual
A implementacao CSS atual tem varios problemas:
- Imagens cortadas de forma estranha, mostrando paredes/teto ao inves dos rostos
- Sem atmosfera dark como na imagem de referencia
- Posicionamento e tamanhos incorretos que nao criam uma composicao harmonica
- No desktop, as imagens ficam muito separadas e descoordenadas

## Referencia Visual
A imagem de referencia (feita no Nano Banana) mostra:
- Fundo **escuro/cinematico** com vinheta nas bordas
- As 4 fotos se fundem suavemente com tons escuros entre elas
- A imagem central (3 mulheres em pe) e a maior e mais iluminada
- As laterais tem um tom mais escuro, criando profundidade
- Formato panoramico (widescreen)

## Solucao

### 1. Ajustar posicionamento das imagens
- Imagem central (`hero-main`): ocupar **60%** da largura, centralizada, com `object-position: top` para focar nos rostos/corpos
- Imagem esquerda (`hero-left`): posicionar a partir da borda esquerda, com fade suave para a direita
- Imagem direita (`hero-right`): posicionar a partir da borda direita, com fade suave para a esquerda  
- Imagem far (`hero-far`): posicionar atras de uma das laterais como camada extra de profundidade

### 2. Adicionar atmosfera dark
- Aplicar um overlay escuro semi-transparente sobre toda a composicao (`bg-black/40` a `bg-black/60`)
- Adicionar vinheta nas bordas usando gradientes radiais escuros
- A imagem central fica mais luminosa que as laterais naturalmente pelo posicionamento dos gradientes
- Gradiente inferior faz a transicao suave para o fundo beige da pagina

### 3. Melhorar os masks de fade
- Usar gradientes mais suaves com mais pontos de parada (multi-stop gradients)
- A imagem central tambem recebe um mask leve nas bordas para se integrar melhor
- As laterais recebem masks mais agressivos para desaparecer nas bordas externas

### 4. Responsividade mobile
- Mobile: altura de 300px com `object-position` focando nos rostos
- Tablet: 400px
- Desktop: 500-550px
- As proporcoes das imagens se ajustam para nao cortar rostos em telas menores

### 5. Gradiente de transicao inferior
- Em vez de transicao abrupta, criar um gradiente de `black/60` para `oklch(0.97_0.01_95)` (fundo da pagina) na parte inferior

## Arquivo editado
- `client/src/pages/AlemDaTendencia.tsx` - Secao hero (linhas 57-103)

## Detalhes tecnicos

```text
Estrutura da composicao revisada:

<div class="relative w-full h-[300px] md:h-[500px] bg-black overflow-hidden">
  
  <!-- Camada 1: Imagem far-left (profundidade) -->
  <img src={heroFar} 
       mask: fade nas bordas
       class="absolute left-0 w-[28%] opacity-70" />
  
  <!-- Camada 2: Imagem left -->
  <img src={heroLeft}
       mask: gradient right-to-left fade
       class="absolute left-[5%] w-[40%] z-2" />
  
  <!-- Camada 3: Imagem CENTRAL (principal, maior) -->
  <img src={heroMain}
       mask: fade suave nas bordas laterais
       class="absolute center w-[55%] z-10" />
  
  <!-- Camada 4: Imagem right -->
  <img src={heroRight}
       mask: gradient left-to-right fade
       class="absolute right-0 w-[35%] z-2" />
  
  <!-- Overlay dark cinematico -->
  <div class="absolute inset-0 bg-black/30 z-15" />
  
  <!-- Vinheta radial -->
  <div class="absolute inset-0 z-16"
       style="background: radial-gradient(ellipse, transparent 40%, black 100%)" />
  
  <!-- Gradiente inferior para transicao ao fundo da pagina -->
  <div class="absolute bottom-0 h-1/3 bg-gradient-to-b 
       from-transparent to-[oklch(0.97_0.01_95)] z-20" />
</div>
```

A diferenca principal em relacao a implementacao anterior:
- Fundo `bg-black` no container (preenche espacos entre imagens com preto)
- Overlay dark + vinheta radial criam a atmosfera cinematica da referencia
- Imagens maiores com mais sobreposicao entre si
- Masks com gradientes multi-stop mais suaves
- object-position ajustado para focar nas pessoas, nao no teto/paredes

