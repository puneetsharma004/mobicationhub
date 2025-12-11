import { supabaseAdmin } from "@/lib/supabaseClient";
import VideoPlayer from "@/components/course/VideoPlayer";
import CourseSidebar from "@/components/course/CourseSidebar";
import { notFound } from "next/navigation";
import { createServerSupabase } from "@/lib/supabaseServer";

// --- Bunny Signing Helper ---
function generateSignedBunnyUrl({ videoId }) {
  const baseUrl = process.env.BUNNY_VIDEO_BASE_URL;
  const token = process.env.BUNNY_VIDEO_SECURE_TOKEN;

  return `${baseUrl}/${videoId}/play?token=${token}`;
}

// ---------- MAIN PAGE ----------
export default async function LearnPage({ params }) {
  // MUST await in Next.js 16
  const supabase = await createServerSupabase();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) return notFound();

  const userId = session.user.id; // <-- REAL USER

  const { slug, chapterId } = params;

  // 1. Fetch course + chapters
  const { data: course, error: courseErr } = await supabaseAdmin
    .from("courses")
    .select("*, chapters(*)")
    .eq("slug", slug)
    .maybeSingle();

  if (!course || courseErr) return notFound();

  // 2. Fetch all chapters for sidebar
  const { data: chapters, error: chapErr } = await supabaseAdmin
    .from("chapters")
    .select("*")
    .eq("course_id", course.id)
    .order("position", { ascending: true });

  if (!chapters || chapErr) return notFound();

  // 3. Find current chapter
  const currentChapter = chapters.find((ch) => String(ch.id) === String(chapterId));

  if (!currentChapter) return notFound();

  // 4. Signed Bunny URL
  const signedVideoUrl = generateSignedBunnyUrl({
    videoId: currentChapter.bunny_video_id,
  });

  // ---- PAGE UI (unchanged) ----
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <CourseSidebar
        chapters={chapters}
        courseTitle={course.title}
        currentChapterId={chapterId}
        courseSlug={slug}
      />

      {/* Main Player Area */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-2">{currentChapter.title}</h1>

        <VideoPlayer
          userId={userId}
          courseId={course.id}
          chapterId={currentChapter.id}
          videoUrl={signedVideoUrl}
        />
      </div>
    </div>
  );
}
