import Link from "next/link";
import { notFound } from "next/navigation";
import CourseCard from "../CourseCard";
import { supabaseAdmin } from "@/lib/supabase";

import { createServerSupabase } from "@/lib/supabaseServer";

export const revalidate = 10; // adjust caching as needed

export default async function MyCoursesPage({ searchParams }) {
  // ----- 1) AUTH: get logged-in user server-side -----
  const supabase = await createServerSupabase(); // ✅ FIXED: MUST await

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) return notFound();

  const userId = session.user.id;

  // ----- 2) fetch enrollments + course basic info -----
  const { data: enrollments = [], error: enrollErr } = await supabaseAdmin
    .from("user_enrollments")
    .select("id, course_id, enrolled_at, completed, courses(*)")
    .eq("user_id", userId)
    .order("enrolled_at", { ascending: false });

  if (enrollErr) {
    console.error("enroll fetch error:", enrollErr);
  }

  // handle empty state early
  if (!enrollments || enrollments.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-3xl font-bold mb-4">My Courses</h1>
          <p className="text-gray-600 mb-6">You haven't enrolled in any courses yet.</p>
          <Link href="/course" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md">
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  // ----- 3) gather course IDs -----
  const courseIds = enrollments.map((e) => e.course_id);

  // ----- 4) fetch all chapters for these courses in one query -----
  const { data: chapters = [], error: chapErr } = await supabaseAdmin
    .from("chapters")
    .select("id, course_id, position")
    .in("course_id", courseIds)
    .order("position", { ascending: true });

  if (chapErr) console.error("chapters fetch error:", chapErr);

  // ----- 5) fetch user's completed progress rows -----
  const { data: progressRows = [], error: progressErr } = await supabaseAdmin
    .from("user_progress")
    .select("chapter_id, course_id, is_completed")
    .in("course_id", courseIds)
    .eq("user_id", userId)
    .eq("is_completed", true);

  if (progressErr) console.error("progress fetch error:", progressErr);

  // ----- 6) aggregate counts & resume chapter per course -----
  const chaptersByCourse = {};
  for (const ch of chapters) {
    chaptersByCourse[ch.course_id] ||= [];
    chaptersByCourse[ch.course_id].push(ch);
  }

  const completedSetByCourse = {};
  for (const p of progressRows) {
    completedSetByCourse[p.course_id] ||= new Set();
    completedSetByCourse[p.course_id].add(p.chapter_id);
  }

  const coursesWithMeta = enrollments.map((enroll) => {
    const course = enroll.courses;
    const allChs = chaptersByCourse[enroll.course_id] || [];
    const completedSet = completedSetByCourse[enroll.course_id] || new Set();

    const totalChapters = allChs.length;
    const completedChapters = completedSet.size;
    const progress = totalChapters ? Math.round((completedChapters / totalChapters) * 100) : 0;

    const resumeChapter = allChs.find((c) => !completedSet.has(c.id));
    const resumeChapterId = resumeChapter ? resumeChapter.id : (allChs[0]?.id ?? null);

    return {
      enrollmentId: enroll.id,
      course: course,
      enrolledAt: enroll.enrolled_at,
      completed: enroll.completed,
      totalChapters,
      completedChapters,
      progress,
      resumeChapterId,
    };
  });

  // Optional search/sort
  const q = (searchParams?.q || "").trim().toLowerCase();
  const sort = (searchParams?.sort || "recent");

  let filtered = coursesWithMeta;
  if (q) {
    filtered = filtered.filter((c) => (c.course.title || "").toLowerCase().includes(q));
  }

  if (sort === "progress") {
    filtered = filtered.sort((a, b) => b.progress - a.progress);
  } else {
    filtered = filtered.sort((a, b) => new Date(b.enrolledAt) - new Date(a.enrolledAt));
  }

  // ----- 7) Render -----
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Courses</h1>
            <p className="text-sm text-gray-500">Courses you're enrolled in and your progress.</p>
          </div>

          <form className="flex items-center gap-3" action="">
            <input
              name="q"
              defaultValue={searchParams?.q || ""}
              placeholder="Search my courses..."
              className="px-3 py-2 border rounded-md"
            />
            <select name="sort" defaultValue={sort} className="px-3 py-2 border rounded-md">
              <option value="recent">Newest</option>
              <option value="progress">Progress</option>
            </select>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Apply
            </button>
          </form>
        </header>

        <section>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <CourseCard
                key={item.enrollmentId}
                course={item.course}
                progress={item.progress}
                completed={item.completed}
                completedChapters={item.completedChapters}
                totalChapters={item.totalChapters}
                resumeHref={
                  item.resumeChapterId
                    ? `/course/${item.course.slug}/learn/${item.resumeChapterId}`
                    : `/course/${item.course.slug}`
                }
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
