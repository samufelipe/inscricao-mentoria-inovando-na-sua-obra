

## Plano: Checkout Overlay Hotmart + Captura de Leads + Urgência

### Resumo
Integrar o checkout da Hotmart como popup na própria LP, capturar leads no banco de dados antes de abrir o checkout, e adicionar elementos de urgência para aumentar conversão.

---

### 1. Captura de Leads no Banco de Dados

**Novo componente: `client/src/components/ui/lead-capture-modal.tsx`**
- Modal que aparece ao clicar em qualquer CTA de compra
- Campos: Nome, Email, WhatsApp
- Ao submeter: salva no banco via edge function `capture-lead` (já existe, com product = "materiais-checklists" / "materiais-ebook" / "materiais-combo")
- Após salvar, abre o checkout overlay da Hotmart

**Atualizar `client/src/pages/Materiais.tsx`:**
- Todos os CTAs de compra (individuais, combo, sticky bar, CTA final) passam a abrir o modal de captura em vez de redirecionar para a Hotmart diretamente
- Remover referências ao Google Sheets (não será usado)

### 2. Checkout Overlay Hotmart

**Atualizar `client/index.html`:**
- Adicionar script `<script src="https://static.hotmart.com/checkout/widget.min.js"></script>` no `<head>`

**Lógica no modal de captura:**
- Após salvar o lead, chamar a API do Hotmart Checkout Widget para abrir o overlay:
```javascript
// Extrair offer code da URL (ex: F99460291O)
window.hotmart?.showCheckout({ offer: 'F99460291O', email: leadEmail });
```
- Passar email pré-preenchido para facilitar o checkout

### 3. Elementos de Urgência

**Atualizar `client/src/pages/Materiais.tsx`:**

a) **Banner de urgência no topo da página** (abaixo do hero ou como sticky):
- "Oferta por tempo limitado · Preço promocional pode encerrar a qualquer momento"
- Ícone de relógio + texto dourado sobre fundo escuro

b) **Badges de urgência nos cards de produto:**
- Tag "Preço Promocional" nos cards individuais
- Tag "Oferta limitada" no combo
- Microcopy pulsante nos CTAs: "Garanta antes que o preço aumente"

c) **Countdown visual** (opcional, configurável):
- Timer contando regressivamente para uma data/hora definida
- Posicionado na seção de Value Stack e/ou no CTA final

### 4. Remover Google Sheets

**Não alterar `client/src/lib/google-sheets.ts`** (manter o arquivo, pode ser usado em outra página), mas remover qualquer chamada a ele originada da página `/materiais`.

---

### Arquivos alterados

| Arquivo | Alteração |
|---|---|
| `client/index.html` | Adicionar script Hotmart Checkout Widget |
| `client/src/components/ui/lead-capture-modal.tsx` | Novo componente modal de captura de lead |
| `client/src/pages/Materiais.tsx` | Integrar modal + overlay checkout + urgência (banner, badges, countdown) |

### Fluxo do usuário

```text
Lead clica em CTA → Modal de captura abre (nome, email, WhatsApp)
        ↓
Lead preenche e submete → Dados salvos no banco (edge function capture-lead)
        ↓
Checkout overlay Hotmart abre na própria LP (com email pré-preenchido)
        ↓
Lead finaliza pagamento sem sair da página
```

