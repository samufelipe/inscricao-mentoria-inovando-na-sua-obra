

## Plano: Integrar leads de /materiais com nova planilha Google Sheets

### Alterações

**1. `client/src/lib/google-sheets.ts`**
- Adicionar função `sendToMaterialsSheet(data)` com a URL fornecida
- Mesma lógica da função existente: GET + no-cors, campos `data_hora`, `nome`, `email`, `whatsapp`, `fonte`
- Função original `sendToGoogleSheets` permanece intacta

**2. `client/src/components/ui/lead-capture-modal.tsx`**
- Importar `sendToMaterialsSheet`
- No `handleSubmit`, enviar dados em paralelo para Supabase e Google Sheets usando `Promise.allSettled`
- Campo `fonte` baseado no produto: "Materiais - Checklists", "Materiais - E-book" ou "Materiais - Combo"
- Falha no envio para Sheets não bloqueia o fluxo de checkout

### Detalhes técnicos
- URL do Apps Script: `https://script.google.com/macros/s/AKfycbwuZa9h35RGHAGRnuprikP7-pvC715R_aNtmPpJXGvJrR0MGDyz1FgNEZs0bsfhR1q7xQ/exec`
- Método GET com `mode: "no-cors"` (mesmo padrão da integração existente)
- Mapeamento de campos: `data_hora` (horário BR), `nome`, `email`, `whatsapp`, `fonte`

