import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { useAbout, type AboutType } from "../hooks/useAbout";
import { Button } from "../components/button";
import { PlayIcon } from "lucide-react";
import img from '../../public/Asset 1.svg'
import { useTranslation } from "react-i18next";
import thumbnail from '../../public/thumbnail.png'

gsap.registerPlugin(ScrollTrigger);

export const AboutInfoSection = () => {
  const aboutInfoRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const { data } = useAbout();
  const { t } = useTranslation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(aboutInfoRef.current?.children || [], {
        scrollTrigger: {
          trigger: aboutInfoRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(successRef.current?.children || [], {
        scrollTrigger: {
          trigger: successRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);

  const about: AboutType | undefined = data?.[0];

  return (
    <div
      id="biz-barada"
      className="flex flex-col items-start gap-12 sm:gap-16 md:gap-20 lg:gap-24 xl:gap-[100px] w-full"
    >
      {/* About Section with Video */}
      <div
        ref={aboutInfoRef}
        className="flex flex-col lg:flex-row w-full items-center justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-[100px] px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-[150px] py-8 sm:py-10 md:py-12 lg:py-[52px] bg-lightest-blue"
      >
        {/* Text Content */}
        <div className="flex flex-col items-start gap-4 sm:gap-6 md:gap-8 flex-1 w-full">
          <h2 className="font-extrabold text-dark-blue-gray text-2xl sm:text-3xl md:text-4xl lg:text-[44px] tracking-tight leading-tight [font-family:'Plus_Jakarta_Sans',Helvetica]">
            {about?.title}
          </h2>
          <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-dark-blue-gray text-base sm:text-lg md:text-xl lg:text-2xl tracking-tight leading-relaxed">
            {t('aboutText')}
          </p>
        </div>

        {/* Video Player */}
        <div className="relative w-full lg:w-[500px] xl:w-[622px] h-[250px] sm:h-[300px] md:h-[320px] lg:h-[350px] bg-[#d5d5d5] rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
          {!isVideoPlaying ? (
            <div className="relative w-full h-full">
              <img 
                src={thumbnail} 
                alt="Video thumbnail"  
                className="w-full h-full object-cover rounded-lg"
              />
              <Button
                variant='ghost'
                size='icon'
                className="absolute inset-0 m-auto w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-white rounded-full hover:bg-gray-white/90 transition-all duration-200 hover:scale-110"
                onClick={() => setIsVideoPlaying(true)}
                aria-label="Play video"
              >
                <PlayIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              </Button>
            </div>
          ) : (
            <video
              src={about?.video}
              controls
              autoPlay
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </div>
      </div>

      {/* Success/Project Section */}
      <div 
        ref={successRef}
        className="flex flex-col lg:flex-row w-full items-center justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-[150px] px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-[150px] py-0"
      >
        {/* Text Content */}
        <div className="flex flex-col items-start gap-4 sm:gap-6 md:gap-8 flex-1 w-full order-2 lg:order-1">
          <h2 
            className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-extrabold text-dark-blue-gray text-xl sm:text-2xl md:text-3xl lg:text-[32px] tracking-tight leading-tight"
            dangerouslySetInnerHTML={{ __html: t('tagline') }}
          />
          
          <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-dark-blue-gray text-base sm:text-lg md:text-xl lg:text-2xl tracking-tight leading-relaxed">
            {t('projectText')}
          </p>
        </div>

        {/* Image */}
        <div className="w-full lg:w-auto flex items-center justify-center order-1 lg:order-2">
          <img 
            src={img} 
            alt="Success illustration" 
            className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[550px] lg:max-w-[600px] xl:w-[644.28px] h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};