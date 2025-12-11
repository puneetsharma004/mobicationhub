import { supabaseAdmin } from "@/lib/supabaseClient";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const uuid = searchParams.get("uuid");

  if (!uuid) {
    return new Response(
      JSON.stringify({ ok: false, error: "UUID is required." }),
      { status: 400 }
    );
  }

  // Fetch certificate by UUID
  const { data, error } = await supabaseAdmin
    .from("user_certificates")
    .select(
      `
      id,
      user_id,
      course_id,
      certificate_url,
      certificate_uuid,
      issued_at,
      profiles(full_name),
      courses(title, slug)
    `
    )
    .eq("certificate_uuid", uuid)
    .maybeSingle();

  if (error || !data) {
    return new Response(
      JSON.stringify({ ok: false, error: "Invalid or unknown certificate UUID." }),
      { status: 404 }
    );
  }

  return new Response(
    JSON.stringify({
      ok: true,
      certificate: data,
    }),
    { status: 200 }
  );
}
