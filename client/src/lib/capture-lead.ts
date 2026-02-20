import { supabase } from "../../../src/integrations/supabase/client";

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

export async function captureLead(data: {
  name: string;
  email: string;
  phone: string;
  product: string;
}) {
  const utms = getUtmParams();

  const { error } = await supabase.functions.invoke("capture-lead", {
    body: {
      ...data,
      ...utms,
      page_url: window.location.href,
    },
  });

  if (error) {
    console.error("captureLead error:", error);
  }
}
