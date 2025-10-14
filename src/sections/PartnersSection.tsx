import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import image1 from '../../public/halkbank.svg'
import image2 from '../../public/dsb.svg'
import image3 from '../../public/tstp.svg'
import image4 from '../../public/icon.svg'
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger)


const partners = [
  {
    logo: image4,
    name: "TITU",
    width: "w-20",
    height: "h-20",
  },
  {
    logo: image3,
    name: "TSTP Aşgabat şäher komiteti",
    width: "w-[100px]",
    height: "h-[98px]",
  },
  {
    logo: image2,
    name: "TDYIB",
    width: "w-[100px]",
    height: "h-[69px]",
  },
  {
    logo: image1,
    name: "Halkbank TPTB",
    width: "w-[100px]",
    height: "h-[57px]",
  },
];


export const PartnersSection=()=>{
    const partnersRef=useRef<HTMLDivElement>(null)

    useEffect(()=>{
     const ctx=gsap.context(()=>{
        gsap.from(partnersRef.current?.querySelectorAll('.partner-item') || [],{
        scrollTrigger:{
            trigger:partnersRef.current,
            start:'top 80%',
            toggleActions:'play none none reverse'
        },
        scale:0.8,
        opacity:0,
        duration:0.6,
        stagger:0.1,
        ease:'back.out(1.7)'
        })
     })
     return()=>ctx.revert()
    },[])

    return(
        <div ref={partnersRef} className="flex flex-col items-center gap-[60px] px-[150px] py-0 w-full">
            <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-medium-new-gray text-[28px] text-center tracking-[-0.56px] leading-[33.6px] whitespace-nowrap">
               HYZMATDAŞLAR
            </h2>

            <div className="flex items-center justify-between w-full">
                {partners.map((partner,index)=>(
                    <div key={index} className="partner-item inline-flex flex-col items-center justify-center gap-4">
                     <img src={partner.logo} alt={partner.name} className={`${partner.width} ${partner.height} object-cover`} />
                    <p className="text-light-themegraydark-blue-grey text-2xl text-center tracking-[-0.48px] leading-[28.8px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold whitespace-nowrap">
                        {partner.name}
                    </p>
                    </div>
                ))}

            </div>

        </div>
    )
}