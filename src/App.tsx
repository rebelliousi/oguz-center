import { AboutInfoSection } from "./sections/AboutInfoSection"
import { CDIOSection } from "./sections/CDIOSection"
import { HeroSection } from "./sections/HeroSection"
import { NewsSection } from "./sections/NewsSection"

export const App =()=>{
  return(
  <div className="space-y-32">
    <HeroSection/>
    <NewsSection/>
    <AboutInfoSection/>
    <CDIOSection/>
  </div>
  )
}