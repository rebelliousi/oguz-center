import { AboutInfoSection } from "./sections/AboutInfoSection"
import { CDIOSection } from "./sections/CDIOSection"
import { ContactSection } from "./sections/ContactSection"
import { DepartmentSection } from "./sections/DepartmentSection"
import { FooterSection } from "./sections/FooterSection"
import { HeroSection } from "./sections/HeroSection"
import { NewsSection } from "./sections/NewsSection"
import { PartnersSection } from "./sections/CompaniesSection"
import { Routes, Route } from "react-router-dom"
import { NewsDetailPage } from "./sections/NewsDetail"

const HomePage = () => (
  <div className="space-y-32">
    <HeroSection/>
    <NewsSection/>
    <AboutInfoSection/>
    <CDIOSection/>
    <DepartmentSection/>
    <PartnersSection/>
    <ContactSection/>
    <FooterSection/>
  </div>
)

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/news/:id" element={<NewsDetailPage />} />
    </Routes>
  )
}