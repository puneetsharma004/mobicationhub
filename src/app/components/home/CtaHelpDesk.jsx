"use client";

import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CtaHelpDesk() {
  return (
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid md:grid-cols-2 gap-8 items-center">

          {/* LEFT COMPACT CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-100"
          >
            {/* Label */}
            <p className="text-primary font-medium text-sm mb-1">Help Desk</p>

            {/* Heading */}
            <h2 className="text-2xl md:text-3xl font-semibold text-secondary leading-snug mb-2">
              Book Your Seat for Upcoming Batch
            </h2>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm mb-6">
              Limited seats available. Contact us now to secure your spot.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">

              {/* CALL BUTTON */}
              <motion.a
                href="tel:+919509959090"
                whileHover="hover"
                whileTap={{ scale: 0.96 }}
                className="flex-1"
              >
                <Button className="w-full bg-primary text-white py-4 text-sm font-medium rounded-lg flex justify-center items-center gap-2">
                  <Phone size={18} />
                  Call Now
                  <motion.span
                    variants={{
                      hover: { x: 4 },
                    }}
                    transition={{ type: "spring", stiffness: 250 }}
                  >
                    <ArrowRight size={16} />
                  </motion.span>
                </Button>
              </motion.a>

              {/* WHATSAPP BUTTON */}
              <motion.a
                href="https://wa.me/919509959090"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="flex-1"
              >
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary py-4 text-sm font-medium rounded-lg flex justify-center items-center gap-2"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </Button>
              </motion.a>

            </div>

            {/* Small Address */}
            <div className="flex items-start gap-2 pt-4 border-t border-slate-200">
              <MapPin size={18} className="text-primary mt-0.5" />
              <div>
                <p className="font-medium text-secondary text-sm">Visit Our Institute</p>
                <p className="text-slate-600 text-xs leading-relaxed">
                  49, Kasturi Bagh, Jagatpura, Jaipur, Rajasthan 302029
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT MAP (compact) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-200 h-[260px] md:h-[340px]">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d455756.63227236643!2d75.839378!3d26.820904!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db18a4d5a1cc1%3A0xf16cf4af63c2eefa!2sMobication%20Hub!5e0!3m2!1sen!2sus!4v1765396416966!5m2!1sen!2sus" width="100%" height="100%" style={{border:0}} allowFullScreen="" title="Institute Location" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
