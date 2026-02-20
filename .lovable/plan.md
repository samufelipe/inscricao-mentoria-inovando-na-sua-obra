

# Salvar dados do formulario no banco antes de redirecionar para o Sympla

## Resumo

Criar uma edge function para salvar os dados de lead (nome, email, telefone) na tabela `checkout_intents` existente antes de redirecionar o usuario para o Sympla. Os dois formularios da LP "Alem da Tendencia" (hero e secao de inscricao) serao atualizados para enviar os dados ao backend antes do redirecionamento.

## O que sera feito

1. **Criar edge function `capture-lead`** que recebe nome, email, telefone, produto, UTMs e page_url, e insere na tabela `checkout_intents` com status "started".

2. **Atualizar os dois formularios da LP** (`hero-registration-form.tsx` e `registration-form.tsx`) para:
   - Chamar a edge function antes de redirecionar
   - Redirecionar para o Sympla (por enquanto mantendo o link do WhatsApp ate voce fornecer o link do Sympla)
   - Manter feedback visual de loading e tratamento de erros

3. **Capturar UTMs da URL** para fins de rastreamento de campanhas (utm_source, utm_medium, etc.)

---

## Detalhes tecnicos

### 1. Edge function `supabase/functions/capture-lead/index.ts`

- Recebe POST com `{ name, email, phone, product, page_url, utm_source, utm_medium, utm_campaign, utm_content, utm_term }`
- Valida email e campos obrigatorios no servidor
- Insere na tabela `checkout_intents` usando `SUPABASE_SERVICE_ROLE_KEY` (ja configurado como secret)
- Retorna `{ success: true, id }` ou erro
- Inclui headers CORS padrao

### 2. Atualizacao dos formularios

- Importar o cliente Supabase
- No `handleSubmit`, antes do redirecionamento:
  - Chamar `supabase.functions.invoke('capture-lead', { body: { ... } })`
  - Se falhar, exibir toast de erro mas ainda redirecionar (nao bloquear a compra)
- Extrair UTMs de `window.location.search`

### 3. Configuracao

- Adicionar entrada `[functions.capture-lead]` com `verify_jwt = false` no `supabase/config.toml`
- Nao sao necessarios novos secrets (ja existem `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`)
- Nao sao necessarias alteracoes no schema da tabela `checkout_intents` (ja possui todos os campos necessarios)

### Observacao sobre o Sympla

Assim que voce fornecer o link do evento no Sympla, substituirei o redirecionamento atual (WhatsApp) pelo link correto do Sympla nos dois formularios.

