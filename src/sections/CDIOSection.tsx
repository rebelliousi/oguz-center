import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useCDIO, type CDIOType } from "../hooks/useCDIO";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';


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

  // Mobile Swiper Card Component
  const CDIOCard = ({ step }: { step: CDIOType }) => (
    <div className="cdio-step flex flex-col items-start gap-4">
      {/* Icon */}
      <div className="w-full aspect-square">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={step.icon}
          alt={step.name}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-start gap-3 w-full">
        <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-dark-blue-gray text-lg tracking-tight leading-tight">
          {step.name}
        </h3>
        <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-dark-blue-gray text-sm tracking-tight leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );

  return (
    <div 
      ref={cdioRef} 
      className="flex flex-col items-start gap-10 lg:gap-20 w-full"
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

      {/* Mobile Swiper (< lg) - Shows 2 cards, slides 1 by 1 */}
      <div className="lg:hidden w-full px-4">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={2}
          slidesPerGroup={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          speed={800}
          className="cdio-swiper"
        >
          {data?.map((step: CDIOType, index: number) => (
            <SwiperSlide key={index}>
              <CDIOCard step={step} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop Grid (>= lg) */}
      <div className="hidden lg:grid grid-cols-4 gap-16 xl:gap-20 2xl:gap-[100px] px-20 xl:px-32 2xl:px-[150px] py-0 w-full">
        {data?.map((step: CDIOType, index: number) => (
          <div
            key={index}
            className="cdio-step flex flex-col items-start gap-7"
          >
            {/* Icon */}
            <div className="w-full aspect-square max-w-[300px]">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={step.icon}
                alt={step.name}
              />
            </div>

            {/* Content */}
            <div className="flex flex-col items-start gap-6 w-full">
              <div className="inline-flex flex-col items-start gap-2">
                <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-dark-blue-gray text-[32px] tracking-tight leading-tight">
                  {step.name}
                </h3>
              </div>
              <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-dark-blue-gray text-xl tracking-tight leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};