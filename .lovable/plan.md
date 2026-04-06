

## Análise

A página `/materiais` **não tem nenhum rastreamento GTM/dataLayer implementado**. Todos os eventos de tracking (`trackCTAClick`, `trackFormStart`, `trackFormSubmit`, etc.) existem apenas na página `/alem-da-tendencia` e seus componentes. O `LeadCaptureModal` também não dispara nenhum evento.

Isso significa que o Meta Pixel (configurado via GTM) não recebe nenhum dado de interação da página de materiais.

## Plano

### 1. Adicionar eventos ao `LeadCaptureModal`
No `client/src/components/ui/lead-capture-modal.tsx`:
- **Modal aberto**: disparar `trackFormStart("lead-capture-{productKey}")` quando o modal abre
- **Foco em campos**: disparar `trackFormFieldFocus` em cada input (name, email, phone)
- **Submit com sucesso**: disparar `trackFormSubmit("lead-capture-{productKey}", true)` após capturar o lead
- **Evento de checkout iniciado**: novo evento `initiate_checkout` com `product_key` para mapear ao evento `InitiateCheckout` do Meta Pixel no GTM

### 2. Adicionar eventos aos CTAs da página Materiais
No `client/src/pages/Materiais.tsx`:
- Importar `trackCTAClick` do `gtm-tracking.ts`
- Adicionar `trackCTAClick` em cada `openCheckout()` com label e seção identificando o botão (ex: `"Comprar Agora"`, `"hero"` / `"card-checklists"` / `"card-ebook"` / `"combo-destaque"`)
- Adicionar `trackCTAClick` em cada `scrollToProducts()` com label `"Ver Produtos"` e a seção correspondente

### 3. Adicionar scroll tracking e section observer à página Materiais
No `client/src/pages/Materiais.tsx`:
- Importar e inicializar `initScrollTracking()` e `createSectionObserver()` via `useEffect`
- Adicionar atributos `data-track-section` nas seções principais: `"hero"`, `"urgencia"`, `"problema"`, `"o-que-voce-recebe"`, `"produtos"`, `"combo"`, `"criadoras"`, `"garantia"`, `"faq"`

### 4. Adicionar novo evento `initiate_checkout` ao gtm-tracking.ts
No `client/src/lib/gtm-tracking.ts`:
- Nova função `trackInitiateCheckout(productKey, value)` que dispara evento `initiate_checkout` com dados do produto, alinhado ao padrão do Meta Pixel (`InitiateCheckout`)
- Nova função `trackLeadCapture(productKey)` que dispara evento `lead_captured` para mapear ao evento `Lead` do Meta Pixel

### Resumo de eventos para configurar no GTM
| Evento dataLayer | Evento Meta Pixel |
|---|---|
| `cta_click` | `ViewContent` (custom) |
| `form_start` | `AddToCart` (interesse) |
| `form_submit` | `Lead` |
| `initiate_checkout` | `InitiateCheckout` |
| `scroll_depth` | Custom event |
| `section_view` | `ViewContent` |

### Arquivos alterados
- `client/src/lib/gtm-tracking.ts` (2 novas funções)
- `client/src/components/ui/lead-capture-modal.tsx` (tracking completo)
- `client/src/pages/Materiais.tsx` (CTAs + scroll + section observer)

