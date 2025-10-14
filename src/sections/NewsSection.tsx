import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useNews } from "../hooks/useNews";
import { Button } from "../components/button";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRight, ChevronRightIcon } from "lucide-react";
import { Card, CardContent } from "../components/card";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export const NewsSection = () => {
  const newsRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { data } = useNews();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(newsRef.current?.querySelectorAll(".news-card") || [], {
        scrollTrigger: {
          trigger: newsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        x: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });
    });
    return () => ctx.revert();
  }, []);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <div
      id="news"
      ref={newsRef}
      className="flex flex-col w-full item-start justify-center gap-14 px-[150px] py-0"
    >
      <div className="flex items-center justify-between w-full">
        <h2 className="font-extrabold text-dark-blue-gray text-[44px] text-center tracking-[0] leading-[52.8px] [font-family:'Plus_Jakarta_Sans',Helvetica] whitespace-nowrap">
          TÄZELIKLER
        </h2>
        <div className="inline-flex items-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            className="h-auto p-2 bg-lighter-gray rounded-lg hover:bg-light-gray"
            onClick={scrollLeft}
          >
            <ChevronLeftIcon className="w-6 h-6 " />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-auto p-2 bg-dark-blue-gray rounded-lg hover:bg-dark-blue-gray/90"
            onClick={scrollRight}
          >
            <ChevronRightIcon  className="w-6 h-6 text-white"/>
          </Button>
        </div>
      </div>

      {/* Container */}

      <div
        ref={scrollContainerRef}
        className="flex items-center gap-10 w-full overflow-x-auto scrollbar-hide"
      >
        {data?.map((item, index) => (
          <Card
            key={index}
            className="news-card flex-shrink-0 w-[600px] border-[#d6dce6]"
          >
            <CardContent className="flex items-center gap-6 p-4">
              <div className="w-[250px] h-[250px] bg-[#dddddd] rounded-lg flex-shrink-0"/>
                <div className="flex flex-col items-start gap-4 flex-1">
                  <h3 className="font-h5-semib font-[number:var(--h5-semib-font-weight)] text-dark-blue-gray text-[length:var(--h5-semib-font-size)] tracking-[var(--h5-semib-letter-spacing)] leading-[var(--h5-semib-line-height)] [font-style:var(--h5-semib-font-style)]">
                    {item.title}
                  </h3>
                  <div className="flex flex-col items-start justify-between flex-1 w-full">
                    <p className="text-dark-blue-gray text-[length:var(--big-font-size)] tracking-[var(--big-letter-spacing)] leading-[var(--big-line-height)] font-big font-[number:var(--big-font-weight)] [font-style:var(--big-font-style)]">
                        {item.description}
                    </p>
                     <div className="inline-flex items-center gap-2 px-0 py-2">
                        <Link to={`/news/${item.id}`} className="inline-flex items-center gap-2">
                        <span className="font-semibold text-[#293447]  whitespace-nowrap">
                            Doly
                        </span>
                        <ArrowRightIcon className="w-6 h-6"/>
                        </Link>

                     </div>
                  </div>
                </div>
            
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
