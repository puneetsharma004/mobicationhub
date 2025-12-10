"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const videoTestimonials = [
  {
    url: "https://www.youtube.com/embed/xxxxx",
    name: "Rahul Sharma",
  },
  {
    url: "https://www.youtube.com/embed/yyyyy",
    name: "Vikas Singh",
  },
];

const reviews = [
  {
    name: "Aman Gupta",
    image: "/images/students/student1.jpg",
    review:
      "The best institute for mobile repair. Pramod Sir teaches with real examples and practical training.",
  },
  {
    name: "Sahil Khan",
    image: "/images/students/student2.jpg",
    review:
      "Because of this course I opened my own shop. Highly recommended for career growth!",
  },
  {
    name: "Ritu Yadav",
    image: "/images/students/student3.jpg",
    review:
      "Very easy to understand and hands-on learning. The offline batch was amazing.",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full py-20 md:py-28 bg-[#f7fdf9]">
      <div className="max-w-7xl mx-auto px-4">

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-secondary text-center">
          What Our Students Have to Say
        </h2>

        {/* Video Testimonials */}
        <div className="mt-12">
          <Carousel className="w-full max-w-3xl mx-auto">
            <CarouselContent>
              {videoTestimonials.map((item, i) => (
                <CarouselItem key={i}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="rounded-xl overflow-hidden shadow-lg"
                  >
                    <iframe
                      className="w-full h-64 md:h-80 rounded-xl"
                      src={item.url}
                      title={item.name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Review Cards Slider */}
        <div className="mt-16">
          <Carousel className="w-full">
            <CarouselContent>
              {reviews.map((review, i) => (
                <CarouselItem key={i} className="md:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={review.image}
                        alt={review.name}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                      <h4 className="text-lg font-semibold text-secondary">
                        {review.name}
                      </h4>
                    </div>

                    <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                      “{review.review}”
                    </p>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

      </div>
    </section>
  );
}
