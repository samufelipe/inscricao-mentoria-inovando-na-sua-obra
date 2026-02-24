

## Correção: Reconhecer `meta-ads` como fonte do Meta Ads

### Problema

A UTM usada nos anúncios é `utm_source=meta-ads`, mas a função `classifySource` na edge function só reconhece estes valores:

```text
"facebook", "fb", "ig", "instagram", "meta"
```

Como `"meta-ads"` não está na lista, o campo FONTE na planilha recebe o valor bruto `"meta-ads"` em vez de **"Meta Ads"**.

### Solução

Alterar a lógica de classificação na edge function `capture-lead` para usar `s.startsWith("meta")` ou `s.includes("meta")` em vez de comparação exata. Isso cobre tanto `"meta"` quanto `"meta-ads"` e qualquer variação futura.

### Detalhe Técnico

**Arquivo: `supabase/functions/capture-lead/index.ts` (linha 80)**

```typescript
// Antes:
if (["facebook", "fb", "ig", "instagram", "meta"].includes(s)) return "Meta Ads";

// Depois:
if (["facebook", "fb", "ig", "instagram", "meta", "meta-ads"].includes(s) || s.startsWith("meta")) return "Meta Ads";
```

Usar `s.startsWith("meta")` garante que qualquer variação como `meta-ads`, `meta_ads`, `meta-cpc` etc. seja reconhecida automaticamente.

Nenhum outro arquivo precisa ser alterado.

