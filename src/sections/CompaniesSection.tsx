import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useCompanies } from "../hooks/useCompanies";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export const PartnersSection = () => {
    const partnersRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const { data } = useCompanies();
    const { t } = useTranslation();

    const showSlider = data && data.length > 4;
    

    const infiniteItems = showSlider ? [...data, ...data, ...data] : data;

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(partnersRef.current, {
                scrollTrigger: {
                    trigger: partnersRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (!showSlider || !sliderRef.current || !data) return;

        const slider = sliderRef.current;
        const totalItems = data.length;
        
        
        const itemElement = slider.querySelector('.slider-item') as HTMLElement;
        if (!itemElement) return;
        
        const itemWidth = itemElement.offsetWidth;
        const gap = 80; 
        const singleLoopWidth = (itemWidth + gap) * totalItems;

        gsap.set(slider, { x: -singleLoopWidth });

      
        const animation = gsap.to(slider, {
            x: -singleLoopWidth * 2,
            duration: totalItems * 4,
            ease: "none",
            repeat: -1,
            modifiers: {
                x: (x) => {
                    const num = parseFloat(x);
                    return `${((num + singleLoopWidth) % singleLoopWidth) - singleLoopWidth}px`;
                }
            }
        });

        return () => {
            animation.kill();
        };
    }, [showSlider, data]);

    return (
        <div ref={partnersRef} className="flex flex-col items-center gap-[60px] px-4 md:px-[150px] py-0 w-full">
            <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-medium-new-gray text-[28px] text-center tracking-[-0.56px] leading-[33.6px] whitespace-nowrap">
                {t('company')}
            </h2>

            {showSlider ? (
                <div className="w-full overflow-hidden relative">
                    <div 
                        ref={sliderRef}
                        className="flex items-center gap-20"
                        style={{ width: 'max-content' }}
                    >
                        {infiniteItems?.map((comp, index) => (
                            <div 
                                key={index} 
                                className="slider-item inline-flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:scale-105 flex-shrink-0"
                                style={{ width: '200px' }}
                            >
                                <div className="w-[100px] h-[100px] flex items-center justify-center">
                                    <img 
                                        src={comp.icon} 
                                        alt={comp.name} 
                                        className='object-contain w-full h-auto'
                                    />
                                </div>
                                <p className="text-light-themegraydark-blue-grey text-2xl text-center tracking-[-0.48px] leading-[28.8px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold whitespace-nowrap">
                                    {comp.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-between w-full">
                    {data?.map((comp, index) => (
                        <div key={index} className="inline-flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:scale-105">
                            <div className="w-[100px] h-[100px] flex items-center justify-center">
                                <img 
                                    src={comp.icon} 
                                    alt={comp.name} 
                                    className='object-contain w-full h-auto'
                                />
                            </div>
                            <p className="text-light-themegraydark-blue-grey text-2xl text-center tracking-[-0.48px] leading-[28.8px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold whitespace-nowrap">
                                {comp.name}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};