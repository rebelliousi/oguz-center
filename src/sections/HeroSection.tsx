import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import DotGrid from "../components/DotGrid";
import { Button } from "../components/button";
import { ChevronDownIcon } from "lucide-react";
import { Badge } from "../components/badge";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "../../public/logo 1.svg";
import i18n from "../i18n";

gsap.registerPlugin(ScrollTrigger);

const navigationItems = [
  { label: "Biz barada", targetId: "biz-barada" },
  { label: "Bölümler", targetId: "bolumler" },
  { label: "Habarlaşmak", targetId: "habarlasmak" },
];
export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const dropdownRef=useRef<HTMLDivElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const languages = [
    { code: "tm", label: "TM" },
    { code: "ru", label: "RU" },
    { code: "en", label: "EN" },
  ];
  useEffect(()=>{
    const handleClickOutside=(event:MouseEvent)=>{
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false)
    }
  }
    document.addEventListener('click',handleClickOutside)
    return()=>document.removeEventListener('click',handleClickOutside)
  },[])

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById("habarlasmak");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center w-full h-screen overflow-hidden "
    >
      {/* background */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#D1D5DB"
          activeColor="#0066ff"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
      {/* navbar */}
      <header className="flex w-full h-20 items-center justify-between px-10 md:px-28 fixed top-0 left-0 z-50 backdrop-blur-md bg-white/60 shadow-sm">
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-12 h-12" />
          <h1 className="text-2xl font-bold text-blue-700">TITU</h1>
        </div>

        <nav ref={dropdownRef} className="flex items-center gap-2">
          {navigationItems.map((item, i) => (
            <Button
              key={i}
              variant="ghost"
              onClick={() => {
                const section = document.getElementById(item.targetId);
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2 rounded-full text-md font-semibold transition-all duration-200 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
            >
              {item.label}
            </Button>
          ))}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-4 px-2 rounded-full text-gray-700 text-gray-700 hover:text-blue-600"
            >
              <div className="flex items-center gap-1 text-md">
                <span className="font-semibold uppercase">
                  {i18n.language.toUpperCase()}
                </span>
                <ChevronDownIcon className="w-5 h-5" />
              </div>
            </Button>

            {isDropdownOpen && (
              <div  id='lang-dropdown'className="absolute right-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      i18n.changeLanguage(lang.code);
                      setIsDropdownOpen(false);
                    }}
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 ${
                      i18n.language === lang.code
                        ? "font-bold  text-blue-600"
                        : ""
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </header>

      <div
        ref={heroRef}
        className="flex flex-col items-center space-y-6 justify-center text-center min-h-screen px-6 mt-20"
      >
        <div className="flex flex-col items-center gap-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-b from-sky-400 to-blue-600 bg-clip-text text-transparent">
            OGUZ HAN
          </h1>
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-800">
            YLMY-TEHNOLOGIÝALAR MERKEZI
          </h2>

          <Badge className="bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full border-none">
            <span className="text-gray-600 text-base md:text-lg font-semibold">
              Pikirleriň iş ýüzünde janlanýan ýeri
            </span>
          </Badge>
        </div>

        <Button
          onClick={scrollToContact}
          className="h-auto px-2 md:px-10 py-10 md:py-5 rounded-xl bg-[#0066FF]  hover:bg-[#0052CC]  shadow-lg"
        >
          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-extrabold text-gray-white text-lg md:text-xl lg:text-2xl text-center tracking-[0] leading-[28.8px] whitespace-nowrap">
            Ideýaňyzy paýlaşyň
          </span>
        </Button>
      </div>
    </section>
  );
};
