"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
   <section className="relative w-full max-w-[1615px] overflow-hidden bg-gradient-to-br from-white to-[#f6fef9] py-10">

      {/* --- LAYER 1: SOFT BACK CIRCUIT --- */}
      <img
        src="/circuite-img3-1.svg"
        className="absolute inset-0 w-full h-full opacity-10 object-cover pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary leading-tight"
          >
            High-quality learning
            <br />
            made simple
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-lg text-slate-600 mt-6"
          >
            Learn Mobile & Laptop Repair from Industry Experts through  
            structured courses, hands-on training, and real workshop experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex gap-4 mt-8"
          >
            <Link href="/academy">
              <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-5 text-lg cursor-pointer">
                Explore Courses
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                variant="outline"
                className="border-primary text-primary px-6 py-5 text-lg hover:bg-primary/10 hover:text-primary cursor-pointer"
              >
                Join Offline Batch
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative w-[320px] md:w-[420px] lg:w-[480px] h-auto">
            <Image
              src="/images/01hexa-dm-shape.png"       // replace later
              alt="Mobication Hub Training"
              width={500}
              height={500}
              className="rounded-xl shadow-lg"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
