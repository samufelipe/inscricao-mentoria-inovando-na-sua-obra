

## Correção Definitiva: Garantir Envio dos Dados para a Planilha

### Diagnóstico

| Etapa | Status |
|-------|--------|
| Formulário -> sessionStorage | OK |
| Página /redirecionando -> Edge Function | OK |
| Edge Function -> Banco de dados | OK (todos os campos salvos) |
| Edge Function -> Make Webhook -> Planilha | FALHA SILENCIOSA |

O banco de dados contém TODOS os testes recentes com nome, email, telefone e UTMs corretos. O problema está no trecho final: o webhook do Make que deveria enviar os dados para a planilha Google Sheets.

Quando removemos a chamada direta `sendToGoogleSheets()`, ficamos 100% dependentes do webhook do Make. Se esse webhook falha, os dados nunca chegam à planilha -- e o erro é capturado silenciosamente sem impacto visível.

### Solução: Dupla Garantia

Vamos implementar uma estratégia de "dupla garantia": manter o webhook do Make como canal principal E restaurar a chamada direta ao Google Sheets como canal de backup, ambos executados em paralelo.

### Alterações

**Arquivo 1: `client/src/pages/Redirecionando.tsx`**
- Restaurar o import de `sendToGoogleSheets`
- Executar `captureLead()` e `sendToGoogleSheets()` em paralelo usando `Promise.allSettled()`
- Isso garante que mesmo se um canal falhar, o outro entrega os dados

```text
Fluxo:
  /redirecionando
    |
    +-- captureLead() -----> Edge Function -----> DB (OK) + Make Webhook (canal 1)
    |
    +-- sendToGoogleSheets() -----> Google Apps Script (canal 2 - backup)
    |
    v
  Ambos terminaram (ou timeout 5s) -> Redireciona para Sympla
```

**Arquivo 2: `supabase/functions/capture-lead/index.ts`**
- Adicionar log da resposta do webhook do Make para diagnóstico futuro
- Registrar o status code e corpo da resposta para identificar se o Make está rejeitando os dados

### Detalhes Técnicos

**Redirecionando.tsx - Dupla garantia:**

```typescript
import { sendToGoogleSheets } from "@/lib/google-sheets";

// Dentro do useEffect, após ler dados do sessionStorage:
await Promise.allSettled([
  captureLead({
    name: data.name,
    email: data.email,
    phone: data.phone,
    product: "alem-da-tendencia",
    utms,
  }),
  sendToGoogleSheets({
    name: data.name,
    email: data.email,
    whatsapp: data.phone,
  }),
]);
```

**Edge function - Log do webhook:**

```typescript
const webhookRes = await fetch(makeWebhookUrl, { ... });
console.log("Make webhook status:", webhookRes.status, await webhookRes.text());
```

Isso nos dará visibilidade se o Make está rejeitando os dados e por qual motivo.

### Resultado Esperado

- Os dados chegam na planilha por pelo menos um dos dois canais
- Os logs da edge function mostrarão se o Make está funcionando ou falhando
- Nenhum outro arquivo ou fluxo do projeto é afetado

