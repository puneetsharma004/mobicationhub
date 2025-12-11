// /app/page.jsx

import AboutTutor from "../components/home/AboutTutor";
import CtaHelpDesk from "../components/home/CtaHelpDesk";
import Gallery from "../components/home/Gallery";
import Hero from "../components/home/Hero";
import OfflineCourses from "../components/home/OfflineCourses";
import OnlineCourses from "../components/home/OnlineCourses";
import RecentPosts from "../components/home/RecentPosts";
import Testimonials from "../components/home/Testimonials";


export default function HomePage() {
  return (
    <main className="w-full max-w-[1615px] mx-auto  min-h-screen bg-white overflow-x-hidden">

      {/* HERO SECTION */}
      <Hero />

      {/* ABOUT TUTOR */}
      <AboutTutor />

      {/* OFFLINE COURSES */}
      <OfflineCourses />

      {/* ONLINE COURSES */}
      <OnlineCourses />

      {/* GALLERY */}
      <Gallery />

      {/* NEWS & UPDATES */}
      <RecentPosts />

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* CTA / HELP DESK */}
      <CtaHelpDesk />

    </main>
  );
}
