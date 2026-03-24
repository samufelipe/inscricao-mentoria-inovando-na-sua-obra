

## Plano: Reposicionar badges do Hero para cima dos mockups

### Problema
A área da headline está visualmente poluída com muita informação empilhada (badges + headline + subtítulo + social proof + CTAs). Mover os badges para a zona dos mockups distribui melhor o conteúdo.

### Alterações em `client/src/pages/Materiais.tsx`

**Mobile (linhas ~263-300):**
- Mover o bloco "Materiais Digitais · Acesso Imediato · Garantia 7 Dias" de dentro da div de conteúdo (linha 289-300) para **acima dos mockups**, posicionado como overlay flutuante sobre as imagens com posicionamento absoluto ou como elemento acima do container dos mockups.
- Estilizar com fundo semi-transparente escuro e texto dourado, centralizado.

**Desktop (linhas ~373-384):**
- Mover o mesmo bloco de badges do lado esquerdo (área de texto) para a **zona dos mockups** no lado direito, posicionado como overlay flutuante sobre as imagens dos produtos.
- Usar posicionamento absoluto dentro do container dos mockups, ancorado no topo.

### Resultado esperado
- Headline area: Logo → H1 → Subtítulo → Social proof → CTAs (mais limpo)
- Mockups area: Badges flutuantes no topo sobre as imagens (reforça que são digitais/acesso imediato)

