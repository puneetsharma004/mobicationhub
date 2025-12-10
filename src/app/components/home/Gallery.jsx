"use client";

import Image from "next/image";
import { useState } from "react";
import Marquee from "react-fast-marquee";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const galleryImages = [
  "/images/gallery1.jpg",
  "/images/gallery2.jpg",
  "/images/gallery3.jpg",
  "/images/gallery4.jpg",
  "/images/gallery5.jpg",
  "/images/gallery6.jpg",
  "/images/gallery7.jpg",
  "/images/gallery8.jpg",
  "/images/gallery9.jpg",
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Split images into two rows
  const row1Images = galleryImages.slice(0, Math.ceil(galleryImages.length / 2));
  const row2Images = galleryImages.slice(Math.ceil(galleryImages.length / 2));

  const handleImageClick = (img) => {
    setSelectedImage(img);
    setIsOpen(true);
  };

  return (
    <section className="w-full py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-3">
            Institute Gallery
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            Explore our state-of-the-art facilities and training environment
          </p>
        </motion.div>

        {/* MARQUEE GALLERY WITH FADE EDGES */}
        <div className="relative">
          
          {/* FADE OVERLAY LEFT */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />
          
          {/* FADE OVERLAY RIGHT */}
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />

          <div className="space-y-6">
            
            {/* ROW 1: LEFT TO RIGHT */}
            <Marquee
              speed={40}
              gradient={false}
              pauseOnHover={true}
              className="overflow-hidden"
            >
              {row1Images.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="mx-3 cursor-pointer group"
                  onClick={() => handleImageClick(img)}
                >
                  <div className="relative w-[280px] h-[200px] md:w-[350px] md:h-[240px] rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                    <Image
                      src={img}
                      alt={`Gallery ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* HOVER OVERLAY */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        Click to view
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </Marquee>

            {/* ROW 2: RIGHT TO LEFT */}
            <Marquee
              speed={40}
              gradient={false}
              direction="right"
              pauseOnHover={true}
              className="overflow-hidden"
            >
              {row2Images.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="mx-3 cursor-pointer group"
                  onClick={() => handleImageClick(img)}
                >
                  <div className="relative w-[280px] h-[200px] md:w-[350px] md:h-[240px] rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                    <Image
                      src={img}
                      alt={`Gallery ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* HOVER OVERLAY */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-semibsemibold text-lg">
                        Click to view
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </Marquee>
          </div>
        </div>

        {/* LIGHTBOX DIALOG */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-secondary/95 border-none">
            
            {/* CLOSE BUTTON */}
            <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors backdrop-blur-sm cursor-pointer">
              <X className="h-6 w-6 text-white " />
            </DialogClose>

            {/* IMAGE */}
            <div className="relative w-full h-[90vh] flex items-center justify-center p-8">
              {selectedImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={selectedImage}
                    alt="Gallery Preview"
                    fill
                    className="object-contain"
                    quality={100}
                  />
                </motion.div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
