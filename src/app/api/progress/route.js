// app/api/progress/route.js

import { supabaseAdmin } from "@/lib/supabase";


export async function POST(req) {
  const { user_id, course_id, chapter_id, watched_seconds, mark_complete } = await req.json();

  if (!user_id || !chapter_id || !course_id) {
    return new Response(JSON.stringify({ error: 'Missing params' }), { status: 400 });
  }

  // upsert progress
  const { data, error } = await supabaseAdmin
    .from('user_progress')
    .upsert({
      user_id,
      course_id,
      chapter_id,
      watched_seconds,
      is_completed: !!mark_complete,
      completed_at: mark_complete ? new Date().toISOString() : null,
      updated_at: new Date().toISOString()
    }, { onConflict: ['user_id', 'chapter_id'] })
    .select('*')
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  // If mark_complete true, compute course completion
  if (mark_complete) {
    // Count chapters and completed chapters
    const { data: counts, error: cErr } = await supabaseAdmin
      .rpc('get_course_completion_status', { p_user_id: user_id, p_course_id: course_id });

    // We'll assume a Postgres function or you can run two queries to compare counts
    // Fallback: query counts directly (shown below)
  }

  return new Response(JSON.stringify({ ok: true, progress: data }), { status: 200 });
}
