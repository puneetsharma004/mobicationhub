"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const blogPosts = [
  {
    title: "How to Start a Career in Mobile Repair",
    excerpt:
      "A complete roadmap for beginners who want to enter the booming smartphone repair industry...",
    image: "/images/blog1.webp",
    link: "/blog/mobile-repair-career",
  },
  {
    title: "Top Tools Every Technician Needs",
    excerpt:
      "If you're planning to work professionally, here are the essential tools you must have...",
    image: "/images/blog2.jpg",
    link: "/blog/technician-essential-tools",
  },
  {
    title: "iPhone Board Repair — Beginner Guide",
    excerpt:
      "Understanding the basics of board-level repair is the first step to becoming a true expert...",
    image: "/images/blog3.jpg",
    link: "/blog/iphone-board-repair-guide",
  },
];

export default function RecentPosts() {
  return (
    <section className="w-full py-20 md:py-28 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto px-4">

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-secondary text-center">
          Recent Posts
        </h2>

        {/* Grid */}
        <div className="grid gap-10 mt-12 md:grid-cols-3">
          {blogPosts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition"
            >
              {/* Image */}
              <div className="relative w-full h-44">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <h3 className="font-semibold text-lg text-secondary">
                  {post.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {post.excerpt}
                </p>

                <Link href={post.link}>
                  <Button
                    variant="outline"
                    className="mt-2 text-secondary border-secondary"
                  >
                    Read More
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
