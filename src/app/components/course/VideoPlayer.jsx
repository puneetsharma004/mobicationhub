"use client";

import React, { useRef, useEffect, useState } from "react";

export default function VideoPlayer({ userId, courseId, chapterId, videoUrl }) {
  const videoRef = useRef(null);
  const [watchedSeconds, setWatchedSeconds] = useState(0);
  const [completed, setCompleted] = useState(false);

  const updateProgress = async (seconds, markComplete = false) => {
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          course_id: courseId,
          chapter_id: chapterId,
          watched_seconds: Math.floor(seconds),
          mark_complete: markComplete,
        }),
      });

      if (markComplete) {
        await fetch("/api/check-completion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId, course_id: courseId }),
        });
      }
    } catch (err) {
      console.error("progress error:", err);
    }
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onTimeUpdate = () => {
      setWatchedSeconds(v.currentTime);

      if (Math.floor(v.currentTime) % 10 === 0) {
        updateProgress(v.currentTime, false);
      }
    };

    const onPause = () => updateProgress(v.currentTime, false);

    const onEnded = () => {
      setCompleted(true);
      updateProgress(v.duration, true);
    };

    v.addEventListener("timeupdate", onTimeUpdate);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnded);

    return () => {
      v.removeEventListener("timeupdate", onTimeUpdate);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  const manualMarkComplete = () => {
    setCompleted(true);
    updateProgress(watchedSeconds, true);
  };

  return (
    <div>
      <video
        ref={videoRef}
        controls
        src={videoUrl}
        className="rounded-lg w-full"
      />

      <button
        onClick={manualMarkComplete}
        disabled={completed}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-40"
      >
        {completed ? "Completed" : "Mark as Completed"}
      </button>
    </div>
  );
}
