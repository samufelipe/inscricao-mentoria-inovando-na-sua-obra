import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-hotmart-hottok",
};

// Token de segurança do webhook Hotmart
const HOTMART_HOTTOK = Deno.env.get("HOTMART_HOTTOK");
const RD_STATION_API_KEY = Deno.env.get("RD_STATION_API_KEY");

// 🔧 MODO DEBUG: Quando ativo, aceita requisições sem validar token
const DEBUG_MODE = Deno.env.get("HOTMART_DEBUG_MODE") === "true";

// Identificadores de conversão para RD Station
const PURCHASE_CONVERSION_IDENTIFIERS: Record<string, string> = {
  imersao: "imersao-cronograma-2.0-o-mapa-da-obra-compra-aprovada",
  mentoria: "mentoria-inovando-na-sua-obra-compra-aprovada",
};

// Identificador para carrinho abandonado (PURCHASE_OUT_OF_SHOPPING_CART)
const ABANDONED_CART_IDENTIFIERS: Record<string, string> = {
  imersao: "checkout-imersao", // Já existente
  mentoria: "mentoria-inovando-na-sua-obra-carrinho-abandonado",
};

// Interface para o payload da Hotmart (múltiplos formatos)
interface HotmartWebhookPayload {
  // Formato padrão Hotmart v2
  event?: string;
  data?: {
    buyer?: {
      email?: string;
      name?: string;
      phone?: string;
    };
    product?: {
      id?: number;
      name?: string;
    };
    purchase?: {
      status?: string;
      transaction?: string;
      order_date?: string;
    };
  };
  // Formato Hotmart v1 / alternativo
  buyer?: {
    email?: string;
    name?: string;
  };
  product?: {
    id?: number;
    name?: string;
  };
  purchase?: {
    status?: string;
    transaction?: string;
  };
  // Formato flat (usado por alguns webhooks/Pluga)
  buyer_email?: string;
  buyer_name?: string;
  product_name?: string;
  status?: string;
  transaction?: string;
  hottok?: string;
}

