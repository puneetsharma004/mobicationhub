"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const onlineCourses = [
  {
    title: "iPhone Complete Software Course",
    trainer: "Pramod Saini",
    category: "Smartphone Repair",
    price: "₹9,990.00",
    duration: "12 Hours",
    rating: "4.8",
    students: "1.2k",
    image: "/images/Android-iPhone-Repairing-Complete-Course-768x432.jpg",
    link: "/courses/iphone-software",
  },
  {
    title: "iPhone Complete Software Course",
    trainer: "Pramod Saini",
    category: "Smartphone Repair",
    price: "₹9,990.00",
    duration: "12 Hours",
    rating: "4.8",
    students: "1.2k",
    image: "/images/Android-iPhone-Repairing-Complete-Course-768x432.jpg",
    link: "/courses/iphone-software",
  },
  {
    title: "iPhone Complete Software Course",
    trainer: "Pramod Saini",
    category: "Smartphone Repair",
    price: "₹9,990.00",
    duration: "12 Hours",
    rating: "4.8",
    students: "1.2k",
    image: "/images/Android-iPhone-Repairing-Complete-Course-768x432.jpg",
    link: "/courses/iphone-software",
  },
  {
    title: "iPhone Complete Software Course",
    trainer: "Pramod Saini",
    category: "Smartphone Repair",
    price: "₹9,990.00",
    duration: "12 Hours",
    rating: "4.8",
    students: "1.2k",
    image: "/images/Android-iPhone-Repairing-Complete-Course-768x432.jpg",
    link: "/courses/iphone-software",
  },
  {
    title: "iPhone Complete Software Course",
    trainer: "Pramod Saini",
    category: "Smartphone Repair",
    price: "₹9,990.00",
    duration: "12 Hours",
    rating: "4.8",
    students: "1.2k",
    image: "/images/Android-iPhone-Repairing-Complete-Course-768x432.jpg",
    link: "/courses/iphone-software",
  },
  // ... rest of your courses
];

export default function OnlineCourses() {
  return (
    <section className="w-full py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                Popular Recorded Courses
              </h2>
              <p className="text-slate-600 text-base md:text-lg">
                Master your skills with expert-led training programs
              </p>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              href="/courses" 
              className="text-primary font-medium hover:underline inline-flex items-center gap-2 mt-4 md:mt-0"
            >
              View All Courses
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

        {/* CAROUSEL */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}

          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {onlineCourses.map((course, i) => (
              <CarouselItem 
                key={i} 
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group h-full"
                >
                  <Link href={course.link}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 group-hover:-translate-y-2 h-full flex flex-col">
                      
                      {/* IMAGE WITH OVERLAY */}
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* GRADIENT OVERLAY */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                        
                        {/* CATEGORY BADGE */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-white/95 text-primary backdrop-blur-sm shadow-lg">
                            {course.category}
                          </span>
                        </div>
                        
                        {/* RATING BADGE */}
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500 text-white backdrop-blur-sm shadow-lg">
                            <Star size={12} fill="white" />
                            {course.rating}
                          </span>
                        </div>
                      </div>

                      {/* CONTENT */}
                      <div className="p-6 space-y-4 flex-1 flex flex-col">
                        
                        {/* TITLE */}
                        <h3 className="font-bold text-lg text-secondary leading-tight line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>

                        {/* TRAINER */}
                        <p className="text-sm text-slate-600 flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white text-xs font-semibold">
                            {course.trainer.split(' ').map(n => n[0]).join('')}
                          </span>
                          {course.trainer}
                        </p>

                        {/* META INFO */}
                        <div className="flex items-center justify-between text-sm text-slate-500 pt-2 border-t border-slate-100">
                          <span className="flex items-center gap-1.5">
                            <Clock size={14} className="text-primary" />
                            {course.duration}
                          </span>
                          <span className="text-xs">
                            {course.students} students
                          </span>
                        </div>

                        {/* PRICE & CTA */}
                        <div className="flex items-center justify-between pt-3 mt-auto">
                          <div>
                            <p className="text-2xl font-bold text-primary">
                              {course.price}
                            </p>
                          </div>
                          
                          <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white font-medium text-sm group-hover:bg-primary/90 transition-colors cursor-pointer"
                            whileHover="hover"
                            initial="initial"
                            whileTap={{ scale: 0.95 }}
                          >
                            Enroll
                            <motion.span
                              variants={{
                                initial: { x: 0 },
                                hover: { x: 4 }
                              }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <ArrowRight size={16} />
                            </motion.span>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* NAVIGATION ARROWS */}
          <CarouselPrevious className="hidden md:flex -left-4 bg-white shadow-lg border-slate-200" />
          <CarouselNext className="hidden md:flex -right-4 bg-white shadow-lg border-slate-200" />
        </Carousel>
      </div>
    </section>
  );
}
