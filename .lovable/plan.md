

## Plano: Hero com Mockups dos Produtos como Background

### O que muda

Substituir a foto das mentoras (`irmas-obra.png`) por uma composicao visual dos mockups dos dois produtos (checklist no tablet + e-book no celular) como imagem de fundo do Hero.

### Como sera feito

**Arquivo:** `client/src/pages/Materiais.tsx`

1. **Remover** a imagem `irmasObra` do background do Hero
2. **Posicionar os dois mockups** (`checklistsMockup` e `ebookMockup`) como elementos absolutos no lado direito do Hero (desktop) ou atras do conteudo com fade (mobile):
   - Desktop: os dois mockups flutuam lado a lado no lado direito com leve rotacao e sombra, criando profundidade (estilo "floating devices")
   - Mobile: mockups aparecem no topo da secao com gradiente escuro forte por baixo para o texto permanecer legivel
3. **Manter** o fundo base `#1a1a1a`, gradientes escuros no lado esquerdo (desktop) e inferior (mobile) para legibilidade do texto
4. **Adicionar** leve glow dourado (#C9A84C com baixa opacidade) atras dos mockups como efeito de destaque
5. **Manter** a logo, headline, sub-headline, badges e CTAs exatamente como estao, apenas ajustando z-index

### Resultado visual

```text
Desktop:
┌──────────────────────────────────────────────┐
│  [Logo]                    ┌─────┐ ┌───────┐ │
│  Headline...               │ebook│ │checklist││
│  Sub-headline...           │     │ │       │ │
│  [CTA] [CTA]              └─────┘ └───────┘ │
│  badges                        glow dourado  │
└──────────────────────────────────────────────┘

Mobile:
┌──────────────┐
│  mockups     │
│  (fade out)  │
│──────────────│
│  [Logo]      │
│  Headline    │
│  [CTA]       │
└──────────────┘
```

### Detalhes tecnicos

- Os mockups usam `drop-shadow` e leve `rotate` CSS (2-3 graus) para efeito editorial
- Gradientes laterais/inferiores garantem contraste com o texto
- Grid lines permanecem intactas
- Nenhum outro arquivo alterado

