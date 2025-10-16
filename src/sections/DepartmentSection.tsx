import gsap from "gsap";
import _ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useDepartments } from "../hooks/useDepartments";
import { Card, CardContent } from "../components/card";
import { useTranslation } from "react-i18next";

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

      {/* Departments Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-[150px] py-0 w-full">
        {data?.map((dept, index) => (
          <Card 
            key={index} 
            className="department-card border-[1.5px] border-[#d6dce6] hover:shadow-lg transition-shadow duration-300 h-full"
          >
            <CardContent className="flex flex-col items-start gap-4 sm:gap-5 md:gap-6 lg:gap-7 p-4 sm:p-5 md:p-6 h-full">
              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12">
                <img 
                  className="w-full h-full object-contain" 
                  src={dept.icon} 
                  alt={dept.name} 
                />
              </div>

              {/* Content */}
              <div className="flex flex-col items-start gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full flex-1">
                <h3 className="font-semibold text-dark-blue-gray text-lg sm:text-xl md:text-2xl lg:text-[length:var(--h3-semib-font-size)] tracking-tight leading-tight [font-family:'Plus_Jakarta_Sans',Helvetica]">
                  {dept.name}
                </h3>
                <p className="text-medium-new-gray text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl tracking-tight leading-relaxed [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal">
                  {dept.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};