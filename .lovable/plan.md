

## Plano: Separar LP "Alem da Tendencia" + Restaurar Home Original

### Situacao Atual

O Manus AI sobrescreveu o projeto original no Lovable. Atualmente:
- `Home.tsx` contem o conteudo da LP "Alem da Tendencia" (NAO o conteudo original)
- `AlemDaTendencia.tsx` apenas re-exporta o Home (redundante)
- O dominio principal (`inovandonasuaobra.com.br`) funciona apenas porque a Vercel serve um deploy antigo
- Se publicar o Lovable agora, o dominio principal sera sobrescrito

### Problema Critico: Arquivos Ausentes

Os dois arquivos originais que voce enviou (MentoriaLanding.tsx e Index.tsx) dependem de **dezenas de arquivos que o Manus apagou** do projeto:

**Componentes ausentes (Index.tsx):**
- `components/landing/Header.tsx`
- `components/landing/HeroSection.tsx`
- `components/landing/ProblemsSection.tsx`
- `components/landing/AboutSection.tsx`
- `components/landing/QualificationSection.tsx`
- `components/landing/StepsSection.tsx`
- `components/landing/ScheduleSection.tsx`
- `components/landing/TransformationSection.tsx`
- `components/landing/BonusSection.tsx`
- `components/landing/GuaranteeSection.tsx`
- `components/landing/FAQSection.tsx`
- `components/landing/Footer.tsx`

**Componentes e hooks ausentes (MentoriaLanding.tsx):**
- `components/mentoria/MentoriaMobileCTA.tsx`
- `hooks/use-scroll-animation.ts`
- `hooks/use-parallax.ts`
- `lib/gtm-tracking.ts`
- `lib/utm-storage.ts`
- `styles/mentoria-wp.css`

**Assets ausentes (imagens locais):**
- `assets/images/logo.png`, `hero-photo.png`, `skills.png`, `audience.png`, etc. (20+ imagens)
- `assets/garantia-15-dias-mobile.png`

**Dependencias ausentes no package.json:**
- `react-router-dom` (o projeto agora usa `wouter`)

**Bug no package.json:**
- Vite versao `^7.1.7` nao existe (a estavel e 6.x) - impede o build
- Plugin `@builder.io/vite-plugin-jsx-loc` incompativel

### Plano de Acao (em Fases)

#### Fase 1 - Corrigir Build (prioritario)
1. Corrigir versao do Vite no `package.json` de `^7.1.7` para `^6.3.5`
2. Remover `@builder.io/vite-plugin-jsx-loc` dos devDependencies

#### Fase 2 - Isolar a LP "Alem da Tendencia"
1. Mover o conteudo atual do `Home.tsx` para `AlemDaTendencia.tsx` como componente independente (nao mais re-export)
2. A rota `/alem-da-tendencia` continuara funcionando normalmente com todo o conteudo da LP

#### Fase 3 - Criar Home temporario
1. Criar um `Home.tsx` simples e funcional como placeholder para a rota `/`
2. Esse placeholder tera uma mensagem basica com links para a LP e o dominio principal
3. Isso garante que o projeto compila sem erros

#### Fase 4 - Restaurar conteudo original (requer seus arquivos)
Para restaurar completamente o MentoriaLanding e o Index originais, voce precisara localizar e enviar os seguintes arquivos do GitHub/Vercel:
- Todos os 12 componentes da pasta `components/landing/`
- O componente `MentoriaMobileCTA`
- Os hooks `use-scroll-animation` e `use-parallax`
- Os utilitarios `gtm-tracking` e `utm-storage`
- O CSS `mentoria-wp.css`
- Todas as imagens da pasta `assets/images/`

### O Que Sera Feito Agora (Fases 1-3)

| Arquivo | Acao |
|---|---|
| `package.json` | Corrigir Vite para ^6.3.5, remover plugin incompativel |
| `client/src/pages/AlemDaTendencia.tsx` | Receber o conteudo completo da LP (movido do Home) |
| `client/src/pages/Home.tsx` | Placeholder temporario ate restaurar o original |

### Resultado

- O build volta a funcionar
- A LP "Alem da Tendencia" fica isolada em `/alem-da-tendencia`
- O Home fica como placeholder seguro (nao sobrescreve o dominio ao publicar)
- Depois, com os arquivos originais, restauramos o conteudo completo

