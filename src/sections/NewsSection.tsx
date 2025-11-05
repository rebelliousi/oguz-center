import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useNews } from "../hooks/useNews";
import { Button } from "../components/button";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Card, CardContent } from "../components/card";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export const NewsSection = () => {
  const { t } = useTranslation();
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
  }, [data]);

  const scrollLeft = () => {
    const scrollAmount = window.innerWidth < 640 ? -300 : window.innerWidth < 1024 ? -350 : -400;
    scrollContainerRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    const scrollAmount = window.innerWidth < 640 ? 300 : window.innerWidth < 1024 ? 350 : 400;
    scrollContainerRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div
      id="news"
      ref={newsRef}
      className="flex flex-col w-full items-start justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-14 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-[150px] md:py-12 lg:py-16"
    >
      {/* Header Section */}
      <div className="flex items-center justify-between w-full gap-4">
        <h2 className="font-extrabold text-dark-blue-gray text-2xl sm:text-3xl md:text-4xl lg:text-[44px] tracking-tight leading-tight [font-family:'Plus_Jakarta_Sans',Helvetica]">
          {t('navigation.news')}
        </h2>
        <Link to="/news">
          <Button className="font-semibold text-sm bg-transparent border-2 border-dark-blue-gray text-dark-blue-gray hover:bg-dark-blue-gray hover:text-white transition-all duration-300 rounded-md px-4 py-2 ml-1">
            {t('all_news') || "TÄZELIKLERIŇ ÄHLISI"}
          </Button>
        </Link>
      </div>

      {/* News Cards Container with scroll buttons in right-bottom */}
      <div className="relative w-full pb-16">
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {data?.map((item, index) => (
            <Card
              key={index}
              className="news-card flex-shrink-0 w-[280px] sm:w-[450px] md:w-[500px] lg:w-[550px] xl:w-[600px] border-[#d6dce6] shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-3 sm:p-5 md:p-6 h-full">
                {/* IMAGE OR EMOJI + BLUE GRADIENT */}
                <div className="w-full sm:w-[180px] md:w-[220px] lg:w-[250px] h-[240px] sm:h-[180px] md:h-[220px] lg:h-[250px] rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <span className="text-6xl">📰</span>
                    </div>
                  )}
                </div>
                {/* Content */}
                <div className="flex flex-col items-start gap-3 sm:gap-4 flex-1 w-full">
                  <h3 className="font-semibold text-dark-blue-gray text-base sm:text-xl md:text-2xl lg:text-[length:var(--h5-semib-font-size)] tracking-tight leading-tight line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex flex-col items-start justify-between flex-1 w-full gap-2 sm:gap-3">
                    <p className="text-dark-blue-gray text-sm sm:text-base md:text-lg lg:text-[length:var(--big-font-size)] tracking-normal leading-relaxed line-clamp-3 sm:line-clamp-4">
                      {item.description}
                    </p>
                    {/* DATE */}
                    {item.date && (
                      <span className="text-gray-500 text-xs sm:text-sm font-medium mb-1">
                        {item.date}
                      </span>
                    )}
                    {/* Read More Link */}
                    <div className="inline-flex items-center gap-2 py-2 mt-auto">
                      <Link 
                        to={`/news/${item.id}`} 
                        className="inline-flex items-center gap-2 group transition-all duration-200 hover:gap-3"
                      >
                        <span className="font-semibold text-[#293447] text-sm sm:text-base whitespace-nowrap group-hover:text-blue-600 transition-colors">
                          {t('full') || 'Dowamyny oka'}
                        </span>
                        <ArrowRightIcon className="w-4 h-4 sm:w-6 sm:h-6 group-hover:text-blue-600 transition-all" />
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Navigation buttons - much lower right (container's bottom) */}
        <div className="absolute right-6 bottom-4 z-10 inline-flex items-center gap-3 md:gap-4 lg:gap-6">
          <Button
            variant="ghost"
            size="icon"
            className="h-auto p-2 bg-lighter-gray rounded-lg hover:bg-light-gray transition-colors shadow-md"
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-auto p-2 bg-dark-blue-gray rounded-lg hover:bg-dark-blue-gray/90 transition-colors shadow-md"
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};