function getUtmParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
    utm_content: params.get("utm_content") || undefined,
    utm_term: params.get("utm_term") || undefined,
  };
}

interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

export async function captureLead(data: {
  name: string;
  email: string;
  phone: string;
  product: string;
  utms?: UtmParams;
  page_url?: string;
}) {
  const { supabase } = await import("../../../src/integrations/supabase/client");
  const utms = data.utms || getUtmParams();

  const { error } = await supabase.functions.invoke("capture-lead", {
    body: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      product: data.product,
      ...utms,
      page_url: data.page_url || window.location.href,
    },
  });

  if (error) {
    console.error("captureLead error:", error);
  }
}
