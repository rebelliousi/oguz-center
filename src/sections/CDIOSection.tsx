import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useCDIO, type CDIOType } from "../hooks/useCDIO";

gsap.registerPlugin(ScrollTrigger);

export const CDIOSection = () => {
  const cdioRef = useRef<HTMLDivElement>(null);
  const { data } = useCDIO();
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cdioRef.current?.querySelectorAll(".cdio-step") || [], {
        scrollTrigger: {
          trigger: cdioRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, [data]);

  return (
    <div ref={cdioRef} className="flex flex-col items-start gap-20 w-full">
      <div className="flex  flex-col w-full items-start gap-8 px-[150px] py-0">
        <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-extrabold text-dark-blue-gray text-[32px] tracking-[0] leading-[38.4px]">
          CDIO
        </h2>
        <p className="w-[1200px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-dark-blue-gray text-2xl tracking-[-0.48px] leading-[38.4px]">
          Taslamalaryň üstünlik gazanmagy üçin diňe ideýa ýetmez. Olar
          bitewilikde işlenmeli, tertipleşdirilmeli we ädimme-ädim durmuşa
          geçirilmeli. Şu maksat bilen Oguz han Innowasiýa Merkezi CDIO usulyny
          ulanýar.
        </p>
      </div>

      <div className="grid  grid-cols-4 gap-[100px] px-[150px] py-0 w-full">
        {data?.map((step: CDIOType, index: number) => (
          <div
            key={index}
            className="cdio-step flex flex-col items-start gap-7"
          >
            <img
              className="w-[300px] h-[300px] object-cover"
              src={step.icon}
              alt={step.name}
            />
            <div className="flex flex-col items-start gap-6 w-full">
              <div className="inline-flex flex-col items-start gap-2">
                <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-dark-blue-gray text-[32px] tracking-[-0.64px] leading-[51.2px] whitespace-nowrap">
                  {step.name}
                </h3>
              </div>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-dark-blue-gray text-xl tracking-[-0.40px] leading-8">
              {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
