

## Corrigir Meta Tags OG para "/alem-da-tendencia" (Deploy Estatico)

### Problema Identificado
O `server/index.ts` que injeta as meta tags OG **nao roda em producao**. O site e deployado como **site estatico** (Vite build + Vercel/Lovable), e o `vercel.json` redireciona todas as rotas para o mesmo `index.html`. Os crawlers do WhatsApp, Instagram e LinkedIn recebem o HTML original sem nenhuma meta tag do evento.

### Solucao
Criar um **script pos-build** que gera automaticamente uma versao do `index.html` com as meta tags OG do evento, e configurar o `vercel.json` para servir esse arquivo especifico na rota `/alem-da-tendencia`.

### Etapas

**1. Criar script `scripts/generate-og-pages.js`**
- Apos o `vite build`, esse script le o `dist/public/index.html` (ja processado pelo Vite, com os scripts e CSS corretos)
- Injeta as meta tags OG do evento:
  - `og:title` = "Alem da Tendencia - Evento Presencial"
  - `og:description` = "Evento presencial exclusivo para arquitetos e designers de interiores. Palestras, networking e conteudo pratico para transformar sua carreira e seus projetos."
  - `og:image` = URL absoluta da logo do evento
  - Twitter cards equivalentes
- Substitui o `<title>` pelo titulo do evento
- Troca o favicon pelo do evento
- Salva como `dist/public/alem-da-tendencia.html`

**2. Atualizar `package.json`**
- Modificar o script `build`:
```text
"build": "vite build && node scripts/generate-og-pages.js"
```

**3. Atualizar `vercel.json`**
- Adicionar rewrite especifico para `/alem-da-tendencia` ANTES do fallback generico:
```text
{
  "outputDirectory": "dist/public",
  "rewrites": [
    { "source": "/alem-da-tendencia", "destination": "/alem-da-tendencia.html" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Como funciona

```text
Crawler do WhatsApp acessa /alem-da-tendencia
  --> Vercel serve alem-da-tendencia.html (com OG tags do evento)
  --> Preview mostra logo + titulo + descricao do evento

Crawler do WhatsApp acessa /
  --> Vercel serve index.html (original, sem alteracoes)
  --> Preview mostra dados da Mentoria como hoje
```

### Garantia de seguranca para o dominio principal
- O `index.html` original NAO e modificado em nenhum momento
- O script apenas LE o `index.html` e cria um NOVO arquivo separado
- O `vercel.json` so redireciona `/alem-da-tendencia` para o novo arquivo
- Todas as outras rotas (incluindo `/`) continuam servindo o `index.html` original
- O comportamento do SPA (React/wouter) permanece identico em ambos os arquivos

### Arquivos modificados
1. `scripts/generate-og-pages.js` -- novo (script pos-build)
2. `package.json` -- alterar script `build`
3. `vercel.json` -- adicionar rewrite especifico

### Observacao
- Apos o deploy, pode ser necessario limpar o cache do WhatsApp (pode levar ate 7 dias). Ferramentas como o Facebook Sharing Debugger podem forcar a atualizacao.
- A URL da imagem OG usa o dominio `inovandonasuaobra.com.br` de forma fixa no script para garantir que funcione corretamente com os crawlers.

