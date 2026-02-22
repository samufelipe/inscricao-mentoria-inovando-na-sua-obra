
# Plano: Webhook Make + Contador Regressivo + Correcao do Formulario

## Resumo

Tres alteracoes: integrar o webhook do Make para enviar leads a planilha Google Sheets (com 5 colunas simplificadas), adicionar contador regressivo na secao de preco, e corrigir o background dos inputs do formulario.

---

## 1. Estrutura da Planilha Google Sheets

Crie uma planilha com estas 5 colunas na linha 1:

| A | B | C | D | E |
|---|---|---|---|---|
| Data/Hora | Nome | Email | WhatsApp | Fonte |

- **Data/Hora**: data e horario do preenchimento (formato brasileiro: 22/02/2026 14:30:00)
- **Nome**: nome completo informado
- **Email**: e-mail informado
- **WhatsApp**: numero informado
- **Fonte**: de onde veio o lead (utm_source, ou "direto" se sem UTM)

No Make, mapeie cada campo do webhook para a coluna correspondente.

---

## 2. Secret do Webhook

Sera adicionado um secret chamado `MAKE_WEBHOOK_URL` com o valor da URL que voce ja forneceu:
`https://hook.us1.make.com/xhn8ehmzqopi4q525v8m1znqoxx7t5u4`

---

## 3. Alteracao na Edge Function `capture-lead`

**Arquivo:** `supabase/functions/capture-lead/index.ts`

Apos o insert no banco (linha 55), adicionar um bloco non-blocking que envia 5 campos ao Make:

```text
Payload enviado:
{
  "data_hora": "22/02/2026 14:30:00",
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "whatsapp": "(11) 99999-0000",
  "fonte": "instagram"   (ou "direto" se sem utm_source)
}
```

- Usa `Deno.env.get("MAKE_WEBHOOK_URL")`
- Envolvido em try/catch para nao bloquear a resposta ao usuario
- Data/hora calculada no fuso de Brasilia (UTC-3)

---

## 4. Contador Regressivo

**Arquivo:** `client/src/pages/AlemDaTendencia.tsx`

Adicionar entre o badge "Ultimas vagas disponiveis" (linha 541) e o card de preco (linha 543):

- 4 blocos: Dias | Horas | Min | Seg
- Data alvo: 10 de marco de 2026 as 13:30 (horario de Brasilia)
- Estilo: `bg-white/5 border border-[#C9A84C]/20 rounded-lg` com numeros dourados grandes
- Logica: `useState` + `useEffect` com `setInterval` de 1 segundo
- Quando zerar: exibe "Evento em andamento!"

---

## 5. Correcao do Background do Formulario

**Arquivo:** `client/src/components/ui/hero-registration-form.tsx`

Linhas 54, 64, 74: trocar `bg-white/10` por `bg-white/5` e `border-white/10` por `border-white/5` nos 3 inputs para integrar visualmente com o card escuro.

---

## Arquivos modificados

| Arquivo | Alteracao |
|---------|-----------|
| `supabase/functions/capture-lead/index.ts` | Envio non-blocking ao webhook do Make com 5 campos |
| `client/src/pages/AlemDaTendencia.tsx` | Contador regressivo acima do card de preco |
| `client/src/components/ui/hero-registration-form.tsx` | Inputs com bg-white/5 e border-white/5 |
| Secret `MAKE_WEBHOOK_URL` | URL do webhook do Make |
