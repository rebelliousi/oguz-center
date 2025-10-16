import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import DotGrid from "../components/DotGrid";
import { Button } from "../components/button";
import { ChevronDownIcon, MenuIcon, XIcon } from "lucide-react";
import { Badge } from "../components/badge";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "../../public/logo 1.svg";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const { t } = useTranslation();

  const navigationItems = [
    { label: t("navigation.about"), targetId: "biz-barada" },
    { label: t("navigation.departments"), targetId: "bolumler" },
    { label: t("navigation.contact"), targetId: "habarlasmak" },
  ];
  const heroRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languages = [
    { code: "tm", label: "TM" },
    { code: "ru", label: "RU" },
    { code: "en", label: "EN" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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

  const handleNavClick = (targetId: string) => {
    const section = document.getElementById(targetId);
    section?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center w-full h-screen overflow-hidden"
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
      <header className="flex w-full h-16 sm:h-20 items-center justify-between px-4 sm:px-6 md:px-10 lg:px-28 fixed top-0 left-0 z-50 backdrop-blur-md bg-white/60 shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <img src={logo} alt="logo" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700">
            {t("brand")}
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {navigationItems.map((item, i) => (
            <Button
              key={i}
              variant="ghost"
              onClick={() => handleNavClick(item.targetId)}
              className="px-4 xl:px-5 py-2 rounded-full text-sm xl:text-md font-semibold transition-all duration-200 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
            >
              {item.label}
            </Button>
          ))}
          
          {/* Desktop Language Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="ghost"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-3 xl:px-4 py-2 rounded-full text-gray-700 hover:text-blue-600"
            >
              <div className="flex items-center gap-1 text-sm xl:text-md">
                <span className="font-semibold uppercase">
                  {i18n.language.toUpperCase()}
                </span>
                <ChevronDownIcon className="w-4 h-4 xl:w-5 xl:h-5" />
              </div>
            </Button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden z-50 min-w-[80px]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      i18n.changeLanguage(lang.code);
                      setIsDropdownOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-blue-100 ${
                      i18n.language === lang.code
                        ? "font-bold text-blue-600"
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

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-gray-700 hover:text-blue-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <XIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg lg:hidden"
          >
            <nav className="flex flex-col p-4 space-y-2">
              {navigationItems.map((item, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  onClick={() => handleNavClick(item.targetId)}
                  className="w-full justify-start px-4 py-3 rounded-lg text-base font-semibold text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                >
                  {item.label}
                </Button>
              ))}
              
              {/* Mobile Language Selector */}
              <div className="pt-2 border-t border-gray-200">
                <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                  Language
                </p>
                <div className="flex gap-2 px-4">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        i18n.language === lang.code
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Content */}
      <div
        ref={heroRef}
        className="flex flex-col items-center space-y-4 sm:space-y-6 justify-center text-center min-h-screen px-4 sm:px-6 mt-16 sm:mt-20"
      >
        <div className="flex flex-col items-center gap-3 sm:gap-4 max-w-4xl w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase font-extrabold bg-gradient-to-b from-sky-400 to-blue-600 bg-clip-text text-transparent leading-tight">
            {t("hero.titleLine1")}
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase font-extrabold text-gray-800 leading-tight">
            {t("hero.titleLine2")}
          </h2>

          <Badge className="bg-white/70 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border-none">
            <span className="text-gray-600 text-sm sm:text-base md:text-lg font-semibold">
              {t("form.ideaDescription")}
            </span>
          </Badge>
        </div>

        <Button
          onClick={scrollToContact}
          className="h-auto px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] shadow-lg transition-all duration-200 hover:shadow-xl"
        >
          <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-extrabold text-white text-base sm:text-lg md:text-xl lg:text-2xl text-center tracking-[0] leading-tight whitespace-nowrap">
            {t("heroCTA")}
          </span>
        </Button>
      </div>
    </section>
  );
};