

## Plano: Revisão Completa de SEO

### Diagnóstico Atual

O projeto tem **3 páginas principais** (`/` Mentoria, `/alem-da-tendencia`, `/materiais`) e páginas auxiliares (termos, privacidade, relatório). Problemas encontrados:

**Crítico:**
- Nenhum `robots.txt` ou `sitemap.xml`
- Nenhuma tag `canonical` em nenhuma página
- Nenhum dado estruturado (Schema.org / JSON-LD)
- Meta descriptions ausentes no HTML base (apenas OG tags no build)
- Página Home (`/`) sem meta description nem OG tags
- `<html lang="en">` nos dois HTMLs — deveria ser `lang="pt-BR"`

**Importante:**
- Imagens hero sem `width`/`height` explícitos (causa CLS)
- Imagens above-the-fold com `loading="lazy"` (prejudica LCP) — ex: mockups no hero de Materiais
- Sem `<link rel="preload">` para fontes ou imagens críticas (exceto AlemDaTendencia)
- Títulos definidos via JS (`document.title`) — crawlers podem não ver

**Menor:**
- Alt texts estão razoáveis mas podem ser mais descritivos
- Sem link interno entre as páginas (/, /materiais, /alem-da-tendencia)

---

### Alterações Planejadas

**1. Corrigir `lang="pt-BR"` nos HTMLs**
- `index.html` e `client/index.html`: trocar `lang="en"` para `lang="pt-BR"`

**2. Criar `public/robots.txt`**
```text
User-agent: *
Allow: /
Sitemap: https://www.inovandonasuaobra.com.br/sitemap.xml
```

**3. Criar `public/sitemap.xml`**
- URLs: `/`, `/alem-da-tendencia`, `/materiais`, `/termos-de-uso`, `/politica-de-privacidade`
- Com `lastmod`, `priority` e `changefreq`

**4. Adicionar meta descriptions e canonical tags via `useEffect` em cada página**
- Home: meta description sobre mentoria de gerenciamento de obra
- AlemDaTendencia: meta description sobre o evento presencial
- Materiais: meta description sobre checklists e manual

**5. Adicionar JSON-LD (Schema.org) para cada página**
- Home: `Product` schema (mentoria)
- Materiais: `Product` schema (materiais digitais) + `FAQPage` schema
- AlemDaTendencia: `Event` schema

**6. Atualizar o plugin de OG pages**
- Gerar OG tags para a Home (`index.html`) também
- Adicionar canonical tags nos HTMLs gerados

**7. Corrigir performance de imagens (LCP/CLS)**
- Remover `loading="lazy"` das imagens hero (above the fold)
- Adicionar `width` e `height` nas imagens principais
- Adicionar `<link rel="preload">` para imagens hero no `index.html`

**8. Links internos no footer**
- Adicionar links entre as páginas principais no rodapé de cada página

---

### Arquivos modificados

| Arquivo | Ação |
|---------|------|
| `index.html` | lang, meta description, preload, canonical |
| `client/index.html` | lang, meta description, preload |
| `client/src/pages/Home.tsx` | Meta tags via useEffect, JSON-LD, footer links |
| `client/src/pages/Materiais.tsx` | Meta tags, JSON-LD (Product+FAQ), fix lazy loading hero |
| `client/src/pages/AlemDaTendencia.tsx` | Meta tags, JSON-LD (Event), footer links |
| `plugins/vite-plugin-og-pages.ts` | OG tags para Home, canonical tags |
| `client/public/robots.txt` | Novo arquivo |
| `client/public/sitemap.xml` | Novo arquivo |
| `vercel.json` | Rewrite para sitemap.xml se necessário |

