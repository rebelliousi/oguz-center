import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger)

export const AboutInfoSection=()=>{
    const aboutInfoRef=useRef<HTMLDivElement>(null)
    const successRef=useRef<HTMLDivElement>(null)
    const [isVideoPlaying,setIsVideoPlaying]=useState(false)

    const {data}=
}