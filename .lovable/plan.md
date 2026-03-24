

## Plano: Nova Página de Materiais Digitais · `/materiais`

### Resumo
Criar uma página de vendas para dois produtos digitais da Inovando Arquitetura, seguindo o design editorial das páginas Além da Tendência e Mentoria (dark theme, gold accents, tipografia premium, animações fade-in).

### Dados dos Produtos
- **Checklists Inovando na Sua Obra**: R$ 67,00
- **E-book Domine a Sua Obra**: R$ 97,00
- **Combo (ambos)**: R$ 147,60 (10% de desconto sobre R$ 164,00)
- Links Hotmart: `F99460291O` (Checklists), link do E-book (extraído da página Hotmart)

### Prova Social
- +250 Obras gerenciadas
- +100 Alunas transformadas
- 12 Anos de experiência
- Criadoras da Mentoria Inovando na Sua Obra

### Estrutura da Página (seções)

1. **Hero** · Background dark (#1a1a1a) com imagem das mentoras (reutilizar asset existente `inovando-obra-new.png`), logo Inovando, headline focada na dor ("Pare de perder dinheiro e tempo em obras desorganizadas"), badges de prova social

2. **Prova Social** · 4 cards com números animados (+250 obras, +100 alunas, 12 anos, Mentoria Inovando) · Fundo claro com bordas gold

3. **Quem Somos** · Apresentação de Ingrid Zarza e Fernanda Bradaschia · Foto + bio curta · Credibilidade e experiência

4. **Produtos** · Dois cards lado a lado (mobile: empilhados):
   - **Card Checklists** (R$ 67,00): descrição das dores que resolve, lista de benefícios, CTA para Hotmart
   - **Card E-book** (R$ 97,00): descrição, benefícios, CTA para Hotmart
   - **Card Combo** (destaque visual, badge "Mais Popular"): ambos por R$ 147,60, economia de R$ 16,40, CTA

5. **Para Quem É** · Lista de perfis ideais (arquitetas que gerenciam obras, designers de interiores, profissionais que querem organizar processos)

6. **Depoimentos/Resultados** · Reutilizar estrutura de testimonials existente

7. **FAQ** · Perguntas frequentes sobre os produtos digitais

8. **Footer** · Links institucionais, redes sociais, CNPJ

### Detalhes Técnicos

**Arquivos criados:**
- `client/src/pages/Materiais.tsx` · Página completa self-contained (mesmo padrão do Home.tsx)

**Arquivos editados:**
- `client/src/App.tsx` · Adicionar rota `/materiais` apontando para o novo componente

**Design system:** Reutilizar componentes existentes (`ArchitecturalSection`, `ArchitecturalTitle`, `ArchitecturalButton`, `FAQAccordion`) e padrões visuais (gold #C9A84C, dark #1a1a1a, green CTAs #2E7D32, framer-motion fade-in)

**Checkout:** Cada CTA abre o link Hotmart em nova aba (`target="_blank"`)

**Nenhuma alteração** nas páginas existentes (Home, AlemDaTendencia, Relatorio, etc.)

