

# Redesign Completo da Hero Section - Dark Cinematico Integrado

## Problemas Atuais

1. **Desktop**: Imagens cortadas ao meio, mostrando apenas metade dos corpos
2. **Conteudo separado**: Textos e formulario ficam ABAIXO da composicao de imagens, criando uma secao desconectada
3. **Logo com fundo branco**: A logo atual tem fundo opaco que destoa do tema dark
4. **Mobile**: Mesmos problemas de corte e separacao visual

## Nova Logo com Fundo Transparente

A logo enviada (triangulo roxo/laranja + texto "ALEM DA TENDENCIA") sera salva como asset do projeto com fundo transparente, substituindo a versao anterior em todos os locais onde aparece (hero e header).

## Solucao: Hero Integrada Full-Viewport

A ideia central e transformar a composicao de imagens em um **fundo** da hero inteira, com o conteudo (logo, texto, formulario) sobreposto diretamente sobre as imagens, usando gradientes para garantir legibilidade.

### Estrutura Visual

```text
Desktop:
+------------------------------------------------------------------+
|  [4 fotos fundidas como FUNDO - ocupam toda a secao]             |
|  [Gradiente escuro intenso na metade inferior]                    |
|                                                                   |
|              [Logo transparente - topo centro]                    |
|                                                                   |
|   [Subtitulo + Data/Local]          [Formulario Inscricao]       |
|   (sobre gradiente escuro)          (card glassmorphism)          |
|                                                                   |
|  [Gradiente transicao -> fundo claro da pagina]                  |
+------------------------------------------------------------------+

Mobile:
+-------------------------+
| [4 fotos fundidas]      |
| [Gradiente escuro]      |
|   [Logo centro]         |
|   [Subtitulo]           |
|   [Data/Local]          |
|   [Formulario]          |
| [Transicao -> claro]    |
+-------------------------+
```

### Detalhes Tecnicos

**1. Composicao de imagens como background**
- Container com `min-h-[90vh]` no desktop e `min-h-[80vh]` no mobile
- As 4 imagens ficam `absolute` dentro do container, cobrindo toda a area
- `object-position: center 20%` para focar nos rostos, nao no teto
- Cada imagem com `mask-image` multi-stop para fade suave entre elas

**2. Overlay de legibilidade**
- Gradiente vertical: transparente no topo (mostra rostos) -> `rgba(26,26,26,0.85)` na metade inferior (onde fica o conteudo)
- Vinheta radial sutil nas bordas
- Isso mantem as fotos visiveis na parte superior enquanto o texto fica perfeitamente legivel na parte inferior

**3. Logo com fundo transparente**
- Salvar a nova logo como `client/src/assets/alem-da-tendencia/logo-transparent.png`
- Posicionar centralizada no topo da hero, com `drop-shadow` para contraste sobre as imagens
- Tamanho: `w-[160px]` mobile, `w-[220px]` desktop
- Atualizar tambem no StickyHeader se a logo for usada la

**4. Conteudo sobreposto na parte inferior**
- Grid de 2 colunas (desktop) posicionado na parte inferior da hero, sobre o gradiente escuro
- Formulario com efeito glassmorphism: `backdrop-blur-md`, `bg-white/10`, `border border-white/15`
- Cards de data/local com estilo similar ao glassmorphism
- Textos em branco com sombras sutis para legibilidade

**5. Transicao inferior suave**
- Gradiente de `#1a1a1a` para `oklch(0.97 0.01 95)` (fundo beige da pagina)

### Arquivos Editados
- `client/src/pages/AlemDaTendencia.tsx` - Reescrita completa da section hero (linhas 56-184)
- `client/src/assets/alem-da-tendencia/logo-transparent.png` - Nova logo (copiar do upload)
- `client/src/components/ui/sticky-header.tsx` - Atualizar referencia da logo se necessario

