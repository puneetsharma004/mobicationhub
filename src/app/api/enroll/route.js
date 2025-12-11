// app/api/enroll/route.js

import { supabaseAdmin } from "@/lib/supabase";


export async function POST(req) {
  const { user_id, course_id } = await req.json();

  if (!user_id || !course_id) {
    return new Response(JSON.stringify({ error: 'Missing params' }), { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('user_enrollments')
    .upsert({ user_id, course_id }, { onConflict: ['user_id', 'course_id'] })
    .select('*')
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  return new Response(JSON.stringify({ ok: true, enrollment: data }), { status: 200 });
}
