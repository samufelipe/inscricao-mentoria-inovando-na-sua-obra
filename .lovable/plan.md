

## Plano: Separar PRODUTO e FONTE na integração com Google Sheets

### Alterações

**1. `client/src/lib/google-sheets.ts`**
- Adicionar função `detectFonte()`: lê `utm_source` da URL — se for `facebook` ou `instagram`, retorna `"Meta Ads"`, senão retorna `"Orgânico"`
- Atualizar `sendToMaterialsSheet` para aceitar `produto` (string) e usar `detectFonte()` automaticamente
- Enviar os parâmetros `produto` e `fonte` separados na query string (em vez do antigo campo `fonte` único)

**2. `client/src/components/ui/lead-capture-modal.tsx`**
- Renomear `FONTE_MAP` para `PRODUTO_MAP`:
  - `checklists` → `"21 Checklists"`
  - `ebook` → `"Manual de Gerenciamento"`
  - `combo` → `"Combo Completo"`
- No `handleSubmit`, passar `produto: PRODUTO_MAP[productKey]` para `sendToMaterialsSheet`

### Resultado esperado na planilha

| Data/Hora | Nome | E-mail | WhatsApp | Produto | Fonte |
|-----------|------|--------|----------|---------|-------|
| 07/04/2026 14:30:00 | João | joao@email.com | 11999... | 21 Checklists | Meta Ads |
| 07/04/2026 15:00:00 | Maria | maria@email.com | 21988... | Combo Completo | Orgânico |

