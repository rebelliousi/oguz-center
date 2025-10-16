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
      className="flex flex-col items-start gap-10 lg:gap-24 xl:gap-[100px] w-full"
    >
      {/* About Section with Video */}
      <div
        ref={aboutInfoRef}
        className="w-full flex flex-col items-center justify-center gap-10 lg:flex-row lg:items-center lg:gap-16 xl:gap-[100px] px-4 lg:px-20 xl:px-32 2xl:px-[150px] py-[52px] bg-lightest-blue"
      >
        {/* Text Content */}
        <div className="flex flex-col items-start gap-7 w-full lg:flex-1 lg:max-w-none">
          <h2 className="w-fit font-extrabold text-dark-blue-gray text-xl lg:text-4xl xl:text-[44px] tracking-tight leading-tight [font-family:'Plus_Jakarta_Sans',Helvetica]">
            {about?.title}
          </h2>
          <p className="w-full [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-dark-blue-gray text-sm lg:text-xl xl:text-2xl tracking-tight leading-relaxed">
            {t('aboutText')}
          </p>
        </div>

        {/* Video Player */}
        <div className="relative w-full lg:max-w-none lg:w-[500px] xl:w-[622px] h-[201px] lg:h-[350px] bg-[#d5d5d5] rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
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
                className="absolute inset-0 m-auto w-12 h-12 lg:w-16 lg:h-16 bg-gray-white rounded-full hover:bg-gray-white/90 transition-all duration-200 hover:scale-110"
                onClick={() => setIsVideoPlaying(true)}
                aria-label="Play video"
              >
                <PlayIcon className="w-6 h-6 lg:w-8 lg:h-8" />
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
        className="w-full flex flex-col items-center justify-center gap-10 lg:flex-row lg:items-center lg:gap-16 xl:gap-[150px] px-4 lg:px-20 xl:px-32 2xl:px-[150px] py-0"
      >
        {/* Text Content */}
        <div className="flex flex-col items-start gap-7 w-full lg:flex-1 lg:order-1 lg:max-w-none">
          <h2 
            className="w-full [font-family:'Plus_Jakarta_Sans',Helvetica] font-extrabold text-dark-blue-gray text-xl lg:text-[32px] tracking-tight leading-tight"
            dangerouslySetInnerHTML={{ __html: t('tagline') }}
          />
          
          <p className="w-full [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-dark-blue-gray text-sm lg:text-xl xl:text-2xl tracking-tight leading-relaxed">
            {t('projectText')}
          </p>
        </div>

        {/* Image */}
        <div className="w-full lg:w-auto flex items-center justify-center lg:order-2">
          <img 
            src={img} 
            alt="Success illustration" 
            className="w-full h-auto lg:max-w-[600px] xl:w-[644.28px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};