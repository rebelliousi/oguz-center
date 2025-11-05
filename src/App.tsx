import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import { HeroSection } from "./sections/HeroSection"
import { AllNewsPage } from "./sections/AllNews"

// Lazy load sections
const NewsSection = lazy(() => import("./sections/NewsSection").then(m => ({ default: m.NewsSection })))
const AboutInfoSection = lazy(() => import("./sections/AboutInfoSection").then(m => ({ default: m.AboutInfoSection })))
const CDIOSection = lazy(() => import("./sections/CDIOSection").then(m => ({ default: m.CDIOSection })))
const DepartmentSection = lazy(() => import("./sections/DepartmentSection").then(m => ({ default: m.DepartmentSection })))
const PartnersSection = lazy(() => import("./sections/CompaniesSection").then(m => ({ default: m.PartnersSection })))
const ContactSection = lazy(() => import("./sections/ContactSection").then(m => ({ default: m.ContactSection })))
const FooterSection = lazy(() => import("./sections/FooterSection").then(m => ({ default: m.FooterSection })))
const NewsDetailPage = lazy(() => import("./sections/NewsDetail").then(m => ({ default: m.NewsDetailPage })))

// Loading fallback component
const SectionLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

// all Suspense is wrapped for HomePage loader
const HomePage = () => (
  <Suspense fallback={<SectionLoader />}>
    <div className="space-y-16 sm:space-y-12 md:space-y-24 lg:space-y-32">
      <HeroSection />
      <NewsSection />
      <AboutInfoSection />
      <CDIOSection />
      <DepartmentSection />
      <PartnersSection />
      <ContactSection />
      <FooterSection />
    </div>
  </Suspense>
);

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/news" element={<AllNewsPage />} />
      <Route 
        path="/news/:id" 
        element={
          <Suspense fallback={<SectionLoader />}>
            <NewsDetailPage />
          </Suspense>
        } 
      />
    </Routes>
  );
}