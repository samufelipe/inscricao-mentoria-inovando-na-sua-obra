import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, product, page_url, utm_source, utm_medium, utm_campaign, utm_content, utm_term } =
      await req.json();

    if (!email || !EMAIL_RE.test(email)) {
      return new Response(JSON.stringify({ error: "Email inválido" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!product) {
      return new Response(JSON.stringify({ error: "Produto é obrigatório" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data, error } = await supabase
      .from("checkout_intents")
      .insert({
        name: name?.slice(0, 200) || null,
        email: email.slice(0, 255),
        phone: phone?.slice(0, 30) || null,
        product: product.slice(0, 100),
        page_url: page_url?.slice(0, 500) || null,
        status: "started",
        utm_source: utm_source?.slice(0, 200) || null,
        utm_medium: utm_medium?.slice(0, 200) || null,
        utm_campaign: utm_campaign?.slice(0, 200) || null,
        utm_content: utm_content?.slice(0, 200) || null,
        utm_term: utm_term?.slice(0, 200) || null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Insert error:", error);
      return new Response(JSON.stringify({ error: "Erro ao salvar dados" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Erro interno" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
