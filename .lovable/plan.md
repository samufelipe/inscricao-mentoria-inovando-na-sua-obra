
# Plano de Otimização da LP para Meta Ads

## Resumo

Implementação de otimizações técnicas e de UX na landing page `/mentoria` para melhorar performance (Core Web Vitals), tracking de eventos e taxa de conversão em campanhas Meta Ads. O Meta Pixel será configurado manualmente por você.

---

## Mudanças Propostas

### 1. Performance - Otimizações de Carregamento

**Arquivo: `index.html`**

Adicionar preconnect e preload para recursos críticos:
- `preconnect` para o CDN do WordPress (imagens)
- `preload` para a imagem do hero (LCP - Largest Contentful Paint)
- Meta tags Open Graph para melhor preview em redes sociais

### 2. Tracking de Eventos para GTM

**Arquivo: `src/pages/MentoriaLanding.tsx`**

Integrar o sistema de tracking existente (`gtm-tracking.ts`):
- Evento de page_view específico para mentoria
- Tracking de scroll depth (25%, 50%, 75%, 100%)
- Tracking de tempo na página
- Tracking de visualização da seção de pricing
- Tracking de cliques nos CTAs com localização
- Tracking de interação com FAQ
- Tracking de play em vídeos de depoimento

### 3. Persistência de UTMs no localStorage

**Novo arquivo: `src/lib/utm-storage.ts`**

Salvar UTMs da primeira visita para atribuição cross-session:
- Captura e salva UTMs na primeira visita
- Recupera UTMs salvos em visitas subsequentes
- Útil quando o usuário sai e volta depois pelo Google

**Arquivo: `src/pages/MentoriaLanding.tsx`** e `CheckoutBridge.tsx`
- Usar UTMs salvos como fallback

### 4. CTA Fixo Mobile Otimizado

**Arquivo: `src/components/mentoria/MentoriaMobileCTA.tsx`**

Melhorias para aumentar conversão:
- Adicionar animação de pulse sutil no botão
- Mostrar o valor "12x R$196" para reforçar oferta
- Melhorar visibilidade com sombra mais pronunciada

### 5. Dimensões de Imagens para CLS

**Arquivo: `src/pages/MentoriaLanding.tsx`**

Adicionar `width` e `height` nas imagens principais:
- Hero image: evitar layout shift
- Logo: definir dimensões

---

## Detalhes Técnicos

### 1. Preconnect e Open Graph (index.html)

```html
<!-- Preconnect para CDN -->
<link rel="preconnect" href="https://inovandonasuaobra.com.br" crossorigin />

<!-- Preload hero image -->
<link rel="preload" as="image" href="https://inovandonasuaobra.com.br/wp-content/uploads/2025/06/Post-instagram-contratar-advogado-moderno-azul-e-bege-4-e1752604162881.png" />

<!-- Open Graph Meta Tags -->
<meta property="og:title" content="Mentoria Inovando na sua Obra" />
<meta property="og:description" content="Domine o gerenciamento de obra de interiores de maneira lucrativa e eficiente" />
<meta property="og:image" content="[URL da imagem das mentoras]" />
<meta property="og:url" content="https://inscricao-cronogramainovandonasuaobracombr.lovable.app/mentoria" />
<meta property="og:type" content="website" />
```

### 2. Tracking Integrado (MentoriaLanding.tsx)

```typescript
// Importar funções de tracking
import { 
  initScrollTracking, 
  initTimeTracking, 
  trackPageView,
  trackCTAClick,
  trackSectionView,
  trackVideoInteraction,
  trackFAQClick
} from "@/lib/gtm-tracking";

// No useEffect inicial
useEffect(() => {
  trackPageView("Mentoria Landing Page");
  initScrollTracking();
  initTimeTracking();
}, []);

// Nos CTAs
onClick={() => {
  trackCTAClick("cta_pricing", "pricing_section", "Quero meu acesso agora");
  scrollToForm(false);
}}
```

### 3. UTM Storage (novo arquivo)

```typescript
// src/lib/utm-storage.ts
const UTM_STORAGE_KEY = "mentoria_utm_params";
const UTM_EXPIRY_DAYS = 30;

export function saveUtmParams(params: URLSearchParams) {
  const utmParams = {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_content: params.get("utm_content"),
    utm_term: params.get("utm_term"),
    saved_at: Date.now(),
  };
  
  // Só salva se tiver pelo menos utm_source
  if (utmParams.utm_source) {
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmParams));
  }
}

export function getStoredUtmParams(): Record<string, string> | null {
  const stored = localStorage.getItem(UTM_STORAGE_KEY);
  if (!stored) return null;
  
  const parsed = JSON.parse(stored);
  const expiryMs = UTM_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  
  if (Date.now() - parsed.saved_at > expiryMs) {
    localStorage.removeItem(UTM_STORAGE_KEY);
    return null;
  }
  
  return parsed;
}
```

### 4. CTA Mobile Otimizado

```tsx
// Adicionar preço e animação
<Button className="w-full animate-pulse-subtle ...">
  Quero Entrar • 12x R$196
  <ArrowRight className="ml-2 h-5 w-5" />
</Button>
```

### 5. Dimensões de Imagens

```tsx
// Hero image com dimensões explícitas
<img 
  src={images.heroPhoto} 
  alt="Ingrid Zarza e Fernanda Bradaschia" 
  loading="eager"
  width={600}
  height={600}
/>
```

---

## Arquivos Modificados

| Arquivo | Tipo | Mudança |
|---------|------|---------|
| `index.html` | Editar | Preconnect, preload, OG tags |
| `src/lib/utm-storage.ts` | Criar | Funções de persistência UTM |
| `src/pages/MentoriaLanding.tsx` | Editar | Integrar tracking, dimensões de imagens |
| `src/pages/CheckoutBridge.tsx` | Editar | Usar UTMs do storage como fallback |
| `src/components/mentoria/MentoriaMobileCTA.tsx` | Editar | Melhorias visuais e preço |
| `src/styles/mentoria-wp.css` | Editar | Animação pulse-subtle |

---

## Impacto Esperado

| Otimização | Benefício |
|------------|-----------|
| Preconnect/Preload | Reduz LCP em ~200-500ms |
| Dimensões de imagens | Reduz CLS (evita layout shift) |
| Tracking de eventos | Dados para otimização de campanhas |
| UTM persistence | Melhor atribuição de conversões |
| CTA mobile com preço | Maior clareza = maior conversão |
| Open Graph tags | Melhor CTR em compartilhamentos |

---

## Observação

O Meta Pixel será configurado por você manualmente via GTM. Os eventos de dataLayer que estou adicionando (`page_view`, `scroll_depth`, `cta_click`, etc.) são compatíveis com o GTM e podem ser usados para disparar eventos do Pixel.
