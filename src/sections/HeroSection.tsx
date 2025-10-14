import gsap from "gsap";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger)

const navigationItems=[
    {label:'Biz barada',targetId:'biz-barada'},
    {label:'Bölümler',targetId:'bolumler'},
    {label:'Habarlaşmak',targetId:'habarlasmak'}
]
export const HeroSection=()=>{
    const heroRef=useRef<HTMLDivElement>(null)

    useEffect(()=>{
        if(heroRef.current){
            gsap.fromTo(
                heroRef.current,
                {opacity:0,y:50},
                {opacity:1,
                 y:0,
                 duration:1.2,
                 ease:'power3.out',
                 scrollTrigger:{
                    trigger:heroRef.current,
                    start:'top 80%',
                    toggleActions:'play none none none'
                 }
                }
            )
        }
    },[])


const scrollToContact=()=>{
    const contactSection=document.getElementById('habarlasmak');
    contactSection?.scrollIntoView({behavior:'smooth'})

}

return(
    <section id="hero" className="relative flex items-center justify-center w-full h-screen overflow-hidden ">
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
            

        </div>
        
    </section>
)

}