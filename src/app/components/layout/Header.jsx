"use client"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { Menu, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import MobileNav from "./MobileNav"
import Image from "next/image"

// DROPDOWN LINK DATA
const utilityLinks = [
  ["Panic Log Analyzer", "/utility/panic-log-analyzer"],
  ["Download", "/utility/download"],
]

const galleryLinks = [
  ["Institute Gallery", "/gallery/institute"],
  ["Students Gallery", "/gallery/students"],
]

// Dropdown inside header file
// Replace your current DropdownMenu component with this:
function DropdownMenu({ label, items }) {
  return (
    <NavigationMenu> {/* Add this wrapper */}
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-xs md:text-sm font-normal hover:bg-transparent hover:text-primary">
            {label}
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="w-48 p-3 flex flex-col gap-2">
              {items.map(([title, href]) => (
                <li key={title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={href}
                      className="block text-sm text-foreground hover:text-white transition-colors"
                    >
                      {title}
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}



export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Detect on scroll for blur + shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-sm shadow-sm"
          : "bg-background/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/">
          <Image
            src="/Headerlogo.png"
            alt="Mobication Hub Logo"
            width={110}
            height={40}
          />
        </Link>

        {/* NAVIGATION MENU (FULL DESKTOP NAV) */}
        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex items-center gap-2 text-xs md:text-xs font-normal text-foreground">

            {/* Home */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* About Us */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Academy */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/academy" className="hover:text-white transition-colors">
                  Academy
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Shop */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Shop
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* UTILITY DROPDOWN */}
            <DropdownMenu label="Utility" items={utilityLinks} />

            {/* GALLERY DROPDOWN */}
            <DropdownMenu label="Gallery" items={galleryLinks} />

            {/* Blog */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Contact */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* RIGHT ACTION BUTTONS */}
        <div className="hidden md:flex items-center gap-4">

          {/* Cart */}
          <Link href="/cart" className="text-foreground hover:text-primary transition-colors">
            <ShoppingCart className="w-5 h-5" />
          </Link>

          {/* Login */}
          <Link href="/login">
            <Button className="border-1 border-primary bg-white text-primary rounded-sm px-4 py-1 h-auto text-sm hover:bg-accent/10 cursor-pointer">
              Log In
            </Button>
          </Link>

          {/* Sign Up */}
          <Link href="/signup">
            <Button className="bg-primary text-primary-foreground rounded-sm px-4 py-1 h-auto text-sm hover:bg-accent cursor-pointer">
              Sign up
            </Button>
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* MOBILE NAV */}
      <MobileNav open={open} setOpen={setOpen} />
    </header>
  )
}
