import gsap from "gsap";
import _ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useDepartments } from "../hooks/useDepartments";
import { Card, CardContent } from "../components/card";

gsap.registerPlugin(_ScrollTrigger);

export const DepartmentSection = () => {
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
      className="flex flex-col items-start gap-20 w-full"
    >
      <div className="flex flex-col w-full items-start gap-8 px-[150px] py-0">
        <h2 className="font-extrabold text-dark-blue-gray text-[44px] tracking-[0] leading-[52.8px] [font-family:'Plus_Jakarta_Sans',Helvetica]">
          BÖLÜMLER
        </h2>
        <p className="w-[1200px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-dark-blue-gray text-2xl tracking-[-0.48px] leading-[38.4px]">
          Oguzhan ylmy-tehnologiýalar merkezi öz içinde 16 sany bölümleri
          jemleýär. Olardan iň ululary:
        </p>
      </div>

      <div className="grid grid-cols-4 gap-10 px-[150px] py-0 w-full">
        {data?.map((dept,index)=>(
            <Card key={index} className="department-card border-[1.5px] border-[#d6dce6]">
                <CardContent className="flex flex-col items-start gap-7 p-6">
                    <img className='w-12 h-12' src={dept.icon} alt={dept.name} />
                    <div className="flex flex-col items-start gap-6 w-full">
                        <h3 className="font-h3-semib font-[number:var(--h3-semib-font-weight)] text-dark-blue-gray text-[length:var(--h3-semib-font-size)] tracking-[var:(--h3-semib-letter-spacing)] leading-[var(--h3-semib-line-height)] [font-style:var(--h3-semib-font-style)]">
                            {dept.name}
                        </h3>
                        <p className="text-medium-new-gray text-2xl tracking-[-0.48px] leading-[38.4px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal">
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
