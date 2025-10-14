import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const NewsSection=()=>{
    const newsRef=useRef<HTMLDivElement>(null)
    const scrollContainerRef=useRef<HTMLDivElement>(null)
    
}