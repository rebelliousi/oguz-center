import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useCDIO, type CDIOType } from "../hooks/useCDIO";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export const CDIOSection = () => {
  const { t } = useTranslation();
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
    <div 
      ref={cdioRef} 
      className="flex flex-col items-start gap-10 sm:gap-12 md:gap-16 lg:gap-20 w-full"
    >
      {/* Header Section */}
      <div className="flex flex-col w-full items-start gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-[150px] py-0">
        <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-extrabold text-dark-blue-gray text-2xl sm:text-3xl md:text-[32px] tracking-tight leading-tight">
          CDIO
        </h2>
        <p className="w-full max-w-full lg:max-w-[1000px] xl:max-w-[1200px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-dark-blue-gray text-base sm:text-lg md:text-xl lg:text-2xl tracking-tight leading-relaxed">
          {t('cdio')}
        </p>
      </div>

      {/* CDIO Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 2xl:gap-[100px] px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-[150px] py-0 w-full">
        {data?.map((step: CDIOType, index: number) => (
          <div
            key={index}
            className="cdio-step flex flex-col items-start gap-4 sm:gap-5 md:gap-6 lg:gap-7"
          >
            {/* Icon */}
            <div className="w-full aspect-square max-w-[300px] mx-auto sm:mx-0">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={step.icon}
                alt={step.name}
              />
            </div>

            {/* Content */}
            <div className="flex flex-col items-start gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full">
              <div className="inline-flex flex-col items-start gap-2">
                <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-dark-blue-gray text-xl sm:text-2xl md:text-[28px] lg:text-[32px] tracking-tight leading-tight">
                  {step.name}
                </h3>
              </div>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-dark-blue-gray text-sm sm:text-base md:text-lg lg:text-xl tracking-tight leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};