serve(async (req: Request) => {
  const requestId = crypto.randomUUID().slice(0, 8);
  console.log(`\n========== [${requestId}] HOTMART WEBHOOK RECEBIDO ==========`);
  console.log(`📅 Timestamp: ${new Date().toISOString()}`);
  console.log(`🔗 Method: ${req.method}`);
  
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    console.log(`[${requestId}] ✅ CORS preflight handled`);
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Log headers para debug
    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      headers[key] = key.toLowerCase().includes("hottok") ? "***REDACTED***" : value;
    });
    console.log(`[${requestId}] 📋 Headers:`, JSON.stringify(headers, null, 2));

    // Obter o body raw para debug
    const rawBody = await req.text();
    console.log(`[${requestId}] 📦 Raw body length: ${rawBody.length} chars`);
    
    let body: HotmartWebhookPayload;
    try {
      body = JSON.parse(rawBody);
      console.log(`[${requestId}] 📥 Payload parsed:`, JSON.stringify(body, null, 2));
    } catch (parseError) {
      console.error(`[${requestId}] ❌ Erro ao parsear JSON:`, parseError);
      console.error(`[${requestId}] 📄 Raw body:`, rawBody.slice(0, 500));
      return new Response(
        JSON.stringify({ error: "Invalid JSON payload" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validar token Hotmart - Verificar em múltiplos lugares
    const headerHottok = req.headers.get("x-hotmart-hottok");
    const bodyHottok = body.hottok;
    const receivedHottok = headerHottok || bodyHottok;
    
    console.log(`[${requestId}] 🔐 Token check:`, {
      headerHottok: headerHottok ? "presente" : "ausente",
      bodyHottok: bodyHottok ? "presente" : "ausente",
      serverHottok: HOTMART_HOTTOK ? "configurado" : "NÃO CONFIGURADO",
    });

    // 🔧 MODO DEBUG - Loga TUDO e pula validação de token
    if (DEBUG_MODE) {
      console.warn(`[${requestId}] ⚠️⚠️⚠️ DEBUG MODE ATIVO - ACEITANDO REQUISIÇÃO SEM VALIDAR TOKEN ⚠️⚠️⚠️`);
      console.log(`[${requestId}] 🔍 DEBUG - Payload completo:`, JSON.stringify(body, null, 2));
      console.log(`[${requestId}] 🔍 DEBUG - Headers completo:`, JSON.stringify(headers, null, 2));
    } else {
      // Verificar se o token está configurado no servidor
      if (!HOTMART_HOTTOK) {
        console.error(`[${requestId}] ❌ HOTMART_HOTTOK não configurado no servidor`);
        return new Response(
          JSON.stringify({ error: "Webhook não configurado corretamente" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Validar token (aceita header ou body)
      if (!receivedHottok || receivedHottok !== HOTMART_HOTTOK) {
        console.warn(`[${requestId}] ⚠️ Token Hotmart inválido ou ausente`);
        console.warn(`[${requestId}] Token recebido: ${receivedHottok ? "***PRESENT***" : "MISSING"}`);
        return new Response(
          JSON.stringify({ error: "Unauthorized - Invalid or missing Hotmart token" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      console.log(`[${requestId}] ✅ Token Hotmart válido`);
    }

    // Extrair dados (suporta múltiplos formatos)
    const email = 
      body.data?.buyer?.email || 
      body.buyer?.email || 
      body.buyer_email;
    
    const buyerName = 
      body.data?.buyer?.name || 
      body.buyer?.name || 
      body.buyer_name;
    
    const productName = 
      body.data?.product?.name || 
      body.product?.name || 
      body.product_name;
    
    const event = body.event || "PURCHASE_APPROVED";
    
    const status = 
      body.data?.purchase?.status || 
      body.purchase?.status || 
      body.status || 
      "approved";
    
    const transactionId = 
      body.data?.purchase?.transaction || 
      body.purchase?.transaction || 
      body.transaction || 
      null;

    console.log(`[${requestId}] 📊 Dados extraídos:`, {
      email: email || "NÃO ENCONTRADO",
      buyerName: buyerName || "não informado",
      productName: productName || "não informado",
      event,
      status,
      transactionId: transactionId || "não informado",
    });

    if (!email) {
      console.error(`[${requestId}] ❌ Email do comprador não encontrado no payload`);
      return new Response(
        JSON.stringify({ error: "Email do comprador não encontrado" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verificar se é uma compra aprovada
    const approvedEvents = ["PURCHASE_APPROVED", "PURCHASE_COMPLETE", "PURCHASE_BILLET_PRINTED"];
    const approvedStatuses = ["approved", "complete", "completed", "paid"];
    
    // Verificar se é um evento de carrinho abandonado
    const abandonedCartEvents = ["PURCHASE_OUT_OF_SHOPPING_CART", "PURCHASE_CANCELED", "PURCHASE_EXPIRED"];
    
    const isApproved = 
      approvedEvents.includes(event.toUpperCase()) || 
      approvedStatuses.includes(status.toLowerCase());
    
    const isAbandonedCart = abandonedCartEvents.includes(event.toUpperCase());

    // Se for carrinho abandonado, enviar evento específico para RD Station
    if (isAbandonedCart) {
      console.log(`[${requestId}] 🛒 Evento de carrinho abandonado identificado:`, event);
      
      // Determinar produto
      let product: "imersao" | "mentoria" = "imersao";
      if (productName) {
        const nameLower = productName.toLowerCase();
        if (nameLower.includes("mentoria") || nameLower.includes("inovando")) {
          product = "mentoria";
        }
      }
      
      const normalizedEmail = email.toLowerCase().trim();
      
      // Enviar evento de carrinho abandonado para RD Station
      if (RD_STATION_API_KEY) {
        const abandonedIdentifier = ABANDONED_CART_IDENTIFIERS[product];
        
        const rdPayload = {
          event_type: "CONVERSION",
          event_family: "CDP",
          payload: {
            conversion_identifier: abandonedIdentifier,
            email: normalizedEmail,
            name: buyerName || "",
            cf_produto: product,
            cf_status_carrinho: "abandonado",
            cf_evento_hotmart: event,
            tags: [`carrinho-abandonado-${product}`, "hotmart-webhook"],
          },
        };

        console.log(`[${requestId}] 📤 Enviando evento de carrinho abandonado para RD Station:`, {
          email: normalizedEmail,
          conversion: abandonedIdentifier,
          product,
        });

        try {
          const rdResponse = await fetch(
            `https://api.rd.services/platform/conversions?api_key=${RD_STATION_API_KEY}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
              },
              body: JSON.stringify(rdPayload),
            }
          );

          const rdResponseData = await rdResponse.json().catch(() => ({}));
          
          if (rdResponse.ok) {
            console.log(`[${requestId}] ✅ Evento de carrinho abandonado enviado para RD Station:`, rdResponseData);
          } else {
            console.error(`[${requestId}] ❌ Erro RD Station (carrinho abandonado):`, rdResponse.status, rdResponseData);
          }
        } catch (rdError) {
          console.error(`[${requestId}] ❌ Erro na requisição ao RD Station (carrinho abandonado):`, rdError);
        }
      }
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          request_id: requestId,
          message: "Evento de carrinho abandonado processado",
          event,
          email: normalizedEmail,
          product,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!isApproved) {
      console.log(`[${requestId}] ℹ️ Evento não é compra aprovada nem carrinho abandonado, ignorando:`, { event, status });
      return new Response(
        JSON.stringify({ success: true, message: "Evento ignorado", event, status }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`[${requestId}] ✅ Evento de compra aprovada identificado`);

    // Determinar produto baseado no nome
    let product: "imersao" | "mentoria" = "imersao";
    if (productName) {
      const nameLower = productName.toLowerCase();
      if (nameLower.includes("mentoria") || nameLower.includes("inovando")) {
        product = "mentoria";
      }
    }

    const normalizedEmail = email.toLowerCase().trim();
    console.log(`[${requestId}] 🔍 Buscando checkout intents para:`, {
      email: normalizedEmail,
      product,
    });

    // Buscar intents pendentes
    const { data: intents, error: selectError } = await supabase
      .from("checkout_intents")
      .select("*")
      .eq("email", normalizedEmail)
      .eq("product", product)
      .eq("status", "started");

    if (selectError) {
      console.error(`[${requestId}] ❌ Erro ao buscar intents:`, selectError);
    }

    let updatedIntentIds: string[] = [];
    let intentFound = false;
    
    if (intents && intents.length > 0) {
      intentFound = true;
      console.log(`[${requestId}] 📝 Encontrados ${intents.length} intents para marcar como purchased`);
      
      // Marcar como purchased com dados de auditoria
      const { data: updatedIntents, error: updateError } = await supabase
        .from("checkout_intents")
        .update({ 
          status: "purchased",
          purchased_at: new Date().toISOString(),
          hotmart_transaction_id: transactionId,
        })
        .eq("email", normalizedEmail)
        .eq("product", product)
        .eq("status", "started")
        .select("id");

      if (updateError) {
        console.error(`[${requestId}] ❌ Erro ao atualizar intents:`, updateError);
      } else {
        console.log(`[${requestId}] ✅ Intents marcados como purchased`);
        updatedIntentIds = updatedIntents?.map(i => i.id) || [];
      }
    } else {
      console.log(`[${requestId}] ⚠️ Nenhum intent pendente encontrado para ${normalizedEmail}/${product}`);
      console.log(`[${requestId}] 📝 Criando registro de compra para auditoria...`);
      
      // Criar um registro de compra mesmo sem intent prévio (para auditoria)
      const { data: newIntent, error: insertError } = await supabase
        .from("checkout_intents")
        .insert({
          email: normalizedEmail,
          product,
          name: buyerName || null,
          status: "purchased",
          purchased_at: new Date().toISOString(),
          hotmart_transaction_id: transactionId,
          page_url: "hotmart-webhook-direct",
        })
        .select("id")
        .single();

      if (insertError) {
        console.error(`[${requestId}] ❌ Erro ao criar registro de auditoria:`, insertError);
      } else {
        console.log(`[${requestId}] ✅ Registro de auditoria criado:`, newIntent?.id);
        updatedIntentIds = newIntent ? [newIntent.id] : [];
      }
    }

    // Enviar evento de compra para RD Station
    let rdSuccess = false;
    if (RD_STATION_API_KEY) {
      const conversionIdentifier = PURCHASE_CONVERSION_IDENTIFIERS[product];
      
      const rdPayload = {
        event_type: "CONVERSION",
        event_family: "CDP",
        payload: {
          conversion_identifier: conversionIdentifier,
          email: normalizedEmail,
          name: buyerName || "",
          cf_produto: product,
          cf_status_carrinho: "comprado",
          cf_data_compra: new Date().toISOString(),
          cf_transacao_hotmart: transactionId || "",
        },
      };

      console.log(`[${requestId}] 📤 Enviando evento de compra para RD Station:`, {
        email: normalizedEmail,
        conversion: conversionIdentifier,
        product,
      });

      try {
        const rdResponse = await fetch(
          `https://api.rd.services/platform/conversions?api_key=${RD_STATION_API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify(rdPayload),
          }
        );

        const rdResponseData = await rdResponse.json().catch(() => ({}));
        
        if (rdResponse.ok) {
          console.log(`[${requestId}] ✅ Evento de compra enviado para RD Station:`, rdResponseData);
          rdSuccess = true;
        } else {
          console.error(`[${requestId}] ❌ Erro RD Station:`, rdResponse.status, rdResponseData);
        }
      } catch (rdError) {
        console.error(`[${requestId}] ❌ Erro na requisição ao RD Station:`, rdError);
      }
    } else {
      console.warn(`[${requestId}] ⚠️ RD_STATION_API_KEY não configurada`);
    }

    // Registrar auditoria do envio ao RD Station
    if (updatedIntentIds.length > 0) {
      const { error: auditError } = await supabase
        .from("checkout_intents")
        .update({
          purchase_sent_to_rd_at: RD_STATION_API_KEY ? new Date().toISOString() : null,
          purchase_rd_success: rdSuccess,
        })
        .in("id", updatedIntentIds);

      if (auditError) {
        console.error(`[${requestId}] ❌ Erro ao registrar auditoria RD:`, auditError);
      } else {
        console.log(`[${requestId}] ✅ Auditoria RD registrada`);
      }
    }

    const result = { 
      success: true, 
      request_id: requestId,
      message: "Webhook processado com sucesso",
      email: normalizedEmail,
      product,
      intent_found: intentFound,
      intents_updated: updatedIntentIds.length,
      rd_purchase_sent: rdSuccess,
      transaction_id: transactionId,
    };

    console.log(`[${requestId}] ✅ WEBHOOK PROCESSADO COM SUCESSO:`, result);
    console.log(`========== [${requestId}] FIM ==========\n`);

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error(`[${requestId}] ❌ Erro interno:`, error);
    console.log(`========== [${requestId}] FIM COM ERRO ==========\n`);
    return new Response(
      JSON.stringify({ error: "Erro interno do servidor", request_id: requestId }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
