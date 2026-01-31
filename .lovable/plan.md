

# Plano: Redesign Fiel à LP Original (inovandonasuaobra.com.br)

## Análise Comparativa: Original vs Atual

Após analisar detalhadamente a LP original, identifiquei que o problema fundamental é: **estamos re-inventando o design ao invés de replicá-lo**.

### Diferenças Críticas Identificadas

| Aspecto | Original WordPress | Nossa Versão Atual |
|---------|-------------------|-------------------|
| **Approach** | Usa IMAGENS prontas do Figma com todo o design embutido | Tenta recriar o design com componentes React |
| **Hero** | Imagem única com logo + texto + mentoras integrados | Componentes separados tentando simular |
| **Skills** | IMAGEM com caixas cinzas e setas amarelas | Cards React com emojis e bordas |
| **Módulos** | IMAGENS verticais prontas (mockups do Figma) | Cards horizontais com texto |
| **Pricing** | IMAGEM pronta do card de preço | Card React com formulário |
| **Tipografia** | Títulos em dourado (#D4AF37) estilo cursivo | Títulos em preto com detalhes dourados |

### Problema Central

A LP original é essencialmente uma **sequência de imagens pré-desenhadas no Figma/Photoshop** com links de CTA sobrepostos. Nossa abordagem de "componentizar" cada seção em React está **destruindo a identidade visual**.

## Estratégia de Solução

### Opção A: Replicação via Imagens (RECOMENDADO - Alta Fidelidade)

Usar as próprias imagens do WordPress como base visual, adicionando formulários de captura apenas onde necessário (Hero e Pricing).

**Prós:**
- Fidelidade 100% ao original
- Implementação mais rápida
- Sem divergências de design

**Contras:**
- Menos flexível para edições futuras
- Dependência de assets externos (já é o caso atual)

### Opção B: Replicação via CSS (Mais Trabalhoso)

Refazer completamente o CSS para replicar pixel por pixel o design original.

**Prós:**
- Código mais limpo
- Flexibilidade total

**Contras:**
- Muito mais tempo de implementação
- Risco de divergências

## Proposta: Opção A - Implementação Image-First

### 1. Hero Section

**Mudanças:**
- Usar a imagem `Masterclass-Cronograma-1507-e1752603988566.webp` como logo topo
- Background bege `#EDE8DC` (igual ao original)
- Título em preto bold, NÃO em dourado
- Imagem das mentoras posicionada à direita (já temos)
- CTA botão verde `#9ACD32` com borda preta fina
- **Manter formulário de captura** (diferencial nosso vs original)

### 2. Skills Section ("O que você vai aprender?")

**Mudanças Críticas:**
- Título em **DOURADO** `#D4AF37` (não preto!)
- Usar a IMAGEM original: `1-2-e1752679552648.webp` ou reconstruir com:
  - Caixas com fundo cinza arredondado
  - Título "HABILIDADES TÉCNICAS" / "HABILIDADES COMPORTAMENTAIS" em preto
  - Ícones de seta amarela circular antes de cada item
  - Sinal de "+" preto entre as colunas

### 3. Audience Section ("Para quem é?")

**Mudanças:**
- Título em dourado
- Usar IMAGEM original: `2-1.webp`

### 4. How It Works ("Como funciona a Mentoria?")

**Mudanças:**
- Usar IMAGENS originais: `3-1-e1752674351215.png` e `3-e1752678867880.webp`
- Layout visual, não lista de texto

### 5. Modules ("Como é a mentoria por dentro?")

**Mudança CRÍTICA:**
- Usar as IMAGENS verticais dos módulos:
  - `5modulo-01-768x1365.png`
  - `6modulo-2-576x1024.webp`
  - `7modulo-3-576x1024.png`
  - `8modulo-4-e1752587594978.webp`
- Layout: cards verticais lado a lado (scroll horizontal no mobile)
- NÃO usar cards horizontais com texto

### 6. Documents & Bonus

**Mudanças:**
- Usar IMAGEM do pack: `4.webp`
- Usar IMAGENS das especialistas do original

### 7. Revenue ("Como você pode faturar mais?")

**Mudanças:**
- Usar IMAGENS originais: `12-e1752605232522-651x1024.webp` e `13-576x1024.png`

### 8. Pricing ("E quanto é o investimento?")

**Mudança CRÍTICA:**
- Usar IMAGEM do card de preço: `Pagina-de-VendaSite-1-e1759350501979-768x658.png`
- Sobrepor formulário de captura transparente em cima
- **Manter funcionalidade de lead capture**

### 9. Testimonials

**Mudanças:**
- Manter vídeos Vimeo (diferencial nosso)
- Ajustar cores do fundo para combinar

### 10. Guarantee

**Mudanças:**
- Usar IMAGENS originais: `14-e1752677582621-1024x172.png` e `GARANTIA-REVISADO-e1752678628759-1024x619.webp`

### 11. Mentors ("Quem somos nós?")

**Mudanças:**
- Usar IMAGEM original das mentoras
- Texto como no original

### 12. FAQ

**Mudanças:**
- Manter estilo minimalista do original

## Mudanças Técnicas Necessárias

### Atualizar `mentoria-constants.ts`

Adicionar TODAS as URLs de imagem do site original:

```text
skillsImage: "https://inovandonasuaobra.com.br/wp-content/uploads/2025/07/1-2-e1752679552648.webp"
audienceImage: "https://inovandonasuaobra.com.br/wp-content/uploads/2025/07/2-1.webp"
howItWorks1: "https://inovandonasuaobra.com.br/wp-content/uploads/2025/07/3-1-e1752674351215.png"
howItWorks2: "https://inovandonasuaobra.com.br/wp-content/uploads/2025/07/3-e1752678867880.webp"
module1Vertical: "https://inovandonasuaobra.com.br/wp-content/uploads/2025/07/5modulo-01-768x1365.png"
module2Vertical: "https://inovandonasuaobra.com.br/wp-content/uploads/2025/07/6modulo-2-576x1024.webp"
module3Vertical: "https://inovandonasuaobra.com.br/wp-content/uploads/2025/07/7modulo-3-576x1024.png"
module4Vertical: "https://inovandonasuaobra.com.br/wp-content/uploads/2025/07/8modulo-4-e1752587594978.webp"
documentsPack: "https://inovandonasuaobra.com.br/wp-content/uploads/2025/07/4.webp"
bonus1: "https://inovandonasuaobra.com.br/wp-content/uploads/2025/07/15.png"
bonus2: "https://inovandonasuaobra.com.br/wp-content/uploads/2025/07/16-1.png"
bonus3: "https://inovandonasuaobra.com.br/wp-content/uploads/2025/07/16.webp"
revenue1Vertical: "https://inovandonasuaobra.com.br/wp-content/uploads/2025/07/12-e1752605232522-651x1024.webp"
revenue2Vertical: "https://inovandonasuaobra.com.br/wp-content/uploads/2025/07/13-576x1024.png"
pricingCard: "https://inovandonasuaobra.com.br/wp-content/uploads/2025/10/Pagina-de-VendaSite-1-e1759350501979-768x658.png"
guaranteeBanner: "https://inovandonasuaobra.com.br/wp-content/uploads/2025/07/14-e1752677582621-1024x172.png"
guaranteeSeal: "https://inovandonasuaobra.com.br/wp-content/uploads/2025/07/GARANTIA-REVISADO-e1752678628759-1024x619.webp"
```

### Componentes a Refatorar

| Componente | Tipo de Mudança |
|------------|-----------------|
| `MentoriaHero.tsx` | Ajustar layout para imagem à direita, formulário à esquerda |
| `MentoriaSkills.tsx` | Substituir cards por IMAGEM única |
| `MentoriaAudience.tsx` | Substituir por IMAGEM |
| `MentoriaHowItWorks.tsx` | Substituir por IMAGENS |
| `MentoriaModules.tsx` | Cards verticais com IMAGENS (scroll horizontal mobile) |
| `MentoriaDocuments.tsx` | Usar IMAGEM do pack + IMAGENS dos bônus |
| `MentoriaRevenue.tsx` | Usar IMAGENS verticais |
| `MentoriaPricing.tsx` | Overlay form em cima de IMAGEM do card |
| `MentoriaGuarantee.tsx` | Usar IMAGENS originais |
| `MentoriaMentors.tsx` | Polimento de layout |
| `src/index.css` | Ajustar cores base |

### Paleta de Cores Corrigida

```text
Background principal: #EDE8DC (bege suave)
Background seções alt: #FFFFFF
Dourado títulos: #D4AF37
Preto textos: #1a1a1a
Verde CTA: #9ACD32
```

## Resultado Esperado

- LP visualmente idêntica ao original inovandonasuaobra.com.br
- Formulários de captura funcionais (diferencial nosso)
- Vídeos Vimeo nos depoimentos (diferencial nosso)
- Integração RD Station mantida
- Redirecionamento Hotmart mantido

