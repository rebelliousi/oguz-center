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
        const gap = window.innerWidth < 640 ? 40 : window.innerWidth < 1024 ? 60 : 80;
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

        // Recalculate on window resize
        const handleResize = () => {
            animation.kill();
            const newGap = window.innerWidth < 640 ? 40 : window.innerWidth < 1024 ? 60 : 80;
            const newSingleLoopWidth = (itemWidth + newGap) * totalItems;
            
            gsap.set(slider, { x: -newSingleLoopWidth });
            gsap.to(slider, {
                x: -newSingleLoopWidth * 2,
                duration: totalItems * 4,
                ease: "none",
                repeat: -1,
                modifiers: {
                    x: (x) => {
                        const num = parseFloat(x);
                        return `${((num + newSingleLoopWidth) % newSingleLoopWidth) - newSingleLoopWidth}px`;
                    }
                }
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            animation.kill();
            window.removeEventListener('resize', handleResize);
        };
    }, [showSlider, data]);

    return (
        <div 
            ref={partnersRef} 
            className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12 lg:gap-[60px] px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-[150px] py-8 sm:py-10 md:py-12 lg:py-16 w-full"
        >
            {/* Title */}
            <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-medium-new-gray text-xl sm:text-2xl md:text-[28px] text-center tracking-tight leading-tight">
                {t('company')}
            </h2>

            {showSlider ? (
                // Infinite Slider Mode (> 4 companies)
                <div className="w-full overflow-hidden relative">
                    <div 
                        ref={sliderRef}
                        className="flex items-center gap-10 sm:gap-12 md:gap-16 lg:gap-20"
                        style={{ width: 'max-content' }}
                    >
                        {infiniteItems?.map((comp, index) => (
                            <div 
                                key={index} 
                                className="slider-item inline-flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 transition-all duration-300 hover:scale-105 flex-shrink-0"
                                style={{ width: '140px' }}
                            >
                                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[100px] lg:h-[100px] flex items-center justify-center">
                                    <img 
                                        src={comp.icon} 
                                        alt={comp.name} 
                                        className='object-contain w-full h-auto max-h-full'
                                    />
                                </div>
                                <p className="text-light-themegraydark-blue-grey text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center tracking-tight leading-tight [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold whitespace-nowrap">
                                    {comp.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                // Static Grid Mode (<= 4 companies)
                <div className="flex flex-wrap items-center justify-between w-full gap-y-8 sm:gap-y-10 md:gap-y-12">
                    {data?.map((comp, index) => (
                        <div 
                            key={index} 
                            className="inline-flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 transition-all duration-300 hover:scale-105"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[100px] lg:h-[100px] flex items-center justify-center">
                                <img 
                                    src={comp.icon} 
                                    alt={comp.name} 
                                    className='object-contain w-full h-auto max-h-full'
                                />
                            </div>
                            <p className="text-light-themegraydark-blue-grey text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center tracking-tight leading-tight [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold whitespace-nowrap">
                                {comp.name}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};