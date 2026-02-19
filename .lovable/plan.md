

## Plano: Correcao de Infraestrutura + Rota /alem-da-tendencia

### 1. Corrigir `vite.config.ts`
- Alterar porta de `3000` para `8080`
- Remover import e uso do `vite-plugin-manus-runtime`
- Remover `root: client` e ajustar para que o Lovable encontre o `index.html` na raiz do projeto

### 2. Criar `index.html` na raiz do projeto
- Copiar o conteudo de `client/index.html` para a raiz
- Ajustar o caminho do script de `"/src/main.tsx"` para `"/client/src/main.tsx"` (pois o root do Vite passara a ser a raiz do projeto)

### 3. Adicionar script `build:dev` no `package.json`
- Adicionar `"build:dev": "vite build --mode development"` na secao de scripts

### 4. Criar rota `/alem-da-tendencia`
- Criar `client/src/pages/AlemDaTendencia.tsx` que re-exporta o componente Home (a LP do Manus)
- Adicionar a rota `/alem-da-tendencia` no `App.tsx`
- Nenhum conteudo da LP sera alterado

### Detalhes tecnicos

**Arquivos modificados:**
- `vite.config.ts` - porta 8080, remover manus plugin, ajustar root
- `package.json` - adicionar build:dev script
- `client/src/App.tsx` - adicionar rota /alem-da-tendencia

**Arquivos criados:**
- `index.html` - na raiz do projeto (copia ajustada de client/index.html)
- `client/src/pages/AlemDaTendencia.tsx` - re-exporta Home

**Nenhum conteudo da LP sera alterado.**

