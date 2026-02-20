

# Montagem de Imagens na Secao "Para Quem E Este Evento"

## Conceito Visual

Inserir as 4 fotos reais de eventos anteriores na secao "PARA QUEM E", criando uma montagem cinematica inspirada no hero -- imagens sobrepostas com masks de gradiente, opacidade controlada e blending -- mantendo o fundo escuro atual (`variant="dark"`).

## Layout Proposto

A composicao ficara ACIMA dos 3 cards de perfil, entre o subtitulo e o grid de cards:

```text
Desktop (md+):
+----------------------------------------------------------+
|           PARA QUEM E ESTE EVENTO?                       |
|   "Voce sai da ExpoRevestir cheia de ideias..."          |
|                                                           |
|   [img1]  [img2 principal]  [img3]  [img4]               |
|    fade     destaque          fade    fade                |
|    overlap  maior/centro      overlap overlap             |
|                                                           |
|   [Card 1]      [Card 2]      [Card 3]                  |
+----------------------------------------------------------+

Mobile:
+-------------------------+
| PARA QUEM E?            |
| subtitulo               |
|                         |
| [img2]  [img1]          |
|  (apenas 2 fotos,      |
|   menor altura)         |
|                         |
| [Card 1]                |
| [Card 2]                |
| [Card 3]                |
+-------------------------+
```

## Detalhes Tecnicos

### Arquivos criados:
1. `client/src/assets/alem-da-tendencia/audience-1.jpg` (DSC03250 - plateia atenta)
2. `client/src/assets/alem-da-tendencia/audience-2.jpg` (DSC03085 - abraco/networking)
3. `client/src/assets/alem-da-tendencia/audience-3.jpg` (DSC03247 - plateia focada)
4. `client/src/assets/alem-da-tendencia/audience-4.jpg` (DSC03243 - palestrante com microfone)

### Arquivo editado:
- `client/src/pages/AlemDaTendencia.tsx` -- secao "PARA QUEM E" (linhas 262-312)

### Implementacao da montagem:

- Container `relative` com altura fixa (`h-[250px] md:h-[350px]`) para a composicao
- 4 imagens posicionadas com `absolute`, usando:
  - `object-cover` + `object-center` para crop inteligente
  - CSS `mask-image` com gradientes lineares para fade suave nas bordas (mesmo estilo do hero)
  - `z-index` escalonado para criar profundidade (imagem central mais a frente)
  - Opacidade variada (central 90%, laterais 60-70%)
- No mobile (`hidden md:block` nas imagens 3 e 4), mostrando apenas 2 fotos com altura reduzida
- Leve tint de cor brand-purple via overlay semitransparente para manter coerencia cromatica com o fundo escuro

### Responsividade:
- Mobile: 2 imagens visiveis, altura `h-[200px]`, imagens com `w-[55%]` sobrepostas no centro
- Tablet (md): 3-4 imagens, altura `h-[300px]`
- Desktop (lg): 4 imagens completas, altura `h-[350px]`, composicao expandida

### Animacao:
- Usar `motion.div` com `fadeInUp` existente para a entrada suave da composicao no scroll

