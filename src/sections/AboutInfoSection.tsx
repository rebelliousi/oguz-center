import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { useAbout, type AboutType } from "../hooks/useAbout";
import { Button } from "../components/button";
import { PlayIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const AboutInfoSection = () => {
  const aboutInfoRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const { data } = useAbout();

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

  const about: AboutType | undefined = data?.[0];

  return (
    <div
      id="biz-barada"
      className="flex flex-col items-start  gap-[100px] w-full"
    >
      <div
        ref={aboutInfoRef}
        className="flex w-full items-center justify-center gap-[100px] px-[150px] py-[52px] bg-lightest-blue"
      >
        <div className="flex flex-col items-start gap-8 flex-1">
          <h2 className="font-extrabold text-dark-blue-gray text-[44px] text-center tracking-[0] leading-[52.8px] [font-family:'Plus_Jakarta_Sans',Helvetica] whitespace-nowrap">
            {about?.title}
          </h2>
          <p className="[font-family:'Plus_Jakarta_Sans',Helvetica]  font-normal text-dark-blue-gray text-2xl tracking-[-0.48px] leading-[38.4px]">
             Türkmenistanda innowasion nano-, bio-, maglumat, kiberhowupsuzlyk,
            sanly we akylly tehnologiýalar, emeli aň we maglumat-kommunikasiýa,
            kibersport, elektron enjamlaryň tehnologiýalary, kompýuter we mobil
            programmalary döretmek we satmak, ylmyň, önümçiliginiň, senagatyň we
            işewürligiň ileri tutulýan ugurlaryny sanly ykdysadyýetiň kömegi
            bilen ösdürmek boýunça ýöriteleşdirilen ylmy-önümçilik edarasy
          </p>


        </div>
        <div className="relative w-[622px] h-[350px] bg-[#d5d5d5] rounded-lg overflow-hidden flex items-center justify-center">
            {!isVideoPlaying ? (
                <div className="relative w-full h-full">
                    <img src="" alt="thumbnail"  className="w-full h-full object-cover rounded-lg"/>
                    <Button
                    variant='ghost'
                    size='icon'
                    className="absolute inset-0 m-auto w-16 h-16 bg-gray-white rounded-full hover:bg-gray-white/90"
                    onClick={()=>setIsVideoPlaying(true)}>
                        <PlayIcon className="w-8 h-8"/>

                    </Button>
                </div>
            ): (
                <video
                src={about?.video}
                controls
                autoPlay
                className="w-full h-full object-cover rounded-lg"/>
            )}

        </div>
      </div>

      <div ref={successRef}
      className="flex w-full items-center justify-center gap-[150px] px-[150px] py-0">
       <div className="flex flex-col items-start gap-8 flex-1">
        <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-extrabold text-dark-blue-gray text-[32px] tracking-[0] leading-[48px]">
          TASLAMADA ÜSTÜNLIK <br />
            GAZANMAGYŇ SYRY BIZDE
        </h2>
        <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-dark-blue-gray text-2xl tracking-[-0.48px] leading-[38.4px]">
            Oguz han Innowasiýa Merkezinde biz ideýalary hakykata öwürýäris.
            Toparymyz üstünliklere eýe bolan, ýokary tejribeli hünärmenlerden
            ybarat. Olaryň çuňňur bilimleri we tejribeleri taslamaňy
            ugrukdyrmakda hem-de maksatlaryna ýetmekde möhüm ähmiýete eýedir.
            Programmadan başlap, önüme ýa-da batyrgaý täze pikire çenli biz
            ideýalaryňy durmuşa geçirmek üçin zerur gurallary, serişdeleri we
            goldawy üpjün edýäris.
        </p>

       </div>
       <img src="" alt="asset" className="w-[644.28px] h-[378.13px]"  />
      </div>
    </div>
  );
};
