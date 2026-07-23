import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const MAX_NAME = 80;
const MAX_PHONE = 30;
const MAX_MESSAGE = 1000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function stripDangerous(str: string): string {
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "");
}

function sanitize(input: string, maxLen: number): string {
  if (typeof input !== "string") return "";
  return escapeHtml(stripDangerous(input.trim().slice(0, maxLen)));
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "الطريقة غير مسموحة" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    if (!supabaseUrl || !serviceRoleKey) {
      return new Response(JSON.stringify({ error: "خطأ في إعداد الخادم" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const forwarded = req.headers.get("x-forwarded-for");
    const clientIp = forwarded ? forwarded.split(",")[0].trim() : "unknown";

    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();

    const { count, error: countError } = await supabase
      .from("rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("identifier", clientIp)
      .eq("form_type", "contact")
      .gte("created_at", windowStart);

    if (countError) {
      return new Response(JSON.stringify({ error: "خطأ في التحقق من المعدل" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if ((count ?? 0) >= RATE_LIMIT_MAX) {
      return new Response(
        JSON.stringify({ error: "يرجى الانتظار دقيقة قبل إرسال رسالة أخرى" }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = await req.json();

    const name = sanitize(body.name, MAX_NAME);
    const phone = sanitize(body.phone, MAX_PHONE);
    const message = sanitize(body.message, MAX_MESSAGE);

    const errors: string[] = [];
    if (!name || name.length < 2) errors.push("الاسم غير صحيح");
    if (!phone || !/^\d{7,15}$/.test(phone.replace(/[\s\-()+]/g, ""))) errors.push("رقم الهاتف غير صحيح");
    if (!message || message.length < 5) errors.push("الرسالة قصيرة جداً");

    if (errors.length > 0) {
      return new Response(JSON.stringify({ error: errors[0] }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await supabase.from("rate_limits").insert({
      identifier: clientIp,
      form_type: "contact",
    });

    const { error: insertError } = await supabase.from("contact_messages").insert({
      name,
      phone,
      message,
    });

    if (insertError) {
      return new Response(JSON.stringify({ error: "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const cutoff = new Date(Date.now() - RATE_LIMIT_WINDOW_MS * 10).toISOString();
    await supabase.from("rate_limits").delete().lt("created_at", cutoff);

    return new Response(
      JSON.stringify({ success: true, message: "تم إرسال رسالتك بنجاح" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (_err) {
    return new Response(
      JSON.stringify({ error: "حدث خطأ غير متوقع في الخادم" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
