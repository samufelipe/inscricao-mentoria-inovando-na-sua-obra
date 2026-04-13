

## Plano: Atualizar preço do Combo + Banner fixo + Remover pop-up de captura

### Resumo
Três frentes: (1) atualizar preço do combo para R$ 97, (2) criar banner fixo de urgência, (3) eliminar o modal de captura de lead — todos os CTAs passam a redirecionar direto para o checkout da Hotmart.

---

### 1. Remover pop-up e redirecionar direto ao checkout

**`client/src/pages/Materiais.tsx`**
- Remover import do `LeadCaptureModal` e os states `modalOpen`/`modalProduct`
- Remover o componente `<LeadCaptureModal />` do JSX
- Reescrever `openCheckout()` para redirecionar direto:
  - Combo: `https://pay.hotmart.com/V105267183D?off=g1ocpn30&checkoutMode=10`
  - Checklists: `https://pay.hotmart.com/F99460291O?bid=1775577667420&checkoutMode=10`
  - Manual: `https://pay.hotmart.com/Q99258692R?bid=1775577656590&checkoutMode=10`
- Todos abrem na mesma aba (`window.location.href`)

### 2. Atualizar preço do Combo para R$ 97

**`client/src/pages/Materiais.tsx`**
- Alterar `COMBO_PRICE` para 97
- Parcelamento: "3x de R$ 32,33"
- Ancoragem: mostrar "De R$ 147" riscado → "Por R$ 97"
- Atualizar economia e schema JSON-LD
- Atualizar FAQ de parcelamento

**`client/src/components/ui/lead-capture-modal.tsx`**
- Atualizar `OFFER_MAP` do combo com `off: "g1ocpn30"` (para caso algum outro componente ainda use)

### 3. Reforçar comunicação de urgência

**`client/src/pages/Materiais.tsx`**
- Hero CTA: "Garantir o Combo por R$ 97"
- Urgency Banner: "Promoção inédita — nunca fizemos isso antes na história da Inovando"
- Card do Combo: badge "PROMOÇÃO INÉDITA" + copy reforçando a oportunidade

### 4. Criar Banner Fixo no Topo (StickyPromoBanner)

**`client/src/pages/Materiais.tsx`** (componente inline ou arquivo separado)
- Barra fixa no topo, aparece após scroll de ~400px
- Fundo escuro (#1a1a1a) com acentos dourados
- Texto: "PROMOÇÃO INÉDITA · De R$ 147 por R$ 97 · Milhares de arquitetas já garantiram"
- Botão CTA compacto "Garantir Combo" que redireciona direto ao checkout
- Responsivo: uma linha no desktop, duas linhas no mobile

### O que NÃO muda
- Preços individuais (Checklists R$ 67, Manual R$ 97)
- Links de checkout dos produtos individuais
- Estrutura geral das seções da página

