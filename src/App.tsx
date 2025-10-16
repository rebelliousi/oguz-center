import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import { HeroSection } from "./sections/HeroSection"

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
  <div className="flex items-center justify-center py-20">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
)

const HomePage = () => (
  <div className="space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-32">
    <HeroSection/>
    <Suspense fallback={<SectionLoader />}>
      <NewsSection/>
    </Suspense>
    <Suspense fallback={<SectionLoader />}>
      <AboutInfoSection/>
    </Suspense>
    <Suspense fallback={<SectionLoader />}>
      <CDIOSection/>
    </Suspense>
    <Suspense fallback={<SectionLoader />}>
      <DepartmentSection/>
    </Suspense>
    <Suspense fallback={<SectionLoader />}>
      <PartnersSection/>
    </Suspense>
    <Suspense fallback={<SectionLoader />}>
      <ContactSection/>
    </Suspense>
    <Suspense fallback={<SectionLoader />}>
      <FooterSection/>
    </Suspense>
  </div>
)

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route 
        path="/news/:id" 
        element={
          <Suspense fallback={<SectionLoader />}>
            <NewsDetailPage />
          </Suspense>
        } 
      />
    </Routes>
  )
}