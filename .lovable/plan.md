

## Plano: Adicionar OG meta tags para a pagina /materiais

### Problema
Quando o link `/materiais` e compartilhado no WhatsApp, a previa mostra os metadados da pagina principal (Mentoria) porque todos os crawlers recebem o `index.html` generico.

### Solucao
Usar o mesmo padrao ja existente para `/alem-da-tendencia`: gerar um `materiais.html` no build com OG tags especificos, e adicionar um rewrite no Vercel.

### Alteracoes

**1. `plugins/vite-plugin-og-pages.ts`**
Adicionar geracao de `materiais.html` no `closeBundle`, com OG tags proprios:
- Titulo: "Materiais para Obra | Inovando na Sua Obra"
- Descricao: copy alinhada com o conteudo da LP (checklists + e-book para arquitetas)
- Imagem OG: precisamos definir uma imagem — pode ser uma existente do projeto ou criar uma nova
- URL: `https://www.inovandonasuaobra.com.br/materiais`

**2. `vercel.json`**
Adicionar rewrite antes do catch-all:
```json
{ "source": "/materiais", "destination": "/materiais.html" }
```

**3. Imagem OG**
Verificar se ja existe uma imagem adequada no projeto para usar como preview. Caso contrario, podemos usar uma imagem generica da marca ou o logo do Inovando.

### Resultado
WhatsApp, LinkedIn e outros crawlers vao exibir titulo, descricao e imagem corretos ao compartilhar o link `/materiais`.

