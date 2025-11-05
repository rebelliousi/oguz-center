import gsap from "gsap";
import _ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useDepartments } from "../hooks/useDepartments";
import { Card, CardContent } from "../components/card";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

gsap.registerPlugin(_ScrollTrigger);

export const DepartmentSection = () => {
  const { t } = useTranslation();
  const departmentRef = useRef<HTMLDivElement>(null);
  const { data } = useDepartments();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(
        departmentRef.current?.querySelectorAll(".department-card") || [],
        {
          scrollTrigger: {
            trigger: departmentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    });
    return () => ctx.revert();
  }, [data]);

  // Mobile Department Card Component
  const MobileDepartmentCard = ({ dept, index, total }: { dept: any, index: number, total: number }) => {
    const externalUrl =
      index === total - 2 ? "http://34.133.253.73/" :
      index === total - 1 ? "http://34.135.242.155/" : null;

    const handleClick = () => {
      if (externalUrl) window.open(externalUrl, "_blank");
    };

    // Button cursor for external links
    return (
      <Card 
        className={`department-card border-[1.5px] border-[#d6dce6] hover:shadow-lg transition-shadow duration-300 w-[320px] h-[206px] ${externalUrl ? "cursor-pointer" : ""}`}
        onClick={handleClick}
      >
        <CardContent className="flex flex-col items-start gap-3 p-4 h-full">
          {/* Icon */}
          <div className="flex items-center justify-center w-10 h-10">
            <img 
              className="w-full h-full object-contain" 
              src={dept.icon} 
              alt={dept.name} 
            />
          </div>

          {/* Content */}
          <div className="flex flex-col items-start gap-2 w-full flex-1 overflow-hidden">
            <h3 className="font-semibold text-dark-blue-gray text-base tracking-tight leading-tight [font-family:'Plus_Jakarta_Sans',Helvetica] line-clamp-2">
              {dept.name}
            </h3>
            <p className="text-medium-new-gray text-sm tracking-tight leading-relaxed [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal line-clamp-3">
              {dept.description}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Desktop Department Card Component
  const DesktopDepartmentCard = ({ dept, index, total }: { dept: any, index: number, total: number }) => {
    const externalUrl =
      index === total - 2 ? "http://34.133.253.73/" :
      index === total - 1 ? "http://34.135.242.155/" : null;

    const handleClick = () => {
      if (externalUrl) window.open(externalUrl, "_blank");
    };

    return (
      <Card 
        className={`department-card border-[1.5px] border-[#d6dce6] hover:shadow-lg transition-shadow duration-300 h-full ${externalUrl ? "cursor-pointer" : ""}`}
        onClick={handleClick}
      >
        <CardContent className="flex flex-col items-start gap-7 p-6 h-full">
          {/* Icon */}
          <div className="flex items-center justify-center w-12 h-12">
            <img 
              className="w-full h-full object-contain" 
              src={dept.icon} 
              alt={dept.name} 
            />
          </div>

          {/* Content */}
          <div className="flex flex-col items-start gap-6 w-full flex-1">
            <h3 className="font-semibold text-dark-blue-gray text-2xl lg:text-[length:var(--h3-semib-font-size)] tracking-tight leading-tight [font-family:'Plus_Jakarta_Sans',Helvetica]">
              {dept.name}
            </h3>
            <p className="text-medium-new-gray text-xl xl:text-2xl tracking-tight leading-relaxed [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal">
              {dept.description}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div
      id="bolumler"
      ref={departmentRef}
      className="flex flex-col items-start gap-10 sm:gap-12 md:gap-16 lg:gap-20 w-full"
    >
      {/* Header Section */}
      <div className="flex flex-col w-full items-start gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-[150px] py-0">
        <h2 className="font-extrabold text-dark-blue-gray text-2xl sm:text-3xl md:text-4xl lg:text-[44px] tracking-tight leading-tight [font-family:'Plus_Jakarta_Sans',Helvetica]">
          {t('navigation.departments')}
        </h2>
        <p className="w-full max-w-full lg:max-w-[1000px] xl:max-w-[1200px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-dark-blue-gray text-base sm:text-lg md:text-xl lg:text-2xl tracking-tight leading-relaxed">
          {t('departmentText')}
        </p>
      </div>

      {/* Mobile Swiper (< lg) - With Peek Effect */}
      <div className="lg:hidden w-full px-4">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView="auto"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          speed={800}
          className="department-swiper"
        >
          {data?.map((dept, index) => (
            <SwiperSlide key={index} style={{ width: 'auto' }}>
              <MobileDepartmentCard dept={dept} index={index} total={data.length} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop Grid (>= lg) */}
      <div className="hidden lg:grid grid-cols-3 xl:grid-cols-4 gap-10 px-20 xl:px-32 2xl:px-[150px] py-0 w-full">
        {data?.map((dept, index) => (
          <DesktopDepartmentCard key={index} dept={dept} index={index} total={data.length} />
        ))}
      </div>
    </div>
  );
};