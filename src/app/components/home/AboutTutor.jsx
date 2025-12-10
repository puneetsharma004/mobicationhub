"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutTutor() {
  return (
    <section className="w-full bg-gradient-to-br from-white to-[#f2fff7] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT — IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <Image
            src="/images/pramod-saini.jpg" // replace with actual tutor image
            alt="Pramod Saini"
            width={450}
            height={550}
            className="rounded-xl shadow-lg object-cover hover:scale-[1.02] transition duration-300"
          />
        </motion.div>

        {/* RIGHT — CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-primary font-semibold mb-2">
            About Tutor
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">
            Hi, I’m Pramod Saini
          </h2>

          <p className="text-slate-600 text-sm leading-relaxed mt-6">
            A mobile and laptop repair expert with over 15 years of experience. While I specialize in Apple products like iPhones, I also repair all kinds of Smartphones & Laptop, including MacBook.
            <br /><br />
            My journey began in a small town, where limited resources and a financially struggling family taught me the true meaning of hard work. From the very beginning, I was determined to change the lives of young people like me — to make sure others wouldn't have to face the same difficulties.
            <br /><br />
            That’s why I started a training center, offering high-quality repair education at very nominal fees. Today, through my online and offline platforms, I’ve had the privilege of teaching repair skills to lakhs of students across the country.
            <br /><br />
            What began as a struggle has now become my purpose. Repairing isn’t just my profession — it’s my passion, my mission. If you’re looking to start your career in this powerful and growing field, I’m here to help you every step of the way. Let’s build your future — together.  
          </p>

          {/* STATS */}
          {/* <div className="mt-10 space-y-3">
            <p className="text-secondary text-lg flex items-center gap-2">
              <span className="text-primary font-bold text-2xl">•</span>
              15+ Years Experience
            </p>

            <p className="text-secondary text-lg flex items-center gap-2">
              <span className="text-primary font-bold text-2xl">•</span>
              1,00,000+ Students Trained
            </p>

            <p className="text-secondary text-lg flex items-center gap-2">
              <span className="text-primary font-bold text-2xl">•</span>
              Expert in Apple & Smartphone Repair
            </p> */}
          {/* </div> */}
        </motion.div>

      </div>
    </section>
  );
}
