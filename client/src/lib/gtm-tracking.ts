/**
 * GTM DataLayer Tracking for LP "Além da Tendência"
 * 
 * Pushes structured events to window.dataLayer for Google Tag Manager.
 * Events follow a consistent naming convention for easy GTM trigger setup.
 */

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

function push(event: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

// ── CTA Clicks ──────────────────────────────────────────────
export function trackCTAClick(label: string, section: string) {
  push({
    event: "cta_click",
    cta_label: label,
    cta_section: section,
  });
}

// ── Form Events ─────────────────────────────────────────────
export function trackFormStart(formId: string) {
  push({ event: "form_start", form_id: formId });
}

export function trackFormFieldFocus(formId: string, fieldName: string) {
  push({ event: "form_field_focus", form_id: formId, field_name: fieldName });
}

export function trackFormSubmit(formId: string, success: boolean) {
  push({ event: "form_submit", form_id: formId, form_success: success });
}

// ── Section Visibility ──────────────────────────────────────
export function trackSectionView(sectionName: string) {
  push({ event: "section_view", section_name: sectionName });
}

// ── Scroll Depth ────────────────────────────────────────────
const firedDepths = new Set<number>();

export function initScrollTracking() {
  const thresholds = [25, 50, 75, 90, 100];

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const pct = Math.round((scrollTop / docHeight) * 100);

    for (const t of thresholds) {
      if (pct >= t && !firedDepths.has(t)) {
        firedDepths.add(t);
        push({ event: "scroll_depth", scroll_percentage: t });
      }
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}

// ── Video Events ────────────────────────────────────────────
export function trackVideoPlay() {
  push({ event: "video_play", video_label: "depoimento" });
}

// ── FAQ Interaction ─────────────────────────────────────────
export function trackFAQOpen(question: string) {
  push({ event: "faq_open", faq_question: question });
}

// ── External Link Clicks ────────────────────────────────────
export function trackExternalLink(url: string, label: string) {
  push({ event: "external_link_click", link_url: url, link_label: label });
}

// ── Footer Nav ──────────────────────────────────────────────
export function trackFooterNav(label: string) {
  push({ event: "footer_nav_click", nav_label: label });
}

// ── Section Observer (auto-tracks when sections enter viewport) ──
export function createSectionObserver() {
  if (typeof IntersectionObserver === "undefined") return null;

  const observed = new Set<string>();

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const name = (entry.target as HTMLElement).dataset.trackSection;
          if (name && !observed.has(name)) {
            observed.add(name);
            trackSectionView(name);
          }
        }
      }
    },
    { threshold: 0.3 }
  );

  return observer;
}
