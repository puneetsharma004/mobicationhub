"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CourseCard({
  course,
  progress = 0,
  completed = false,
  completedChapters = 0,
  totalChapters = 0,
  resumeHref = "#",
}) {
  // color bucket for progress
  const progressColor =
    progress >= 100 ? "bg-green-500" : progress >= 67 ? "bg-indigo-600" : progress >= 34 ? "bg-blue-600" : "bg-gray-400";

  return (
    <motion.article
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.18 }}
      className="bg-white rounded-lg p-4 shadow-sm border flex flex-col justify-between"
    >
      <div>
        <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-3 mb-3">
          {course.description || "No description provided."}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
          <div>{completedChapters}/{totalChapters} chapters</div>
          <div>{progress}%</div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-3">
          <div
            className={`${progressColor} h-3 rounded-full`}
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <Link href={`/course/${course.slug}`} className="text-sm text-gray-700 underline">
          Course Page
        </Link>

        <div className="flex gap-2">
          <Link href={resumeHref} className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm">
            Resume
          </Link>

          {completed && (
            <Link href="/dashboard/certificates" className="px-3 py-2 bg-green-600 text-white rounded-md text-sm">
              Certificate
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
