import Link from "next/link";

export default function CourseSidebar({
  chapters,
  courseTitle,
  currentChapterId,
  courseSlug,
}) {
  return (
    <aside className="w-[280px] bg-white border-r p-4">
      <h2 className="text-xl font-semibold mb-4">{courseTitle}</h2>

      <nav className="space-y-2">
        {chapters.map((chapter) => (
          <Link
            key={chapter.id}
            href={`/course/${courseSlug}/learn/${chapter.id}`}
            className={`block p-2 rounded-md ${
              chapter.id === currentChapterId
                ? "bg-blue-100 text-blue-800 font-medium"
                : "hover:bg-gray-100"
            }`}
          >
            {chapter.position}. {chapter.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
