"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, insta } from "lucide-react";
import { FaInstagram, FaFacebookF, FaWhatsapp, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#052B23] text-gray-300 pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">

        {/* COLUMN 1 – Logo + Vision */}
        <div>
          <Image
            src="/Footer-Logo.png" 
            alt="Mobication Hub Logo"
            width={180}
            height={80}
            className="mb-4"
          />

          <p className="text-gray-400 leading-relaxed mb-6">
            Our vision is to cultivate skilled smartphone & laptop repair
            technicians, who are committed to delivering quality service.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {[
              { icon: <FaYoutube size={18} />, link: "#" },
              { icon: <FaInstagram size={18} />, link: "#" },
              { icon: <FaFacebookF size={18} />, link: "#" },
              { icon: <FaWhatsapp size={18} />, link: "#" },
            ].map((item, i) => (
              <Link
                href={item.link}
                key={i}
                className="bg-primary p-3 rounded-md hover:bg-primary/90 transition"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* COLUMN 2 – Quicklinks */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quicklinks</h3>
          <ul className="space-y-2 text-gray-300">
            {[
              ["About Us", "/about"],
              ["Shop", "/shop"],
              ["Academy", "/academy"],
              ["Students", "/students"],
              ["Download", "/download"],
              ["Contact", "/contact"],
            ].map(([label, link]) => (
              <li key={label} className="flex items-center gap-2">
                <span className="text-primary">›</span>
                <Link href={link} className="hover:text-primary transition">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 3 – Help & Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Help & Support</h3>
          <ul className="space-y-2 text-gray-300">
            {[
              ["Privacy Policy", "/privacy-policy"],
              ["Terms of Use", "/terms"],
              ["Refund & Returns Policy", "/refund-policy"],
              ["Disclaimer", "/disclaimer"],
              ["Shipping Policy", "/shipping-policy"],
              ["Sitemap", "/sitemap"],
            ].map(([label, link]) => (
              <li key={label} className="flex items-center gap-2">
                <span className="text-primary">›</span>
                <Link href={link} className="hover:text-primary transition">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 4 – Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Info</h3>

          <div className="space-y-4 text-gray-300 text-sm">

            <p className="flex items-start gap-3">
              <MapPin size={18} className="text-primary mt-1" />
              Mobication Hub, 49 Near Kasturi Bagh, Ravindra Nagar A,  
              Jagatpura Jaipur, Rajasthan 302017
            </p>

            <p className="flex items-center gap-3 border-t border-gray-700 pt-4">
              <Phone size={18} className="text-primary" />
              <a href="tel:+919509959090" className="hover:text-primary">
                +91 95099 959090
              </a>
            </p>

            <p className="flex items-center gap-3 border-t border-gray-700 pt-4">
              <Mail size={18} className="text-primary" />
              <a href="mailto:contact@mobicationhub.com" className="hover:text-primary">
                contact@mobicationhub.com
              </a>
            </p>

          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-400 text-sm">
        © Copyright 2025. All rights reserved.{" "}
        <Link href="/" className="text-primary hover:underline">
          Mobication Hub.
        </Link>
      </div>
    </footer>
  );
}
