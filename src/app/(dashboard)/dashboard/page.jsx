import { supabaseAdmin } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerSupabase } from "@/lib/supabaseServer";

export default async function DashboardHome() {
  // MUST await because cookies() is async in Next.js 16
  const supabase = await createServerSupabase();

  // AUTH: get real logged in user
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) return notFound();

  const user = session.user;

  // 1️⃣ Fetch user's enrolled courses
  const { data: enrollments = [], error: enrollErr } = await supabaseAdmin
    .from("user_enrollments")
    .select("*, courses(*)")
    .eq("user_id", user.id)
    .order("enrolled_at", { ascending: false });

  if (enrollErr) console.error(enrollErr);

  // Handle ZERO enrollments gracefully (prevents map crash)
  if (!Array.isArray(enrollments) || enrollments.length === 0) {
    return (
      <div className="min-h-screen p-6 bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-10">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">You are not enrolled in any course yet.</p>
        </div>
      </div>
    );
  }

  // 2️⃣ For each enrollment, fetch completed chapter count + total chapter count
  const coursesWithProgress = await Promise.all(
    enrollments.map(async (enroll) => {
      const courseId = enroll.course_id;

      // Total chapters
      const { count: totalChapters } = await supabaseAdmin
        .from("chapters")
        .select("*", { count: "exact", head: true })
        .eq("course_id", courseId);

      // Completed chapters
      const { count: completedChapters } = await supabaseAdmin
        .from("user_progress")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("course_id", courseId)
        .eq("is_completed", true);

      // FIRST CHAPTER
      const { data: firstChapter } = await supabaseAdmin
        .from("chapters")
        .select("id")
        .eq("course_id", courseId)
        .order("position", { ascending: true })
        .limit(1)
        .single();

      const progress = totalChapters
        ? Math.round((completedChapters / totalChapters) * 100)
        : 0;

      return {
        ...enroll,
        progress,
        completedChapters,
        totalChapters,
        firstChapterId: firstChapter?.id || "",
      };
    })
  );

  // Separate "Continue Learning" and "Completed"
  const continueLearning = coursesWithProgress.filter((c) => c.progress < 100);
  const completedCourses = coursesWithProgress.filter((c) => c.progress === 100);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        {/* CONTINUE LEARNING */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Continue Learning</h2>

          {continueLearning.length === 0 ? (
            <p className="text-gray-500">No active courses yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {continueLearning.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-lg shadow border"
                >
                  <h3 className="text-lg font-medium mb-1">
                    {item.courses.title}
                  </h3>

                  <p className="text-gray-600 mb-3">
                    {item.completedChapters}/{item.totalChapters} chapters
                    completed
                  </p>

                  <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>

                  <Link
                    href={`/course/${item.courses.slug}/learn/${item.firstChapterId}`}
                    className="text-blue-600 underline text-sm"
                  >
                    Continue →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* COMPLETED COURSES */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Completed Courses</h2>

          {completedCourses.length === 0 ? (
            <p className="text-gray-500">No completed courses yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {completedCourses.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-lg shadow border"
                >
                  <h3 className="text-lg font-medium mb-2">
                    {item.courses.title}
                  </h3>

                  <p className="text-green-700 font-semibold mb-3">
                    Completed 100%
                  </p>

                  <Link
                    href={`/dashboard/certificates`}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
                  >
                    View Certificate
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
