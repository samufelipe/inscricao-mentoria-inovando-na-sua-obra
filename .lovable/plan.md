
## Correcao: Dados Incompletos na Planilha + FONTE com Atribuicao Correta

### Problemas Identificados

1. **UTMs perdidos na navegacao**: Quando o usuario acessa a LP com `?utm_source=facebook&...`, esses parametros estao na URL da LP. Mas quando o formulario navega para `/redirecionando`, a URL muda e os UTMs somem. A funcao `getUtmParams()` le de `window.location.search` na pagina `/redirecionando`, que nao tem parametros.

2. **Integracao duplicada com Google Sheets**: Existem DUAS integracoes enviando para a planilha:
   - `sendToGoogleSheets` (direto via Google Apps Script com `no-cors` — sem confirmacao de sucesso)
   - Webhook do Make na edge function `capture-lead`
   
   A duplicidade causa confusao e a integracao direta e pouco confiavel.

3. **FONTE sem atribuicao clara**: O campo `fonte` envia o valor bruto de `utm_source` (ex: "facebook") ou "direto". Deveria enviar algo mais descritivo como "Meta Ads" ou "Organico/Direto".

### Solucao

**Arquivo 1: `client/src/components/ui/hero-registration-form.tsx`**
- Ao submeter o formulario, capturar os UTMs da URL ATUAL (que ainda e a LP com parametros) e salva-los no sessionStorage junto com os dados do lead

**Arquivo 2: `client/src/components/ui/registration-form.tsx`**
- Mesma logica: salvar UTMs no sessionStorage antes de navegar

**Arquivo 3: `client/src/pages/Redirecionando.tsx`**
- Ler os UTMs do sessionStorage (em vez de depender da URL)
- Passa-los para `captureLead()`
- Remover a chamada `sendToGoogleSheets()` (redundante — o Make webhook ja faz isso)
- Remover o import de `sendToGoogleSheets`

**Arquivo 4: `client/src/lib/capture-lead.ts`**
- Aceitar UTMs como parametro opcional (para quando vierem do sessionStorage)
- Se nao receber UTMs como parametro, usar `getUtmParams()` como fallback

**Arquivo 5: `supabase/functions/capture-lead/index.ts`**
- Atualizar o campo `fonte` no webhook do Make para enviar:
  - `"Meta Ads"` quando `utm_source` for "facebook", "fb", "ig", "instagram" ou "meta"
  - `"Google Ads"` quando `utm_source` for "google"
  - `"Organico/Direto"` quando nao houver utm_source

### Detalhes Tecnicos

**Fluxo corrigido:**

```text
LP (/alem-da-tendencia?utm_source=facebook&...)
  |
  v
Formulario submit:
  sessionStorage = { lead-data: {name, email, phone}, lead-utms: {utm_source, ...} }
  navigate("/redirecionando")
  |
  v
/redirecionando:
  Le lead-data + lead-utms do sessionStorage
  await captureLead({ ...data, utms })  <-- UTMs preservados!
  redirect -> Sympla
```

**Mudanca no webhook Make (edge function):**

```typescript
// Antes:
fonte: utm_source || "direto"

// Depois:
function classifySource(utm_source?: string): string {
  if (!utm_source) return "Organico/Direto";
  const s = utm_source.toLowerCase();
  if (["facebook","fb","ig","instagram","meta"].includes(s)) return "Meta Ads";
  if (s === "google") return "Google Ads";
  return utm_source; // outros fontes mantém o valor original
}
fonte: classifySource(utm_source)
```

**Sobre a integracao direta `sendToGoogleSheets`:**
Sera removida da pagina de redirecionamento pois e redundante com o webhook do Make. O Make ja envia os dados para a planilha do Google de forma mais confiavel (com confirmacao de entrega), enquanto a integracao direta usa `no-cors` e nao tem como confirmar se os dados chegaram. O arquivo `google-sheets.ts` sera mantido no projeto caso seja necessario no futuro, mas nao sera mais chamado no fluxo da LP Alem da Tendencia.

### Tempo de Redirecionamento
O timeout de seguranca de 5 segundos esta adequado. A chamada real leva menos de 1 segundo (confirmado no teste). O usuario vera a tela de loading por menos de 2 segundos na maioria dos casos.
