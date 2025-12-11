// app/api/check-completion/route.js

import generateCertificatePdf from '@/lib/generateCertificatePdf';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req) {
  const { user_id, course_id } = await req.json();
  if (!user_id || !course_id) return new Response('Missing', { status: 400 });

  // count total chapters
  const { data: chapters, error: chErr } = await supabaseAdmin
    .from('chapters')
    .select('id', { count: 'exact' })
    .eq('course_id', course_id);

  const totalChapters = chapters.length;

  // count user's completed chapters
  const { data: completed, error: compErr } = await supabaseAdmin
    .from('user_progress')
    .select('id', { count: 'exact' })
    .eq('course_id', course_id)
    .eq('user_id', user_id)
    .eq('is_completed', true);

  const completedCount = completed.length;

  if (completedCount >= totalChapters && totalChapters > 0) {
    // set enrollment completed
    await supabaseAdmin
      .from('user_enrollments')
      .update({ completed: true, completed_at: new Date().toISOString() })
      .eq('user_id', user_id)
      .eq('course_id', course_id);

    // generate certificate PDF
    const certBuffer = await generateCertificatePdf({ user_id, course_id });
    const fileName = `${user_id}_${course_id}_${Date.now()}.pdf`;
    const { data: upload, error: uploadErr } = await supabaseAdmin.storage
      .from('certificates')
      .upload(fileName, certBuffer, { contentType: 'application/pdf' });

    const { publicURL } = supabaseAdmin.storage.from('certificates').getPublicUrl(upload.path);

    // create user_certificates row
    await supabaseAdmin
      .from('user_certificates')
      .insert({
        user_id,
        course_id,
        certificate_url: publicURL,
        certificate_uuid: crypto.randomUUID()
      });

    return new Response(JSON.stringify({ ok: true, certificate_url: publicURL }), { status: 200 });
  }

  return new Response(JSON.stringify({ ok: false, message: 'Not complete yet' }), { status: 200 });
}
