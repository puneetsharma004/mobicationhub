This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


```
mobicationhub_web_app
├─ components.json
├─ eslint.config.mjs
├─ jsconfig.json
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ circuite-img3-1.svg
│  ├─ file.svg
│  ├─ Footer-Logo.png
│  ├─ globe.svg
│  ├─ Headerlogo.png
│  ├─ images
│  │  ├─ 01hexa-dm-shape.png
│  │  ├─ 50off-Mobile-Course.webp
│  │  ├─ Android-iPhone-Repairing-Complete-Course-768x432.jpg
│  │  ├─ Android2-768x432.jpg
│  │  ├─ blog1.webp
│  │  ├─ blog2.jpg
│  │  ├─ blog3.jpg
│  │  ├─ gallery1.jpg
│  │  ├─ gallery2.jpg
│  │  ├─ gallery3.jpg
│  │  ├─ gallery4.jpg
│  │  ├─ gallery5.jpg
│  │  ├─ gallery6.jpg
│  │  ├─ gallery7.jpg
│  │  ├─ gallery8.jpg
│  │  ├─ gallery9.jpg
│  │  ├─ iPhone-768x432.jpg
│  │  ├─ portfolio-img-3.jpg
│  │  ├─ pramod-saini.jpg
│  │  ├─ service-img-1.jpg
│  │  └─ students
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
└─ src
   ├─ app
   │  ├─ (auth)
   │  │  ├─ forgot-password
   │  │  │  └─ page.js
   │  │  ├─ login
   │  │  │  └─ page.js
   │  │  ├─ reset-password
   │  │  │  └─ page.js
   │  │  └─ signup
   │  │     └─ page.js
   │  ├─ (course)
   │  │  └─ [slug]
   │  │     ├─ learn
   │  │     │  └─ [chapterId]
   │  │     │     └─ page.jsx
   │  │     └─ page.jsx
   │  ├─ (dashboard)
   │  │  ├─ dashboard
   │  │  │  ├─ certificates
   │  │  │  │  └─ page.js
   │  │  │  ├─ CourseCard.jsx
   │  │  │  ├─ courses
   │  │  │  │  └─ page.js
   │  │  │  ├─ page.jsx
   │  │  │  └─ progress
   │  │  └─ layout.jsx
   │  ├─ (public)
   │  │  ├─ about
   │  │  │  └─ page.jsx
   │  │  ├─ academy
   │  │  │  └─ page.jsx
   │  │  ├─ blog
   │  │  ├─ help
   │  │  │  ├─ disclaimer
   │  │  │  ├─ privacy-policy
   │  │  │  ├─ refund-policy
   │  │  │  ├─ shipping-policy
   │  │  │  ├─ sitemap
   │  │  │  └─ terms-of-use
   │  │  ├─ layout.jsx
   │  │  ├─ page.jsx
   │  │  ├─ shop
   │  │  └─ utility
   │  │     ├─ gallery
   │  │     └─ tools
   │  ├─ api
   │  │  ├─ auth
   │  │  │  └─ callback
   │  │  │     └─ route.js
   │  │  ├─ check-completion
   │  │  │  └─ route.js
   │  │  ├─ enroll
   │  │  │  └─ route.js
   │  │  ├─ progress
   │  │  │  └─ route.js
   │  │  └─ verify
   │  │     └─ route.js
   │  ├─ components
   │  │  ├─ course
   │  │  │  ├─ CourseSidebar.jsx
   │  │  │  └─ VideoPlayer.jsx
   │  │  ├─ home
   │  │  │  ├─ AboutTutor.jsx
   │  │  │  ├─ CtaHelpDesk.jsx
   │  │  │  ├─ Gallery.jsx
   │  │  │  ├─ Hero.jsx
   │  │  │  ├─ OfflineCourses.jsx
   │  │  │  ├─ OnlineCourses.jsx
   │  │  │  ├─ RecentPosts.jsx
   │  │  │  └─ Testimonials.jsx
   │  │  └─ layout
   │  │     ├─ Footer.jsx
   │  │     ├─ Header.jsx
   │  │     └─ MobileNav.jsx
   │  ├─ styles
   │  │  └─ globals.css
   │  └─ verify
   │     └─ page.js
   ├─ components
   │  └─ ui
   │     ├─ button.jsx
   │     ├─ carousel.jsx
   │     ├─ dialog.jsx
   │     ├─ navigation-menu.jsx
   │     └─ sheet.jsx
   ├─ hooks
   │  ├─ useProgress.js
   │  └─ useUser.js
   └─ lib
      ├─ api.js
      ├─ auth.js
      ├─ certificates.js
      ├─ generateCertificatePdf.js
      ├─ progress.js
      ├─ supabase.js
      ├─ supabaseServer.js
      └─ utils.js

```