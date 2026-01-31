
# Auditoria Completa: Integrações RD Station e Estrutura de Tracking

## Resumo Executivo

Analisei toda a arquitetura de integrações e a estrutura está **bem organizada e funcional**. Encontrei alguns pontos de melhoria para garantir robustez e consistência de alto nível.

---

## Arquitetura Atual (Status: Funcional)

```text
+------------------+      +------------------+      +------------------+
|    Landing Page  |      |  CheckoutBridge  |      |  Edge Functions  |
|    (/)           |----->|  /checkout/:prod |----->|  log-checkout-   |
|                  |      |                  |      |  intent          |
+------------------+      +------------------+      +------------------+
        |                         |                         |
        |                         |                         v
        v                         |              +------------------+
+------------------+              |              |   RD Station     |
|   GTM/DataLayer  |              |              |   (checkout-     |
|   - page_view    |              |              |   mentoria)      |
|   - scroll_depth |              |              +------------------+
|   - cta_click    |              |
|   - time_on_page |              v
+------------------+      +------------------+
                          |   Hotmart        |
                          |   Checkout       |
                          +------------------+
                                  |
                                  v
                          +------------------+
                          |   hotmart-       |
                          |   webhook        |---> RD Station
                          +------------------+     (compra/abandono)
                                  |
                                  v
                          +------------------+
                          |   checkout_      |
                          |   intents (DB)   |
                          +------------------+
                                  ^
                                  |
                          +------------------+
                          |   abandonment-   |
                          |   sweeper (CRON) |---> RD Station
                          +------------------+     (carrinho abandonado)
```

---

## Fluxo de Eventos Detalhado

### 1. Captura de Lead (Formulário Hero)
| Passo | Componente | Evento |
|-------|-----------|--------|
| 1 | MentoriaLanding.tsx | Formulário submissão |
| 2 | GTM DataLayer | `checkout_intent` |
| 3 | Redirect | `/checkout/mentoria?email=...&name=...` |

### 2. Registro no Backend (CheckoutBridge)
| Passo | Componente | Evento |
|-------|-----------|--------|
| 4 | CheckoutBridge.tsx | Chama `log-checkout-intent` |
| 5 | log-checkout-intent | Salva em `checkout_intents` (status: started) |
| 6 | log-checkout-intent | Envia para RD Station (`checkout-mentoria`) |
| 7 | CheckoutBridge.tsx | Redireciona para Hotmart |

### 3. Detecção de Abandono (CRON)
| Passo | Componente | Evento |
|-------|-----------|--------|
| 8 | abandonment-sweeper | Busca intents com `status: started` + `created_at < 3min` |
| 9 | abandonment-sweeper | Envia para RD Station (`mentoria-inovando-na-sua-obra-carrinho-abandonado`) |
| 10 | abandonment-sweeper | Atualiza status para `abandoned` |

### 4. Compra Aprovada (Webhook Hotmart)
| Passo | Componente | Evento |
|-------|-----------|--------|
| 11 | hotmart-webhook | Recebe evento `PURCHASE_APPROVED` |
| 12 | hotmart-webhook | Atualiza intent para `status: purchased` |
| 13 | hotmart-webhook | Envia para RD Station (`mentoria-inovando-na-sua-obra-compra-aprovada`) |

---

## Identificadores de Conversão (RD Station)

| Momento | Produto | Identificador |
|---------|---------|---------------|
| Checkout iniciado | mentoria | `checkout-mentoria` |
| Carrinho abandonado | mentoria | `mentoria-inovando-na-sua-obra-carrinho-abandonado` |
| Compra aprovada | mentoria | `mentoria-inovando-na-sua-obra-compra-aprovada` |
| Checkout iniciado | imersao | `checkout-imersao` |
| Carrinho abandonado | imersao | `imersao-cronograma-2.0-o-mapa-da-obra-carrinho-abandonado` |
| Compra aprovada | imersao | `imersao-cronograma-2.0-o-mapa-da-obra-compra-aprovada` |

---

## Pontos Fortes Identificados

1. **Persistência de UTMs**: Sistema robusto com localStorage (30 dias de validade) + mesclagem de parâmetros URL/salvos
2. **Fallback de Hotmart**: Webhook cria registro mesmo sem intent prévio (captura direto do checkout)
3. **Auditoria completa**: Tabela `checkout_intents` registra todo o ciclo de vida do lead
4. **Paralelismo**: `log-checkout-intent` executa RD Station e DB em paralelo para velocidade
5. **Timeout de segurança**: CheckoutBridge usa timeout de 3s para não bloquear o usuário

---

## Oportunidades de Melhoria

### 1. CORS Headers Incompletos (Crítico)
O `Access-Control-Allow-Headers` nas edge functions não inclui todos os headers que o Supabase client envia. Isso pode causar falhas em alguns navegadores.

**Atualmente:**
```javascript
"Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
```

**Recomendado:**
```javascript
"Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version"
```

### 2. Evento de Formulário Faltando no GTM
O formulário do Hero dispara `checkout_intent` no DataLayer, mas não dispara `form_submit` do `gtm-tracking.ts`. Isso pode afetar rastreamento de funil.

**Ação:** Adicionar chamada `trackFormSubmit()` antes do redirect.

### 3. RD Station - Envio Duplicado Potencial
O `log-checkout-intent` envia para RD Station imediatamente com `checkout-mentoria`. Depois o `abandonment-sweeper` pode enviar novamente com `mentoria-inovando-na-sua-obra-carrinho-abandonado` para o mesmo lead.

**Impacto:** O lead pode receber 2 segmentações diferentes no RD. Isso é intencional ou deveria ser uma única jornada?

**Sugestão:** Avaliar se o primeiro evento (`checkout-mentoria`) deveria ser removido ou renomeado para evitar conflito com automações.

### 4. Validação de Email no Backend
O `log-checkout-intent` não valida formato de email no servidor. Um email inválido passaria para o RD Station e seria rejeitado lá.

**Sugestão:** Adicionar validação regex simples antes de processar.

### 5. Tratamento de Erros no Frontend
O `handleFormSubmit` em `MentoriaLanding.tsx` não tem `try/catch`. Se algo falhar antes do redirect, o usuário fica travado.

**Sugestão:** Adicionar tratamento de erro com toast de feedback.

---

## Estrutura da Tabela checkout_intents

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid | ID único |
| product | text | "imersao" ou "mentoria" |
| email | text | Email do lead |
| name | text | Nome do lead |
| phone | text | Telefone (opcional) |
| utm_* | text | Parâmetros de atribuição |
| status | text | started, abandoned, purchased |
| created_at | timestamptz | Momento do intent |
| sent_to_rd_at | timestamptz | Quando foi enviado abandono |
| purchased_at | timestamptz | Quando comprou |
| hotmart_transaction_id | text | ID da transação Hotmart |
| rd_attempts | integer | Tentativas de envio ao RD |
| rd_response | jsonb | Resposta do RD Station |

---

## Próximas Ações Recomendadas

1. **Atualizar CORS** em todas as edge functions (prioridade alta)
2. **Adicionar trackFormSubmit()** no formulário do Hero
3. **Revisar fluxo de eventos** RD para evitar duplicação
4. **Adicionar validação de email** no log-checkout-intent
5. **Adicionar try/catch** no handleFormSubmit do landing

---

## Conclusão

A arquitetura está **bem estruturada e funcional**. Os dados fluem corretamente do formulário até o RD Station, com mecanismos de fallback e auditoria robustos. As melhorias sugeridas são refinamentos para aumentar a confiabilidade e consistência do tracking.

Deseja que eu implemente as melhorias identificadas?
