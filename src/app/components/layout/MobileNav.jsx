"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function MobileNav({ open, setOpen }) {
  const menu = [
    ["Home", "/"],
    ["About Us", "/about"],
    ["Academy", "/academy"],
    ["Shop", "/shop"],
    ["Utility", "/utility"],
    ["Gallery", "/gallery"],
    ["Blog", "/blog"],
    ["Contact", "/contact"],
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="left"
        className="bg-background w-72 px-5 py-6 shadow-xl"
      >
        {/* Header inside drawer */}
        <SheetHeader className="flex flex-row items-center justify-between mb-6">
          <SheetTitle>
            <Image 
              src="/Headerlogo.png" 
              alt="Mobication Hub" 
              width={110} 
              height={40} 
            />
          </SheetTitle>                                             
        </SheetHeader>

        {/* Menu Items with Animation */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex flex-col space-y-5"
        >
          {menu.map(([label, href], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: "easeOut",
              }}
            >
              <Link
                href={href}
                className="text-base font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
