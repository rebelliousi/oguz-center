import { AboutInfoSection } from "./sections/AboutInfoSection"
import { CDIOSection } from "./sections/CDIOSection"
import { ContactSection } from "./sections/ContactSection"
import { DepartmentSection } from "./sections/DepartmentSection"
import { FooterSection } from "./sections/FooterSection"
import { HeroSection } from "./sections/HeroSection"
import { NewsSection } from "./sections/NewsSection"
import { PartnersSection } from "./sections/PartnersSection"

export const App =()=>{
  return(
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
}