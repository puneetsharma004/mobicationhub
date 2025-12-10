"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const offlineCourses = [
  {
    title: "Android & iPhone 0 to Hero",
    trainer: "Pramod Saini",
    type: "Offline",
    price: "₹50,000",
    image: "/images/50off-Mobile-Course.webp",
    link: "/academy/android-iphone-basic-advance",
  },
  {
    title: "iPhone Advance Level",
    trainer: "Pramod Saini",
    type: "Offline",
    price: "₹36,000",
    image: "/images/service-img-1.jpg",
    link: "/academy/iphone-advance",
  },
  {
    title: "Laptop & MacBook Repair",
    trainer: "Pramod Saini",
    type: "Offline",
    price: "₹65,000",
    image: "/images/portfolio-img-3.jpg",
    link: "/academy/laptop-macbook-repair",
  },
];

export default function OfflineCourses() {
  return (
    <section className="w-full py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4">

        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-bold text-secondary text-center">
          Offline Training Batch
        </h2>

        {/* GRID */}
        <div className="grid gap-10 mt-12 md:grid-cols-3">
          {offlineCourses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border border-slate-200 rounded-xl overflow-hidden bg-white hover:shadow-xl hover:-translate-y-1 transition"
            >
              {/* IMAGE */}
              <div className="w-full h-48 relative">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold text-secondary">
                  {course.title}
                </h3>

                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-secondary">Trainer:</span> {course.trainer}
                </p>

                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-secondary">Type:</span> {course.type}
                </p>

                <p className="text-primary text-2xl font-bold">
                  {course.price}
                </p>
                <Link href={course.link}>
                  <motion.div
                    className="w-full mt-3 bg-primary text-white hover:bg-primary/90 cursor-pointer flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
                    whileHover="hover"
                    initial="initial"
                    whileTap={{ scale: 0.97 }}
                  >
                    Visit Course
                    
                    <motion.span
                      variants={{
                        initial: { x: 0 },
                        hover: { x: 6 }
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <ArrowRight size={18} />
                    </motion.span>
                  </motion.div>
                </Link>



              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
